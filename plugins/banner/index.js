import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const RELOAD_INTERVAL_MS = 10_000

const factory = async (trifid) => {
  const { config, logger, server } = trifid
  const filePath = config.filePath
    ? resolve(config.filePath)
    : resolve('overlay/banner.json')

  const locals = server.locals
  if (!locals) {
    throw new Error('locals not found')
  }

  const loadBanner = async () => {
    try {
      const raw = await readFile(filePath, 'utf-8')
      const data = JSON.parse(raw)
      if (data.enabled) {
        locals.set('banner', data)
        logger.debug('banner loaded and enabled')
      } else {
        locals.set('banner', null)
        logger.debug('banner disabled via config')
      }
    } catch (err) {
      locals.set('banner', null)
      if (err.code === 'ENOENT') {
        logger.debug(`banner file not found: ${filePath}`)
      } else {
        logger.warn(`failed to load banner: ${err.message}`)
      }
    }
  }

  await loadBanner()
  setInterval(loadBanner, RELOAD_INTERVAL_MS)

  logger.info(`banner plugin initialized, polling ${filePath} every ${RELOAD_INTERVAL_MS / 1000}s`)
}

export default factory
