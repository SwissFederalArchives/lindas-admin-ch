# The LINDAS Ecosystem

LINDAS is an overall system for working with Linked Data over the entire lifecycle consisting of data conversion, data storage and data usage.

![Overall system LINDAS](/static-assets/img/architecture-DE.jpg)

## Linked Data Triplestores of the Federal Administration

A central element for the work with Linked Data is a triplestore (graph database), which stores the Linked Data and makes it accessible for further use by means of SPARQL queries. Within the federal administration, there are currently three different such triplestores. The central one is LINDAS as a generic and topic-independent store for the entire federal administration. Historically, there are two additional triplestores from Swisstopo and the Federal Chancellery.

| Name | URL | SPARQL Endpoint | SPARQL Interface | Technical Product |
|---------------|------------------------------|---------------------------------------------|-------------------------------------------|----------------------------------------------------------|
| LINDAS | https://ld.admin.ch | https://ld.admin.ch/query | https://ld.admin.ch/sparql | [Stardog](https://www.stardog.com/platform/) |
| Swisstopo | https://geo.ld.admin.ch | https://geo.ld.admin.ch/query | https://geo.ld.admin.ch/sparql | [Fuseki](https://jena.apache.org/documentation/fuseki2/) |
| Federal Chancellery | https://fedlex.data.admin.ch | https://fedlex.data.admin.ch/sparqlendpoint | https://fedlex.data.admin.ch/de-CH/sparql | [Virtuoso](https://virtuoso.openlinksw.com/) |

## Cube Creator for data conversion

In order to integrate tabular data into LINDAS with as little effort as possible, the [Cube Creator](https://cube-creator.lindas.admin.ch/) was developed. This allows tabular data to be enriched with meta data to create [Cubes](https://cube.link) that can be published on LINDAS. For the Cube Creator a [CH-LOGIN](https://www.eiam.admin.ch) is required, which has to be unlocked for the Cube Creator via [support.lindas@bar.admin.ch](mailto:support.lindas@bar.admin.ch).

## GitLab

The Bundesarchiv runs its own [GitLab](https://gitlab.ldbar.ch/), which is used on the one hand to store data for LINDAS using CI/CD pipelines in the LINDAS Triplestore. On the other hand, this Gitlab is also used for issue management of the various datasets.

## Graph Explorer

With the help of the [Graph Explorer](https://lindas.admin.ch/graph-explorer/) the data from LINDAS and especially their links to other data can be explored and visualized graphically.

![Graph Explorer](/static-assets/img/graph-explorer.jpg)

## visualize.admin.ch

The visualization software [visualize.admin.ch](https://visualize.admin.ch) allows to visualize transformed data in a few steps with the help of the Cube Creator. This tool can also be used by interested users without in-depth knowledge.

![Visualize](/static-assets/img/visualize.jpg)