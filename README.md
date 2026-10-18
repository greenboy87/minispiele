# Minispiele

Kleine Lernspiele als einzelne HTML-Dateien – ohne Build, einfach im Browser öffnen.

| Spiel | Ordner | Worum geht's |
|---|---|---|
| Alphabet-Gefühl | `alphabet/` | Ein Buchstabe erscheint, man klickt auf einem Farbband (A links, Z rechts) dahin, wo er ungefähr im Alphabet steht. |
| Nachsilben-Werkstatt | `nachsilben/` | Aus Nomen werden Adjektive: Mut → mutig, Herz → herzlich, Dank → dankbar (Deutsch, 4. Klasse). |
| Die Adjektiv-Treppe | `adjektive/` | Adjektive steigern (groß – größer – am größten), nicht steigerbare Adjektive erkennen, mit wie/als/am vergleichen (Deutsch, 4. Klasse). |
| Silben-Schere | `silben/` | Wörter nach den fünf Trennregeln in Silben schneiden: Kä-fer, Ra-dio, Mit-tag, Bä-cker, Ab-fall (Deutsch, 4. Klasse). |
| Deutsch-Fachbegriffe | `fachbegriffe/` | Wortarten im Satz bestimmen und finden, Vokale und Konsonanten erkennen (4. Klasse / Unterstufe). |

Start: `index.html` öffnen.

## Bestenliste (alle Spiele)

- Am Ende jeder Runde kann man sich in die Bestenliste eintragen – getrennt pro Spiel und Level/Spielart, Top 10, nach Prozent sortiert.
- Eingegebene Namen merkt sich das Gerät (spielübergreifend). Beim nächsten Mal tippt man einfach auf seinen Namen. „Namen entfernen“ löscht einen Namen aus der Auswahl.
- Pro Name zählt nur der beste Wert, damit ein Kind nicht die ganze Liste füllt. „Fehler üben“ zählt nicht.
- 🏆 oben im Spiel öffnet alle Listen; dort lässt sich eine Liste auch löschen.
- Alles nur lokal im Browser (`localStorage`, Schlüssel `minispiele:namen` und `minispiele:bestenliste:<spiel>:<level>`). Code: `shared/bestenliste.js`.

## Alphabet-Gefühl

- Vier Level: **Üben** (alle 26 Buchstaben stehen unter dem Band), **Leicht** (26 Striche, A/M/Z beschriftet), **Mittel** (nur A und Z), **Schwer** (nur das Band).
- Punkte pro Runde: 100 bei Treffer, dann linear weniger – ab 8 Buchstaben Abstand 0.
- Nach jedem Tipp wird das ganze Alphabet unter dem Band eingeblendet, damit man sieht, wo der Buchstabe wirklich steht.
- Am Ende: Sterne, Rekord pro Level (lokal im Browser) und „Schwächste Buchstaben üben“ (falsch geschätzte Buchstaben plus ihre Nachbarn).
- Optional Kleinbuchstaben, 5/10/15/26 Runden, Ton abschaltbar.

## Deutsch-Fachbegriffe

- Fachbegriffe: **Artikel** (bestimmt / unbestimmt), **Nomen** (Einzahl/Singular, Mehrzahl/Plural), **Verb**, **Adjektiv**, **Pronomen**, **Vokal** und **Konsonant** – jeweils mit deutschem Namen (Begleiter, Namenwort, Tunwort, Wiewort, Fürwort, Selbstlaut, Mitlaut).
- Spielarten:
  - **Wortart bestimmen** – ein Wort im Satz ist markiert. Bei Artikel und Nomen kommt eine zweite Frage (bestimmt/unbestimmt bzw. Einzahl/Mehrzahl). 100 Punkte für ganz richtig, 50, wenn nur die Wortart stimmt.
  - **Wörter finden** – z. B. „Tippe alle Verben an“, dann Prüfen. Punkte: (Treffer − falsche) / gesuchte.
  - **Vokale & Konsonanten** – Buchstaben eines Worts antippen. Umlaute ä, ö, ü zählen als Vokale.
  - **Bunt gemischt** – alles durcheinander.
- Nach jeder Antwort steht unter jedem Wort der Fachbegriff (optional zusätzlich farbig).
- 📒 Spickzettel mit allen Begriffen, Rekord pro Spielart (lokal im Browser), „Fehler üben“ wiederholt die falsch beantworteten Wortarten bzw. Wörter.
- Sätze stehen oben im Skript als `Wort/kürzel` (ba, ua, ns, np, v, adj, p, x = nicht abgefragt) und lassen sich leicht ergänzen.

## Nachsilben-Werkstatt

- Ein Nomen mit Artikel erscheint (z. B. „der Punkt“), daraus wird ein Adjektiv mit **-ig**, **-lich** oder (optional) **-bar**.
- Drei Level: **Leicht** (Nachsilbe wählen), **Mittel** (richtig geschriebenes Adjektiv unter vier finden – Fallen: falsche Nachsilbe, Großschreibung, Umlaut), **Schwer** (Adjektiv selbst tippen, mit ä/ö/ü/ß-Tasten).
- 30 Wörter auf -ig, 30 auf -lich, 5 auf -bar. Umlaute (Punkt → p**ü**nktlich) werden farbig markiert.
- Nach jeder Antwort ein Tipp: Verlängern (eisig → eisige, das g wird hörbar) und Umlaut-Hinweis.
- Punkte: 1 beim ersten Versuch, 0,5 beim zweiten. Am Ende Sterne, Rekord pro Level (lokal im Browser) und „Fehlerwörter üben“.

## Die Adjektiv-Treppe

- Schultafel-Look mit Kreideschrift, drei Runden:
  - **Treppe bauen** (8 Aufgaben) – die drei Formen eines Adjektivs von unten nach oben auf die Stufen Grundstufe, Höherstufe, Höchststufe tippen. Dazwischen typische Fehlformen (großer, am gutesten, am nähesten). Jede Runde enthält 3 besondere Adjektive (gut, viel, hoch, nah).
  - **Steigern oder nicht?** (10 Aufgaben) – Formen, Farben und Endgültiges (kaputt, tot) kann man nicht steigern, jeweils mit Begründung.
  - **wie, als oder am?** (10 Aufgaben) – Lückensätze, nach jeder Antwort wird die passende Regel eingeblendet.
- Merkkasten mit Adjektivprobe, Vergleichsregeln, Tabelle der besonderen Adjektive und nicht steigerbaren Wörtern.
- Aufgaben werden jedes Mal neu gemischt; bis zu 3 Sterne, bestes Ergebnis pro Runde lokal im Browser.

## Silben-Schere

- Die fünf Trennregeln aus dem Arbeitsheft stehen auf der Startseite und jederzeit unter 📒 Regeln: **1** Sprechsilben, **2** kein einzelner Vokal am Anfang/Ende (Uhu, Ra-dio), **3** bei mehreren Konsonanten kommt der letzte zur neuen Silbe (Mit-tag, sit-zen), **4** ch, ck, sch bleiben zusammen (Bä-cker), **5** zusammengesetzte Wörter in Bausteine zerlegen (Voll-korn-brot).
- Drei Level: **Leicht** (richtige Trennung unter vier finden – die falschen sind typische Fehler wie Bäc-ker, O-fen, si-tzen), **Mittel** (selbst zwischen die Buchstaben tippen, die Zahl der Striche wird verraten), **Schwer** (selbst schneiden ohne Hilfe; Wörter ohne Trennung einfach so prüfen).
- Themen wählbar: Sprechsilben, einzelner Vokal, ch · ck · sch, Bausteine, tz – alle Wörter aus dem Arbeitsheft plus weitere.
- Nach jeder Antwort: Silbenbögen unter dem Wort und an jeder Trennstelle ein farbiger Kreis mit der passenden Regelnummer; verbotene Stellen (Regel 2) sind durchgestrichen markiert. Falsche Striche bekommen eine Begründung.
- Punkte: 1 beim ersten Versuch, 0,5 beim zweiten. Am Ende Sterne, Rekord pro Level (lokal im Browser) und „Fehlerwörter üben“.
- Wörter stehen oben im Skript: `-` = Trennstelle, `+` = Baustein-Grenze, `|` = hier nicht trennen (Regel 2), z. B. `O|pe-ra-ti-on`, `Schutz+an+zug`.
