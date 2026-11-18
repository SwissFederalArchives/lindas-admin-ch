# Post-cutover baseline: records the defect; must stop passing after the fix.
GET https://test.ld.admin.ch/canton/1
Accept: text/turtle
HTTP 200
[Asserts]
body contains "<https://test.ld.admin.ch/canton/1>"

GET https://test.schema.ld.admin.ch/canton/1
Accept: text/turtle
HTTP 200
[Asserts]
body contains "<https://test.schema.ld.admin.ch/canton/1>"

GET https://test.culture.ld.admin.ch/canton/1
Accept: text/turtle
HTTP 200
[Asserts]
body contains "<https://test.culture.ld.admin.ch/canton/1>"

GET https://test.energy.ld.admin.ch/canton/1
Accept: text/turtle
HTTP 200
[Asserts]
body contains "<https://test.energy.ld.admin.ch/canton/1>"

GET https://test.education.ld.admin.ch/canton/1
Accept: text/turtle
HTTP 200
[Asserts]
body contains "<https://test.education.ld.admin.ch/canton/1>"

GET https://test.agriculture.ld.admin.ch/canton/1
Accept: text/turtle
HTTP 200
[Asserts]
body contains "<https://test.agriculture.ld.admin.ch/canton/1>"

GET https://test.environment.ld.admin.ch/canton/1
Accept: text/turtle
HTTP 200
[Asserts]
body contains "<https://test.environment.ld.admin.ch/canton/1>"

GET https://test.finance.ld.admin.ch/canton/1
Accept: text/turtle
HTTP 200
[Asserts]
body contains "<https://test.finance.ld.admin.ch/canton/1>"

GET https://test.register.ld.admin.ch/canton/1
Accept: text/turtle
HTTP 200
[Asserts]
body contains "<https://test.register.ld.admin.ch/canton/1>"

GET https://test.politics.ld.admin.ch/canton/1
Accept: text/turtle
HTTP 200
[Asserts]
body contains "<https://test.politics.ld.admin.ch/canton/1>"

GET https://test.health.ld.admin.ch/canton/1
Accept: text/turtle
HTTP 200
[Asserts]
body contains "<https://test.health.ld.admin.ch/canton/1>"

GET https://test.communication.ld.admin.ch/canton/1
Accept: text/turtle
HTTP 200
[Asserts]
body contains "<https://test.communication.ld.admin.ch/canton/1>"

GET https://test.transport.ld.admin.ch/canton/1
Accept: text/turtle
HTTP 200
[Asserts]
body contains "<https://test.transport.ld.admin.ch/canton/1>"

GET https://test.population.ld.admin.ch/canton/1
Accept: text/turtle
HTTP 200
[Asserts]
body contains "<https://test.population.ld.admin.ch/canton/1>"
