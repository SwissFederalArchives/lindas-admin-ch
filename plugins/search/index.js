import { dirname } from 'path'
import { fileURLToPath } from 'url'

const currentDir = dirname(fileURLToPath(import.meta.url))

const factory = async (trifid) => {
  const { render, server } = trifid
  const locals = server.locals

  return {
    defaultConfiguration: async () => {
      return {
        methods: ['GET'],
        paths: ['/datasets', '/datasets/']
      }
    },
    routeHandler: async () => {
      const handler = async (request, reply) => {
        const fullUrl = `${request.protocol}://${request.hostname}${request.raw.url}`
        const fullUrlObject = new URL(fullUrl)
        const fullUrlPathname = fullUrlObject.pathname

        // Enforce trailing slash
        if (fullUrlPathname.slice(-1) !== '/') {
          return reply.redirect(`${fullUrlPathname}/`)
        }

        return reply.type('text/html').send(await render(`${currentDir}/view.hbs`, {
          currentLanguage: locals.get('currentLanguage'),
          defaultLanguage: locals.get('defaultLanguage')
        }, {
          title: 'Datasets'
        }))
      }
      return handler
    }
  }
}

export default factory
