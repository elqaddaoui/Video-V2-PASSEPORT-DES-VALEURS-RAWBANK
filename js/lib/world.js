/* Shared "world": deterministic gold dust that runs for the whole film (scrub-safe). */
(function () {
  const world = (Film.world = { dust: { v: 0 } });
  function rng(seed) { return () => { seed |= 0; seed = (seed + 0x6d2b79f5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
  const R = rng(20261017), P = [];
  for (let i = 0; i < 110; i++) P.push({ x: R() * 1920, y: R() * 1080, z: 0.25 + R() * 0.9, ph: R() * 6.28, sp: 6 + R() * 18, sz: 1 + R() * 2.6 });
  const cv = document.getElementById("w-dust"), cx = cv.getContext("2d");
  Film.addScene({ el: null, start: 0, end: 0, onFrame(t) {
    cx.clearRect(0, 0, 1920, 1080);
    const A = world.dust.v; if (A <= 0.001) return;
    for (const p of P) {
      const x = (p.x + Math.sin(t * 0.35 + p.ph) * 40 * p.z + t * p.sp * 0.4) % 1960;
      const y = ((p.y - t * p.sp * p.z * 1.4) % 1100 + 1100) % 1100 - 10;
      const tw = 0.45 + 0.55 * Math.sin(t * 2.2 + p.ph * 3);
      const a = A * p.z * tw * 0.8, r = p.sz * p.z * 2.2;
      const g = cx.createRadialGradient(x, y, 0, x, y, r * 4);
      g.addColorStop(0, "rgba(255,214,120," + a + ")"); g.addColorStop(0.35, "rgba(253,181,37," + a * 0.35 + ")"); g.addColorStop(1, "rgba(253,181,37,0)");
      cx.fillStyle = g; cx.beginPath(); cx.arc(x, y, r * 4, 0, 6.283); cx.fill();
    }
  } });
})();
