/**
 * This plugin is for adding xkey headers to the response.
 * This is useful for caching.
 */

const factory = async (_trifid) => {
  return {
    defaultConfiguration: async () => {
      return {
        paths: ['/query', '/query/*'],
        methods: ['GET', 'HEAD', 'OPTIONS', 'POST']
      }
    },
    routeHandler: async () => {
      const handler = async (request, reply) => {
        const searchParams = new URLSearchParams(request.query)
        const serializedParams = searchParams.toString()
        const instanceQueryUrl = `${request.protocol}://${request.hostname}/x-query${serializedParams ? `?${serializedParams}` : ''}`
        const headers = new Headers(Object.fromEntries(Object.entries(request.headers).filter((header) => {
          if (!Array.isArray(header) || header.length !== 2) {
            return false
          }
          return header[0].toLowerCase() !== 'content-length'
        })))
        const body = typeof request.body === 'string' ? request.body : new URLSearchParams(request.body)
        const req = await fetch(instanceQueryUrl, {
          method: request.method,
          headers,
          body
        })
        const path = request.raw.url.split('?')[0].split('/').slice(2).join('/')
        const xkeyValue = path || 'default'
        if (req.status === 200) {
          reply.header('xkey', xkeyValue)
        }
        return reply.code(req.status).send(req.body)
      }
      return handler
    }
  }
}

export default factory
