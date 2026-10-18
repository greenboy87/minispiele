// Bestenliste für alle Minispiele – nur lokal im Browser (localStorage).
// Namen werden spielübergreifend gemerkt, damit man sie beim nächsten Mal nur antippen muss.
//
//   Bestenliste.init({ game: "silben", levels: { leicht: "Leicht", mittel: "Mittel" } });
//   Bestenliste.offer(mountEl, { level: "leicht", pct: 85, detail: "8,5 von 10 Punkten", practice: false });
//   Bestenliste.open("leicht");   // Bestenliste als Fenster
//
// Farben kommen aus den CSS-Variablen des Spiels (--accent, --card, --ink, --muted, --line, --good).
(() => {
  const NAMES_KEY = "minispiele:namen";
  const LIST_KEY = (game, level) => `minispiele:bestenliste:${game}:${level}`;
  const TOP = 10;
  const MAX_NAMES = 40;

  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); } catch { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} }
  };
  const esc = (s) => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const clean = (s) => s.replace(/\s+/g, " ").trim().slice(0, 20);
  const same = (a, b) => a.toLocaleLowerCase("de") === b.toLocaleLowerCase("de");

  let cfg = { game: "spiel", levels: {} };

  // ---------- Namen ----------
  const names = () => store.get(NAMES_KEY, []);
  function rememberName(name) {
    const list = names().filter(n => !same(n, name));
    list.unshift(name);
    store.set(NAMES_KEY, list.slice(0, MAX_NAMES));
  }
  function forgetName(name) { store.set(NAMES_KEY, names().filter(n => !same(n, name))); }

  // ---------- Liste ----------
  const list = (level) => store.get(LIST_KEY(cfg.game, level), []);
  const sortList = (l) => l.sort((a, b) => b.pct - a.pct || (a.date < b.date ? -1 : a.date > b.date ? 1 : 0));

  // Pro Name nur der beste Eintrag – sonst füllt ein Kind die ganze Liste.
  function addEntry(level, name, pct, detail) {
    const l = list(level);
    const old = l.find(e => same(e.name, name));
    const date = new Date().toISOString().slice(0, 10);
    let improved = true, prev = null;
    if (old) {
      prev = old.pct;
      if (pct > old.pct) Object.assign(old, { name, pct, detail, date });
      else improved = false;
    } else l.push({ name, pct, detail, date });
    sortList(l);
    store.set(LIST_KEY(cfg.game, level), l.slice(0, TOP));
    const rank = l.findIndex(e => same(e.name, name)) + 1;
    return { improved, prev, rank: rank > 0 && rank <= TOP ? rank : null };
  }

  // ---------- Styles ----------
  const css = `
  .bl { --bl-accent: var(--accent, #6c4cf1); --bl-accent-ink: var(--accent-ink, #fff); --bl-card: var(--card, #fff);
        --bl-ink: var(--ink, #2b2540); --bl-muted: var(--muted, #7a7290); --bl-line: var(--line, #e6dccb); --bl-good: var(--good, #1fa463);
        color: var(--bl-ink); font-family: inherit; text-align: center; }
  .bl-box { border: 2px dashed var(--bl-line); border-radius: 18px; padding: 16px; margin: 18px auto; max-width: 640px; }
  .bl h3 { margin: 0 0 4px; font-size: 22px; }
  .bl .bl-sub { color: var(--bl-muted); font-size: 15px; margin: 0 0 12px; }
  .bl-names { display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; margin-bottom: 12px; }
  .bl-name { position: relative; border: 2px solid var(--bl-accent); background: transparent; color: var(--bl-ink);
             border-radius: 999px; padding: 8px 16px; font: inherit; font-size: 18px; font-weight: 600; cursor: pointer; }
  .bl-name:hover { background: color-mix(in srgb, var(--bl-accent) 14%, transparent); }
  .bl-name .x { display: none; position: absolute; top: -8px; right: -8px; width: 22px; height: 22px; border-radius: 50%;
                background: #e2513b; color: #fff; font-size: 14px; line-height: 22px; font-weight: 700; }
  .bl.edit .bl-name { border-style: dashed; animation: bl-wiggle .3s ease-in-out infinite alternate; }
  .bl.edit .bl-name .x { display: block; }
  @keyframes bl-wiggle { from { transform: rotate(-1.5deg); } to { transform: rotate(1.5deg); } }
  .bl-new { display: flex; gap: 8px; justify-content: center; flex-wrap: wrap; }
  .bl-new input { font: inherit; font-size: 18px; padding: 8px 14px; border-radius: 12px; border: 2px solid var(--bl-line);
                  background: var(--bl-card); color: var(--bl-ink); min-width: 0; width: 220px; max-width: 100%;
                  -webkit-user-select: text; user-select: text; }
  .bl-new input:focus { outline: none; border-color: var(--bl-accent); }
  .bl-btn { border: 0; border-radius: 12px; padding: 9px 18px; font: inherit; font-size: 17px; font-weight: 600; cursor: pointer;
            background: var(--bl-accent); color: var(--bl-accent-ink); }
  .bl-btn:disabled { opacity: .4; cursor: default; }
  .bl-link { background: none; border: 0; color: var(--bl-muted); font: inherit; font-size: 14px; text-decoration: underline; cursor: pointer; margin-top: 10px; }
  .bl-msg { font-weight: 700; color: var(--bl-good); font-size: 19px; margin-bottom: 10px; }
  .bl-table { width: 100%; border-collapse: collapse; font-size: 17px; text-align: left; }
  .bl-table td { padding: 6px 8px; border-bottom: 1px solid var(--bl-line); }
  .bl-table td.r { width: 44px; text-align: center; font-weight: 700; }
  .bl-table td.p { text-align: right; font-weight: 700; color: var(--bl-accent); white-space: nowrap; }
  .bl-table td.d { color: var(--bl-muted); font-size: 14px; text-align: right; white-space: nowrap; }
  .bl-table tr.me td { background: color-mix(in srgb, var(--bl-good) 16%, transparent); }
  .bl-empty { color: var(--bl-muted); padding: 10px 0; }
  dialog.bl-dlg { border: 0; border-radius: 22px; padding: 0; width: calc(100% - 32px); max-width: 560px; background: var(--card, #fff);
                  color: var(--ink, #2b2540); box-shadow: 0 10px 40px rgba(0,0,0,.35); }
  dialog.bl-dlg::backdrop { background: rgba(20, 14, 40, .5); }
  .bl-dlg .bl { padding: 20px; }
  .bl-head { display: flex; justify-content: space-between; align-items: center; gap: 10px; margin-bottom: 12px; }
  .bl-head h3 { margin: 0; }
  .bl-tabs { display: flex; gap: 6px; flex-wrap: wrap; justify-content: center; margin-bottom: 12px; }
  .bl-tab { border: 2px solid var(--bl-line); background: transparent; color: var(--bl-ink); border-radius: 999px; padding: 5px 14px;
            font: inherit; font-size: 15px; cursor: pointer; }
  .bl-tab.sel { border-color: var(--bl-accent); background: var(--bl-accent); color: var(--bl-accent-ink); }
  @media (max-width: 480px) { .bl-table td.d { display: none; } }`;
  function injectCss() {
    if (document.getElementById("bl-css")) return;
    const s = document.createElement("style");
    s.id = "bl-css"; s.textContent = css;
    document.head.appendChild(s);
  }

  const medal = (r) => r === 1 ? "🥇" : r === 2 ? "🥈" : r === 3 ? "🥉" : r + ".";
  function tableHtml(level, highlight) {
    const l = list(level);
    if (!l.length) return `<div class="bl-empty">Noch niemand eingetragen.</div>`;
    return `<table class="bl-table">` + l.map((e, i) =>
      `<tr class="${highlight && same(e.name, highlight) ? "me" : ""}"><td class="r">${medal(i + 1)}</td><td>${esc(e.name)}</td>` +
      `<td class="d">${esc(e.detail || "")}</td><td class="p">${e.pct} %</td></tr>`).join("") + `</table>`;
  }

  // ---------- Eintragen am Ende einer Runde ----------
  function offer(mount, { level, pct, detail, practice }) {
    injectCss();
    const levelName = cfg.levels[level] || "";
    const where = levelName ? ` – ${esc(levelName)}` : "";
    if (practice) {
      mount.innerHTML = `<div class="bl"><div class="bl-box"><h3>🏆 Bestenliste${where}</h3>` +
        `<p class="bl-sub">Fehler-Übung zählt nicht für die Bestenliste.</p>${tableHtml(level)}</div></div>`;
      return;
    }
    const root = document.createElement("div");
    root.className = "bl";
    mount.innerHTML = "";
    mount.appendChild(root);

    function save(name) {
      name = clean(name);
      if (!name) return;
      rememberName(name);
      const res = addEntry(level, name, pct, detail);
      let msg;
      if (res.prev === null) msg = res.rank ? `${esc(name)} ist auf Platz ${res.rank}! ${res.rank <= 3 ? medal(res.rank) : "🎉"}` : `Gespeichert – für die Top ${TOP} hat es diesmal nicht gereicht.`;
      else if (res.improved) msg = `Neuer Bestwert für ${esc(name)}: ${pct} % (vorher ${res.prev} %)${res.rank ? ` – Platz ${res.rank}!` : ""}`;
      else msg = `${esc(name)}, dein Bestwert bleibt ${res.prev} %.`;
      root.innerHTML = `<div class="bl-box"><h3>🏆 Bestenliste${where}</h3><div class="bl-msg">${msg}</div>${tableHtml(level, name)}</div>`;
    }

    function draw() {
      const ns = names();
      root.innerHTML = `<div class="bl-box">
        <h3>🏆 In die Bestenliste eintragen</h3>
        <p class="bl-sub">${ns.length ? "Tippe auf deinen Namen – oder schreib einen neuen." : "Schreib deinen Namen. Das Gerät merkt ihn sich für das nächste Mal."}</p>
        ${ns.length ? `<div class="bl-names">${ns.map((n, i) => `<button class="bl-name" data-i="${i}">${esc(n)}<span class="x" aria-label="Namen entfernen">✕</span></button>`).join("")}</div>` : ""}
        <form class="bl-new"><input maxlength="20" placeholder="${ns.length ? "Neuer Name" : "Dein Name"}" autocomplete="off" autocapitalize="words" enterkeyhint="done"><button class="bl-btn" type="submit" disabled>Eintragen</button></form>
        ${ns.length ? `<button class="bl-link" type="button" data-edit>${root.classList.contains("edit") ? "Fertig" : "Namen entfernen"}</button>` : ""}
      </div>`;
      const inp = root.querySelector("input"), btn = root.querySelector(".bl-btn");
      inp.oninput = () => { btn.disabled = !clean(inp.value); };
      root.querySelector("form").onsubmit = (e) => { e.preventDefault(); save(inp.value); };
      inp.addEventListener("keydown", e => e.stopPropagation());
      root.querySelectorAll(".bl-name").forEach(b => b.onclick = () => {
        const n = ns[b.dataset.i];
        if (root.classList.contains("edit")) {
          if (confirm(`„${n}“ aus der Namensliste entfernen? (Einträge in der Bestenliste bleiben.)`)) { forgetName(n); draw(); }
        } else save(n);
      });
      const ed = root.querySelector("[data-edit]");
      if (ed) ed.onclick = () => { root.classList.toggle("edit"); draw(); };
      if (!names().length) root.classList.remove("edit");
    }
    draw();
  }

  // ---------- Fenster mit allen Listen ----------
  let dlg = null;
  function open(level) {
    injectCss();
    if (!dlg) {
      dlg = document.createElement("dialog");
      dlg.className = "bl-dlg";
      dlg.addEventListener("click", e => { if (e.target === dlg) dlg.close(); });
      document.body.appendChild(dlg);
    }
    const keys = Object.keys(cfg.levels);
    let cur = keys.includes(level) ? level : keys[0] || "standard";
    function draw() {
      dlg.innerHTML = `<div class="bl">
        <div class="bl-head"><h3>🏆 Bestenliste</h3><button class="bl-btn" data-close>Schließen ✕</button></div>
        ${keys.length > 1 ? `<div class="bl-tabs">${keys.map(k => `<button class="bl-tab ${k === cur ? "sel" : ""}" data-k="${k}">${esc(cfg.levels[k])}</button>`).join("")}</div>` : ""}
        ${tableHtml(cur)}
        ${list(cur).length ? `<button class="bl-link" data-clear>Diese Liste löschen</button>` : ""}
      </div>`;
      dlg.querySelector("[data-close]").onclick = () => dlg.close();
      dlg.querySelectorAll(".bl-tab").forEach(b => b.onclick = () => { cur = b.dataset.k; draw(); });
      const cl = dlg.querySelector("[data-clear]");
      if (cl) cl.onclick = () => {
        if (confirm(`Bestenliste „${cfg.levels[cur] || ""}“ wirklich löschen?`)) { store.set(LIST_KEY(cfg.game, cur), []); draw(); }
      };
    }
    draw();
    if (!dlg.open) dlg.showModal();
  }

  window.Bestenliste = {
    init(c) { cfg = { levels: {}, ...c }; injectCss(); },
    offer, open
  };
})();
