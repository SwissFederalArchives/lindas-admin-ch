#####################################################################
# Make sure to run `npm run start:local` before running this script #
#####################################################################

# Main page
GET http://localhost:8080/
HTTP 200

# YASGUI
GET http://localhost:8080/sparql/
HTTP 200

# Graph Explorer
GET http://localhost:8080/graph-explorer/
HTTP 200

# SPEX
GET http://localhost:8080/spex/
HTTP 200
