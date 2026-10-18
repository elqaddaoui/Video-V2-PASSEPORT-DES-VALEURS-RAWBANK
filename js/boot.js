/* Boot: waits for fonts + images, then builds the master timeline. */
(function () {
  const imgs = Array.from(document.images);
  const ready = Promise.all([
    document.fonts ? document.fonts.ready : Promise.resolve(),
    ...imgs.map((i) => (i.complete ? Promise.resolve() : new Promise((r) => { i.onload = i.onerror = r; }))),
  ]);
  // Load the voice-over as a blob so seeking/scrubbing works on any host (no HTTP range support needed).
  const vo = document.getElementById("vo");
  const voReady = fetch(vo.getAttribute("src")).then((r) => { if (!r.ok) throw 0; return r.blob(); })
    .then((b) => { vo.src = URL.createObjectURL(b); return new Promise((res) => { vo.addEventListener("loadedmetadata", res, { once: true }); vo.load(); setTimeout(res, 3000); }); })
    .catch(() => {});   // file:// → keep the plain src (local files seek fine)
  Promise.all([ready, voReady]).then(() => { Film.init(); document.documentElement.classList.add("ready"); });
})();
