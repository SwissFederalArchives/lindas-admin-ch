import { dirname } from 'path'
import { fileURLToPath } from 'url'

const currentDir = dirname(fileURLToPath(import.meta.url))

const factory = async (trifid) => {
  const { render } = trifid

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
          reply.redirect(`${fullUrlPathname}/`)
          return reply
        }

        reply.type('text/html').send(await render(request, `${currentDir}/view.hbs`, {
          currentLanguage: request.session.get('currentLanguage'),
          defaultLanguage: request.session.get('defaultLanguage')
        }, {
          title: 'Datasets'
        }))
        return reply
      }
      return handler
    }
  }
}

export default factory
