# LINDAS Technische Themen
Dieser Abschnitt behandelt technische Themen rund um LINDAS.

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

<table class="table">
    <tr>
        <td>Umgebung</td>
        <td>Leseendpunkt</td>
        <td>Lese-/schreibendpunkt</td>
        <td>Garantien</td>
    </tr>
    <tr>
        <td>PROD</td>
        <td>https://ld.admin.ch/query</td>
        <td>https://stardog.cluster.ldbar.ch/lindas</td>
        <td>24h Verfügbarkeit, Anpassungen nur nach Integrationstests mit Applikationen</td>
    </tr>
    <tr>
        <td>INT</td>
        <td>https://int.ld.admin.ch/query</td>
        <td>https://stardog-int.cluster.ldbar.ch/lindas</td>
        <td>24h Verfügbarkeit, Anpassungen um Integrationstests mit Applikationen durchzuführen</td>
    </tr>
    <tr>
        <td>TEST</td>
        <td>https://test.ld.admin.ch/query</td>
        <td>https://stardog-test.cluster.ldbar.ch/lindas</td>
        <td>keine Garantie, Anpassungen um Datenbank zu testen.</td>
    </tr>
</table>

### Empfohlene Benutzung der Umgebungen

#### Daten Pipelines 
Pipelines benutzten LINDAS TEST für die Entwicklung. LINDAS INT wird für die Intergration der Daten mit anderen Datensets benutzt. Schlussendlich wird auf LINDAS PROD publiziert.

#### Lese-/Schreibe Applikation
Datenschreibende Anwendungen benutzen die LINDAS INT Umgebung für die Entwicklung, sowie Intergration. Die LINDAS PROD Umgebung wird für das produktive Deployment benutzt. LINDAS TEST bietet keine Garantie zur Datenpersistenz und Verfügbarkeit.

#### Lesende Applikation
Rein lesende Applikationen benutzten auschliesslich LINDAS PROD. Als Ausnahme kann LINDAS INT benutzt werden, wenn die zu lesenden Daten noch in Entwicklung sind.

### Cache Server
Zusätzlich zum PROD Leseendpunkt `https://ld.admin.ch/query` wird ein mit [Varnish](https://varnish-cache.org/) umgesetzter Cache Server unter https://lindas-cached.cluster.ldbar.ch/query betrieben.

## Namespaces, Namedgraphs und Benutzernamen
Die Daten in LINDAS werden mit Hilfe von verschiedenen Namespaces organisiert und strukturiert. Die Zugriffskontrolle zu den Daten basiert auf Namedgraphs in Kombination mit Benutzernamen.

Nachfolgend sind die Konventionen bzgl. des Datenmanagements aufgeführt.

### LINDAS Namespace Konventionen
Für Daten, welche in die Autorität des Bundesverwaltung fallen, muss gemäss [I003](https://www.bk.admin.ch/bk/de/home/digitale-transformation-ikt-lenkung/ikt-vorgaben/standards/i003-domain_name_system_dns.html) ein Namespace unter der Basis-URI `*.ld.admin.ch` benutzt werden.

Damit die publizierten Daten eine stabile URI behalten, ist der Name der veröffentlichenden Verwaltungseinheit (oder deren Abkürzung) kein Teil des Namespaces. Der Basis-URI wird das Thema als Subdomain (`<subdomain>`) vorangestellt. Der Projektname (`<dataset>`) wird im Anschluss an die Domain agefügt. Es sollte auf darauf geachtet werden, keine allzu generische Namen zu wählen. Insbesondere muss geprüft werden, ob der Projektname nicht bereits existiert.

Namespaces haben somit den Pfad `https://<domain>.ld.admin.ch/<dataset>/*`.

* `<domain>` ist das Thema (auf Englisch), mit dem sich das Dataset befasst
* `<dataset>` ist der Name des Datasets wie vom jeweiligen Projekt gewählt

Beispiel: Die Daten zum "International Standard Identifier for Libraries and Related Organizations" sind unter https://culture.ld.admin.ch/isil zu finden.

#### Themenbasierte Subdomains
Folgende Subdomains werden bereits verwendet. Falls für ein neues Datenset kein passendes Thema vorhanden ist, kann dieses über den LINDAS Support angefragt werden. Nach [I003](https://www.bk.admin.ch/bk/de/home/digitale-transformation-ikt-lenkung/ikt-vorgaben/standards/i003-domain_name_system_dns.html) liegt die abschliessende Entscheidung über den Gebrauch der Subdomains bei der Bundeskanzlei (BK).

<table class="table">
    <tr>
        <td>*.ld.admin.ch</td>
        <td>Themen</td>
        <td>Beispiele Ämter</td>
    </tr>
    <tr>
        <td>culture.ld.admin.ch</td>
        <td>Kultur</td>
        <td>NB</td>
    </tr>
    <tr>
        <td>energy.ld.admin.ch</td>
        <td>Energie</td>
        <td>Elcom, BFE</td>
    </tr>
    <tr>
        <td>education.ld.admin.ch</td>
        <td>Ausbildung</td>
        <td>BAR</td>
    </tr>
    <tr>
        <td>agriculture.ld.admin.ch</td>
        <td>Landwirtschaft</td>
        <td>BLW, Agroscope</td>
    </tr>
    <tr>
        <td>environment.ld.admin.ch</td>
        <td>Umwelt</td>
        <td>BAFU</td>
    </tr>
    <tr>
        <td>finance.ld.admin.ch</td>
        <td>Finanzen</td>
        <td>BAR</td>
    </tr>
    <tr>
        <td>politics.ld.admin.ch</td>
        <td>Politik</td>
        <td>BK</td>
    </tr>
    <tr>
        <td>register.ld.admin.ch</td>
        <td>bestehende Register (Themenunabhängig)</td>
        <td>BJ, BAR, BK</td>
    </tr>
</table>

### LINDAS Namedgraph Konventionen
Namedgraphs in LINDAS werden ausschliesslich für das Datenmanagement und Berechtigungskonzept benutzt. Namedgraphs dürfen nicht für die Versionsverwaltung oder auf Applikationsebene benutzt werden. Alle Namedgraphs befinden sind unter `https://lindas.admin.ch/*`, unabhängig vom Namespace oder der Organisation.

Namedgraphs haben den Aufbau `https://lindas.admin.ch/<orga>/<dataset>`. (Beispiel https://lindas.admin.ch/nl/isil)

* `<orga>` ist die englische [Termdat](https://www.termdat.bk.admin.ch/) Abkürzung der Organisation
* `<dataset>` ist der Name des Datasets wie vom jeweiligen Projekt gewählt


### LINDAS Username Konventionen
Usernames sollen wo möglich nach folgendem Schema aufgebaut werden: lindas-<orga>-<dataset> oder lindas-<orga>-<application> (Beispiel. lindas-nl-isil)

* `<orga>` ist gemäss den Namedgraph Konventionen zu verwenden
* `<dataset>` ist gemäss der Namedgraph Konvention zu verwenden, wenn es sich um ein Dataset handelt, welches manuell oder per Pipeline geschrieben wird
* `<application>` ist der Name der Applikation, falls eine Applikation die Daten schreibt 

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
