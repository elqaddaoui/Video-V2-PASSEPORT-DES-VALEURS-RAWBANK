/* ============================================================
   SCENE 7 – Étape 5 : Échange avec mon manager            00:40.36 → 00:49.76
   Pacing beats from the recording's energy bursts (pacing only):
     40.5-41.1 step label · 41.33-43.17 first phrase · 43.52-44.69 second phrase · 44.87-47.2 exchange · 47.77-49.64 closing beat
   Storyboard: two characters (collaborator + manager), « Comportements adoptés » / « Comportements à améliorer », a checkmark.

   Scene 6 ends on the validated grid (camera C6b, gold ripple on the tick, rail at 04).

   TRANSITION 6 → 7  ·  "THE BOOK EXHALES"   39.75 → 41.30  (one continuous move)
     39.75  the camera pulls back and slides the Passeport to the screen centre while it shrinks (C6b → C7)
     39.85  « 04 – » folds up-left and away (same exit as 03), the rail passes 04 → done, 05 lit
     40.20  a gold shock-ring leaves the book's centre: it is the light that reveals the two people
     40.40  Amina (left, same wardrobe) and the manager (right, gold tie) resolve out of the haze, sliding in from the sides
     40.55  the Passeport dissolves into the halo; the two cards unfold FROM the book's centre, one to each side
     40.75  « 05 – » rolls into the top band
   ============================================================ */
(function () {
  const $$ = (q) => Array.from(document.querySelectorAll(q));
  Film.addMarkers([{ t: 49.76, label: "S8 ▸ cut", cut: true }]);
  Film.previewEnd = 49.76;
  Film.cam = Object.assign(Film.cam || {}, { C7: { scale: 0.45, x: 220, y: 42 } });

  /* icons of the two cards */
  const S = (d) => `<svg viewBox="0 0 78 78" fill="none" stroke="#FDB525" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
  document.getElementById("pcLic").innerHTML = S('<path pathLength="1" d="M39 18 L56 25 V38 C56 49 49 57 39 61 C29 57 22 49 22 38 V25Z"/><path pathLength="1" d="M31 39 l6 6 11 -12"/>');
  document.getElementById("pcRic").innerHTML = S('<path pathLength="1" d="M18 54 L32 40 L42 48 L60 28"/><path pathLength="1" d="M48 28 H60 V40"/>');

  Film.addScene({
    el: "#s07", start: 40.36, end: 49.76, at: 0, show: 39.8, hide: 56.6,   // hide late: the checkmark medal travels into Scene 8
    build(tl) {
      const C = Film.cam;
      const A = "#duoA", M = "#duoM", cL = "#pcL", cR = "#pcR";
      const orbs = $$("#s07 .orb"), w1 = $$("#s07 .phr .ln:nth-child(1) .w"), w2 = $$("#s07 .phr .ln:nth-child(2) .w");
      const itL = $$("#pcL .it"), itR = $$("#pcR .it");
      const pathsL = "#pcLic svg path", pathsR = "#pcRic svg path";

      /* ---- initial states ---- */
      gsap.set(A, { x: -110 - 150, y: 324, scale: 0.7, opacity: 0, filter: "blur(14px)" });
      gsap.set(M, { x: 1470 + 150, y: 324, scale: 0.7, opacity: 0, filter: "blur(14px)" });
      gsap.set("#s07 .nn", { opacity: 0, yPercent: 80, filter: "blur(10px)" });
      gsap.set("#s07 .dsh", { opacity: 0 });
      gsap.set([...w1, ...w2], { opacity: 0, y: 26, filter: "blur(10px)" });
      gsap.set([cL, cR], { opacity: 0, scale: 0.25, transformOrigin: "50% 50%" });
      gsap.set([cL, cR], { "--sw": 0 });
      gsap.set([pathsL, pathsR], { strokeDasharray: 1, strokeDashoffset: 1 });
      gsap.set("#pcL .tk, #pcR .tk", { scale: 0 });
      gsap.set("#pcL .ln, #pcR .ln", { scaleX: 0 });
      gsap.set(orbs, { opacity: 0 });
      gsap.set("#bigtick", { opacity: 0, scale: 0.2, transformOrigin: "50% 50%" });
      gsap.set("#bigtick svg path", { strokeDasharray: 1, strokeDashoffset: 1 });
      gsap.set("#bigtick .rg", { opacity: 0, scale: 1 });
      gsap.set("#eyeL-d, #eyeL-m-x", { svgOrigin: "361 304" }); gsap.set("#eyeR-d, #eyeR-m-x", { svgOrigin: "439 304" });
      gsap.set("#amina-head-d", { svgOrigin: "400 428" });
      gsap.set("#mgr-head-x", { svgOrigin: "400 440" });
      gsap.set("#amina-smile-d", { svgOrigin: "400 366", scaleY: 0.8 });
      gsap.set("#mgr-smile-x", { svgOrigin: "400 380", scaleY: 0.8 });
      gsap.set("#amina-brows-d", { svgOrigin: "400 272" }); gsap.set("#mgr-brows-x", { svgOrigin: "400 272" });

      /* ---- TRANSITION 6→7 ---- */
      tl.call(Film.fx("whoosh", 1.2, 160, 2200, 0.16), null, 39.8)
        .to("#cam", { scale: C.C7.scale, x: C.C7.x, y: C.C7.y, duration: 1.35, ease: "power3.inOut" }, 39.75)
        .to("#w-book3d", { opacity: 0, duration: 0.65, ease: "power2.in" }, 40.55)
        .to("#s06 .s3text", { x: -60, y: -140, scale: 0.6, opacity: 0, transformOrigin: "0 0", duration: 0.75, ease: "power2.in" }, 39.85)
        .to("#w-halo", { x: 0, y: 0, opacity: 1, duration: 1.4, ease: "power2.inOut" }, 39.75)
        .fromTo("#rip1", { x: 960, y: 560, scale: 0.3, opacity: 0.9 }, { scale: 9, opacity: 0, duration: 1.3, ease: "power2.out", immediateRender: false }, 40.2)
        .fromTo("#rip2", { x: 960, y: 560, scale: 0.3, opacity: 0.6 }, { scale: 6.5, opacity: 0, duration: 1.1, ease: "power2.out", immediateRender: false }, 40.4)
        .to(Film.world.dust, { v: 2.4, duration: 0.5, ease: "power2.out" }, 40.2)
        .to(Film.world.dust, { v: 1.0, duration: 1.6, ease: "power2.inOut" }, 41.0);

      // the two people resolve out of the haze
      tl.to(A, { x: -110, opacity: 1, filter: "blur(0px)", duration: 1.0, ease: "power3.out" }, 40.4)
        .to(M, { x: 1470, opacity: 1, filter: "blur(0px)", duration: 1.0, ease: "power3.out" }, 40.5)
        .call(Film.fx("shimmer", 0.05, 988), null, 40.6);

      // rail: 04 done, 05 lit, line to 100 %
      tl.to("#rail-fill", { width: "100%", duration: 0.7, ease: "power3.inOut" }, 40.0)
        .to("#rail .st:nth-of-type(4)", { backgroundColor: "#151215", color: "#FDB525", borderColor: "#FDB525", boxShadow: "0 0 0 rgba(253,181,37,0)", scale: 1, duration: 0.4 }, 40.15)
        .to("#rail .st:nth-of-type(5)", { backgroundColor: "#FDB525", color: "#1B191B", borderColor: "#FDB525", boxShadow: "0 0 26px rgba(253,181,37,.7)", scale: 1.1, duration: 0.5, ease: "back.out(2.5)" }, 40.55);

      // « 05 – J'échange. Je progresse. Je m'engage. »
      tl.to("#s07 .nn", { opacity: 1, yPercent: 0, filter: "blur(0px)", duration: 0.75, ease: "back.out(1.8)" }, 40.7)
        .call(Film.fx("ping", 1760, 0.08), null, 40.85)
        .to("#s07 .dsh", { opacity: 1, duration: 0.3 }, 40.95)
        .to("#s07 .dsh", { scale: 1.25, duration: 0.2, yoyo: true, repeat: 1, ease: "sine.inOut", transformOrigin: "50% 60%" }, 41.1)
        .to(w1, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.6, stagger: 0.16, ease: "power3.out" }, 41.4)
        .to(w2, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.6, stagger: 0.14, ease: "power3.out" }, 43.55)
        .to(w2, { color: "#FDB525", duration: 0.4, stagger: 0.14 }, 43.75);

      /* ---- the two cards unfold from the book's centre ---- */
      const unfold = (c, dx, rot, t, iconPaths, items) => {
        tl.fromTo(c, { x: dx, y: 20, rotation: rot }, { x: 0, y: 0, rotation: 0, duration: 0.9, ease: "back.out(1.5)", immediateRender: false }, t)
          .to(c, { opacity: 1, duration: 0.3, ease: "none" }, t)
          .to(c, { scale: 1, duration: 0.9, ease: "back.out(1.5)" }, t)
          .to(c, { "--sw": 1, duration: 0.7, ease: "power3.inOut" }, t + 0.5)
          .call(Film.fx("paper", 0.8, 0.15), null, t)
          .to(iconPaths, { strokeDashoffset: 0, duration: 0.6, stagger: 0.12, ease: "power2.inOut" }, t + 0.6);
        items.forEach((it, i) => {
          const s = t + 1.0 + i * 0.28;
          tl.to(it.querySelector(".ln"), { scaleX: 1, duration: 0.5, ease: "power3.out" }, s)
            .to(it.querySelector(".tk"), { scale: 1, duration: 0.45, ease: "back.out(3)" }, s + 0.12)
            .call(Film.fx("ping", [988, 1175, 1318][i], 0.05), null, s + 0.15);
        });
      };
      unfold(cL, 300, -9, 40.7, pathsL, itL);
      unfold(cR, -300, 9, 41.15, pathsR, itR);

      /* ---- life: breathing, nods, blinks, glances ---- */
      tl.fromTo(A, { y: 324 }, { y: 330, duration: 1.4, ease: "sine.inOut", yoyo: true, repeat: 5, immediateRender: false }, 41.4)
        .fromTo(M, { y: 324 }, { y: 330, duration: 1.6, ease: "sine.inOut", yoyo: true, repeat: 5, immediateRender: false }, 41.5)
        .to("#amina-smile-d", { scaleY: 1.25, duration: 0.7, ease: "sine.inOut" }, 41.0)
        .to("#mgr-smile-x", { scaleY: 1.2, duration: 0.7, ease: "sine.inOut" }, 41.2)
        .to("#amina-head-d", { rotation: 2.2, y: 3, duration: 0.55, yoyo: true, repeat: 1, ease: "sine.inOut" }, 41.6)       // she nods on « J'échange »
        .to("#mgr-head-x", { rotation: -2.2, y: 3, duration: 0.55, yoyo: true, repeat: 1, ease: "sine.inOut" }, 42.25)     // he answers
        .to("#amina-head-d", { rotation: 1.8, y: 3, duration: 0.5, yoyo: true, repeat: 1, ease: "sine.inOut" }, 43.6)
        .to("#mgr-head-x", { rotation: -1.8, y: 3, duration: 0.5, yoyo: true, repeat: 1, ease: "sine.inOut" }, 44.2)
        .to("#amina-brows-d", { y: -5, duration: 0.4, yoyo: true, repeat: 1, ease: "sine.inOut" }, 42.8)
        .to("#mgr-brows-x", { y: -5, duration: 0.4, yoyo: true, repeat: 1, ease: "sine.inOut" }, 45.4)
        .to("#eyeL-d, #eyeR-d", { scaleY: 0.08, duration: 0.07, yoyo: true, repeat: 1, ease: "none" }, 42.0)
        .to("#eyeL-m-x, #eyeR-m-x", { scaleY: 0.08, duration: 0.07, yoyo: true, repeat: 1, ease: "none" }, 43.0)
        .to("#eyeL-d, #eyeR-d", { scaleY: 0.08, duration: 0.07, yoyo: true, repeat: 1, ease: "none" }, 45.9)
        .to("#eyeL-m-x, #eyeR-m-x", { scaleY: 0.08, duration: 0.07, yoyo: true, repeat: 1, ease: "none" }, 46.6);

      /* ---- the exchange: five glowing orbs leave the ticks of both cards and converge on the big checkmark ---- */
      const SRC = [[483, 515], [483, 562], [483, 609], [1083, 515], [1083, 562]];
      const DST = [960, 545];
      SRC.forEach((p, i) => {
        const t = 44.0 + i * 0.16, dx = DST[0] - p[0], dy = DST[1] - p[1];
        tl.set(orbs[i], { x: p[0], y: p[1], scale: 0.4 }, t)
          .to(orbs[i], { opacity: 1, duration: 0.12 }, t)
          .to(orbs[i], { x: p[0] + dx, duration: 0.8, ease: "power2.inOut" }, t)
          .to(orbs[i], { y: p[1] + dy, duration: 0.8, ease: "power3.in" }, t)
          .to(orbs[i], { scale: 1.6, duration: 0.8, ease: "power2.in" }, t)
          .to(orbs[i], { opacity: 0, scale: 0.2, duration: 0.14, ease: "none" }, t + 0.8)
          .call(Film.fx("ping", [1175, 1318, 1568, 1760, 1976][i], 0.05), null, t + 0.78);
      });
      tl.to("#bigtick", { opacity: 1, scale: 1, duration: 0.7, ease: "back.out(2.2)" }, 44.9)
        .to("#bigtick svg path", { strokeDashoffset: 0, duration: 0.5, ease: "power2.out" }, 45.1)
        .call(Film.fx("bloom", 0.05, 784), null, 44.9)
        .fromTo("#bigtick .r1", { scale: 1, opacity: 0.9 }, { scale: 2.4, opacity: 0, duration: 1.0, ease: "power2.out", immediateRender: false }, 45.0)
        .fromTo("#bigtick .r2", { scale: 1, opacity: 0.7 }, { scale: 3.2, opacity: 0, duration: 1.2, ease: "power2.out", immediateRender: false }, 45.2)
        .to(Film.world.dust, { v: 2.4, duration: 0.4, ease: "power2.out" }, 44.95)
        .to(Film.world.dust, { v: 1.2, duration: 1.4, ease: "power2.inOut" }, 45.4)
        .to("#bigtick", { scale: 1.06, duration: 1.1, yoyo: true, repeat: 1, ease: "sine.inOut" }, 45.8);

      /* ---- the commitment: both nod together, smiles widen, the rail completes ---- */
      tl.to("#amina-head-d", { rotation: 2.4, y: 4, duration: 0.6, yoyo: true, repeat: 1, ease: "sine.inOut" }, 47.85)
        .to("#mgr-head-x", { rotation: -2.4, y: 4, duration: 0.6, yoyo: true, repeat: 1, ease: "sine.inOut" }, 47.85)
        .to("#amina-smile-d, #mgr-smile-x", { scaleY: 1.5, duration: 0.5, ease: "sine.inOut" }, 47.9)
        .to("#rail .st:nth-of-type(5)", { scale: 1.3, duration: 0.3, yoyo: true, repeat: 1, ease: "sine.inOut" }, 47.9)
        .call(Film.fx("shimmer", 0.05, 1568), null, 47.9)
        .to("#w-halo", { opacity: 1.0, scale: 1.12, duration: 1.4, ease: "sine.inOut" }, 47.9)
        .to(Film.world.dust, { v: 1.8, duration: 0.5, ease: "power2.out" }, 47.9);
      // END-OF-SCENE-7 FRAME: duo + two cards + big gold tick + « 05 – … » band + rail complete.
    },
  });
})();
