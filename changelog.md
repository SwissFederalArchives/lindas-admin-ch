# Changelog - lindas-admin-ch

## 2026-02-26

### Added
- One-click cache purge workflows per environment (`purge-test.yaml`, `purge-int.yaml`, `purge-prod.yaml`).
  - Each workflow is a separate `workflow_dispatch` entry in the Actions sidebar.
  - Runs the `lindas-clear-sparql-cache-endpoint` Docker image to do a full cache purge
    (queries SPARQL for all datasets and sends individual PURGE requests per dataset + default xkey).
  - S3 disabled so manual purges do not interfere with the automated CronJob state.
  - Requires `CACHE_ENDPOINT_PASSWORD` secret configured per GitHub environment (test, int, prod).
  - Ticket: GitLab "create a button (action) that purges the cache".

## 2026-02-15

### Changed
- CI workflow (`ci.yaml`): INT and PROD promotions no longer rebuild the Docker image.
  Instead, they retag the existing TEST image using `docker buildx imagetools create`,
  ensuring the exact same binary runs across all environments.
  - `move-to-int`: retags `source_tag` as `int_YYYY-MM-DD_HHMMSS`
  - `move-to-prod`: retags `source_tag` as `prod_YYYY-MM-DD_HHMMSS`
  - `workflow_dispatch` now requires an `action` dropdown (promote, rollback-test,
    rollback-int, rollback-prod) and a `source_tag` input
  - Rollback jobs retag a previous image with a new timestamp so Flux picks it up
  - Tests are skipped during promotion/rollback (only run on push)
- Fixed `cache-purge.yaml` workflow to use xkey-based purge (`xkey: default` header) instead
  of bare URL purge. Trifid tags all SPARQL responses with `xkey: default`, so purging this
  key effectively clears the entire cache. No VCL changes required.
  - Ticket: #213.

## 2026-02-13

### Added
- GitHub Actions workflow `cache-purge.yaml` for on-demand Varnish cache purging via `workflow_dispatch`.
  - Supports `test`, `int`, and `prod` environments with GitHub environment-based approval gates.
  - Sends an HTTP PURGE request to the environment-specific Varnish purge endpoint.
  - Uses `CACHE_ENDPOINT_PASSWORD` secret for Basic authentication (username: `admin`).
  - Ticket: #213.

### Changed
- README: Updated deployment documentation to reflect trunk-based development model (single `main` branch, no more `develop`).
- README: TEST now deploys from `main` on push (was `develop`). INT+PROD deploy via manual `workflow_dispatch`.
- README: Added rollback instructions (revert gitops-main commit or re-trigger workflow_dispatch).
- README: Fixed typo "Anatonomy" -> "Anatomy".

## 2026-02-10

### Fixed
- YASGUI template: Updated broken "About YASGUI" link (triply.cc 404) and "Trifid plugin" link (Zazuko GitHub) to point to the lindas-admin-ch repository.

## 2026-02-09

### Deployed
- Promoted v0.15.0 (Trifid v7.1.2) from INT to PROD with tag `prod_2026-02-09_120000`.
- Fixes: TERMDAT redirect allowlist and Graph Explorer DOM ID mismatch.
