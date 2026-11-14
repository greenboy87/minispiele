// Verben für „Zeitformen-Detektiv“ und „Verben-Werkstatt“.
// Grundform | er/sie/es Gegenwart | er/sie/es 1. Vergangenheit | hat/ist | Partizip (2. Vergangenheit) | nur diese Person (optional)
(() => {
  const RAW = `
leben|lebt|lebte|hat|gelebt
denken|denkt|dachte|hat|gedacht
bringen|bringt|brachte|hat|gebracht
können|kann|konnte|hat|gekonnt
dürfen|darf|durfte|hat|gedurft
müssen|muss|musste|hat|gemusst
gehen|geht|ging|ist|gegangen
blitzen|blitzt|blitzte|hat|geblitzt|es
helfen|hilft|half|hat|geholfen
stimmen|stimmt|stimmte|hat|gestimmt
lesen|liest|las|hat|gelesen
drücken|drückt|drückte|hat|gedrückt
streichen|streicht|strich|hat|gestrichen
fliegen|fliegt|flog|ist|geflogen
fahren|fährt|fuhr|ist|gefahren
schneiden|schneidet|schnitt|hat|geschnitten
kommen|kommt|kam|ist|gekommen
nehmen|nimmt|nahm|hat|genommen
schleichen|schleicht|schlich|ist|geschlichen
liegen|liegt|lag|hat|gelegen
legen|legt|legte|hat|gelegt
singen|singt|sang|hat|gesungen
geben|gibt|gab|hat|gegeben
schieben|schiebt|schob|hat|geschoben
schwimmen|schwimmt|schwamm|ist|geschwommen
treffen|trifft|traf|hat|getroffen
ziehen|zieht|zog|hat|gezogen
trinken|trinkt|trank|hat|getrunken
haben|hat|hatte|hat|gehabt
werden|wird|wurde|ist|geworden
fließen|fließt|floss|ist|geflossen|es
finden|findet|fand|hat|gefunden
stehen|steht|stand|hat|gestanden
tragen|trägt|trug|hat|getragen
toben|tobt|tobte|hat|getobt
sinken|sinkt|sank|ist|gesunken
kleben|klebt|klebte|hat|geklebt
bleiben|bleibt|blieb|ist|geblieben
schlagen|schlägt|schlug|hat|geschlagen
läuten|läutet|läutete|hat|geläutet
quälen|quält|quälte|hat|gequält
träumen|träumt|träumte|hat|geträumt
nähen|näht|nähte|hat|genäht
lächeln|lächelt|lächelte|hat|gelächelt
drängeln|drängelt|drängelte|hat|gedrängelt
raten|rät|riet|hat|geraten
waschen|wäscht|wusch|hat|gewaschen
heben|hebt|hob|hat|gehoben
biegen|biegt|bog|hat|gebogen
fegen|fegt|fegte|hat|gefegt
wiegen|wiegt|wog|hat|gewogen
steigen|steigt|stieg|ist|gestiegen
schreiben|schreibt|schrieb|hat|geschrieben
schweigen|schweigt|schwieg|hat|geschwiegen
laufen|läuft|lief|ist|gelaufen
springen|springt|sprang|ist|gesprungen
essen|isst|aß|hat|gegessen`;

  // Leicht verwechselbare Grundformen
  const CONFUSE = { liegen: "legen", legen: "liegen", sinken: "singen", singen: "sinken", biegen: "bügeln", wiegen: "wägen", schieben: "schüben", raten: "reiten", heben: "haben", haben: "heben", steigen: "stiegen", treffen: "trifften" };

  // Diese „falschen“ 1.-Vergangenheit-Formen gibt es wirklich (dürfte, müsste, könnte, wiegte) – nicht als Fehler anbieten
  const NO_FAKE_PRAT = new Set(["dürfen", "müssen", "können", "wiegen"]);
  // In Bayern sagt man auch „ist gestanden / ist gelegen“, schwimmen geht mit hat und ist – hier nicht nach hat/ist fragen
  const AUX_BOTH = new Set(["stehen", "liegen", "schwimmen"]);

  const VERBS = RAW.trim().split("\n").map(line => {
    const [g, p3, pt, aux, pp, only] = line.split("|");
    return { g, p3, pt, aux, pp, only };
  });

  const stemOf = (g) => /(el|er)n$/.test(g) ? g.slice(0, -1) : g.slice(0, -2);
  const tE = (stem) => /[td]$/.test(stem) ? "e" : "";          // red-et, find-et
  const plural = (pt) => pt.endsWith("e") ? pt + "n" : pt + "en"; // lebte → lebten, ging → gingen

  // Formen für eine Person: "er" | "sie" | "es" | "wir"
  function forms(v, person) {
    const stem = stemOf(v.g), wir = person === "wir";
    const aux = wir ? (v.aux === "hat" ? "haben" : "sind") : v.aux;
    const other = wir ? (v.aux === "hat" ? "sind" : "haben") : (v.aux === "hat" ? "ist" : "hat");
    const weakPt = stem + tE(stem) + "te", weakPp = "ge" + stem + tE(stem) + "t";
    return {
      person, aux, other,
      pres: wir ? v.g : v.p3,
      prat: wir ? plural(v.pt) : v.pt,
      perf: aux + " " + v.pp,
      fakePres: wir ? v.p3 : stem + tE(stem) + "t",
      fakePrat: NO_FAKE_PRAT.has(v.g) ? null : wir ? plural(weakPt) : weakPt,
      fakePerf: [AUX_BOTH.has(v.g) ? null : other + " " + v.pp, aux + " " + weakPp, aux + " ge" + v.g]
    };
  }
  function personFor(v, allowWir = true) {
    if (v.only) return v.only;
    const ps = allowWir ? ["er", "sie", "es", "wir"] : ["er", "sie", "es"];
    return ps[Math.floor(Math.random() * ps.length)];
  }
  const strong = (v) => v.pt !== stemOf(v.g) + tE(stemOf(v.g)) + "te";

  window.Verben = { VERBS, CONFUSE, AUX_BOTH, forms, personFor, stemOf, strong };
})();
