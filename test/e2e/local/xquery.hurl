####################################
# No parameter => xkey = "default" #
####################################

GET http://localhost:8080/query?query=SELECT%20%2A%20WHERE%20%7B%20%3Fs%20%3Fp%20%3Fo%20%7D%20LIMIT%2010
Accept: application/sparql-results+json
HTTP 200
[Asserts]
header "Content-Type" == "application/sparql-results+json"
header "xkey" == "default"
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
header "xkey" == "default"
jsonpath "$.results.bindings" count == 10

POST http://localhost:8080/query
Accept: application/sparql-results+json
[FormParams]
query: SELECT * WHERE { ?s ?p ?o } LIMIT 10
HTTP 200
[Asserts]
header "Content-Type" == "application/sparql-results+json"
header "xkey" == "default"
jsonpath "$.results.bindings" count == 10


########################################
# The parameter is a URL => xkey = URL #
########################################

GET http://localhost:8080/query/http://example.com/my/path?query=SELECT%20%2A%20WHERE%20%7B%20%3Fs%20%3Fp%20%3Fo%20%7D%20LIMIT%2010
Accept: application/sparql-results+json
HTTP 200
[Asserts]
header "Content-Type" == "application/sparql-results+json"
header "xkey" == "http://example.com/my/path"
jsonpath "$.results.bindings" count == 10

POST http://localhost:8080/query/http://example.com/my/path
Accept: application/sparql-results+json
Content-Type: application/sparql-query
```
SELECT * WHERE { ?s ?p ?o } LIMIT 10
```
HTTP 200
[Asserts]
header "Content-Type" == "application/sparql-results+json"
header "xkey" == "http://example.com/my/path"
jsonpath "$.results.bindings" count == 10

POST http://localhost:8080/query/http://example.com/my/path
Accept: application/sparql-results+json
[FormParams]
query: SELECT * WHERE { ?s ?p ?o } LIMIT 10
HTTP 200
[Asserts]
header "Content-Type" == "application/sparql-results+json"
header "xkey" == "http://example.com/my/path"
jsonpath "$.results.bindings" count == 10


########################################
# It should support url-encoded values #
########################################

GET http://localhost:8080/query/http%3A%2F%2Fexample.com%2Fmy%2Fpath?query=SELECT%20%2A%20WHERE%20%7B%20%3Fs%20%3Fp%20%3Fo%20%7D%20LIMIT%2010
Accept: application/sparql-results+json
HTTP 200
[Asserts]
header "Content-Type" == "application/sparql-results+json"
header "xkey" == "http://example.com/my/path"
jsonpath "$.results.bindings" count == 10

POST http://localhost:8080/query/http%3A%2F%2Fexample.com%2Fmy%2Fpath
Accept: application/sparql-results+json
Content-Type: application/sparql-query
```
SELECT * WHERE { ?s ?p ?o } LIMIT 10
```
HTTP 200
[Asserts]
header "Content-Type" == "application/sparql-results+json"
header "xkey" == "http://example.com/my/path"
jsonpath "$.results.bindings" count == 10

POST http://localhost:8080/query/http%3A%2F%2Fexample.com%2Fmy%2Fpath
Accept: application/sparql-results+json
[FormParams]
query: SELECT * WHERE { ?s ?p ?o } LIMIT 10
HTTP 200
[Asserts]
header "Content-Type" == "application/sparql-results+json"
header "xkey" == "http://example.com/my/path"
jsonpath "$.results.bindings" count == 10
