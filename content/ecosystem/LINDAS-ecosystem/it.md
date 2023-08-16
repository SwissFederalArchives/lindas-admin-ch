# L'ecosistema LINDAS

LINDAS è un sistema completo per lavorare con i Linked Data durante l'intero ciclo di vita che comprende la conversione dei dati, l'archiviazione e l'utilizzo dei dati.

![Sistema complessivo LINDAS](/static-assets/img/architecture-DE.jpg)

## Triplestore di Linked Data dell'Amministrazione Federale

Un elemento centrale per lavorare con i Linked Data è un triplestore (database a grafo), che memorizza i Linked Data e li rende accessibili per ulteriori usi con l'aiuto di query SPARQL. Attualmente esistono tre diversi triplestore di questo tipo all'interno dell'Amministrazione federale. Quello centrale è LINDAS, un archivio generico e indipendente dagli argomenti per l'intera amministrazione federale. Storicamente, esistono anche altri due triplestore di Swisstopo e della Cancelleria federale.

Nome | URL | Query Endpoint | SPARQL Endpoint | Prodotto tecnico |
|---------------|------------------------------|---------------------------------------------|-------------------------------------------|----------------------------------------------------------|
| LINDAS        | https://ld.admin.ch          | https://ld.admin.ch/query                   | https://ld.admin.ch/sparql                | [Stardog](https://www.stardog.com/platform/)             |
| Swisstopo     | https://geo.ld.admin.ch      | https://geo.ld.admin.ch/query               | https://geo.ld.admin.ch/sparql            | [Fuseki](https://jena.apache.org/documentation/fuseki2/) |
| Cancelleria federale | https://fedlex.data.admin.ch | https://fedlex.data.admin.ch/sparqlendpoint | https://fedlex.data.admin.ch/de-CH/sparql | [Virtuoso](https://virtuoso.openlinksw.com/)             |

## Creatore di cubi per la conversione dei dati
Per integrare i dati tabulari in LINDAS con il minor sforzo possibile, è stato sviluppato il [Cube Creator](https://cube-creator.lindas.admin.ch/). Questo permette di arricchire i dati tabulari con meta-dati per creare [cubi](https://cube.link) che possono essere pubblicati su LINDAS. Il Cube Creator richiede un [CH-LOGIN](https://www.eiam.admin.ch), che deve essere attivato per il Cube Creator tramite [support.lindas@bar.admin.ch](mailto:support.lindas@bar.admin.ch).
## GitLab
L'Archivio federale gestisce un proprio [GitLab](https://gitlab.ldbar.ch/), utilizzato da un lato per archiviare i dati per LINDAS utilizzando le pipeline CI/CD nel Triplestore LINDAS. Dall'altro lato, questo Gitlab è utilizzato anche per la gestione dei problemi dei vari set di dati.

## Graph Explorer

Con l'aiuto del [Graph Explorer](https://lindas.admin.ch/graph-explorer/), i dati di LINDAS e in particolare i loro collegamenti con altri dati possono essere esplorati e visualizzati graficamente.

![Graph Explorer](/static-assets/img/graph-explorer.jpg)

## visualize.admin.ch

Il software di visualizzazione [visualize.admin.ch](https://visualize.admin.ch) permette di visualizzare i dati trasformati in pochi passi con l'aiuto del Cube Creator. Questo strumento può essere utilizzato anche dagli utenti interessati senza conoscenze approfondite.

![Visualize](/static-assets/img/visualize.jpg)