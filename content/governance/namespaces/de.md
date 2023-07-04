# Namespaces in LINDAS

Im Linked-Data-Universum hilft der Einsatz von Namespaces dabei, die Bezeichner von Subjekten (Datenpunkte) und Prädikaten (Attribute) zu organisieren. Ein wohldefinierter und organisierter gemeinsamer Namespace für alle öffentlichen und auch internen Daten auf Ebene der Verwaltung der Schweizerischen Eidgenossenschaft bringt eine Vielzahl von Vorteilen mit sich:

- Ein gut konstruierter Namespace führt zu stabilen und zuverlässigen URIs.
- Stabile URI sind wichtig für die Wiederverwendung der Daten in anderen Projekten und Anwendungen.
- Ein gut und logisch organisierter Namespace führt dazu, dass die Daten über den Namespace selbstbeschreibend sind. Dies führt zu einem reduzierten Bedarf an externer Dokumentation, um die Daten zu entdecken.
- Ein gemeinsamer Vertrag über den Status und die Verfügbarkeit von Daten in bestimmten Namespaces kann definiert und kommuniziert werden.

## Der Namespace `ld.admin.ch`

Der [Standard I003 - Kapitel 2.3.2](https://www.bk.admin.ch/bk/de/home/digitale-transformation-ikt-lenkung/ikt-vorgaben/standards/i003-domain_name_system_dns.html) definiert `ld.admin.ch` als Namespace für alle Linked Data Publikationen unter der Autorität der Autorität des Bundesverwaltung.

## Anatomie eines Namespaces

<pre>
         Autorität
       ┌───┴──────────────────┐
https://environment.ld.admin.ch/level1/level2/level3
└─┬─┘  └───┬─────────┘ └─┬────┘ └─┬────────────────┘
Protokoll Subdomains   Domain   Pfad
</pre>

Der Namespace beinhaltet die Subdomains, Domain und Pfad.

## Aufbau der Namespaces
```
            ld.admin.ch ->              zentrale Entitäten für die Schweiz
            ld.admin.ch/vocabulary/ ->  Controlled Vocabularies für die Schweiz
     schema.ld.admin.ch ->              spezifische Ontologien für die Schweiz
```
Beispiel für Landwirtschaftsdaten
```
agriculture.ld.admin.ch/ ->             zentrale Entitäten für die Landwirtschaft
agriculture.ld.admin.ch/vocabulary/ ->  Controlled Vocabularies für die Landwirtschaft
```

## Themenbasierte Subdomains

Folgende Tabelle listet die bereits verwendeten und vorgesehenen Subdomains auf. Falls für ein neues Datenset kein passendes Thema vorhanden ist, kann dieses über den [LINDAS Support](mailto:support-lindas@bar.admin.ch) angefragt werden. Nach [I003](https://www.bk.admin.ch/bk/de/home/digitale-transformation-ikt-lenkung/ikt-vorgaben/standards/i003-domain_name_system_dns.html) liegt die abschliessende Entscheidung über den Gebrauch der Subdomains bei der Bundeskanzlei (BK).

| *.ld.admin.ch           | Themen                                 | Beispiele Ämter |
|-------------------------|----------------------------------------|-----------------|
| agriculture.ld.admin.ch | Landwirtschaft                         | BLW, Agroscope  |
| culture.ld.admin.ch     | Kultur                                 | NB              |
| education.ld.admin.ch   | Ausbildung                             | BAR             |
| energy.ld.admin.ch      | Energie                                | Elcom, BFE      |
| environment.ld.admin.ch | Umwelt                                 | BAFU            |
| finance.ld.admin.ch     | Finanzen                               | BAR             |
| geo.ld.admin.ch         | Geodaten                               | swisstopo       |
| law.ld.admin.ch         | Gesetzestexte                          | BK              |
| politics.ld.admin.ch    | Politik                                | BK              |
| register.ld.admin.ch    | bestehende Register (Themenunabhängig) | BJ, BAR, BK     |
