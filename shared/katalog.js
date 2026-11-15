// Alle Minispiele, geordnet nach Klasse. Daraus baut index.html die Übersicht
// und stand/ die Seite „Mein Stand“.
//   id     = game-Schlüssel des Spiels (Bestenliste.init / Quiz.create / Blitz.create)
//   stufen = Namen der Level in derselben Reihenfolge wie im Spiel – die Stufennummer
//            auf dem Server ist die Position darin. Neue Level nur hinten anhängen!
//   einheit: "%" (Quiz) oder "richtig" (Zeitspiele)
window.KATALOG = {
  bereiche: [
    { id: "k2", name: "2. Klasse", icon: "2️⃣", gruppen: [
      { id: "k2-mathe", name: "🔢 Mathe: Plus und Minus bis 100", kurz: "Mathe", spiele: [
        { id: "rechnen100", pfad: "rechnen100", titel: "Rechen-Rakete bis 100", ic: "38 + 7 = ?", text: "Plus und Minus bis 100: Zehner, ohne und mit Übergang, fehlende Zahl.",
          stufen: ["Zehner", "Ohne Übergang", "Über den Zehner", "Gemischt", "Zahl fehlt"] },
        { id: "zahlenmauer", pfad: "zahlenmauer", titel: "Zahlenmauer", ic: "🧱 12 · 15", text: "Jeder Stein ist die Summe der zwei darunter – finde den fehlenden Stein.",
          stufen: ["Leicht", "Mittel", "Schwer"] },
        { id: "rechenwaage", pfad: "rechenwaage", titel: "Rechen-Waage", ic: "45 + 8 &gt; 50", text: "Kleiner, größer oder gleich? Beide Seiten ausrechnen und vergleichen.",
          stufen: ["Aufgabe und Zahl", "Zwei Aufgaben"] },
        { id: "blitzrechnen", pfad: "blitzrechnen", titel: "Blitz-Rechnen ⏱️", ic: "⏱️ 8 + 7", text: "Wie viele Aufgaben schaffst du in einer Minute? Bis 20, bis 100, Verdoppeln, Einmaleins.",
          einheit: "richtig", neu: true, stufen: ["Blitz bis 20", "Zehner und Einer", "Über den Zehner", "Verdoppeln und Halbieren", "Einmaleins mit 2, 5, 10"] }
      ] }
    ] },
    { id: "k4", name: "4. Klasse", icon: "4️⃣", gruppen: [
      { id: "k4-mathe", name: "🏆 Mathe-Profi: auf Zeit", kurz: "Mathe-Profi", spiele: [
        { id: "einmaleins", pfad: "einmaleins", titel: "Einmaleins-Blitz ⏱️", ic: "7 · 8 = ?", text: "Mal und geteilt gegen die Uhr – auch mit Zehnern, Hundertern und dem großen Einmaleins.",
          einheit: "richtig", neu: true, stufen: ["Malaufgaben", "Geteilt", "Mal und geteilt", "Mit Zehnern und Hundertern", "Großes Einmaleins"] },
        { id: "kopfrechnen", pfad: "kopfrechnen", titel: "Kopfrechen-Profi ⏱️", ic: "45 000 + 7 000", text: "Bis 1000 und bis zur Million im Kopf: ergänzen, verdoppeln, halbieren, mal 10, 100, 1000.",
          einheit: "richtig", neu: true, stufen: ["Plus und Minus bis 1000", "Ergänzen", "Große Zahlen", "Verdoppeln und Halbieren", "Mal und geteilt durch 10, 100, 1000"] },
        { id: "rechenkette", pfad: "rechenkette", titel: "Rechen-Ketten ⏱️", ic: "6 ➜ ·7 ➜ −12", text: "Schritt für Schritt im Kopf weiterrechnen – und Punkt vor Strich.",
          einheit: "richtig", neu: true, stufen: ["2 Schritte", "3 Schritte", "4 Schritte, größere Zahlen", "Punkt vor Strich"] }
      ] },
      { id: "k4-deutsch", name: "✏️ Deutsch: Verben und Rechtschreibung", kurz: "Verben", spiele: [
        { id: "verlaengern", pfad: "verlaengern", titel: "Verlängern-Detektiv", ic: "Hun<u>d</u> → Hun<u>d</u>e", text: "d oder t, g oder k, b oder p? Erst verlängern, dann hörst du es.",
          stufen: ["Mit Hilfe", "Ohne Hilfe", "Wie verlängern?"] },
        { id: "zeitformen", pfad: "zeitformen", titel: "Zeitformen-Detektiv", ic: "ging = ?", text: "Grundform, Gegenwart, 1. oder 2. Vergangenheit erkennen – und die Grundform finden.",
          stufen: ["Zeitform erkennen", "Grundform finden", "Gemischt"] },
        { id: "verbformen", pfad: "verbformen", titel: "Verben-Werkstatt", ic: "singen → sang", text: "Verbformen bilden: Gegenwart, 1. und 2. Vergangenheit – und hat oder ist?",
          stufen: ["Gegenwart", "1. Vergangenheit", "2. Vergangenheit", "hat oder ist?", "Gemischt"] },
        { id: "wortfamilien", pfad: "wortfamilien", titel: "Wortfamilien-Sortierer", ic: "SCHIEB 👨‍👩‍👧", text: "Wörter nach dem Wortstamm sortieren und den Stamm finden.",
          stufen: ["Wörter sortieren", "Wortstamm finden"] },
        { id: "umlaute", pfad: "umlaute", titel: "ä oder e? äu oder eu?", ic: "ä/e · äu/eu", text: "Wäsche kommt von waschen, träumen von Traum – mit verwandten Wörtern ableiten.",
          stufen: ["ä oder e?", "äu oder eu?", "Gemischt"] }
      ] },
      { id: "k4-wortarten", name: "🔤 Deutsch: Wortarten und Silben", kurz: "Wortarten", spiele: [
        { id: "alphabet", pfad: "alphabet", titel: "Alphabet-Gefühl", ic: "A ··· Z", text: "Wo steht der Buchstabe im Alphabet? Schätzen auf dem Farbband.",
          stufen: ["Üben", "Leicht", "Mittel", "Schwer"] },
        { id: "fachbegriffe", pfad: "fachbegriffe", titel: "Deutsch-Fachbegriffe", ic: "Nomen · Verb", text: "Artikel, Nomen, Verb, Adjektiv, Pronomen, Vokale und Konsonanten im Satz erkennen.",
          stufen: ["Wortart bestimmen", "Wörter finden", "Vokale & Konsonanten", "Bunt gemischt"] },
        { id: "nachsilben", pfad: "nachsilben", titel: "Nachsilben-Werkstatt", ic: "Mut + ig", text: "Aus Nomen werden Adjektive: -ig, -lich oder -bar?",
          stufen: ["Leicht", "Mittel", "Schwer"] },
        { id: "adjektive", pfad: "adjektive", titel: "Die Adjektiv-Treppe", ic: "groß · größer", text: "Adjektive steigern: Grundstufe, Höherstufe, Höchststufe – und wie, als oder am?",
          stufen: ["Treppe bauen", "Steigern oder nicht?", "wie, als oder am?"] },
        { id: "silben", pfad: "silben", titel: "Silben-Schere", ic: "Kä-fer ✂️", text: "Wörter richtig trennen – nach den fünf Trennregeln, auch mit ch, ck, sch und tz.",
          stufen: ["Leicht", "Mittel", "Schwer"] }
      ] }
    ] },
    { id: "musik", name: "Musik", icon: "🎵", fuerAlle: true, gruppen: [
      { id: "musik-alle", name: "🎵 Musik – für alle Klassen", kurz: "Musik", spiele: [
        { id: "zaehlzeiten", pfad: "zaehlzeiten", titel: "Zählzeiten-Training", ic: "1 e + e 🥁", text: "Zählzeiten über die Noten schreiben – Takte werden aus deinen Bausteinen gewürfelt.",
          stufen: ["Stufe 1 · sofort", "Stufe 2 · je Takt", "Stufe 3 · ganze Zeile"] },
        { id: "diktat", pfad: "diktat", titel: "Rhythmus-Diktat", ic: "👂 ♩ ♫ ♬", text: "Zuhören und den Rhythmus aus Bausteinen nachbauen – so oft anhören, wie du willst.",
          stufen: ["1 Takt", "2 Takte", "3 Takte", "4 Takte"] }
      ] }
    ] }
  ],
  // alle Spiele als Liste, mit Bereich und Gruppe
  alle() {
    return this.bereiche.flatMap(b => b.gruppen.flatMap(g => g.spiele.map(s => ({ ...s, bereich: b, gruppe: g }))));
  }
};
