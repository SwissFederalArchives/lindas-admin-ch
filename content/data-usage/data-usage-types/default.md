# Data Usage Types

There are different ways of using LINDAS data and working with them.

## Follow your Nose Approach

LINDAS has a so-called **dereferencing**. With the help of a special [web server](https://zazuko.com/products/trifid/), when a URI of a LINDAS resource is called via a web browser, a dynamic website is created that contains a textual representation of all triples with the called resource on the subject position. This website can be used as a starting position to browse through the RDF graph as all the URIs of the shown triples will be dereferenced as well by clicking on the links. Hence the name "follow your nose approach".

This approach works better, if the data structure of the triples in question is already known. An example for such a dereferenced web page would be https://ld.admin.ch/canton/21 which is the URI of the canton Ticino, by clicking on this link, the Trifid web server will create a HTML representation that has e.g. the municipalities of the canton Ticino via `schema:containsPlace`, like the municipality Centovalli (https://ld.admin.ch/municipality/5397).

## SPARQL Interface

The [SPARQL Interface of LINDAS](/sparql) allows to write SPARQL queries directly in the webbrowser in a slightly assisted way. These queries can be directly sent to the SPARQL endpoint of LINDAS and the result will be shown in the web browser as well. These results can be downloaded as a CSV file. The technical product used for this SPARQL interface is [YASGUI](https://triply.cc/docs/yasgui-api/).

## Full Text Search

The Stardog Triplestore used by LINDAS allows full text search via SPARQL. Details can be found in the [Stardog documentation](https://docs.stardog.com/query-stardog/full-text-search#integration-with-sparql). Here is a [sample full text search](<https://ld.admin.ch/sparql/#query=SELECT%20DISTINCT%20%3Fs%20%3Fp%20%3Fl%0AWHERE%20%7B%0A%20%20%3Fs%20%3Fp%20%3Fl.%0A%20%20(%3Fl%20%3Fscore)%20%3Ctag%3Astardog%3Aapi%3Aproperty%3AtextMatch%3E%20'Fraum%C3%BCnster'.%20%0A%7D%0A&endpoint=https%3A%2F%2Fld.admin.ch%2Fquery&requestMethod=POST&tabTitle=Query%205&headers=%7B%7D&contentTypeConstruct=text%2Fturtle&contentTypeSelect=application%2Fsparql-results%2Bjson&outputFormat=table>), which searches for occurrences of the term 'Fraumünster' in all literals.

## SPARQL API

If there is a need to further process LINDAS data programmatically, the best way to do so, is to call the data via the SPARQL API (also called SPARQL endpoint). For this, a standard HTML POST request can be sent to the SPARQL API that contains the SPARQL query and some header information. The resulting answer can then be processed further.

Every major programming language has the possibility to create HTML POST requests, and in some languages, there even exist special extensions to make it easier to work with SPARQL endpoints.

### Python

The following code snippet sends a SPARQL query to the LINDAS SPARQL API with the help of the [Python programming language](https://www.python.org/). The resulting answer will be transformed into a pandas dataframe:

```python
import requests
import pandas as pd
import io

def query(sparql_string):

    resp = requests.post("https://ld.admin.ch/query",
        data = "query=" + sparql_string,
        headers = {
            "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
            "Accept": "text/csv"
        }
    )

    resp.encoding = "utf-8"

    return pd.read_csv(io.StringIO(resp.text))


sparql_string = """

SELECT * WHERE {
  ?canton a <https://schema.ld.admin.ch/Canton>.
}

"""

df = query(sparql_string)
```

A very important python package to work with RDF data is [rdflib](https://rdflib.readthedocs.io/en/stable/).

### R

The following code snippet sends a SPARQL query to the LINDAS SPARQL API with the help of the [R programming language](https://www.r-project.org/). The resulting answer will be transformed into a dataframe:

```r
library(httr)

sparql_string <- "

SELECT * WHERE {
  ?canton a <https://schema.ld.admin.ch/Canton>.
}

"

query <- POST("https://ld.admin.ch/query",
              add_headers("Accept" = "text/csv"),
              content_type("application/x-www-form-urlencoded; charset=UTF-8"),
              body = paste("query=", sparql_string, sep = ""))

df <- content(query, encoding = "UTF-8")
```

### JavaScript

The following code snippet sends a SPARQL query to the LINDAS SPARQL API with the help of JavaScript after pressing the button "Go!".
The resulting answer will be printed (unformatted) into the browser window:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Example</title>
  </head>
  <body>
    <script>
      const getData = async (queryString) => {
        const response = await fetch("https://ld.admin.ch/query", {
          method: "POST",
          headers: {
            Accept: "text/csv",
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          },
          body: new URLSearchParams({
            query: queryString,
          }),
        });
        const data = await response.text();
        document.write(data);
      };
    </script>
    <button
      onclick="getData('SELECT * WHERE {?canton a <https://schema.ld.admin.ch/Canton>}')"
    >
      Go!
    </button>
  </body>
</html>
```

### Curl to CSV (and other formats)

# Database Query Documentation

Our database allows users to perform queries and receive results in a CSV format.
This feature is particularly useful for automating queries and integrating data retrieval into various applications.

## How to Use URL Encoding for Queries

To obtain a CSV file of your query results, you need to urlencode your query and include specific parameters in your request URL.
The format parameter should be set to `csv` to specify that the output should be in CSV format.

## What other file parameters can be used?

Supported values for the format query parameter:

| Format | MIME type             |
| ------ | --------------------- |
| ttl    | text/turtle           |
| nt     | application/n-triples |
| xml    | application/rdf+xml   |
| jsonld | application/ld+json   |
| csv    | text/csv              |

## Example Usage

Below is an example of how to use the `curl` command to perform a query and receive the results as a CSV file.
This example demonstrates how to use URL encoding to include the query in the request:

```sh
curl -vvv https://ld.admin.ch/query?format=csv&query=PREFIX%20rdf%3A%20%3Chttp%3A%2F%2Fwww.w3.org%2F1999%2F02%2F22-rdf-syntax-ns%23%3E%0APREFIX%20rdfs%3A%20%3Chttp%3A%2F%2Fwww.w3.org%2F2000%2F01%2Frdf-schema%23%3E%0ASELECT%20%2A%20WHERE%20%7B%0A%20%20%3Fsub%20%3Fpred%20%3Fobj%20.%0A%7D%20LIMIT%2010
```

## Explanation of the Example

- **URL**: The base URL for the query is `https://ld.admin.ch/query`.
- **Parameters**:
  - `format=csv`: This parameter specifies that the query results should be returned in CSV format.
  - `query`: This parameter contains the URL-encoded SPARQL query. In this example, the query selects all triples (`?sub ?pred ?obj`) in the dataset, limiting the results to 10 entries.
