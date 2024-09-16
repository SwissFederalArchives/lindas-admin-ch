# Redirects in Trifid


When a URI is used in the browser it links to TRIFID where the Triples of the URI and additional information such as the Graph are displayed.

It is possible to change the behaviour of Ttifid via Tripels and via URL or header.

For example:



### Redirect to the URI if:

Accept is text/html

contains a schema:URL with value of type xsd:anyURI




### To disable the schema URL redirection:

via header: X-Disable-Schema-URL-Redirect: true

via query parameter: disableSchemaUrlRedirect=true


Example: https://register.ld.admin.ch/termdat/56905?disableSchemaUrlRedirect=true
