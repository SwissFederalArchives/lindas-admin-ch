const { build } = require('../trifid/esbuild')
const options = require('../esbuild.config.json')

build(options)
    .then(() => console.log('Build complete'))
    .catch(console.error)
