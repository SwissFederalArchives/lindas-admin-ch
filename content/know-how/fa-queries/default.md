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

### Reduce Language-Tagged Strings to a Single String (with Language Preferences)

The following query reduces multiple `schema:name` attributes (with different or non existent language tags) to a single answer (depening on given language preferences):

```sparql
PREFIX dct: <http://purl.org/dc/terms/>
PREFIX schema: <http://schema.org/>
SELECT DISTINCT ?creator ?name WHERE {

  ?s dct:creator ?creator.
  
  OPTIONAL {?creator schema:name ?nameDE. FILTER(lang(?nameDE) = "de")}
  OPTIONAL {?creator schema:name ?nameFR. FILTER(lang(?nameFR) = "fr")}
  OPTIONAL {?creator schema:name ?nameIT. FILTER(lang(?nameIT) = "it")}
  OPTIONAL {?creator schema:name ?nameRM. FILTER(lang(?nameRM) = "rm")}
  OPTIONAL {?creator schema:name ?nameEN. FILTER(lang(?nameEN) = "en")}
  OPTIONAL {?creator schema:name ?nameUndef. FILTER(lang(?nameUndef) = "")}
  
    BIND (
    COALESCE(
      IF(BOUND(?nameEN), ?nameEN, 1/0),
      IF(BOUND(?nameDE), ?nameDE, 1/0),
      IF(BOUND(?nameFR), ?nameFR, 1/0),
      IF(BOUND(?nameIT), ?nameIT, 1/0),
      IF(BOUND(?nameRM), ?nameRM, 1/0),
      IF(BOUND(?nameUndef), ?nameUndef, 1/0),
      ""
    ) AS ?name
  )
} ORDER BY ?name
```
[Run this query in the YASGUI Interface of LINDAS](https://ld.admin.ch/sparql/#query=PREFIX%20dct%3A%20%3Chttp%3A%2F%2Fpurl.org%2Fdc%2Fterms%2F%3E%0APREFIX%20schema%3A%20%3Chttp%3A%2F%2Fschema.org%2F%3E%0ASELECT%20DISTINCT%20%3Fcreator%20%3Fname%20WHERE%20%7B%0A%0A%20%20%3Fs%20dct%3Acreator%20%3Fcreator.%0A%20%20%0A%20%20OPTIONAL%20%7B%3Fcreator%20schema%3Aname%20%3FnameDE.%20FILTER(lang(%3FnameDE)%20%3D%20%22de%22)%7D%0A%20%20OPTIONAL%20%7B%3Fcreator%20schema%3Aname%20%3FnameFR.%20FILTER(lang(%3FnameFR)%20%3D%20%22fr%22)%7D%0A%20%20OPTIONAL%20%7B%3Fcreator%20schema%3Aname%20%3FnameIT.%20FILTER(lang(%3FnameIT)%20%3D%20%22it%22)%7D%0A%20%20OPTIONAL%20%7B%3Fcreator%20schema%3Aname%20%3FnameRM.%20FILTER(lang(%3FnameRM)%20%3D%20%22rm%22)%7D%0A%20%20OPTIONAL%20%7B%3Fcreator%20schema%3Aname%20%3FnameEN.%20FILTER(lang(%3FnameEN)%20%3D%20%22en%22)%7D%0A%20%20OPTIONAL%20%7B%3Fcreator%20schema%3Aname%20%3FnameUndef.%20FILTER(lang(%3FnameUndef)%20%3D%20%22%22)%7D%0A%20%20%0A%20%20%20%20BIND%20(%0A%20%20%20%20COALESCE(%0A%20%20%20%20%20%20IF(BOUND(%3FnameEN)%2C%20%3FnameEN%2C%201%2F0)%2C%0A%20%20%20%20%20%20IF(BOUND(%3FnameDE)%2C%20%3FnameDE%2C%201%2F0)%2C%0A%20%20%20%20%20%20IF(BOUND(%3FnameFR)%2C%20%3FnameFR%2C%201%2F0)%2C%0A%20%20%20%20%20%20IF(BOUND(%3FnameIT)%2C%20%3FnameIT%2C%201%2F0)%2C%0A%20%20%20%20%20%20IF(BOUND(%3FnameRM)%2C%20%3FnameRM%2C%201%2F0)%2C%0A%20%20%20%20%20%20IF(BOUND(%3FnameUndef)%2C%20%3FnameUndef%2C%201%2F0)%2C%0A%20%20%20%20%20%20%22%22%0A%20%20%20%20)%20AS%20%3Fname%0A%20%20)%0A%7D%20ORDER%20BY%20%3Fname&endpoint=https%3A%2F%2Fld.admin.ch%2Fquery&requestMethod=POST&tabTitle=Query%201&headers=%7B%7D&contentTypeConstruct=application%2Fn-triples%2C*%2F*%3Bq%3D0.9&contentTypeSelect=application%2Fsparql-results%2Bjson%2C*%2F*%3Bq%3D0.9&outputFormat=table)

### Resources that Belong to at Least one Class of a List

The following Query returns all the datasets in LINDAS. The problem with a dataset is that at least four different classes for datasets exist and not all datasets belong to all these four classes:

```sparql
PREFIX void: <http://rdfs.org/ns/void#>
PREFIX dcat: <http://www.w3.org/ns/dcat#>
PREFIX schema: <http://schema.org/>

SELECT DISTINCT ?dataset WHERE {
  ?dataset a ?class.
  
  FILTER(?class IN (schema:Dataset, void:Dataset, dcat:Dataset, <https://schema.ld.admin.ch/Dataset>))
}
```
[Run this query in the YASGUI Interface of LINDAS](https://ld.admin.ch/sparql/#query=PREFIX%20void%3A%20%3Chttp%3A%2F%2Frdfs.org%2Fns%2Fvoid%23%3E%0APREFIX%20dcat%3A%20%3Chttp%3A%2F%2Fwww.w3.org%2Fns%2Fdcat%23%3E%0APREFIX%20schema%3A%20%3Chttp%3A%2F%2Fschema.org%2F%3E%0A%0ASELECT%20DISTINCT%20%3Fdataset%20WHERE%20%7B%0A%20%20%3Fdataset%20a%20%3Fclass.%0A%20%20%0A%20%20FILTER(%3Fclass%20IN%20(schema%3ADataset%2C%20void%3ADataset%2C%20dcat%3ADataset%2C%20%3Chttps%3A%2F%2Fschema.ld.admin.ch%2FDataset%3E))%0A%7D&endpoint=https%3A%2F%2Fld.admin.ch%2Fquery&requestMethod=POST&tabTitle=Query%202&headers=%7B%7D&contentTypeConstruct=application%2Fn-triples%2C*%2F*%3Bq%3D0.9&contentTypeSelect=application%2Fsparql-results%2Bjson%2C*%2F*%3Bq%3D0.9&outputFormat=table)


### Finding the Latest Version of a Cube

Cube Creator generated Cubes in LINDAS have versions. To find the latest version of a cube (given by its `dcterms:identifier`), the following SPARQL query can be helpful:

```sparql
PREFIX schema: <http://schema.org/>
PREFIX dcterms: <http://purl.org/dc/terms/>

SELECT ?dataset WHERE {
  BIND("ubd0104" as ?id)
  ?dataset a schema:Dataset;
          dcterms:identifier ?id.
  
  FILTER NOT EXISTS {?dataset schema:expires ?expDate}
}
```

[Run this query in the YASGUI Interface of LINDAS](https://ld.admin.ch/sparql/#query=PREFIX%20schema%3A%20%3Chttp%3A%2F%2Fschema.org%2F%3E%0APREFIX%20dcterms%3A%20%3Chttp%3A%2F%2Fpurl.org%2Fdc%2Fterms%2F%3E%0A%0ASELECT%20%3Fdataset%20WHERE%20%7B%0A%20%20BIND(%22ubd0104%22%20as%20%3Fid)%0A%20%20%3Fdataset%20a%20schema%3ADataset%3B%0A%20%20%20%20%20%20%20%20%20%20dcterms%3Aidentifier%20%3Fid.%0A%20%20%0A%20%20FILTER%20NOT%20EXISTS%20%7B%3Fdataset%20schema%3Aexpires%20%3FexpDate%7D%0A%7D&endpoint=https%3A%2F%2Fld.admin.ch%2Fquery&requestMethod=POST&tabTitle=Query%206&headers=%7B%7D&contentTypeConstruct=application%2Fn-triples%2C*%2F*%3Bq%3D0.9&contentTypeSelect=application%2Fsparql-results%2Bjson%2C*%2F*%3Bq%3D0.9&outputFormat=table)