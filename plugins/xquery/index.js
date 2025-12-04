import { Readable } from 'node:stream'
import { ReadableStream } from 'node:stream/web'
import { getListenerURL } from 'lindas-trifid-core'

/**
 * This plugin is for adding xkey headers to the response.
 * This is useful for caching.
 */

const factory = async (trifid) => {
  const { server, logger } = trifid

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
        // Filter out content-length and force Accept-Encoding: identity to prevent
        // compression issues. Node.js fetch auto-decompresses responses, which would
        // cause a mismatch between Content-Encoding header and actual body if we
        // allowed compressed responses from the internal request.
        const headers = new Headers(Object.fromEntries(Object.entries(request.headers).filter((header) => {
          if (!Array.isArray(header) || header.length !== 2) {
            return false
          }
          const headerName = header[0].toLowerCase()
          return headerName !== 'content-length' && headerName !== 'accept-encoding'
        })))
        // Force identity encoding to prevent compression on internal request
        headers.set('accept-encoding', 'identity')
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
        // Forward headers from sparql-proxy response, excluding compression-related headers.
        // We request with Accept-Encoding: identity, so there should be no Content-Encoding,
        // but we filter it out just in case to prevent mismatches.
        // Fastify's @fastify/compress will handle compression for the outer response.
        const excludedResponseHeaders = ['content-encoding', 'transfer-encoding', 'content-length']
        Array.from(req.headers.entries()).forEach(([key, value]) => {
          if (!excludedResponseHeaders.includes(key.toLowerCase())) {
            reply.header(key, value)
          }
        })
        if (req.status === 200) {
          const path = request.raw.url.split('?')[0].split('/').slice(2).join('/')
          const xkeyValue = cleanupHeaderValue(path, 'default')

          if (xkeyValue !== path) {
            logger.warn({
              plugin: 'xquery',
              requestUrl: request.raw.url,
              originalPath: path,
              sanitizedValue: xkeyValue
            }, 'Sanitized xkey header value detected')
          }

          reply.header('xkey', xkeyValue)
        }
        let readableBody = req.body
        if (readableBody instanceof ReadableStream) {
          readableBody = Readable.fromWeb(readableBody)
        }
        reply.code(req.status).send(readableBody)
        return reply
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

  // Decode FIRST to prevent bypassing CRLF filtering with URL encoding
  let decoded
  try {
    decoded = decodeURIComponent(headerValue)
  } catch {
    return defaultValue
  }

  // THEN split, remove all lines except the first one (can be CRLF, LF or CR), trim, and return
  const newValue = decoded.split(/\r\n|\r|\n/)[0].trim()
  if (newValue.length === 0) {
    return defaultValue
  }
  if (newValue.length > 256) {
    return defaultValue
  }

  // Remove all control characters to prevent header injection
  return newValue.replace(/[\x00-\x1F\x7F]/g, '') // eslint-disable-line no-control-regex
}

export default factory
