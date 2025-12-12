# CMS Implementation Documentation

## Overview

This document describes the Content Management System (CMS) implemented for lindas-admin-ch. The CMS allows authorized users to edit static content (markdown files and translation files) directly through a web interface, without requiring a code deployment.

## Architecture

### Components

1. **CMS Plugin** (`plugins/cms/index.js`)
   - Main Trifid plugin that provides all CMS functionality
   - Handles routing for the CMS UI and API endpoints
   - Manages authentication sessions

2. **Authentication Library** (`plugins/cms/lib/auth.js`)
   - OIDC-based authentication using the same approach as cube-creator
   - Fetches OIDC configuration from the provider's well-known endpoint
   - Validates tokens using the userinfo endpoint

3. **Content Library** (`plugins/cms/lib/content.js`)
   - Lists, reads, and writes markdown content files
   - Lists, reads, and writes translation JSON files
   - Includes path traversal protection

4. **Git Library** (`plugins/cms/lib/git.js`)
   - Provides git status, diff, and commit functionality
   - Commits are attributed to the authenticated user
   - Only stages changes in content/ and locales/ directories

5. **Editor UI** (`plugins/cms/views/editor.hbs`)
   - Single-page application for content editing
   - Supports both markdown and JSON locale file editing
   - Includes a markdown preview pane
   - Git panel for viewing changes and committing

### File Structure

```
plugins/cms/
  index.js           # Main plugin entry point
  lib/
    auth.js          # OIDC authentication
    content.js       # Content file operations
    git.js           # Git operations
  views/
    editor.hbs       # CMS editor UI
```

## Features

### Content Editing
- Browse all markdown files in the content/ directory
- Edit markdown content with live preview
- Save changes directly to the file system

### Translation Editing
- Browse all locale JSON files (en, de, fr, it)
- Edit translation key-value pairs
- Save changes directly to the file system

### Git Integration
- View current git status (branch, changes, last commit)
- See which files have been modified
- Commit changes with a custom message
- Commits are attributed to the authenticated user

### Authentication
- OIDC/OAuth2 authentication (same as cube-creator)
- Session-based authentication with cookies
- Development mode allows access without authentication when OIDC is not configured

### Hidden Access
- CMS access is hidden from regular users
- A small invisible button in the bottom-right corner of the footer
- Triple-click to reveal the CMS button
- Clicking the revealed button navigates to /cms/

## Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| CMS_OIDC_ISSUER | OIDC provider URL (e.g., https://keycloak.example.com/realms/myrealm) | For production |
| CMS_OIDC_CLIENT_ID | OAuth client ID | For production |
| CMS_OIDC_CLIENT_SECRET | OAuth client secret | For production |
| CMS_OIDC_REDIRECT_URI | OAuth callback URL (auto-detected if not set) | Optional |

### config.yaml

The CMS plugin is configured in config.yaml:

```yaml
cms:
  module: file:plugins/cms/index.js
  config:
    contentDir: file:content
    localesDir: file:locales
    repoDir: file:.
    oidc:
      issuer: env:CMS_OIDC_ISSUER
      clientId: env:CMS_OIDC_CLIENT_ID
      clientSecret: env:CMS_OIDC_CLIENT_SECRET
      redirectUri: env:CMS_OIDC_REDIRECT_URI
      scope: "openid email profile"
```

## API Endpoints

### Authentication

- `GET /cms/auth/login` - Initiates OIDC login flow
- `GET /cms/auth/callback` - Handles OIDC callback
- `GET /cms/auth/logout` - Logs out the user
- `GET /cms/auth/status` - Returns current authentication status

### Content API

- `GET /cms/api/content` - Lists all content files
- `POST /cms/api/content/read` - Reads a content file
  - Body: `{ "path": "ecosystem/about-LINDAS/en.md" }`
- `POST /cms/api/content/write` - Writes a content file
  - Body: `{ "path": "...", "content": "..." }`

### Locales API

- `GET /cms/api/locales` - Lists all locale files
- `POST /cms/api/locales/read` - Reads a locale file
  - Body: `{ "locale": "en" }`
- `POST /cms/api/locales/write` - Writes a locale file
  - Body: `{ "locale": "en", "content": { ... } }`

### Git API

- `GET /cms/api/git/status` - Returns git status
- `GET /cms/api/git/diff` - Returns current diff
- `POST /cms/api/git/commit` - Commits staged changes
  - Body: `{ "message": "Updated content" }`

## Security Considerations

1. **Path Traversal Protection**: All file operations sanitize paths to prevent directory traversal attacks.

2. **Authentication Required**: All API endpoints require authentication when OIDC is configured.

3. **Git Scope Limitation**: Git commits only stage files in content/ and locales/ directories.

4. **Session Management**: Sessions are stored in memory with expiration based on token lifetime.

5. **Hidden Access**: The CMS link is hidden and requires a specific action (triple-click) to reveal.

## Development Mode

The CMS supports explicit dev bypass mode via the `CMS_DEV_BYPASS` environment variable:

```bash
CMS_DEV_BYPASS=true      # Enable dev bypass
CMS_DEV_USER="Developer" # Optional: custom user name
CMS_DEV_EMAIL="dev@localhost" # Optional: custom email
```

When dev bypass is enabled:
- Authentication is completely bypassed
- A configurable dev user identity is used for commits
- An orange "Development Mode" banner appears in the CMS UI
- This should only be used in development environments

### Local Docker Setup

The docker-compose.yml is pre-configured for local development with:

```yaml
admin-ch:
  environment:
    CMS_DEV_BYPASS: "true"
    CMS_DEV_USER: "Local Developer"
    CMS_DEV_EMAIL: "dev@localhost"
  volumes:
    - ./lindas-admin-ch/content:/app/content
    - ./lindas-admin-ch/locales:/app/locales
    - ./lindas-admin-ch/.git:/app/.git
    - ./lindas-admin-ch/plugins/cms:/app/plugins/cms
```

This configuration:
- Enables dev bypass for easy testing
- Mounts content, locales, and .git for live editing and git integration
- Mounts the CMS plugin for hot-reload during development

## Workflow

1. User navigates to any page on the site
2. User triple-clicks the invisible button in the bottom-right corner
3. CMS button appears, user clicks it
4. User authenticates via OIDC (if configured)
5. User edits content or translations
6. User saves changes (writes to file system)
7. User opens Git panel to review changes
8. User enters commit message and commits
9. Changes are committed to the local git repository
10. To publish: push changes to remote and deploy (manual step)

## Limitations

1. **No Remote Push**: The CMS commits locally but does not push to remote. This is intentional for safety.

2. **No File Creation/Deletion**: The CMS can only edit existing files.

3. **No Template Editing**: Handlebars templates are not editable through the CMS for security reasons.

4. **Single User**: The session management is simple and may have issues with concurrent users.

## Future Improvements

- Add file creation and deletion capabilities
- Add remote push functionality with confirmation
- Add multi-user support with proper locking
- Add content version history viewing
- Add markdown editor toolbar
- Add image upload functionality
