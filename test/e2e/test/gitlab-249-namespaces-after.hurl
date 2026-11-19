# Namespace lookup acceptance, independent of response-rewriting policy.
GET https://test.ld.admin.ch/canton/1
Accept: text/turtle
HTTP 200

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

GET https://test.ld.admin.ch/elcom/electricityprice
Accept: text/turtle
HTTP 404

GET https://test.ld.admin.ch/canton/gitlab-249-nonexistent
Accept: text/turtle
HTTP 404

GET https://test.lindas.admin.ch/canton/1
Accept: text/turtle
HTTP 404
