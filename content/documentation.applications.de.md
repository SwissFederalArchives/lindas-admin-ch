# Auf LINDAS basierende Applikationen

## Daten auf LINDAS veröffentlichen

Um Daten für die Publikation in LINDAS aufzubereiten, wurde der [Cube Creator](https://cube-creator.lindas.admin.ch/) entwickelt. Damit lassen sich tabellarische Daten mit Meta Daten anreichern, um daraus [RDF Cubes](https://cube.link) zu erstellen, die auf LINDAS publiziert werden können. Für den Cube Creator wird ein [CH-LOGIN](https://www.eiam.admin.ch) benötigt, welches über [support.lindas@bar.admin.ch](mailto:support.lindas@bar.admin.ch) für den Cube Creator freigeschaltet werden muss.

## Applikationen, die LINDAS Daten nutzen

Folgende öffentlichen Applikationen nutzen (teilweise im Hintergrund) Daten von LINDAS:

* [visualize.admin.ch](https://visualize.admin.ch/) Visualisierung von Datensätzen (aufgewertet mit Annotationen)
* [infosm.ld.admin.ch](https://www.infosm.blv.admin.ch/) Applikation zu Tierseuchen und deren Ausbreitung
* [strompreis.elcom.admin.ch](https://www.strompreis.elcom.admin.ch/) Applikation zu Strompreisen auf Ebene Gemeinde
* [ld.admin.ch/datasets](https://ld.admin.ch/datasets/) Liste aller verfügbaren Datensätze in LINDAS
* [bewilligungen.easygov.swiss](https://bewilligungen.easygov.swiss/) Suche nach bewilligungspflichtigen und reglementierten Berufen in der Schweiz

Folgende verwaltungsinterne Applikationen nutzen Daten von LINDAS:

* ...

## Bezug von Rohdaten von LINDAS

* Abfrage der Daten mit Hilfe der Abfragesprache SPARQL über den [SPARQL Endpunkt](https://ld.admin.ch/sparql)
* Dereferenzierung der URI als HTML Page anzeigen (bspw. [Stadt Bern](https://ld.admin.ch/municipality/351)
