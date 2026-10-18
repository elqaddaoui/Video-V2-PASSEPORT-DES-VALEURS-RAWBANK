/* ============================================================
   SCENE 5 – Étape 3 : Les cinq valeurs            00:25.36 → 00:32.84
   Pacing beats from the recording's energy bursts (pacing only; no wording derived):
     25.0-26.3 lead-in phrase · five spoken beats at ≈27.05 · 28.1 · 29.0 · 30.3 · 31.1 · tail ends 32.3
   → one value card per beat: ambition, initiative, innovation, collaboration, performance.

   Scene 4 ends on the held, highlighted « Conditions générales … » page with its box ticked (camera ≈ C4+, rail 02).

   TRANSITION 4 → 5  ·  "THE DEPTH PULL"  ·  24.85 → 26.15 (one continuous move – the Passeport is never cut away)
     24.85  whoosh · camera dollies BACK + slides left (C4+ → C5) while a depth-of-field blur/dim rolls onto #cam:
            the Passeport stays in the background, out of focus, exactly as the storyboard asks
     24.90  « 02 » rolls up/out, « 03 » rolls up/in (same slot, same dash); rail 02 → done, 03 lit
     25.30  five value cards fly in from five different directions (3D tilt, overshoot) and snap into a 3 + 2 grid
   ============================================================ */
(function () {
  const $$ = (q) => Array.from(document.querySelectorAll(q));
  Film.addMarkers([{ t: 25.36, label: "S5 ▸ cut", cut: true }, { t: 32.84, label: "S6 ▸ cut", cut: true }]);
  Film.cam = Object.assign(Film.cam || {}, { C5: { scale: 0.92, x: 150, y: 10 } });
  Film.previewEnd = 32.84;     // the voice is silent 32.30-32.95: the preview ends cleanly on the cut

  const S = (d) => `<svg viewBox="0 0 104 104" fill="none" stroke="#FDB525" stroke-width="4.6" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
  const ICO = {
    ambition: S(`<path pathLength="1" d="M26 78 L46 44 L58 60 L66 48 L80 78Z"/><path pathLength="1" d="M46 44 V24"/><path pathLength="1" d="M46 24 H64 L58 31 L64 38 H46"/>`),
    initiative: S(`<path pathLength="1" d="M54 20 L34 56 H50 L46 84 L72 44 H55Z"/>`),
    innovation: S(`<path pathLength="1" d="M52 22 a20 20 0 0 1 12 36 c-3 3 -4 6 -4 10 H44 c0 -4 -1 -7 -4 -10 A20 20 0 0 1 52 22Z"/><path pathLength="1" d="M44 76 H60"/><path pathLength="1" d="M47 84 H57"/>`),
    collaboration: S(`<circle pathLength="1" cx="40" cy="48" r="17"/><circle pathLength="1" cx="64" cy="48" r="17"/><path pathLength="1" d="M52 34 a17 17 0 0 1 0 28"/>`),
    performance: S(`<circle pathLength="1" cx="52" cy="52" r="28"/><circle pathLength="1" cx="52" cy="52" r="15"/><path pathLength="1" d="M52 52 L78 26"/><path pathLength="1" d="M70 24 H80 V34"/>`),
  };
  Film.ICO = ICO;
  $$("#s05 .vcard").forEach((c) => (c.querySelector(".vc-ico").innerHTML = ICO[c.dataset.v]));

  Film.addScene({
    el: "#s05", start: 25.36, end: 32.84, at: 0, show: 24.8, hide: 34.8,
    build(tl) {
      const C = Film.cam;
      const cards = $$("#s05 .vcard");
      const fly = [   // each card enters from its own direction – dynamic, never the same move twice
        { x: 380, y: -300, rotationY: -70, rotationZ: 8 },
        { x: 0, y: -420, rotationX: 60, rotationZ: -6 },
        { x: -300, y: -340, rotationY: 70, rotationZ: -8 },
        { x: 420, y: 330, rotationX: -60, rotationZ: 7 },
        { x: -120, y: 440, rotationY: 55, rotationZ: -7 },
      ];
      const T = [27.0, 28.05, 28.95, 30.2, 31.05];           // the five spoken beats
      const w1 = $$("#s05 .ln1 .w"), w2 = $$("#s05 .ln2 .w"), w3 = $$("#s05 .ln3 .w");

      /* ---- initial states ---- */
      gsap.set("#s05 .nn", { opacity: 0, yPercent: 80, filter: "blur(10px)" });
      gsap.set([w1, w2, w3], { opacity: 0, y: 30, filter: "blur(10px)" });
      cards.forEach((c, i) => gsap.set(c, Object.assign({ opacity: 0, scale: 0.7, transformOrigin: "50% 50%" }, fly[i])));
      gsap.set("#s05 .vc-ico svg path, #s05 .vc-ico svg circle", { strokeDasharray: 1, strokeDashoffset: 1 });
      gsap.set("#s05 .vc-b i", { scaleX: 0 });
      gsap.set("#dark", { opacity: 0 });
      gsap.set("#cam", { filter: "blur(0px) brightness(1)" });
      gsap.set(cards, { filter: "brightness(1)" });

      /* ---- TRANSITION 4→5 : depth pull (24.85 → 26.15) ---- */
      tl.call(Film.fx("whoosh", 1.2, 200, 2800, 0.18), null, 24.85)
        .to("#cam", { scale: C.C5.scale, x: C.C5.x, y: C.C5.y, duration: 1.3, ease: "power3.inOut" }, 24.85)
        .fromTo("#cam", { filter: "blur(0px) brightness(1)" }, { filter: "blur(7px) brightness(.62)", duration: 1.1, ease: "power2.inOut", immediateRender: false }, 24.95)
        .to("#dark", { opacity: 1, duration: 1.1, ease: "power2.inOut" }, 24.95)
        .to("#w-halo", { x: 330, opacity: 0.9, duration: 1.3, ease: "power2.inOut" }, 24.85)
        .to("#w-rays", { opacity: 0.55, duration: 1.2 }, 24.9)
        .to(Film.world.dust, { v: 1.6, duration: 1.0, ease: "power2.out" }, 24.9);

      // 02 → 03 (the same slot, the same dash), S4 text leaves
      tl.to("#s04 .phr .w", { x: -70, opacity: 0, filter: "blur(10px)", duration: 0.45, stagger: 0.05, ease: "power2.in" }, 24.9)
        .to("#s04 .nn", { yPercent: -80, opacity: 0, filter: "blur(10px)", duration: 0.5, ease: "power3.in" }, 25.0)
        .set("#s04 .dsh", { opacity: 0 }, 25.0)
        .set("#s05 .dsh", { opacity: 1 }, 25.0)
        .to("#s05 .nn", { opacity: 1, yPercent: 0, filter: "blur(0px)", duration: 0.75, ease: "back.out(1.8)" }, 25.2)
        .call(Film.fx("ping", 1760, 0.08), null, 25.35)
        .to("#s05 .dsh", { scale: 1.25, duration: 0.2, yoyo: true, repeat: 1, ease: "sine.inOut", transformOrigin: "50% 60%" }, 25.5);

      // rail: 02 done, 03 lit
      tl.to("#rail-fill", { width: "50%", duration: 0.7, ease: "power3.inOut" }, 25.0)
        .to("#rail .st:nth-of-type(2)", { backgroundColor: "#151215", color: "#FDB525", borderColor: "#FDB525", boxShadow: "0 0 0 rgba(253,181,37,0)", scale: 1, duration: 0.4 }, 25.1)
        .to("#rail .st:nth-of-type(3)", { backgroundColor: "#FDB525", color: "#1B191B", borderColor: "#FDB525", boxShadow: "0 0 26px rgba(253,181,37,.7)", scale: 1.1, duration: 0.5, ease: "back.out(2.5)" }, 25.5);

      /* ---- the five value cards: arrive together as a deck, then each one is "played" on its spoken beat ---- */
      cards.forEach((c, i) => {
        const t0 = 25.45 + i * 0.12;
        tl.to(c, { opacity: 1, x: 0, y: 0, rotationX: 0, rotationY: 0, rotationZ: 0, scale: 1, duration: 0.95, ease: "back.out(1.35)" }, t0)
          .to(c.querySelector(".sw"), { "--sw": 1, duration: 0.5, ease: "power2.out" }, t0 + 0.5);
      });
      tl.call(Film.fx("shimmer", 0.06, 1175), null, 25.9);

      // every card dims slightly while it waits (so the one being spoken pops)
      tl.to(cards, { filter: "brightness(.62)", duration: 0.5, ease: "power2.out" }, 26.4);

      cards.forEach((c, i) => {
        const t = T[i], ico = c.querySelectorAll(".vc-ico svg path, .vc-ico svg circle"), bars = c.querySelectorAll(".vc-b i");
        tl.to(c, { filter: "brightness(1.12)", scale: 1.075, y: -14, duration: 0.45, ease: "back.out(2)" }, t)
          .to(c, { boxShadow: "0 0 0 3px #FDB525,0 0 70px rgba(253,181,37,.55),0 30px 70px rgba(0,0,0,.6)", duration: 0.45 }, t)
          .call(Film.fx("ping", [1175, 1318, 1568, 1760, 1976][i], 0.085), null, t + 0.05)
          .to(ico, { strokeDashoffset: 0, duration: 0.7, stagger: 0.08, ease: "power2.inOut" }, t + 0.05)
          .to(bars, { scaleX: 1, duration: 0.5, stagger: 0.12, ease: "power3.out" }, t + 0.3)
          .to(c.querySelector(".bdg"), { scale: 1, duration: 0.45, ease: "back.out(3)" }, t + 0.55)
          .to(c, { filter: "brightness(.9)", scale: 1, y: 0, boxShadow: "0 0 0 2px rgba(253,181,37,.75),0 26px 60px rgba(0,0,0,.55)", duration: 0.6, ease: "power2.inOut" }, t + 1.0);
      });

      /* ---- on-screen text:  « Je comprends. » / « J'adopte. » / « J'incarne. » – one line per phase of the sequence ---- */
      tl.to(w1, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.6, stagger: 0.12, ease: "power3.out" }, 26.1)
        .to(w2, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.6, ease: "power3.out" }, 28.5)
        .to(w3, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.6, ease: "power3.out" }, 30.75)
        .to(w3, { scale: 1.06, transformOrigin: "0 60%", duration: 0.3, yoyo: true, repeat: 1, ease: "sine.inOut" }, 31.4);

      /* ---- continuous life (nothing ever freezes) ---- */
      tl.to("#cam", { x: C.C5.x - 40, scale: C.C5.scale * 1.05, duration: 5.9, ease: "sine.inOut" }, 26.2)
        .to("#w-rays", { rotation: "+=40", duration: 7, ease: "none" }, 25.5);

      /* ---- finale: all five light up together (« J'incarne. ») ---- */
      tl.to(cards, { filter: "brightness(1.18)", boxShadow: "0 0 0 3px #FDB525,0 0 60px rgba(253,181,37,.5),0 26px 60px rgba(0,0,0,.55)", duration: 0.5, stagger: 0.06, ease: "power2.out" }, 31.7)
        .call(Film.fx("shimmer", 0.08, 1568), null, 31.75)
        .to(Film.world.dust, { v: 2.1, duration: 0.6, ease: "power2.out" }, 31.7)
        .to("#rail-fill", { width: "52%", duration: 0.5 }, 31.8);
      // END-OF-SCENE-5 FRAME: five value cards lit in a 3+2 grid, "03 – Je comprends. J'adopte. J'incarne.", Passeport defocused behind, rail 03.
    },
  });
})();
