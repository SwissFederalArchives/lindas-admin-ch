# LINDAS Architektur

-- Bitte deutsch prüfen -- 
LINDAS besteht im Kern aus einem Triplestore (Graphdatenbank), dem eine Reihe von Werkzeugen zur Datenkonvertierung und -integration hinzugefügt wird. Eine Schnittstelle zur Datenabfrage und ein Werkzeug zur Veröffentlichung von Daten als Webseiten bereichern die Infrastruktur. Eine Webanwendung ermöglicht es letztendlich, die bestehenden Datenstrukturen der Datensätze zu dokumentieren.

![Gesamtsystem LINDAS](/static-assets/img/architecture-DE.jpg)

Als Graphdatenbank Produkt wird [Stardog](https://www.stardog.com/platform/) eingesetzt. 

## Datenintegration

Eine [GitLab-Instanz] (https://gitlab.ldbar.ch/) dient dazu, die Daten für LINDAS mit Hilfe von CI/CD-Pipelines vorzubereiten, bevor sie als RDF im Triplestore gespeichert werden.

## Datenkonvertierungen

Der [Cube Creator](/content/about/tools/de.md#cube-creator) erleichtert die Konvertierung von Daten in RDF, wenn diese als multidimensionale Würfel betrachtet werden können.

## Dokumentation von Datenstrukturen



Eine [GitLab Instanz](https://gitlab.ldbar.ch/), auf welcher das Issue Management durchgeführt wird.



## Cache Server

Zusätzlich zum Leseendpunkt `https://ld.admin.ch/query` wird ein mit [Varnish](https://varnish-cache.org/) umgesetzter Cache Server unter https://lindas-cached.cluster.ldbar.ch/query betrieben.

## Namespaces, Namedgraphs und Benutzernamen

Die Daten in LINDAS werden mit Hilfe von verschiedenen Namespaces organisiert und strukturiert. Die Zugriffskontrolle zu den Daten basiert auf Namedgraphs in Kombination mit Benutzernamen.
