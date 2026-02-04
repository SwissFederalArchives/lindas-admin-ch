# Decision: Flux-Compatible Tag Strategy - 2026-02-04

## Context

During the DevOps overhaul, the initial plan was to use floating environment tags
(`test`, `int`, `prod`) with the "retag to promote" pattern. After analyzing the
Flux configuration in gitops-main, this was found to be incompatible.

## Flux Image Automation Architecture

Flux uses three components per environment across both clusters (sbar, c-sbar-prod1):

1. **ImageRepository** - Polls GHCR every 2 minutes for new tags
2. **ImagePolicy** - Filters tags by regex pattern (`^test_`, `^int_`, `^prod_`)
   and selects the highest alphabetically
3. **ImageUpdateAutomation** - Commits the selected tag to gitops release.yaml,
   triggering a HelmRelease reconciliation

Key constraint: Flux compares **tag strings**, not image digests. A mutable tag
whose name never changes (like `test`) is invisible to the automation.

## Options Evaluated

### Option 1: Floating tags (test, int, prod)
- **Rejected.** Flux cannot detect when a floating tag's digest changes.
  The gitops release.yaml would always say `tag: test` and never trigger updates.
  Kubernetes pods also don't re-pull mutable tags without a restart.

### Option 2: Version-only prefixed tags (test_0.15.0, int_0.15.0)
- **Rejected.** Forward deployment works (0.16.0 > 0.15.0 alphabetically),
  but rollback is impossible. Rolling back from test_0.16.0 to test_0.15.0
  would never produce a tag that sorts higher than the current one.

### Option 3: Version tags for identity + timestamp tags for Flux (chosen)
- **Accepted.** Each build produces:
  - `{version}` and `sha-{sha}` as immutable references (for humans and CI)
  - `{env}_{timestamp}` as the Flux deployment tag (always sorts correctly)
- Deploy/rollback workflows take a **version** as input (human-friendly UX),
  pull the image by version, and push a fresh `{env}_{timestamp}` tag.
- Timestamps always increase, so both forward deploys and rollbacks work.

## Why Not Change Flux?

Changing Flux was considered (updating ImagePolicy patterns, or disabling image
automation entirely and having workflows commit directly to gitops). This was
deferred because:

1. It requires coordinated changes across 2 clusters (sbar, c-sbar-prod1)
   and 3 environments each (test, int, prod) = 12+ files
2. The gitops repo is shared infrastructure managed by the operations team
3. The timestamp-based approach is proven and already working
4. A future migration to workflow-driven gitops commits (Option B) remains
   possible without changing the image tagging strategy

## Existing Bug Found

During the Flux analysis, an inconsistency was discovered:

- `clusters/sbar/zazuko/int/lindas/release.yaml` has annotation
  `flux.weave.works/tag.chart-image: glob:prod_*` instead of `glob:int_*`
- Same issue in `clusters/c-sbar-prod1/zazuko/int/lindas/release.yaml`

This does not affect the Flux v2 ImagePolicy (which uses its own filterTags),
but should be corrected for clarity. The annotation is a Flux v1 legacy.

## Result

The workflows now produce dual tags:
- Version tags (`0.15.0`, `sha-abc1234`) for traceability
- Env+timestamp tags (`test_2026-02-04_133106`) for Flux compatibility

Deploy and rollback workflows use version as input, generating timestamp tags internally.
Zero changes required in gitops-main.
