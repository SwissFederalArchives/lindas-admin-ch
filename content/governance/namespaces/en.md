# Namespaces at the Swiss Confederation

In the Linked Data World, the use of [namespaces](/technology/glossary/#namespace) help to organize the identifiers of [subjects](/technology/glossary/) (data points) and [predicates](/technology/glossary/) (the attributes). A well defined and organized common namespace for all public and also internal data on the level of the Swiss Confederation brings a variety of advantages:

* A well constructed namespace results in stable and reliable IRI.
* Stable IRI are important for reuse of the data in other projects and applications.
* A well and logical organised namespace leads to the data being self-descriptive via namespace. This results in a reduced need for external documentation to discover the data.
* A common contract on status and availability of data in certain namespaces can be defined and communicated.

## ld.admin.ch

The [Standard I003 - Chapter 2.3.2](https://www.bk.admin.ch/bk/de/home/digitale-transformation-ikt-lenkung/ikt-vorgaben/standards/i003-domain_name_system_dns.html) defines `ld.admin.ch` as the namespace for all Linked Data publications of the Swiss Confederation.

## Anatomy of a Namespace

<pre>
         Authority
       ┌───┴──────────────────┐
https://environment.ld.admin.ch/level1/level2/level3
└─┬─┘  └───┬─────────┘ └─┬────┘ └─┬────────────────┘
Protocol  Sub-Domains   Domain   Path
</pre>

A namespace encompasses the sub-domains, domain and path. Usually the sub-domains and domains are defined by a common scheme, occasionally also the first levels of the path can be defined.

## Overview
```
            ld.admin.ch -> Shared Core Entities for the Swiss Confederation
            ld.admin.ch/vocabulary/ -> Controlled Vocabularies shared for the Swiss Confederation
     schema.ld.admin.ch -> Ontology specific to the Swiss Confederation
   register.ld.admin.ch -> Registers published through the Swiss Confederation

agriculture.ld.admin.ch/ -> Core entities for agriculture
agriculture.ld.admin.ch/<name>/ -> Content, Datasets
agriculture.ld.admin.ch/vocabulary/ -> Controlled Vocabularies for agriculture

    finance.ld.admin.ch -> dito
     energy.ld.admin.ch -> dito
environment.ld.admin.ch -> dito
    culture.ld.admin.ch -> dito
        geo.ld.admin.ch -> dito
        law.ld.admin.ch -> dito
```

A new thematic sub-domain can be demanded by the [Federal Chancellery](https://ld.admin.ch/FCh) as described in [Standard I003 - Chapter 2.3.2](https://www.bk.admin.ch/bk/de/home/digitale-transformation-ikt-lenkung/ikt-vorgaben/standards/i003-domain_name_system_dns.html).
