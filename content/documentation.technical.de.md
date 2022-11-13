# LINDAS Technische Themen

LINDAS umfasst drei Umgebungen (_PROD_, _INT_, _TEST_) von Triplestores (basierend auf Stardog). Zusätzlich gibt es eine GitLab Instanz welche duch CI/CD Pipelines viele der Daten in LINDAS aktuell hält und überprüft.

In diesem Abschnitt werden wir auf die technischen Gegebenheiten der Umsetzung von LINDAS eingehen.

## Umgebungen (Environments)
Es gibt folgende Umgebungen, jeweils mit einem öffentlichen Leseendpunkt frei zugänglich. Die Lese/schrebendpunkte hingegen benötigen in jedem fall ein Benutzername, und zughöriges Passwort für den Zugriff.

| Umgebung | Leseendpunkt                   | Lese-/schreibendpunkt                        | Garantien  |
|----------|--------------------------------|----------------------------------------------|---|
| PROD     | https://ld.admin.ch/query      | https://stardog.cluster.ldbar.ch/lindas      | 24h Verfügbarkeit, Anpassungen nur nach Integrationstests mit Applikationen |
| INT      | https://int.ld.admin.ch/query  | https://stardog-int.cluster.ldbar.ch/lindas  | 24h Verfügbarkeit, Anpassungen um Integrationstests mit Applikationen durchzuführen|
| TEST     | https://test.ld.admin.ch/query | https://stardog-test.cluster.ldbar.ch/lindas | keine Garantie, Anpassungen um Datenbank zu testen.   |


### Empfholene Benutzung der Umgebungen

#### Daten Pipeline 
Pipelines benutzten LINDAS TEST für die Entwicklung. LINDAS INT wird für die Intergration der Daten mit anderen Datensets benutzt. Schlussendlich wird auf LINDAS PROD publiziert.

#### Lese-/Schreibe Applikation
Datenschreibende Anwendungen benutzen die LINDAS INT Umgebung für die Entwicklung, sowie Intergrations. Die LINDAS PROD Umgebung wird für das produktive Deployment benutzt. (LINDAS TEST bietet keine Garantie zur Datenpersistenz und Verfügbarkeit.)

#### Lesende Applikation
Rein lesende Applikationen benutzten auschliesslich LINDAS PROD für alle Umgebungen. Als ausnahme kann LINDAS INT benutzt werden, wenn die zu lesenden Daten noch in Entwicklung sind.


### Cache Server
Zusätzlich zu den direkten Endpunkten gibt es des weiteren noch mit Varnish umgesetzte Cache Server für den Leseendpunkt `https://ld.admin.ch/query` unter https://lindas-cached.cluster.ldbar.ch/query.

## Namespaces, Namedgraphs und Benutzernamen

Namespaces werden hergenommen um die Inhalte bundesweit einzuordnen und zu strukturieren. Das Datenmanagement in LINDAS wird über die Zugriffskontrolle basierend auf Namedgraphs in Kombination mit Benutzernamen gelöst. Folgend sind die zu benutzen Konventionen des Datenmagements geschildert.


### LINDAS Namespace Konventionen
Für Namespaces zu Daten welche in die Autorität des Bundesverwaltung fallen muss nach [I003](https://www.bk.admin.ch/bk/de/home/digitale-transformation-ikt-lenkung/ikt-vorgaben/standards/i003-domain_name_system_dns.html) ein Namespace unter `*.ld.admin.ch` benutzt werden.

Damit die publizierten Daten eine stabile URI behalten ist die Organisation kein Teil des Namespace. Der Projektname (`<dataset>`) muss im Anschluss an die Domain agefügt werden, es sollte auf darauf geachtet werden keine allzu generische Namen die bereits existieren könnten zu wählen. Dem Basis-URI wird ein Thema (Domain) vorangestellt.

Namespace haben den Pfad `https://<domain>.ld.admin.ch/<dataset>/*`. (Beispiel https://culture.ld.admin.ch/isil)

* `<domain>` ist das Thema (auf Englisch), mit dem sich das Dataset befasst
* `<dataset>` ist der Name des Datasets (wie vom jeweiligen Projekt gewählt).

#### Mögliche Sub-Domains Themen

Folgend die Liste der bisherig benutzen Themen. Wenn für ein neues Datenset kein passendes Thema vorhanden ist kann dies per LINDAS Support angefragt werden. Nach [I003](https://www.bk.admin.ch/bk/de/home/digitale-transformation-ikt-lenkung/ikt-vorgaben/standards/i003-domain_name_system_dns.html) liegt die abschliessende Entscheidung bei der BK.

| ld.admin.ch             | Themen übergreifende Konzepte          | Beispiele Ämter |
|-------------------------|----------------------------------------|-----------------|
| culture.ld.admin.ch     | Kultur                                 | NB              |
| energy.ld.admin.ch      | Energie                                | Elcom, BFE      |
| education.ld.admin.ch   | Ausbildung                             | BAR             |
| agriculture.ld.admin.ch | Landwirtschaft                         | BLW, Agroscope  |
| environment.ld.admin.ch | Umwelt                                 | BAFU            |
| finance.ld.admin.ch     | Finanzen                               | BAR             |
| politics.ld.admin.ch    | Politik                                | BK              |
| register.ld.admin.ch    | Themen unabhängig, bestehende Register | BJ, BAR, BK     |

### LINDAS Namedgraph Konventionen
Namedgraphs in LINDAS kümmern sich ausschliesslich um das Datenmanagement und Berechtigungskonzept. (Namedgraphs dürfen nicht für das Versions Management oder auf Applikationsebene gebraucht werden.) Alle Named Graphs sind unter `https://lindas.admin.ch/*` angesiedelt, unabhängig vom Namespace oder der Organisation.

Namedgraphs haben den Pfad `https://lindas.admin.ch/<orga>/<dataset>`. (Beispiel https://lindas.admin.ch/nl/isil)

* `<orga>` ist die englische [Termdat](https://www.termdat.bk.admin.ch/) Abkürzung der Organisation
* `<dataset>` ist der Name des Datasets (wie vom jeweiligen Projekt gewählt).


### LINDAS Username Konventionen
Usernames sollen wo möglich nach folgendem schema aufgebaut werden: lindas-<orga>-<dataset/application> (Beispiel. lindas-nl-isil)

* `<orga>` ist identisch der Namedgraph Convention zu verwenden.
* `<dataset>` identisch der Namedgraph Convention, wenn es sich um ein Dataset handelt welches manuell oder per pipeline geschrieben wird.
* `<application>` wenn es sich um eine Applikation handelt die schreibt.

## Interne Triplestores

Die obig genannten technischen Details beziehen sich alle auf den öffentlich zugänglichen Teil von LINDAS welcher technisch in der Datenbank mit dem Namen 'lindas' umgesetzt ist. Für interne Applikationen ist es möglich vom öffentlichen Teil unabhängige Datenbanken mit anderen Regelwerken zu benützen. Für Details hierzu kann der LINDAS Support kontaktiert werden.

## Anforderungen an Datenpublikation
Jede Publikation welche auf PROD zugelassen werden soll, muss ein minimum an Metadaten mitliefern. Die nötigen Attribute der [Dataset](https://www.w3.org/TR/void/) Klasse welche unter der jeweiligen `<domain>/.well-known/void` angeschlossen werden muss, sind unter https://schema.ld.admin.ch/LindasDataset auffindbar. 

Als Beispiel kann https://culture.ld.admin.ch/.well-known/dataset/isil herangenommen werden.

## Betrieb, Status und Support

### Allgemeiner und Administrativer Support
Zu allgemeinen Fragen, auch für neue interessierte welche LINDAS nutzen möchten melden sich per eMail über [support-lindas@bar.admin.ch](mailto:support-lindas@bar.admin.ch).

### Technischer Support
Der Betrieb von LINDAS wird durch [VSHN](https://www.vshn.ch/) sichergestellt. Datenlieferanten bekommen einen Zugang zum [Ticket System](https://control.vshn.net/) welches für sämtliche Anfragen zu neuen Namedgraphs, Benutzern und anderweitige Fragen zum Betrieb benutzt werden kann.

### Status
Der allgemeine Status sowie geplante Wartungsarbeiten können unter https://status.ldbar.ch/ eingesehen werden. Es ist auch möglich hier eine eMail Adresse zu hinterlegen um aktiv informiert zu werden.
