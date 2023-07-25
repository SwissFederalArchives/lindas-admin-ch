## Cache Server

Zusätzlich zum Leseendpunkt `https://ld.admin.ch/query` wird ein mit [Varnish](https://varnish-cache.org/) umgesetzter Cache Server unter https://lindas-cached.cluster.ldbar.ch/query betrieben.

## Namespaces, Namedgraphs und Benutzernamen

Die Daten in LINDAS werden mit Hilfe von verschiedenen Namespaces organisiert und strukturiert. Die Zugriffskontrolle zu den Daten basiert auf Namedgraphs in Kombination mit Benutzernamen.

## Federation über mehrere Triplestores

Ein wichtiges Prinzip im Arbeiten mit Linked Data ist die Möglichkeit, innerhalb einer einzigen SPARQL Query mehrere Triplestores gleichzeitig abzufragen. In diesem Fall spricht man von einer [Federated Query](https://www.w3.org/TR/sparql11-federated-query/).

## Interne Triplestores

Oben genannte technischen Details beziehen sich alle auf den öffentlich zugänglichen und offenen Teil von LINDAS, welcher technisch in der Datenbank mit dem Namen 'lindas' umgesetzt ist. Für interne Applikationen ist es möglich, vom offenen Teil unabhängige Datenbanken mit anderen Regelwerken zu benützen. Für Details hierzu kann der LINDAS Support kontaktiert werden.

## Anforderungen an die Datenpublikation

Jede Publikation welche auf PROD zugelassen werden soll, muss ein definiertes Minimum an Metadaten aufweisen. Die dazu nötigen Attribute der [Dataset](https://www.w3.org/TR/void/) Klasse, sind unter https://schema.ld.admin.ch/LindasDataset definiert und müssen unter `<domain>/.well-known/dataset/<dataset>` verfügbar sein. Zusätzlich müssen alle Datasets unter der jeweiligen `<domain>/.well-known/void` Adresse zur Bekanntmachung aufgeführt sein.

Als Beispiel können https://culture.ld.admin.ch/.well-known/dataset/isil und https://culture.ld.admin.ch/.well-known/void konsultiert werden.

## Betrieb, Status und Support

### Allgemeiner und Administrativer Support

Für allgemeinen Fragen, auch für neue Interessierte, welche LINDAS nutzen möchten, steht der Lindas Support [support-lindas@bar.admin.ch](mailto:support-lindas@bar.admin.ch) zur Verfügung.

### Technischer Betrieb und Support

Der Betrieb von LINDAS wird durch [VSHN](https://www.vshn.ch/) sichergestellt. Datenlieferanten bekommen einen Zugang zum [Ticket System](https://control.vshn.net/), welches für sämtliche Anfragen zu neuen Namedgraphs, Benutzern und weiteren Fragen zum Betrieb benutzt werden kann.

### Status

Der allgemeine Status der technischen Systeme, sowie geplante Wartungsarbeiten können unter https://status.ldbar.ch/ abgerufen werden. Es ist auch möglich, dort eine eMail Adresse zu hinterlegen um aktiv informiert zu werden.



## Verweis auf eine bestimmte Sprache einer bestimmten Seite

[Content only available in German](/governance/?lang=de)


## API (von Claudio)

# Beispiele für die Verwendung der API

Hier wird Beispielcode zur Verwendung der API Für Rstudio, Python und für JavaScript vorgestellt. Dem Api-Endpoint "https://lindas.admin.ch/query" kann eine Sparql-Abfrage als Payload mitgegeben werden. Die Antwort kann in csv, json, xml und Turtle erhalten werden.

## Rstudio

Mit dem folgenden Code kann eine Sparql-Abfrage an den Lindas-Endpunkt gesendet werden und die Antwort als data.frame erhalten. 

Für weitere Möglichkeiten (z.B. wie man es als Markdown-Chunk ausführt) [hier](https://ourednik.info/maps/2021/12/14/execute-sparql-chunks-in-r-markdown/ ).


	
	endpoint <- "https://lindas.admin.ch/query"
	proxy_url <- curl::ie_get_proxy_for_url(endpoint)
	proxy_config <- use_proxy(url=proxy_url)
	query <- "PREFIX schema: <http://schema.org/>
	SELECT * WHERE {
	?sub a schema:DataCatalog .
	?subtype a schema:DataType .
	}"
	querymanual <- paste(endpoint, "?", "query", "=", gsub("\\+", "%2B", URLencode(query, reserved = TRUE)), "", sep = "")
	queryres_csv <- GET(querymanual,proxy_config, timeout(60), add_headers(c(Accept = "text/csv")))
	queryres_csv$content <- stri_encode(queryres_csv$content, from="UTF-8",to="UTF-8") #This is only important if your local encoding set is not on UTF-8. This is the case if you work from a Machine of the Swiss Federal Government.
	queryres_content_csv <-  queryres_csv$content %>% textConnection() %>% read.csv
	




## Python

In Python kann auf dem Code-snippet unten aufgebaut werden.


	import json
	import pandas as pd

	from IPython.display import  HTML #JSON,
	from SPARQLWrapper import SPARQLWrapper, JSON, TURTLE #JSON; TURTLE sind was zurückgegeben werden kann. mehr dazu: https://sparqlwrapper.readthedocs.io/_/downloads/en/latest/pdf/ Seite 8

	sparql = SPARQLWrapper(
		"https://ld.admin.ch/query"
	) #hier ist der api-endpoint
	sparql.setReturnFormat(CSV) # hier kann auch TURTLE oder JSON stehen

	# get data: everything in LINDAS with string "Swiss Federal Archives"
	# Wenn wir triples zurückwollen, dann müssen wir describe oder Construct nehmen. WEil sonst will er es automatisch konvertieren. 
	sparql.setQuery("""
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    SELECT DISTINCT ?s ?p ?l
    WHERE {
  ?s ?p ?l.
  (?l ?score) <tag:stardog:api:property:textMatch> 'Swiss Federal Archives'.
    }

	limit 10
	"""
	)

	try:
	ret = sparql.queryAndConvert() #das ist vom workexample von sparqlwarpper. es wird in ret gespeichert und konvertiert und dann keine ahnung, was es macht. 

	for r in ret["results"]["bindings"]:	
		print(r)
	except Exception as e:
		print(e)
	`


	'


## JavaScript

Unten is ein Beispiel code wie im JavaScript LINDAS angesteuert werden kann.

	
	<body> 
	the data is in the console (press f12 in browser)
	<script type="text/javascript">

	let queryBody = "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> " + 
	            "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> " +
				" SELECT * WHERE { " +
		   	"?sub_1 <https://www.ica.org/standards/RiC/ontology#hasRecordSetType> ?all. " +
		   			"VALUES ?all {<https://culture.ld.admin.ch/ais/vocabularies/recordSetTypes/1> <https://culture.ld.admin.ch/ais/vocabularies/recordSetTypes/10001> <https://culture.ld.admin.ch/ais/vocabularies/recordSetTypes/10003> } " +
		    "    ?sub_1 <https://www.ica.org/standards/RiC/ontology#title> ?title. " +
		    "    ?sub_1 <https://www.ica.org/standards/RiC/ontology#hasRecordSetType> ?level. " +
			"} LIMIT 1000000";

	var details = {
	    'query': queryBody,
	    'lang': 'de'
	};

	var formBody = [];
	for (var property in details) {
	  var encodedKey = encodeURIComponent(property);
	  var encodedValue = encodeURIComponent(details[property]);
	  formBody.push(encodedKey + "=" + encodedValue);
	}
	formBody = formBody.join("&");

	var url = "https://lindas.admin.ch/query";

	async function asyncCall() {
		let response = await fetch(
			url,
			{
				method: 'POST',
				headers: {
					'accept' : "application/sparql-results+json,*/*;q=0.9",
					'content-type' : "application/x-www-form-urlencoded"
				},
				body: formBody
			}
		);

		let responsetext = await response.text();  
		console.log(responsetext);

	}
		 asyncCall(); 

	</script>
	</body>
