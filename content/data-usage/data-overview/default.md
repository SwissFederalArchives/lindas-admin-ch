# Overview of the Data

There are different possibilities to get an overview of the Data avaible in LINDAS.

## opendata.swiss Platform

The opendata.swiss platform is the Swiss public administration’s central portal for Open Government Data (OGD). It allows to search for LINDAS datasets as well. [This link](https://opendata.swiss/en/dataset/?linked_data=SPARQL) opens opendata.swiss search window with *SPARQL* as format preselected.

## Datasets per Keyword

The following [SPARQL query](https://lindas.admin.ch/sparql/#query=SELECT%20DISTINCT%20%3Fdataset%20%3Fkeyword%20WHERE%20%7B%0A%20%20%3Fdataset%20%3FkeywordPredicate%20%3Fkeyword.%0A%20%20FILTER(%3FkeywordPredicate%20IN%20(%3Chttp%3A%2F%2Fpurl.org%2Fdc%2Fterms%2Fkeyword%3E%2C%20%3Chttp%3A%2F%2Fwww.w3.org%2Fns%2Fdcat%23keyword%3E%2C%20%3Chttps%3A%2F%2Fschema.org%2Fkeywords%3E))%0A%20%20FILTER(LANG(%3Fkeyword)%20%3D%20%22de%22)%0A%7D%20ORDER%20BY%20%3Fkeyword&endpoint=https%3A%2F%2Flindas.admin.ch%2Fquery&requestMethod=POST&tabTitle=Query&headers=%7B%7D&contentTypeConstruct=application%2Fn-triples%2C*%2F*%3Bq%3D0.9&contentTypeSelect=application%2Fsparql-results%2Bjson%2C*%2F*%3Bq%3D0.9&outputFormat=table) shows all the keywords of the different datasets.
