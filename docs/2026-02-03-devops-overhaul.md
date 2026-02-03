# DevOps Overhaul - 2026-02-03

## Problem Statement

The existing CI/CD setup had several issues:

1. **ci.yaml rebuilt the Docker image for each environment** (develop->test, main->int, manual->prod), violating the "build once, deploy many" principle. Each environment got a different binary, making it impossible to guarantee that what was tested is what gets deployed.

2. **Timestamp-based tags** (e.g., `test_2026-02-03_073053`) provided no version traceability. You could not tell which code version an image contained without checking git logs and correlating timestamps.

3. **No Changesets** meant no automated version bumping, no release tags, and no structured changelog generation.

4. **No documented release process** made onboarding and incident response difficult.

## Changes Made

### ci.yaml - Stripped to tests only

- Removed all Docker build jobs (`build-test`, `build-int`, `build-prod`)
- Kept only the `test` job (npm ci + npm test)
- Triggers on push to any branch and PRs to develop/main
- Rationale: CI should validate code, not build artifacts. Docker builds belong in a separate workflow.

### docker.yaml - New build + auto-deploy workflow

- Based on the lindas-varnish-post/docker.yaml pattern (already proven)
- Triggers on push to main (build + push + deploy) and PRs (build only, no push)
- Tags images with `{version}` from package.json and `sha-{SHORT_SHA}`
- Auto-deploys to TEST by saving current `test` as `test-previous` and retagging
- Rationale: Single build produces the immutable image. Promotion is just retagging.

### Changesets integration

- Added `.changeset/config.json` with standard configuration
- Added `@changesets/cli` as devDependency
- Added `release` script (`changeset tag`) to package.json
- Created `release.yaml` workflow using `changesets/action@v1`
- Rationale: Changesets provide a structured way to manage versions. Developers create changeset files with PRs, and the automation handles version bumping and tag creation.

### deploy-int.yaml / deploy-prod.yaml - Updated input descriptions

- Changed version input example from `test_2026-02-03_073053` to `0.15.0`
- No functional changes - these workflows already implement the correct retagging pattern

### RELEASE.md - New documentation

- Documents the full release flow: changesets -> version PR -> build -> TEST -> INT -> PROD
- Describes all image tags and their mutability
- Explains rollback procedures

## Architecture

```
Developer creates changeset -> PR merged to main
  -> release.yaml: Creates "Version Packages" PR
  -> Merge version PR: bumps package.json, creates git tag
  -> docker.yaml: Builds image with version tag, auto-deploys to TEST
  -> Manual: deploy-int with version -> retags as "int"
  -> Manual: deploy-prod with version -> retags as "prod"
```

## Verification Checklist

- [ ] Push to any branch -> CI runs tests only (no Docker build)
- [ ] Merge to main -> docker.yaml builds image with version + sha tags, auto-deploys to TEST
- [ ] Changesets "Version Packages" PR appears on main
- [ ] Merge version PR -> git tag created, docker.yaml builds new version
- [ ] Run deploy-int workflow with version -> image retagged as `int`
- [ ] Run deploy-prod workflow with version -> image retagged as `prod`
- [ ] Run rollback-test -> `test` and `test-previous` swap
