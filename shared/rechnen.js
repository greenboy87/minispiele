// Gemeinsame Rechen-Hilfen für die Mathe-Spiele (2. Klasse, Plus und Minus bis 100)
(() => {
  const rnd = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
  const Z = (n) => Math.floor(n / 10) * 10, E = (n) => n % 10;

  // ---------- Aufgaben erzeugen ----------
  // art: "zehner" | "ohne" | "mit"; op: "+" | "-"
  function make(art, op) {
    for (let k = 0; k < 200; k++) {
      let a, b;
      if (art === "zehner") { a = rnd(1, 9) * 10; b = rnd(1, 9) * 10; }
      else {
        a = rnd(11, 89);
        b = Math.random() < .5 ? rnd(2, 9) : rnd(11, 59);
      }
      if (op === "-" && b > a) [a, b] = [b, a];
      const c = op === "+" ? a + b : a - b;
      if (c < 0 || c > 100 || b === 0 || a === b) continue;
      if (art !== "zehner" && (E(a) === 0 || E(b) === 0 && b < 10)) continue;
      const carry = op === "+" ? E(a) + E(b) > 10 : E(b) > E(a);
      if (art === "ohne" && (carry || (op === "+" && E(a) + E(b) === 10))) continue;
      if (art === "mit" && !carry) continue;
      return { a, b, op, c, art };
    }
    return { a: 30, b: 20, op, c: op === "+" ? 50 : 10, art: "zehner" };
  }

  // Rechenweg Schritt für Schritt (so wie im Heft: erst Zehner, dann Einer, über den Zehner zerlegen)
  function weg({ a, b, op, c }) {
    const s = [];
    if (op === "+") {
      let x = a;
      if (Z(b) && E(b)) { s.push(`${a} + ${Z(b)} = ${a + Z(b)}`); x = a + Z(b); }
      const e = b < 10 ? b : E(b);
      if (b >= 10 && !E(b)) return `Nur die Zehner ändern sich: ${Z(a) / 10} Zehner + ${b / 10} Zehner = ${Z(c) / 10} Zehner${E(a) ? `, die ${E(a)} Einer bleiben` : ""} → <b>${c}</b>`;
      if (E(x) + e > 10) { const bis = 10 - E(x); s.push(`${x} + ${bis} = ${x + bis}`, `${x + bis} + ${e - bis} = ${c}`); }
      else s.push(`${x} + ${e} = ${c}`);
    } else {
      let x = a;
      if (Z(b) && E(b)) { s.push(`${a} − ${Z(b)} = ${a - Z(b)}`); x = a - Z(b); }
      const e = b < 10 ? b : E(b);
      if (b >= 10 && !E(b)) return `Nur die Zehner ändern sich: ${Z(a) / 10} Zehner − ${b / 10} Zehner = ${Z(c) / 10} Zehner${E(a) ? `, die ${E(a)} Einer bleiben` : ""} → <b>${c}</b>`;
      if (e > E(x)) { const bis = E(x); s.push(`${x} − ${bis} = ${x - bis}`, `${x - bis} − ${e - bis} = ${c}`); }
      else s.push(`${x} − ${e} = ${c}`);
    }
    return "Rechenweg: " + s.map((x, i) => i === s.length - 1 ? x.replace(/= (\d+)$/, "= <b>$1</b>") : x).join(" &nbsp;→&nbsp; ");
  }

  window.Rechnen = { rnd, Z, E, make, weg };
})();
