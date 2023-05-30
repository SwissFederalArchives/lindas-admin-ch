# LINDAS Architektur

LINDAS besteht im Kern aus einem Triplestore (Graphdatenbank). Als Produkt wird dafür [Stardog](https://www.stardog.com/platform/) eingesetzt. Zusätzlich existiert eine [GitLab Instanz](https://gitlab.ldbar.ch/), auf welcher das Issue Management durchgeführt wird und mit Hilfe von CI/CD Piplelines Daten für LINDAS aufbereitet und im Triplestore abgelegt werden.
## Cache Server

Zusätzlich zum Leseendpunkt `https://ld.admin.ch/query` wird ein mit [Varnish](https://varnish-cache.org/) umgesetzter Cache Server unter https://lindas-cached.cluster.ldbar.ch/query betrieben.

## Namespaces, Namedgraphs und Benutzernamen

Die Daten in LINDAS werden mit Hilfe von verschiedenen Namespaces organisiert und strukturiert. Die Zugriffskontrolle zu den Daten basiert auf Namedgraphs in Kombination mit Benutzernamen.
