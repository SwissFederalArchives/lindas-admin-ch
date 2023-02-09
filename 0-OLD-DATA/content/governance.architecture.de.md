# Linked Data Architektur bei der Schweizerischen Eidgenossenschaft
Das Linked Data Ökosystem besteht im Moment aus drei verschiedenen Triplestores. Zentral dabei ist LINDAS als generischer Store (themenunabhängig) für die gesamte eidgenössische Verwaltung. Historisch gewachsen existieren zwei weitere Triplestores von Swisstopo und der Bundeskanzlei.

## Triplestores
<table class="table">
    <tr>
        <td>Name</td>
        <td>URL</td>
        <td>Query Endpoint</td>
        <td>SPARQL Endpoint</td>
        <td>Technisches Produkt</td>
    </tr>
    <tr>
        <td>LINDAS</td>
        <td>https://ld.admin.ch</td>
        <td>https://ld.admin.ch/query</td>
        <td>https://ld.admin.ch/sparql</td>
        <td>[Stardog](https://www.stardog.com/platform/)</td>
    </tr>
    <tr>
        <td>Swisstopo</td>
        <td>https://geo.ld.admin.ch</td>
        <td>https://geo.ld.admin.ch/query</td>
        <td>https://geo.ld.admin.ch/sparql</td>
        <td>[Fuseki](https://jena.apache.org/documentation/fuseki2/)</td>
    </tr>
    <tr>
        <td>Bundeskanzlei</td>
        <td>https://fedlex.data.admin.ch</td>
        <td>https://fedlex.data.admin.ch/sparqlendpoint</td>
        <td>https://fedlex.data.admin.ch/de-CH/sparql</td>
        <td>[Virtuoso](https://virtuoso.openlinksw.com/)</td>
    </tr>
</table>

## Federation über mehrere Triplestores
Ein wichtiges Prinzip im Arbeiten mit Linked Data ist die Möglichkeit, innerhalb einer einzigen SPARQL Query mehrere Triplestores gleichzeitig abzufragen. In diesem Fall spricht man von einer [Federated Query](https://www.w3.org/TR/sparql11-federated-query/).




