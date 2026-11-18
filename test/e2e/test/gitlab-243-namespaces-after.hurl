# Environment dereferencing (#243), with existing TEST-prefixed results.
GET https://test.ld.admin.ch/canton/1
Accept: text/turtle
HTTP 200
[Asserts]
body contains "<https://test.ld.admin.ch/canton/1>"
body contains "<https://test.ld.admin.ch/district/112>"

GET https://test.schema.ld.admin.ch/canton/1
Accept: text/turtle
HTTP 404

GET https://test.culture.ld.admin.ch/canton/1
Accept: text/turtle
HTTP 404

GET https://test.energy.ld.admin.ch/canton/1
Accept: text/turtle
HTTP 404

GET https://test.education.ld.admin.ch/canton/1
Accept: text/turtle
HTTP 404

GET https://test.agriculture.ld.admin.ch/canton/1
Accept: text/turtle
HTTP 404

GET https://test.environment.ld.admin.ch/canton/1
Accept: text/turtle
HTTP 404

GET https://test.finance.ld.admin.ch/canton/1
Accept: text/turtle
HTTP 404

GET https://test.register.ld.admin.ch/canton/1
Accept: text/turtle
HTTP 404

GET https://test.politics.ld.admin.ch/canton/1
Accept: text/turtle
HTTP 404

GET https://test.health.ld.admin.ch/canton/1
Accept: text/turtle
HTTP 404

GET https://test.communication.ld.admin.ch/canton/1
Accept: text/turtle
HTTP 404

GET https://test.transport.ld.admin.ch/canton/1
Accept: text/turtle
HTTP 404

GET https://test.population.ld.admin.ch/canton/1
Accept: text/turtle
HTTP 404

GET https://test.energy.ld.admin.ch/elcom/electricityprice
Accept: text/turtle
HTTP 200
[Asserts]
body contains "<https://test.energy.ld.admin.ch/elcom/electricityprice>"

GET https://test.ld.admin.ch/elcom/electricityprice
Accept: text/turtle
HTTP 404

GET https://test.lindas.admin.ch/canton/1
Accept: text/turtle
HTTP 404

GET https://test.ld.admin.ch/canton/gitlab-249-nonexistent
Accept: text/turtle
HTTP 404

GET https://test.ld.admin.ch/canton/1
Accept: text/html
HTTP 200
[Asserts]
body contains "https://test.ld.admin.ch/canton/1"

GET https://test.energy.ld.admin.ch/elcom/electricityprice
Accept: application/ld+json
HTTP 200
[Asserts]
body contains "https://test.energy.ld.admin.ch/elcom/electricityprice"

GET https://test.lindas.admin.ch/query
Accept: application/sparql-results+json
[QueryStringParams]
query: ASK { GRAPH ?g { <https://ld.admin.ch/canton/1> ?p ?o } }
HTTP 200
[Asserts]
jsonpath "$.boolean" == true

GET https://test.lindas.admin.ch/query
Accept: application/sparql-results+json
[QueryStringParams]
query: ASK { GRAPH ?g { <https://test.ld.admin.ch/canton/1> ?p ?o } }
HTTP 200
[Asserts]
jsonpath "$.boolean" == false
