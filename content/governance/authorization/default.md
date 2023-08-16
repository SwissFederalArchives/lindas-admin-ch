# Data Access Management

The data in LINDAS is organized and structured using various [namespaces](/governance/namespaces). Access control to the data is based on named graphs in combination with usernames.

## LINDAS Named Graph Conventions

Named graphs in LINDAS are used exclusively for data management and authorization concepts. Named graphs may not be used for version management or at the application level. 

All named graphs are located at `https://lindas.admin.ch/*`, regardless of namespace or organization.

Named graphs have the structure `https://lindas.admin.ch/<orga>/<dataset>`. (e.g. https://lindas.admin.ch/nl/isil)

* `<orga>` is the English [termdat](https://www.termdat.bk.admin.ch/) abbreviation of the organization.
* `<dataset>` is the name of the dataset as chosen by the respective project

## LINDAS Username Conventions

Usernames should be structured according to the following scheme wherever possible: `lindas-<orga>-<dataset>` or `lindas-<orga>-<application>` (e.g. lindas-nl-isil)

* `<orga>` is to be used according to the named graph conventions
* `<dataset>` is to be used according to the named graph convention if it is a dataset that is written manually or pipelined
* `<application>` is the name of the application, if an application writes the data
  