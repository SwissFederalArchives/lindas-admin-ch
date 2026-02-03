# Changelog

All notable changes to lindas-admin-ch will be documented in this file.

## [0.15.2] - 2026-02-03

### Changed
- **DevOps overhaul: build-once-deploy-many pattern**
  - Replaced ci.yaml Docker builds with dedicated docker.yaml workflow
  - ci.yaml now runs tests only (npm ci + npm test)
  - docker.yaml builds image once on main push, tags with version + SHA, auto-deploys to TEST
  - Added Changesets for automated version management (release.yaml workflow)
  - Updated deploy-int and deploy-prod input descriptions to use version-based tags
  - Added RELEASE.md documenting the full release process

## [0.15.1] - 2026-02-03

### Added
- **Deploy/rollback workflows**: Added manual promotion workflows (deploy-int, deploy-prod) and rollback workflows (rollback-test, rollback-int, rollback-prod) using image retagging pattern
- **CODEOWNERS**: Added code ownership file (@giulio-vannini @psiotwo)

## [0.15.0] - 2026-02-03

### Changed
- **Updated all @lindas/trifid-* packages from ^7.0.2 to ^7.1.2**

### Bug Fixes (from trifid v7.1.2)
- **TERMDAT redirect fix**: Added `admin.ch` to the redirect URL allowlist so all Swiss federal administration subdomains (e.g. `termdat.bk.admin.ch`) are accepted for `schema:URL` redirects
- **Graph Explorer fix**: Fixed DOM element ID mismatch preventing the React workspace from mounting

### Improvements (from trifid v7.1.0/v7.1.1)
- Simplified GraphDB setup using `FROM <http://www.ontotext.com/describe/outgoing>` pseudo-graph
- Improved per-triple named graph enrichment for GraphDB (replaces single-graph assignment)
- Removed `filterBlankNodeSubjects` option (no longer needed with outgoing pseudo-graph)

## [0.14.0] - 2026-01-15

### Changed
- **Updated to @lindas/trifid v7.0.2** - Switched from local file references to npm packages
  - @lindas/trifid: ^7.0.2
  - @lindas/trifid-core: ^7.0.2
  - @lindas/trifid-entity-renderer: ^7.0.2
  - @lindas/trifid-plugin-markdown-content: ^7.0.2
  - @lindas/trifid-plugin-ckan: ^7.0.2
  - @lindas/trifid-plugin-graph-explorer: ^7.0.2
  - @lindas/trifid-plugin-i18n: ^7.0.2
  - @lindas/trifid-plugin-sparql-proxy: ^7.0.2
  - @lindas/trifid-plugin-spex: ^7.0.2
  - @lindas/trifid-plugin-yasgui: ^7.0.2

- **Zazuko References Cleanup**: Removed or updated remaining Zazuko references
  - Disabled URL shortener (was pointing to s.zazuko.com) - configure your own if needed
  - Updated yasgui.hbs link to SwissFederalArchives/lindas-trifid
  - Updated data-usage content to link to LINDAS Trifid instead of Zazuko product page

### New Features (from trifid v7.0.2)
- **Triplestore backend switching**: Support for switching between Stardog and GraphDB via `TRIPLESTORE_BACKEND` environment variable in `.env` file
- Named graph enrichment for GraphDB compatibility
- Blank node filtering for GraphDB SCBD behavior
- Windows path compatibility fixes for ESM module loading

### Deployment
- Deployed to test.ld.admin.ch via Flux GitOps (image: test_2026-01-15_131541)
