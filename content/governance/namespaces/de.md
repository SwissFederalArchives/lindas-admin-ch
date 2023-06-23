# Namespaces der Schweizerischen Eidgenossenschaft

Im Linked-Data-Universum hilft der Einsatz von [Namespaces](/technology/glossary/#namespace) dabei, die Bezeichner von [Subjekten](/technology/glossary/) (Datenpunkte) und [Prädikaten](/technology/glossary/) (Attribute) zu organisieren. Ein wohldefinierter und organisierter gemeinsamer Namespace für alle öffentlichen und auch internen Daten auf Ebene der Schweizerischen Eidgenossenschaft bringt eine Vielzahl von Vorteilen mit sich:

- Ein gut konstruierter Namespace führt zu stabilen und zuverlässigen IRIs.
- Stabile IRI sind wichtig für die Wiederverwendung der Daten in anderen Projekten und Anwendungen.
- Ein gut und logisch organisierter Namespace führt dazu, dass die Daten über den Namespace selbstbeschreibend sind. Dies führt zu einem reduzierten Bedarf an externer Dokumentation, um die Daten zu entdecken.
- Ein gemeinsamer Vertrag über den Status und die Verfügbarkeit von Daten in bestimmten Namespaces kann definiert und kommuniziert werden.

## ld.admin.ch

Der [Standard I003 - Kapitel 2.3.2](https://www.bk.admin.ch/bk/de/home/digitale-transformation-ikt-lenkung/ikt-vorgaben/standards/i003-domain_name_system_dns.html) definiert `ld.admin.ch` als Namespace für alle Linked Data Publikationen der Schweizerischen Eidgenossenschaft.

## Anatomie eines Namespaces

<pre>
         Autorität
       ┌───┴──────────────────┐
https://environment.ld.admin.ch/level1/level2/level3
└─┬─┘  └───┬─────────┘ └─┬────┘ └─┬────────────────┘
Protokoll Subdomains   Domain   Pfad
</pre>

Der Namespace beinhaltet die Subdomains, Domain und Pfad. In der Regel werden Subdomains und Domains durch ein gemeinsames Schema definiert, gelegentlich können auch die ersten Ebenen des Pfades definiert werden.

## Überblick über mögliche Namespaces
```
            ld.admin.ch ->              zentrale Entitäten für die Schweiz
            ld.admin.ch/vocabulary/ ->  Controlled Vocabularies für die Schweiz
     schema.ld.admin.ch ->              spezifische Ontologien für die Schweiz
   register.ld.admin.ch ->              vom Bund publizierte Registerdaten

agriculture.ld.admin.ch/ ->             zentrale Entitäten für die Landwirtschaft
agriculture.ld.admin.ch/<name>/ ->      Inhalt, Datasets
agriculture.ld.admin.ch/vocabulary/ ->  Controlled Vocabularies für die Landwirtschaft

    finance.ld.admin.ch -> dito
     energy.ld.admin.ch -> dito
environment.ld.admin.ch -> dito
    culture.ld.admin.ch -> dito
        geo.ld.admin.ch -> dito
        law.ld.admin.ch -> dito
```

Eine neue thematische Subdomain kann bei der Bundeskanzlei [Federal Chancellery](https://ld.admin.ch/FCh), wie im [Standard I003 - Kapitel 2.3.2](https://www.bk.admin.ch/bk/de/home/digitale-transformation-ikt-lenkung/ikt-vorgaben/standards/i003-domain_name_system_dns.html) beschrieben, beantragt werden.
