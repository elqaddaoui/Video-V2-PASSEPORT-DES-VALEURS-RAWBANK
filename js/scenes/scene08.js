/* ============================================================
   SCENE 8 – « Chaque jour, devenons des modèles à suivre. » → five colleagues → end card      00:46.75 → 00:59.32
   Voice: "Chaque jour," 47.32 · "devenons des modèles à suivre." 48.12-49.46 · "Votre passeport des valeurs," 49.96-51.16 ·
          "les comportements qui nous rassemblent." 51.44-52.92 · "RAWBANK inspire." 53.48-54.6

   Scene 8 now STARTS ON 46.75 – the exact last frame of Scene 7 (duo + two cards + gold tick).
   A  46.78  the two cards FLIP INWARD like pages closing (hinged on their inner edges); they go edge-on and their gold edges meet at the checkmark (47.25)
   B  47.3   the checkmark is absorbed by the seam, which opens sideways into the closed Passeport – between Amina and the manager (one motion)
   C  48.0   smooth camera PULL-BACK: three more colleagues (Naomi, Léa, Karim) resolve out of the haze → five people in a row
   D  49.0   the Passeport multiplies: five copies leave the centre on arcs and land in each colleague's hands (49.45 → 49.85) – badge « W » rings on landing
   E  49.96  « Votre passeport des valeurs, les comportements qui nous rassemblent » – the five badges glow in sequence, gentle breathing / nods
   F  53.0   the group melts into the gold haze while the RAWBANK logo flies back to the centre (unchanged end card, below) – no jump cut
   ============================================================ */
(function () {
  const $$ = (q) => Array.from(document.querySelectorAll(q));
  Film.addMarkers([{ t: 48.0, label: "S8 ▸ pull-back" }, { t: 53.5, label: "S8B ▸ end card" }, { t: 59.32, label: "END", cut: true }]);
  Film.previewEnd = 59.32;

  // --- the five-colleague layout (duo space = #duo, before the pull-back scale) ---
  const SC = 0.7, GY = 324;
  const BOOK = { u: 400, v: 830, s: 0.56 };              // where each Passeport sits inside a colleague's container
  const PEOPLE = [   // key, element, base transform, landing time
    { k: "N", id: "#s8pN", x: 680, y: 312, sc: 0.72, enter: 48.3, land: 49.45 },
    { k: "L", id: "#s8pL", x: 285, y: GY + 4, sc: SC, enter: 48.45, land: 49.55 },
    { k: "K", id: "#s8pK", x: 1075, y: GY + 4, sc: SC, enter: 48.6, land: 49.65 },
    { k: "A", id: "#duoA", x: -110, y: GY, sc: SC, enter: 0, land: 49.75 },
    { k: "M", id: "#duoM", x: 1470, y: GY, sc: SC, enter: 0, land: 49.85 },
  ];
  const MID = { x: 960, y: 545, s: 0.85 };
  const PULL = { s: 0.82, y: -72 };

  Film.addScene({
    el: "#s08", start: 46.75, end: 59.32, at: 0, show: 46.7, hide: 60,
    build(tl) {
      const L = "#pcL", R = "#pcR", T = "#bigtick", duo = "#duo", midSel = "#s8mid";
      const P = PEOPLE.map((p) => Object.assign({}, p, { c: Film.cast8[p.k] }));
      // static look of every colleague's own book + front layer
      P.forEach((p) => gsap.set(p.c.hold, { x: BOOK.u, y: BOOK.v, scale: BOOK.s, opacity: 0, transformOrigin: "50% 50%" }));
      P.forEach((p) => gsap.set(p.c.fr, { opacity: 0 }));
      P.forEach((p) => { if (p.enter) gsap.set(p.id, { x: p.x, y: p.y + 80, scale: p.sc, opacity: 0, filter: "blur(16px)" }); });

      // central Passeport (same artwork as the Scene-1 cover) + the five flying copies
      const mid = document.querySelector(midSel);
      mid.innerHTML = Film.cast8.A.hold.innerHTML;
      gsap.set(mid, { x: MID.x, y: MID.y, scale: MID.s, scaleX: 0.02, opacity: 0, transformOrigin: "50% 50%" });
      const fly = document.createElement("div"); fly.id = "s8fly"; fly.style.cssText = "position:absolute;inset:0;pointer-events:none";
      document.getElementById("duo").appendChild(fly);
      const flyEls = P.map((p) => { const d = document.createElement("div"); d.className = "s8hold"; d.innerHTML = mid.innerHTML; fly.appendChild(d); gsap.set(d, { x: MID.x, y: MID.y, scale: MID.s, opacity: 0, transformOrigin: "50% 50%" }); return d; });

      gsap.set(duo, { transformOrigin: "960px 1080px", scale: 1, y: 0 });
      gsap.set("#s8seam", { opacity: 0, scaleY: 0.5 });
      gsap.set("#s8fade", { opacity: 0 });
      gsap.set("#s8flash", { opacity: 0 });
      gsap.set("#s8top", { opacity: 0, y: 18, filter: "blur(8px)" });
      gsap.set("#s8tag, #s8sig", { opacity: 1 });
      gsap.set("#s8tag .w", { opacity: 0, y: 24, filter: "blur(10px)" });
      gsap.set("#s8sig .rb", { opacity: 0, x: -40, filter: "blur(10px)" });
      gsap.set("#s8sig .in", { opacity: 0, x: 40, filter: "blur(10px)" });
      gsap.set(".rb-ring", { transformOrigin: "50% 50%", opacity: 0 });
      gsap.set("#eyeL-n8, #eyeL-l8, #eyeL-k8", { svgOrigin: "361 304" }); gsap.set("#eyeR-n8, #eyeR-l8, #eyeR-k8", { svgOrigin: "439 304" });
      gsap.set("#head-n8, #head-l8, #head-k8", { svgOrigin: "400 430" });

      /* ---- A · the two cards flip inward, gold edges meet at the checkmark ---- */
      tl.set(L, { transformPerspective: 1800, transformOrigin: "100% 50%" }, 46.74)
        .set(R, { transformPerspective: 1800, transformOrigin: "0% 50%" }, 46.74)
        .to("#s07 .s3text", { x: -60, y: -140, scale: 0.6, opacity: 0, transformOrigin: "0 0", duration: 0.7, ease: "power2.in" }, 46.8)
        .call(Film.fx("paper", 0.6, 0.16), null, 46.8)
        .to(L, { x: 80, rotationY: -90, duration: 0.55, ease: "power2.in" }, 46.78)
        .to(R, { x: -80, rotationY: 90, duration: 0.55, ease: "power2.in" }, 46.82)
        .to(L, { filter: "brightness(1.6)", duration: 0.5, ease: "power2.in" }, 46.8)
        .to(R, { filter: "brightness(1.6)", duration: 0.5, ease: "power2.in" }, 46.84)
        .to("#s8seam", { opacity: 1, scaleY: 1, duration: 0.25, ease: "power2.out" }, 47.2)
        .set([L, R], { opacity: 0 }, 47.38)
        .to(T, { scale: 1.15, duration: 0.25, ease: "sine.out" }, 47.1)
        .call(Film.fx("ping", 1568, 0.07), null, 47.3)
        .to(Film.world.dust, { v: 2.3, duration: 0.35 }, 47.25);

      /* ---- B · seam → the closed Passeport, between the same two characters ---- */
      tl.to("#s8flash", { opacity: 0.4, duration: 0.14 }, 47.36).to("#s8flash", { opacity: 0, duration: 0.8 }, 47.5)
        .to(T, { scale: 0.5, opacity: 0, duration: 0.4, ease: "power2.in" }, 47.3)
        .to(mid, { opacity: 1, duration: 0.1, ease: "none" }, 47.38)
        .to(mid, { scaleX: MID.s, duration: 0.8, ease: "back.out(1.5)" }, 47.38)
        .to("#s8seam", { scaleX: 14, opacity: 0, duration: 0.5, ease: "power2.out" }, 47.45)
        .fromTo("#bigtick .r1", { scale: 1, opacity: 0.9 }, { scale: 3.4, opacity: 0, duration: 0.9, ease: "power2.out", immediateRender: false }, 47.38)
        .call(Film.fx("bloom", 0.05, 784), null, 47.4)
        .fromTo("#s8mid .foil", { opacity: 0, backgroundPosition: "130% 0" }, { opacity: 1, backgroundPosition: "-40% 0", duration: 0.9, ease: "power2.inOut", immediateRender: false }, 47.9)
        .to("#s8mid .foil", { opacity: 0, duration: 0.2 }, 48.8)
        .to(mid, { y: MID.y - 10, duration: 0.8, ease: "sine.inOut", yoyo: true, repeat: 1 }, 47.9)
        // the duo smiles at the book and nods on « Chaque jour, »
        .to("#amina-head-d", { rotation: 2.4, y: 4, duration: 0.5, yoyo: true, repeat: 1, ease: "sine.inOut" }, 47.5)
        .to("#mgr-head-x", { rotation: -2.4, y: 4, duration: 0.5, yoyo: true, repeat: 1, ease: "sine.inOut" }, 47.55)
        .to("#amina-smile-d, #mgr-smile-x", { scaleY: 1.5, duration: 0.5, ease: "sine.inOut" }, 47.5);

      /* ---- C · camera pull-back reveals five colleagues ---- */
      tl.call(Film.fx("whoosh", 1.3, 200, 2000, 0.14), null, 48.0)
        .to(duo, { scale: PULL.s, y: PULL.y, duration: 1.4, ease: "power3.inOut" }, 48.0)
        .to("#s8fade", { opacity: 1, duration: 1.2, ease: "power2.inOut" }, 48.0)
        .to("#w-halo", { opacity: 1, scale: 1.25, duration: 1.6, ease: "sine.inOut" }, 48.0)
        .to("#w-rays", { opacity: 0.85, scale: 1.15, duration: 1.6, ease: "sine.inOut" }, 48.0)
        .to(Film.world.dust, { v: 2.0, duration: 0.6 }, 48.0).to(Film.world.dust, { v: 1.3, duration: 1.4 }, 48.8);
      P.filter((p) => p.enter).forEach((p) => {
        tl.to(p.id, { y: p.y, opacity: 1, filter: "blur(0px)", duration: 0.95, ease: "power3.out" }, p.enter);
        tl.call(Film.fx("shimmer", 0.035, [988, 1175, 1318][P.indexOf(p)]), null, p.enter + 0.15);
      });

      /* ---- D · the Passeport multiplies and each colleague picks up their own ---- */
      tl.set(mid, { opacity: 0 }, 49.0);
      P.forEach((p, i) => {
        const fe = flyEls[i], fx = p.x + p.sc * BOOK.u, fy = p.y + p.sc * BOOK.v, fs = p.sc * BOOK.s, t0 = p.land - 0.7, c = p.c;
        tl.set(fe, { x: MID.x, y: MID.y, scale: MID.s, opacity: 1, rotation: 0 }, t0)
          .to(fe, { x: fx, duration: 0.7, ease: "power2.inOut" }, t0)
          .to(fe, { y: fy, duration: 0.7, ease: "power3.inOut" }, t0)
          .to(fe, { scale: fs, rotation: (i % 2 ? 6 : -6), duration: 0.7, ease: "power2.inOut" }, t0)
          .to(fe, { rotation: 0, duration: 0.2, ease: "power2.out" }, t0 + 0.7)
          .set(fe, { opacity: 0 }, p.land)
          .set(c.hold, { opacity: 1 }, p.land)
          .to(c.fr, { opacity: 1, duration: 0.25, ease: "none" }, p.land - 0.05)
          .fromTo(c.hold, { y: BOOK.v + 10 }, { y: BOOK.v, duration: 0.35, ease: "back.out(3)", immediateRender: false }, p.land)
          .fromTo(c.el.querySelector(".rb-ring"), { scale: 1, opacity: 0.95 }, { scale: 2.8, opacity: 0, duration: 0.7, ease: "power2.out", immediateRender: false }, p.land + 0.05)
          .call(Film.fx("ping", [1175, 1318, 1480, 1568, 1760][i], 0.05), null, p.land);
      });

      /* ---- E · « Votre passeport des valeurs, les comportements qui nous rassemblent » – badges glow in sequence, life ---- */
      const order = ["A", "L", "N", "K", "M"];
      order.forEach((k, i) => {
        const ring = Film.cast8[k].el.querySelector(".rb-ring");
        tl.fromTo(ring, { scale: 1, opacity: 0.9 }, { scale: 2.6, opacity: 0, duration: 0.8, ease: "power2.out", immediateRender: false }, 50.28 + i * 0.42);
      });
      P.forEach((p, i) => {   // everyone lifts the book a touch with the voice, then breathes
        tl.to(p.c.hold, { y: BOOK.v - 14, duration: 0.5, yoyo: true, repeat: 1, ease: "sine.inOut" }, 50.3 + i * 0.12)
          .to(p.c.hold, { y: BOOK.v - 10, duration: 0.5, yoyo: true, repeat: 1, ease: "sine.inOut" }, 52.3 + i * 0.08);
      });
      tl.to("#head-n8", { rotation: 2.2, y: 3, duration: 0.5, yoyo: true, repeat: 1, ease: "sine.inOut" }, 50.0)
        .to("#head-l8", { rotation: -2.0, y: 3, duration: 0.5, yoyo: true, repeat: 1, ease: "sine.inOut" }, 50.4)
        .to("#head-k8", { rotation: 2.0, y: 3, duration: 0.5, yoyo: true, repeat: 1, ease: "sine.inOut" }, 51.0)
        .to("#amina-head-d", { rotation: 2.0, y: 3, duration: 0.5, yoyo: true, repeat: 1, ease: "sine.inOut" }, 51.6)
        .to("#mgr-head-x", { rotation: -2.0, y: 3, duration: 0.5, yoyo: true, repeat: 1, ease: "sine.inOut" }, 51.9)
        .to("#head-n8, #head-l8, #head-k8", { rotation: 1.6, y: 3, duration: 0.6, yoyo: true, repeat: 1, ease: "sine.inOut" }, 52.5)
        .to("#eyeL-n8, #eyeR-n8, #eyeL-k8, #eyeR-k8", { scaleY: 0.08, duration: 0.07, yoyo: true, repeat: 1, ease: "none" }, 50.9)
        .to("#eyeL-l8, #eyeR-l8, #eyeL-d, #eyeR-d", { scaleY: 0.08, duration: 0.07, yoyo: true, repeat: 1, ease: "none" }, 51.8)
        .to("#eyeL-m-x, #eyeR-m-x", { scaleY: 0.08, duration: 0.07, yoyo: true, repeat: 1, ease: "none" }, 52.3)
        .to(duo, { scale: PULL.s + 0.03, duration: 3.6, ease: "none" }, 49.4)          // a very slow push while the line is spoken
        .to("#w-halo", { opacity: 1, scale: 1.35, duration: 1.2, yoyo: true, repeat: 1, ease: "sine.inOut" }, 51.4)
        .call(Film.fx("shimmer", 0.05, 1568), null, 52.45);

      /* ---- F · the group melts into the haze; the logo comes home (end card, unchanged) ---- */
      tl.to(duo, { opacity: 0, filter: "blur(14px)", duration: 0.9, ease: "power2.in" }, 53.05)
        .to("#s8fade", { opacity: 0, duration: 0.8 }, 53.05);

      /* ---- 8B · END CARD (unchanged) ---- */
      tl.to("#rail", { opacity: 0, duration: 0.5 }, 53.2)
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
