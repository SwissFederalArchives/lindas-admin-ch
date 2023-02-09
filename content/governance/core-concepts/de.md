# Zentrale Entitäten
Zentrale Entitäten (en: Core Entities) sind wichtige Ressourcen in LINDAS:

- Zentrale Entitäten werden benötigt, weil diese in sehr vielen verschiedenen Datensätzen eine Rolle spielen (werden) (bspw. Kantone oder Ämter) und somit wiederververwendbar sein sollen.
- Zentrale Entitäten sind der zentrale Punkt, um Detailinformationen aus verschiedenen anderen Quellen (Registern) zu verlinken (bspw. wird die zentrale Entität "Kanton XY" mit geografischen Informationen und Bevölkerungsstatistiken verlinkt)

<br>

Zu den Zentrale Entitäten gehören:

* Teritoriale Entitäten: Länder, Kantone, Bezirke, Gemeinden, ...
* Organisatorische Entitäten: Departemente, Ämter, ...
* Temporale Entitäten: Monate, Wochen, Semester, Quartale, ...

<br>

Zentrale Entitäten werden als Teil eines Controlled Vocabularies vom Typ [schema:DefinedTerm](https://schema.org/DefinedTerm) modelliert. Es gibt keine eigentliche Klasse "Zentrale Entität".

## Tabellarische Sammlung von zentralen Entitäten

<table class="table">
    <tr>
        <td>Was</td>
        <td>Liste der Entitäten</td>
        <td>Beispiel</td>
    </tr>
    <tr>
        <td>Länder</td>
        <td><a href="https://ld.admin.ch/sparql/#query=PREFIX+schema%3A+%3Chttp%3A%2F%2Fschema.org%2F%3E%0APREFIX+rdf%3A+%3Chttp%3A%2F%2Fwww.w3.org%2F1999%2F02%2F22-rdf-syntax-ns%23%3E%0APREFIX+rdfs%3A+%3Chttp%3A%2F%2Fwww.w3.org%2F2000%2F01%2Frdf-schema%23%3E%0ASELECT+*+WHERE+%7B%0A%09%3Fcountry+schema%3AinDefinedTermSet+%3Chttps%3A%2F%2Fld.admin.ch%2Fdimension%2Fcountry%3E%3B%0A++%09%09schema%3Aname+%3Fname.%0A++FILTER(lang(%3Fname)+%3D+%22de%22)%0A%7D&contentTypeConstruct=text%2Fturtle&contentTypeSelect=application%2Fsparql-results%2Bjson&endpoint=https%3A%2F%2Fld.admin.ch%2Fquery&requestMethod=POST&tabTitle=Query+4&headers=%7B%7D&outputFormat=table" target="_blank">SPARQL Query</a></td>
        <td>Frankreich: https://ld.admin.ch/country/FRA</td>
    </tr>
    <tr>
        <td>Kantone</td>
        <td><a href="https://ld.admin.ch/sparql/#query=PREFIX+schema%3A+%3Chttp%3A%2F%2Fschema.org%2F%3E%0APREFIX+rdf%3A+%3Chttp%3A%2F%2Fwww.w3.org%2F1999%2F02%2F22-rdf-syntax-ns%23%3E%0APREFIX+rdfs%3A+%3Chttp%3A%2F%2Fwww.w3.org%2F2000%2F01%2Frdf-schema%23%3E%0ASELECT+*+WHERE+%7B%0A%09%3Fcanton+a+%3Chttps%3A%2F%2Fschema.ld.admin.ch%2FCanton%3E%3B%0A+++++++++schema%3AalternateName+%3Fabbr.%0A%7D&contentTypeConstruct=text%2Fturtle&contentTypeSelect=application%2Fsparql-results%2Bjson&endpoint=https%3A%2F%2Fld.admin.ch%2Fquery&requestMethod=POST&tabTitle=Query&headers=%7B%7D&outputFormat=table" target="_blank">SPARQL Query</a></td>
        <td>Jura: https://ld.admin.ch/canton/26</td>
    </tr>
    <tr>
        <td>Gemeinden</td>
        <td><a href="https://ld.admin.ch/sparql/#query=PREFIX+schema%3A+%3Chttp%3A%2F%2Fschema.org%2F%3E%0APREFIX+rdf%3A+%3Chttp%3A%2F%2Fwww.w3.org%2F1999%2F02%2F22-rdf-syntax-ns%23%3E%0APREFIX+rdfs%3A+%3Chttp%3A%2F%2Fwww.w3.org%2F2000%2F01%2Frdf-schema%23%3E%0ASELECT+*+WHERE+%7B%0A%09%3Fmunicipality+a+%3Chttps%3A%2F%2Fschema.ld.admin.ch%2FMunicipality%3E%3B%0A+++++++++++++++schema%3Aname+%3Fname.%0A%7D&contentTypeConstruct=text%2Fturtle&contentTypeSelect=application%2Fsparql-results%2Bjson&endpoint=https%3A%2F%2Fld.admin.ch%2Fquery&requestMethod=POST&tabTitle=Query&headers=%7B%7D&outputFormat=table" target="_blank">SPARQL Query</a></td>
        <td>Bregaglia: https://ld.admin.ch/municipality/3792</td>
    </tr>
    <tr>
        <td>Departemente der Bundesverwaltung</td>
        <td><a href="https://ld.admin.ch/sparql/#query=PREFIX+schema%3A+%3Chttp%3A%2F%2Fschema.org%2F%3E%0APREFIX+rdf%3A+%3Chttp%3A%2F%2Fwww.w3.org%2F1999%2F02%2F22-rdf-syntax-ns%23%3E%0APREFIX+rdfs%3A+%3Chttp%3A%2F%2Fwww.w3.org%2F2000%2F01%2Frdf-schema%23%3E%0ASELECT+*+WHERE+%7B%0A%09%3Fdepartment+schema%3AinDefinedTermSet+%3Chttps%3A%2F%2Fld.admin.ch%2Fdepartment%3E%3B%0A+++++++++++++schema%3Aname+%3Fname.%0A++FILTER(lang(%3Fname)+%3D+%22fr%22)%0A%7D&contentTypeConstruct=text%2Fturtle&contentTypeSelect=application%2Fsparql-results%2Bjson&endpoint=https%3A%2F%2Fld.admin.ch%2Fquery&requestMethod=POST&tabTitle=Query&headers=%7B%7D&outputFormat=table" target="_blank">SPARQL Query</a></td>
        <td>DETEC: https://ld.admin.ch/department/VII</td>
    </tr>
    <tr>
        <td>Bundesämter</td>
        <td><a href="https://ld.admin.ch/sparql/#query=PREFIX+schema%3A+%3Chttp%3A%2F%2Fschema.org%2F%3E%0APREFIX+rdf%3A+%3Chttp%3A%2F%2Fwww.w3.org%2F1999%2F02%2F22-rdf-syntax-ns%23%3E%0APREFIX+rdfs%3A+%3Chttp%3A%2F%2Fwww.w3.org%2F2000%2F01%2Frdf-schema%23%3E%0ASELECT+*+WHERE+%7B%0A%09%3Fdepartment+schema%3AinDefinedTermSet+%3Chttps%3A%2F%2Fld.admin.ch%2Foffice%3E%3B%0A+++++++++++++schema%3Aname+%3Fname.%0A++FILTER(lang(%3Fname)+%3D+%22de%22)%0A%7D&contentTypeConstruct=text%2Fturtle&contentTypeSelect=application%2Fsparql-results%2Bjson&endpoint=https%3A%2F%2Fld.admin.ch%2Fquery&requestMethod=POST&tabTitle=Query&headers=%7B%7D&outputFormat=table" target="_blank">SPARQL Query</a></td>
        <td>Bundesarchiv: https://ld.admin.ch/office/II.1.4</td>
    </tr>
</table>

Diese Aufzählung hat keinen Anspruch auf Vollständigkeit.



