import { readFile } from 'node:fs/promises'

const RELOAD_INTERVAL_MS = 10_000

const factory = async (trifid) => {
  const { config, logger, server } = trifid
  const { namespace, entries, filePath } = config

  if (!entries || !Array.isArray(entries)) {
    throw new Error('\'entries\' should be a non-empty array')
  }

  const configuredNamespace = namespace ?? 'default'

  // Parse and validate static entries (used as startup fallback)
  const parseEntries = (raw) => {
    const parsed = []
    for (const entry of raw) {
      const { path, label } = entry
      if (!path || typeof path !== 'string') {
        throw new Error('\'path\' should be a non-empty string')
      }
      if (!label || typeof label !== 'string') {
        throw new Error('\'label\' should be a non-empty string')
      }
      parsed.push({ path, label })
    }
    return parsed
  }

  const fallbackStore = parseEntries(entries)

  const locals = server.locals
  if (!locals) {
    throw new Error('locals not found')
  }

  if (!locals.has('menu')) {
    locals.set('menu', {})
  }

  // Set initial menu from static entries
  const currentMenu = locals.get('menu')
  currentMenu[configuredNamespace] = fallbackStore
  locals.set('menu', currentMenu)
  logger.debug(`loaded menu into '${configuredNamespace}' namespace`)

  // If filePath is configured, enable polling for dynamic menu updates
  if (filePath && typeof filePath === 'string') {
    const loadMenuFromFile = async () => {
      try {
        const raw = await readFile(filePath, 'utf-8')
        const data = JSON.parse(raw)

        if (!data.entries || !Array.isArray(data.entries)) {
          logger.warn('menu file missing valid "entries" array, keeping current menu')
          return
        }

        const parsed = parseEntries(data.entries)
        const menu = locals.get('menu')
        menu[configuredNamespace] = parsed
        locals.set('menu', menu)
        logger.debug(`menu reloaded from file (${parsed.length} entries)`)
      } catch (err) {
        // On error, preserve the last known good menu
        if (err.code === 'ENOENT') {
          logger.debug(`menu file not found: ${filePath}`)
        } else {
          logger.warn(`failed to load menu from file: ${err.message}`)
        }
      }
    }

    // Load from file immediately (overrides static entries if file exists)
    await loadMenuFromFile()

    const interval = setInterval(loadMenuFromFile, RELOAD_INTERVAL_MS)
    server.addHook('onClose', () => {
      clearInterval(interval)
    })

    logger.info(`menu plugin initialized with file polling, polling ${filePath} every ${RELOAD_INTERVAL_MS / 1000}s`)
  } else {
    logger.info(`menu plugin initialized with static entries (${fallbackStore.length} entries)`)
  }
}

export default factory
