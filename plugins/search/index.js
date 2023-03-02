import { dirname } from 'path'
import { fileURLToPath } from 'url'

const currentDir = dirname(fileURLToPath(import.meta.url))

const factory = async (trifid) => {
  const { render } = trifid

  return async (_req, res, _next) => {
    res.send(await render(`${currentDir}/view.hbs`, {
      currentLanguage: res.locals.currentLanguage,
      defaultLanguage: res.locals.defaultLanguage,
      locals: res.locals
    }, {
      title: 'Datasets'
    }))
  }
}

export default factory
