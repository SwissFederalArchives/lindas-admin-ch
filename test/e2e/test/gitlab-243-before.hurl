# Baseline after canonical mode (#249), before environment routes (#243).
GET https://test.ld.admin.ch/canton/1
Accept: text/turtle
HTTP 404

GET https://test.energy.ld.admin.ch/elcom/electricityprice
Accept: text/turtle
HTTP 404

GET https://test.energy.ld.admin.ch/canton/1
Accept: text/turtle
HTTP 404
