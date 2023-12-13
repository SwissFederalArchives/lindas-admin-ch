# lindas.admin.ch-site

This provides a server for the domain [lindas.admin.ch](https://lindas.admin.ch) and also [ld.admin.ch](https://ld.admin.ch).

## Purpose

- Website of lindas.admin.ch
- Dereferencing of `https://lindas.admin.ch/*` and `https://ld.admin.ch/*`

## Local deployment

You need to have [Docker](https://docker.com/) installed.

```sh
docker build -t lindas-admin-ch .
docker run --rm -p 8080:8080 lindas-admin-ch
```

## Anatonomy of Website

### Simple changes

Simple changes can be done through clicking on the (c) symbol on the bottom of the page, followed by mergin them on the subsequent web page.

### Web pages are defined through

The web pages are in [./views](/views) defined with and need to be referenced themselfs in the Routing below. Best is to copy a basic site (e.g. [publish.html](/views/publish.html)) to start a new web page.

The web pages themself do refer in the code for the content to the multilingual versions of Markdown formated files in [./content](/content). (It is important to use the same name for the _.html and _.md similar that the link from (c) works.)

The paths and the menu is specified in [./config.json](config.json):

- Routing: `staticViews` Describes the URL paths and the files.
- Navigation: `content.navigation` Describe the menu entries, titles and URL paths. (The titles are translated in [/locales](/locales/) with the key `navigation` prefixed.)

### Word based translations

All other non-page wide translations are done through the files in [/locales](/locales/)

## Deployment

There are three different environments:

- test (TEST),
- integration (INT),
- production (PROD).

CI is configured for two branches: `main` and `develop`.
The idea is to always deploy on INT before PROD.
Everything that is on `develop` is deployed on TEST.
If something needs to be deployed quickly on PROD, there is no need to go through TEST first ; INT -> PROD is enough for such situations.

### Test

Every commit to `develop` branch creates a new `test_<date_time>` container image.
The [gitops-main](https://gitlab.ldbar.ch/vshn/gitops-main) detects new images and deploys them automatically to https://test.lindas.admin.ch.

### Integration

Every commit to `main` branch creates a new `int_<date_time>` container image.
The [gitops-main](https://gitlab.ldbar.ch/vshn/gitops-main) detects new images and deploys them automatically to https://int.lindas.admin.ch.

### Production

To push the current version that is deployed on integration to production:

- Go to the [Actions](https://github.com/SwissFederalArchives/lindas-admin-ch/actions) tab.
- On the left, select the [`CI Workflow`](https://github.com/SwissFederalArchives/lindas-admin-ch/actions/workflows/ci.yaml) workflow.
- You will see a table of all past runs of that workflow. On the first line, there is a select called `Run workflow`. Click on it, make sure `main` is the selected branch, and click the `Run workflow` button.
