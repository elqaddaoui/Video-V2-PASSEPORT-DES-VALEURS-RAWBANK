/* ============================================================
   RAWBANK – Passeport des Valeurs | Film engine
   - One master GSAP timeline, driven by the voice-over clock
   - Scenes register themselves with Film.addScene({...})
   - To add a scene: create js/scenes/sceneNN.js, add its markup
     to index.html (<section class="scene" id="sNN">), its css to
     css/scenes.css, and a <script> tag. Nothing here changes.
   ============================================================ */
(function () {
  const W = 1920, H = 1080;
  const Film = (window.Film = {
    scenes: [],
    master: null,
    playing: false,
    // Voice-over script (approved wording from the storyboard document).
    // Cue times (s) follow the pauses of the supplied recording.
    captions: [],
    markers: [],            // {t, label, cut}
    previewEnd: 0,          // how far the preview plays (voice tail included)
    sfxOn: true,
  });

  Film.addScene = (s) => Film.scenes.push(s);
  Film.addCaptions = (arr) => (Film.captions = Film.captions.concat(arr));
  Film.addMarkers = (arr) => (Film.markers = Film.markers.concat(arr));

  /* ---------------- tiny WebAudio SFX kit (preview only) ---------------- */
  const SFX = (Film.sfx = {
    ctx: null, out: null, noise: null,
    init() {
      if (this.ctx) return;
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      this.ctx = new AC();
      this.out = this.ctx.createGain();
      this.out.gain.value = 0.45;
      // safety limiter: no effect can ever spike over the voice-over
      const lim = this.ctx.createDynamicsCompressor();
      lim.threshold.value = -20; lim.knee.value = 12; lim.ratio.value = 14; lim.attack.value = 0.003; lim.release.value = 0.2;
      this.out.connect(lim); lim.connect(this.ctx.destination);
      const len = this.ctx.sampleRate * 2, b = this.ctx.createBuffer(1, len, this.ctx.sampleRate), d = b.getChannelData(0);
      for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
      this.noise = b;
    },
    _env(g, t, a, peak, d) {
      g.gain.cancelScheduledValues(t); g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(peak, t + a);
      g.gain.exponentialRampToValueAtTime(0.0001, t + a + d);
    },
    whoosh(dur = 0.9, f0 = 300, f1 = 3200, vol = 0.22) {
      if (!this.ctx || !Film.sfxOn) return;
      const c = this.ctx, t = c.currentTime;
      const s = c.createBufferSource(); s.buffer = this.noise;
      const f = c.createBiquadFilter(); f.type = "bandpass"; f.Q.value = 0.9;
      f.frequency.setValueAtTime(f0, t); f.frequency.exponentialRampToValueAtTime(f1, t + dur);
      const g = c.createGain(); this._env(g, t, dur * 0.45, vol, dur * 0.55);
      s.connect(f).connect(g).connect(this.out); s.start(t, Math.random()); s.stop(t + dur + 0.1);
    },
    shimmer(vol = 0.07, base = 1318) {
      if (!this.ctx || !Film.sfxOn) return;
      const c = this.ctx, t = c.currentTime;
      [1, 1.5, 2, 2.5, 3].forEach((m, i) => {
        const o = c.createOscillator(); o.type = "sine"; o.frequency.value = base * m;
        const g = c.createGain(); this._env(g, t + i * 0.07, 0.01, vol / (1 + i * 0.4), 1.1);
        o.connect(g).connect(this.out); o.start(t + i * 0.07); o.stop(t + i * 0.07 + 1.3);
      });
    },
    thump(vol = 0.5) {
      if (!this.ctx || !Film.sfxOn) return;
      vol = Math.min(Math.max(+vol || 0, 0), 0.5);
      const c = this.ctx, t = c.currentTime, o = c.createOscillator(); o.type = "sine";
      o.frequency.setValueAtTime(110, t); o.frequency.exponentialRampToValueAtTime(42, t + 0.35);
      const g = c.createGain(); this._env(g, t, 0.008, vol, 0.5);
      o.connect(g).connect(this.out); o.start(t); o.stop(t + 0.6);
    },
    bloom(vol = 0.05, base = 784) {   // soft warm swell + two gentle chimes (for the checkmark)
      if (!this.ctx || !Film.sfxOn) return;
      vol = Math.min(vol, 0.08);
      const c = this.ctx, t = c.currentTime;
      [[1, 0], [1.5, 0.09], [2, 0.18]].forEach(([m, dl]) => {
        const o = c.createOscillator(); o.type = "sine"; o.frequency.value = base * m;
        const g = c.createGain(); this._env(g, t + dl, 0.12, vol / (m * 0.9), 1.3);
        o.connect(g).connect(this.out); o.start(t + dl); o.stop(t + dl + 1.5);
      });
    },
    paper(dur = 0.5, vol = 0.18) {
      if (!this.ctx || !Film.sfxOn) return;
      const c = this.ctx, t = c.currentTime, s = c.createBufferSource(); s.buffer = this.noise;
      const f = c.createBiquadFilter(); f.type = "highpass"; f.frequency.value = 2600;
      const g = c.createGain(); this._env(g, t, dur * 0.3, vol, dur * 0.7);
      s.connect(f).connect(g).connect(this.out); s.start(t, Math.random()); s.stop(t + dur + 0.1);
    },
    scribble(dur = 0.5, vol = 0.07) {
      if (!this.ctx || !Film.sfxOn) return;
      const c = this.ctx, t = c.currentTime, s = c.createBufferSource(); s.buffer = this.noise;
      const f = c.createBiquadFilter(); f.type = "bandpass"; f.frequency.value = 3800; f.Q.value = 2.2;
      const g = c.createGain(); g.gain.value = 0; const lfo = c.createOscillator(); lfo.frequency.value = 23;
      const lg = c.createGain(); lg.gain.value = vol * 0.5; lfo.connect(lg).connect(g.gain);
      const e = c.createGain(); this._env(e, t, 0.04, 1, dur);
      s.connect(f).connect(g).connect(e).connect(this.out); s.start(t, Math.random()); lfo.start(t); s.stop(t + dur + 0.1); lfo.stop(t + dur + 0.1);
    },
    ping(freq = 1760, vol = 0.07) {
      if (!this.ctx || !Film.sfxOn) return;
      const c = this.ctx, t = c.currentTime, o = c.createOscillator(); o.type = "triangle"; o.frequency.value = freq;
      const g = c.createGain(); this._env(g, t, 0.005, vol, 0.45);
      o.connect(g).connect(this.out); o.start(t); o.stop(t + 0.6);
    },
  });
  // helper used by scenes: play an SFX only during live playback
  Film.fx = (name, ...args) => () => { if (Film.playing && SFX[name]) SFX[name](...args); };

  /* ---------------- stage scaling ---------------- */
  const stage = document.getElementById("stage");
  function fit() {
    const s = Math.min(window.innerWidth / W, window.innerHeight / H);
    stage.style.transform = "scale(" + s + ")";
  }
  window.addEventListener("resize", fit); fit();

  /* ---------------- init (called after all scenes registered) ---------------- */
  Film.init = function () {
    const tl = (Film.master = gsap.timeline({ paused: true, defaults: { ease: "power2.out" } }));
    const sorted = Film.scenes.slice().sort((a, b) => a.start - b.start);
    sorted.forEach((s, i) => {
      // every scene builds on ONE shared master timeline in absolute film time.
      // s.at   = where its sub-timeline is inserted (default s.start; scenes 2+ use 0 and author in absolute time)
      // s.show / s.hide = when its <section> becomes visible / hidden (entry transitions need show < start)
      const sub = gsap.timeline({ defaults: { ease: "power2.out" } });
      if (s.build) s.build(sub, s);
      tl.add(sub, s.at !== undefined ? s.at : s.start);
      if (!s.el) return;
      const el = document.querySelector(s.el);
      gsap.set(el, { visibility: "hidden" });
      const next = sorted.slice(i + 1).find((n) => n.el);
      tl.set(el, { visibility: "visible" }, s.show !== undefined ? s.show : s.start);
      tl.set(el, { visibility: "hidden" }, s.hide !== undefined ? s.hide : next ? next.start : s.end);
    });
    Film.previewEnd = Film.previewEnd || Math.max(...sorted.map((s) => s.end));
    tl.set({}, {}, Film.previewEnd);   // pad timeline to the preview length (do not use tl.duration(): it rescales)
    tl.eventCallback("onUpdate", () => {
      const t = tl.time();
      sorted.forEach((s) => s.onFrame && s.onFrame(t, s));
    });
    Film.sorted = sorted;
    bindUI();
    Film.seek(0);
  };

  /* ---------------- transport ---------------- */
  const vo = document.getElementById("vo");
  let lastAT = 0, lastPerf = 0, lastRaw = -1, tail = false, tailBase = 0, tailPerf = 0;
  // the voice-over (55.97 s) is shorter than the film (end card to 59.32 s): after it ends, the clock runs on performance time
  function nowT() {
    const raw = vo.currentTime, p = performance.now();
    if (tail) return tailBase + (p - tailPerf) / 1000;
    if (vo.ended || (vo.duration && raw >= vo.duration - 0.03)) { tail = true; tailBase = Math.max(lastAT, raw); tailPerf = p; return tailBase; }
    if (raw !== lastRaw) { lastRaw = raw; lastAT = raw; lastPerf = p; }
    return lastAT + Math.min((p - lastPerf) / 1000, 0.12);
  }
  Film.seek = (t, silent = true) => {
    t = Math.max(0, Math.min(Film.previewEnd, t));
    try { vo.currentTime = t; } catch (e) {}
    lastRaw = -1; lastAT = t; lastPerf = performance.now(); tail = false;
    Film.master.time(t, silent);
    updateUI(t);
  };
  Film.play = () => {
    SFX.init(); if (SFX.ctx && SFX.ctx.state === "suspended") SFX.ctx.resume();
    if (Film.master.time() >= Film.previewEnd - 0.05) Film.seek(0);
    Film.playing = true; lastRaw = -1;
    if (!(vo.duration && vo.currentTime >= vo.duration - 0.03)) { const p = vo.play(); if (p && p.catch) p.catch(() => {}); }
    document.getElementById("overlay").classList.add("hide");
    document.getElementById("btnPlay").textContent = "❚❚ Pause";
  };
  Film.pause = () => {
    Film.playing = false; vo.pause();
    document.getElementById("btnPlay").textContent = "▶ Play";
  };
  Film.toggle = () => (Film.playing ? Film.pause() : Film.play());

  gsap.ticker.add(() => {
    if (!Film.playing) return;
    let t = nowT();
    if (t >= Film.previewEnd) {
      Film.master.time(Film.previewEnd, false); updateUI(Film.previewEnd);
      Film.pause(); showEnd(); return;
    }
    Film.master.time(t, false);
    updateUI(t);
  });

  function showEnd() {
    const o = document.getElementById("overlay");
    o.querySelector("h1").textContent = "End of preview";
    o.querySelector("p").textContent = "Click to replay.";
    o.classList.remove("hide");
  }

  /* ---------------- UI ---------------- */
  const $ = (id) => document.getElementById(id);
  const fmt = (t) => { const m = Math.floor(t / 60), s = t - m * 60; return String(m).padStart(2, "0") + ":" + s.toFixed(2).padStart(5, "0"); };
  let capIdx = -2;
  function updateUI(t) {
    $("time").textContent = fmt(t) + " / " + fmt(Film.previewEnd);
    const pct = (t / Film.previewEnd) * 100;
    $("fill").style.width = pct + "%"; $("knob").style.left = pct + "%";
    // captions (approved script wording)
    const c = Film.captions.findIndex((k) => t >= k.t0 && t < k.t1);
    if (c !== capIdx) {
      capIdx = c; const sp = $("cc").firstElementChild;
      if (c >= 0) { sp.textContent = Film.captions[c].text; sp.classList.add("show"); } else sp.classList.remove("show");
    }
  }
  // used by the offline exporter (js/export.js): jump to an exact film time and refresh DOM + captions
  Film.renderAt = (t) => { Film.master.time(t, false); updateUI(t); };
  function bindUI() {
    const bar = $("bar");
    Film.markers.forEach((m) => {
      const d = document.createElement("div"); d.className = "mk" + (m.cut ? " cut" : "");
      d.style.left = (m.t / Film.previewEnd) * 100 + "%"; d.innerHTML = "<i>" + m.label + "</i>"; bar.appendChild(d);
    });
    let drag = false;
    const pos = (e) => { const r = bar.getBoundingClientRect(); return ((e.clientX - r.left) / r.width) * Film.previewEnd; };
    bar.addEventListener("pointerdown", (e) => { drag = true; bar.setPointerCapture(e.pointerId); Film.seek(pos(e)); });
    bar.addEventListener("pointermove", (e) => { if (drag) Film.seek(pos(e)); });
    bar.addEventListener("pointerup", () => (drag = false));
    $("btnPlay").onclick = Film.toggle;
    $("btnRestart").onclick = () => { Film.seek(0); Film.play(); };
    $("btnCC").onclick = (e) => { $("cc").classList.toggle("on"); e.currentTarget.classList.toggle("active"); };
    $("btnSfx").onclick = (e) => { Film.sfxOn = !Film.sfxOn; e.currentTarget.classList.toggle("active", Film.sfxOn); };
    $("btnFs").onclick = () => { if (document.fullscreenElement) document.exitFullscreen(); else document.documentElement.requestFullscreen(); };
    $("overlay").onclick = () => { if (Film.master.time() >= Film.previewEnd - 0.05) Film.seek(0); Film.play(); };
    window.addEventListener("keydown", (e) => {
      if (e.code === "Space") { e.preventDefault(); Film.toggle(); }
      if (e.code === "ArrowRight") Film.seek(Film.master.time() + 1);
      if (e.code === "ArrowLeft") Film.seek(Film.master.time() - 1);
      if (e.key === "c") $("btnCC").click();
      if (e.key === "f") $("btnFs").click();
    });
    let idle; const chrome = $("chrome");
    const wake = () => { chrome.classList.remove("idle"); clearTimeout(idle); idle = setTimeout(() => Film.playing && chrome.classList.add("idle"), 2400); };
    window.addEventListener("pointermove", wake); wake();
  }

  // capture mode:  index.html?capture&t=4.2  (used for stills / QA)
  const q = new URLSearchParams(location.search);
  if (q.has("capture")) document.documentElement.classList.add("capture");
  Film.captureAt = (t) => { Film.seek(t, true); return t; };
})();
