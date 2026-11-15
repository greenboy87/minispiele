// Anmeldung für die Minispiele – dieselben Konten wie im music-trainer
// (Cloudflare-Worker music-trainer, siehe music-trainer/cloudflare/worker.js).
//
// Ohne Anmeldung bleibt alles wie vorher: Bestenliste und Rekorde nur im Browser.
// Angemeldete Kinder melden nach jeder Runde ein kleines Ergebnis an den Worker
// (Spielname „mini-…“, Stufe = Nummer des Levels). Was ohne Netz entsteht, wartet
// in einer Liste und geht beim nächsten Mal mit. Gelesen wird nur auf der Seite
// „Mein Stand“ (stand/), und dort nur die eigenen Runden der Minispiele.
//
// Die Anmeldung liegt unter demselben Schlüssel wie beim music-trainer (gleiche
// Adresse greenboy87.github.io): Wer dort angemeldet ist, ist es hier auch.
(() => {
  const API = "https://music-trainer.tomgruenig87.workers.dev";
  const KEY = "musiktrainer-konto";          // { token, id, name, klasse, … } – geteilt mit dem music-trainer
  const OFFEN_KEY = "minispiele-offen";       // noch nicht gesendete Runden
  const PRAEFIX = "mini-";

  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); } catch { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} },
    del(k) { try { localStorage.removeItem(k); } catch {} }
  };
  const jetzt = () => Math.floor(Date.now() / 1000);

  // Spielname für den Worker: nur a–z und Bindestrich (rechnen100 → mini-rechnen)
  const spielId = (game) => PRAEFIX + String(game).toLowerCase().replace(/[^a-z-]/g, "").slice(0, 25);

  let start = Date.now(), sendet = false;

  const Konto = {
    API, PRAEFIX, spielId,
    daten() { const d = store.get(KEY, null); return d && d.token ? d : null; },
    angemeldet() { return !!this.daten(); },
    name() { return this.daten()?.name || ""; },

    async anfrage(pfad, { methode = "GET", body, token = this.daten()?.token } = {}) {
      const r = await fetch(this.API + pfad, {
        method: methode,
        headers: { ...(body ? { "Content-Type": "application/json" } : {}), ...(token ? { Authorization: "Bearer " + token } : {}) },
        body: body ? JSON.stringify(body) : undefined
      });
      const d = await r.json().catch(() => ({}));
      if (!r.ok) { const e = new Error(d.fehler || `Fehler ${r.status}`); e.status = r.status; throw e; }
      return d;
    },

    async anmelden(benutzername, passwort) {
      const d = await this.anfrage("/api/anmelden", { methode: "POST", body: { benutzername, passwort }, token: null });
      store.set(KEY, { token: d.token, id: d.id, name: d.name, klasse: d.klasse, benotung: d.benotung || null });
      store.del(OFFEN_KEY);
      return d;
    },

    abmelden() {
      store.del(KEY);
      store.del(OFFEN_KEY);
      store.del("musiktrainer-offen");    // auch die wartenden Runden des music-trainers gehören zum alten Konto
    },

    // Beginn einer Runde (für die Dauer); ohne Aufruf zählt die Zeit seit der letzten Runde
    start() { start = Date.now(); },

    offene() { return store.get(OFFEN_KEY, []); },

    // e: { game, stufe, sterne, punkte, richtig?, von? }
    melden(e) {
      const dauer = Math.min(900, Math.round((Date.now() - start) / 1000));
      start = Date.now();
      if (!this.angemeldet()) return;
      const r = {
        spiel: spielId(e.game), stufe: Math.max(0, Math.min(29, e.stufe | 0)),
        sterne: Math.max(0, Math.min(6, e.sterne | 0)), punkte: Math.max(0, Math.min(10000, Math.round(e.punkte) || 0)),
        dauer, zeit: jetzt()
      };
      if (Number.isInteger(e.richtig) && Number.isInteger(e.von) && e.von > 0) { r.richtig = e.richtig; r.von = e.von; }
      store.set(OFFEN_KEY, this.offene().concat(r).slice(-50));
      this.senden();
    },

    async senden() {
      const liste = this.offene();
      if (!liste.length || !this.angemeldet() || sendet) return;
      sendet = true;
      try {
        await this.anfrage("/api/ergebnisse", { methode: "POST", body: { ergebnisse: liste } });
        store.set(OFFEN_KEY, this.offene().slice(liste.length));
      } catch (e) {
        if (e.status === 401) this.abmelden();
      } finally { sendet = false; }
    },

    // Eigene Runden der Minispiele (neueste zuerst), dazu die noch wartenden
    async verlauf() {
      await this.senden();
      const { verlauf } = await this.anfrage("/api/meinverlauf?praefix=" + PRAEFIX);
      return this.offene().slice().reverse().concat(verlauf || []);
    },

    // Anmeldung über einen Link mit ?u=…&p=… (QR-Kärtchen); danach die Daten aus der Adresse entfernen
    async ausLink() {
      const q = new URLSearchParams(location.search);
      const u = q.get("u"), p = q.get("p");
      if (!u || !p) return null;
      history.replaceState(null, "", location.pathname + location.hash);
      if (this.angemeldet() && this.name().toLowerCase() === u.toLowerCase()) return this.daten();
      try { return await this.anmelden(u, p); } catch (e) { return { fehler: e.message }; }
    }
  };

  window.MiniKonto = Konto;
  // Was beim letzten Mal ohne Netz liegen blieb, gleich nachschicken
  if (Konto.angemeldet() && Konto.offene().length) setTimeout(() => Konto.senden(), 1500);
  window.addEventListener("online", () => Konto.senden());
})();
