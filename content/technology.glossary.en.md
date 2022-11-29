# Glossary

see also [W3C Linked Data Glossary](https://www.w3.org/TR/ld-glossary/)

## D

### Dereferencing
Query on the URI of the namespace to collect the data. (e.g. https://ld.admin.ch/canton/23). Different formats (serializations of the rdf model) can be requested through content-negotiation (by setting a specific HTTP Request Header asking specific format, e.g. RDF/XML, JSON-LD, Turtle in the ).

## I

### IRI

## N

### Named Graph
A _Named Graph_ is an additional URI which is not part of a Triple. It is the fourth, additional part which makes out of a Triple a Quad. 

The _Named Graph_ is normally used for data management purposes, e.g. to replace all triples in a named graph, or delete all information from one source.

Sometimes a _Named Graph_ is also compared to a file which include the Triples. Altough a Triplestore does manage Named Graphs not as files.

### Namespace


## O

### Object

## P

### Predicate

## Q

### Querying 
Query in SPARQL Language to the database endpoint (e.g. https://lindas.admin.ch/query)

## S

### Subject

## T

### Triple

In Linked Data a _Triple_ is the atomic form of a data point. It is the collection of three parts (hence Triple) which are made out of _Subject_ - _Predicate_ - _Object_. Note that the order is important, to interpret a _Triple_.

There are two cases of Triples.

With a _Literal_ in the Object place:

`<https://ld.admin.ch/FC> <http://schema.org/name> "Bundesrat" .`

Or with an _IRI_ at the Object place:

`<https://ld.admin.ch/FC> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://schema.org/GovernmentOrganization> .`

## U

### URI

See _IRI_.
