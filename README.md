# Minispiele

Kleine Lernspiele als einzelne HTML-Dateien – ohne Build, einfach im Browser öffnen.

| Spiel | Ordner | Worum geht's |
|---|---|---|
| Alphabet-Gefühl | `alphabet/` | Ein Buchstabe erscheint, man klickt auf einem Farbband (A links, Z rechts) dahin, wo er ungefähr im Alphabet steht. |
| Nachsilben-Werkstatt | `nachsilben/` | Aus Nomen werden Adjektive: Mut → mutig, Herz → herzlich, Dank → dankbar (Deutsch, 4. Klasse). |
| Deutsch-Fachbegriffe | `fachbegriffe/` | Wortarten im Satz bestimmen und finden, Vokale und Konsonanten erkennen (4. Klasse / Unterstufe). |

Start: `index.html` öffnen.

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
