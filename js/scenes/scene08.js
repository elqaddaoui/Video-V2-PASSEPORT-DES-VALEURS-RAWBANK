/* ============================================================
   SCENE 8 – Conclusion + end card                          00:49.76 → 00:59.32
   (the storyboard's last sequence: voice ends ~54.5 in the recording, then a held end card)
   Pacing beats from the recording's energy bursts (pacing only):
     49.90-51.15 · 51.35-52.85 · 53.35-54.45 · then silence → the card is held (≈ 4.8 s)

   Scene 7 ends on: Amina + manager, the two behaviour cards and the big gold checkmark.

   TRANSITION 7 → 8  ·  "THE MEDAL RELEASES THE VALUES"   49.45 → 50.5
     49.45  « 05 – … » folds away; both cards pour INTO the checkmark (shrink + slide to centre)
     49.85  the checkmark swells, rings out, then rises to the top-centre as a gold seal
     50.0   three sparks leave the seal, one at a time, on curved paths, and land on three medallions:
            Intégrité (50.05) · Professionnalisme (51.3) · Éthique (52.55) – the duo nods on each landing
   8B · END CARD  53.4 → 59.32
     53.4   values dissolve, duo steps back, rail + top dim clear
     53.5   the RAWBANK logo flies from its corner bug back to the centre (bookend of Scene 1) with a light sheen
     54.5   « VOTRE PASSEPORT DES VALEURS » · 54.9 « Les comportements qui nous rassemblent. » · 55.8 « RAWBANK INSPIRE »
     56.3 → 59.32  held end card: slow push, drifting dust, one last glow on INSPIRE
   ============================================================ */
(function () {
  const $$ = (q) => Array.from(document.querySelectorAll(q));
  Film.addMarkers([{ t: 53.5, label: "S8B ▸ end card" }, { t: 59.32, label: "END", cut: true }]);
  Film.previewEnd = 59.32;

  const S = (d) => `<svg viewBox="0 0 78 78" fill="none" stroke="#FDB525" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
  const IC = [
    S('<path pathLength="1" d="M39 18 L56 25 V38 C56 49 49 57 39 61 C29 57 22 49 22 38 V25Z"/><path pathLength="1" d="M31 39 l6 6 11 -12"/>'),
    S('<rect pathLength="1" x="19" y="30" width="40" height="27" rx="5"/><path pathLength="1" d="M32 30 V25 a3 3 0 0 1 3 -3 h8 a3 3 0 0 1 3 3 V30"/><path pathLength="1" d="M19 43 H59"/>'),
    S('<path pathLength="1" d="M39 17 V58"/><path pathLength="1" d="M26 59 H52"/><path pathLength="1" d="M22 27 H56"/><path pathLength="1" d="M22 27 l-7 15 h14z"/><path pathLength="1" d="M56 27 l-7 15 h14z"/>'),
  ];
  IC.forEach((h, i) => (document.getElementById("s8m" + (i + 1)).innerHTML = h));

  Film.addScene({
    el: "#s08", start: 49.76, end: 59.32, at: 0, show: 49.3, hide: 60,
    build(tl) {
      const orbs = $$("#s07 .orb"), L = "#pcL", R = "#pcR", T = "#bigtick";
      const rows = [1, 2, 3].map((n) => "#s8v" + n), med = [1, 2, 3].map((n) => "#s8m" + n);
      const wd = $$(".s8x"), ul = $$(".s8u");
      const MED = [[542, 490], [542, 615], [542, 740]];     // medallion centres (screen px)
      const SEAL = [960, 215];                              // where the checkmark parks
      const LAND = [50.05, 51.3, 52.55];

      /* ---- initial states ---- */
      gsap.set(rows, { opacity: 0 });
      gsap.set(med, { scale: 0 });
      gsap.set(wd, { opacity: 0, clipPath: "inset(-30px 100% -30px 0)", x: -26, filter: "blur(8px)" });
      gsap.set(ul, { scaleX: 0 });
      gsap.set(".s8m svg path, .s8m svg rect", { strokeDasharray: 1, strokeDashoffset: 1 });
      gsap.set("#s8top", { opacity: 0, y: 18, filter: "blur(8px)" });
      gsap.set("#s8tag, #s8sig", { opacity: 1 });
      gsap.set("#s8tag .w", { opacity: 0, y: 24, filter: "blur(10px)" });
      gsap.set("#s8sig .rb", { opacity: 0, x: -40, filter: "blur(10px)" });
      gsap.set("#s8sig .in", { opacity: 0, x: 40, filter: "blur(10px)" });
      gsap.set("#s8flash", { opacity: 0 });

      /* ---- T7 : the cards pour into the checkmark ---- */
      tl.to("#s07 .s3text", { x: -60, y: -140, scale: 0.6, opacity: 0, transformOrigin: "0 0", duration: 0.75, ease: "power2.in" }, 49.45)
        .to(L, { x: 300, y: 0, scale: 0.12, opacity: 0, duration: 0.7, ease: "power3.in" }, 49.45)
        .to(R, { x: -300, y: 0, scale: 0.12, opacity: 0, duration: 0.7, ease: "power3.in" }, 49.55)
        .call(Film.fx("whoosh", 0.7, 300, 2000, 0.1), null, 49.5)
        .to(T, { scale: 1.3, duration: 0.45, ease: "power2.out" }, 49.85)
        .fromTo(T + " .r1", { scale: 1, opacity: 0.9 }, { scale: 3.4, opacity: 0, duration: 0.9, ease: "power2.out", immediateRender: false }, 49.9)
        .to("#s8flash", { opacity: 0.35, duration: 0.15 }, 49.9).to("#s8flash", { opacity: 0, duration: 0.7 }, 50.05)
        .to(T, { y: SEAL[1] - 545, scale: 0.55, duration: 0.7, ease: "power3.inOut" }, 50.0)
        .to(Film.world.dust, { v: 2.2, duration: 0.4 }, 49.9);

      /* ---- three sparks → three medallions ---- */
      LAND.forEach((tt, i) => {
        const o = orbs[i], dx = MED[i][0] - SEAL[0], dy = MED[i][1] - SEAL[1], t0 = tt - 0.75;
        tl.set(o, { x: SEAL[0], y: SEAL[1], scale: 0.5 }, t0)
          .to(o, { opacity: 1, duration: 0.1 }, t0)
          .to(o, { x: MED[i][0], duration: 0.75, ease: "power2.inOut" }, t0)
          .to(o, { y: MED[i][1], duration: 0.75, ease: "power3.in" }, t0)
          .to(o, { scale: 1.8, duration: 0.75, ease: "power2.in" }, t0)
          .to(o, { opacity: 0, scale: 0.2, duration: 0.12, ease: "none" }, tt - 0.1)
          .to(T, { scale: 0.5, duration: 0.15, yoyo: true, repeat: 1, ease: "sine.inOut" }, t0)   // the seal gives a little of itself
          .to(rows[i], { opacity: 1, duration: 0.01 }, tt - 0.12)
          .to(med[i], { scale: 1, duration: 0.55, ease: "back.out(2.6)" }, tt - 0.1)
          .to(med[i], { boxShadow: "0 0 0 3px #FDB525,0 0 0 22px rgba(253,181,37,.0),0 0 70px rgba(253,181,37,.8)", duration: 0.2, yoyo: true, repeat: 1, ease: "sine.inOut" }, tt)
          .call(Film.fx("ping", [1175, 1318, 1568][i], 0.06), null, tt - 0.05)
          .to(med[i].replace("#", "#") + " svg path, " + med[i] + " svg rect", { strokeDashoffset: 0, duration: 0.55, stagger: 0.07, ease: "power2.inOut" }, tt + 0.05)
          .to(wd[i], { opacity: 1, clipPath: "inset(-30px 0% -30px 0)", x: 0, filter: "blur(0px)", duration: 0.65, ease: "power3.out" }, tt + 0.05)
          .to(ul[i], { scaleX: 1, duration: 0.7, ease: "power3.inOut" }, tt + 0.3);
      });
      // the duo nods on every landing
      LAND.forEach((tt, i) => {
        tl.to("#amina-head-d", { rotation: 2.2, y: 3, duration: 0.45, yoyo: true, repeat: 1, ease: "sine.inOut" }, tt + (i % 2 ? 0.25 : 0.1))
          .to("#mgr-head-x", { rotation: -2.2, y: 3, duration: 0.45, yoyo: true, repeat: 1, ease: "sine.inOut" }, tt + (i % 2 ? 0.1 : 0.3));
      });
      tl.to("#eyeL-d, #eyeR-d", { scaleY: 0.08, duration: 0.07, yoyo: true, repeat: 1, ease: "none" }, 51.0)
        .to("#eyeL-m-x, #eyeR-m-x", { scaleY: 0.08, duration: 0.07, yoyo: true, repeat: 1, ease: "none" }, 52.2);

      /* ---- 8B · END CARD ---- */
      tl.to(rows, { opacity: 0, y: -26, filter: "blur(8px)", duration: 0.55, stagger: 0.08, ease: "power2.in" }, 53.35)
        .to(T, { opacity: 0, scale: 0.2, duration: 0.5, ease: "power2.in" }, 53.35)
        .to("#duoA", { x: -330, opacity: 0, filter: "blur(14px)", duration: 0.9, ease: "power2.in" }, 53.35)
        .to("#duoM", { x: 1690, opacity: 0, filter: "blur(14px)", duration: 0.9, ease: "power2.in" }, 53.35)
        .to("#rail", { opacity: 0, duration: 0.5 }, 53.2)
        .to("#topdim", { opacity: 0, duration: 0.6 }, 53.4)
        .call(Film.fx("whoosh", 1.0, 240, 2400, 0.12), null, 53.5)
        .to("#w-logo", { scale: 1, x: 0, y: 0, duration: 1.0, ease: "power3.inOut" }, 53.5)
        .to("#w-halo", { opacity: 0.85, scale: 1.1, duration: 1.4, ease: "sine.out" }, 53.5)
        .to("#w-rays", { opacity: 0.8, scale: 1.1, rotation: 14, duration: 1.4, ease: "sine.out" }, 53.6)
        .to("#w-rays", { opacity: 0.4, rotation: 40, duration: 4.8, ease: "none" }, 55.0)
        .fromTo("#w-sheen", { opacity: 0, xPercent: -120 }, { opacity: 1, xPercent: 120, duration: 1.0, ease: "power2.inOut", immediateRender: false }, 54.4)
        .call(Film.fx("shimmer", 0.05, 1318), null, 54.5)
        .to("#s8top", { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.7, ease: "power3.out" }, 54.5)
        .to("#s8tag .w", { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.6, stagger: 0.1, ease: "power3.out" }, 54.95)
        .to("#s8sig .rb", { opacity: 1, x: 0, filter: "blur(0px)", duration: 0.8, ease: "power3.out" }, 55.85)
        .to("#s8sig .in", { opacity: 1, x: 0, filter: "blur(0px)", duration: 0.8, ease: "power3.out" }, 56.0)
        .call(Film.fx("bloom", 0.04, 659), null, 56.0)
        .to(Film.world.dust, { v: 1.6, duration: 1.5, ease: "sine.inOut" }, 54.0)
        // held card: a slow push on the logo, one last glow on INSPIRE
        .to("#w-logo", { scale: 1.035, x: -17.9, y: -4.1, duration: 4.8, ease: "none" }, 54.55)
        .to("#s8sig .in", { textShadow: "0 0 70px rgba(253,181,37,1)", duration: 0.9, yoyo: true, repeat: 1, ease: "sine.inOut" }, 57.4);
      // END-OF-FILM FRAME: logo centred, VOTRE PASSEPORT DES VALEURS / tagline / RAWBANK INSPIRE, gold dust.
    },
  });
})();
