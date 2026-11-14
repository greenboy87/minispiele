// Gemeinsames Grundgerüst für kurze Auswahl-Quiz (Verben, d/t, Wortfamilien …).
// Ein Spiel liefert nur Daten und einen Aufgaben-Erzeuger:
//
//   Quiz.create({
//     game: "verlaengern",                       // Schlüssel für Rekord und Bestenliste
//     title: "Verlängern-<span>Detektiv</span>",  // Kopfzeile
//     heading: "…", intro: "…",                   // Startseite
//     levels: [{ id, name, desc }],
//     topics: [{ id, name, on }],                 // optional: Themen-Knöpfe (mindestens eins bleibt an)
//     merk: "<h4>…</h4>…",                        // Inhalt des 📒 Merkkastens
//     rounds: 10,
//     makeTasks(level, topics, n) → [task],
//     endTitles: ["Weiter üben!", "Gut!", "Super!", "Profi!"]
//   });
//
// Eine Aufgabe (task):
//   { key, prompt, show, choices: [{ v, html }], answer, style: "letters" | "words" | "labels",
//     solved, tip, recap, wrongWhy(v) }
//   show / solved: HTML für die Bühne vor / nach der Antwort; tip: Erklärung danach; recap: Zeile im Ergebnis.
//   Bei mehr als zwei Auswahlknöpfen gibt es einen zweiten Versuch (0,5 Punkte).
(() => {
  const $ = (id) => document.getElementById(id);
  const shuffle = (a) => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const pick = (a) => a[Math.floor(Math.random() * a.length)];
  const num = (x) => String(x).replace(".", ",");

  function create(cfg) {
    const store = {
      get(k, d) { try { const v = localStorage.getItem(cfg.game + ":" + k); return v === null ? d : JSON.parse(v); } catch { return d; } },
      set(k, v) { try { localStorage.setItem(cfg.game + ":" + k, JSON.stringify(v)); } catch {} }
    };
    const LEVEL_NAMES = Object.fromEntries(cfg.levels.map(l => [l.id, l.name]));

    // ---------- Seite aufbauen ----------
    document.body.innerHTML = `
<div class="wrap">
  <header>
    <h1>${cfg.title}</h1>
    <div class="tools">
      <a class="icon-btn" href="../index.html#${cfg.back || "deutsch"}" title="Zurück zur Übersicht aller Minispiele">← Übersicht</a>
      <button class="icon-btn" id="merkBtn" title="Merkkasten">📒 Merken</button>
      <button class="icon-btn" id="hsBtn" title="Bestenliste">🏆</button>
      <button class="icon-btn" id="soundBtn" title="Ton an/aus">🔊</button>
      <button class="icon-btn" id="homeBtn" title="Zum Start">⌂ Start</button>
    </div>
  </header>
  <section id="start" class="card">
    <h2>${cfg.heading}</h2>
    <p>${cfg.intro}</p>
    <div class="levels" id="levels">${cfg.levels.map(l => `<button class="level" data-level="${l.id}"><b>${l.name}</b><small>${l.desc}</small><div class="best"></div></button>`).join("")}</div>
    ${cfg.topics ? `<div class="topics" id="topics"><span class="lbl">Üben mit:</span>${cfg.topics.map(t => `<button class="chip" data-t="${t.id}">${t.name}</button>`).join("")}</div>` : ""}
    <button class="big-btn" id="playBtn">Los geht's!</button>
    <div class="options">
      <label>Aufgaben:
        <select id="roundsOpt" class="icon-btn" style="padding:4px 8px"><option>5</option><option>10</option><option>15</option><option>20</option></select>
      </label>
      <button class="ghost-btn" id="merkBtn2" style="padding:6px 14px; font-size:15px">📒 Merkkasten ansehen</button>
    </div>
  </section>
  <section id="game">
    <div class="hud">
      <div class="pill">Aufgabe <em id="roundNo">1</em> / <span id="roundMax">10</span></div>
      <div class="dots" id="dots"></div>
      <div class="pill">Punkte <em id="scoreNo">0</em></div>
    </div>
    <div class="card">
      <div class="stage">
        <div class="prompt" id="prompt"></div>
        <div class="bench" id="bench"></div>
        <div class="choices" id="choices"></div>
        <div class="feedback" id="feedback"></div>
      </div>
      <div class="actions"><button class="big-btn" id="nextBtn">Weiter →</button></div>
      <div class="hint" id="hint"></div>
    </div>
  </section>
  <section id="end" class="card">
    <h2 id="endTitle">Geschafft!</h2>
    <div class="stars" id="stars"></div>
    <div class="total"><b id="endScore">0</b> von <span id="endMax">10</span> Punkten</div>
    <div class="newbest" id="newBest"></div>
    <div id="bestenliste"></div>
    <div class="recap" id="recap"></div>
    <div class="end-actions">
      <button class="big-btn" id="againBtn">Nochmal</button>
      <button class="ghost-btn" id="practiceBtn">Fehler üben</button>
      <button class="ghost-btn" id="menuBtn">Anderes Level</button>
    </div>
  </section>
</div>
<div class="modal" id="merk"><div class="card"><button class="icon-btn x" id="merkX">✕</button><h3>📒 Merkkasten</h3>${cfg.merk}</div></div>`;

    // ---------- Ton ----------
    let ac = null, soundOn = store.get("sound", true);
    const paintSound = () => $("soundBtn").textContent = soundOn ? "🔊" : "🔇";
    paintSound();
    $("soundBtn").onclick = () => { soundOn = !soundOn; store.set("sound", soundOn); paintSound(); };
    function tone(freq, start, dur, type = "triangle", vol = .18) {
      if (!soundOn) return;
      try {
        ac = ac || new (window.AudioContext || window.webkitAudioContext)();
        const t = ac.currentTime + start, o = ac.createOscillator(), g = ac.createGain();
        o.type = type; o.frequency.setValueAtTime(freq, t);
        g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(vol, t + .01); g.gain.exponentialRampToValueAtTime(.0001, t + dur);
        o.connect(g).connect(ac.destination); o.start(t); o.stop(t + dur + .02);
      } catch {}
    }
    const sfx = {
      good() { [523, 659, 784].forEach((f, i) => tone(f, i * .08, .25)); },
      ok() { tone(440, 0, .2); tone(523, .1, .25); },
      bad() { tone(220, 0, .3, "sawtooth", .08); tone(185, .12, .35, "sawtooth", .08); },
      end() { [392, 523, 659, 784, 659, 784].forEach((f, i) => tone(f, i * .12, .3)); }
    };

    // ---------- Start ----------
    let level = store.get("level", cfg.levels[0].id);
    if (!LEVEL_NAMES[level]) level = cfg.levels[0].id;
    let topics = new Set(store.get("topics", (cfg.topics || []).filter(t => t.on !== false).map(t => t.id)));
    if (cfg.topics && ![...topics].some(t => cfg.topics.some(x => x.id === t))) topics = new Set(cfg.topics.map(t => t.id));
    let state = null;

    const levelBtns = [...document.querySelectorAll(".level")];
    function paintLevels() {
      levelBtns.forEach(b => {
        b.classList.toggle("sel", b.dataset.level === level);
        const best = store.get("best:" + b.dataset.level, null);
        b.querySelector(".best").textContent = best ? `Rekord: ${best.pct} %` : "";
      });
      document.querySelectorAll(".chip").forEach(c => c.classList.toggle("on", topics.has(c.dataset.t)));
    }
    levelBtns.forEach(b => b.onclick = () => { level = b.dataset.level; store.set("level", level); paintLevels(); });
    document.querySelectorAll(".chip").forEach(c => c.onclick = () => {
      if (topics.has(c.dataset.t)) { if (topics.size > 1) topics.delete(c.dataset.t); } else topics.add(c.dataset.t);
      store.set("topics", [...topics]); paintLevels();
    });
    $("roundsOpt").value = String(store.get("rounds", cfg.rounds || 10));
    paintLevels();

    function show(id) { ["start", "game", "end"].forEach(s => $(s).style.display = s === id ? (s === "game" ? "flex" : "block") : "none"); }
    const openMerk = () => $("merk").classList.add("open");
    $("merkBtn").onclick = openMerk; $("merkBtn2").onclick = openMerk;
    $("merkX").onclick = () => $("merk").classList.remove("open");
    $("merk").onclick = (e) => { if (e.target === $("merk")) $("merk").classList.remove("open"); };

    function startGame(pool) {
      if (pool && !pool.length) pool = null;
      let tasks;
      if (pool) {
        tasks = [];
        while (tasks.length < Math.max(5, Math.min(10, pool.length * 2))) tasks.push(...shuffle([...pool]));
        tasks = tasks.slice(0, Math.max(5, Math.min(10, pool.length * 2)));
      } else {
        const n = Number($("roundsOpt").value);
        store.set("rounds", n);
        tasks = cfg.makeTasks(level, [...topics], n);
      }
      state = { tasks, rounds: tasks.length, round: 0, score: 0, results: [], locked: false, practice: !!pool };
      $("roundMax").textContent = state.rounds;
      $("dots").innerHTML = tasks.map(() => '<div class="dot"></div>').join("");
      show("game");
      nextRound();
    }

    // ---------- Runde ----------
    function nextRound() {
      const t = state.tasks[state.round];
      state.locked = false; state.tries = 0;
      state.maxTries = t.input || t.choices.length > 2 ? 2 : 1;
      $("roundNo").textContent = state.round + 1;
      $("scoreNo").textContent = num(state.score);
      $("feedback").innerHTML = "";
      $("nextBtn").classList.remove("show");
      [...$("dots").children].forEach((d, k) => d.classList.toggle("now", k === state.round));
      $("prompt").innerHTML = t.prompt;
      $("bench").innerHTML = t.show;
      [...$("bench").children].forEach(c => c.classList.add("pop"));
      if (t.input) {
        // Zahleneingabe: Ergebnis steht im Element #entry der Bühne
        state.entry = "";
        $("choices").className = "choices pad";
        $("choices").innerHTML = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "⌫", "0", "✓"]
          .map(k => `<button class="choice${k === "✓" ? " ok" : ""}" data-k="${k}">${k}</button>`).join("");
        [...$("choices").children].forEach(b => b.onclick = () => key(b.dataset.k));
        $("hint").textContent = "Zahl tippen, dann ✓ oder Enter.";
        return;
      }
      $("choices").className = "choices " + (t.style || "words");
      const order = t.keepOrder ? t.choices : shuffle([...t.choices]);
      $("choices").innerHTML = order.map((c, i) => `<button class="choice" data-v="${c.v}" title="Taste ${i + 1}">${c.html}</button>`).join("");
      [...$("choices").children].forEach(b => b.onclick = () => choose(b));
      $("hint").textContent = `Tippen oder Taste 1–${order.length}.`;
    }

    function key(k) {
      if (state.locked) return;
      const ent = $("entry");
      if (k === "✓") return submitInput();
      if (k === "⌫") state.entry = state.entry.slice(0, -1);
      else if (state.entry.length < 3) state.entry = (state.entry + k).replace(/^0+(?=\d)/, "");
      ent.textContent = state.entry || "?";
      ent.classList.toggle("filled", !!state.entry);
    }
    function submitInput() {
      const t = state.tasks[state.round];
      if (!state.entry) return;
      const v = state.entry;
      if (v === String(t.answer)) {
        $("entry").classList.add("right");
        solve(t, state.tries === 0 ? 1 : 0.5, state.tries === 0 ? "g" : "o");
        return;
      }
      state.tries++;
      sfx.bad();
      const why = t.wrongWhy ? t.wrongWhy(v) : "";
      if (state.tries >= state.maxTries) { solve(t, 0, "b", `Du hattest <b>${v}</b>. ` + why); return; }
      $("entry").classList.add("wrong");
      setTimeout(() => { const e = $("entry"); if (e) e.classList.remove("wrong"); }, 400);
      state.entry = ""; $("entry").textContent = "?"; $("entry").classList.remove("filled");
      $("feedback").innerHTML = `<div class="head" style="color:var(--bad)">Noch nicht – ${v} stimmt nicht.</div><div class="sub">${why ? why + " " : ""}Rechne nochmal, ein Versuch noch.</div>`;
    }

    function choose(btn) {
      if (state.locked || btn.disabled) return;
      const t = state.tasks[state.round];
      const v = btn.dataset.v;
      if (v === t.answer) {
        btn.classList.add("right");
        solve(t, state.tries === 0 ? 1 : 0.5, state.tries === 0 ? "g" : "o");
        return;
      }
      state.tries++;
      btn.classList.add("wrong"); btn.disabled = true;
      sfx.bad();
      const why = t.wrongWhy ? t.wrongWhy(v) : "";
      if (state.tries >= state.maxTries) {
        [...$("choices").children].find(b => b.dataset.v === t.answer).classList.add("right");
        solve(t, 0, "b", why);
        return;
      }
      $("feedback").innerHTML = `<div class="head" style="color:var(--bad)">Noch nicht!</div><div class="sub">${why ? why + " " : ""}Ein Versuch noch.</div>`;
    }

    function solve(t, pts, cls, why) {
      state.locked = true;
      state.score += pts;
      [...$("choices").children].forEach(b => { b.disabled = true; if (!b.classList.contains("right")) b.classList.add("dim"); });
      if (t.solved) { $("bench").innerHTML = t.solved; [...$("bench").children].forEach(c => c.classList.add("pop")); }
      const head = cls === "g" ? pick(["Richtig! 🎉", "Super!", "Genau!", "Klasse!", "Stark!"]) : cls === "o" ? "Im zweiten Versuch!" : "So ist es richtig:";
      const color = cls === "g" ? "var(--good)" : cls === "o" ? "var(--ok)" : "var(--bad)";
      $("feedback").innerHTML = `<div class="head" style="color:${color}">${head} <span style="color:var(--accent)">+${num(pts)}</span></div>
        <div class="sub">${why && cls === "b" ? why + "<br>" : ""}${t.tip || ""}</div>`;
      $("scoreNo").textContent = num(state.score);
      const dot = $("dots").children[state.round];
      dot.classList.remove("now"); dot.classList.add(cls);
      (cls === "g" ? sfx.good : cls === "o" ? sfx.ok : () => {})();
      state.results.push({ t, pts, cls });
      const nb = $("nextBtn");
      nb.textContent = state.round + 1 >= state.rounds ? "Ergebnis ansehen" : "Weiter →";
      nb.classList.add("show");
      $("hint").textContent = "Mit Enter geht's weiter.";
      setTimeout(() => nb.focus({ preventScroll: true }), 30);
    }

    function advance() {
      if (!state || !state.locked) return;
      state.round++;
      if (state.round >= state.rounds) finish(); else nextRound();
    }
    $("nextBtn").onclick = advance;
    document.addEventListener("keydown", e => {
      if (e.key === "Escape") $("merk").classList.remove("open");
      if ($("game").style.display !== "flex" || $("merk").classList.contains("open")) return;
      const t = state && state.tasks[state.round];
      if (t && t.input && !state.locked) {
        if (/^[0-9]$/.test(e.key)) key(e.key);
        else if (e.key === "Backspace") { e.preventDefault(); key("⌫"); }
        else if (e.key === "Enter") { e.preventDefault(); submitInput(); }
        return;
      }
      if (e.key === "Enter") { e.preventDefault(); advance(); }
      else if (!state.locked && /^[1-9]$/.test(e.key)) {
        const b = $("choices").children[Number(e.key) - 1];
        if (b) choose(b);
      }
    });

    // ---------- Ende ----------
    function finish() {
      const pct = Math.round(state.score / state.rounds * 100);
      const stars = pct >= 90 ? 3 : pct >= 70 ? 2 : pct >= 45 ? 1 : 0;
      $("endTitle").textContent = (cfg.endTitles || ["Weiter üben!", "Gut gemacht!", "Super!", "Profi!"])[stars];
      $("stars").innerHTML = [0, 1, 2].map(k => `<span class="${k < stars ? "" : "off"}">⭐</span>`).join("");
      $("endScore").textContent = num(state.score);
      $("endMax").textContent = state.rounds;
      const name = LEVEL_NAMES[level];
      if (!state.practice) {
        const key = "best:" + level, best = store.get(key, null);
        if (!best || pct > best.pct) {
          store.set(key, { pct, date: new Date().toISOString().slice(0, 10) });
          $("newBest").textContent = best ? `Neuer Rekord auf „${name}“! (vorher ${best.pct} %)` : `Erster Rekord auf „${name}“: ${pct} %`;
        } else $("newBest").textContent = `Rekord auf „${name}“: ${best.pct} %`;
      } else $("newBest").textContent = "Fehler geübt – das zählt nicht für den Rekord.";
      Bestenliste.offer($("bestenliste"), { level, pct, detail: `${num(state.score)} von ${state.rounds} Punkten`, practice: state.practice });
      $("recap").innerHTML = state.results.map(r => {
        const d = r.cls === "g" ? "gleich richtig" : r.cls === "o" ? "im zweiten Versuch" : "nicht geschafft";
        return `<div class="rc ${r.cls}"><div class="w">${r.t.recap}</div><div class="d">${d}</div></div>`;
      }).join("");
      $("practiceBtn").style.display = state.results.some(r => r.cls !== "g") ? "" : "none";
      show("end");
      sfx.end();
      if (stars >= 2) confetti(stars * 50);
    }
    function practicePool() {
      const seen = new Set();
      return state.results.filter(r => r.cls !== "g" && !seen.has(r.t.key) && seen.add(r.t.key)).map(r => r.t);
    }
    function confetti(n) {
      const colors = ["#f25c54", "#f7b32b", "#4cc9f0", "#7b5cff", "#2ec27e", "#ff70a6"];
      for (let k = 0; k < n; k++) {
        const c = document.createElement("div");
        c.className = "confetti";
        c.style.left = Math.random() * 100 + "vw";
        c.style.background = colors[k % colors.length];
        c.style.setProperty("--dx", (Math.random() * 200 - 100) + "px");
        c.style.setProperty("--rot", (Math.random() * 900 - 450) + "deg");
        c.style.animationDuration = (1.4 + Math.random() * 1.6) + "s";
        c.style.animationDelay = (Math.random() * .3) + "s";
        document.body.appendChild(c);
        setTimeout(() => c.remove(), 3600);
      }
    }

    $("playBtn").onclick = () => startGame();
    $("againBtn").onclick = () => startGame();
    $("practiceBtn").onclick = () => startGame(practicePool());
    $("menuBtn").onclick = () => { paintLevels(); show("start"); };
    $("homeBtn").onclick = () => { state = null; paintLevels(); show("start"); };
    Bestenliste.init({ game: cfg.game, levels: LEVEL_NAMES });
    $("hsBtn").onclick = () => Bestenliste.open(level);
  }

  // Hilfen für die Spiele
  // Zieht n Einträge, möglichst gleichmäßig aus mehreren Töpfen, ohne Wiederholung, solange es geht.
  function draw(pools, n) {
    pools = pools.filter(p => p.length);
    const bags = pools.map(p => shuffle([...p]));
    const out = [];
    let k = 0;
    while (out.length < n && pools.length) {
      const i = k++ % pools.length;
      if (!bags[i].length) bags[i] = shuffle([...pools[i]]);
      out.push(bags[i].pop());
    }
    return shuffle(out);
  }

  window.Quiz = { create, shuffle, pick, draw };
})();
