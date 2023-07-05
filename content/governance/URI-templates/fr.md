# URI Templates

The [Standard I003 - Chapter 2.3.2](https://www.bk.admin.ch/bk/de/home/digitale-transformation-ikt-lenkung/ikt-vorgaben/standards/i003-domain_name_system_dns.html) defines `ld.admin.ch` as the namespace for all Linked Data publications under the authority of the Federal Administration.

In order for the published data to retain a stable URI, the name of the publishing administrative unit (or its abbreviation) is not part of the namespace. The base URI `ld.admin.ch` is prefixed with the subject as a subdomain (`<subdomain>`). The project name (`<dataset>`) is appended after the domain. Care should be taken not to choose names that are too generic. In particular it must be checked whether the project name does not already exist.

Namespaces thus have the path `https://<subdomain>.ld.admin.ch/<dataset>/*`.

* `<subdomain>` is the topic (in English) that the dataset deals with.
* `<dataset>` is the name of the dataset as chosen by the respective project.

Example: the data on the "International Standard Identifier for Libraries and Related Organizations" can be found at https://culture.ld.admin.ch/isil
