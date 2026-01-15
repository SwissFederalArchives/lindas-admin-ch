# Changelog

All notable changes to lindas-admin-ch will be documented in this file.

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
