const factory = async (trifid) => {
  const { config, logger, server } = trifid
  const { namespace, entries } = config

  if (!entries || !Array.isArray(entries)) {
    throw new Error('\'entries\' should be a non-empty array')
  }

  const configuredNamespace = namespace ?? 'default'
  const store = []

  for (const entry of entries) {
    const { path, label } = entry
    if (!path || typeof path !== 'string') {
      throw new Error('\'path\' should be a non-empty string')
    }

    if (!label || typeof label !== 'string') {
      throw new Error('\'label\' should be a non-empty string')
    }

    store.push({
      path,
      label
    })
  }

  const locals = server.locals
  if (!locals) {
    throw new Error('locals not found')
  }

  if (!locals.has('menu')) {
    locals.set('menu', {})
  }

  const currentMenu = locals.get('menu')
  currentMenu[configuredNamespace] = store
  locals.set('menu', currentMenu)
  logger.debug(`loaded menu into '${configuredNamespace}' namespace`)
}

export default factory
