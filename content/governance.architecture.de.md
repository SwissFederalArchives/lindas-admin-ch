# Linked Data Architektur bei der Schweizerischen Eidgenossenschaft
Das Linked Data Ökosystem besteht im Moment aus drei verschiedenen Triplestores. Zentral dabei ist LINDAS als generischer Store (themenunabhängig) für die gesamte eidgenössische Verwaltung. Historisch gewachsen existieren zwei weitere Triplestores von Swisstopo und der Bundeskanzlei.

## Triplestores
|Name|URL|Query Endpoint|SPARQL Endpoint|Technisches Produkt|
|----|---|--------------|---------------|-------------------|
|LINDAS|https://ld.admin.ch|https://ld.admin.ch/query|https://ld.admin.ch/sparql|[Stardog](https://www.stardog.com/platform/)|
|Swisstopo|https://geo.ld.admin.ch|https://geo.ld.admin.ch/query|https://geo.ld.admin.ch/sparql|[Fuseki](https://jena.apache.org/documentation/fuseki2/)|
|Bundeskanzlei|https://fedlex.data.admin.ch|https://fedlex.data.admin.ch/sparqlendpoint|https://fedlex.data.admin.ch/de-CH/sparql|[Virtuoso](https://virtuoso.openlinksw.com/)|

## Federation über mehrere Triplestores
Ein wichtiges Prinzip im Arbeiten mit Linked Data ist die Möglichkeit, innerhalb einer einzigen SPARQL Query mehrere Triplestores gleichzeitig abzufragen. In diesem Fall spricht man von einer [Federated Query](https://www.w3.org/TR/sparql11-federated-query/).




