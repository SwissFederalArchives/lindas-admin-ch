const express = require('express')
const path = require('path')
const fs = require('fs')
const { parsers } = require('@rdf-esm/formats-common')
const Serializer = require('@rdfjs/serializer-rdfjs')

const serializer = new Serializer({
    module: 'esm',
})

function middleware () {
    const router = express.Router()

    router.use('/datasets/shape/:shape.ttl', (req, res, next) => {
        const filePath = path.join(__dirname, '../public/datasets/shape', `${req.params.shape}.ttl`)
        if (fs.existsSync(filePath)) {
            const ttl = fs.createReadStream(filePath)

            return res.format({
                'application/javascript': () => {
                    res.set('content-type', 'application/javascript')
                    serializer.import(parsers.import('application/trig', ttl)).pipe(res)
                },
                'text/turtle': () => {
                    res.set('content-type', 'text/turtle')
                    ttl.pipe(res)
                },
            })
        }


        return next()
    })

    return router
}

function factory (router, configs) {
    return this.middleware.mountAll(router, configs, (config) => {
        return middleware(config)
    })
}

module.exports = factory
