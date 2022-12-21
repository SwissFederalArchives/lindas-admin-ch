# Zentrale Entitäten
Zentrale Entitäten (en: Core Entities) sind wichtige Ressourcen in LINDAS:

- Zentrale Entitäten werden benötigt, weil diese in sehr vielen verschiedenen Datensätzen eine Rolle spielen (werden) (bspw. Kantone oder Ämter) und somit wiederververwendbar sein sollen.
- Zentrale Entitäten sind der zentrale Punkt, um Detailinformationen aus verschiedenen anderen Quellen (Registern) zu verlinken (bspw. wird die zentrale Entität "Kanton XY" mit geografischen Informationen und Bevölkerungsstatistiken verlinkt)

Zu den Zentrale Entitäten gehören:

* Teritoriale Entitäten: Länder, Kantone, Bezirke, Gemeinden, ...
* Organisatorische Entitäten: Departemente, Ämter, ...
* Temporale Entitäten: Monate, Wochen, Semester, Quartale, ...

Zentrale Entitäten sind immer auch Teil eines Controlled Vocabularies und als solche vom Typ [schema:DefinedTerm](https://schema.org/DefinedTerm), sie sind jedoch nicht als eigentliche zentrale Entität klassifiziert in den Linked Data.

## Tabellarische Sammlung von zentralen Entitäten

|Was|SPARQL Query|Beispiel|
|---|------------|--------|
|Kantone|<a href="https://ld.admin.ch/sparql/#query=PREFIX+schema%3A+%3Chttp%3A%2F%2Fschema.org%2F%3E%0APREFIX+rdf%3A+%3Chttp%3A%2F%2Fwww.w3.org%2F1999%2F02%2F22-rdf-syntax-ns%23%3E%0APREFIX+rdfs%3A+%3Chttp%3A%2F%2Fwww.w3.org%2F2000%2F01%2Frdf-schema%23%3E%0ASELECT+*+WHERE+%7B%0A%09%3Fcanton+a+%3Chttps%3A%2F%2Fschema.ld.admin.ch%2FCanton%3E%3B%0A+++++++++schema%3AalternateName+%3Fabbr.%0A%7D&contentTypeConstruct=text%2Fturtle&contentTypeSelect=application%2Fsparql-results%2Bjson&endpoint=https%3A%2F%2Fld.admin.ch%2Fquery&requestMethod=POST&tabTitle=Query&headers=%7B%7D&outputFormat=table" target="_blank">SPARQL Query</a>|Jura: https://ld.admin.ch/canton/26|
|Gemeinden|<a href="https://ld.admin.ch/sparql/#query=PREFIX+schema%3A+%3Chttp%3A%2F%2Fschema.org%2F%3E%0APREFIX+rdf%3A+%3Chttp%3A%2F%2Fwww.w3.org%2F1999%2F02%2F22-rdf-syntax-ns%23%3E%0APREFIX+rdfs%3A+%3Chttp%3A%2F%2Fwww.w3.org%2F2000%2F01%2Frdf-schema%23%3E%0ASELECT+*+WHERE+%7B%0A%09%3Fmunicipality+a+%3Chttps%3A%2F%2Fschema.ld.admin.ch%2FMunicipality%3E%3B%0A+++++++++++++++schema%3Aname+%3Fname.%0A%7D&contentTypeConstruct=text%2Fturtle&contentTypeSelect=application%2Fsparql-results%2Bjson&endpoint=https%3A%2F%2Fld.admin.ch%2Fquery&requestMethod=POST&tabTitle=Query&headers=%7B%7D&outputFormat=table" target="_blank">SPARQL Query</a>|Bregaglia: https://ld.admin.ch/municipality/3792|
|Departemente der Bundesverwaltung|<a href="https://ld.admin.ch/sparql/#query=PREFIX+schema%3A+%3Chttp%3A%2F%2Fschema.org%2F%3E%0APREFIX+rdf%3A+%3Chttp%3A%2F%2Fwww.w3.org%2F1999%2F02%2F22-rdf-syntax-ns%23%3E%0APREFIX+rdfs%3A+%3Chttp%3A%2F%2Fwww.w3.org%2F2000%2F01%2Frdf-schema%23%3E%0ASELECT+*+WHERE+%7B%0A%09%3Fdepartment+schema%3AinDefinedTermSet+%3Chttps%3A%2F%2Fld.admin.ch%2Fdepartment%3E%3B%0A+++++++++++++schema%3Aname+%3Fname.%0A++FILTER(lang(%3Fname)+%3D+%22fr%22)%0A%7D&contentTypeConstruct=text%2Fturtle&contentTypeSelect=application%2Fsparql-results%2Bjson&endpoint=https%3A%2F%2Fld.admin.ch%2Fquery&requestMethod=POST&tabTitle=Query&headers=%7B%7D&outputFormat=table" target="_blank">SPARQL Query</a>|DETEC: https://ld.admin.ch/department/VII|
|Bundesämter|<a href="https://ld.admin.ch/sparql/#query=PREFIX+schema%3A+%3Chttp%3A%2F%2Fschema.org%2F%3E%0APREFIX+rdf%3A+%3Chttp%3A%2F%2Fwww.w3.org%2F1999%2F02%2F22-rdf-syntax-ns%23%3E%0APREFIX+rdfs%3A+%3Chttp%3A%2F%2Fwww.w3.org%2F2000%2F01%2Frdf-schema%23%3E%0ASELECT+*+WHERE+%7B%0A%09%3Fdepartment+schema%3AinDefinedTermSet+%3Chttps%3A%2F%2Fld.admin.ch%2Foffice%3E%3B%0A+++++++++++++schema%3Aname+%3Fname.%0A++FILTER(lang(%3Fname)+%3D+%22de%22)%0A%7D&contentTypeConstruct=text%2Fturtle&contentTypeSelect=application%2Fsparql-results%2Bjson&endpoint=https%3A%2F%2Fld.admin.ch%2Fquery&requestMethod=POST&tabTitle=Query&headers=%7B%7D&outputFormat=table" target="_blank">SPARQL Query</a>|Bundesarchiv: https://ld.admin.ch/office/II.1.4|


