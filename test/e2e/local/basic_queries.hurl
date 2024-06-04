##########################################
# Simple SPARQL query:                   #
#   SELECT * WHERE { ?s ?p ?o } LIMIT 10 #
##########################################
GET http://localhost:8080/query?query=SELECT%20%2A%20WHERE%20%7B%20%3Fs%20%3Fp%20%3Fo%20%7D%20LIMIT%2010
Accept: application/sparql-results+json
HTTP 200
[Asserts]
header "Content-Type" == "application/sparql-results+json"
jsonpath "$.results.bindings" count == 10

POST http://localhost:8080/query
Accept: application/sparql-results+json
Content-Type: application/sparql-query
```
SELECT * WHERE { ?s ?p ?o } LIMIT 10
```
HTTP 200
[Asserts]
header "Content-Type" == "application/sparql-results+json"
jsonpath "$.results.bindings" count == 10

POST http://localhost:8080/query
Accept: application/sparql-results+json
[FormParams]
query: SELECT * WHERE { ?s ?p ?o } LIMIT 10
HTTP 200
[Asserts]
header "Content-Type" == "application/sparql-results+json"
jsonpath "$.results.bindings" count == 10
