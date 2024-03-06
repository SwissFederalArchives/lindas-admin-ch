/* eslint-disable no-unused-vars */

import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { strictEqual } from 'node:assert'

import { describe, it, beforeEach, afterEach } from 'mocha'
import trifid from 'trifid-core'

const configPath = join(dirname(fileURLToPath(import.meta.url)), '..', 'config.local.yaml')

// Just to remove some warnings
process.env.SPARQL_ENDPOINT_USERNAME = 'public'
process.env.SPARQL_ENDPOINT_PASSWORD = 'public'

/**
 * Create a Trifid instance.
 */
const createTrifidInstance = async () => await trifid({
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
 *
 * @param {import('fastify').FastifyInstance} server Server.
 * @returns {string}
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

describe('Trifid', () => {
  describe('Basic tests', () => {
    let trifidListener

    beforeEach(async () => {
      const trifidInstance = await createTrifidInstance()
      trifidListener = await trifidInstance.start()
    })

    afterEach(async () => {
      await trifidListener.close()
    })

    it('should start without crashing', async () => {
      const res = await fetch(`${getListenerURL(trifidListener)}/`)
      const _body = await res.text() // Just make sure that the stream is consumed
      strictEqual(res.status, 200)
    })

    it('should have /sparql (redirected)', async () => {
      const res = await fetch(`${getListenerURL(trifidListener)}/sparql`)
      const _body = await res.text() // Just make sure that the stream is consumed
      strictEqual(res.status, 200)
      strictEqual(res.redirected, true)
    })
    it('should have /sparql/', async () => {
      const res = await fetch(`${getListenerURL(trifidListener)}/sparql/`)
      const _body = await res.text() // Just make sure that the stream is consumed
      strictEqual(res.status, 200)
      strictEqual(res.redirected, false)
    })

    it('should have /graph-explorer (redirected)', async () => {
      const res = await fetch(`${getListenerURL(trifidListener)}/graph-explorer`)
      const _body = await res.text() // Just make sure that the stream is consumed
      strictEqual(res.status, 200)
      strictEqual(res.redirected, true)
    })
    it('should have /graph-explorer/', async () => {
      const res = await fetch(`${getListenerURL(trifidListener)}/graph-explorer/`)
      const _body = await res.text() // Just make sure that the stream is consumed
      strictEqual(res.status, 200)
      strictEqual(res.redirected, false)
    })

    it('should have /spex (redirected)', async () => {
      const res = await fetch(`${getListenerURL(trifidListener)}/spex`)
      const _body = await res.text() // Just make sure that the stream is consumed
      strictEqual(res.status, 200)
      strictEqual(res.redirected, true)
    })
    it('should have /spex/', async () => {
      const res = await fetch(`${getListenerURL(trifidListener)}/spex/`)
      const _body = await res.text() // Just make sure that the stream is consumed
      strictEqual(res.status, 200)
      strictEqual(res.redirected, false)
    })

    it('should have /datasets (redirected)', async () => {
      const res = await fetch(`${getListenerURL(trifidListener)}/datasets`)
      const _body = await res.text() // Just make sure that the stream is consumed
      strictEqual(res.status, 200)
      strictEqual(res.redirected, true)
    })
    it('should have /datasets/', async () => {
      const res = await fetch(`${getListenerURL(trifidListener)}/datasets/`)
      const _body = await res.text() // Just make sure that the stream is consumed
      strictEqual(res.status, 200)
      strictEqual(res.redirected, false)
    })
  })
})
