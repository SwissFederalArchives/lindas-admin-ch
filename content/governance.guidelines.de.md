# Guidelines zu verschiedenen Konzepten
Ein grosses Ziel von Linked Data ist die **Wiederverwendung** von bestehenden Daten (**Once-Only Prinzip**). Damit soll bspw. erreicht werden, dass nicht jedes Amt von neuem zentrale Daten erfassen muss (bspw. Angaben zu Kantonen, Gemeinden, Departemente, Zeitangaben, etc.).

Es gibt verschiedene Stufen für die Wiederverwendbarkeit, welche nachfolgend charakterisiert werden. Die nachfolgend beschriebenen Konzepte sind nicht immer trennscharf.

## Ontologien
Ontologien beschreiben typischerweise eine Klassenhierarchie von Ressourcen und das dazu benötigte Vokabular. Über Ontologien können darüber hinaus sehr umfassende Vorgaben und Voraussetzungen für bestimmte Klassen und die Zusammenhänge zwischen verschiedenen Klassen definiert werden. Ontologien werden technisch über RDFS und OWL definiert und erlauben in einem weiteren Schritt auch das Ableiten (eng: inferencing) von neuen Erkenntnissen aus bestehendem Wissen.

### schema.ld.admin.ch
Auf Stufe Bundesverwaltung werden Ontologien unter https://schema.ld.admin.ch entwickelt und zur Verfügung gestellt. Dies ist ein Prozess, der niemals abgeschlossen ist und bei dem Partizipation explizit erwünscht ist. Das unter https://schema.ld.admin.ch verwendete Tool erlaubt das Vorschlagen und Kommentieren von Bestandteilen der Ontologie. Elemente unter https://schema.ld.admin.ch sind also sehr spezifisch für die Belange der Bundesverwaltung. Alles was allgemeiner und genereller ist, wird in anderen Ontologien behandelt, bspw. unter schema.org.

### schema.org
Die Initiative unter https://schema.org ist ebenfall kollaborativ und stellt eine sehr allgemeine, domainübergreifende Ontologie zur Verfügung, um Dinge des Alltags zu beschreiben. schema.org ist weit verbreitet und eine gute erste Anlaufstelle, um passende Klassen und passendes Vokabular zu finden.

### SKOS
Die *Simple Knowledge Organization System* (SKOS) Ontologie bietet ein Modell für die Darstellung der grundlegenden Struktur und des Inhalts von Konzeptschemata wie Thesauri, Klassifikationsschemata, Schlagwortlisten, Taxonomien, Folksonomien und anderen ähnlichen Arten von kontrolliertem Vokabular und wird häufig verwendet, um bestimmte Konzepte als Linked Data zu beschreiben. Hier gibt es eine [Einführung in SKOS](https://www.w3.org/TR/skos-primer/).

## Controlled Vocabularies
Controlled Vocabularies fassen bestimmte Sachverhalte oder Objekte zusammen ohne sie in einen ganz grossen Zusammenhang stellen zu wollen. Hierbei handelt es sich häufig um Listen gleichartiger Elemente. Beispielsweise Nutzungsbedingungen für offene Daten (https://ld.admin.ch/vocabulary/TermsOfUse) oder rechtliche Formen von Firmen (https://ld.admin.ch/ech/97/legalforms).

Controlled Vocabularies werden als Klasse `https://schema.org/DefinedTermSet` modelliert und die einzelnen Begriffe darin als `https://schema.org/DefinedTerm`.

## Shared Dimensions
to do


## schema.ld.admin.ch

## Allgemeine Konzepte: schema.org / SKOS

## Tabelarische Daten: cube.link

### Wie wird ein Cube validiert?
https://cube.link/#validate-the-cube

## Versioning of Data
* Identities: version.link
* Data Provenance: prov-o
