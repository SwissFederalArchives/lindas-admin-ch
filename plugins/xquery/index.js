import { getListenerURL } from 'trifid-core'

/**
 * This plugin is for adding xkey headers to the response.
 * This is useful for caching.
 */

const factory = async (trifid) => {
  const { server } = trifid

  return {
    defaultConfiguration: async () => {
      return {
        paths: ['/query', '/query/*'],
        methods: ['GET', 'HEAD', 'OPTIONS', 'POST']
      }
    },
    routeHandler: async () => {
      const handler = async (request, reply) => {
        const listenerUrl = getListenerURL(server)
        const searchParams = new URLSearchParams(request.query)
        const serializedParams = searchParams.toString()
        const instanceQueryUrl = `${listenerUrl}/x-query${serializedParams ? `?${serializedParams}` : ''}`
        const headers = new Headers(Object.fromEntries(Object.entries(request.headers).filter((header) => {
          if (!Array.isArray(header) || header.length !== 2) {
            return false
          }
          return header[0].toLowerCase() !== 'content-length'
        })))
        const body = typeof request.body === 'string' ? request.body : new URLSearchParams(request.body)
        const method = request.method
        const requestOptions = {
          method,
          headers
        }
        if (method === 'POST') {
          requestOptions.body = body
        }
        const req = await fetch(instanceQueryUrl, requestOptions)
        Array.from(req.headers.entries()).forEach(([key, value]) => {
          reply.header(key, value)
        })
        if (req.status === 200) {
          const path = request.raw.url.split('?')[0].split('/').slice(2).join('/')
          const xkeyValue = cleanupHeaderValue(path, 'default')
          reply.header('xkey', xkeyValue)
        }
        return reply.code(req.status).send(req.body)
      }
      return handler
    }
  }
}

/**
 * Cleanup header value.
 * Returns default value if the header value is not a string or is empty or too long (more than 256 characters long).
 *
 * @param {string} headerValue Value of the header
 * @param {string} defaultValue Default value of the header
 * @returns {string} Cleaned up header value
 */
const cleanupHeaderValue = (headerValue, defaultValue) => {
  if (typeof headerValue !== 'string') {
    return defaultValue
  }

  // Split, remove all lines except the first one (can be CRLF, LF or CR), trim, and return
  const newValue = headerValue.split(/\r\n|\r|\n/)[0].trim()
  if (newValue.length === 0) {
    return defaultValue
  }
  if (newValue.length > 256) {
    return defaultValue
  }

  // Support URL encoded values
  return decodeURIComponent(newValue)
}

export default factory
