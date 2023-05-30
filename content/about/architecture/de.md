# LINDAS Architektur

LINDAS besteht im Kern aus einem Triplestore (Graphdatenbank). Als Produkt wird dafür [Stardog](https://www.stardog.com/platform/) eingesetzt. Zusätzlich existiert eine [GitLab Instanz](https://gitlab.ldbar.ch/), auf welcher das Issue Management durchgeführt wird und mit Hilfe von CI/CD Piplelines Daten für LINDAS aufbereitet und im Triplestore abgelegt werden.

LINDAS umfasst drei Umgebungen (_PROD_, _INT_, _TEST_) von Triplestores (basierend auf Stardog). Zusätzlich gibt es eine GitLab Instanz welche duch CI/CD Pipelines viele der Daten in LINDAS aktuell hält und überprüft.

## Umgebungen (Environments)

Das LINDAS Ökosystem ist in drei sogenannte Environments aufgeteilt:

- **PROD**
- **INT**
- **TEST**

Das PROD Environment ist für die produktive Nutzung der Daten vorgesehen. Im INT Environment wird die Integration der Daten vorbereitet und durchgeführt, also die Umwandlung der Daten zu Linked Data im RDF Format. Das TEST Environment ist insbesondere für Sofware Tests der eingesetzten Produkte gedacht.

Alle drei Environments verfügen jeweils über einen offenen Leseendpunkt und einen nur für registrierte Benutzer zugänglichen Lese- und Schreibendpunkt.

| Umgebung | Leseendpunkt                   | Lese-/schreibendpunkt                        | Garantien                                                                           |
|----------|--------------------------------|----------------------------------------------|-------------------------------------------------------------------------------------|
| PROD     | https://ld.admin.ch/query      | https://stardog.cluster.ldbar.ch/lindas      | 24h Verfügbarkeit, Anpassungen nur nach Integrationstests mit Applikationen.         |
| INT      | https://int.ld.admin.ch/query  | https://stardog-int.cluster.ldbar.ch/lindas  | 24h Verfügbarkeit, Anpassungen um Integrationstests mit Applikationen durchzuführen. |
| TEST     | https://test.ld.admin.ch/query | https://stardog-test.cluster.ldbar.ch/lindas | keine Garantie, Anpassungen um Datenbank zu testen.                                 |

## Empfohlene Benutzung der Umgebungen

### Daten Pipelines

Pipelines benutzten LINDAS TEST für die Entwicklung. LINDAS INT wird für die Intergration der Daten mit anderen Datensets benutzt. Schlussendlich wird auf LINDAS PROD publiziert.

### Lese-/Schreibe Applikation

Datenschreibende Anwendungen benutzen die LINDAS INT Umgebung für die Entwicklung, sowie Intergration. Die LINDAS PROD Umgebung wird für das produktive Deployment benutzt. LINDAS TEST bietet keine Garantie zur Datenpersistenz und Verfügbarkeit.

### Lesende Applikation

Rein lesende Applikationen benutzten auschliesslich LINDAS PROD. Als Ausnahme kann LINDAS INT benutzt werden, wenn die zu lesenden Daten noch in Entwicklung sind.

## Cache Server

Zusätzlich zum PROD Leseendpunkt `https://ld.admin.ch/query` wird ein mit [Varnish](https://varnish-cache.org/) umgesetzter Cache Server unter https://lindas-cached.cluster.ldbar.ch/query betrieben.

## Namespaces, Namedgraphs und Benutzernamen

Die Daten in LINDAS werden mit Hilfe von verschiedenen Namespaces organisiert und strukturiert. Die Zugriffskontrolle zu den Daten basiert auf Namedgraphs in Kombination mit Benutzernamen.