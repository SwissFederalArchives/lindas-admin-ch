import '/datasets/zack.js'

window.i18next.init({
  fallbackLng: 'de'
})

  const options = {
    endpointUrl: '/query',
    filterContainer: 'filter-container',
    resultTypes: ['http://rdfs.org/ns/void#Dataset'],
    resultList: {
      pageSize: 20,
      preload: 80
    },
    queries: {
      ldcatalogResultset: `PREFIX  :     <http://voc.zazuko.com/zack#>
PREFIX  schema: <http://schema.org/>
PREFIX  rdf:  <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX  xsd:  <http://www.w3.org/2001/XMLSchema#>
PREFIX  skos: <http://www.w3.org/2004/02/skos/core#>
PREFIX  rdfs: <http://www.w3.org/2000/01/rdf-schema#>
prefix  void: <http://rdfs.org/ns/void#>

CONSTRUCT 
  { 
    :query :result ?sub .
    ?sub rdf:type :resultItem .
    ?sub ?pred ?obj .
    ?obj schema:name ?oname .
  }
WHERE
  { { SELECT DISTINCT  ?sub
      WHERE
        { { SELECT  ?sub
            WHERE
              { ?sub schema:name|schema:description ?name .
	        \${textmatch}
	        \${filters}
	  FILTER NOT EXISTS {?sub schema:expires ?x}
	  FILTER NOT EXISTS {?sub schema:creativeWorkStatus <https://ld.admin.ch/definedTerm/CreativeWorkStatus/Draft>}

              }
            ORDER BY ?resultType ?name
          }
        }
      OFFSET \${offset} 
      LIMIT  \${limit} 
    }
    SERVICE <db://lindas> {{ ?sub  ?pred  ?obj
      OPTIONAL
        { ?obj  schema:name  ?oname }
    }}
  }`,
      ldcatalogMeta: `PREFIX  :     <http://voc.zazuko.com/zack#>
PREFIX  schema: <http://schema.org/>
PREFIX  rdf:  <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX  xsd:  <http://www.w3.org/2001/XMLSchema#>
PREFIX  skos: <http://www.w3.org/2004/02/skos/core#>
PREFIX  rdfs: <http://www.w3.org/2000/01/rdf-schema#>
prefix  void: <http://rdfs.org/ns/void#>

CONSTRUCT 
  { 
    _:c0 :numberOfResults ?count .
    _:c0 :queryStart ?querystart .
    _:c0 :queryEnd ?queryend .
  }
WHERE
  { { SELECT  (COUNT(DISTINCT ?sub) AS ?count)
      WHERE
        { ?sub schema:name|schema:decription ?name .
          \${textmatch}
          \${filters}
	  FILTER NOT EXISTS {?sub schema:expires ?x}
	  FILTER NOT EXISTS {?sub schema:creativeWorkStatus <https://ld.admin.ch/definedTerm/CreativeWorkStatus/Draft>}
	}
    }
  }`,
	    ldcatalogFulltextPart: 'FILTER( CONTAINS(LCASE(?name), LCASE("${searchString}")))'
    },
    endpoints: {
      '/query': {
        queries: {
          search: 'ldcatalogResultset',
          count: 'ldcatalogMeta',
          textmatch: 'ldcatalogFulltextPart'
        }
      }
    },
    plugins: [],
  }

const zack = document.querySelector('zack-search')
zack.options = options

window.app = zack
