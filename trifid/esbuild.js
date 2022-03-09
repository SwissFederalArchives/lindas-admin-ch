const express = require('express')
const path = require('path');
const esbuild = require('esbuild')

function prepareConfig(options) {
    return {
        ...options,
        format: 'esm',
        bundle: true,
        sourcemap: 'inline',
        splitting: true,
        watch: false,
        minify: true
    }
}

async function middleware(base, options) {
    let outputFiles
    const watch = {
        onRebuild(error, result) {
            if (error) {
                console.error('watch build failed:', error)
            } else {
                console.log('modules rebuilt')
                ;({outputFiles} = result)
            }
        }
    }

    const config = {
        ...prepareConfig(options),
        watch,
        outdir: base,
        write: false,
        allowOverwrite: true
    }

    ;({outputFiles} = await esbuild.build(config))

    const router = express.Router()
    router.use('/', (req, res, next) => {
        if (!req.url.endsWith('.js')) {
            return next()
        }

        const filePath = path.join(__dirname, '../public/src', req.url)
        const file = outputFiles.find(file => file.path === filePath)
        if (file) {
            res.set('content-type', 'application/javascript')
            return res.send(file.text)
        }

        return next()
    })

    return router
}

function factory(router, configs) {
    return this.middleware.mountAll(router, configs, ({ base, config }) => {
        return middleware(base, require(config))
    })
}

module.exports = factory
factory.build = async (options) => {
    await esbuild.build(prepareConfig(options))
}
