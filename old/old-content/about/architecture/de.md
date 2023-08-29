# LINDAS Architektur

LINDAS besteht im Kern aus einem Triplestore (Graphdatenbank), dem eine Reihe von Werkzeugen zur Datenkonvertierung und -integration hinzugefügt wird. Eine Schnittstelle zur Datenabfrage und ein Werkzeug zur Veröffentlichung von Daten als Webseiten bereichern die Infrastruktur. Ein [GitLab](https://gitlab.ldbar.ch/) ermöglicht es zusätzlich, die bestehenden Datenstrukturen der Datensätze zu dokumentieren.

![Gesamtsystem LINDAS](/static-assets/img/architecture-DE.jpg)

Das Linked Data Ökosystem besteht im Moment aus drei verschiedenen Triplestores. Zentral dabei ist LINDAS als generischer Store (themenunabhängig) für die gesamte eidgenössische Verwaltung. Historisch gewachsen existieren zwei weitere Triplestores von Swisstopo und der Bundeskanzlei.

## Triplestores

| Name          | URL                          | Query Endpoint                              | SPARQL Endpoint                           | Technisches Produkt                                      |
|---------------|------------------------------|---------------------------------------------|-------------------------------------------|----------------------------------------------------------|
| LINDAS        | https://ld.admin.ch          | https://ld.admin.ch/query                   | https://ld.admin.ch/sparql                | [Stardog](https://www.stardog.com/platform/)             |
| Swisstopo     | https://geo.ld.admin.ch      | https://geo.ld.admin.ch/query               | https://geo.ld.admin.ch/sparql            | [Fuseki](https://jena.apache.org/documentation/fuseki2/) |
| Bundeskanzlei | https://fedlex.data.admin.ch | https://fedlex.data.admin.ch/sparqlendpoint | https://fedlex.data.admin.ch/de-CH/sparql | [Virtuoso](https://virtuoso.openlinksw.com/)             |


## Federation über mehrere Triplestores

Ein wichtiges Prinzip im Arbeiten mit Linked Data ist die Möglichkeit, innerhalb einer einzigen SPARQL Query mehrere Triplestores gleichzeitig abzufragen. In diesem Fall spricht man von einer [Federated Query](https://www.w3.org/TR/sparql11-federated-query/).

## Datenintegration

Das [GitLab des Bundesarchivs](https://gitlab.ldbar.ch/) dient dazu, die Daten für LINDAS mit Hilfe von CI/CD-Pipelines vorzubereiten, bevor sie als RDF im Triplestore gespeichert werden.

## Datenkonvertierungen

Der [Cube Creator](/about/tools#content-cube-creator) erleichtert die Konvertierung von Daten in RDF, wenn diese als multidimensionale Würfel betrachtet werden können.

## Issue Management für Datensätze

Das [GitLab](https://gitlab.ldbar.ch/) wird auch für das Issue Management der verschiedenen Datensätze genutzt.

## Cache Server

Zusätzlich zum Leseendpunkt `https://ld.admin.ch/query` wird ein mit [Varnish](https://varnish-cache.org/) umgesetzter Cache Server unter https://lindas-cached.cluster.ldbar.ch/query betrieben.

## Namespaces, Namedgraphs und Benutzernamen

Die Daten in LINDAS werden mit Hilfe von verschiedenen Namespaces organisiert und strukturiert. Die Zugriffskontrolle zu den Daten basiert auf Namedgraphs in Kombination mit Benutzernamen.
