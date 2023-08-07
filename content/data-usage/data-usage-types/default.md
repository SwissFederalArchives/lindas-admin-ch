# Data Usage Types

There are different ways of using LINDAS data and working with them.

## Follow your Nose Approach

LINDAS has a so-called **dereferencing**. With the help of a special [web server](https://zazuko.com/products/trifid/), when a URI of a LINDAS resource is called via a web browser, a dynamic website is created that contains a textual representation of all triples with the called resource on the subject position. This website can be used as a starting position to browse through the RDF graph as all the URIs of the shown triples will be dereferenced as well by clicking on the links. Hence the name "follow your nose approach".

This approach works better, if the data structure of the triples in question is already known. An example for such a dereferenced web page would be https://ld.admin.ch/canton/21 which is the URI of the canton Ticino, by clicking on this link, the Trifid web server will create a HTML representation that has e.g. the municipalities of the canton Ticino via `schema:containsPlace`, like the municipality Centovalli (https://ld.admin.ch/municipality/5397).

## SPARQL Interface

The [SPARQL Interface of LINDAS](/sparql) allows to write SPARQL queries directly in the webbrowser in a slightly assisted way. These queries can be directly sent to the SPARQL endpoint of LINDAS and the result will be shown in the web browser as well. These results can be downloaded as a CSV file. The technical product used for this SPARQL interface is [YASGUI](https://triply.cc/docs/yasgui-api/).

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

The following code snippet sends a SPARQL query to the LINDAS SPARQL API with the help of JavaScript after pressing the button "Go!". The resulting answer will be printed (unformatted) into the browser window:

```javascript
<!DOCTYPE html>
<html>
<body>
    <script>
        async function getData(queryString) {

            const response = await fetch("https://ld.admin.ch/query", {
                method: 'POST',
                headers: {
                    'Accept': 'text/csv',
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
                body: new URLSearchParams({
                    query: queryString
                })
            });
                const data = await response.text();
                    document.write(data);
        }

    </script>
    <button onclick="getData('SELECT * WHERE {?canton a <https://schema.ld.admin.ch/Canton>}')">Go!</button>
</body>
</html>
```
