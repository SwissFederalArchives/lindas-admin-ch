# Linked Data

Linked Data hat verschiedene Facetten. Kurz zusammengefasst ist es die Kombination einer **spezifischen Idee** mit einer **Sammlung von konkreten Technologien**. Auf diesen Seiten soll keine allumfassende Einführung ins Thema gegeben werden, sondern ein paar wichtige Aspekte herausgegriffen werden und auf entsprechende [Grundlagen, Einführungen und Tutorials](/technology/help/) verwiesen werden.

## Idee von Linked Data

Die Idee von Linked Data beinhaltet verschiedene Aspekte:

* **Weltweit eindeutige Identifier** für Datenpunkte (Ressourcen)
* Beschreibung von Information in Form von **Triples**
* Metadaten sind genau gleich wichtig wie die Daten und erzeugen Damit **Semantische Daten**
* Daten können über verschiedene Datenbanken hinweg **verlinkt** werden

## Technologie

* als Basistechnologie dient **RDF**, welches die Beschreibung von Daten in Form von Triples erlaubt
* für die eindeutigen Identifier wird der **IRI** Mechanismus verwendet
* für die Speicherung von Linked Data werden **Graphdatenbanken** (auch Triple Stores genannt) verwendet
* mit Hilfe der Abfragesprache **SPARQL** können die Daten aus der Datenbank abgefragt und verarbeitet werden
* Dank der Ontologie Sprache **OWL** können neue Erkenntnisse aus bestehenden Daten abgeleitet werden

# Vorteile dank der Nutzung von Linked Data

## Vorteile für Datenprovider

* Linked Data verlangt vom Datenprovider eine klare Vorstellung der eigenen Daten. Nur wer genau weiss, was die Daten bedeuten, kann dies auch als Metadaten klar formulieren. Linked Data kann helfen, eine solche klare Vorstellung zu entwickeln
* Linked Data kann behilflich sein, eine eindeutige und klare Strategie zur Identifikation von Datenpunkten mit Hilfe von IRI zu entwickeln
* Linked Data zahlt sich langfristig aus, da Daten und Datenmodelle nicht für einzelne Anwendungen optimiert werden, sondern als klare, sich selbst beschreibende Rohdaten erstellt werden, die sich einfacher in verschiedene Strukturen transformieren lassen
* Linked Data verlangt vom Datenprovider eine Sicht/Zusammenarbeit über die eigene Organisation hinaus, was ingesamt zu qualitativ besseren Daten führt

## Vorteile für Datennutzerinnen

* Linked Data und SPARQL stellen ein sehr universaler Mechanismus dar, um mit Daten zu arbeiten
* Erlangtes Wissen rund um Linked Data und SPARQL für einen spezifischen Datensatz lässt sich sehr viel einfacher auf andere Datensätze in Linked Data übertragen

# Linked Data im Vergleich zu

## CSV Daten

CSV Daten sind tabellarische Daten. Linked Data sind Graphdaten, welche ein universelleres Datenformat darstellen. Mit Hilfe von Linked Data können tabellarische Daten abgebildet werden (RDF Cube), aber es ist daneben auch möglich, komplizierte netzwerkartige Datenstrukturen sauber und effizient abzubilden.

Zusätzlich ist es bei CSV Daten nicht möglich, innerhalb der Daten etwas über die Daten zu sagen. Es kann nicht innnerhalb des CSV angegeben werden, was die Tabelle beinhaltet, welche Spalten vorkommen und was diese genau beschreiben resp. von welchem Datentyp die Inhalte sind.

## REST-API

Eine REST-API stellt Daten zur Verfügung, die nicht primär von Menschen direkt genutzt werden sollen, sondern durch Maschinen weiter verarbeitet und aufbereitet werden. In diesem Sinne stellt Linked Data mit Hilfe von SPARQL Endpunkten ähnliche Möglichkeiten zur Verfügung.

Während die Daten aus einer REST-API typischerweise einer gewissen Interpretation resp. zusätzlicher Dokumentation über andere Kanäle benötigen, können die Metadaten zu Linked Data direkt mit den Daten bezogen werden. Weiter erlaubt SPARQL als Abfragesprache auch, die Daten noch vor deren Ausgabe weiter zu verarbeiten (insbesondere Gruppierung).

# Hindernisse im Umgang mit Linked Data

## Hindernisse für Datenprovider

Datenprovider, die ihre Daten als Linked Data veröffentlichen wollen (im Gegensatz zu bspw. CSV) haben verschiedene Herausforderungen zu bewältigen:

* Wissen rund um Linked Data ist in Entwicklerkreisen weniger stark verbreitet im Vergleich zu "klassischen" Technologien wie relationale Datenbanken und SQL
* Linked Data verlangt nach einem funktionierenden Data Management und einer etablierten Data Governance, was häufig mit grossen Vorinvestitionen verbunden ist, die sich aber typischerweise langfristig auszahlen
* Linked Data im Sinne der Verlinkung bedingt das Durchbrechen einer "Silo-Mentalität", was kulturell und organisatorisch eine Herausforderung darstellen kann

## Hindernisse für Datennutzerinnen

* der Zugang zu Linked Data via SPARQL Abfragen stellt eine Anfangshürde dar, die relativ hoch ist
* werden Linked Data via Dereferenzierung über HTML Seiten genutzt, liefern diese häufig unübersichtliche Informationen und laden auch nicht zu einem explorativen Weiterklicken ein
* es existieren nicht überall gute Suchfunktionen via Volltextsuche für Graphdatenbanken
