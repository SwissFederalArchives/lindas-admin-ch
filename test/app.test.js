import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import assert from 'assert'
import { describe, it } from 'mocha'
import trifid from 'trifid-core'
import request from 'supertest'

const configPath = join(dirname(fileURLToPath(import.meta.url)), '../config.local.yaml')

const trifidInstance = await trifid({
  server: {
    logLevel: 'silent'
  },
  extends: [
    configPath
  ]
})

describe('Trifid', () => {
  describe('Basic tests', () => {
    it('should start without crashing', async () => {
      const response = await request(trifidInstance.server).get('/')
      assert.strictEqual(response.status, 200)
    })

    it('should have /sparql', async () => {
      const response = await request(trifidInstance.server).get('/sparql')
      assert.strictEqual(response.status, 200)
    })
  })
})
