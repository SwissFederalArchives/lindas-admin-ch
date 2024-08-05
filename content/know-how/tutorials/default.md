# LINDAS tutorials

The following tutorials built with the help of Jupyter notebooks help to start the journey into the LINDAS universe.

* [Introduction to version.link and the Historical Municipality Directory](https://swissfederalarchives.github.io/LD-Tutorials/lab?path=version_link.ipynb) (in German only)
* [Introduction to the Fedlex Linked Data platform of the Federal Chancellery](https://swissfederalarchives.github.io/LD-Tutorials/lab?path=fedlex.ipynb) (in German only)







# Query Planer - Or why is my query slow?

(To be edited and continued)

If you make a query there you can let you generate a query-plan->

![image](https://github.com/SwissFederalArchives/lindas-admin-ch/assets/86839683/494eab59-d07a-4dd5-9384-5480bd4d9af0)
 

Basically: In a SPARQL-query every triple pattern creates a list. If 2 patterns have at least one common variable, the lists get joined. You want to have the shortest, most precise list at the beginning and work yourself up. 
You see here an awful asci-art-tree of when which query gets joined and how long it takes. This tells you not how it *should* be queried, but what stardog actually does. And this can be surprising sometimes. Secondly it gives a hint, of where the problem lies.

Two helpful blogs from stardog: 7 Steps to Fast SPARQL Queries | Stardog[https://www.stardog.com/blog/7-steps-to-fast-sparql-queries/]
Avoidably Slow Queries | Stardog[https://www.stardog.com/blog/7-steps-to-fast-sparql-queries/2/]

ask lindas-support for credentials and place of stardog-studio.



# How send a SPARQL-Query as a URL and get back a csv?

If you click on this [link](https://ld.admin.ch/query\?format=csv&query=SELECT%20DISTINCT%20%3Fdimension0%20%3Fdimension1%20%3Fdimension2%20%3Fdimension3%20%3Fdimension4%20%3Fdimension5%20WHERE%20%7B%0A%20%20%3Chttps%3A%2F%2Fcommunication.ld.admin.ch%2Fofcom%2Fradio_overview%2F2%3E%20%3Chttps%3A%2F%2Fcube.link%2FobservationSet%3E%20%3FobservationSet0%20.%0A%20%20%3FobservationSet0%20%3Chttps%3A%2F%2Fcube.link%2Fobservation%3E%20%3Fsource0%20.%0A%20%20%3Fsource0%20%3Chttp%3A%2F%2Fschema.org%2FobservationDate%3E%20%3Fdimension0%20.%0A%20%20%3Fsource0%20%3Chttps%3A%2F%2Fcommunication.ld.admin.ch%2Fofcom%2Fradio_overview%2FnumberOfPrograms%3E%20%3Fdimension1%20.%0A%20%20%3Fsource0%20%3Chttps%3A%2F%2Fcommunication.ld.admin.ch%2Fofcom%2Fradio_overview%2Fconceptsendegruppe%3E%20%3Fdimension2%20.%0A%20%20%3Fsource0%20%3Chttps%3A%2F%2Fcommunication.ld.admin.ch%2Fofcom%2Fradio_overview%2Fconceptkonzession%3E%20%3Fdimension3%20.%0A%20%20%3Fdimension2%20%3Chttp%3A%2F%2Fschema.org%2FsameAs%3E%20%3Fdimension6%20.%0A%20%20%3Fdimension3%20%3Chttp%3A%2F%2Fschema.org%2FsameAs%3E%20%3Fdimension7%20.%0A%20%20%0A%7D%0AGROUP%20BY%20%3Fdimension0%20%3Fdimension1%20%3Fdimension2%20%3Fdimension3%20%3Fdimension4%20%3Fdimension5) you download a .csv from LINDAS directly. 
How was this achieved?

## Get your SPARQL query

One possible way to get a sparql query is to navigate to [visualize.admin.ch](https://visualize.admin.ch) and open your dataset. Click on "SPARQL-Abfrage ausführen" to access the SPARQL Console.
![image](https://github.com/SwissFederalArchives/lindas-admin-ch/assets/86839683/cee676fd-babb-4aed-b0b6-0ee6e67d3002)

Here, you can write and execute your SPARQL query. You can download the query results directly as a CSV file from this interface. Alternatively, you can click the share button and select "curl" to get a curl command for querying the database directly via curl.
![image](https://github.com/SwissFederalArchives/lindas-admin-ch/assets/86839683/b0755ac6-e2ec-4783-9f38-b6fe055fc7ee)


Copy the curl command. Replace the initial part `curl https://lindas.admin.ch/query --data query=` with `https://ld.admin.ch/query\?format=csv&query=`. Remove the `-X POST` at the end of the command. Your final URL should resemble this:

```
https://ld.admin.ch/query\?format=csv&query=select%20%2A%20where%20%7B%0A%20%20%3Fs%20%3Fp%20%3Fo.%7D%0A%0Alimit%2010
```




