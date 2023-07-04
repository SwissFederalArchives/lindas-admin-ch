# Namespaces in LINDAS

In the Linked Data universe, the use of namespaces helps to organize the identifiers of subjects (data points) and predicates (attributes). A well-defined and organized common namespace for all public and also internal data at the level of the Swiss Confederation administration brings a variety of benefits:

- A well-constructed namespace leads to stable and reliable URIs.
- Stable URIs are important for the reuse of data in other projects and applications.
- A well and logically organized namespace leads to data being self-describing across the namespace. This leads to a reduced need for external documentation to discover the data.
- A common contract on the status and availability of data in specific namespaces can be defined and communicated.

## The namespace `ld.admin.ch`

The [Standard I003 - Chapter 2.3.2](https://www.bk.admin.ch/bk/de/home/digitale-transformation-ikt-lenkung/ikt-vorgaben/standards/i003-domain_name_system_dns.html) defines `ld.admin.ch` as the namespace for all Linked Data publications under the authority of the Federal Administration.

## Anatomy of a namespace

<pre>
         Authority
       ┌───┴──────────────────┐
https://environment.ld.admin.ch/level1/level2/level3
└─┬─┘ └───┬─────────┘ └─┬────┘ └─┬─────────────────┘
Protocol subdomains domain path
</pre>

The namespace contains the subdomains, domain and path.

## Structure of the namespaces
```
            ld.admin.ch ->              central entities for Switzerland
            ld.admin.ch/vocabulary/ ->  controlled vocabularies for Switzerland
     schema.ld.admin.ch -> specific     ontologies for Switzerland
```
Example for agricultural data
```
agriculture.ld.admin.ch/ ->             central entities for agriculture
agriculture.ld.admin.ch/vocabulary/ ->  controlled vocabularies for agriculture
```

## Theme-based subdomains

The following table lists the already used and intended subdomains. If there is no suitable theme for a new dataset, this can be requested via [LINDAS Support](mailto:support-lindas@bar.admin.ch). According to [I003](https://www.bk.admin.ch/bk/de/home/digitale-transformation-ikt-lenkung/ikt-vorgaben/standards/i003-domain_name_system_dns.html) (only available in German), the final decision on the use of subdomains lies with the Federal Chancellery (BK).

| *.ld.admin.ch | Topics | Examples Offices |
|-------------------------|----------------------------------------|-----------------|
| agriculture.ld.admin.ch | Agriculture | FOAG, Agroscope |
| culture.ld.admin.ch | Culture | NL |
| education.ld.admin.ch | Education | SFA |
| energy.ld.admin.ch | Energy | Elcom, SFOE |
| environment.ld.admin.ch | Environment | FOEN |
| finance.ld.admin.ch | Finance | SFA |
| geo.ld.admin.ch | Geodata | swisstopo |
| law.ld.admin.ch | Legal Texts | BK |
| politics.ld.admin.ch | Politics | BK |
| register.ld.admin.ch | Existing Registers (topic-independent) | FOJ, SFA, BK |