# Changelog

All notable changes to lindas-admin-ch will be documented in this file.

## [Unreleased]

### Changed
- **Zazuko References Cleanup**: Removed or updated remaining Zazuko references
  - Disabled URL shortener (was pointing to s.zazuko.com) - configure your own if needed
  - Updated yasgui.hbs link to SwissFederalArchives/lindas-trifid
  - Updated data-usage content to link to LINDAS Trifid instead of Zazuko product page

- Updated all @lindas/trifid packages to v7.0.0 for unified versioning
  - @lindas/trifid: ^6.0.1 -> ^7.0.0
  - @lindas/trifid-core: ^6.0.0 -> ^7.0.0
  - @lindas/trifid-entity-renderer: ^2.0.1 -> ^7.0.0
  - @lindas/trifid-plugin-markdown-content: ^3.0.0 -> ^7.0.0
  - @lindas/trifid-plugin-ckan: ^5.0.1 -> ^7.0.0
  - @lindas/trifid-plugin-graph-explorer: ^3.0.0 -> ^7.0.0
  - @lindas/trifid-plugin-i18n: ^4.0.0 -> ^7.0.0
  - @lindas/trifid-plugin-sparql-proxy: ^3.0.5 -> ^7.0.0
  - @lindas/trifid-plugin-spex: ^4.0.0 -> ^7.0.0
  - @lindas/trifid-plugin-yasgui: ^4.0.11 -> ^7.0.0

### New Features (from trifid v7.0.0)
- Triplestore backend switching: Support for switching between Stardog and GraphDB via `TRIPLESTORE_BACKEND` environment variable
- Named graph enrichment for GraphDB compatibility
- Blank node filtering for GraphDB SCBD behavior
