# Linked Data

Linked Data has several facets. In short, it is the combination of a **specific idea** with a **collection of concrete technologies**. These pages are not intended to provide an all-encompassing introduction to the topic, but rather to pick out a few important aspects and refer to appropriate [resources](/know-how/resources/).

## Idea of Linked Data

The idea of Linked Data includes several aspects:

* **worldwide unique identifiers** for data points (resources).
* description of information in the form of **triples**
* metadata is exactly as important as the data, thus creating **Semantic Data**
* data can be **linked** across different databases

## Technology

* [**RDF**](https://www.w3.org/TR/rdf11-primer/) is used as the basic technology, which allows the description of data in the form of triples
* for the unique identifiers the **IRI** mechanism is used
* for the storage of Linked Data **graph databases** (also called triple stores) are used
* with the help of the query language [**SPARQL**](https://www.w3.org/TR/sparql11-query/) the data from the database can be queried and processed
* thanks to the ontology language [**OWL**](https://www.w3.org/TR/owl2-overview/) new insights can be derived from existing data

## Advantages for Data Providers

* Linked Data requires the data provider to have a clear idea of their own data. Only those who know exactly what the data means can clearly formulate this as metadata. Linked Data can help to develop such a clear idea.
* Linked Data can help to develop a clear and unambiguous strategy for identifying data points using IRI.
* Linked Data pays off in the long run because data and data models are not optimized for individual applications, but are created as clear, self-describing raw data that can be more easily transformed into different structures.
* Linked Data requires the data provider to see/collaborate beyond their own organization, resulting in better quality data overall.

## Advantages for Data Consumers

* Linked Data and SPARQL provide a very universal mechanism to work with data.
* Knowledge gained around Linked Data and SPARQL for a specific dataset is much easier to transfer to other datasets in Linked Data.

## Linked Data Compared to

### CSV

CSV data are tabular data. Linked Data is graph data, which is a more universal data format. Linked Data can be used to represent tabular data (RDF Cube), but it is also possible to represent complicated network-like data structures cleanly and efficiently.

Additionally, with CSV data, it is not possible to say anything about the data within the data. It is not possible to specify within the CSV what the table contains, which columns occur and what these exactly describe or of which data type the contents are.

### REST API

A REST API makes data available that is not primarily intended to be used by humans directly, but is further processed and prepared by machines. In this sense, Linked Data provides similar capabilities using SPARQL endpoints.

While data from a REST API typically requires some interpretation or additional documentation via other channels, Linked Data metadata can be obtained directly with the data. Furthermore, SPARQL as a query language also allows the data to be further processed (especially grouping) even before it is output.

## Obstacles for Data Providers

Data providers who want to publish their data as Linked Data (as opposed to, for example, CSV) have several challenges to overcome:

* Knowledge around Linked Data is less prevalent in developer circles compared to "classic" technologies such as relational databases and SQL.
* Linked Data requires a functioning data management and an established data governance, which is often associated with large upfront investments, but which typically pay off in the long run.
* Linked Data in the sense of linking requires breaking a "silo mentality", which can be culturally and organizationally challenging.

## Barriers for Data Consumers

* Accessing Linked Data via SPARQL queries presents an initial hurdle that is relatively high.
* If Linked Data are used via dereferencing through HTML pages, they often provide unclear information and do not invite explorative further clicking.
* Good search functions via full text search for graph databases do not exist everywhere.