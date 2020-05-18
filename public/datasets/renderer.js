var renderer = {}

const rdf = Zack.rdf

const terms = {
  type: rdf.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
  name: rdf.namedNode('http://schema.org/name'),
  description: rdf.namedNode('http://schema.org/description'),
  url: rdf.namedNode('http://schema.org/url'),
  sparqlEndpoint: rdf.namedNode('http://rdfs.org/ns/void#sparqlEndpoint'),
  landingPage: rdf.namedNode('http://www.w3.org/ns/dcat#landingPage'),
  prefLabel: rdf.namedNode('http://www.w3.org/2004/02/skos/core#prefLabel'),
  sameAs: rdf.namedNode('http://schema.org/sameAs'),
  alternateName: rdf.namedNode('http://schema.org/alternateName'),
  dataset: rdf.namedNode('http://rdfs.org/ns/void#Dataset'),
  published: rdf.namedNode('http://schema.org/datePublished'),
  contact: rdf.namedNode('http://schema.org/contactPoint'),
  validFrom: rdf.namedNode('http://schema.org/validFrom')
}

renderer.init = function (metadata) {
}

renderer.renderResult = function (page, subject) {
  const root = new Zack.Clownface({ dataset: page, term: subject })

  var host = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '')

  // # Main
  // Resource Title
  var titleString = root.out(terms.name).value

  // Link to resource
  var link = root.out(terms.landingPage).value

  var titlePrefix = ''
  if (root.out(terms.dataset).terms) { titlePrefix = 'Dataset' }

  // Postfix
  var titlePostfix = ''

  // ## Administrative Area
//  if (page.match(subject, terms.type, terms.adm1).toArray().shift()) { titlePostfix = 'Canton' }
//  if (page.match(subject, terms.type, terms.adm2).toArray().shift()) { titlePostfix = 'District' }
//  if (page.match(subject, terms.type, terms.adm3).toArray().shift()) { titlePostfix = 'Municipality' }

  // ## Transporation Stop
//  var operatingPointType = page.match(subject, rdf.namedNode(host + '/def/transportation/operatingPointType')).toArray().shift()
//  if (operatingPointType) {
//    var operatingPointTypeLabel = page.match(operatingPointType.object, terms.prefLabel).toArray().filter(function engLit (x) { return (x.object.language == 'en') }).shift()
//    if (operatingPointTypeLabel) {
//      titlePostfix = operatingPointTypeLabel.object.toString()
//    }
//  }

  rendering_main = '<div class="result-main col-md-6 col-sm-6 col-xs-6">' +
                    '  <a href="' + root.out(terms.landingPage).value + '">' +
                    '    <span>' + titlePrefix + '</span>' +
                    '    <h4>' + titleString + ' <span style="font-weight: 100">' + '' + '</span></h4>' +
                    '    <span>Contact: ' + root.out(terms.contact).out(terms.name).values[0] + '</span><br>' +
		    '    <span>Published: ' + root.out(terms.published).value + '</span>' +
                    '  </a>' +
                    '</div>'

  // # Detail 1

  rendering_detail1 = '<div class="result-detail col-md-3 hidden-sm hidden-xs">' +
                     '  <span>' +  root.out(terms.description).value + '</span>' +
                      '</div>'

  // # Detail 2

  rendering_detail2 = '<div class="result-detail col-md-3 col-sm-6 col-xs-6">' +
                        '  <span><a target="_blank" href="' + root.out(terms.url).value + '">' + root.out(terms.url).value +'</a></span> <br> ' +
                        '  <span>SPARQL <a target="_blank" href="' + root.out(terms.sparqlEndpoint).value + '">Endpoint</a></span> / ' +
                        '  <span><a target="_blank" href="' + root.out(terms.landingPage).value + '">GUI</a></span>' +
                        '</div>'

  return '<div class="zack-result">' + rendering_main + rendering_detail1 + rendering_detail2 + '</div>'
}

renderer.postRender = function () {
}

window.zack = window.zack || {}
window.zack.renderer = renderer
