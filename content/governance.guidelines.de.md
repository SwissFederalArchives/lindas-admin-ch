# Guidelines zu verschiedenen Konzepten
Ein Ziel von Linked Data ist die **Wiederverwendung** von bestehenden Daten (**Once-Only Prinzip**). Damit soll bspw. erreicht werden, dass nicht jede Behörde von neuem zentrale Daten erfassen muss (bspw. Angaben zu Kantonen, Gemeinden, Departemente, Zeitangaben, etc.). Um die Wiederverwendung zu vereinfachen, werden Daten mit Metadaten angereichert, damit es möglichst einfach ist, die eigentlichen Daten zu verstehen und zu verwenden.

Nachfolgend werden verschiedene Linked Data Konzepte beschrieben, die vor allem der Wiederverwendbarkeit von Daten dienen. Die einzelnen Konzepte sind nicht immer vollständig trennscharf.

## Ontologien
Ontologien beschreiben typischerweise eine Klassenhierarchie von Ressourcen und das dazu benötigte Vokabular. Über Ontologien können darüber hinaus sehr umfassende Vorgaben und Voraussetzungen für bestimmte Klassen und die Zusammenhänge zwischen verschiedenen Klassen definiert werden. Ontologien werden technisch über [RDFS](https://www.w3.org/TR/rdf-schema/) und [OWL](https://www.w3.org/TR/owl2-overview/) definiert und erlauben auch das Ableiten (eng: inferencing) von neuen Erkenntnissen aus bestehendem Wissen.

**Weiterentwicklung von Ontologien**
* LANGSAM (wenige Änderungen pro Jahr)
* benötigt Konsens von allen Beteiligten
* Weiterentwicklung kann in Versionen geschehen und neue Versionen dürfen alte Einträge weglassen

<br>

### schema.ld.admin.ch
Auf Stufe Bundesverwaltung werden Ontologien unter https://schema.ld.admin.ch entwickelt und zur Verfügung gestellt. Dies ist ein laufender Prozess, bei dem Partizipation explizit erwünscht ist. Das unter https://schema.ld.admin.ch verwendete Tool erlaubt das Vorschlagen und Kommentieren von Bestandteilen der Ontologie. Elemente unter https://schema.ld.admin.ch sind also sehr spezifisch für die Belange der (Bundes)verwaltung. Alles was allgemeiner und genereller ist, wird in anderen Ontologien behandelt, bspw. unter https://schema.org.

### schema.org
Die Initiative unter https://schema.org ist ebenfall kollaborativ und stellt eine sehr allgemeine, domainübergreifende Ontologie zur Verfügung, um Dinge des Alltags zu beschreiben. schema.org ist weit verbreitet und eine gute erste Anlaufstelle, um passende Klassen und passendes Vokabular zu finden.

### SKOS
Die *Simple Knowledge Organization System* (SKOS) Ontologie bietet ein Modell für die Darstellung der grundlegenden Struktur und des Inhalts von Konzeptschemata wie Thesauri, Klassifikationsschemata, Schlagwortlisten, Taxonomien, Folksonomien und anderen ähnlichen Arten von Controlled Vocabularies und wird häufig verwendet, um bestimmte Konzepte als Linked Data zu beschreiben. Hier gibt es eine [Einführung in SKOS](https://www.w3.org/TR/skos-primer/).

To-Do: Schema vs. Ontologie

## Controlled Vocabularies
Controlled Vocabularies fassen bestimmte Sachverhalte oder Objekte zusammen ohne sie in einen ganz grossen Zusammenhang stellen zu wollen. Hierbei handelt es sich häufig um Listen gleichartiger Elemente. Beispielsweise Nutzungsbedingungen für offene Daten (https://ld.admin.ch/vocabulary/TermsOfUse) oder rechtliche Formen von Firmen (https://ld.admin.ch/ech/97/legalforms). Diese Listen haben häufig den Anspruch, vollständig zu sein. Also sollen bspw. zu einem bestimmten Zeitpunkt alle Bundesämter in einer solchen Liste abgebildet sein und nicht nur eine Auswahl.

Terme, die einmal im Rahmen eines Controlled Vocabularies definiert wurden, werden nicht mehr gelöscht. Falls sie nicht mehr benutzt werden sollen, können sie als `deprecated` bezeichnet werden.

Controlled Vocabularies werden häufig als Klasse [schema:DefinedTermSet](https://schema.org/DefinedTermSet) modelliert und die einzelnen Begriffe darin als [schema:DefinedTerm](https://schema.org/DefinedTerm). Eine andere Möglichkeit bietet die Nutzung von [skos:Concept](http://www.w3.org/2004/02/skos/core#Concept).

Die Idee der Controlled Voacabularies entspricht eigentlich nicht den Grundprinzipien von Linked Data. Im Prinzip könnte man den entsprechenden Elemente der Liste einfach eine bestimmte Klasse zuweisen und die Abfrage nach allen Mitgliedern dieser Klasse würde die Liste liefern. Die Formulierung als [schema:DefinedTerm](https://schema.org/DefinedTerm) hat allerdings auch den Vorteil, dass sie sich einfach dereferenzieren lässt.

**Weiterentwicklung von Controlled Voacabularies**
* LANGSAM (wenige Änderungen pro Jahr)
* benötigt Konsens von den Nutzerinnen des entsprechenden Vokabulars
* Terme dürfe nicht gelöscht werden

<br>

## Zentrale Entitäten
Zentrale Entitäten (Core Entities) sind ein Spezialfall von Controlled Vocabularies. Das spezifische an den zentralen Entitäten ist die (mutmasslich) sehr häufige Wiederverwendung von solchen Entitäten. Mehr dazu siehe [hier](/governance/core-concepts/).

## Register
Als Register werden im LINDAS Ökosystem insbesondere bestehende Datenbankwerke verstanden, die als Linked Data transformiert wurden und sonst typsichwerweise als tabellarische CSV Daten vorliegen würden. Register Daten werden also immer automatisiert verarbeitet. Wichtig ist, dass diese Register mit den entsprechendenden zentralen Entitäten verlinkt sind. Dafür werden in den Registern typischerweise eigene IRI der zentralen Entitäten erstellt, die aber entsprechend verlinkt sind. Ein Grund dafür ist, dass die zentralen Entitäten überschaubar bleiben sollen und nicht mit sehr spezifischen Informationen "überflutet" werden sollen. Registerdaten sind immer unter der Domain https://register.ld.admin.ch zu finden.

Beispiel mit einem Kanton: Die zentrale Entität für den Kanton Fribourg ist unter https://ld.admin.ch/canton/10 zu finden. Dort stehen aber nur wenige Informationen. Die Informationen zu den geographischen Grenzen, also die GIS Daten beruhen aber auf einer anderen IRI, nämlich https://geo.ld.admin.ch/boundaries/canton/10 und wenn man etwas zur Kantonsentwicklung wissen möchte, dann wird man unter https://register.ld.admin.ch/agvch/canton/10 fündig. Diese Daten sind aber alle über die zentrale Entität verknüpft.

**Weiterentwicklung von Registern**
* Schnell (tagesaktuell)
* Änderungen erfolgen automatisiert aus bestehendenden Datenbanksystemen

## Shared Dimensions
Shared Dimensions sind ein Begriff aus dem Cube Creator und bezeichnet letztlich Controlled Vocabularies resp. Core Entities, die benötigt werden, um CSV Daten in Linked Data zu transformieren. Also beispielsweise die Kantone oder bestimmte Kategorien in der Holzwirtschaft etc.

## Tabellarische Daten: cube.link
Tabellarische Daten können mit Hilfe der [cube.link](https://cube.link) Ontologie in Linked Data transformiert werden. Eine Hilfe dazu ist der Cube Creator, der speziell für die Datenintegration in LINDAS erstellt wurde.

## Versionierte Daten: version.link
Falls sich Resourcen über die Zeit ändern und der zeitliche Verlauf wichtig ist, kann mit Hilfe der [version.link](https://version.link) Ontologie diese zeitliche Entwicklung abgebildet werden.

## Evolution der einzelnen Konzepte
<table class="table">
<tr>
    <th>Konzept</th>
    <th>Ändernungshäufigkeit</th>
    <th>Konsens</th>
    <th>Bemerkungen</th>
</tr>
<tr>
    <td>Ontologie</td>
    <td>Wenige Änderungen pro Jahr</td>
    <td>Breiter Konsens nötig</td>
    <td></td>
</tr>
<tr>
    <td>Controlled Vocabularies</td>
    <td>Wenige Änderungen pro Jahr</td>
    <td>Konsens der Nutzerinnen nötig</td>
    <td>Bestehende Terme dürfe nicht gelöscht werden</td>
</tr>
<tr>
    <td>Core Entities</td>
    <td>Wenige Änderungen pro Jahr</td>
    <td>Daten werden auf übergeodneter Ebene definiert</td>
    <td>Bestehende Terme dürfe nicht gelöscht werden</td>
</tr>
<tr>
    <td>Register</td>
    <td>Tägliche Änderungen</td>
    <td>Daten vom Data-Owner alleine definiert</td>
    <td>Automatisierte Verarbeitung nötig</td>
</tr>
</table>
