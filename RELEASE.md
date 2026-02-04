# Release Process

This document describes how versions are managed and how images flow through environments.

## Overview

Images are built **once** on push to `main`. The same image is promoted through environments
by creating new `{env}_{timestamp}` tags that Flux watches.

```
main push -> build 0.15.0 + sha-xxx + test_2026-02-04_133106 -> Flux deploys to TEST
manual    -> pull 0.15.0, push int_2026-02-04_140000          -> Flux deploys to INT
manual    -> pull 0.15.0, push prod_2026-02-04_150000          -> Flux deploys to PROD
```

## Image Tags

Each build produces three tags for the same image:

| Tag | Purpose | Mutable |
|-----|---------|---------|
| `0.15.0` | Immutable version reference (from package.json) | No |
| `sha-abc1234` | Immutable git commit reference | No |
| `test_2026-02-04_133106` | Flux deployment tag for TEST | No (new tag per deploy) |

Promotion and rollback workflows pull by **version** and push a fresh `{env}_{timestamp}` tag.
Flux picks the highest timestamp alphabetically, so the latest action always wins.

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
- It creates a "Version Packages" PR that bumps `package.json` version and updates `CHANGELOG.md`

### 3. Merge the Version PR

When the "Version Packages" PR is merged:
- The `release` script runs `changeset tag`, creating a git tag (e.g., `v0.16.0`)
- The **docker.yaml** workflow builds the image with the new version tag
- The image is auto-deployed to TEST via a `test_{timestamp}` tag

## Deploying to Environments

### TEST (automatic)

Every push to `main` triggers docker.yaml which:
1. Builds the image
2. Tags it with `{version}`, `sha-{sha}`, and `test_{timestamp}`
3. Flux detects the new `test_*` tag and deploys

### INT (manual)

1. Go to **Actions** > **Deploy to INT**
2. Enter the version to deploy (e.g., `0.15.0`)
3. Click **Run workflow**

The workflow pulls the version image and pushes it with a fresh `int_{timestamp}` tag.

### PROD (manual, requires approval)

1. Go to **Actions** > **Deploy to PROD**
2. Enter the version to deploy (e.g., `0.15.0`)
3. Click **Run workflow**
4. Approve the deployment (production environment protection)

The workflow pulls the version image and pushes it with a fresh `prod_{timestamp}` tag.

## Rollback

Each environment has a rollback workflow that takes a **version** to rollback to:

1. Go to **Actions** > **Rollback TEST/INT/PROD**
2. Enter the version to rollback to (e.g., `0.14.0`)
3. Click **Run workflow**

The workflow pulls the specified version and pushes it with a fresh `{env}_{timestamp}` tag.
Since the new timestamp is higher than the previous one, Flux picks it up and deploys.

## Workflows

| Workflow | Trigger | Purpose |
|----------|---------|---------|
| `ci.yaml` | Push / PR | Run tests (npm ci + npm test) |
| `docker.yaml` | Push to main / PR | Build image + auto-deploy TEST |
| `release.yaml` | Push to main | Changesets version PR + tag creation |
| `deploy-int.yaml` | Manual (version input) | Promote a version to INT |
| `deploy-prod.yaml` | Manual (version input) | Promote a version to PROD |
| `rollback-test.yaml` | Manual (version input) | Rollback TEST to a version |
| `rollback-int.yaml` | Manual (version input) | Rollback INT to a version |
| `rollback-prod.yaml` | Manual (version input) | Rollback PROD to a version |
| `test.yaml` | Manual | Run E2E tests against an environment |
