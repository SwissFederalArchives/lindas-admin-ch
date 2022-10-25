# LINDAS Technische Themen

## Benutzer und Namedgraphs

### LINDAS Namedgraph Conventions
Namedgraphs in Lindas kümmern sich ausschliesslich um das Datenmanagement und Berechtigungskonzept. (Namedgraphs dürfen nicht für das Versions Management oder auf Applikationsebene gebraucht werden.) Deshalb sind alle Named Graphs unter https://lindas.admin.ch/* angesiedelt.


Namedgraphs haben den Pfad https://lindas.admin.ch/<orga>/<dataset>. (Beispiel https://lindas.admin.ch/nl/isil)

<orga> ist die englische Termdat Abkürzung der Organisation
<dataset> ist der Name des Datasets (wie im Projekt genannt).


### LINDAS Namespace Conventions
Für Namespaces gelten andere Regeln mit einem anderen Basis-URI.
Aus Gründen der Dauerhaftigkeit ist die Organisation nicht Teil des Namespace. Das Dataset wird übernommen, aber man sollte auf zu generische Namen achten, die bereits existieren könnten.
Dem Basis-URI wird ein Thema (Domain) vorangestellt (siehe unten Adding of new domain).

Namespace haben den Pfad https://<domain>.ld.admin.ch/<dataset>. (Beispiel https://culture.ld.admin.ch/isil)

<domain> ist das Thema (auf Englisch), mit dem sich das Dataset befasst
<dataset> ist der Name des Datasets (wie im Projekt genannt).

### LINDAS Username Conventions
Usernames sollen wo möglich nach folgendem schema aufgebaut werden: lindas-<orga>-<dataset/application> (Beispiel. lindas-nl-isil)

<orga> ist identisch der Namedgraph Convention zu verwenden.
<dataset> identisch der Namedgraph Convention, wenn es sich um ein Dataset handelt welches manuell oder per pipeline geschrieben wird.
<application> wenn es sich um eine Applikation handelt die schreibt.

## Anforderungen an Datenpublikation
* https://schema.ld.admin.ch/LindasDataset
* SHACL Shapes

## Environments
* Welche gibt es?
* Wie sollen die Environments, je nach Kontext (Pipeline, Applikation) benutzt werden?

## Betrieb, Status und Support
* VSHN Betrieb
* Support Tickets
* https://status.ldbar.ch/
