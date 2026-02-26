# Changelog - lindas-admin-ch

## 2026-02-26

### Added (Phase 2)
- Dynamic menu hot-reload (`plugins/menu/index.js`): optional `filePath` config polls a
  JSON file every 10s and updates `server.locals.menu`. Static entries in config.yaml
  serve as startup fallback. On file error, last known good menu is preserved.
- Menu config file (`menu.json`): externalized menu entries at project root. Labels are
  i18n keys resolved by the template. No template changes required.
- Content hot-reload plugin (`plugins/content-reload/index.js`): re-reads existing
  `content/` directories every 10s, recompiles changed markdown to HTML using the same
  remark/rehype pipeline as `@lindas/trifid-plugin-markdown-content`, and overrides
  per-request session data. Uses file mtime to skip recompilation of unchanged files.
  Registered after the content plugin in config.yaml so its `onRequest` hook runs last.
- GitHub Actions workflow `menu-update.yaml` for updating the site menu via
  `workflow_dispatch`. Accepts a JSON array of menu entries, validates structure, and
  commits `menu.json` to gitops-main for K8s ConfigMap sync.
- Ticket: #282 Phase 2.

### Added (Phase 1)
- Banner plugin (`plugins/banner/index.js`): reads a `banner.json` config file and
  injects banner data into `server.locals.banner` for template rendering. Polls the
  file every 10 seconds so K8s ConfigMap updates propagate without restarts.
- Overlay directory with default `overlay/banner.json` for maintenance/announcement banners.
- Banner HTML block in `template/main.hbs` with per-language message selection via
  Handlebars `lookup` helper, cookie-based dismissal keyed to message content hash.
- Banner CSS in `static/css/style.css` with severity variants: info (blue), warning (amber),
  critical (red #dc0018).
- GitHub Actions workflow `banner-toggle.yaml` for toggling the site banner via
  `workflow_dispatch`. Non-technical users fill a form (enabled, severity, messages in
  DE/FR/IT/EN) and the workflow commits `banner.json` to gitops-main for K8s ConfigMap sync.
- Ticket: #282.

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
