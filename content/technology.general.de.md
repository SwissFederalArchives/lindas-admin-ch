# Linked Data

Linked Data hat verschiedene Facetten. Kurz zusammengefasst ist es die Kombination einer **spezifischen Idee** mit einer **Sammlung von konkreten Technologien**.

## Idee von Linked Data

Die Idee von Linked Date beinhaltet verschiedene Aspekte:

* **Weltweit eindeutige Identifier** für Datenpunkte (Ressourcen)
* Beschreibung von Information in Form von **Triples**
* Metadaten sind genau gleich wichtig wie die Daten und erzeugen Damit **Semantische Daten**
* Daten können über verschiedene Datenbanken hinweg **verlinkt** werden

## Technologie

* als Basistechnologie dient **RDF**, welches die Beschreibung von Daten in Form von Triples erlaubt
* für die eindeutigen Identifier wird der **IRI** Mechanismus verwendet
* für die Speicherung von Linked Data werden **Graphdatenbanken** (auch Triple Stores genannt) verwendet
* mit Hilfe der Abfragesprache **SPARQL** können die Daten aus der Datenbank abgefragt und verarbeitet werden

# Linked Data im Vergleich zu

## CSV Daten

CSV Daten sind tabellarische Daten. Linked Data sind Graphdaten, was ein universelleres Datenformat darstellt. Mit Hilfe von Linked Data können tabellarische Daten abgebildet werden (RDF Cube), aber es ist daneben noch viel mehr möglich.

Zusätzlich ist es bei CSV Daten nicht möglich, innerhalb der Daten etwas über die Daten zu sagen. Es kann nicht innnerhalb des CSV angegeben werden, was die Tabelle beinhaltet, welche Spalten vorkommen und was diese genau beschreiben resp. von welchem Datentyp die Inhalte sind.

## REST-API

Eine REST-API stellt Daten zur Verfügung, die nicht primär von Menschen direkt genutzt werden sollen, sondern durch Maschinen weiter verarbeitet und aufbereitet werden. In diesem Sinne stellt Linked Data mit Hilfe von SPARQL Endpunkten ähnliche Möglichkeiten zur Verfügung.

Während die Daten aus einer REST-API typischerweise einer gewissen Interpretation resp. zusätzlicher Dokumentation über andere Kanäle benötigen, können die Metadaten zu Linked Data direkt mit den Daten bezogen werden. Weiter erlaubt SPARQL als Abfragesprache auch, die Daten noch vor deren Ausgabe weiter zu verarbeiten (insbesondere Gruppierung).

# Allgemeine Dokumentationen

* [Opendata.swiss Handbook zu Linked Data](https://handbook.opendata.swiss/de/content/glossar/bibliothek/linked-open-data.html)
* Show a Walk (to discover the data) in a graph.
* https://dice-research.org/news/2022-07-26_Learn-RDF/ 
* https://classifications.data.admin.ch/linked-data/

### Forums und Hilfsplatformen

### Auflistung von Ausbildungen und Kursen zu Linked Data
