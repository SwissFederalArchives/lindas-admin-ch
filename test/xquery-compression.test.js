import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { ok } from 'node:assert'
import { describe, it, before, after } from 'node:test'
import { gunzipSync } from 'node:zlib'

import trifid from 'lindas-trifid-core'

const configPathLocal = join(dirname(fileURLToPath(import.meta.url)), '..', 'config.local.yaml')

// Environment setup
process.env.SPARQL_USERNAME = 'public'
process.env.SPARQL_PASSWORD = 'public'
process.env.DATASET_BASE_URL = 'https://ld.admin.ch/'
process.env.SPARQL_ENDPOINT_URL = 'https://example.com/query'

/**
 * Create a Trifid instance.
 */
const createTrifidInstance = async (configPath) => await trifid({
  server: {
    logLevel: 'warn',
    listener: {
      port: 0
    }
  },
  extends: [
    configPath
  ]
})

/**
 * Get an endpoint of the Fastify Instance.
 */
const getListenerURL = (server) => {
  const addresses = server.addresses().map((address) => {
    if (typeof address === 'string') {
      return address
    }
    return `http://${address.address}:${address.port}`
  })

  if (addresses.length < 1) {
    throw new Error('The listener is not listening')
  }

  return addresses[0]
}

describe('xquery plugin compression handling', () => {
  let trifidInstance
  let trifidListener
  let baseUrl

  before(async () => {
    trifidInstance = await createTrifidInstance(configPathLocal)
    trifidListener = await trifidInstance.start()
    await new Promise((resolve) => { setTimeout(resolve, 200) })
    baseUrl = getListenerURL(trifidListener)
  })

  after(async () => {
    if (trifidListener) {
      await trifidListener.close()
    }
  })

  it('should not return mismatched Content-Encoding header and body', async () => {
    // This test verifies the fix for the gzip compression mismatch bug.
    // The bug was: xquery plugin forwarded Content-Encoding: gzip header
    // but the body was already decompressed by Node.js fetch.
    //
    // After the fix:
    // - If Content-Encoding: gzip is present, body MUST be gzip compressed
    // - If body is not gzip compressed, Content-Encoding: gzip MUST NOT be present

    const query = 'SELECT * WHERE { ?s ?p ?o } LIMIT 1'
    const url = `${baseUrl}/query?query=${encodeURIComponent(query)}`

    // Request with Accept-Encoding: gzip to potentially trigger compression
    const response = await fetch(url, {
      headers: {
        'Accept-Encoding': 'gzip, deflate'
      }
    })

    const contentEncoding = response.headers.get('content-encoding')
    const arrayBuffer = await response.arrayBuffer()
    const body = Buffer.from(arrayBuffer)

    if (contentEncoding === 'gzip') {
      // If header says gzip, body MUST be gzip compressed (starts with 0x1f 0x8b)
      const isGzipMagicNumber = body.length >= 2 && body[0] === 0x1f && body[1] === 0x8b

      ok(
        isGzipMagicNumber,
        'Content-Encoding is gzip but body is not gzip compressed. ' +
        'First bytes: 0x' + (body[0]?.toString(16) || 'empty') + ' 0x' + (body[1]?.toString(16) || 'empty') + ' ' +
        '(expected 0x1f 0x8b for gzip)'
      )

      // Verify we can actually decompress it
      try {
        gunzipSync(body)
        ok(true, 'Body successfully decompressed')
      } catch (err) {
        ok(false, 'Failed to decompress gzip body: ' + err.message)
      }
    } else {
      // If no gzip header, body should be plain text (not gzip compressed)
      const isGzipMagicNumber = body.length >= 2 && body[0] === 0x1f && body[1] === 0x8b

      ok(
        !isGzipMagicNumber || contentEncoding,
        'Body appears to be gzip compressed but Content-Encoding header is missing'
      )
    }
  })

  it('should handle request without Accept-Encoding header', async () => {
    const query = 'SELECT * WHERE { ?s ?p ?o } LIMIT 1'
    const url = `${baseUrl}/query?query=${encodeURIComponent(query)}`

    // Request without Accept-Encoding
    const response = await fetch(url)

    const contentEncoding = response.headers.get('content-encoding')
    const arrayBuffer = await response.arrayBuffer()
    const body = Buffer.from(arrayBuffer)

    // Without Accept-Encoding, response should not be compressed
    // (or if compressed, must have proper header)
    if (contentEncoding === 'gzip') {
      const isGzipMagicNumber = body.length >= 2 && body[0] === 0x1f && body[1] === 0x8b
      ok(isGzipMagicNumber, 'Content-Encoding: gzip present but body is not gzip')
    }

    // Response should be successful (status may vary based on SPARQL endpoint availability)
    ok(response.status < 500, `Server error: ${response.status}`)
  })
})
