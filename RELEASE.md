# Release Process

This document describes how versions are managed and how images flow through environments.

## Overview

Images are built **once** on push to `main`. The same image is promoted through environments
by creating new `{env}_{timestamp}` tags that Flux watches.

```
main push -> build 0.15.0 + sha-xxx + test_2026-02-04_133106 -> Flux deploys to TEST
                                                               -> E2E tests run automatically
manual    -> pull 0.15.0, push int_2026-02-04_140000           -> Flux deploys to INT
manual    -> pull 0.15.0, push prod_2026-02-04_150000          -> Flux deploys to PROD
```

## Image Tags

### Build tags (main push)

| Tag | Purpose | Mutable |
|-----|---------|---------|
| `0.15.0` | Version reference (from package.json) | Overwritten on same-version rebuild |
| `sha-abc1234` | Git commit reference (immutable) | No |
| `test_2026-02-04_133106` | Flux deployment tag for TEST | No (new tag per deploy) |

### Dev build tags (manual trigger from any branch)

| Tag | Purpose |
|-----|---------|
| `sha-abc1234` | Git commit reference |
| `dev_2026-02-04_160000` | Dev build marker (Flux ignores `dev_*`) |

Dev builds do **not** push a version tag to avoid overwriting the production version reference.

### Marker tags (maintained by all deploy/rollback workflows)

| Tag | Purpose |
|-----|---------|
| `test-current` / `test-previous` | Which image is deployed to TEST now / before |
| `int-current` / `int-previous` | Which image is deployed to INT now / before |
| `prod-current` / `prod-previous` | Which image is deployed to PROD now / before |

These are for human reference only. Flux does not use them.

## Why Timestamps for Flux

Flux image automation (`ImagePolicy` + `ImageUpdateAutomation`) selects the highest tag
matching a pattern like `^test_` using alphabetical sorting. This means:

- **Timestamps always increase**, so Flux always picks the latest deployment
- **Rollback works**: pushing a new `test_{timestamp}` for an older version sorts higher
  than the previous deployment tag, so Flux picks it up
- **Floating tags** (`test`, `int`) would not work because Flux compares tag strings,
  not image digests. A mutable tag that doesn't change its name is invisible to Flux.
- **Version-only tags** (`test_0.15.0`) break rollback: rolling back from `test_0.16.0`
  to `test_0.15.0` would never sort higher

The immutable `{version}` tag provides traceability. The `{env}_{timestamp}` tag drives Flux.

## Version Bumping with Changesets

### 1. Create a changeset

When making a change, create a changeset file describing it:

```bash
npx changeset
```

This will prompt for:
- **Version bump type**: patch / minor / major
- **Summary**: Description of the change

A markdown file is created in `.changeset/` and should be committed with your PR.

### 2. Merge to main

When the PR is merged to `main`:
- The **Release** workflow detects pending changesets
- It creates a "Version Packages" PR that bumps `package.json` version

### 3. Merge the Version PR

When the "Version Packages" PR is merged:
- The Release workflow creates a `v{version}` git tag (e.g., `v0.16.0`)
- The **docker.yaml** workflow builds the image with the new version tag
- The image is auto-deployed to TEST via a `test_{timestamp}` tag
- E2E tests run automatically against TEST

## Deploying to Environments

### TEST (automatic)

Every push to `main` triggers docker.yaml which:
1. Builds the image once
2. Tags it with `{version}`, `sha-{sha}`, and `test_{timestamp}`
3. Updates `test-current` / `test-previous` markers
4. Flux detects the new `test_*` tag and deploys
5. E2E tests run automatically after a 3-minute wait for Flux

### DEV (manual, for testing Docker builds)

1. Go to **Actions** > **Build and Deploy to TEST**
2. Select the branch to build from
3. Click **Run workflow**

The image is tagged with `sha-{sha}` and `dev_{timestamp}` only. Flux ignores `dev_*` tags.
No markers are updated.

### INT (manual)

1. Go to **Actions** > **Deploy to INT**
2. Enter the version to deploy (e.g., `0.15.0`)
3. Click **Run workflow**

The workflow pulls the version image, pushes it with a fresh `int_{timestamp}` tag,
and updates `int-current` / `int-previous` markers.

### PROD (manual, requires approval)

1. Go to **Actions** > **Deploy to PROD**
2. Enter the version to deploy (e.g., `0.15.0`)
3. Click **Run workflow**
4. Approve the deployment (production environment protection)

The workflow pulls the version image, pushes it with a fresh `prod_{timestamp}` tag,
and updates `prod-current` / `prod-previous` markers.

## Rollback

Each environment has a rollback workflow that takes a **version** to rollback to:

1. Go to **Actions** > **Rollback TEST/INT/PROD**
2. Enter the version to rollback to (e.g., `0.14.0`)
3. Click **Run workflow**

The workflow pulls the specified version and pushes it with a fresh `{env}_{timestamp}` tag.
Since the new timestamp is higher than the previous one, Flux picks it up and deploys.
The `{env}-current` / `{env}-previous` markers are updated accordingly.

## Workflows

| Workflow | Trigger | Purpose |
|----------|---------|---------|
| `ci.yaml` | Push / PR | Run tests (npm ci + npm test) |
| `docker.yaml` | Push to main / PR / Manual | Build image + auto-deploy TEST (or dev build) |
| `release.yaml` | Push to main | Changesets version PR + v{version} tag creation |
| `deploy-int.yaml` | Manual (version input) | Promote a version to INT |
| `deploy-prod.yaml` | Manual (version input) | Promote a version to PROD |
| `rollback-test.yaml` | Manual (version input) | Rollback TEST to a version |
| `rollback-int.yaml` | Manual (version input) | Rollback INT to a version |
| `rollback-prod.yaml` | Manual (version input) | Rollback PROD to a version |
| `test.yaml` | Manual | Run E2E tests against any environment |
