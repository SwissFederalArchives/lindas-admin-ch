/**
 * This plugin redirects requests to the same URL with a trailing slash.
 * This is useful to avoid duplicate content.
 */

const factory = async (_trifid) => {
  return {
    defaultConfiguration: async () => {
      return {
        methods: ['GET']
      }
    },
    routeHandler: async () => {
      const handler = async (request, reply) => {
        const fullUrl = `${request.protocol}://${request.hostname}${request.raw.url}`
        const fullUrlObject = new URL(fullUrl)
        const fullUrlPathname = fullUrlObject.pathname

        // Enforce trailing slash
        reply.code(301).redirect(`${fullUrlPathname}/`)
        return reply
      }
      return handler
    }
  }
}

export default factory
