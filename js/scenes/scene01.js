/* ============================================================
   SCENE 1 – Découverte du Passeport      00:00.00 → 00:07.52
   Doc timecodes are the cut grid. Voice cues (from recording pauses):
     sentence 1  0.49 → 3.65     sentence 2  4.26 → ~8.63
   Beats:  logo assembles (0.35) · logo → corner bug (2.85) ·
           Passeport lands (4.26 on "Découvrez") · opens (4.95) ·
           title (5.30 / 6.40) · page turns away (6.95 → 7.52)
   ============================================================ */
(function () {
  const S = { start: 0, end: 7.52, preview: 8.9 };
  const $ = (q) => document.querySelector(q);
  const $$ = (q) => Array.from(document.querySelectorAll(q));

  // approved script wording, timed from the recording's pauses (CC track)
  Film.addCaptions([
    { t0: 0.49, t1: 3.65, text: "Chez RAWBANK, nos valeurs prennent vie à travers nos comportements !" },
    { t0: 4.26, t1: 8.63, text: "Découvrez votre Passeport des Valeurs, votre compagnon pour les cinq prochaines années." },
  ]);
  Film.addMarkers([{ t: 0, label: "S1" }]);

  Film.addScene({
    el: "#s01", start: S.start, end: S.end, hide: 10.7,   // hidden late: « votre compagnon… » (scene01_compagnon.js) plays on after the title clears
   
    build(tl) {
      const logo = "#w-logo", gold = $$("#w-logo .lg-gold"), lets = $$("#w-logo .lg-let");
      const rig = "#w-rig", cover = "#w-cover", leaf = "#w-leaf1", W = $$("#s01-title .w");

      /* --- initial states --- */
      gsap.set(lets, { opacity: 0, y: 46, filter: "blur(12px)" });
      gsap.set(gold, { clipPath: "inset(100% 0% 0% 0%)", x: -16, opacity: 1 });
      gsap.set(logo, { x: 0, y: 0, scale: 1, transformOrigin: "0 0" });
      gsap.set("#w-sheen", { opacity: 0, xPercent: -120 });
      gsap.set("#w-halo", { opacity: 0, scale: 0.7 });
      gsap.set("#w-rays", { opacity: 0, rotation: 0, scale: 0.8 });
      gsap.set(rig, { x: 560, y: 880, scale: 1.0, rotationY: 62, rotationX: -14, opacity: 0, transformOrigin: "0 0" });
      // page-stack order (z, px): cover 11 > leaf1 8 > leaf2 5 > conditions page 0 (see Film.stack in scene03.js)
      gsap.set(cover, { rotationY: 0, z: 11 });
      gsap.set(leaf, { rotationY: 0, z: 8 });
      gsap.set("#w-leaf2", { rotationY: 0, z: 5 });
      gsap.set("#w-floor", { x: 960, y: 0, opacity: 0, scaleX: 0.6 });
      gsap.set(W, { opacity: 0, y: 30, filter: "blur(10px)" });
      gsap.set("#s01-title", { opacity: 1, "--rule": 0 });
      gsap.set("#s01-title .l2 .w", { y: 24 });
      gsap.set("#w-book .anim1 .bar", { scaleX: 0, transformOrigin: "0 50%" });
      gsap.set("#w-book .anim1 .dots b", { scale: 0 });
      gsap.set("#w-book .anim1 .sig", { scaleX: 0, transformOrigin: "0 50%" });
      gsap.set("#w-foil", { opacity: 0, backgroundPosition: "130% 0" });
      gsap.set("#s01-flash", { opacity: 0 });
      Film.world.dust.v = 0;

      /* ---------- A. LOGO REVEAL (0.00 – 2.85) — over "Chez RAWBANK, nos valeurs prennent vie…" ---------- */
      tl.to("#w-halo", { opacity: 0.55, scale: 1, duration: 1.8, ease: "sine.out" }, 0.0)
        .to(Film.world.dust, { v: 1, duration: 1.6, ease: "sine.inOut" }, 0.1)
        .call(Film.fx("whoosh", 1.0, 260, 2600, 0.2), null, 0.28)
        .to(lets, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.9, stagger: 0.09, ease: "power3.out" }, 0.35)
        .to(gold, { clipPath: "inset(0% 0% 0% 0%)", x: 0, duration: 0.85, stagger: 0.17, ease: "power3.out" }, 0.78)
        .call(Film.fx("shimmer", 0.06, 1175), null, 1.2)
        .fromTo("#w-sheen", { opacity: 0, xPercent: -120 }, { opacity: 1, xPercent: 120, duration: 1.0, ease: "power2.inOut" }, 1.55)
        .to(logo, { scale: 1.035, x: -17.9, y: -4.1, duration: 2.2, ease: "none" }, 0.4);

      /* ---------- B. LOGO → BRAND BUG, light streak (2.85 – 3.75) ---------- */
      tl.call(Film.fx("whoosh", 0.8, 500, 4200, 0.2), null, 2.8)
        .to(logo, { scale: 0.3, x: -352, y: -352, duration: 0.95, ease: "power3.inOut" }, 2.85)
        .to("#w-halo", { opacity: 0.22, duration: 0.9, ease: "power2.inOut" }, 2.85)
        .to("#s01-flash", { opacity: 0.55, duration: 0.18, ease: "power2.out" }, 3.0)
        .to("#s01-flash", { opacity: 0, duration: 0.7, ease: "power2.in" }, 3.18);

      /* ---------- C. PASSEPORT LANDS on "Découvrez" (3.45 – 4.45) ---------- */
      tl.to(rig, { opacity: 1, duration: 0.3, ease: "none" }, 3.5)
        .to(rig, { x: 700, y: 540, scale: 1.28, rotationY: 22, rotationX: -8, duration: 1.0, ease: "expo.out" }, 3.45)
        .to("#w-floor", { opacity: 1, scaleX: 0.8, x: 960, duration: 0.9, ease: "power2.out" }, 3.6)
        .call(Film.fx("thump", 0.28), null, 4.2)
        .to(rig, { y: 552, duration: 0.12, ease: "power2.in" }, 4.18)         // tiny settle
        .to(rig, { y: 540, duration: 0.3, ease: "back.out(3)" }, 4.3)
        .to("#w-foil", { opacity: 1, backgroundPosition: "-40% 0", duration: 0.9, ease: "power2.inOut" }, 4.3)
        .to("#w-foil", { opacity: 0, duration: 0.2 }, 5.1)
        .to("#w-halo", { opacity: 0.4, duration: 0.8, ease: "sine.out" }, 4.3);

      /* ---------- D. THE PASSEPORT OPENS (4.95 – 6.05) ---------- */
      tl.call(Film.fx("paper", 0.7, 0.16), null, 4.95)
        .to("#w-backL", { opacity: 1, duration: 0.3, ease: "none" }, 5.2)
        .to(cover, { rotationY: -180, duration: 1.1, ease: "power2.inOut" }, 4.95)
        .to("#w-spine", { opacity: 0, duration: 0.5 }, 5.2)
        .set(cover, { z: 2 }, 5.5)          // mid-turn: the cover now lies on the LEFT stack, beneath every later leaf
        .to(rig, { x: 640, y: 545, rotationY: 5, rotationX: 3, scale: 1.1, duration: 1.15, ease: "power2.inOut" }, 4.95)
        .to("#w-floor", { scaleX: 1.15, x: 640, duration: 1.15, ease: "power2.inOut" }, 4.95)
        .to("#w-rays", { opacity: 0.9, scale: 1.1, rotation: 14, duration: 1.1, ease: "power2.out" }, 5.35)
        .to("#w-rays", { opacity: 0.35, rotation: 30, duration: 1.8, ease: "none" }, 6.45)
        .to("#w-halo", { opacity: 0.62, duration: 0.8 }, 5.4)
        .call(Film.fx("shimmer", 0.07, 1480), null, 5.6)
        // pages "come alive"
        .to("#w-book .anim1 .bar", { scaleX: 1, duration: 0.55, stagger: 0.035, ease: "power2.out" }, 5.65)
        .to("#w-book .anim1 .dots b", { scale: 1, duration: 0.4, stagger: 0.06, ease: "back.out(3)" }, 5.9)
        .to("#w-book .anim1 .sig", { scaleX: 1, duration: 0.6, ease: "power2.out" }, 6.1);

      /* ---------- E. ON-SCREEN TEXT (5.30 / 6.40) ---------- */
      const w1 = $$("#s01-title .l1 .w"), w2 = $$("#s01-title .l2 .w");
      tl.to("#s01-title", { "--rule": 1, duration: 0.7, ease: "power3.out" }, 5.25)
        .to(w1, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.7, stagger: 0.085, ease: "power3.out" }, 5.3)
        .to(w2, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.6, stagger: 0.07, ease: "power3.out" }, 5.95)
        .to("#s01-title", { y: -6, duration: 1.6, ease: "none" }, 5.3);

      /* ---------- F. EXIT ----------
         The title clears (7.05-7.5), drifting away from the book as the camera pulls back. Scene 1 deliberately ENDS ON A HELD, OPEN BOOK so Scene 2's
         pull-back can take over the same object without a cut (see scene02.js, 6.55 -> 8.35). */
      tl.to("#s01-title", { opacity: 0, x: 40, filter: "blur(6px)", duration: 0.45, ease: "power2.in" }, 7.05);
    },
  });
})();
