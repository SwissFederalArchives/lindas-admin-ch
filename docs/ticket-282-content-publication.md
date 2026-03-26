# Ticket #282 - Content-Independent Publication

## Overview

Separates content management from application deployment on the LINDAS website.
Content editors can update banners, menus, and static pages without triggering
a full deployment or server restart.

## Architecture

Three file-polling plugins watch JSON/markdown files on disk:

| Plugin | File(s) | Default Interval | Purpose |
|--------|---------|-------------------|---------|
| `banner` | `overlay/banner.json` | 10s | Site-wide announcements |
| `menu` | `menu.json` | 10s | Navigation menu entries |
| `content-reload` | `content/` directories | 600s (10 min) | Static page markdown |

All intervals are configurable via `reloadInterval` (in seconds) in the Trifid
plugin config. A `config.local.yaml` override sets all intervals to 3 seconds
for fast local development.

## Phase 1 - Banner Plugin

- Plugin: `plugins/banner/index.js`
- Config file: `overlay/banner.json`
- Template: `template/main.hbs` (banner block at top of page)
- CSS: `static/css/style.css` (severity variants)
- GitHub workflow: `.github/workflows/banner-toggle.yaml`

### banner.json options

| Field | Type | Description |
|-------|------|-------------|
| `enabled` | boolean | `true` to show the banner, `false` to hide it |
| `severity` | string | Visual style: `info` (blue), `warning` (yellow/black text), `critical` (red) |
| `dismissible` | boolean | `true` adds a close button. Dismissed state persisted in localStorage per message hash |
| `messages` | object | One key per language (`de`, `fr`, `it`, `en`). Value is the text shown to users |

The `_docs` block in `banner.json` itself also documents these options inline.

## Phase 2 - Dynamic Menu and Content Hot-Reload

### Menu Plugin (`plugins/menu/index.js`)
- Config file: `menu.json` (JSON array of `{path, label}` entries)
- Labels are i18n keys resolved by the Handlebars `{{i18n}}` helper
- Error resilience: on bad JSON, last known good menu is preserved
- GitHub workflow: `.github/workflows/menu-update.yaml`

### Content-Reload Plugin (`plugins/content-reload/index.js`)
- Watches 7 content namespaces (template-parts, root-pages, ecosystem, data-usage, governance, know-how, community)
- Uses file mtime to skip recompilation of unchanged markdown
- Identical remark/rehype pipeline as `@lindas/trifid-plugin-markdown-content`
- Utility `addClasses.js` copied locally to avoid internal module path dependency
- `stopped` flag prevents async operations after server shutdown (avoids V8 HandleScope crash)

### Content-Reload Hook Ordering
Registered AFTER `markdown-content` in `config.yaml`. Both plugins write to the
same session key (`markdown-content-plugin`). Fastify runs `onRequest` hooks in
registration order, so content-reload's hook runs last and its data wins.

## Local Development

```bash
# Start with 3-second reload intervals
node node_modules/@lindas/trifid/server.js -c config.local.yaml
```

Edit `overlay/banner.json`, `menu.json`, or any `content/*.md` file and changes
appear in the browser within 3 seconds.

## Production Deployment

In production (Kubernetes), Flux syncs config files from `gitops-main` into pod
volumes as ConfigMaps. The polling plugins detect file changes and apply them
without pod restarts. Default intervals: banner/menu 10s, content 10 minutes.
