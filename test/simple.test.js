import { describe, it } from 'node:test'
import { strictEqual } from 'node:assert'

import trifid from 'lindas-trifid-core'

describe('Simple Trifid Import Test', () => {
  it('should import trifid without crashing', async () => {
    strictEqual(typeof trifid, 'function')
  })

  it('should create minimal trifid instance', async () => {
    const instance = await trifid({
      server: {
        logLevel: 'error',
        listener: { port: 0 }
      }
    })
    strictEqual(typeof instance.start, 'function')
    strictEqual(typeof instance.server, 'object')

    // Start and immediately stop
    const server = await instance.start()
    await server.close()
  })
})
