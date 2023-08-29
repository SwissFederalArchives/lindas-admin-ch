# Guidelines on various concepts

One goal of Linked Data is the **reuse** of existing data (**once-only principle**). This is intended to ensure, for example, that not every authority has to record central data from scratch (e.g. information on cantons, municipalities, departments, time data, etc.). To simplify reuse, data is enriched with metadata so that it is as easy as possible to understand and use the actual data.

In the following, different Linked Data concepts are described, which mainly serve the reusability of data. The individual concepts are not always completely separable.

## Ontologies

Ontologies typically describe a class hierarchy of resources and the vocabulary needed for it. Furthermore, ontologies can be used to define very comprehensive specifications and prerequisites for certain classes and the relationships between different classes. Ontologies are technically defined via [RDFS](https://www.w3.org/TR/rdf-schema/) and [OWL](https://www.w3.org/TR/owl2-overview/) and also allow the inferencing of new knowledge from existing knowledge.

Instead of ontology sometimes *schema* is used. There is no clear demarcation between these terms. Sometimes they are used in a way that schemas rather describe simpler class hierarchies (i.e. what is possible with RDFS) and ontologies those systems that allow the representation of complex relationships and the inferencing of knowledge (i.e. what OWL is used for). In the case of LINDAS, ontology and schema are understood to be equivalent.

### schema.ld.admin.ch

At the federal administration level, ontologies are developed and made available at https://schema.ld.admin.ch. This is an ongoing process in which participation is explicitly desired. The tool used at https://schema.ld.admin.ch allows to suggest and comment on elements of the ontology. Elements at https://schema.ld.admin.ch are thus very specific to the concerns of (federal) administration. Anything more general and generic is handled in other ontologies, e.g., at https://schema.org.

### schema.org

This initiative at https://schema.org is also collaborative and provides a very general, cross-domain ontology to describe everyday things. schema.org is widely used and is a good first stop to find appropriate classes and vocabulary.

### SKOS

The *Simple Knowledge Organization System* (SKOS) ontology provides a model for representing the basic structure and content of concept schemas such as thesauri, classification schemas, keyword lists, taxonomies, folksonomies, and other similar types of controlled vocabularies, and is often used to describe specific concepts as Linked Data. Here is an [introduction to SKOS](https://www.w3.org/TR/skos-primer/).

## Controlled Vocabularies

Controlled Vocabularies summarize certain facts or objects without trying to put them into a big context. These are often lists of similar elements. For example, terms of use for open data (https://ld.admin.ch/vocabulary/TermsOfUse) or legal forms of companies (https://ld.admin.ch/ech/97/legalforms). These lists often claim to be complete. Thus, for example, all federal agencies should be represented in such a list at a certain point in time and not just a selection. The Controlled Vocabularies are to ensure thereby that all data describe a certain circumstance in the same way.

Terms that have once been defined within a Controlled Vocabulary will not be deleted. If they are no longer to be used, they can be designated as 'deprecated'.

Controlled Vocabularies are often modeled as a class [schema:DefinedTermSet](https://schema.org/DefinedTermSet) and the individual terms within it as [schema:DefinedTerm](https://schema.org/DefinedTerm). Another option is to use [skos:Concept](http://www.w3.org/2004/02/skos/core#Concept).

The idea of Controlled Voacabularies does not actually correspond to the basic principles of Linked Data. In principle, one could simply assign a particular class to the corresponding elements of the list and querying for all members of that class would return the list. However, the formulation as [schema:DefinedTerm](https://schema.org/DefinedTerm) also has the advantage of being easy to dereference.

## Core Entities

Core Entities are a special case of Controlled Vocabularies. The specific thing about core entities is the (presumably) very frequent reuse of such entities and the possibility to link very different data via a core entity (all data for a canton or all events that happened during a certain quarter or all tasks for which a certain federal office is responsible). For more information see [here](/governance/core-entities/).

## Registers

Registers in the LINDAS ecosystem are existing databases that have been transformed into Linked Data and would otherwise typically be available as tabular CSV data. Register data is therefore always processed in an automated way. It is important that these registers are linked to the corresponding central entities. For this purpose, the registers typically create their own IRIs of the central entities, but they are linked accordingly. One reason for this is that the central entities should remain manageable and not be "flooded" with very specific information. Registry data can always be found under the domain https://register.ld.admin.ch.

Example with a canton: The central entity for the canton of Fribourg can be found under https://ld.admin.ch/canton/10. However, there is only little information there. The information about the geographic borders, i.e. the GIS data, is based on another IRI, namely https://geo.ld.admin.ch/boundaries/canton/10 and if you want to know something about the development of the canton, you will find it at https://register.ld.admin.ch/agvch/canton/10. However, these data are all linked via the central entity.

## Shared Dimensions

Shared Dimensions are a term from the Cube Creator and refer to Controlled Vocabularies or Core Entities that are needed to transform CSV data into Linked Data. So, for example, the cantons or certain categories in the timber industry, etc.

## Evolution of the individual concepts

| Concept | Frequency of change | Consensus | Comments |
|-------------------------|----------------------------|------------------------------------------------|----------------------------------------------|
| Ontology | Few changes per year | Broad consensus needed |
| Controlled Vocabularies | Few changes per year | Consensus of users needed | Existing terms must not be deleted |
| Core Entities | Few changes per year | Data are defined on a superordinate level | Existing terms must not be deleted |
| Registers | Daily changes | Data defined by data owner alone | Automated processing needed |