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
