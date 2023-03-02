# Auf LINDAS basierende Applikationen

## Applikationen, die LINDAS Daten nutzen
Folgende öffentlichen Applikationen nutzen (teilweise im Hintergrund) Daten von LINDAS:

* [visualize.admin.ch](https://visualize.admin.ch/) Visualisierung von Datensätzen (aufgewertet mit Annotationen)
* [infosm.ld.admin.ch](https://www.infosm.blv.admin.ch/) Applikation zu Tierseuchen und deren Ausbreitung
* [strompreis.elcom.admin.ch](https://www.strompreis.elcom.admin.ch/) Applikation zu Strompreisen auf Ebene Gemeinde
* [ld.admin.ch/datasets](https://ld.admin.ch/datasets/) Liste aller verfügbaren Datensätze in LINDAS
* [bewilligungen.easygov.swiss](https://bewilligungen.easygov.swiss/) Suche nach bewilligungspflichtigen und reglementierten Berufen in der Schweiz

## Daten direkt nutzen
Um direkt mit den Daten von LINDAS zu arbeiten, gibt es verschiedene Möglichkeiten

### Follow your Nose Prinzip
Linked Data sollten grundsätzlich auch durch Personen ohne grosses technisches Wissen zu durchforsten sein. Dies geschieht mit Hilfe des sogennaten **Dereferenzierens**. In der Praxis bedeutet das, dass über einen Browser die IRI einer Linked Data Ressource aufgerufen wird und der Server entsprechende Informationen zur Ressource (normalerweise alle Triples, bei der die aufgerufene IRI auf der Subjektposition vorkommt) als HTML Seite liefert. Dieser Weg kann ein wenig holprig sein und folgende Tips können dabei helfen:

- Unter https://ld.admin.ch/.well-known/void steht der Datenkatalog von LINDAS zur Verfügung, also eine Auflistung, welche Datasets auf LINDAS publiziert sind. Da die Datasets nicht direkt unter ld.admin.ch publiziert werden, stehen dort nur [`rdfs:seeAlso`](www.w3.org/2000/01/rdf-schema#seeAlso) angaben zur Verfügung, die auf Subdomains verweisen, also bspw. auf https://energy.ld.admin.ch/.well-known/void.
- Über den Datenkatalog der Subdomain kann man die [`schema:dataset`](https://schema.org/Dataset) erreichen, die dann eine [`dcterms:description`](https://www.dublincore.org/specifications/dublin-core/dcmi-terms/#description) aufweisen, die auch für Menschen verständlich ist.
- Das Dataset (bspw. https://energy.ld.admin.ch/sfoe/bfe_ogd17_fuellungsgrad_speicherseen/5) ist häufig von der Klasse [`cube:Cube`](https://cube.link/#Cube) und besitzt damit ein [`cube:ObersvationSet`](https://cube.link/#ObservationSet).
- Das [`cube:ObservationSet`](https://cube.link/#ObservationSet) (bspw. https://energy.ld.admin.ch/sfoe/bfe_ogd17_fuellungsgrad_speicherseen/5/observation/) weist dann die eigentlichen Daten als [`cube:Observation`](https://cube.link/#Observation) auf (bspw. https://energy.ld.admin.ch/sfoe/bfe_ogd17_fuellungsgrad_speicherseen/5/observation/2015-02-23).
- Damit kann ein erster Überblick über die Daten auf LINDAS erhalten werden.

### Graph Explorer
Mit Hilfe des [Graph Explorers](https://ld.admin.ch/graph-explorer/) können die Daten aus LINDAS und insbesondere ihre Links zu anderen Daten grafisch exploriert und visualisiert werden.

### SPARQL
Die Daten aus LINDAS können auch mit Hilfe der Abfragesprache SPARQL über den [SPARQL Endpunkt](https://ld.admin.ch/sparql) abgefragt werden.

### Volltextsuche
Der von LINDAS verwendete Stardog Triplestore erlaubt die Volltextsuche via SPARQL. Details dazu sind in der [Stardog Dokumentation](https://docs.stardog.com/query-stardog/full-text-search#integration-with-sparql) zu finden. Hier eine <a href="https://ld.admin.ch/sparql/#query=SELECT+DISTINCT+%3Fs+%3Fp+%3Fl%0AWHERE+%7B%0A++%3Fs+%3Fp+%3Fl.%0A++(%3Fl+%3Fscore)+%3Ctag%3Astardog%3Aapi%3Aproperty%3AtextMatch%3E+'Fraum%C3%BCnster'.%0A%7D%0A&contentTypeConstruct=text%2Fturtle&contentTypeSelect=application%2Fsparql-results%2Bjson&endpoint=https%3A%2F%2Fld.admin.ch%2Fquery&requestMethod=POST&tabTitle=Query+5&headers=%7B%7D&outputFormat=table" target="_blank">Beispiel-Volltextsuche</a>, die nach dem Vorkommen des Begriffs 'Fraumünster' in allen Literals sucht.

## Daten auf LINDAS veröffentlichen

### Cube Creator
Um die Integration von tabellarischen Daten in LINDAS mit möglichst wenig Aufwand zu bewerkstelligen, wurde der [Cube Creator](https://cube-creator.lindas.admin.ch/) entwickelt. Damit lassen sich tabellarische Daten mit Meta Daten anreichern, um daraus [RDF Cubes](https://cube.link) zu erstellen, die auf LINDAS publiziert werden können. Für den Cube Creator wird ein [CH-LOGIN](https://www.eiam.admin.ch) benötigt, welches über [support.lindas@bar.admin.ch](mailto:support.lindas@bar.admin.ch) für den Cube Creator freigeschaltet werden muss.

### Integration via spezifischer Pipelines
Sollen Daten automatisiert regelmässig in LINDAS publiziert werden oder handelt es sich um nicht tabellarische Daten mit hoher Komplexität, dann sind individualisierte Pipelines die richtige Lösung, um Daten in LINDAS zu integrieren. Diese Pipelines verarbeiten regelmässig automatisiert Daten aus elektronischen Quellen, reichern sie mit den entsprechendenen Meta Daten an und transformieren diese in Linked Data.
