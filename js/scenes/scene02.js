/* ============================================================
   SCENE 2 – À quoi sert-il ?                  00:07.52 → 00:14.08
   Voice (from the recording):  "…cinq prochaines années." ends 8.62
     "Individuel,"  9.28-9.94 · "il vous aide à incarner" 10.16-11.4
     "nos cinq valeurs …" 11.54-14.66  (pause-free; syllable-timed estimates below)

   TRANSITION 1 → 2  ·  "THE PULL-BACK"  ·  6.55 → 8.35  (1.8 s, one continuous camera move)
     Scene 1 ends on the open Passeport, centred-left, gold halo behind, brand bug top-left.
     The SAME book object is kept; #cam dollies back + left (scale 1 → .52, tilting down) while a collaborator
     resolves out of the gold haze BEHIND it once the move is ~70% done (7.7, opacity 0→1, blur 16→0, rise 70px) and her hands arrive
     on the lower corners. Floor shadow melts away (she is now holding it). Halo slides left to rim-light her.
     Nothing cuts, nothing re-poses: book rotation/scale/page content are untouched.
   ============================================================ */
(function () {
  const $$ = (q) => Array.from(document.querySelectorAll(q));
  const ICON = {
    values: `<svg viewBox="0 0 132 132" fill="none" stroke="#FDB525" stroke-width="5" stroke-linecap="round" stroke-linejoin="round">
      <path pathLength="1" d="M66 30 L96 58 L66 102 L36 58 Z"/><path pathLength="1" d="M36 58 H96"/><path pathLength="1" d="M52 58 L66 30 L80 58"/><path pathLength="1" d="M52 58 L66 102 L80 58"/></svg>`,
    eval: `<svg viewBox="0 0 132 132" fill="none" stroke="#FDB525" stroke-width="5" stroke-linecap="round" stroke-linejoin="round">
      <path pathLength="1" d="M44 40 H88 a6 6 0 0 1 6 6 V92 a6 6 0 0 1 -6 6 H44 a6 6 0 0 1 -6 -6 V46 a6 6 0 0 1 6 -6Z"/><path pathLength="1" d="M56 34 H76 V46 H56Z"/>
      <path pathLength="1" d="M48 66 l6 6 10 -11"/><path pathLength="1" d="M70 66 H84"/><path pathLength="1" d="M48 84 l6 6 10 -11"/><path pathLength="1" d="M70 84 H84"/></svg>`,
    progress: `<svg viewBox="0 0 132 132" fill="none" stroke="#FDB525" stroke-width="5" stroke-linecap="round" stroke-linejoin="round">
      <path pathLength="1" d="M36 96 V80 H50 V96Z"/><path pathLength="1" d="M60 96 V68 H74 V96Z"/><path pathLength="1" d="M84 96 V56 H98 V96Z"/>
      <path pathLength="1" d="M34 64 L58 44 L70 52 L98 28"/><path pathLength="1" d="M84 28 H98 V42"/></svg>`,
  };
  $$("#s02 .med").forEach((m) => (m.innerHTML = ICON[m.dataset.ico]));

  Film.addCaptions([{ t0: 9.28, t1: 14.66, text: "Individuel, il vous aide à incarner nos cinq valeurs et sert de référence à votre appréciation annuelle." }]);
  Film.addMarkers([{ t: 7.52, label: "S2 ▸ cut", cut: true }]);

  // Camera poses (screen = 960 + scale·(world−960) + translate). Book centre is world (640,545).
  Film.cam = Object.assign(Film.cam || {}, {
    C1: { scale: 1, x: 0, y: 0, rotation: 0 },                  // Scene 1 end frame
    C2: { scale: 0.52, x: -233.6, y: 228, rotation: 0 },        // Scene 2 hold: collaborator left, copy space right
  });

  Film.addScene({
    el: "#s02", start: 7.52, end: 14.08, at: 0, show: 7.0, hide: 14.6,
    build(tl) {
      const C = Film.cam, A = "#cast-back", H = "#cast-front";
      const rows = $$("#s02 .row");

      /* ---- initial states ---- */
      gsap.set("#cam", Object.assign({ transformOrigin: "50% 50%" }, C.C1));
      gsap.set([A, H], { opacity: 0, y: 70, filter: "blur(16px)" });
      gsap.set("#s02 .med", { scale: 0, rotation: -25 });
      gsap.set("#s02 .med svg path", { strokeDasharray: 1, strokeDashoffset: 1 });
      gsap.set("#s02 .rt .w", { opacity: 0, y: 26, filter: "blur(10px)" });
      gsap.set("#s02 .rt .n", { scale: 0.4, transformOrigin: "50% 60%" });
      gsap.set("#s02-line", { scaleY: 0 });
      gsap.set("#eyeL", { svgOrigin: "361 304" }); gsap.set("#eyeR", { svgOrigin: "439 304" });
      gsap.set("#amina-head", { svgOrigin: "400 428" });
      gsap.set("#amina-smile", { svgOrigin: "400 366", scaleY: 0.6 });
      gsap.set("#amina-brows", { svgOrigin: "400 272" });

      /* ---- TRANSITION 1→2 : the pull-back (6.55 → 8.35) ---- */
      tl.call(Film.fx("whoosh", 1.7, 180, 1500, 0.14), null, 6.55)
        .fromTo("#cam", C.C1, Object.assign({ duration: 1.8, ease: "power2.inOut", immediateRender: false }, C.C2), 6.55)
        .fromTo("#w-halo", { x: 0 }, { x: -260, duration: 1.8, ease: "power2.inOut", immediateRender: false }, 6.55)
        .to("#w-floor", { opacity: 0, duration: 0.9, ease: "power2.in" }, 6.6)
        .to(A, { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.0, ease: "power2.out" }, 7.7)
        .to(H, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.9, ease: "power2.out" }, 7.85)
        .call(Film.fx("shimmer", 0.05, 988), null, 8.2);

      /* ---- the collaborator comes alive (7.9 → 14.0) ---- */
      tl.to("#amina-smile", { scaleY: 1.25, duration: 0.7, ease: "sine.inOut" }, 8.3)
        .to("#amina-brows", { y: -5, duration: 0.5, yoyo: true, repeat: 1, ease: "sine.inOut" }, 8.55)
        .to("#amina-head", { rotation: 1.6, y: 3, duration: 0.55, yoyo: true, repeat: 1, ease: "sine.inOut" }, 9.25)    // small nod on "Individuel,"
        .to("#amina-head", { rotation: -1.2, duration: 1.4, yoyo: true, repeat: 3, ease: "sine.inOut" }, 10.2)
        .to("#amina-eyes .eye", { scaleY: 0.08, duration: 0.07, yoyo: true, repeat: 1, ease: "none" }, 8.95)
        .to("#amina-eyes .eye", { scaleY: 0.08, duration: 0.07, yoyo: true, repeat: 1, ease: "none" }, 11.9)
        .to("#w-halo", { opacity: 0.8, duration: 0.45, yoyo: true, repeat: 1, ease: "sine.inOut" }, 9.3)                 // soft pulse on "Individuel"
        // calm hand-held camera breathing (returns exactly to C2 so the next move starts clean)
        .fromTo("#cam", { y: C.C2.y, rotation: 0 }, { y: C.C2.y + 5, rotation: 0.22, duration: 1.3, ease: "sine.inOut", yoyo: true, repeat: 3, immediateRender: false }, 8.4);

      /* ---- pictograms + on-screen text (approved wording: « 5 valeurs – 5 ans – 1 engagement personnel ») ---- */
      const ping = (r, t0, f) => {
        const med = rows[r].querySelector(".med"), paths = med.querySelectorAll("svg path");
        const w = rows[r].querySelectorAll(".rt .w"), n = rows[r].querySelector(".rt .n");
        tl.call(Film.fx("ping", f, 0.08), null, t0)
          .to(med, { scale: 1, rotation: 0, duration: 0.55, ease: "back.out(2.4)" }, t0)
          .to(paths, { strokeDashoffset: 0, duration: 0.65, stagger: 0.08, ease: "power2.inOut" }, t0 + 0.12)
          .to(n, { scale: 1, duration: 0.5, ease: "back.out(2.6)" }, t0 + 0.28)
          .to(w, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.55, stagger: 0.1, ease: "power3.out" }, t0 + 0.28);
      };
      tl.to("#s02-line", { scaleY: 1, duration: 2.0, ease: "none" }, 10.9);
      ping(0, 10.9, 1568);   // « 5 valeurs – »        on "il vous aide à incarner / nos cinq valeurs"
      ping(1, 11.95, 1760);  // « 5 ans – »            on "et sert de référence"
      ping(2, 12.85, 1976);  // « 1 engagement personnel » on "à votre appréciation annuelle"
      tl.to("#s02 .med", { boxShadow: "0 0 0 3px #FDB525,0 0 0 11px rgba(253,181,37,.2),0 18px 44px rgba(0,0,0,.5),0 0 80px rgba(253,181,37,.5)", duration: 0.5, yoyo: true, repeat: 1, stagger: 0 }, 13.55);
    },
  });
})();
