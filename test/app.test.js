/* eslint-disable no-unused-vars */

import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { strictEqual } from 'node:assert'
import { describe, it } from 'node:test'

import trifid from '@lindas/trifid-core'

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
  describe('Basic tests (config.yaml)', () => {
    it('should start without crashing', async () => {
      const trifidInstance = await createTrifidInstance(configPathLocal)
      const trifidListener = await trifidInstance.start()
      await new Promise((resolve) => { setTimeout(resolve, 200) })
      const res = await fetch(`${getListenerURL(trifidListener)}/`)
      strictEqual(res.status, 200)
      await trifidListener.close()
    })

    it('should have /sparql (redirected)', async () => {
      const trifidInstance = await createTrifidInstance(configPathLocal)
      const trifidListener = await trifidInstance.start()
      await new Promise((resolve) => { setTimeout(resolve, 200) })
      const res = await fetch(`${getListenerURL(trifidListener)}/sparql`)
      strictEqual(res.status, 200)
      strictEqual(res.redirected, true)
      await trifidListener.close()
    })
    it('should have /sparql/', async () => {
      const trifidInstance = await createTrifidInstance(configPathLocal)
      const trifidListener = await trifidInstance.start()
      await new Promise((resolve) => { setTimeout(resolve, 200) })
      const res = await fetch(`${getListenerURL(trifidListener)}/sparql/`)
      strictEqual(res.status, 200)
      strictEqual(res.redirected, false)
      await trifidListener.close()
    })

    it('should have /graph-explorer (redirected)', async () => {
      const trifidInstance = await createTrifidInstance(configPathLocal)
      const trifidListener = await trifidInstance.start()
      await new Promise((resolve) => { setTimeout(resolve, 200) })
      const res = await fetch(`${getListenerURL(trifidListener)}/graph-explorer`)
      strictEqual(res.status, 200)
      strictEqual(res.redirected, true)
      await trifidListener.close()
    })
    it('should have /graph-explorer/', async () => {
      const trifidInstance = await createTrifidInstance(configPathLocal)
      const trifidListener = await trifidInstance.start()
      await new Promise((resolve) => { setTimeout(resolve, 200) })
      const res = await fetch(`${getListenerURL(trifidListener)}/graph-explorer/`)
      strictEqual(res.status, 200)
      strictEqual(res.redirected, false)
      await trifidListener.close()
    })

    it('should have /spex (redirected)', async () => {
      const trifidInstance = await createTrifidInstance(configPathLocal)
      const trifidListener = await trifidInstance.start()
      await new Promise((resolve) => { setTimeout(resolve, 200) })
      const res = await fetch(`${getListenerURL(trifidListener)}/spex`)
      strictEqual(res.status, 200)
      strictEqual(res.redirected, true)
      await trifidListener.close()
    })
    it('should have /spex/', async () => {
      const trifidInstance = await createTrifidInstance(configPathLocal)
      const trifidListener = await trifidInstance.start()
      await new Promise((resolve) => { setTimeout(resolve, 200) })
      const res = await fetch(`${getListenerURL(trifidListener)}/spex/`)
      strictEqual(res.status, 200)
      strictEqual(res.redirected, false)
      await trifidListener.close()
    })

    it('should have /datasets (redirected)', async () => {
      const trifidInstance = await createTrifidInstance(configPathLocal)
      const trifidListener = await trifidInstance.start()
      await new Promise((resolve) => { setTimeout(resolve, 200) })
      const res = await fetch(`${getListenerURL(trifidListener)}/datasets`)
      strictEqual(res.status, 200)
      strictEqual(res.redirected, true)
      await trifidListener.close()
    })
    it('should have /datasets/', async () => {
      const trifidInstance = await createTrifidInstance(configPathLocal)
      const trifidListener = await trifidInstance.start()
      await new Promise((resolve) => { setTimeout(resolve, 200) })
      const res = await fetch(`${getListenerURL(trifidListener)}/datasets/`)
      strictEqual(res.status, 200)
      strictEqual(res.redirected, false)
      await trifidListener.close()
    })
  })

  describe('Basic tests (config.norewrite.yaml)', () => {
    it('should start without crashing', async () => {
      const trifidInstance = await createTrifidInstance(configPathNoRewrite)
      const trifidListener = await trifidInstance.start()
      await new Promise((resolve) => { setTimeout(resolve, 200) })
      const res = await fetch(`${getListenerURL(trifidListener)}/`)
      strictEqual(res.status, 200)
      await trifidListener.close()
    })

    it('should have /sparql (redirected)', async () => {
      const trifidInstance = await createTrifidInstance(configPathNoRewrite)
      const trifidListener = await trifidInstance.start()
      await new Promise((resolve) => { setTimeout(resolve, 200) })
      const res = await fetch(`${getListenerURL(trifidListener)}/sparql`)
      strictEqual(res.status, 200)
      strictEqual(res.redirected, true)
      await trifidListener.close()
    })
    it('should have /sparql/', async () => {
      const trifidInstance = await createTrifidInstance(configPathNoRewrite)
      const trifidListener = await trifidInstance.start()
      await new Promise((resolve) => { setTimeout(resolve, 200) })
      const res = await fetch(`${getListenerURL(trifidListener)}/sparql/`)
      strictEqual(res.status, 200)
      strictEqual(res.redirected, false)
      await trifidListener.close()
    })

    it('should have /graph-explorer (redirected)', async () => {
      const trifidInstance = await createTrifidInstance(configPathNoRewrite)
      const trifidListener = await trifidInstance.start()
      await new Promise((resolve) => { setTimeout(resolve, 200) })
      const res = await fetch(`${getListenerURL(trifidListener)}/graph-explorer`)
      strictEqual(res.status, 200)
      strictEqual(res.redirected, true)
      await trifidListener.close()
    })
    it('should have /graph-explorer/', async () => {
      const trifidInstance = await createTrifidInstance(configPathNoRewrite)
      const trifidListener = await trifidInstance.start()
      await new Promise((resolve) => { setTimeout(resolve, 200) })
      const res = await fetch(`${getListenerURL(trifidListener)}/graph-explorer/`)
      strictEqual(res.status, 200)
      strictEqual(res.redirected, false)
      await trifidListener.close()
    })

    it('should have /spex (redirected)', async () => {
      const trifidInstance = await createTrifidInstance(configPathNoRewrite)
      const trifidListener = await trifidInstance.start()
      await new Promise((resolve) => { setTimeout(resolve, 200) })
      const res = await fetch(`${getListenerURL(trifidListener)}/spex`)
      strictEqual(res.status, 200)
      strictEqual(res.redirected, true)
      await trifidListener.close()
    })
    it('should have /spex/', async () => {
      const trifidInstance = await createTrifidInstance(configPathNoRewrite)
      const trifidListener = await trifidInstance.start()
      await new Promise((resolve) => { setTimeout(resolve, 200) })
      const res = await fetch(`${getListenerURL(trifidListener)}/spex/`)
      strictEqual(res.status, 200)
      strictEqual(res.redirected, false)
      await trifidListener.close()
    })

    it('should have /datasets (redirected)', async () => {
      const trifidInstance = await createTrifidInstance(configPathNoRewrite)
      const trifidListener = await trifidInstance.start()
      await new Promise((resolve) => { setTimeout(resolve, 200) })
      const res = await fetch(`${getListenerURL(trifidListener)}/datasets`)
      strictEqual(res.status, 200)
      strictEqual(res.redirected, true)
      await trifidListener.close()
    })
    it('should have /datasets/', async () => {
      const trifidInstance = await createTrifidInstance(configPathNoRewrite)
      const trifidListener = await trifidInstance.start()
      await new Promise((resolve) => { setTimeout(resolve, 200) })
      const res = await fetch(`${getListenerURL(trifidListener)}/datasets/`)
      strictEqual(res.status, 200)
      strictEqual(res.redirected, false)
      await trifidListener.close()
    })
  })
})
