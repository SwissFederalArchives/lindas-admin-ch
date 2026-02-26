import { readFile } from 'node:fs/promises'

const defaultReloadIntervalMs = 10_000

const factory = async (trifid) => {
  const { config, logger, server } = trifid
  const { namespace, entries, filePath, reloadInterval } = config
  const reloadIntervalMs = reloadInterval
    ? reloadInterval * 1000
    : defaultReloadIntervalMs

  if (!filePath && (!entries || !Array.isArray(entries))) {
    throw new Error('\'entries\' or \'filePath\' must be configured')
  }

  const configuredNamespace = namespace ?? 'default'

  // Parse and validate menu entries
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

  const fallbackStore = (entries && Array.isArray(entries))
    ? parseEntries(entries)
    : []

  const locals = server.locals
  if (!locals) {
    throw new Error('locals not found')
  }

  if (!locals.has('menu')) {
    locals.set('menu', {})
  }

  // Set initial menu from static entries (may be empty if filePath-only)
  const currentMenu = locals.get('menu')
  currentMenu[configuredNamespace] = fallbackStore
  locals.set('menu', currentMenu)
  if (fallbackStore.length > 0) {
    logger.debug(`loaded menu into '${configuredNamespace}' namespace`)
  }

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

    const interval = setInterval(loadMenuFromFile, reloadIntervalMs)
    server.addHook('onClose', () => {
      clearInterval(interval)
    })

    logger.info(`menu plugin initialized with file polling, polling ${filePath} every ${reloadIntervalMs / 1000}s`)
  } else {
    logger.info(`menu plugin initialized with static entries (${fallbackStore.length} entries)`)
  }
}

export default factory
