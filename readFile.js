const fs = require('fs')

function init (router) {
  router.locals.readFile = filename => fs.readFileSync(filename).toString()
}

module.exports = init
