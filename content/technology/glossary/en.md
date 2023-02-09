# Glossary

see also [W3C Linked Data Glossary](https://www.w3.org/TR/ld-glossary/)

## C

### Controlled Vocabulary

### Core Entity

## D

### Defined Term
A Defined Term is a word or phrase with a at least implicite formal definition that ist part of a Defined Term Set that contains all the Defined Terms of a certain category. For example, the Defined Term Set [Cantons](https://ld.admin.ch/dimension/canton) contains all 26 Swiss Cantons. The member of this Defined Term Set can be queried as <a href="https://ld.admin.ch/sparql/#query=PREFIX+schema%3A+%3Chttp%3A%2F%2Fschema.org%2F%3E%0APREFIX+rdf%3A+%3Chttp%3A%2F%2Fwww.w3.org%2F1999%2F02%2F22-rdf-syntax-ns%23%3E%0APREFIX+rdfs%3A+%3Chttp%3A%2F%2Fwww.w3.org%2F2000%2F01%2Frdf-schema%23%3E%0ASELECT+*+WHERE+%7B%0A%09%3FDefinedTerm+schema%3AinDefinedTermSet+%3Chttps%3A%2F%2Fld.admin.ch%2Fdimension%2Fcanton%3E%3B%0A++%09%09schema%3Aname+%3Fname.%0A++++++FILTER(lang(%3Fname)+%3D+'en')%0A%7D&contentTypeConstruct=text%2Fturtle&contentTypeSelect=application%2Fsparql-results%2Bjson&endpoint=https%3A%2F%2Fld.admin.ch%2Fquery&requestMethod=POST&tabTitle=Query+2&headers=%7B%7D&outputFormat=table" target="_blank">follows</a>.

### Defined Term Set
A Defined Term Set contains all the the Defined Terms of a certain category. The Defined Term Set is characterized by the fact that such a Set is usually complete at the current time. For example, at any time, the Defined Term Set of the [Cantons](https://ld.admin.ch/dimension/canton) is conclusively determined. A list of all Defined Term Sets in LINDAS can be created by the following
<a href="https://ld.admin.ch/sparql/#query=PREFIX+schema%3A+%3Chttp%3A%2F%2Fschema.org%2F%3E%0APREFIX+rdf%3A+%3Chttp%3A%2F%2Fwww.w3.org%2F1999%2F02%2F22-rdf-syntax-ns%23%3E%0APREFIX+rdfs%3A+%3Chttp%3A%2F%2Fwww.w3.org%2F2000%2F01%2Frdf-schema%23%3E%0ASELECT+*+WHERE+%7B%0A%09%3FDefinedTermSet+a+schema%3ADefinedTermSet.%0A++%09FILTER(regex(str(%3FDefinedTermSet)%2C+%22admin.ch%22+)+)%0A%7D&contentTypeConstruct=text%2Fturtle&contentTypeSelect=application%2Fsparql-results%2Bjson&endpoint=https%3A%2F%2Fld.admin.ch%2Fquery&requestMethod=POST&tabTitle=Query+2&headers=%7B%7D&outputFormat=table" target="_blank">SPARQL Query</a>. Please be aware, that the links from the Defined Term Set to the Defined Terms via [schema:hasDefinedTerm](https://schema.org/hasDefinedTerm) ist not always set, but the link in the opposite direction from the Defined Term to the Defined Term Set via [schema:inDefinedTermSet](https://schema.org/inDefinedTermSet) is always present.

### Dereferencing
Query on the URI of the namespace to collect the data. (e.g. https://ld.admin.ch/canton/23). Different formats (serializations of the rdf model) can be requested through content-negotiation (by setting a specific HTTP Request Header asking specific format, e.g. RDF/XML, JSON-LD, Turtle in the ).

## I

### IRI

## L

### Literal

## N

### Named Graph
A _Named Graph_ is an additional URI which is not part of a Triple. It is the fourth, additional part which makes out of a Triple a Quad.

The _Named Graph_ is normally used for data management purposes, e.g. to replace all triples in a named graph, or delete all information from one source.

Sometimes a _Named Graph_ is also compared to a file which include the Triples. Altough a Triplestore does manage Named Graphs not as files.

### Namespace


## O

### Object

### Ontology

## P

### Predicate

## Q

### Querying
Query in SPARQL Language to the database endpoint (e.g. https://lindas.admin.ch/query)

## S

### Shared Dimension

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

See [_IRI_](/technology/glossary/#iri).
