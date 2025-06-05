# Dereferencing

When an URI of a LINDAS element is entered into the browser's address field, the server responds with a dynamic website where all the triples are shown, that exist within the LINDAS triple store that have the corresponding URI as a subject. Some additional information like the named graphs of the triples is also shown. It is possible to change this default behaviour of the server by using an URL parameter or a special header.

## Redirect

This default dereferencing is overriden, if:

- header in the request has accept: text/html and
- there is a triple that has on the predicate position schema:URL with an object of type xsd:anyURI

In this case, there is a forward to the object (URL) of the predicate schema:URL.

Example: https://register.ld.admin.ch/termdat/56905


## Disable the Redirection

The above described redirection can be disabled either

- via header: X-Disable-Schema-URL-Redirect: true or
- via query parameter: disableSchemaUrlRedirect=true


Example: https://register.ld.admin.ch/termdat/56905?disableSchemaUrlRedirect=true
