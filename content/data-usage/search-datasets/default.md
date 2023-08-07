# Searching for Datasets

There is a [list of all datasets](/datasets/) available that can be searched. In this search, the title and description of the dataset is screened.

## Datasets by Creator

The following [SPARQL Query](https://ld.admin.ch/sparql/#query=PREFIX%20schema%3A%20%3Chttp%3A%2F%2Fschema.org%2F%3E%0APREFIX%20rdf%3A%20%3Chttp%3A%2F%2Fwww.w3.org%2F1999%2F02%2F22-rdf-syntax-ns%23%3E%0APREFIX%20rdfs%3A%20%3Chttp%3A%2F%2Fwww.w3.org%2F2000%2F01%2Frdf-schema%23%3E%0ASELECT%20%3FcreatorName%20%3Fdataset%20WHERE%20%7B%0A%20%20%3Fdataset%20a%20schema%3ADataset.%0A%20%20%3Fdataset%20schema%3Acreator%20%3Fcreator.%0A%20%20%3Fcreator%20schema%3Aname%20%3FcreatorName.%0A%20%20FILTER(lang(%3FcreatorName)%20%3D%20'en')%0A%7D%20ORDER%20BY%20%3Fcreator&endpoint=https%3A%2F%2Fld.admin.ch%2Fquery&requestMethod=POST&tabTitle=Query%201&headers=%7B%7D&contentTypeConstruct=application%2Fn-triples%2C*%2F*%3Bq%3D0.9&contentTypeSelect=application%2Fsparql-results%2Bjson%2C*%2F*%3Bq%3D0.9&outputFormat=table) returns all datasets sorted by its respective creator.