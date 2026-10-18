/* ============================================================
   RAWBANK – Passeport des Valeurs | Download / offline renderer
   Renders the film frame-by-frame (not screen-recorded), so the
   result is smooth at any size / frame rate on any machine:
     master timeline @ t  →  DOM snapshot (SVG foreignObject)  →  canvas
     →  WebCodecs VideoEncoder (H.264, VP9 fallback)  →  MP4 (mp4-muxer)
   Audio = the voice-over, re-encoded with AudioEncoder (AAC, Opus fallback).
   Captions: .srt file and/or burned into the picture.
   Public API (also used by tests):  Film.exportVideo({ res, fps, srt, burn, from, to, onProgress, signal })
   ============================================================ */
(function () {
  const W = 1920, H = 1080;
  const RES = { fhd: { w: 1920, h: 1080, label: "Full HD", tag: "1080p" }, qhd: { w: 2560, h: 1440, label: "2K", tag: "1440p" } };
  const BITRATE = { fhd: { 30: 12e6, 60: 18e6 }, qhd: { 30: 20e6, 60: 30e6 } };
  const $ = (id) => document.getElementById(id);
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  /* ---------- resources → data: URLs (cached) ---------- */
  const dataCache = new Map();
  async function toDataURL(url) {
    if (url.startsWith("data:")) return url;
    if (dataCache.has(url)) return dataCache.get(url);
    const p = fetch(url).then((r) => r.blob()).then((b) => new Promise((res) => { const f = new FileReader(); f.onload = () => res(f.result); f.readAsDataURL(b); }));
    dataCache.set(url, p);
    return p;
  }
  async function buildCSS() {
    let css = "";
    for (const sh of Array.from(document.styleSheets)) { try { for (const r of Array.from(sh.cssRules)) css += r.cssText + "\n"; } catch (e) {} }
    const urls = new Set(); css.replace(/url\(\s*["']?([^"')]+)["']?\s*\)/g, (m, u) => { if (!u.startsWith("data:") && !u.startsWith("#")) urls.add(u); return m; });
    for (const u of urls) { const d = await toDataURL(u); css = css.split(u).join(d); }
    return css;
  }

  /* ---------- one frame: DOM → canvas ---------- */
  function makeSnapshotter(css, opts) {
    const stage = $("stage");
    const imgData = new Map();
    return {
      async prepare() {
        for (const im of Array.from(stage.querySelectorAll("img"))) { const s = im.getAttribute("src"); if (s && !imgData.has(s)) imgData.set(s, await toDataURL(im.src)); }
      },
      svg(outW, outH) {
        const clone = stage.cloneNode(true);
        clone.style.transform = "none"; clone.style.position = "relative";
        clone.querySelectorAll("img").forEach((im) => { const s = im.getAttribute("src"); if (imgData.has(s)) im.setAttribute("src", imgData.get(s)); });
        // canvases (dust) are not cloned with their pixels → bake them in
        const src = stage.querySelectorAll("canvas"), dst = clone.querySelectorAll("canvas");
        src.forEach((c, i) => { const im = document.createElement("img"); im.setAttribute("style", c.getAttribute("style") || ""); im.setAttribute("class", c.className); im.id = c.id; im.setAttribute("width", c.width); im.setAttribute("height", c.height); im.setAttribute("src", c.toDataURL("image/png")); dst[i].replaceWith(im); });
        const cc = clone.querySelector("#cc"); if (cc) cc.classList.toggle("on", !!opts.burn);
        const xml = new XMLSerializer().serializeToString(clone);
        return `<svg xmlns="http://www.w3.org/2000/svg" width="${outW}" height="${outH}" viewBox="0 0 ${W} ${H}"><style><![CDATA[${css}]]></style>` +
          `<foreignObject x="0" y="0" width="${W}" height="${H}"><div xmlns="http://www.w3.org/1999/xhtml" style="width:${W}px;height:${H}px;overflow:hidden;font-family:'Figtree',system-ui,sans-serif;color:#FAF6EE;background:#000">${xml}</div></foreignObject></svg>`;
      },
      async draw(ctx, outW, outH) {
        const im = new Image();
        im.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(this.svg(outW, outH));
        await im.decode();
        ctx.drawImage(im, 0, 0, outW, outH);
      },
    };
  }

  /* ---------- captions ---------- */
  const ts = (t) => { const ms = Math.round(t * 1000), h = Math.floor(ms / 3600000), m = Math.floor(ms / 60000) % 60, s = Math.floor(ms / 1000) % 60, x = ms % 1000; const p = (n, l = 2) => String(n).padStart(l, "0"); return `${p(h)}:${p(m)}:${p(s)},${p(x, 3)}`; };
  Film.captionsSRT = (from = 0, to = Infinity) => Film.captions.filter((c) => c.t1 > from && c.t0 < to)
    .map((c, i) => `${i + 1}\n${ts(Math.max(c.t0, from) - from)} --> ${ts(Math.min(c.t1, to) - from)}\n${c.text}\n`).join("\n");

  function save(blob, name) {
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = name; document.body.appendChild(a); a.click();
    setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 4000);
  }

  /* ---------- codecs ---------- */
  async function pickVideo(w, h, fps, bitrate) {
    const tries = [
      { codec: "avc1.640034", muxer: "avc" }, { codec: "avc1.640033", muxer: "avc" }, { codec: "avc1.64002A", muxer: "avc" },
      { codec: "vp09.00.50.08", muxer: "vp9" }, { codec: "vp09.00.40.08", muxer: "vp9" },
    ];
    for (const t of tries) {
      const cfg = { codec: t.codec, width: w, height: h, framerate: fps, bitrate, ...(t.muxer === "avc" ? { avc: { format: "avc" } } : {}) };
      try { const s = await VideoEncoder.isConfigSupported(cfg); if (s.supported) return { cfg, muxer: t.muxer }; } catch (e) {}
    }
    throw new Error("No supported video encoder (WebCodecs) in this browser.");
  }
  async function pickAudio() {
    for (const t of [{ codec: "mp4a.40.2", muxer: "aac" }, { codec: "opus", muxer: "opus" }]) {
      const cfg = { codec: t.codec, sampleRate: 48000, numberOfChannels: 2, bitrate: 160000 };
      try { const s = await AudioEncoder.isConfigSupported(cfg); if (s.supported) return { cfg, muxer: t.muxer }; } catch (e) {}
    }
    return null;
  }
  async function voiceBuffer(duration) {
    const vo = $("vo"); const buf = await (await fetch(vo.currentSrc || vo.src)).arrayBuffer();
    const tmp = new (window.AudioContext || window.webkitAudioContext)();
    const dec = await tmp.decodeAudioData(buf); tmp.close();
    const off = new OfflineAudioContext(2, Math.ceil(duration * 48000), 48000);
    const src = off.createBufferSource(); src.buffer = dec; src.connect(off.destination); src.start(0);
    return off.startRendering();
  }

  /* ---------- the export ---------- */
  Film.exportVideo = async function (o = {}) {
    const R = RES[o.res || "fhd"], fps = o.fps || 30;
    const from = o.from || 0, to = Math.min(o.to || Film.previewEnd, Film.previewEnd), dur = to - from;
    const onP = o.onProgress || (() => {}), sig = o.signal || { aborted: false };
    if (!window.VideoEncoder || !window.Mp4Muxer) throw new Error("This browser has no WebCodecs support (use Chrome, Edge or Safari 16.4+).");
    Film.pause(); const resumeT = Film.master.time();
    const total = Math.round(dur * fps);
    onP({ phase: "Preparing…", pct: 0 });
    const css = await buildCSS();
    const snap = makeSnapshotter(css, o); await snap.prepare();
    const vp = await pickVideo(R.w, R.h, fps, BITRATE[o.res || "fhd"][fps]);
    const ap = await pickAudio();
    const target = new Mp4Muxer.ArrayBufferTarget();
    const muxer = new Mp4Muxer.Muxer({
      target, fastStart: "in-memory", firstTimestampBehavior: "offset",
      video: { codec: vp.muxer, width: R.w, height: R.h, frameRate: fps },
      ...(ap ? { audio: { codec: ap.muxer, numberOfChannels: 2, sampleRate: 48000 } } : {}),
    });
    let err = null;
    const venc = new VideoEncoder({ output: (c, m) => muxer.addVideoChunk(c, m), error: (e) => (err = e) });
    venc.configure(vp.cfg);
    const cv = document.createElement("canvas"); cv.width = R.w; cv.height = R.h; const ctx = cv.getContext("2d");
    const t0 = performance.now();
    try {
      for (let i = 0; i < total; i++) {
        if (sig.aborted) throw new Error("cancelled");
        if (err) throw err;
        const t = from + i / fps;
        Film.renderAt(t);
        ctx.fillStyle = "#0C0B0D"; ctx.fillRect(0, 0, R.w, R.h);
        await snap.draw(ctx, R.w, R.h);
        const vf = new VideoFrame(cv, { timestamp: Math.round((i * 1e6) / fps), duration: Math.round(1e6 / fps) });
        venc.encode(vf, { keyFrame: i % (fps * 2) === 0 }); vf.close();
        while (venc.encodeQueueSize > 6) await sleep(4);
        if (i % 3 === 0) {
          const el = (performance.now() - t0) / 1000, eta = (el / (i + 1)) * (total - i - 1);
          onP({ phase: "Rendering frames", pct: ((i + 1) / total) * 0.94, frame: i + 1, total, eta });
          await sleep(0);
        }
      }
      await venc.flush(); venc.close();
      if (ap) {
        onP({ phase: "Encoding audio…", pct: 0.95 });
        const ab = await voiceBuffer(to); // from t=0 .. to
        const aenc = new AudioEncoder({ output: (c, m) => muxer.addAudioChunk(c, m), error: (e) => (err = e) });
        aenc.configure(ap.cfg);
        const sr = 48000, start = Math.round(from * sr), len = Math.min(ab.length - start, Math.round(dur * sr)), chunk = 4800;
        const L = ab.getChannelData(0), Rr = ab.getChannelData(1);
        for (let p = 0; p < len; p += chunk) {
          const n = Math.min(chunk, len - p), data = new Float32Array(n * 2);
          data.set(L.subarray(start + p, start + p + n), 0); data.set(Rr.subarray(start + p, start + p + n), n);
          const ad = new AudioData({ format: "f32-planar", sampleRate: sr, numberOfFrames: n, numberOfChannels: 2, timestamp: Math.round((p / sr) * 1e6), data });
          aenc.encode(ad); ad.close();
          while (aenc.encodeQueueSize > 20) await sleep(2);
        }
        await aenc.flush(); aenc.close();
      }
      if (err) throw err;
      onP({ phase: "Finishing…", pct: 0.99 });
      muxer.finalize();
      const blob = new Blob([target.buffer], { type: "video/mp4" });
      const base = `RAWBANK_Passeport_des_Valeurs_${R.tag}_${fps}fps`;
      const files = [{ blob, name: base + ".mp4" }];
      if (o.srt) files.push({ blob: new Blob(["\ufeff" + Film.captionsSRT(from, to)], { type: "application/x-subrip" }), name: base + ".srt" });
      onP({ phase: "Done", pct: 1, done: true, files, codec: vp.cfg.codec, audio: ap && ap.cfg.codec });
      if (!o.noSave) files.forEach((f, k) => setTimeout(() => save(f.blob, f.name), k * 600));
      return { files, video: vp.cfg.codec, audio: ap && ap.cfg.codec };
    } finally {
      try { venc.state !== "closed" && venc.close(); } catch (e) {}
      Film.seek(resumeT);
    }
  };

  /* ---------- UI ---------- */
  function ui() {
    const btn = $("btnDl"), panel = $("dlPanel"); if (!btn || !panel) return;
    const sel = (n) => panel.querySelector(`[name=${n}]:checked`).value;
    const bar = $("dlBar"), msg = $("dlMsg"), go = $("dlGo"), cancel = $("dlCancel");
    let ctl = null;
    const toggle = (on) => { panel.classList.toggle("open", on === undefined ? !panel.classList.contains("open") : on); btn.classList.toggle("active", panel.classList.contains("open")); };
    btn.onclick = (e) => { e.stopPropagation(); toggle(); };
    $("dlClose").onclick = () => !ctl && toggle(false);
    // "burn captions" follows the CC toggle by default
    const syncBurn = () => { $("dlBurn").checked = $("cc").classList.contains("on"); };
    btn.addEventListener("click", syncBurn);
    const sizeNote = () => { const r = RES[sel("res")]; $("dlNote").textContent = `${r.w}×${r.h} · ${sel("fps")} fps · H.264 + AAC (.mp4)`; };
    panel.addEventListener("change", sizeNote); sizeNote();
    const setBusy = (b) => { panel.classList.toggle("busy", b); panel.querySelectorAll("input").forEach((i) => (i.disabled = b)); };
    go.onclick = async () => {
      ctl = { aborted: false }; setBusy(true); bar.style.width = "0%"; msg.textContent = "Preparing…";
      try {
        const res = await Film.exportVideo({
          res: sel("res"), fps: +sel("fps"), srt: $("dlSrt").checked, burn: $("dlBurn").checked, signal: ctl,
          onProgress: (p) => {
            bar.style.width = (p.pct * 100).toFixed(1) + "%";
            msg.textContent = p.frame ? `${p.phase} ${p.frame}/${p.total} · ${Math.round(p.pct / 0.94 * 100)}% · ~${Math.ceil(p.eta / 60)} min left` : p.phase;
          },
        });
        msg.textContent = "Done – your download has started" + (res.files.length > 1 ? " (video + captions)." : ".");
      } catch (e) { msg.textContent = e.message === "cancelled" ? "Cancelled." : "Export failed: " + e.message; bar.style.width = "0%"; console.error(e); }
      ctl = null; setBusy(false);
    };
    cancel.onclick = () => { if (ctl) ctl.aborted = true; };
    window.addEventListener("keydown", (e) => { if (e.key === "Escape" && !ctl) toggle(false); });
    // downloading the caption file alone (no render)
    $("dlSrtOnly").onclick = () => save(new Blob(["\ufeff" + Film.captionsSRT()], { type: "application/x-subrip" }), "RAWBANK_Passeport_des_Valeurs.srt");
  }
  if (document.readyState !== "loading") ui(); else document.addEventListener("DOMContentLoaded", ui);
})();
