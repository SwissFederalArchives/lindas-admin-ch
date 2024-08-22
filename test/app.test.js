/* eslint-disable no-unused-vars */

import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { strictEqual } from 'node:assert'

import { describe, it, beforeEach, afterEach } from 'mocha'
import trifid from 'trifid-core'

const configPathLocal = join(dirname(fileURLToPath(import.meta.url)), '..', 'config.local.yaml')
const configPathNoRewrite = join(dirname(fileURLToPath(import.meta.url)), '..', 'config.local.yaml')

// Just to remove some warnings
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
      port: 4242
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
  describe('Basic tests (config.yaml)', () => {
    let trifidListener

    beforeEach(async () => {
      const trifidInstance = await createTrifidInstance(configPathLocal)
      trifidListener = await trifidInstance.start()
    })

    afterEach(async () => {
      await trifidListener.close()
    })

    it('should start without crashing', async () => {
      const res = await fetch(`${getListenerURL(trifidListener)}/`)
      strictEqual(res.status, 200)
    })

    it('should have /sparql (redirected)', async () => {
      const res = await fetch(`${getListenerURL(trifidListener)}/sparql`)
      strictEqual(res.status, 200)
      strictEqual(res.redirected, true)
    })
    it('should have /sparql/', async () => {
      const res = await fetch(`${getListenerURL(trifidListener)}/sparql/`)
      strictEqual(res.status, 200)
      strictEqual(res.redirected, false)
    })

    it('should have /graph-explorer (redirected)', async () => {
      const res = await fetch(`${getListenerURL(trifidListener)}/graph-explorer`)
      strictEqual(res.status, 200)
      strictEqual(res.redirected, true)
    })
    it('should have /graph-explorer/', async () => {
      const res = await fetch(`${getListenerURL(trifidListener)}/graph-explorer/`)
      strictEqual(res.status, 200)
      strictEqual(res.redirected, false)
    })

    it('should have /spex (redirected)', async () => {
      const res = await fetch(`${getListenerURL(trifidListener)}/spex`)
      strictEqual(res.status, 200)
      strictEqual(res.redirected, true)
    })
    it('should have /spex/', async () => {
      const res = await fetch(`${getListenerURL(trifidListener)}/spex/`)
      strictEqual(res.status, 200)
      strictEqual(res.redirected, false)
    })

    it('should have /datasets (redirected)', async () => {
      const res = await fetch(`${getListenerURL(trifidListener)}/datasets`)
      strictEqual(res.status, 200)
      strictEqual(res.redirected, true)
    })
    it('should have /datasets/', async () => {
      const res = await fetch(`${getListenerURL(trifidListener)}/datasets/`)
      strictEqual(res.status, 200)
      strictEqual(res.redirected, false)
    })
  })

  describe('Basic tests (config.norewrite.yaml)', () => {
    let trifidListener

    beforeEach(async () => {
      const trifidInstance = await createTrifidInstance(configPathNoRewrite)
      trifidListener = await trifidInstance.start()
    })

    afterEach(async () => {
      await trifidListener.close()
    })

    it('should start without crashing', async () => {
      const res = await fetch(`${getListenerURL(trifidListener)}/`)
      strictEqual(res.status, 200)
    })

    it('should have /sparql (redirected)', async () => {
      const res = await fetch(`${getListenerURL(trifidListener)}/sparql`)
      strictEqual(res.status, 200)
      strictEqual(res.redirected, true)
    })
    it('should have /sparql/', async () => {
      const res = await fetch(`${getListenerURL(trifidListener)}/sparql/`)
      strictEqual(res.status, 200)
      strictEqual(res.redirected, false)
    })

    it('should have /graph-explorer (redirected)', async () => {
      const res = await fetch(`${getListenerURL(trifidListener)}/graph-explorer`)
      strictEqual(res.status, 200)
      strictEqual(res.redirected, true)
    })
    it('should have /graph-explorer/', async () => {
      const res = await fetch(`${getListenerURL(trifidListener)}/graph-explorer/`)
      strictEqual(res.status, 200)
      strictEqual(res.redirected, false)
    })

    it('should have /spex (redirected)', async () => {
      const res = await fetch(`${getListenerURL(trifidListener)}/spex`)
      strictEqual(res.status, 200)
      strictEqual(res.redirected, true)
    })
    it('should have /spex/', async () => {
      const res = await fetch(`${getListenerURL(trifidListener)}/spex/`)
      strictEqual(res.status, 200)
      strictEqual(res.redirected, false)
    })

    it('should have /datasets (redirected)', async () => {
      const res = await fetch(`${getListenerURL(trifidListener)}/datasets`)
      strictEqual(res.status, 200)
      strictEqual(res.redirected, true)
    })
    it('should have /datasets/', async () => {
      const res = await fetch(`${getListenerURL(trifidListener)}/datasets/`)
      strictEqual(res.status, 200)
      strictEqual(res.redirected, false)
    })
  })
})
