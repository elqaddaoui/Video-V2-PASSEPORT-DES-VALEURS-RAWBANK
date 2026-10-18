/* ============================================================
   SCENE 6 – Étape 4 : Je prépare mon évaluation            00:32.84 → 00:40.36
   Pacing beats from the recording's energy bursts (pacing only):
     32.96-33.6 step label · 34.04-35.8 first phrase · 36.12-38.52 second phrase · 39.24-39.76 closing beat
   Storyboard: semester calendar + behavioural grid.

   Scene 5 ends on five LIT value cards (3+2 grid, right) with the Passeport defocused behind.

   TRANSITION 5 → 6  ·  "THE CARDS FOLD INTO THE BOOK"   32.10 → 34.30  (one continuous move)
     32.10  camera releases the defocus (blur/dim → sharp) and settles on C6 (book big, 300 px clear band on top)
     32.10  « 03 – Je comprends… » folds up-left and away; stepdim → topdim (the title band moves from the left to the top)
     32.50  leaf 3 turns (1.0 s): reveals the semester CALENDAR (left) and the BEHAVIOURAL GRID (right)
     33.45  the five lit value cards SHRINK and FLY (curved paths) onto the five rows of the grid – the values you just learned
            are exactly what you now evaluate. Each landing pings and draws that value's icon into its row.
   ============================================================ */
(function () {
  const $$ = (q) => Array.from(document.querySelectorAll(q));
  Film.addMarkers([{ t: 32.84, label: "S6 ▸ cut", cut: true }, { t: 40.36, label: "S7 ▸ cut", cut: true }]);
  Film.previewEnd = 40.36;
  Film.cam = Object.assign(Film.cam || {}, { C6: { scale: 1.0, x: 392, y: 90 }, C6b: { scale: 1.06, x: 340, y: 120 } });

  /* ---- build the calendar (7 columns × header + 5 weeks) and the page icons ---- */
  const grid = document.getElementById("calGrid");
  let html = "";
  for (let i = 0; i < 7; i++) html += '<i class="dy hd"></i>';
  const GL = [9, 16, 30];
  for (let i = 0; i < 35; i++) html += '<i class="dy' + (GL.includes(i) ? " gl" : "") + '"></i>';
  grid.innerHTML = html;
  document.getElementById("calIc").innerHTML = `<svg viewBox="0 0 54 54" fill="none" stroke="#FDB525" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
    <path pathLength="1" d="M14 18 H40 a3 3 0 0 1 3 3 V40 a3 3 0 0 1 -3 3 H14 a3 3 0 0 1 -3 -3 V21 a3 3 0 0 1 3 -3Z"/><path pathLength="1" d="M11 26 H43"/><path pathLength="1" d="M19 12 V20"/><path pathLength="1" d="M35 12 V20"/><path pathLength="1" d="M20 33 l4 4 8 -8"/></svg>`;
  $$(".er .eic").forEach((e) => (e.innerHTML = Film.ICO[e.dataset.v]));

  Film.addScene({
    el: "#s06", start: 32.84, end: 40.36, at: 0, show: 32.0, hide: 41.6,
    build(tl) {
      const C = Film.cam, cards = $$("#s05 .vcard");
      const rows = $$(".er"), eic = $$(".er .eic"), segs = $$("#calSem b"), cells = $$("#calGrid .dy"), gl = $$("#calGrid .dy.gl");
      const w = $$("#s06 .phr .w");
      const FROM = [[1061, 372], [1380, 372], [1699, 372], [1220, 756], [1539, 756]];   // card centres (screen px) at rest in Scene 5
      const TO = [[1124, 470], [1124, 559], [1124, 649], [1124, 739], [1124, 830]];      // row icon centres under camera C6
      const SCORE = [3, 4, 3, 4, 3];

      /* ---- initial states ---- */
      gsap.set("#w-leaf3", { rotationY: 0, z: 3 });
      gsap.set("#s06 .nn", { opacity: 0, yPercent: 80, filter: "blur(10px)" });
      gsap.set("#s06 .dsh", { opacity: 0 });
      gsap.set(w, { opacity: 0, y: 26, filter: "blur(10px)" });
      gsap.set(rows, { opacity: 0 });
      gsap.set(eic, { scale: 0 });
      gsap.set(".er .eic svg path, .er .eic svg circle", { strokeDasharray: 1, strokeDashoffset: 1 });
      gsap.set(".er .pips b", { backgroundColor: "rgba(253,181,37,.1)" });
      gsap.set("#evTick", { "--tick": 0 });
      gsap.set(cells, { scale: 0, opacity: 0 });
      gsap.set(segs, { "--f": 0 });
      gsap.set(gl, { "--gf": 0 });
      gsap.set("#calIc svg path", { strokeDasharray: 1, strokeDashoffset: 1 });
      gsap.set("#topdim", { opacity: 0 });
      gsap.set(".ripple", { opacity: 0, scale: 0.2 });

      /* ---- TRANSITION 5→6 ---- */
      tl.call(Film.fx("whoosh", 1.3, 180, 2600, 0.17), null, 32.1)
        .to("#cam", { scale: C.C6.scale, x: C.C6.x, y: C.C6.y, duration: 1.5, ease: "power3.inOut" }, 32.1)
        .to("#cam", { filter: "blur(0px) brightness(1)", duration: 1.0, ease: "power2.out" }, 32.1)
        .set("#cam", { filter: "none" }, 33.3)
        .to("#dark", { opacity: 0, duration: 1.0, ease: "power2.out" }, 32.1)
        .to("#stepdim", { opacity: 0, duration: 0.8, ease: "power2.out" }, 32.1)
        .to("#topdim", { opacity: 1, duration: 0.8, ease: "power2.out" }, 32.5)
        .to("#w-halo", { x: 120, y: 60, opacity: 0.6, duration: 1.5, ease: "power2.inOut" }, 32.1)
        .to("#s05 .s3text", { x: -60, y: -140, scale: 0.6, opacity: 0, transformOrigin: "0 0", duration: 0.75, ease: "power2.in" }, 32.15)
        .call(Film.fx("paper", 0.9, 0.2), null, 32.5)
        .to("#w-leaf3", { rotationY: -180, duration: 1.0, ease: "power2.inOut" }, 32.5)
        .set("#w-leaf3", { z: 5 }, 33.0);

      // rail: 03 done, 04 lit
      tl.to("#rail-fill", { width: "75%", duration: 0.7, ease: "power3.inOut" }, 32.4)
        .to("#rail .st:nth-of-type(3)", { backgroundColor: "#151215", color: "#FDB525", borderColor: "#FDB525", boxShadow: "0 0 0 rgba(253,181,37,0)", scale: 1, duration: 0.4 }, 32.55)
        .to("#rail .st:nth-of-type(4)", { backgroundColor: "#FDB525", color: "#1B191B", borderColor: "#FDB525", boxShadow: "0 0 26px rgba(253,181,37,.7)", scale: 1.1, duration: 0.5, ease: "back.out(2.5)" }, 32.95);

      // « 04 – » rolls into the TOP band; « Je fais mon autoévaluation. »
      tl.to("#s06 .nn", { opacity: 1, yPercent: 0, filter: "blur(0px)", duration: 0.75, ease: "back.out(1.8)" }, 33.0)
        .call(Film.fx("ping", 1568, 0.08), null, 33.15)
        .to("#s06 .dsh", { opacity: 1, duration: 0.3 }, 33.25)
        .to("#s06 .dsh", { scale: 1.25, duration: 0.2, yoyo: true, repeat: 1, ease: "sine.inOut", transformOrigin: "50% 60%" }, 33.4)
        .to(w, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.6, stagger: 0.11, ease: "power3.out" }, 33.7);

      /* ---- the five lit cards fly onto the grid rows (curved paths: x and y use different eases) ---- */
      cards.forEach((c, i) => {
        const t = 33.45 + i * 0.12, dx = TO[i][0] - FROM[i][0], dy = TO[i][1] - FROM[i][1];
        tl.to(c, { x: dx, duration: 0.8, ease: "power2.inOut" }, t)
          .to(c, { y: dy, duration: 0.8, ease: "power3.in" }, t)
          .to(c, { scale: 0.19, duration: 0.8, ease: "power2.in" }, t)
          .to(c, { opacity: 0, duration: 0.16, ease: "none" }, t + 0.66)
          .to(rows[i], { opacity: 1, duration: 0.3 }, t + 0.5)
          .call(Film.fx("ping", [1175, 1318, 1568, 1760, 1976][i], 0.07), null, t + 0.78)
          .to(eic[i], { scale: 1, duration: 0.5, ease: "back.out(3)" }, t + 0.68)
          .to(eic[i].querySelectorAll("svg path, svg circle"), { strokeDashoffset: 0, duration: 0.6, stagger: 0.06, ease: "power2.inOut" }, t + 0.8);
      });

      /* ---- the calendar (34.0 →): icon draws, days pop in a wave, the semester bar fills month by month ---- */
      tl.to("#calIc svg path", { strokeDashoffset: 0, duration: 0.7, stagger: 0.07, ease: "power2.inOut" }, 34.05)
        .to(cells, { scale: 1, opacity: 1, duration: 0.4, stagger: { each: 0.014, from: "start" }, ease: "back.out(2.4)" }, 34.15)
        .call(Film.fx("shimmer", 0.05, 1318), null, 34.2)
        .to(segs, { "--f": 1, duration: 0.45, stagger: 0.2, ease: "power2.out" }, 34.7)
        .to(gl, { "--gf": 1, duration: 0.4, stagger: 0.35, ease: "power2.out" }, 35.2)
        .to(gl, { scale: 1.18, duration: 0.18, stagger: 0.35, yoyo: true, repeat: 1, ease: "sine.inOut" }, 35.2);

      /* ---- the self-evaluation (36.15 →): each row lights and its pips fill, one value after another ---- */
      rows.forEach((r, i) => {
        const t = 36.15 + i * 0.5, pips = r.querySelectorAll(".pips b");
        tl.to(r, { backgroundColor: "rgba(253,181,37,.22)", duration: 0.25 }, t)
          .call(Film.fx("scribble", 0.3, 0.04), null, t)
          .to([...pips].slice(0, SCORE[i]), { backgroundColor: "#FDB525", scale: 1.2, duration: 0.2, stagger: 0.09, ease: "back.out(3)" }, t + 0.05)
          .to([...pips].slice(0, SCORE[i]), { scale: 1, duration: 0.2, stagger: 0.09 }, t + 0.3)
          .to(r, { backgroundColor: "rgba(27,25,27,.05)", duration: 0.35 }, t + 0.42);
      });
      // the camera creeps toward the grid while the evaluation is filled in
      tl.to("#cam", { scale: C.C6b.scale, x: C.C6b.x, y: C.C6b.y, duration: 3.8, ease: "sine.inOut" }, 35.8);

      /* ---- the grid is validated (39.24 →) ---- */
      tl.to("#evTick", { "--tick": 1, duration: 0.4, ease: "back.out(3)" }, 39.3)
        .call(Film.fx("ping", 1976, 0.1), null, 39.32)
        .fromTo("#rip1", { x: 1397, y: 398, scale: 0.2, opacity: 0.95 }, { scale: 2.8, opacity: 0, duration: 0.95, ease: "power2.out", immediateRender: false }, 39.32)
        .fromTo("#rip2", { x: 1397, y: 398, scale: 0.2, opacity: 0.8 }, { scale: 2.0, opacity: 0, duration: 0.8, ease: "power2.out", immediateRender: false }, 39.5)
        .to("#evalPage", { filter: "drop-shadow(0 0 24px rgba(253,181,37,.65))", duration: 0.35, yoyo: true, repeat: 1, ease: "sine.inOut" }, 39.35)
        .to(Film.world.dust, { v: 2.0, duration: 0.4, ease: "power2.out" }, 39.3);
      // END-OF-SCENE-6 FRAME → Scene 7 starts from this exact pose (C6b, grid validated, rail 04).
    },
  });
})();
