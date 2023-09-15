# L'écosystème LINDAS

LINDAS est un système global pour travailler avec des données liées tout au long de leur cycle de vie, comprenant la conversion, le stockage et l'utilisation des données.

![Système global LINDAS](/static-assets/img/architecture-DE.jpg)

## Linked Data Triplestores de l'administration fédérale

Un élément central pour le travail avec les Linked Data est un triplestore (base de données de graphes) qui stocke les Linked Data et les rend accessibles pour une utilisation ultérieure à l'aide de requêtes SPARQL. Il existe actuellement trois triplestores différents au sein de l'administration fédérale. Le plus important est LINDAS, qui est un entrepôt générique et indépendant des thèmes pour l'ensemble de l'administration fédérale. Historiquement, il existe en outre deux autres Triplestores de Swisstopo et de la Chancellerie fédérale.

 Nom          | URL                          | SPARQL Endpoint                              | SPARQL Interface                           | Produit technique                                      |
|---------------|------------------------------|---------------------------------------------|-------------------------------------------|----------------------------------------------------------|
| LINDAS        | https://ld.admin.ch          | https://ld.admin.ch/query                   | https://ld.admin.ch/sparql                | [Stardog](https://www.stardog.com/platform/)             |
| Swisstopo     | https://geo.ld.admin.ch      | https://geo.ld.admin.ch/query               | https://geo.ld.admin.ch/sparql            | [Fuseki](https://jena.apache.org/documentation/fuseki2/) |
| Chancellerie fédérale | https://fedlex.data.admin.ch | https://fedlex.data.admin.ch/sparqlendpoint | https://fedlex.data.admin.ch/de-CH/sparql | [Virtuoso](https://virtuoso.openlinksw.com/)

## Cube Creator pour la conversion des données

Afin de réaliser l'intégration de données tabulaires dans LINDAS avec le moins d'effort possible, le [Cube Creator](https://cube-creator.lindas.admin.ch/) a été développé. Il permet d'enrichir les données tabulaires avec des métadonnées afin de créer des [Cubes](https://cube.link) qui peuvent être publiés sur LINDAS. Pour le Cube Creator, un [CH-LOGIN](https://www.eiam.admin.ch) est nécessaire, qui doit être activé pour le Cube Creator via [support.lindas@bar.admin.ch](mailto:support.lindas@bar.admin.ch).

## GitLab

Les Archives fédérales exploitent leur propre [GitLab](https://gitlab.ldbar.ch/), qui sert d'une part à enregistrer les données pour LINDAS à l'aide de pipelines CI/CD dans le LINDAS Triplestore. D'autre part, ce Gitlab est également utilisé pour la gestion des issues des différents jeux de données.

## Graph Explorer

A l'aide de [Graph Explorer](https://lindas.admin.ch/graph-explorer/), les données de LINDAS et en particulier leurs liens avec d'autres données peuvent être explorées et visualisées graphiquement.

![Graph Explorer](/static-assets/img/graph-explorer.jpg)

## visualize.admin.ch

Le logiciel de visualisation [visualize.admin.ch](https://visualize.admin.ch) permet de visualiser clairement des données transformées en quelques étapes à l'aide du Cube Creator. Cet outil est également utilisable par des utilisateurs intéressés sans connaissances approfondies.

![Visualize](/static-assets/img/visualize.jpg)