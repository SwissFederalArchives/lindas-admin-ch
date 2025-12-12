import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import { readFile } from 'fs/promises'
import { createAuthMiddleware, getOidcConfig } from './lib/auth.js'
import { listContentFiles, readContentFile, writeContentFile, createContentFile, deleteContentFile, listContentFolders, listLocaleFiles, readLocaleFile, writeLocaleFile } from './lib/content.js'
import { gitStatus, gitCommit, gitDiff, gitListBranches, gitCheckoutBranch, gitCreateBranch, gitDeleteBranch, gitFetch, gitPull, gitPush } from './lib/git.js'
import { readNavigation, writeNavigation } from './lib/navigation.js'
import { exportArchive, importArchive } from './lib/archive.js'

const currentDir = dirname(fileURLToPath(import.meta.url))

// Simple Handlebars-like template rendering for standalone pages
function renderTemplate(template, data) {
  let result = template

  // Handle {{#if variable}} ... {{/if}} blocks
  result = result.replace(/\{\{#if\s+(\w+)\}\}([\s\S]*?)\{\{\/if\}\}/g, (match, varName, content) => {
    return data[varName] ? content : ''
  })

  // Handle {{variable}} replacements
  result = result.replace(/\{\{(\w+(?:\.\w+)*)\}\}/g, (match, path) => {
    const parts = path.split('.')
    let value = data
    for (const part of parts) {
      value = value?.[part]
    }
    return value !== undefined ? value : ''
  })

  return result
}

const factory = async (trifid) => {
  const { render, config, logger, server } = trifid

  const oidcConfig = {
    issuer: config.oidc?.issuer || process.env.CMS_OIDC_ISSUER,
    clientId: config.oidc?.clientId || process.env.CMS_OIDC_CLIENT_ID,
    clientSecret: config.oidc?.clientSecret || process.env.CMS_OIDC_CLIENT_SECRET,
    redirectUri: config.oidc?.redirectUri || process.env.CMS_OIDC_REDIRECT_URI,
    scope: config.oidc?.scope || 'openid email profile'
  }

  const contentDir = config.contentDir || join(dirname(currentDir), '..', 'content')
  const localesDir = config.localesDir || join(dirname(currentDir), '..', 'locales')
  const repoDir = config.repoDir || join(dirname(currentDir), '..')

  // Session storage for authenticated users
  const sessions = new Map()

  // Dev bypass mode - allows access without authentication in development
  // Set CMS_DEV_BYPASS=true and optionally CMS_DEV_USER and CMS_DEV_EMAIL
  const devBypass = config.devBypass || process.env.CMS_DEV_BYPASS === 'true'
  const devUser = {
    name: config.devUser?.name || process.env.CMS_DEV_USER || 'Developer',
    email: config.devUser?.email || process.env.CMS_DEV_EMAIL || 'dev@localhost'
  }

  // Check if auth is enabled (not enabled if dev bypass is active)
  const authEnabled = !devBypass && Boolean(oidcConfig.issuer && oidcConfig.clientId)

  logger.info(`CMS plugin initialized. Auth enabled: ${authEnabled}, Dev bypass: ${devBypass}`)

  return {
    defaultConfiguration: async () => {
      return {
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        paths: [
          '/cms',
          '/cms/',
          '/cms/api/*',
          '/cms/auth/*'
        ]
      }
    },
    routeHandler: async () => {
      const handler = async (request, reply) => {
        const fullUrl = `${request.protocol}://${request.hostname}${request.raw.url}`
        const fullUrlObject = new URL(fullUrl)
        const pathname = fullUrlObject.pathname
        const method = request.method

        // Helper to check authentication
        const checkAuth = async () => {
          if (devBypass) {
            // Dev bypass mode - allow access with dev user
            return { authenticated: true, user: devUser, devMode: true }
          }

          if (!authEnabled) {
            // No auth configured - allow access with default dev user
            return { authenticated: true, user: { email: 'dev@localhost', name: 'Developer' }, devMode: true }
          }

          const sessionId = request.cookies?.cms_session
          if (!sessionId || !sessions.has(sessionId)) {
            return { authenticated: false }
          }

          const session = sessions.get(sessionId)
          if (session.expiresAt < Date.now()) {
            sessions.delete(sessionId)
            return { authenticated: false }
          }

          return { authenticated: true, user: session.user }
        }

        // CMS Editor UI - rendered as standalone page (not wrapped in main template)
        if (pathname === '/cms' || pathname === '/cms/') {
          const auth = await checkAuth()

          if (!auth.authenticated && authEnabled) {
            // Redirect to auth
            reply.redirect('/cms/auth/login')
            return reply
          }

          try {
            const templatePath = join(currentDir, 'views', 'editor.hbs')
            const template = await readFile(templatePath, 'utf-8')
            const html = renderTemplate(template, {
              user: auth.user,
              authEnabled,
              devMode: auth.devMode || false
            })
            reply.type('text/html').send(html)
          } catch (err) {
            logger.error('Error rendering CMS editor:', err)
            reply.code(500).send('Error loading CMS editor')
          }
          return reply
        }

        // Auth routes
        if (pathname.startsWith('/cms/auth/')) {
          const authRoute = pathname.replace('/cms/auth/', '')

          if (authRoute === 'login') {
            if (!authEnabled) {
              reply.redirect('/cms/')
              return reply
            }

            try {
              const oidc = await getOidcConfig(oidcConfig.issuer)
              const state = Math.random().toString(36).substring(7)
              const redirectUrl = new URL(oidc.authorization_endpoint)
              redirectUrl.searchParams.set('client_id', oidcConfig.clientId)
              redirectUrl.searchParams.set('response_type', 'code')
              redirectUrl.searchParams.set('scope', oidcConfig.scope)
              redirectUrl.searchParams.set('redirect_uri', oidcConfig.redirectUri || `${request.protocol}://${request.hostname}/cms/auth/callback`)
              redirectUrl.searchParams.set('state', state)

              // Store state for verification
              reply.setCookie('cms_auth_state', state, {
                path: '/cms',
                httpOnly: true,
                secure: request.protocol === 'https',
                maxAge: 300
              })

              reply.redirect(redirectUrl.toString())
              return reply
            } catch (err) {
              logger.error('OIDC login error:', err)
              reply.code(500).send({ error: 'Authentication configuration error' })
              return reply
            }
          }

          if (authRoute === 'callback') {
            const { code, state } = request.query
            const storedState = request.cookies?.cms_auth_state

            if (state !== storedState) {
              reply.code(400).send({ error: 'Invalid state' })
              return reply
            }

            try {
              const oidc = await getOidcConfig(oidcConfig.issuer)

              // Exchange code for tokens
              const tokenResponse = await fetch(oidc.token_endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams({
                  grant_type: 'authorization_code',
                  code,
                  redirect_uri: oidcConfig.redirectUri || `${request.protocol}://${request.hostname}/cms/auth/callback`,
                  client_id: oidcConfig.clientId,
                  client_secret: oidcConfig.clientSecret
                })
              })

              if (!tokenResponse.ok) {
                throw new Error('Token exchange failed')
              }

              const tokens = await tokenResponse.json()

              // Get user info
              const userInfoResponse = await fetch(oidc.userinfo_endpoint, {
                headers: { Authorization: `Bearer ${tokens.access_token}` }
              })

              if (!userInfoResponse.ok) {
                throw new Error('User info fetch failed')
              }

              const userInfo = await userInfoResponse.json()

              // Create session
              const sessionId = Math.random().toString(36).substring(2) + Date.now().toString(36)
              sessions.set(sessionId, {
                user: {
                  email: userInfo.email,
                  name: userInfo.name || userInfo.preferred_username || userInfo.email
                },
                tokens,
                expiresAt: Date.now() + (tokens.expires_in || 3600) * 1000
              })

              reply.setCookie('cms_session', sessionId, {
                path: '/cms',
                httpOnly: true,
                secure: request.protocol === 'https',
                maxAge: tokens.expires_in || 3600
              })

              reply.redirect('/cms/')
              return reply
            } catch (err) {
              logger.error('OIDC callback error:', err)
              reply.code(500).send({ error: 'Authentication failed' })
              return reply
            }
          }

          if (authRoute === 'logout') {
            const sessionId = request.cookies?.cms_session
            if (sessionId) {
              sessions.delete(sessionId)
            }
            reply.clearCookie('cms_session', { path: '/cms' })
            reply.redirect('/cms/')
            return reply
          }

          if (authRoute === 'status') {
            const auth = await checkAuth()
            reply.type('application/json').send(auth)
            return reply
          }
        }

        // API routes - require authentication
        if (pathname.startsWith('/cms/api/')) {
          const auth = await checkAuth()
          if (!auth.authenticated) {
            reply.code(401).send({ error: 'Unauthorized' })
            return reply
          }

          const apiRoute = pathname.replace('/cms/api/', '')

          try {
            // Content endpoints
            if (apiRoute === 'content' && method === 'GET') {
              const files = await listContentFiles(contentDir)
              reply.type('application/json').send({ files })
              return reply
            }

            if (apiRoute === 'content/read' && method === 'POST') {
              const { path } = request.body
              const content = await readContentFile(contentDir, path)
              reply.type('application/json').send({ content })
              return reply
            }

            if (apiRoute === 'content/write' && method === 'POST') {
              const { path, content } = request.body
              await writeContentFile(contentDir, path, content)
              reply.type('application/json').send({ success: true })
              return reply
            }

            if (apiRoute === 'content/create' && method === 'POST') {
              const { path, content } = request.body
              const createdPath = await createContentFile(contentDir, path, content)
              reply.type('application/json').send({ success: true, path: createdPath })
              return reply
            }

            if (apiRoute === 'content/delete' && method === 'POST') {
              const { path } = request.body
              await deleteContentFile(contentDir, path)
              reply.type('application/json').send({ success: true })
              return reply
            }

            if (apiRoute === 'content/folders' && method === 'GET') {
              const folders = await listContentFolders(contentDir)
              reply.type('application/json').send({ folders })
              return reply
            }

            // Locale endpoints
            if (apiRoute === 'locales' && method === 'GET') {
              const files = await listLocaleFiles(localesDir)
              reply.type('application/json').send({ files })
              return reply
            }

            if (apiRoute === 'locales/read' && method === 'POST') {
              const { locale } = request.body
              const content = await readLocaleFile(localesDir, locale)
              reply.type('application/json').send({ content })
              return reply
            }

            if (apiRoute === 'locales/write' && method === 'POST') {
              const { locale, content } = request.body
              await writeLocaleFile(localesDir, locale, content)
              reply.type('application/json').send({ success: true })
              return reply
            }

            // Navigation endpoints
            if (apiRoute === 'navigation/read' && method === 'POST') {
              const { section } = request.body
              if (!['header', 'footer'].includes(section)) {
                reply.code(400).send({ error: 'Invalid section. Must be header or footer.' })
                return reply
              }
              const content = await readNavigation(repoDir, section)
              reply.type('application/json').send({ content })
              return reply
            }

            if (apiRoute === 'navigation/write' && method === 'POST') {
              const { section, content } = request.body
              if (!['header', 'footer'].includes(section)) {
                reply.code(400).send({ error: 'Invalid section. Must be header or footer.' })
                return reply
              }
              await writeNavigation(repoDir, section, content)
              reply.type('application/json').send({ success: true })
              return reply
            }

            // Archive endpoints
            if (apiRoute === 'archive/export' && method === 'GET') {
              const archiveBuffer = await exportArchive(contentDir, localesDir, repoDir)
              const filename = `lindas-cms-backup-${new Date().toISOString().slice(0, 10)}.json`
              reply
                .header('Content-Type', 'application/json')
                .header('Content-Disposition', `attachment; filename="${filename}"`)
                .send(archiveBuffer)
              return reply
            }

            if (apiRoute === 'archive/import' && method === 'POST') {
              const { archive, options } = request.body
              if (!archive || !archive.version) {
                reply.code(400).send({ error: 'Invalid archive format' })
                return reply
              }
              const results = await importArchive(contentDir, localesDir, repoDir, archive, options || {})
              reply.type('application/json').send({ success: true, results })
              return reply
            }

            // Git endpoints
            if (apiRoute === 'git/status' && method === 'GET') {
              const status = await gitStatus(repoDir)
              reply.type('application/json').send({ status })
              return reply
            }

            if (apiRoute === 'git/diff' && method === 'GET') {
              const diff = await gitDiff(repoDir)
              reply.type('application/json').send({ diff })
              return reply
            }

            if (apiRoute === 'git/commit' && method === 'POST') {
              const { message } = request.body
              const author = auth.user.name || auth.user.email
              const email = auth.user.email || 'cms@lindas.admin.ch'
              const result = await gitCommit(repoDir, message, author, email)
              reply.type('application/json').send({ result })
              return reply
            }

            if (apiRoute === 'git/branches' && method === 'GET') {
              const branches = await gitListBranches(repoDir)
              reply.type('application/json').send({ branches })
              return reply
            }

            if (apiRoute === 'git/checkout' && method === 'POST') {
              const { branch } = request.body
              const result = await gitCheckoutBranch(repoDir, branch)
              reply.type('application/json').send({ result })
              return reply
            }

            if (apiRoute === 'git/branch/create' && method === 'POST') {
              const { name, checkout } = request.body
              const result = await gitCreateBranch(repoDir, name, checkout !== false)
              reply.type('application/json').send({ result })
              return reply
            }

            if (apiRoute === 'git/branch/delete' && method === 'POST') {
              const { name, force } = request.body
              const result = await gitDeleteBranch(repoDir, name, force === true)
              reply.type('application/json').send({ result })
              return reply
            }

            if (apiRoute === 'git/fetch' && method === 'POST') {
              const result = await gitFetch(repoDir)
              reply.type('application/json').send({ result })
              return reply
            }

            if (apiRoute === 'git/pull' && method === 'POST') {
              const result = await gitPull(repoDir)
              reply.type('application/json').send({ result })
              return reply
            }

            if (apiRoute === 'git/push' && method === 'POST') {
              const { setUpstream } = request.body
              const result = await gitPush(repoDir, setUpstream === true)
              reply.type('application/json').send({ result })
              return reply
            }

            reply.code(404).send({ error: 'Not found' })
            return reply
          } catch (err) {
            logger.error('CMS API error:', err)
            reply.code(500).send({ error: err.message })
            return reply
          }
        }

        reply.code(404).send({ error: 'Not found' })
        return reply
      }

      return handler
    }
  }
}

export default factory
