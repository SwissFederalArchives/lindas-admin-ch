## Cache Server

Zusätzlich zum Leseendpunkt `https://ld.admin.ch/query` wird ein mit [Varnish](https://varnish-cache.org/) umgesetzter Cache Server unter https://lindas-cached.cluster.ldbar.ch/query betrieben.

## Federation über mehrere Triplestores

Ein wichtiges Prinzip im Arbeiten mit Linked Data ist die Möglichkeit, innerhalb einer einzigen SPARQL Query mehrere Triplestores gleichzeitig abzufragen. In diesem Fall spricht man von einer [Federated Query](https://www.w3.org/TR/sparql11-federated-query/).

## Interne Triplestores

Oben genannte technischen Details beziehen sich alle auf den öffentlich zugänglichen und offenen Teil von LINDAS, welcher technisch in der Datenbank mit dem Namen 'lindas' umgesetzt ist. Für interne Applikationen ist es möglich, vom offenen Teil unabhängige Datenbanken mit anderen Regelwerken zu benützen. Für Details hierzu kann der LINDAS Support kontaktiert werden.

## Anforderungen an die Datenpublikation

Jede Publikation welche auf PROD zugelassen werden soll, muss ein definiertes Minimum an Metadaten aufweisen. Die dazu nötigen Attribute der [Dataset](https://www.w3.org/TR/void/) Klasse, sind unter https://schema.ld.admin.ch/LindasDataset definiert und müssen unter `<domain>/.well-known/dataset/<dataset>` verfügbar sein. Zusätzlich müssen alle Datasets unter der jeweiligen `<domain>/.well-known/void` Adresse zur Bekanntmachung aufgeführt sein.

Als Beispiel können https://culture.ld.admin.ch/.well-known/dataset/isil und https://culture.ld.admin.ch/.well-known/void konsultiert werden.

## Betrieb, Status und Support

### Allgemeiner und Administrativer Support

Für allgemeinen Fragen, auch für neue Interessierte, welche LINDAS nutzen möchten, steht der Lindas Support [support-lindas@bar.admin.ch](mailto:support-lindas@bar.admin.ch) zur Verfügung.

### Technischer Betrieb und Support

Der Betrieb von LINDAS wird durch [VSHN](https://www.vshn.ch/) sichergestellt. Datenlieferanten bekommen einen Zugang zum [Ticket System](https://control.vshn.net/), welches für sämtliche Anfragen zu neuen Namedgraphs, Benutzern und weiteren Fragen zum Betrieb benutzt werden kann.

### Status

Der allgemeine Status der technischen Systeme, sowie geplante Wartungsarbeiten können unter https://status.ldbar.ch/ abgerufen werden. Es ist auch möglich, dort eine eMail Adresse zu hinterlegen um aktiv informiert zu werden.

### Integration via spezifischer Pipelines

Sollen Daten automatisiert regelmässig in LINDAS publiziert werden oder handelt es sich um nicht tabellarische Daten mit hoher Komplexität, dann sind individualisierte Pipelines die richtige Lösung, um Daten in LINDAS zu integrieren. Diese Pipelines verarbeiten regelmässig automatisiert Daten aus elektronischen Quellen, reichern sie mit den entsprechendenen Meta Daten an und transformieren diese in Linked Data.

## LINDAS Architektur

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

### Empfohlene Benutzung der Umgebungen

#### Daten Pipelines

Pipelines benutzten LINDAS TEST für die Entwicklung. LINDAS INT wird für die Intergration der Daten mit anderen Datensets benutzt. Schlussendlich wird auf LINDAS PROD publiziert.

#### Lese-/Schreibe Applikation

Datenschreibende Anwendungen benutzen die LINDAS INT Umgebung für die Entwicklung, sowie Intergration. Die LINDAS PROD Umgebung wird für das produktive Deployment benutzt. LINDAS TEST bietet keine Garantie zur Datenpersistenz und Verfügbarkeit.

#### Lesende Applikation

Rein lesende Applikationen benutzten auschliesslich LINDAS PROD. Als Ausnahme kann LINDAS INT benutzt werden, wenn die zu lesenden Daten noch in Entwicklung sind.

## Verweis auf eine bestimmte Sprache einer bestimmten Seite

[Content only available in German](/governance/?lang=de)