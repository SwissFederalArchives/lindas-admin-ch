# Data Usage Types

There are different ways of using LINDAS data and working with them.

## Follow your Nose Approach

LINDAS has a so-called dereferencing. With the help of a special [web server](https://zazuko.com/products/trifid/), when a URI of a LINDAS resource is called via a web browser, a dynamic website is created that contains a textual representation of all triples with the called resource on the subject position. This website can be used as a starting position to browse through the RDF graph as all the URIs of the shown triples will be dereferenced as well by clicking on the links. Hence the name "follow your nose approach".

This approach works better, if the data structure of the triples in question is already known.

## SPARQL Interface

The [SPARQL Interface of LINDAS](/sparql) allows to write SPARQL queries directly in the webbrowser in a slightly assisted way. These queries can be directly sent to the SPARQL endpoint of LINDAS and the result will be shown in the webbrowser as well. These results can be downloaded as CSV file. The technical product used for this SPARQL interface is [YASGUI](https://triply.cc/docs/yasgui-api/).

## SPARQL API

...s