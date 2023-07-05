## Frequently Asked Queries

On this page, we are collecting some *SPARQL Query Patterns* that are useful to work with the LINDAS Linked Data.

### Multilingual Labels to Monolingual Columns

The following Query returns the names of all seven federal departments in the four official languages and optional in English in separate columns:

```sparql
PREFIX schema: <http://schema.org/>

SELECT DISTINCT * WHERE {
    ?department schema:inDefinedTermSet <https://ld.admin.ch/department>.

    ?department schema:name ?name_DE. FILTER(lang(?name_DE) = "de")
    ?department schema:name ?name_FR. FILTER(lang(?name_FR) = "fr")
    ?department schema:name ?name_IT. FILTER(lang(?name_IT) = "it")
    ?department schema:name ?name_RM. FILTER(lang(?name_RM) = "rm")
    
    OPTIONAL {?department schema:name ?name_EN. FILTER(lang(?name_EN) = "en")}
}
```
[Run this query in the YASGUI Interface of LINDAS](https://ld.admin.ch/sparql/#query=PREFIX%20schema%3A%20%3Chttp%3A%2F%2Fschema.org%2F%3E%0A%0ASELECT%20DISTINCT%20*%20WHERE%20%7B%0A%20%20%20%20%3Fdepartment%20schema%3AinDefinedTermSet%20%3Chttps%3A%2F%2Fld.admin.ch%2Fdepartment%3E.%0A%0A%20%20%20%20%3Fdepartment%20schema%3Aname%20%3Fname_DE.%20FILTER(lang(%3Fname_DE)%20%3D%20%22de%22)%0A%20%20%20%20%3Fdepartment%20schema%3Aname%20%3Fname_FR.%20FILTER(lang(%3Fname_FR)%20%3D%20%22fr%22)%0A%20%20%20%20%3Fdepartment%20schema%3Aname%20%3Fname_IT.%20FILTER(lang(%3Fname_IT)%20%3D%20%22it%22)%0A%20%20%20%20%3Fdepartment%20schema%3Aname%20%3Fname_RM.%20FILTER(lang(%3Fname_RM)%20%3D%20%22rm%22)%0A%20%20%09%0A%20%20%09OPTIONAL%20%7B%3Fdepartment%20schema%3Aname%20%3Fname_EN.%20FILTER(lang(%3Fname_EN)%20%3D%20%22en%22)%7D%0A%7D&endpoint=https%3A%2F%2Fld.admin.ch%2Fquery&requestMethod=POST&tabTitle=Query%201&headers=%7B%7D&contentTypeConstruct=text%2Fturtle&contentTypeSelect=application%2Fsparql-results%2Bjson&outputFormat=table)