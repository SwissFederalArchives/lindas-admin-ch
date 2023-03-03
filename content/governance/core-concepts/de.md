# Zentrale Entitäten
Zentrale Entitäten (en: Core Entities) sind wichtige Ressourcen in LINDAS:

- Zentrale Entitäten werden benötigt, weil diese in sehr vielen verschiedenen Datensätzen eine Rolle spielen (werden) (bspw. Kantone oder Ämter) und somit wiederververwendbar sein sollen.
- Zentrale Entitäten sind der zentrale Punkt, um Detailinformationen aus verschiedenen anderen Quellen (Registern) zu verlinken (bspw. wird die zentrale Entität "Kanton XY" mit geografischen Informationen und Bevölkerungsstatistiken verlinkt)

<br>

Zu den Zentrale Entitäten gehören:

* Teritoriale Entitäten: Länder, Kantone, Bezirke, Gemeinden, ...
* Organisatorische Entitäten: Departemente, Ämter, ...
* Temporale Entitäten: Jahre, Semester, Quartale, Monate, Wochen...

<br>

Zentrale Entitäten werden als Teil eines Controlled Vocabularies vom Typ [schema:DefinedTerm](https://schema.org/DefinedTerm) innerhalb eines [schema:DefinedTermSet](https://schema.org/DefinedTermSet) modelliert. Es gibt keine eigentliche Klasse "Zentrale Entität".

## Tabellarische Sammlung von zentralen Entitäten

<table class="table">
    <tr>
        <td>Was</td>
        <td>Liste der Entitäten</td>
        <td>Beispiel</td>
    </tr>
    <tr>
        <td colspan=3><b>Teritoriale Entitäten</b></td>
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
        <td colspan=3><b>Organisatorische Entitäten</b></td>
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
    <tr>
        <td colspan=3><b>Temporale Entitäten</b></td>
    </tr>
    <tr>
        <td>Semester</td>
        <td><a href="https://ld.admin.ch/sparql/#query=PREFIX+schema%3A+%3Chttp%3A%2F%2Fschema.org%2F%3E%0APREFIX+rdf%3A+%3Chttp%3A%2F%2Fwww.w3.org%2F1999%2F02%2F22-rdf-syntax-ns%23%3E%0APREFIX+rdfs%3A+%3Chttp%3A%2F%2Fwww.w3.org%2F2000%2F01%2Frdf-schema%23%3E%0ASELECT+*+WHERE+%7B%0A%09%3Fweek+schema%3AinDefinedTermSet+%3Chttps%3A%2F%2Fld.admin.ch%2Ftime%2Fsemester%3E%3B%0A+++++++++++++schema%3Aname+%3Fname.%0A++FILTER(lang(%3Fname)+%3D+%22de%22)%0A%7D&contentTypeConstruct=text%2Fturtle&contentTypeSelect=application%2Fsparql-results%2Bjson&endpoint=https%3A%2F%2Fld.admin.ch%2Fquery&requestMethod=POST&tabTitle=Query&headers=%7B%7D&outputFormat=table" target="_blank">SPARQL Query</a></td>
        <td>Semester 1, 1978: https://ld.admin.ch/time/semester/1978-H1</td>
    </tr>
    <tr>
        <td>Quartale</td>
        <td><a href="https://ld.admin.ch/sparql/#query=PREFIX+schema%3A+%3Chttp%3A%2F%2Fschema.org%2F%3E%0APREFIX+rdf%3A+%3Chttp%3A%2F%2Fwww.w3.org%2F1999%2F02%2F22-rdf-syntax-ns%23%3E%0APREFIX+rdfs%3A+%3Chttp%3A%2F%2Fwww.w3.org%2F2000%2F01%2Frdf-schema%23%3E%0ASELECT+*+WHERE+%7B%0A%09%3Fweek+schema%3AinDefinedTermSet+%3Chttps%3A%2F%2Fld.admin.ch%2Ftime%2Fquarter%3E%3B%0A+++++++++++++schema%3Aname+%3Fname.%0A++FILTER(lang(%3Fname)+%3D+%22de%22)%0A%7D&contentTypeConstruct=text%2Fturtle&contentTypeSelect=application%2Fsparql-results%2Bjson&endpoint=https%3A%2F%2Fld.admin.ch%2Fquery&requestMethod=POST&tabTitle=Query&headers=%7B%7D&outputFormat=table" target="_blank">SPARQL Query</a></td>
        <td>Quartal 2, 1968: https://ld.admin.ch/time/quarter/1968-Q2</td>
    </tr>
    <tr>
        <td>Wochen</td>
        <td><a href="https://ld.admin.ch/sparql/#query=PREFIX+schema%3A+%3Chttp%3A%2F%2Fschema.org%2F%3E%0APREFIX+rdf%3A+%3Chttp%3A%2F%2Fwww.w3.org%2F1999%2F02%2F22-rdf-syntax-ns%23%3E%0APREFIX+rdfs%3A+%3Chttp%3A%2F%2Fwww.w3.org%2F2000%2F01%2Frdf-schema%23%3E%0ASELECT+*+WHERE+%7B%0A%09%3Fweek+schema%3AinDefinedTermSet+%3Chttps%3A%2F%2Fld.admin.ch%2Ftime%2Fweek%3E%3B%0A+++++++++++++schema%3Aname+%3Fname.%0A++FILTER(lang(%3Fname)+%3D+%22de%22)%0A%7D&contentTypeConstruct=text%2Fturtle&contentTypeSelect=application%2Fsparql-results%2Bjson&endpoint=https%3A%2F%2Fld.admin.ch%2Fquery&requestMethod=POST&tabTitle=Query&headers=%7B%7D&outputFormat=table" target="_blank">SPARQL Query</a></td>
        <td>Woche 12, 1972: https://ld.admin.ch/time/week/1972-W12</td>
    </tr>
</table>

## Weitere zentrale Entitäten resp. Defined Term Sets

Diese <a href="https://ld.admin.ch/sparql/#query=PREFIX+schema%3A+%3Chttp%3A%2F%2Fschema.org%2F%3E%0APREFIX+rdf%3A+%3Chttp%3A%2F%2Fwww.w3.org%2F1999%2F02%2F22-rdf-syntax-ns%23%3E%0APREFIX+rdfs%3A+%3Chttp%3A%2F%2Fwww.w3.org%2F2000%2F01%2Frdf-schema%23%3E%0A%0ASELECT+*+WHERE+%7B%0A++++%0A++++%3FDefinedTermSet+a+schema%3ADefinedTermSet%3B%0A++++++++schema%3Aname+%3FName.%0A++++FILTER(regex(str(%3FDefinedTermSet)%2C+%22admin.ch%22+)+)%0A++++FILTER(lang(%3FName)+%3D+%22de%22)%0A%7D&contentTypeConstruct=text%2Fturtle&contentTypeSelect=application%2Fsparql-results%2Bjson&endpoint=https%3A%2F%2Fld.admin.ch%2Fquery&requestMethod=POST&tabTitle=Query+5&headers=%7B%7D&outputFormat=table" target="_blank">SPARQL Query</a> gibt weitere Defined Term Sets zurück, die als zentrale Entitäten aufgefasst werden können. Dabei ist zu beachten, dass nicht alle Defined Term Sets eine Verlinkung zu den eigentlichen Terms mit Hilfe von [schema:hasDefinedTerm](https://schema.org/hasDefinedTerm) aufweisen. Teilweise hat nur der einzelne Term eine Verlinkung zum Defined Term Set über [schema:inDefinedTermSet](https://schema.org/inDefinedTermSet).


