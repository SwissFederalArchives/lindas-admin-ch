# Linked Data

Linked Data a plusieurs facettes. En résumé, il s'agit de la combinaison d'un **concept général** et d'un **ensemble de technologies concrètes**. Ces pages n'ont pas pour but de fournir une introduction complète au sujet, mais de mettre en évidence quelques aspects importants et de vous renvoyer vers les [bases, introductions et tutoriels](/technology/help/) correspondantes.

## L'idée de base de Linked Data

Linked Date comporte plusieurs aspects :

* **Identifiants globalement uniques** pour chaque élément de donnée (Ressource)
* Description des informations sous forme de **triplets**
* Les métadonnées sont aussi importantes que les données et constituent ainsi des **données sémantiques**
* Les données peuvent être **reliées entre elles** à travers différentes bases de données

## La technologie

* la technologie de base est **RDF**, qui permet de décrire les données sous forme de triplets
* la norme **IRI** est utilisée pour les identifiants uniques
* pour le stockage des données liées, on utilise des **bases de données de graphes** (également appelées triple stores)
* à l'aide du langage **SPARQL**, des requêtes peuvent être effectuées sur le contenu de la base de données
* Grâce à l'utilisation de l'ontologie **OWL**, de nouvelles connaissances peuvent être déduites des données existantes

# Avantages de l'utilisation de Linked Data

## Pour le fournisseur de données

* Linked Data exige du fournisseur de données une description claire de ses propres données. Seul celui qui sait exactement ce que les données signifient peut le formuler clairement sous forme de métadonnées. Linked Data est donc un moyen d'évoluer vers une meilleure documentation de ses données.
* Linked Data va aider à développer une stratégie claire et précise d'identification des données à l'aide d'IRIs.
* L'adoption de Linked Data est rentable à long terme, car les données et les modèles de données ne sont pas adaptés à des applications individuelles, mais sont construits comme des données de base claires et auto-décrites, qui peuvent être transformées si nécessaire très facilement en différentes structures.
* Linked Data exige du fournisseur de données une vision/collaboration au-delà de sa propre organisation, ce qui conduit à des données de meilleure qualité.

## Pour le consommateur de données

* Linked Data et SPARQL constituent un ensemble très universel pour travailler avec les données.
* Les connaissances acquises sur Linked Data et SPARQL pour un jeu de données spécifique peuvent être transférées à d'autres jeux de données et d'autres systèmes qui s'appuient sur Linked Data.


# Comparaison entre Linked Data et

## Les données en CSV

Les données en CSV sont des données tabulaires. Linked Data structure des données sous forme de graphe, ce qui constitue un format de données plus universel. Même si Linked Data permet de représenter des données tabulaires (RDF cube ), il permet également de représenter de manière propre et cohérente des structures de données complexes de nature réticulaire.

De plus, avec des données en CSV, il n'est pas possible de fournir des informations sur les données à l'intérieur des données. Ainsi il n'est pas possible d'indiquer à l'intérieur d'un CSV ce que contient la table, quelles sont les colonnes et ce qu'elles décrivent exactement ou de quels types de données est constitué le contenu.

## Les API REST

Une API REST met à disposition des données qui ne sont pas destinées en premier lieu à une utilisation par des personnes, mais à être transformées et traitées par des machines. En ce sens, Linked Data offre des possibilités similaires grâce aux points d'accès SPARQL.

Alors que les données provenant d'une API REST nécessitent généralement une certaine interprétation ou une documentation supplémentaire via d'autres canaux, les métadonnées des Linked Data peuvent être obtenues directement avec les données. De plus, en tant que langage d'interrogation, SPARQL permet de transformer le résultat avant sa transmission (en particulier le regroupement de résultats partiels).


# Obstacles à l'utilisation de Linked Data

## Pour le fournisseur de données

La publication de données en tant que Linked Data (par opposition à CSV, par exemple) doit relever les défis suivants :

* Les connaissances sur Linked Data sont moins répandues parmi les développeurs qu'en ce qui concerne les technologies "classiques" telles que les bases de données relationnelles et SQL.
* Linked Data requiert une gestion des données et une gouvernance des données bien établies, ce qui implique souvent des investissements préalables importants, mais qui sont généralement rentables à long terme.
* Linked Data, dans son potentiel à construire des liens entre divers jeux de données, nécessitent de briser une "mentalité de silo", ce qui peut représenter un défi culturel et organisationnel.

## Pour le consommateur de données

* L'accès à des données en Linked Data via des requêtes SPARQL représente un obstacle initial relativement élevé.
* Si le déréférencement de Linked Data sur des pages HTML est mis en oeuvre, celles-ci fournissent souvent des informations peu claires et n'invitent pas à poursuivre l'exploration.
* Il n'existe pas partout de bonnes fonctions de recherche en plein texte pour les bases de données de graphes.


