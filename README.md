[![License: CC0-1.0](https://img.shields.io/badge/License-CC0_1.0-lightgrey.svg)](http://creativecommons.org/publicdomain/zero/1.0/)

**item matrix rules** contains of rules for translating variable response status into item missing values and rules for item naming.

Read more:

* [All specifications of IQB](https://iqb-specifications.github.io/) (German only)
* [Learn about TBA](https://iqb-berlin.github.io/tba-info/) (German only)

For a human readable version of the spec [see here](https://iqb-specifications.github.io/item-matrix-rules). For validation purposes (get json schema directly) use this link:

```
    https://w3id.org/iqb/spec/item-matrix-rules/<major>.<minor>
```

# Überblick

Die Datenauswertung von Lernstandserhebungen beginnt mit der Kodierung der Antworten. Anschließend liegen diese Antworten noch in der Datenstruktur [response](https://iqb-specifications.github.io/response/) vor. Für eine Unit und eine Testperson betrifft das dann alle Variablen und States, die das Testsystem berichtet.

Für die weitere Datenanalyse ist es nötig, diese Struktur zu reduzieren. Ergebnis ist dann eine Itemmatrix:

* Ausgesuchte Variablen werden umbenannt, so dass sie übergreifend eindeutig sind. Dazu wird meist der Alias bzw. die ID der Unit als Präfix verwendet. Während die Variable ursprünglich '01', '02' usw. hieß, heißt sie dann 'M34K01'. Anschließend benutzen wir für die Variable den Begriff 'Item'.
* Pro Item soll nur der Score gespeichert werden, wodurch sich eine zweidimensionale Tabelle ergibt. Im TBA-System speichern wir außerdem noch den Code, um später bei Bedarf eine Analyse von Falschantworten durchführen zu können.
* Alle Fehlwerte (sog. 'missings') werden durch einen negativen Score-Wert ausgedrückt. Ein Status entfällt.

Durch die Datenstruktur `item-matrix-rules` wird der Schritt der Erstellung der Itemmatrix aus den kodierten Antworten konfiguriert. Alle Services oder Anwendungen, die eine Itemmatrix erstellen (z. B. IQB-Kodierbox, IQB-ResponseAnalyser), sollen diese Konfiguration benutzen.

# Spezifikation

## `itemNaming`

Über diese Parameter wird die Namensbildung des Items aus Unit-Alias/-ID und Variablen-ID gesteuert:

* `separator`: Das oder die Zeichen, das/die zwischen Unit-Alias/-ID und Variablen-ID stehen/steht. Als Standardwert wird kein Zeichen eingefügt.
* `omitUnitAliasIfVariableIdLongerThan`: Manchmal möchte man die Namensbildung genauer steuern oder die Unit-Alias/-ID eignet sich nicht als Präfix. Dann benennt man die Itemvariable (also die Variable, die für das Item die Score und Code liefert) so um, wie das Item auch heißen soll. Das ist dann ein längerer Name als '01' oder '_a', da die Eindeutigkeit innerhalb einer Studie gewährleistet werden muss. Dann kann man über diesen Parameter eine Länge angeben, ab der das Setzen der Unit-ID als Präfix unterbunden wird. Ein Wert '0' bedeutet, dass es immer einen Präfix geben soll.
* `useUnitAliasIfSingleVariable`: Es kann Units geben, die nur eine Itemvariable liefern. Dann kann es gewünscht sein, dass deren ID nicht genommen werden soll, sondern der Itemname nur aus dem Unit-Alias/-ID besteht.

## Missings

Eine Itemvariable muss den Status `CODING_COMPLETE` haben, damit ihr Wert in die Datenanalyse einfließen kann. Der Begriff 'Missing' kennzeichnet einen davon abweichenden Fehlerzustand: Es gab keine oder eine ungültige Beantwortung. Dann könnte es trotzdem wichtig sein, solche Fehlerzustände auf definierte Art in die Datenanlyse einzubeziehen. Dies hängt vom Ziel der Erhebung ab. Die folgenden Parameter regeln, wie die Fehlerzustände in einen Score der Itemmatrix übersetzt werden (der Code ist dann stets '0').

* `missingMap`: Eine Menge von Einträgen, jeweils `onResponseStatus` mit der Auflistung von Response-Statuswerten und dem jeweiligen `itemScore`, der als Itemwert gesetzt werden soll. Man kann also z. B. dem Status 'DISPLAYED' einen spezifischen negativen Wert -97 zuweisen und kann dann separate Analysen durchführen.
* `missingElseItemScore`: Die Missing-Zuweisung muss abschließend sein, d. h. es darf kein Fall offen bleiben. Auch um die expliziten Zuweisungen simpel halten zu können, ist hier der Itemwert für 'alle anderen Status' genannt.

