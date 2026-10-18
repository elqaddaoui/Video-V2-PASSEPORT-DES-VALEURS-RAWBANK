/* ============================================================
   SCENE 3 – Étape 1 : Mon identité            00:14.08 → 00:19.72
   Voice: "Première étape :" 15.20-15.82 · "je renseigne mes informations personnelles dans la
   rubrique Mon identité" 16.20-19.10 · "et je signe." 19.24-20.08  (the sentence runs 0.36 s past the cut;
   the preview keeps playing so you hear it finish, then holds the final frame)

   TRANSITION 2 → 3  ·  "THE PAGE-TURN PUSH-IN"  ·  13.85 → 15.70 (1.85 s, one continuous camera move)
     Scene 2 ends on the held two-handed shot (camera C2) with the 3 pictograms on the right.
     1) 13.85  pictogram column glides right + fades (it is screen-space, never touches the book)
     2) 13.90  collaborator (head, arms, hands) softens into the haze and drifts UP-LEFT; the halo follows her
     3) 14.00  SAME #cam dollies in  C2 → C3  (scale .52 → 1.35, book slides to the right half of frame)
     4) 14.65  as the lens passes the page, leaf 1 turns (cover-side page), revealing « Mon identité »
               — the page the collaborator was holding is now the page we are zooming into. No cut.
     5) 14.95  number rail (01-05) fades in, step 01 lit · left dim panel + "01 –" arrive (screen space)
   ============================================================ */
(function () {
  const $$ = (q) => Array.from(document.querySelectorAll(q));

  Film.addCaptions([
    { t0: 15.2, t1: 15.82, text: "Première étape :" },
    { t0: 16.2, t1: 19.1, text: "je renseigne mes informations personnelles dans la rubrique Mon identité" },
    { t0: 19.24, t1: 20.08, text: "et je signe." },
  ]);
  Film.addMarkers([{ t: 14.08, label: "S3 ▸ cut", cut: true }, { t: 19.72, label: "S4 ▸ cut", cut: true }]);

  Film.cam = Object.assign(Film.cam || {}, {
    C3: { scale: 1.35, x: 475, y: -7, rotation: 0 },       // Scene 3 hold: « Mon identité » fills the right half
  });
  Film.previewEnd = 20.5;

  Film.addScene({
    el: "#s03", start: 14.08, end: 19.72, at: 0, show: 13.6, hide: 21,
    build(tl) {
      const C = Film.cam, A = "#cast-back", H = "#cast-front";
      const inks = $$("#idPage .ink"), vals = $$("#idPage .val"), w = $$("#s03 .phr .w");
      const fieldsT = [16.45, 16.9, 17.35, 17.8, 18.25];   // typed in order, one per phrase beat

      /* ---- initial states ---- */
      gsap.set("#stepdim", { opacity: 0 });
      gsap.set("#rail", { opacity: 0, y: -14 });
      gsap.set("#s03 .nn", { opacity: 0, x: -50, scale: 0.9, transformOrigin: "0 60%" });
      gsap.set("#s03 .dsh", { opacity: 0, scaleX: 0, transformOrigin: "0 50%" });
      gsap.set(w, { opacity: 0, y: 28, filter: "blur(10px)" });
      gsap.set(inks, { scaleX: 0 });
      gsap.set(vals, { "--tick": 0 });
      gsap.set("#idPage .idp-head .hl", { scaleX: 0 });
      gsap.set("#sigA, #sigB", { strokeDasharray: 1, strokeDashoffset: 1 });
      gsap.set("#idPhoto", { opacity: 0.0 });
      gsap.set("#w-leaf1", { rotationY: 0 });

      /* ---- TRANSITION 2→3 ---- */
      tl.to("#s02-rows", { x: 140, opacity: 0, duration: 0.55, ease: "power2.in" }, 13.85)
        .call(Film.fx("whoosh", 1.5, 220, 2400, 0.16), null, 13.95)
        .to([A, H], { opacity: 0, y: -60, x: -40, filter: "blur(14px)", duration: 0.95, ease: "power2.in" }, 13.9)
        .fromTo("#cam", C.C2, Object.assign({ duration: 1.7, ease: "power3.inOut", immediateRender: false }, C.C3), 14.0)
        .to("#w-halo", { x: 220, y: 20, opacity: 0.5, duration: 1.6, ease: "power2.inOut" }, 14.0)
        .call(Film.fx("paper", 0.8, 0.18), null, 14.65)
        .to("#w-leaf1", { rotationY: -180, duration: 0.95, ease: "power2.inOut" }, 14.65)
        .set("#w-leaf1", { z: 3 }, 15.1)
        .to("#w-rays", { opacity: 0.25, duration: 1.0 }, 14.5);

      /* ---- screen-space graphics arrive (14.95 →) ---- */
      tl.to("#stepdim", { opacity: 1, duration: 0.9, ease: "power2.out" }, 14.85)
        .to("#rail", { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, 14.95)
        .to("#rail-fill", { width: "0%", duration: 0.01 }, 14.95)
        .to("#rail .st:nth-of-type(1)", { backgroundColor: "#FDB525", color: "#1B191B", borderColor: "#FDB525", boxShadow: "0 0 26px rgba(253,181,37,.7)", scale: 1.1, duration: 0.5, ease: "back.out(2.5)" }, 15.05)
        .to("#s03 .nn", { opacity: 1, x: 0, scale: 1, duration: 0.8, ease: "power3.out" }, 15.15)
        .to("#s03 .dsh", { opacity: 1, scaleX: 1, duration: 0.5, ease: "power3.out" }, 15.45)
        .call(Film.fx("ping", 1318, 0.08), null, 15.2)
        .to(w, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.6, stagger: 0.11, ease: "power3.out" }, 16.2);   // "Je complète et je signe." rides "je renseigne…"

      /* ---- the form fills itself (16.3 → 18.5) ---- */
      tl.to("#idPhoto", { opacity: 1, duration: 0.5 }, 16.25);
      inks.forEach((ink, i) => {
        const t = fieldsT[i] !== undefined ? fieldsT[i] : 18.25;
        tl.call(Film.fx("scribble", 0.38, 0.05), null, t)
          .to(ink, { scaleX: 1, duration: 0.42, ease: "steps(14)" }, t)
          .to(vals[i], { "--tick": 1, duration: 0.3, ease: "back.out(3)" }, t + 0.42);
      });
      tl.to("#idPage .idp-head .hl", { scaleX: 1, duration: 0.55, ease: "power3.out" }, 17.6)    // underline « Mon identité » when it is spoken (≈17.6-19.1)
        .fromTo("#idPage .idp-head h3", { color: "#1B191B" }, { color: "#C98A0E", duration: 0.4, yoyo: true, repeat: 1, immediateRender: false }, 17.7);

      /* ---- signature (19.25 → 19.95) on « et je signe. » ---- */
      tl.call(Film.fx("scribble", 0.75, 0.07), null, 19.27)
        .to("#sigA", { strokeDashoffset: 0, duration: 0.62, ease: "power1.inOut" }, 19.27)
        .to("#sigB", { strokeDashoffset: 0, duration: 0.2, ease: "power2.out" }, 19.86)
        .call(Film.fx("shimmer", 0.06, 1760), null, 20.0)
        .to("#idPage", { filter: "drop-shadow(0 0 22px rgba(253,181,37,.55))", duration: 0.4, yoyo: true, repeat: 1, ease: "sine.inOut" }, 20.0)
        // rail: step 01 reads as "done" (progress line starts to run toward 02) — sets up Scene 4
        .to("#rail-fill", { width: "9%", duration: 0.6, ease: "power2.out" }, 20.0);

      // END-OF-SCENE-3 FRAME (hand-off to Scene 4): camera C3, « Mon identité » complete + signed,
      // rail at 01, dim panel + "01 – Je complète et je signe." held. Scene 4 opens by turning leaf 2 from here.
    },
  });
})();
