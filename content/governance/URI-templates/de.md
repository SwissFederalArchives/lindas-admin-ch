# URI Templates

Der [Standard I003 - Kapitel 2.3.2](https://www.bk.admin.ch/bk/de/home/digitale-transformation-ikt-lenkung/ikt-vorgaben/standards/i003-domain_name_system_dns.html) definiert `ld.admin.ch` als Namespace für alle Linked Data Publikationen unter der Autorität der Autorität des Bundesverwaltung.

Damit die publizierten Daten eine stabile URI behalten, ist der Name der veröffentlichenden Verwaltungseinheit (oder deren Abkürzung) kein Teil des Namespaces. Der Basis-URI `ld.admin.ch` wird das Thema als Subdomain (`<subdomain>`) vorangestellt. Der Projektname (`<dataset>`) wird im Anschluss an die Domain angefügt. Es sollte auf darauf geachtet werden, keine allzu generische Namen zu wählen. Insbesondere muss geprüft werden, ob der Projektname nicht bereits existiert.

Entitäten in LINDAS haben somit den Pfad `https://<subdomain>.ld.admin.ch/<dataset>/*`.

* `<subdomain>` ist das Thema (auf Englisch), mit dem sich das Dataset befasst
* `<dataset>` ist der Name des Datasets wie vom jeweiligen Projekt gewählt

Beispiel: Die Daten zum "International Standard Identifier for Libraries and Related Organizations" sind unter https://culture.ld.admin.ch/isil zu finden
