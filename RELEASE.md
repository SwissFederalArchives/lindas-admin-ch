# Release Process

This document describes how versions are managed and how images flow through environments.

## Overview

Images are built **once** on push to `main` and promoted through environments using floating tags:

```
main push -> build v0.15.0 -> auto-tag as "test" -> Flux deploys to TEST
manual promote -> retag v0.15.0 as "int" -> Flux deploys to INT
manual promote -> retag v0.15.0 as "prod" -> Flux deploys to PROD
```

## Image Tags

| Tag | Description | Mutable |
|-----|-------------|---------|
| `0.15.0` | Version from package.json (immutable reference) | No |
| `sha-abc1234` | Git commit SHA (immutable reference) | No |
| `test` | Currently deployed to TEST | Yes |
| `int` | Currently deployed to INT | Yes |
| `prod` | Currently deployed to PROD | Yes |
| `test-previous` | Previous TEST version (for rollback) | Yes |
| `int-previous` | Previous INT version (for rollback) | Yes |
| `prod-previous` | Previous PROD version (for rollback) | Yes |

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
- The image is auto-deployed to TEST

## Deploying to Environments

### TEST (automatic)

Every push to `main` triggers docker.yaml, which builds and auto-deploys to TEST.

### INT (manual)

1. Go to **Actions** > **Deploy to INT**
2. Enter the version to deploy (e.g., `0.15.0`)
3. Click **Run workflow**

The workflow saves the current `int` tag as `int-previous`, then retags the version as `int`.

### PROD (manual, requires approval)

1. Go to **Actions** > **Deploy to PROD**
2. Enter the version to deploy (e.g., `0.15.0`)
3. Click **Run workflow**
4. Approve the deployment (production environment protection)

The workflow saves the current `prod` tag as `prod-previous`, then retags the version as `prod`.

## Rollback

Each environment has a rollback workflow that swaps the current tag with the previous one:

- **Rollback TEST**: Swaps `test` and `test-previous`
- **Rollback INT**: Swaps `int` and `int-previous`
- **Rollback PROD**: Swaps `prod` and `prod-previous`

Run the same rollback workflow again to undo the rollback (swap back).

## Workflows

| Workflow | Trigger | Purpose |
|----------|---------|---------|
| `ci.yaml` | Push / PR | Run tests (npm ci + npm test) |
| `docker.yaml` | Push to main / PR | Build image + auto-deploy to TEST |
| `release.yaml` | Push to main | Changesets version PR + tag creation |
| `deploy-int.yaml` | Manual | Promote a version to INT |
| `deploy-prod.yaml` | Manual | Promote a version to PROD |
| `rollback-test.yaml` | Manual | Rollback TEST |
| `rollback-int.yaml` | Manual | Rollback INT |
| `rollback-prod.yaml` | Manual | Rollback PROD |
| `test.yaml` | Manual | Run E2E tests against an environment |
