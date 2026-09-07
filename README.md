# FiDiCare – Finde die digitale Care-Anwendung

## Ihr Überblick über digitale Tools in der Pflege!
Auf [dieser Seite](https://www.zukunftszentrum-brandenburg.de/digitales-pflegeportal/) können Sie sich digitale Pflegeprodukte ansehen, filtern und – nach einem Klick auf die Spaltenüberschriften – sortieren.

Eine Visualisierung rechts gibt einen Überblick über die Zahl der verfügbaren Produkte für die Interaktionsarbeit (iA), die planmäßig-rationale Arbeit (prA) und die Wissensarbeit (wA) im Pflegebereich.

Sollten Sie digitale Pflegetools kennen, die Sie in unserer Liste vermissen, lassen Sie es uns gerne wissen (aktuelle Kontaktdaten finden Sie im Impressum).

---

## Technik

Die Anwendung basiert auf [Vue 3](https://vuejs.org/) und [Buefy](https://v3.buefy.org/) in [Vite](https://vite.dev/).

### Konfiguration

[Vite Configuration Reference](https://vite.dev/config/).

### Installation

```sh
npm install
```

### Daten

Die Daten der Anwendung liegen in ``src/data/fidicare.csv``.

Zur Veröffentlichung (build, siehe unten) wird die CSV importiert und als JSON bereit gestellt.

Vorab die CSV **alphabetisch sortieren**, um eine korrekte aufsteigende Nummerierung in der Tabelle zu erhalten.

Die CSV-Datei muss UTF-8 kodiert sein und in der ersten Zeile eine (beliebige) Spaltenbezeichnung tragen. Die erste Zeile wird beim Import ignoriert. Ebenso sind die Spalten mit Semikolons (;) getrennt und nicht mit Anführungszeichen umschlossen. Dies enstspricht einem CSV-Export aus Excel.


### Entwicklung

Kompilieren und automatisches Nachladen von Änderungen im lokalen Browser.

```sh
npm run dev
```

### Veröffentlichung

Kompilieren und Minimieren zur Veröffentlichung.

```sh
npm run build
```
