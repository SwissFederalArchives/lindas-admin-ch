const factory = async (trifid) => {
  const { config, logger } = trifid
  const { namespace, entries } = config

  if (!entries || !Array.isArray(entries)) {
    throw new Error(`'entries' should be a non-empty array`)
  }

  const configuredNamespace = namespace ?? 'default';
  const store = []

  let i = 0

  for (const entry of entries) {
    const { path, label } = entry
    if (!path || typeof path !== 'string') {
      throw new Error(`'path' should be a non-empty string`)
    }

    if (!label || typeof label !== 'string') {
      throw new Error(`'label' should be a non-empty string`)
    }

    store.push({
      path,
      label
    })
  }

  return (_req, res, next) => {
    logger.debug(`loaded menu into '${configuredNamespace}' namespace`)

    // just make sure that the `menu` entry exists
    if (!res.locals.menu) {
      res.locals.menu = {}
    }

    // add all configured entries for the specified namespace
    res.locals.menu[configuredNamespace] = store

    // let's forward all of this to other middlewares
    return next()
  }
}

export default factory
