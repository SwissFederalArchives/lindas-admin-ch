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
Core Entities sind zentrale Ressourcen und aus zweierlei Gründen wichtig:

- Core Entities werden benötigt, weil sie in sehr vielen verschiedenen Datensätzen eine Rolle spielen (bspw. Kantone oder Ämter)
- Core Entities sind der zentrale Punkt, um Detailinformationen aus verschiedenen anderen Quellen anzuhängen (bspw. wird einem Kanton aus verwiesen auf geografische Informationen oder Bevölkerungsstatistiken für den jeweiligen Kanton)

Zu den Core Entities gehören:

* Teritoriale Entitäten: Länder, Kantone, Bezirke, Gemeinden, ...
* Organisatorische Entitäten: Departemente, Ämter, ...
* Temporale Entitäten: Monate, Wochen, Semester, Quartale, ...

### Tabellarische Sammlung von Core Entities

|Was|SPARQL Query|Beispiel|
|---|------------|--------|
|Kantone|<a href="https://ld.admin.ch/sparql/#query=PREFIX+schema%3A+%3Chttp%3A%2F%2Fschema.org%2F%3E%0APREFIX+rdf%3A+%3Chttp%3A%2F%2Fwww.w3.org%2F1999%2F02%2F22-rdf-syntax-ns%23%3E%0APREFIX+rdfs%3A+%3Chttp%3A%2F%2Fwww.w3.org%2F2000%2F01%2Frdf-schema%23%3E%0ASELECT+*+WHERE+%7B%0A%09%3Fcanton+a+%3Chttps%3A%2F%2Fschema.ld.admin.ch%2FCanton%3E%3B%0A+++++++++schema%3AalternateName+%3Fabbr.%0A%7D&contentTypeConstruct=text%2Fturtle&contentTypeSelect=application%2Fsparql-results%2Bjson&endpoint=https%3A%2F%2Fld.admin.ch%2Fquery&requestMethod=POST&tabTitle=Query&headers=%7B%7D&outputFormat=table" target="_blank">SPARQL Query</a>|Jura: https://ld.admin.ch/canton/26|
|Gemeinden|<a href="https://ld.admin.ch/sparql/#query=PREFIX+schema%3A+%3Chttp%3A%2F%2Fschema.org%2F%3E%0APREFIX+rdf%3A+%3Chttp%3A%2F%2Fwww.w3.org%2F1999%2F02%2F22-rdf-syntax-ns%23%3E%0APREFIX+rdfs%3A+%3Chttp%3A%2F%2Fwww.w3.org%2F2000%2F01%2Frdf-schema%23%3E%0ASELECT+*+WHERE+%7B%0A%09%3Fmunicipality+a+%3Chttps%3A%2F%2Fschema.ld.admin.ch%2FMunicipality%3E%3B%0A+++++++++++++++schema%3Aname+%3Fname.%0A%7D&contentTypeConstruct=text%2Fturtle&contentTypeSelect=application%2Fsparql-results%2Bjson&endpoint=https%3A%2F%2Fld.admin.ch%2Fquery&requestMethod=POST&tabTitle=Query&headers=%7B%7D&outputFormat=table" target="_blank">SPARQL Query</a>|Bregaglia: https://ld.admin.ch/municipality/3792|
|Departemente der Bundesverwaltung|<a href="https://ld.admin.ch/sparql/#query=PREFIX+schema%3A+%3Chttp%3A%2F%2Fschema.org%2F%3E%0APREFIX+rdf%3A+%3Chttp%3A%2F%2Fwww.w3.org%2F1999%2F02%2F22-rdf-syntax-ns%23%3E%0APREFIX+rdfs%3A+%3Chttp%3A%2F%2Fwww.w3.org%2F2000%2F01%2Frdf-schema%23%3E%0ASELECT+*+WHERE+%7B%0A%09%3Fdepartment+schema%3AinDefinedTermSet+%3Chttps%3A%2F%2Fld.admin.ch%2Fdepartment%3E%3B%0A+++++++++++++schema%3Aname+%3Fname.%0A++FILTER(lang(%3Fname)+%3D+%22fr%22)%0A%7D&contentTypeConstruct=text%2Fturtle&contentTypeSelect=application%2Fsparql-results%2Bjson&endpoint=https%3A%2F%2Fld.admin.ch%2Fquery&requestMethod=POST&tabTitle=Query&headers=%7B%7D&outputFormat=table" target="_blank">SPARQL Query</a>|DETEC: https://ld.admin.ch/department/VII|
|Bundesämter|<a href="https://ld.admin.ch/sparql/#query=PREFIX+schema%3A+%3Chttp%3A%2F%2Fschema.org%2F%3E%0APREFIX+rdf%3A+%3Chttp%3A%2F%2Fwww.w3.org%2F1999%2F02%2F22-rdf-syntax-ns%23%3E%0APREFIX+rdfs%3A+%3Chttp%3A%2F%2Fwww.w3.org%2F2000%2F01%2Frdf-schema%23%3E%0ASELECT+*+WHERE+%7B%0A%09%3Fdepartment+schema%3AinDefinedTermSet+%3Chttps%3A%2F%2Fld.admin.ch%2Foffice%3E%3B%0A+++++++++++++schema%3Aname+%3Fname.%0A++FILTER(lang(%3Fname)+%3D+%22de%22)%0A%7D&contentTypeConstruct=text%2Fturtle&contentTypeSelect=application%2Fsparql-results%2Bjson&endpoint=https%3A%2F%2Fld.admin.ch%2Fquery&requestMethod=POST&tabTitle=Query&headers=%7B%7D&outputFormat=table" target="_blank">SPARQL Query</a>|Bundesarchiv: https://ld.admin.ch/office/II.1.4|

## Shared Dimensions
to do
