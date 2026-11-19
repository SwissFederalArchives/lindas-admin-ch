# Canonical IRI acceptance (#249). Local harness redirects every host to loopback.
GET https://ld.admin.ch/canton/1
Accept: text/turtle
HTTP 200
[Asserts]
body contains "<https://ld.admin.ch/canton/1>"

GET https://energy.ld.admin.ch/canton/1
Accept: text/turtle
HTTP 404

GET https://environment.ld.admin.ch/canton/1
Accept: text/turtle
HTTP 404

GET https://energy.ld.admin.ch/elcom/electricityprice
Accept: text/turtle
HTTP 200
[Asserts]
body contains "<https://energy.ld.admin.ch/elcom/electricityprice>"

GET https://ld.admin.ch/elcom/electricityprice
Accept: text/turtle
HTTP 404

GET https://lindas.admin.ch/canton/1
Accept: text/turtle
HTTP 404

GET https://ld.admin.ch/canton/gitlab-249-nonexistent
Accept: text/turtle
HTTP 404

GET https://ld.admin.ch/canton/1
Accept: text/html
HTTP 200
[Asserts]
body contains "https://ld.admin.ch/canton/1"
