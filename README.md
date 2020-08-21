# lindas.admin.ch-site

This provides a server for the domain [lindas.admin.ch](https://lindas.admin.ch) and also [ld.admin.ch](https://ld.admin.ch).

## Purpose
* Website of lindas.admin.ch
* Dereferencing of https://lindas.admin.ch/* and https://ld.admin.ch/*


## Local deployment
You need to have [docker](https://docker.com/) installed.

    docker build -t lindas-admin-ch .
    docker run --rm -p 8080:8080 lindas-admin-ch


## Anatonomy of Website

### Simple changes
Simple changes can be done through clicking on the (c) symbol on the bottom of the page, followed by mergin them on the subsequent web page.

### Web pages are defined through

The web pages are in [./views](/views) defined with and need to be referenced themselfs in the Routing below. Best is to copy a basic site (e.g. [publish.html](/views/publish.html)) to start a new web page.

The web pages themself do refer in the code for the content to the multilingual versions of Markdown formated files in [./content](/content). (It is important to use the same name for the *.html and *.md similar that the link from (c) works.)
)

The paths and the menu is specified in [./config.json](config.json):
  * Routing: `staticViews` Describes the URL paths and the files.
  * Navigation: `content.navigation` Describe the menu entries, titles and URL paths. (The titles are translated in [/locales](/locales/) with the key `navigation` prefixed.)

### Word based translations
All other non-page wide translations are done through the files in [/locales](/locales/)

## Deployment

### Test
Every commit to master creates a new `test_<date_time>` container image in the project [gitlab registry](https://gitlab.ldbar.ch/zazuko/lindas-admin-ch/container_registry/). The [gitops-prod](https://gitlab.ldbar.ch/vshn/gitops-prod) detects new images and deploys them automatically to https://test.lindas.admin.ch.

### Production
To push the current version to production and integration:
* Go to [CI/CD -> Pipelines -> Run Pipeline](https://gitlab.ldbar.ch/zazuko/lindas-admin-ch/-/pipelines/new).
* Add the variable `TARGET` with the value `prod`. 
* Hit "Run Pipeline".

