/* ============================================================
   RAWBANK – Passeport des Valeurs | Download (MP4 + captions)
   Real-time recorder of the actual rendered film (every pixel + voice-over + sound effects).
   Public API:  Film.exportVideo({ res:'fhd'|'qhd', fps:30|60, srt, burn, from, to, onProgress, signal })
   ============================================================ */
(function () {
  const W = 1920, H = 1080;
  const RES = { fhd: { w: 1920, h: 1080, label: "Full HD", tag: "1080p" }, qhd: { w: 2560, h: 1440, label: "2K", tag: "1440p" } };
  const BITRATE = { fhd: { 30: 12e6, 60: 18e6 }, qhd: { 30: 20e6, 60: 30e6 } };
  const $ = (id) => document.getElementById(id);
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

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
      const cfg = { codec: t.codec, width: w, height: h, framerate: fps, bitrate, latencyMode: "realtime", ...(t.muxer === "avc" ? { avc: { format: "avc" } } : {}) };
      try { const s = await VideoEncoder.isConfigSupported(cfg); if (s.supported) return { cfg, muxer: t.muxer }; } catch (e) {}
    }
    throw new Error("No supported video encoder (WebCodecs) in this browser.");
  }
  async function pickAudio(sr) {
    for (const t of [{ codec: "mp4a.40.2", muxer: "aac" }, { codec: "opus", muxer: "opus" }]) {
      const cfg = { codec: t.codec, sampleRate: sr, numberOfChannels: 2, bitrate: 192000 };
      try { const s = await AudioEncoder.isConfigSupported(cfg); if (s.supported) return { cfg, muxer: t.muxer }; } catch (e) {}
    }
    return null;
  }

  /* ============================================================
     THE EXPORT  –  records the REAL rendered picture (what the browser actually paints:
     3D book, masks, blend modes, filters, canvas dust … every pixel) plus the REAL audio
     (voice-over + sound effects, tapped from the audio graph) while the film plays once, in
     real time → it takes as long as the film (≈ 1 min) instead of rendering frame by frame.
       getDisplayMedia(current tab) → MediaStreamTrackProcessor → crop to #stage + scale to
       1920×1080 / 2560×1440 → constant 30/60 fps → WebCodecs H.264 → MP4 (mp4-muxer)
     ============================================================ */
  Film.exportVideo = async function (o = {}) {
    const key = o.res || "fhd", R = RES[key], fps = o.fps || 30;
    const from = o.from || 0, to = Math.min(o.to || Film.previewEnd, Film.previewEnd), dur = to - from;
    const onP = o.onProgress || (() => {}), sig = o.signal || { aborted: false };
    if (!window.VideoEncoder || !window.Mp4Muxer || !window.MediaStreamTrackProcessor || !navigator.mediaDevices || !navigator.mediaDevices.getDisplayMedia)
      throw new Error("This browser cannot record the tab. Please use Chrome or Edge (desktop).");
    const html = document.documentElement, stage = $("stage"), cc = $("cc"), vo = $("vo");
    const wasCC = cc.classList.contains("on"), wasSfx = Film.sfxOn, resumeT = Film.master.time();
    Film.pause(); onP({ phase: "Allow “This tab” in the browser prompt…", pct: 0 });

    /* audio graph tap (voice-over element + SFX bus → recorder; both still reach the speakers) */
    Film.sfx.init(); const ac = Film.sfx.ctx; if (ac.state === "suspended") await ac.resume();
    if (!Film._voNode) { Film._voNode = ac.createMediaElementSource(vo); Film._voNode.connect(ac.destination); }
    const rec = ac.createMediaStreamDestination();
    Film._voNode.connect(rec); Film.sfx.lim.connect(rec);

    /* 1 · ask for the current tab (one click on "Allow") */
    let stream;
    try {
      stream = await navigator.mediaDevices.getDisplayMedia({
        video: { frameRate: { ideal: fps, max: fps }, width: { ideal: 3840 }, height: { ideal: 2160 }, cursor: "never" },
        audio: false, preferCurrentTab: true, selfBrowserSurface: "include", surfaceSwitching: "exclude", monitorTypeSurfaces: "exclude",
      });
    } catch (e) { try { Film._voNode.disconnect(rec); Film.sfx.lim.disconnect(rec); } catch (_) {} throw new Error("Permission to record the tab was refused."); }
    const vt = stream.getVideoTracks()[0], ds = vt.getSettings && vt.getSettings().displaySurface;
    if (ds && ds !== "browser") { vt.stop(); try { Film._voNode.disconnect(rec); Film.sfx.lim.disconnect(rec); } catch (_) {} throw new Error("Please choose “This tab” (Chrome tab), not a window or screen."); }

    /* 2 · clean, full-size picture: no controls, captions as requested, SFX on */
    html.classList.add("exporting"); cc.classList.toggle("on", !!o.burn); Film.sfxOn = true;
    window.dispatchEvent(new Event("resize")); await sleep(450);

    const vp = await pickVideo(R.w, R.h, fps, BITRATE[key][fps]);
    const sr = ac.sampleRate, ap = await pickAudio(sr);
    const target = new Mp4Muxer.ArrayBufferTarget();
    const muxer = new Mp4Muxer.Muxer({
      target, fastStart: "in-memory", firstTimestampBehavior: "offset",
      video: { codec: vp.muxer, width: R.w, height: R.h, frameRate: fps },
      ...(ap ? { audio: { codec: ap.muxer, numberOfChannels: 2, sampleRate: sr } } : {}),
    });
    let err = null;
    const venc = new VideoEncoder({ output: (c, m) => muxer.addVideoChunk(c, m), error: (e) => (err = e) }); venc.configure(vp.cfg);
    const aenc = ap ? new AudioEncoder({ output: (c, m) => muxer.addAudioChunk(c, m), error: (e) => (err = e) }) : null; if (aenc) aenc.configure(ap.cfg);

    const cv = document.createElement("canvas"); cv.width = R.w; cv.height = R.h;
    const ctx = cv.getContext("2d", { alpha: false }); ctx.imageSmoothingEnabled = true; ctx.imageSmoothingQuality = "high"; ctx.fillStyle = "#0C0B0D"; ctx.fillRect(0, 0, R.w, R.h);
    let vBase = null, k = 0, started = false, stop = false, gotFrame = false;
    const total = Math.round(dur * fps);
    const emit = () => { // one constant-rate output frame from the current canvas
      const vf = new VideoFrame(cv, { timestamp: Math.round((k * 1e6) / fps), duration: Math.round(1e6 / fps) });
      venc.encode(vf, { keyFrame: k % (fps * 2) === 0 }); vf.close(); k++;
    };
    vt.addEventListener("ended", () => { sig.aborted = true; });

    const vReader = new MediaStreamTrackProcessor({ track: vt }).readable.getReader();
    const aReader = ap ? new MediaStreamTrackProcessor({ track: rec.stream.getAudioTracks()[0] }).readable.getReader() : null;

    const videoLoop = (async () => {
      for (;;) {
        const { value: f, done } = await vReader.read(); if (done || !f) break;
        if (!started) { f.close(); continue; }          // ignore frames from before playback starts
        if (vBase === null) vBase = f.timestamp;
        const rel = (f.timestamp - vBase) / 1e6;
        while (k < total && k / fps < rel - 0.5 / fps) { emit(); if (venc.encodeQueueSize > 8) await sleep(2); }   // hold previous picture (constant frame rate)
        // crop #stage out of the captured tab (device pixels) and scale into the output canvas
        const vw = f.displayWidth, vh = f.displayHeight, sx = vw / innerWidth, sy = vh / innerHeight, r = stage.getBoundingClientRect();
        ctx.drawImage(f, r.left * sx, r.top * sy, r.width * sx, r.height * sy, 0, 0, R.w, R.h); f.close(); gotFrame = true;
        if (stop) break;
      }
    })();
    let aFrames = 0;
    const audioLoop = aReader ? (async () => {
      for (;;) {
        const { value: a, done } = await aReader.read(); if (done || !a) break;
        if (!started || !gotFrame) { a.close(); continue; }
        const n = a.numberOfFrames, data = new Float32Array(n * 2);
        for (let c = 0; c < 2; c++) a.copyTo(data.subarray(c * n, (c + 1) * n), { planeIndex: Math.min(c, a.numberOfChannels - 1), format: "f32-planar" });
        a.close();
        if (aFrames / sr > dur + 0.05) { if (stop) break; continue; }
        const ad = new AudioData({ format: "f32-planar", sampleRate: sr, numberOfFrames: n, numberOfChannels: 2, timestamp: Math.round((aFrames / sr) * 1e6), data });
        aenc.encode(ad); ad.close(); aFrames += n;
      }
    })() : Promise.resolve();

    /* 3 · play the film once, in real time */
    const t0 = performance.now(); let ok = false;
    try {
      Film.seek(from); await sleep(250);
      started = true; Film.play();
      await new Promise((res) => {
        const iv = setInterval(() => {
          const t = Film.master.time();
          if (sig.aborted || err || t >= to - 0.005 || !Film.playing) { clearInterval(iv); res(); return; }
          const pct = Math.max(0, Math.min(1, (t - from) / dur));
          document.title = "● REC " + Math.round(pct * 100) + "%";
          onP({ phase: "Recording in real time", pct: pct * 0.97, frame: k, total, eta: Math.max(0, to - t) });
        }, 100);
      });
      if (sig.aborted) throw new Error("cancelled");
      if (err) throw err;
      await sleep(180); stop = true;                    // let the last frames/audio arrive
      Film.pause(); vt.stop(); try { await vReader.cancel(); } catch (e) {} try { aReader && (await aReader.cancel()); } catch (e) {}
      await Promise.race([Promise.all([videoLoop, audioLoop]), sleep(1500)]);
      while (k < total) { emit(); if (venc.encodeQueueSize > 8) await sleep(2); }      // hold the last picture up to the exact length
      onP({ phase: "Finishing…", pct: 0.985 });
      await venc.flush(); venc.close(); if (aenc) { await aenc.flush(); aenc.close(); }
      if (err) throw err;
      muxer.finalize(); ok = true;
      const blob = new Blob([target.buffer], { type: "video/mp4" });
      const base = `RAWBANK_Passeport_des_Valeurs_${R.tag}_${fps}fps`;
      const files = [{ blob, name: base + ".mp4" }];
      if (o.srt) files.push({ blob: new Blob(["\ufeff" + Film.captionsSRT(from, to)], { type: "application/x-subrip" }), name: base + ".srt" });
      const srcPx = Math.round(stage.getBoundingClientRect().width * (window.devicePixelRatio || 1));
      onP({ phase: "Done", pct: 1, done: true, files, codec: vp.cfg.codec, audio: ap && ap.cfg.codec, srcPx });
      if (!o.noSave) files.forEach((f, i) => setTimeout(() => save(f.blob, f.name), i * 600));
      return { files, video: vp.cfg.codec, audio: ap && ap.cfg.codec, seconds: (performance.now() - t0) / 1000, srcPx };
    } finally {
      stop = true; try { vt.stop(); } catch (e) {} try { Film.pause(); } catch (e) {}
      try { Film._voNode.disconnect(rec); Film.sfx.lim.disconnect(rec); } catch (e) {}
      try { venc.state !== "closed" && venc.close(); } catch (e) {} try { aenc && aenc.state !== "closed" && aenc.close(); } catch (e) {}
      html.classList.remove("exporting"); cc.classList.toggle("on", wasCC); Film.sfxOn = wasSfx; document.title = TITLE;
      window.dispatchEvent(new Event("resize")); Film.seek(resumeT); $("overlay").classList.add("hide");
    }
  };
  const TITLE = document.title;

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
    const sizeNote = () => { const r = RES[sel("res")]; $("dlNote").textContent = `${r.w}×${r.h} · ${sel("fps")} fps · H.264 + AAC (.mp4) · real-time`; };
    panel.addEventListener("change", sizeNote); sizeNote();
    const setBusy = (b) => { panel.classList.toggle("busy", b); panel.querySelectorAll("input").forEach((i) => (i.disabled = b)); };
    go.onclick = async () => {
      ctl = { aborted: false }; setBusy(true); bar.style.width = "0%"; msg.textContent = "Preparing…";
      try {
        const res = await Film.exportVideo({
          res: sel("res"), fps: +sel("fps"), srt: $("dlSrt").checked, burn: $("dlBurn").checked, signal: ctl,
          onProgress: (p) => {
            bar.style.width = (p.pct * 100).toFixed(1) + "%";
            msg.textContent = p.frame ? `${p.phase} · ${Math.round(p.pct * 100)}% · ~${Math.max(1, Math.ceil(p.eta))} s left` : p.phase;
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
