// Zeitspiele (Mathe-Profi): So viele Aufgaben wie möglich, bevor die Zeit abläuft.
// Antwort über das Zahlenfeld oder die Tastatur. Nutzt das Aussehen aus quiz.css.
//
//   Blitz.create({
//     game: "einmaleins", back: "k4-mathe",
//     title: "Einmaleins-<span>Blitz</span> ⏱️", heading: "…", intro: "…",
//     levels: [{ id, name, desc, sterne: [10, 18, 26], sekunden: 60 }],   // sterne: ab so vielen richtigen 1, 2, 3 Sterne
//     make(levelId) → { frage: "7 · 8", antwort: 56, weg?: "7 · 8 = 56" },
//       statt „frage = ?“ geht auch vor/nach um die Lücke: { vor: "365 + ", nach: " = 1000", text: "365 + 635 = 1000" }
//     merk: "<h4>…</h4>…"
//   });
//
// Gezählt werden die richtigen Antworten. Bei einem Fehler steht kurz die
// richtige Lösung da – das kostet Zeit, aber keine Punkte.
(() => {
  const $ = (id) => document.getElementById(id);
  const pick = (a) => a[Math.floor(Math.random() * a.length)];
  const rnd = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
  // 45000 → „45 000“ (schmales Leerzeichen), wie im Heft
  const zahl = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, " ");

  function create(cfg) {
    const store = {
      get(k, d) { try { const v = localStorage.getItem(cfg.game + ":" + k); return v === null ? d : JSON.parse(v); } catch { return d; } },
      set(k, v) { try { localStorage.setItem(cfg.game + ":" + k, JSON.stringify(v)); } catch {} }
    };
    const LEVEL = Object.fromEntries(cfg.levels.map(l => [l.id, l]));
    const LEVEL_NAMES = Object.fromEntries(cfg.levels.map(l => [l.id, l.name]));

    document.body.innerHTML = `
<div class="wrap">
  <header>
    <h1>${cfg.title}</h1>
    <div class="tools">
      <a class="icon-btn" href="../index.html#${cfg.back || "alle"}" title="Zurück zur Übersicht aller Minispiele">← Übersicht</a>
      <button class="icon-btn" id="merkBtn" title="Merkkasten">📒 Merken</button>
      <button class="icon-btn" id="hsBtn" title="Bestenliste">🏆</button>
      <button class="icon-btn" id="soundBtn" title="Ton an/aus">🔊</button>
      <button class="icon-btn" id="homeBtn" title="Zum Start">⌂ Start</button>
    </div>
  </header>
  <section id="start" class="card">
    <h2>${cfg.heading}</h2>
    <p>${cfg.intro}</p>
    <div class="levels" id="levels">${cfg.levels.map(l => `<button class="level" data-level="${l.id}"><b>${l.name}</b><small>${l.desc}</small><small class="zeit">⏱️ ${l.sekunden || 60} Sekunden · ⭐ ab ${l.sterne[0]}</small><div class="best"></div></button>`).join("")}</div>
    <button class="big-btn" id="playBtn">Los geht's! ⏱️</button>
    <div class="options"><button class="ghost-btn" id="merkBtn2" style="padding:6px 14px; font-size:15px">📒 Merkkasten ansehen</button></div>
  </section>
  <section id="countdown" class="card"><div class="drei" id="drei">3</div></section>
  <section id="game">
    <div class="hud">
      <div class="pill">⏱️ <em id="zeit">60</em> s</div>
      <div class="zeitbalken"><div id="balken"></div></div>
      <div class="pill">✅ <em id="richtig">0</em></div>
      <div class="pill serie" id="serie"></div>
    </div>
    <div class="card">
      <div class="stage">
        <div class="bench"><div class="calc" id="aufgabe"></div></div>
        <div class="feedback" id="feedback"></div>
        <div class="choices pad" id="pad"></div>
      </div>
    </div>
  </section>
  <section id="end" class="card">
    <h2 id="endTitle">Zeit um!</h2>
    <div class="stars" id="stars"></div>
    <div class="total"><b id="endScore">0</b> richtig <span id="endInfo"></span></div>
    <div class="newbest" id="newBest"></div>
    <div id="bestenliste"></div>
    <div class="recap" id="recap"></div>
    <div class="end-actions">
      <button class="big-btn" id="againBtn">Nochmal ⏱️</button>
      <button class="ghost-btn" id="menuBtn">Anderes Level</button>
    </div>
  </section>
</div>
<div class="modal" id="merk"><div class="card"><button class="icon-btn x" id="merkX">✕</button><h3>📒 Merkkasten</h3>${cfg.merk}</div></div>`;

    const css = document.createElement("style");
    css.textContent = `
      #countdown { display: none; text-align: center; }
      .drei { font-size: clamp(90px, 22vw, 180px); font-weight: 700; color: var(--accent); animation: pop .5s; }
      .level .zeit { margin-top: 6px; color: var(--accent); font-weight: 600; }
      .zeitbalken { flex: 1; min-width: 120px; height: 14px; background: var(--line); border-radius: 999px; overflow: hidden; }
      .zeitbalken div { height: 100%; width: 100%; background: var(--good); border-radius: 999px; transition: width .25s linear, background .3s; }
      .zeitbalken div.knapp { background: var(--bad); }
      .serie { min-width: 64px; text-align: center; }
      .serie:empty { visibility: hidden; }
      #aufgabe.richtig { color: var(--good); }
      #aufgabe .gap.wrong { color: var(--bad); border-color: var(--bad); }
      .choices.pad .choice.del { font-size: 24px; }
      .feedback { min-height: 44px; }
      .feedback .head { font-size: 22px; }
      .rc .w { font-variant-numeric: tabular-nums; }`;
    document.head.appendChild(css);

    // ---------- Ton ----------
    let ac = null, soundOn = store.get("sound", true);
    const paintSound = () => $("soundBtn").textContent = soundOn ? "🔊" : "🔇";
    paintSound();
    $("soundBtn").onclick = () => { soundOn = !soundOn; store.set("sound", soundOn); paintSound(); };
    function tone(freq, start, dur, type = "triangle", vol = .16) {
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
      good(serie) { tone(523 + Math.min(serie, 12) * 30, 0, .14); tone(784 + Math.min(serie, 12) * 30, .06, .16); },
      bad() { tone(220, 0, .25, "sawtooth", .07); },
      tick() { tone(1200, 0, .05, "square", .05); },
      end() { [392, 523, 659, 784].forEach((f, i) => tone(f, i * .12, .3)); }
    };

    // ---------- Start ----------
    let level = store.get("level", cfg.levels[0].id);
    if (!LEVEL[level]) level = cfg.levels[0].id;
    const levelBtns = [...document.querySelectorAll(".level")];
    function paintLevels() {
      levelBtns.forEach(b => {
        b.classList.toggle("sel", b.dataset.level === level);
        const best = store.get("best:" + b.dataset.level, null);
        b.querySelector(".best").textContent = best ? `Rekord: ${best.n} richtig` : "";
      });
    }
    levelBtns.forEach(b => b.onclick = () => { level = b.dataset.level; store.set("level", level); paintLevels(); });
    paintLevels();

    function show(id) { ["start", "countdown", "game", "end"].forEach(s => $(s).style.display = s === id ? (s === "game" ? "flex" : "block") : "none"); }
    const openMerk = () => $("merk").classList.add("open");
    $("merkBtn").onclick = openMerk; $("merkBtn2").onclick = openMerk;
    $("merkX").onclick = () => $("merk").classList.remove("open");
    $("merk").onclick = (e) => { if (e.target === $("merk")) $("merk").classList.remove("open"); };

    // ---------- Zahlenfeld ----------
    $("pad").innerHTML = ["7", "8", "9", "4", "5", "6", "1", "2", "3", "⌫", "0", "✓"].map(k =>
      `<button class="choice${k === "✓" ? " ok" : k === "⌫" ? " del" : ""}" data-k="${k}">${k}</button>`).join("");
    $("pad").querySelectorAll(".choice").forEach(b => b.addEventListener("pointerdown", (e) => { e.preventDefault(); taste(b.dataset.k); }));

    let st = null, timer = null, cdTimer = null;

    function neueAufgabe() {
      let a, k = 0;
      do { a = cfg.make(level); k++; } while (st.letzte.includes(a.frage ?? a.vor + a.nach) && k < 20);
      st.letzte = [...st.letzte.slice(-6), a.frage ?? a.vor + a.nach];
      if (a.vor === undefined) { a.vor = a.frage + " = "; a.nach = ""; }
      if (!a.text) a.text = a.vor + `<b>${zahl(a.antwort)}</b>` + a.nach;
      st.aufgabe = a; st.eingabe = ""; st.sperre = false;
      malen();
    }
    function malen(klasse) {
      const e = st.eingabe ? zahl(st.eingabe) : "?";
      $("aufgabe").className = "calc" + (klasse === "richtig" ? " richtig" : "");
      $("aufgabe").innerHTML = `${st.aufgabe.vor}<span class="gap${st.eingabe ? " filled" : ""}${klasse === "falsch" ? " wrong" : ""}" id="entry">${e}</span>${st.aufgabe.nach}`;
    }
    function taste(k) {
      if (!st || st.sperre || !st.laeuft) return;
      if (k === "⌫") st.eingabe = st.eingabe.slice(0, -1);
      else if (k === "✓") return pruefen();
      else if (/^\d$/.test(k) && st.eingabe.length < 8) st.eingabe = (st.eingabe === "0" ? "" : st.eingabe) + k;
      malen();
      // Automatisch weiter, sobald die Zahl stimmt (spart das ✓ – Profis sind schnell)
      if (Number(st.eingabe) === st.aufgabe.antwort && String(st.aufgabe.antwort).length === st.eingabe.length) pruefen();
    }
    function pruefen() {
      if (!st.eingabe) return;
      const a = st.aufgabe, v = Number(st.eingabe);
      st.versuche++;
      if (v === a.antwort) {
        st.richtig++; st.serie++; st.besteSerie = Math.max(st.besteSerie, st.serie);
        sfx.good(st.serie);
        $("richtig").textContent = st.richtig;
        $("serie").textContent = st.serie >= 3 ? `🔥 ${st.serie}` : "";
        $("feedback").innerHTML = "";
        st.sperre = true;
        malen("richtig");
        setTimeout(() => { if (st.laeuft) neueAufgabe(); }, 180);
      } else {
        st.serie = 0; $("serie").textContent = "";
        sfx.bad();
        st.fehler.push({ ...a, falsch: v });
        st.sperre = true;
        malen("falsch");
        $("feedback").innerHTML = `<div class="head" style="color:var(--bad)">Richtig wäre ${zahl(a.antwort)}</div>${a.weg ? `<div class="sub">${a.weg}</div>` : ""}`;
        setTimeout(() => { if (st.laeuft) { $("feedback").innerHTML = ""; neueAufgabe(); } }, a.weg ? 2200 : 1400);
      }
    }
    document.addEventListener("keydown", (e) => {
      if ($("merk").classList.contains("open") || document.activeElement?.tagName === "INPUT") return;
      if (/^\d$/.test(e.key)) taste(e.key);
      else if (e.key === "Backspace") { e.preventDefault(); taste("⌫"); }
      else if (e.key === "Enter") { e.preventDefault(); if (st?.laeuft) taste("✓"); else if ($("start").style.display !== "none") starten(); }
    });

    // ---------- Ablauf ----------
    function starten() {
      clearInterval(timer); clearInterval(cdTimer);
      show("countdown");
      let n = 3; $("drei").textContent = n; sfx.tick();
      cdTimer = setInterval(() => {
        n--;
        if (n > 0) { $("drei").textContent = n; $("drei").style.animation = "none"; void $("drei").offsetWidth; $("drei").style.animation = ""; sfx.tick(); }
        else { clearInterval(cdTimer); los(); }
      }, 700);
    }
    function los() {
      const L = LEVEL[level], dauer = (L.sekunden || 60) * 1000;
      st = { richtig: 0, versuche: 0, serie: 0, besteSerie: 0, fehler: [], letzte: [], laeuft: true, ende: Date.now() + dauer, dauer };
      $("richtig").textContent = "0"; $("serie").textContent = ""; $("feedback").innerHTML = "";
      show("game");
      if (window.MiniKonto) MiniKonto.start();
      neueAufgabe();
      const tick = () => {
        const rest = Math.max(0, st.ende - Date.now());
        $("zeit").textContent = Math.ceil(rest / 1000);
        $("balken").style.width = (rest / st.dauer * 100) + "%";
        $("balken").classList.toggle("knapp", rest < 10000);
        if (rest <= 0) fertig();
      };
      tick(); timer = setInterval(tick, 200);
    }
    function fertig() {
      clearInterval(timer);
      st.laeuft = false;
      sfx.end();
      const L = LEVEL[level], n = st.richtig;
      const sterne = L.sterne.filter(s => n >= s).length;
      $("endTitle").textContent = ["Weiter üben!", "Gut gemacht!", "Super schnell!", "Mathe-Profi! 🏆"][sterne];
      $("stars").innerHTML = [0, 1, 2].map(k => `<span class="${k < sterne ? "" : "off"}">⭐</span>`).join("");
      $("endScore").textContent = n;
      $("endInfo").textContent = `in ${L.sekunden || 60} Sekunden · ${st.versuche - n} Fehler${st.besteSerie >= 3 ? ` · längste Serie 🔥 ${st.besteSerie}` : ""}`;
      const key = "best:" + level, best = store.get(key, null);
      if (!best || n > best.n) {
        store.set(key, { n, date: new Date().toISOString().slice(0, 10) });
        $("newBest").textContent = best ? `Neuer Rekord auf „${L.name}“! (vorher ${best.n})` : `Erster Rekord auf „${L.name}“: ${n} richtig`;
      } else $("newBest").textContent = `Rekord auf „${L.name}“: ${best.n} richtig · ${L.sterne.find(s => s > n) ? `für den nächsten Stern: ${L.sterne.find(s => s > n)} richtig` : ""}`;
      Bestenliste.offer($("bestenliste"), { level, pct: n, detail: `${st.versuche - n} Fehler`, practice: false,
        sterne, punkte: n, richtig: n, von: Math.max(1, st.versuche) });
      $("recap").innerHTML = st.fehler.length
        ? `<div class="rc b" style="grid-column:1/-1"><div class="d">Diese Aufgaben üben:</div></div>` + st.fehler.slice(0, 12).map(f =>
          `<div class="rc b"><div class="w">${f.text}</div><div class="d">du: ${zahl(f.falsch)}${f.weg ? ` · ${f.weg}` : ""}</div></div>`).join("")
        : `<div class="rc g" style="grid-column:1/-1"><div class="w">Kein einziger Fehler! 🎉</div></div>`;
      show("end");
      paintLevels();
      if (sterne >= 2) konfetti(sterne * 50);
    }
    function konfetti(n) {
      const farben = ["#6c4cf1", "#1fa463", "#e8a317", "#e2513b", "#2f7fe0", "#d6336c"];
      for (let i = 0; i < n; i++) {
        const c = document.createElement("div");
        c.className = "confetti";
        c.style.left = Math.random() * 100 + "vw";
        c.style.background = pick(farben);
        c.style.setProperty("--dx", (Math.random() * 200 - 100) + "px");
        c.style.setProperty("--rot", Math.random() * 720 + "deg");
        c.style.animationDuration = 1.6 + Math.random() * 1.6 + "s";
        document.body.appendChild(c);
        setTimeout(() => c.remove(), 3400);
      }
    }
    function zumStart() { clearInterval(timer); clearInterval(cdTimer); if (st) st.laeuft = false; show("start"); paintLevels(); }

    $("playBtn").onclick = starten;
    $("againBtn").onclick = starten;
    $("menuBtn").onclick = zumStart;
    $("homeBtn").onclick = zumStart;
    $("hsBtn").onclick = () => Bestenliste.open(level);
    Bestenliste.init({ game: cfg.game, levels: LEVEL_NAMES, einheit: "richtig" });
    show("start");
  }

  window.Blitz = { create, rnd, pick, zahl };
})();
