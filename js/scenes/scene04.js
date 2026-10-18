/* ============================================================
   SCENE 4 – Étape 2 : Mes engagements            00:19.72 → 00:25.36
   Pacing beats taken from the pauses/energy of the recording (no wording derived from it):
     short phrase 20.36-20.88 · pause · main phrase 21.49-24.88 · next scene's phrase starts 24.99

   Scene 3 ends on a HELD, signed « Mon identité » page (camera C3, rail 01, "01 – Je complète et je signe.").

   TRANSITION 3 → 4  ·  "THE LEAF WHIP"  ·  20.10 → 21.30  (one continuous move, same book, same camera)
     20.10  whoosh · camera starts C3 → C4 (push-in + a 1.2° dutch roll that settles) · a gold light-veil sweeps L→R across the frame
     20.12  leaf 2 (the signed page) whips over to the left (1.0 s) – the page it reveals is « Conditions générales … »
     20.15  « Je complète et je signe. » shreds away to the left (blur, stagger)
     20.20  « 01 » rolls UP out of its slot while « 02 » rolls UP in (odometer) – the dash never moves
     20.40  rail fills to 02, step 01 turns to "done", step 02 lights
   ============================================================ */
(function () {
  const $$ = (q) => Array.from(document.querySelectorAll(q));
  Film.addMarkers([{ t: 19.72, label: "S4 ▸ cut", cut: true }, { t: 25.36, label: "S5 ▸ cut", cut: true }]);
  Film.cam = Object.assign(Film.cam || {}, { C4: { scale: 1.36, x: 455, y: 4 } });

  Film.addScene({
    el: "#s04", start: 19.72, end: 25.36, at: 0, show: 20.1, hide: 26.0,
    build(tl) {
      const C = Film.cam;
      const w = $$("#s04 .phr .w"), cp = document.querySelector("#condPage .cp");
      const marks = $$("#condPage .cp .ln .mk"), rows = $$("#condPage .cp .cl"), ack = document.querySelector("#condPage .cp-ack");
      const pen = document.getElementById("pen");
      const MT = [21.75, 22.4, 22.95, 23.5, 24.05];       // highlighter strokes, one per marked line (spread over the main phrase)

      /* ---- initial states ---- */
      gsap.set("#s04 .nn", { opacity: 0, yPercent: 80, filter: "blur(10px)" });
      gsap.set(w, { opacity: 0, y: 30, filter: "blur(10px)" });
      gsap.set(rows, { opacity: 0, x: 26 });
      gsap.set(ack, { opacity: 0, y: 14 });
      gsap.set(".cp-head .hl", { scaleX: 0 });
      gsap.set(".cp-head h3", { opacity: 0, y: 8 });
      gsap.set(marks, { scaleX: 0 });
      gsap.set(".cp .cb", { "--tick": 0 });
      gsap.set(pen, { opacity: 0 });
      gsap.set("#veil", { x: 0, opacity: 0 });

      /* ---- TRANSITION 3→4 ---- */
      tl.call(Film.fx("whoosh", 0.9, 300, 3600, 0.2), null, 20.1)
        .call(Film.fx("paper", 0.8, 0.2), null, 20.12)
        .fromTo("#cam", C.C3, Object.assign({ duration: 1.25, ease: "power3.inOut", immediateRender: false }, { scale: C.C4.scale, x: C.C4.x, y: C.C4.y }), 20.1)
        .fromTo("#cam", { rotation: 0 }, { rotation: -1.2, duration: 0.45, ease: "sine.out", immediateRender: false }, 20.1)
        .to("#cam", { rotation: 0, duration: 0.9, ease: "sine.inOut" }, 20.55)
        .to("#w-leaf2", { rotationY: -180, duration: 1.0, ease: "power2.inOut" }, 20.12)
        .set("#w-leaf2", { z: 4 }, 20.55)
        .to("#w-halo", { x: 150, opacity: 0.7, duration: 1.2, ease: "power2.inOut" }, 20.1)
        .to("#veil", { opacity: 1, duration: 0.2, ease: "none" }, 20.12)
        .to("#veil", { x: 3300, duration: 0.95, ease: "power2.inOut" }, 20.12)
        .to("#veil", { opacity: 0, duration: 0.2, ease: "none" }, 20.9)
        .to(Film.world.dust, { v: 1.9, duration: 0.5, ease: "power2.out" }, 20.15)
        .to(Film.world.dust, { v: 1.0, duration: 1.6, ease: "sine.inOut" }, 20.7);

      // « Je complète et je signe. » leaves, « 01 » rolls out / « 02 » rolls in (same slot, same dash)
      tl.to("#s03 .phr .w", { x: -70, opacity: 0, filter: "blur(10px)", duration: 0.45, stagger: 0.05, ease: "power2.in" }, 20.15)
        .to("#s03 .nn", { yPercent: -80, opacity: 0, filter: "blur(10px)", duration: 0.5, ease: "power3.in" }, 20.2)
        .set("#s03 .dsh", { opacity: 0 }, 20.1)              // s04 has its own dash in the exact same spot
        .set("#s04 .dsh", { opacity: 1 }, 20.1)
        .to("#s04 .nn", { opacity: 1, yPercent: 0, filter: "blur(0px)", duration: 0.75, ease: "back.out(1.8)" }, 20.4)
        .call(Film.fx("ping", 1568, 0.08), null, 20.55)
        .to("#s04 .dsh", { scale: 1.25, duration: 0.2, yoyo: true, repeat: 1, ease: "sine.inOut", transformOrigin: "50% 60%" }, 20.7);

      // rail: 01 done, 02 lit
      tl.to("#rail-fill", { width: "25%", duration: 0.7, ease: "power3.inOut" }, 20.35)
        .to("#rail .st:nth-of-type(1)", { backgroundColor: "#151215", color: "#FDB525", borderColor: "#FDB525", boxShadow: "0 0 0 rgba(253,181,37,0)", scale: 1, duration: 0.4 }, 20.5)
        .to("#rail .st:nth-of-type(2)", { backgroundColor: "#FDB525", color: "#1B191B", borderColor: "#FDB525", boxShadow: "0 0 26px rgba(253,181,37,.7)", scale: 1.1, duration: 0.5, ease: "back.out(2.5)" }, 20.8);

      /* ---- the page comes alive (20.85 →) ---- */
      tl.to(".cp-head h3", { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, 20.85)
        .to(".cp-head .hl", { scaleX: 1, duration: 0.6, ease: "power3.out" }, 21.05)
        .to(rows, { opacity: 1, x: 0, duration: 0.5, stagger: 0.14, ease: "power3.out" }, 21.15)
        // on-screen text rides the main phrase
        .to(w, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.6, stagger: 0.12, ease: "power3.out" }, 21.5);

      /* ---- HIGHLIGHTER (the storyboard's key gesture): a gold marker sweeps the important lines ---- */
      const pos = (el) => { let x = 0, y = 0, e = el; while (e && e !== cp) { x += e.offsetLeft; y += e.offsetTop; e = e.offsetParent; } return { x, y, w: el.offsetWidth }; };
      tl.set(pen, { x: -10, y: 120 }, 21.0);
      tl.to(pen, { opacity: 1, duration: 0.25 }, 21.55);
      marks.forEach((m, i) => {
        const p = pos(m.parentNode), t = MT[i];
        const tipY = p.y + 6;
        tl.to(pen, { x: p.x - 8 - 4, y: tipY - 68 + 2, duration: 0.2, ease: "power2.out" }, t - 0.2)
          .call(Film.fx("scribble", 0.4, 0.045), null, t)
          .to(m, { scaleX: 1, duration: 0.42, ease: "power1.inOut" }, t)
          .to(pen, { x: p.x + p.w - 4, y: tipY - 68 - 2, duration: 0.42, ease: "power1.inOut" }, t)
          .to(Film.world.dust, { v: 1.35, duration: 0.15, yoyo: true, repeat: 1 }, t + 0.3);
      });
      tl.to(pen, { opacity: 0, y: "-=40", x: "+=40", duration: 0.35, ease: "power2.in" }, 24.55);

      // camera slowly leans into the highlighted lines (continuous, returns nothing – T4 takes over from this pose)
      tl.to("#cam", { scale: 1.42, x: 440, y: 0, duration: 3.0, ease: "sine.inOut" }, 21.5);

      /* ---- acknowledgement: the box ticks (24.35 → 24.9) ---- */
      tl.to(ack, { opacity: 1, y: 0, duration: 0.45, ease: "power3.out" }, 24.25)
        .to(".cp .cb", { "--tick": 1, duration: 0.35, ease: "back.out(3)" }, 24.7)
        .call(Film.fx("ping", 1976, 0.09), null, 24.7)
        .to("#condPage", { filter: "drop-shadow(0 0 24px rgba(253,181,37,.6))", duration: 0.35, yoyo: true, repeat: 1, ease: "sine.inOut" }, 24.75);
      // END-OF-SCENE-4 FRAME → Scene 5 takes the same book, same camera pose, same rail.
    },
  });
})();
