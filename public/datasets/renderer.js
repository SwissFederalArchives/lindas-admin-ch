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
  modified: rdf.namedNode('http://schema.org/dateModified'),
  contact: rdf.namedNode('http://schema.org/contactPoint'),
  validFrom: rdf.namedNode('http://schema.org/validFrom')
}

renderer.init = function (metadata) {
}

renderer.renderResult = function (page, subject) {
  const root = new Zack.Clownface({ dataset: page, term: subject })

  const language = [document.documentElement.lang, 'de', 'fr', 'it', '*'] || ['de', 'fr', 'it', '*']

  var host = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '')

  // # Main
  // Resource Title
  var titleString = root.out(terms.name, { language: language }).value

  // Link to resource
  var link = root.out(terms.landingPage).value

  var titlePrefix = ''
  if (root.out(terms.dataset).terms) { titlePrefix = 'Dataset' }

  function rDate(title, value) {
	  return (value ? '<span>' + title + ": "+ new Date(value).toLocaleDateString(language[0]) + ' </span>' : '')
  }

  // Postfix
  var titlePostfix = ''

  rendering_main = '<div class="result-main col-md-6 col-sm-6 col-xs-6">' +
                    '  <span><a href="' + subject.value + '">' + titlePrefix + '</a></span>' +
                    '  <h4><a href="' + subject.value + '">' + titleString + ' <span style="font-weight: 100">' + '' + '</span></a></h4>' +
                    '  <span>Contact: ' + (root.out(terms.contact).out(terms.name, { language: language }).value || '') + '</span><br>' +
		    '  ' + rDate('Created', root.out(terms.created).value) + rDate('Published', root.out(terms.published).value) + rDate('Modified', root.out(terms.modified).value) + 
                    '</div>'

  // # Detail 1

  rendering_detail1 = '<div class="result-detail col-md-3 hidden-sm hidden-xs">' +
                     '  <span>' +  (root.out(terms.description, { language: language }).value || '') + '</span>' +
                      '</div>'

  // # Detail 2

  rendering_detail2 = '<div class="result-detail col-md-3 col-sm-6 col-xs-6">' +
                        '  <span><a target="_blank" href="' + root.out(terms.url).value + '">' + (root.out(terms.url).value || '') +'</a></span> <br> ' +
                        '  <span>SPARQL <a target="_blank" href="' + root.out(terms.sparqlEndpoint).value + '">Endpoint</a></span> / ' +
                        '  <span><a target="_blank" href="' + root.out(terms.landingPage).value + '">GUI</a></span>' +
                        '</div>'

  return '<div class="zack-result">' + rendering_main + rendering_detail1 + rendering_detail2 + '</div>'
}

renderer.postRender = function () {
}

window.zack = window.zack || {}
window.zack.renderer = renderer
