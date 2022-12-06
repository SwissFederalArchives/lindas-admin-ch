# Basiskonzepte, Vokabulare
Ein grosses Ziel von Linked Data ist die **Wiederverwendung** von bestehenden Daten (**once-only Prinzip**). Damit soll bspw. erreicht werden, dass nicht jedes Amt von neuem zentrale Daten erneut erfassen muss (bspw. Angaben zu Kantonen, Gemeinden, Departemente, Zeitangaben, etc.).

Es gibt verschiedene Stufen für die Wiederverwendbarkeit, welche nachfolgend charakterisiert werden. Die nachfolgend beschriebenen Konzepte sind nicht immer trennscharf.

## Ontologien
Ontologien beschreiben typischerweise eine Klassenhierarchie von Ressourcen. Über Ontologien können darüber hinaus sehr umfassende Vorgaben und Voraussetzungen für bestimmte Klassen und die Zusammenhänge zwischen verschiedenen Klassen definiert werden. Ontologien werden technisch über RDFS und OWL definiert und erlauben das Ableiten von neuen Erkenntnissen aus bestehendem Wissen.

Auf Stufe Bundesverwaltung werden Ontologien unter https://schema.ld.admin.ch entwickelt und zur Verfügung gestellt.

## Controlled Vocabularies
Controlled Vocabularies fassen bestimmte Sachverhalte oder Objekte zusammen ohne sie in einen ganz grossen Zusammenhang stellen zu wollen. Hierbei handelt es sich häufig um Listen gleichartiger Elemente. Beispielsweise Nutzungsbedingungen für offene Daten (https://ld.admin.ch/vocabulary/TermsOfUse) oder rechtliche Formen von Firmen (https://ld.admin.ch/ech/97/legalforms).

Controlled Vocabularies werden als Klasse `https://schema.org/DefinedTermSet` modelliert und die einzelnen Begriffe darin als `https://schema.org/DefinedTerm`.


## Core Entities
Unter den Core Entities versteht man diejenigen Resourcen, die wichtig sind, weil sie überall und immer wieder benötigt werden. Dazu gehören:

* Teritoriale Entitäten: Länder, Kantone, Bezirke, Gemeinden, ...
* Organisatorische Entitäten: Departemente, Ämter, ...
* Temporale Entitäten: Monate, Wochen, Semester, Quartale, ...
