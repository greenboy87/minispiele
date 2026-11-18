# Minispiele

Kleine Lernspiele als einzelne HTML-Dateien – ohne Build, einfach im Browser öffnen.

| Spiel | Ordner | Worum geht's |
|---|---|---|
| Alphabet-Gefühl | `alphabet/` | Ein Buchstabe erscheint, man klickt auf einem Farbband (A links, Z rechts) dahin, wo er ungefähr im Alphabet steht. |
| Nachsilben-Werkstatt | `nachsilben/` | Aus Nomen werden Adjektive: Mut → mutig, Herz → herzlich, Dank → dankbar (Deutsch, 4. Klasse). |
| Die Adjektiv-Treppe | `adjektive/` | Adjektive steigern (groß – größer – am größten), nicht steigerbare Adjektive erkennen, mit wie/als/am vergleichen (Deutsch, 4. Klasse). |
| Silben-Schere | `silben/` | Wörter nach den fünf Trennregeln in Silben schneiden: Kä-fer, Ra-dio, Mit-tag, Bä-cker, Ab-fall (Deutsch, 4. Klasse). |
| Zählzeiten-Training | `zaehlzeiten/` | Über jede Note die Zählzeit schreiben (1 e + e …), Takte aus gewählten Bausteinen (Musik). Kommt aus der Rhythmus-Werkstatt. |
| Rhythmus-Diktat | `diktat/` | Ein Rhythmus wird vorgespielt, man baut ihn aus Bausteinen nach (Musik). Kommt aus der Rhythmus-Werkstatt. |
| Deutsch-Fachbegriffe | `fachbegriffe/` | Wortarten im Satz bestimmen und finden, Vokale und Konsonanten erkennen (4. Klasse / Unterstufe). |
| Verlängern-Detektiv | `verlaengern/` | d oder t, g oder k, b oder p? Durch Verlängern entscheiden (Nomen, Adjektive, Verben, zusammengesetzte Wörter). |
| Zeitformen-Detektiv | `zeitformen/` | Grundform, Gegenwart, 1. oder 2. Vergangenheit erkennen; Grundform finden. |
| Verben-Werkstatt | `verbformen/` | Verbformen bilden (Gegenwart, 1. und 2. Vergangenheit), hat oder ist? |
| Wortfamilien-Sortierer | `wortfamilien/` | Wörter nach dem Wortstamm sortieren, Wortstamm finden (auch a→ä, au→äu). |
| ä oder e? äu oder eu? | `umlaute/` | Mit verwandten Wörtern ableiten: Wäsche ← waschen, träumen ← Traum. |
| Rechen-Rakete bis 100 | `rechnen100/` | Plus und Minus bis 100 im Zahlenfeld: Zehner, ohne/mit Übergang, fehlende Zahl (Mathe, 2. Klasse). |
| Zahlenmauer | `zahlenmauer/` | Fehlenden Stein ausrechnen, bis 50 oder 100; unten fehlende Steine mit Minus (Mathe, 2. Klasse). |
| Rechen-Waage | `rechenwaage/` | <, > oder =: Aufgabe gegen Zahl oder zwei Aufgaben vergleichen (Mathe, 2. Klasse). |
| Blitz-Rechnen ⏱️ | `blitzrechnen/` | Zeitspiel: bis 20, Zehner/Einer, über den Zehner, Verdoppeln/Halbieren, Einmaleins mit 2, 5, 10 (Mathe, 2. Klasse). |
| Einmaleins-Blitz ⏱️ | `einmaleins/` | Zeitspiel: mal, geteilt, mit Zehnern/Hundertern, großes Einmaleins (Mathe-Profi, 4. Klasse). |
| Kopfrechen-Profi ⏱️ | `kopfrechnen/` | Zeitspiel: bis 1000, ergänzen, große Zahlen bis 1 Million, verdoppeln/halbieren, · und : durch 10/100/1000 (Mathe-Profi, 4. Klasse). |
| Groß oder klein? | `grossklein/` | LRS: Artikelprobe, Signalwörter (beim Schwimmen, etwas Neues), Zeitwörter, Satzanfang (4. Klasse). |
| Doppel-Mitlaut-Detektiv | `doppelt/` | LRS: kurz/lang hören, doppelt oder einfach, ck/tz, am Wortende verlängern (4. Klasse). |
| i oder ie? | `iie/` | LRS: langes i → ie, kurzes i → i, Merkwörter (Tiger, wir) und ih (4. Klasse). |
| f oder v? | `fv/` | LRS: ver-/vor-, v-Merkwörter, v wie w (4. Klasse). |
| s, ss oder ß? | `sss/` | LRS: ss/ß, s/ss/ß mit Verlängern, das oder dass (4. Klasse). |
| Fehler-Detektiv | `fehlerdetektiv/` | LRS: Fehler im Satz finden bzw. richtig schreiben, Fehlerarten wählbar (4. Klasse). |
| Wörter-Werkstatt | `hoerdiktat/` | LRS: Wort hören (Sprachausgabe) oder kurz ansehen, dann selbst schreiben (4. Klasse). |
| Rechen-Ketten ⏱️ | `rechenkette/` | Zeitspiel: Ketten mit 2–4 Schritten, Punkt vor Strich und Klammern (Mathe-Profi, 4. Klasse). |

Start: `index.html` öffnen. Die Übersicht wird aus **`shared/katalog.js`** gebaut und ist nach Klassen geordnet: **2. Klasse** (`#k2`, Mathe `#k2-mathe`), **4. Klasse** (`#k4` mit LRS-Training `#k4-lrs`, Mathe-Profi `#k4-mathe`, Verben & Rechtschreibung `#k4-deutsch`, Wortarten & Silben `#k4-wortarten`) und **Musik** (`#musik`, für alle Klassen, nicht nach Klasse geordnet; Spiele `#musik-alle` und Instrumente `#musik-instrumente`: Klavier, Schlagzeug und Songbaukasten verlinken auf den music-trainer, Katalogeintrag mit `url` statt `pfad`). Alte Links (`#deutsch`, `#deutsch-neu`, `#deutsch-alt`, `#mathe`) werden umgeleitet. Ein neues Spiel kommt als Eintrag in den Katalog (mit `stufen` in derselben Reihenfolge wie die Level im Spiel). Oben rechts steht ein **QR-Code** zur öffentlichen Seite (immer `greenboy87.github.io/minispiele/`, mit dem gerade gewählten Bereich als `#…`): antippen oder „Groß zeigen“ für den Laptop/Beamer, „Drucken“ gibt eine A4-Seite nur mit QR-Code und Adresse aus. Bibliothek: qrcode-generator 1.4.4 von cdnjs. Die Wahl merkt sich das Gerät (`minispiele:fach`).

## Anmeldung und „Mein Stand“

- Angemeldet wird mit **denselben Konten wie im music-trainer** (Pseudonym + Klassenpasswort, Worker `music-trainer.tomgruenig87.workers.dev`, Code `shared/konto.js`). Die Anmeldung liegt unter dem Schlüssel `musiktrainer-konto` – wer im music-trainer angemeldet ist, ist es auf demselben Gerät auch hier und umgekehrt.
- Link mit Anmeldung: `https://greenboy87.github.io/minispiele/?u=NAME&p=PASSWORT` (für QR-Kärtchen; die Daten werden danach aus der Adresse entfernt).
- Nach jeder Runde meldet `Bestenliste.offer()` ein kleines Ergebnis an `/api/ergebnisse`: Spiel `mini-<game ohne Ziffern>` (z. B. `mini-rechnen`), Stufe = Position des Levels, Sterne 0–3, Punkte = Prozent bzw. Anzahl richtig, Dauer. „Fehler üben“ wird nicht gemeldet. Ohne Netz wartet es in `minispiele-offen`. Angemeldet wird die Bestenliste gleich mit dem Kontonamen gefüllt.
- `stand/` („📊 Mein Stand“) liest nur die eigenen Runden mit `GET /api/meinverlauf?praefix=mini-` (neu im Worker, höchstens 3000 Zeilen) und zeigt: Runden, Tage, Übungszeit, die letzten 7 Tage, je Spiel und Level Runden, Bestwert, letztes Ergebnis, Verlauf, die letzten 20 Runden. Die Karten der Übersicht zeigen „✔ 5× gespielt“.
- Testen ohne Cloudflare: `music-trainer/test/attrappe.js` und `cloudflare/` vorübergehend nach `Minispiele/_test/` kopieren, dann in der Konsole `await (await import('/_test/test/attrappe.js')).starten(); MiniKonto.API = 'https://attrappe.musiktrainer.test'` (Origin `http://localhost:8765` ist im Worker erlaubt). `_test/` nicht committen.

## LRS-Training (4. Klasse, `#k4-lrs`)

Sieben Rechtschreib-Spiele auf dem Quiz-Gerüst. Ausgerichtet an der Studienlage: Laut-Buchstaben-Zuordnung (kurz/lang hören), ausdrücklich vermittelte Rechtschreibregeln und Strategien (Schwingen in Silben, Verlängern, Artikelprobe, Ersatzprobe) und Wortbausteine wirken bei LRS am besten. Reines Auswendiglernen wirkt in Studien kaum, darum nur kleine Merkwort-Gruppen (Galuschka u. a. 2020, Educational Psychologist 55(1); Galuschka u. a. 2014, PLoS ONE 9(2)). Jede Rückmeldung nennt die Regel. „Fehler üben“ wiederholt die falschen Wörter.

Neu im Gerüst (`shared/quiz.js`): `say` liest das Wort mit der deutschen Stimme des Geräts vor (🔊, `Quiz.sprich`), `autoSay` gleich beim Start. `text: true` zeigt ein Schreibfeld (ohne Autokorrektur und automatische Großschreibung, Groß/klein zählt) und markiert falsche Buchstaben rot. Im Level „Anschauen, merken, schreiben“ blendet CSS das Wort nach 4 Sekunden aus.

## Zeitspiele (Mathe-Profi)

`shared/blitz.js` (`Blitz.create({...})`): 3-2-1-Countdown, dann 60 Sekunden (je Level `sekunden`), Eingabe übers Zahlenfeld oder die Tastatur. Stimmt die Zahl, geht es sofort weiter; bei einem Fehler steht kurz die Lösung (mit Rechenweg) da. Gezählt werden die richtigen Antworten, Sterne ab `sterne: [1, 2, 3]` richtigen. Rekord pro Level, Bestenliste mit Einheit „richtig“, am Ende die falschen Aufgaben zum Nachlesen.

## Bestenliste (alle Spiele)

- Am Ende jeder Runde kann man sich in die Bestenliste eintragen – getrennt pro Spiel und Level/Spielart, Top 10, nach Prozent sortiert.
- Eingegebene Namen merkt sich das Gerät (spielübergreifend). Beim nächsten Mal tippt man einfach auf seinen Namen. „Namen entfernen“ löscht einen Namen aus der Auswahl.
- Pro Name zählt nur der beste Wert, damit ein Kind nicht die ganze Liste füllt. „Fehler üben“ zählt nicht.
- 🏆 oben im Spiel öffnet alle Listen; dort lässt sich eine Liste auch löschen.
- Alles nur lokal im Browser (`localStorage`, Schlüssel `minispiele:namen` und `minispiele:bestenliste:<spiel>:<level>`). Code: `shared/bestenliste.js`.

## Gemeinsames Quiz-Gerüst (Verben & Rechtschreibung)

Die fünf Spiele der neuen Prüfung sind klein: Jede `index.html` enthält nur Wortlisten und einen Aufgaben-Erzeuger und ruft `Quiz.create({...})` aus `shared/quiz.js` auf (Aussehen: `shared/quiz.css`). Das Gerüst baut Startseite mit Leveln und Themen, Spiel, Merkkasten (📒), Ergebnis mit Sternen, Rekord, Bestenliste und „Fehler üben“. Punkte: 1 beim ersten Versuch, 0,5 beim zweiten (zweiter Versuch nur bei mehr als zwei Antworten). Standard: 10 Aufgaben pro Runde, damit eine Runde kurz bleibt. Grundlage: Arbeitsheft-Seiten 17–24 und 45.

- **Verlängern-Detektiv** – Level *Mit Hilfe* (verlängertes Wort mit Lücke steht da), *Ohne Hilfe*, *Wie verlängern?* (Mehrzahl / steigern / Grundform / zerlegen). Themen: Nomen, Adjektive, Verben, zusammengesetzte & andere Wörter. Wörter als `der Hun[d]:die Hun[d]e`.
- **Zeitformen-Detektiv** und **Verben-Werkstatt** teilen sich die Verbliste `shared/verben.js` (`Grundform|er-Form|1. Verg.|hat/ist|Partizip`). Falsche Antworten werden erzeugt (gehte, gegeht, ist getroffen). Echte Wörter wie dürfte/müsste werden nicht als Fehler angeboten. Bei stehen, liegen und schwimmen wird nicht nach hat/ist gefragt, weil „ist gestanden/gelegen“ in Bayern richtig ist.
- **Wortfamilien-Sortierer** – Stamm in eckigen Klammern: `ge[schob]en`. Je Runde drei ähnliche Familien gegeneinander.
- **ä oder e? äu oder eu?** – `die W[ä]sche:waschen`; ohne verwandtes Wort (`das W[e]tter:`) heißt es e/eu.

## Mathe (2. Klasse)

Die drei Mathe-Spiele nutzen dasselbe Quiz-Gerüst. Rakete und Zahlenmauer verwenden dessen Zahlenfeld (`input: true` in der Aufgabe, Ziffern auch über die Tastatur). Aufgaben werden zufällig erzeugt (`shared/rechnen.js`: `make(art, op)` mit art = zehner/ohne/mit, Ergebnis immer 0–100). Nach jeder Aufgabe wird der Rechenweg gezeigt, z. B. 38 + 7 → 38 + 2 = 40 → 40 + 5 = 45. In der Übersicht: **2. Klasse → Mathe** (`#k2-mathe`).

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

## Zählzeiten-Training

- Das Spiel selbst lebt in der **Rhythmus-Werkstatt** (Repo `greenboy87/rhythmus-werkstatt`, Reiter „Zähl-Training“, `js/zaehlspiel.js`). `zaehlzeiten/index.html` bettet nur dessen Spielansicht ein (`https://greenboy87.github.io/rhythmus-werkstatt/?ansicht=zaehlen`) – so gibt es Notensatz, Klänge und Generator nur einmal. Änderungen am Spiel also dort machen. Braucht deshalb Internet.
- Bausteine wählen, Taktart 2/4 · 3/4 · 4/4, 1–4 Takte je Aufgabe. Über jeder Note ein Kästchen, Eingabe per Zahlenfeld (1–4, e, +) oder Tastatur.
- Drei Stufen: **1** jede Eingabe sofort geprüft, **2** geprüft, wenn ein Takt voll ist, **3** erst, wenn die ganze Zeile voll ist.
- Gespielt wird in Runden zu 5 Aufgaben; die Einstellungen gelten fest für die ganze Runde. Ergebnis = richtige Kästchen / (richtige + Fehler).
- **Bestenliste:** Nach jeder Runde meldet die Werkstatt das Ergebnis per `postMessage` (`rw-runde`), die Minispiele-Seite trägt es über `shared/bestenliste.js` ein – Spiel `zaehlzeiten`, Listen `stufe1`/`stufe2`/`stufe3`. Nur auf der Minispiele-Seite, nicht in der Werkstatt selbst.
- Außerdem Serie fehlerfreier Aufgaben mit Bestwert pro Stufe (lokal, `rw-zaehlen`).
- Direkt in der Werkstatt: `https://greenboy87.github.io/rhythmus-werkstatt/?reiter=zaehlen`.

## Rhythmus-Diktat

- Wie das Zählzeiten-Training nur ein Rahmen: `diktat/index.html` bettet `https://greenboy87.github.io/rhythmus-werkstatt/?ansicht=diktat` ein (Code in der Werkstatt, `js/spiele.js`). Braucht Internet.
- Bausteine wählen, Taktart 2/4 · 3/4 · 4/4, 1–4 Takte je Aufgabe, Tempo und Vorlauf. „Anhören“ so oft man will, dann aus den Bausteinen nachbauen und prüfen (Takt für Takt). Klatschmodus: Viertel + Pause gilt wie eine Halbe.
- Runden zu 5 Aufgaben. Ergebnis: 1 Punkt je Aufgabe beim ersten Versuch, 0,5 bei einem späteren, 0 mit „Lösung zeigen“.
- **Bestenliste:** Spiel `diktat`, Listen `takte1`–`takte4` (nach Takten je Aufgabe). Nachricht der Werkstatt: `{typ:'rw-runde', spiel:'diktat', takte, pct, detail}`.
