# Das LINDAS Ökosystem

LINDAS ist ein Gesamtsystem zur Arbeit mit Linked Data über den gesamten Lebenszyklus bestehend aus Datenkonvertierung, Datenspeicherung und Datennutzung.

![Gesamtsystem LINDAS](/static-assets/img/architecture-DE.jpg)

## Linked Data Triplestores der eidgenössischen Verwaltung

Ein zentrales Element für die Arbeit mit Linked Data ist ein Triplestore (Graphdatenbank), der die Linked Data speichert und mit Hilfe von SPARQL Queries zur weiteren Nutzung zugänglich macht. Innerhalb der Bundesverwaltung existieren momentan drei verschiedene solche Triplestores. Zentral dabei ist LINDAS als generischer und themenunabhängiger Store für die gesamte eidgenössische Verwaltung. Historisch gewachsen existieren zusätzlich zwei weitere Triplestores von Swisstopo und der Bundeskanzlei.

| Name          | URL                          | Query Endpoint                              | SPARQL Endpoint                           | Technisches Produkt                                      |
|---------------|------------------------------|---------------------------------------------|-------------------------------------------|----------------------------------------------------------|
| LINDAS        | https://ld.admin.ch          | https://ld.admin.ch/query                   | https://ld.admin.ch/sparql                | [Stardog](https://www.stardog.com/platform/)             |
| Swisstopo     | https://geo.ld.admin.ch      | https://geo.ld.admin.ch/query               | https://geo.ld.admin.ch/sparql            | [Fuseki](https://jena.apache.org/documentation/fuseki2/) |
| Bundeskanzlei | https://fedlex.data.admin.ch | https://fedlex.data.admin.ch/sparqlendpoint | https://fedlex.data.admin.ch/de-CH/sparql | [Virtuoso](https://virtuoso.openlinksw.com/)             |

## Cube Creator zur Datenkonvertierung

Um die Integration von tabellarischen Daten in LINDAS mit möglichst wenig Aufwand zu bewerkstelligen, wurde der [Cube Creator](https://cube-creator.lindas.admin.ch/) entwickelt. Damit lassen sich tabellarische Daten mit Meta Daten anreichern, um daraus [Cubes](https://cube.link) zu erstellen, die auf LINDAS publiziert werden können. Für den Cube Creator wird ein [CH-LOGIN](https://www.eiam.admin.ch) benötigt, welches über [support.lindas@bar.admin.ch](mailto:support.lindas@bar.admin.ch) für den Cube Creator freigeschaltet werden muss.

## GitLab

Das Bundesarchiv betreibt ein eigenes [GitLab](https://gitlab.ldbar.ch/), welches einerseits dazu dient, die Daten für LINDAS mit Hilfe von CI/CD-Pipelines im LINDAS Triplestore zu speichern. Andererseits wird dieses Gitlab auch für das Issue Management der verschiedenen Datensätze genutzt.

## Graph Explorer

Mit Hilfe des [Graph Explorers](https://lindas.admin.ch/graph-explorer/) können die Daten aus LINDAS und insbesondere ihre Links zu anderen Daten grafisch exploriert und visualisiert werden.

![Graph Explorer](/static-assets/img/graph-explorer.jpg)

## visualize.admin.ch

Die Visualisierungssoftware [visualize.admin.ch](https://visualize.admin.ch) ermöglicht es, mit Hilfe des Cube Creators transformierte Daten in wenigen Schritten anschaulich zu visualisieren. Dieses Werkzeug ist auch für interessierte Nutzende ohne vertiefte Kenntnisse benutzbar.

![Visualize](/static-assets/img/visualize.jpg)