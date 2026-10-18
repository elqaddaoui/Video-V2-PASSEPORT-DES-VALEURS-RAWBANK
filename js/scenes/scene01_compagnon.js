/* ============================================================
   ADD-ON to Scene 1 → 2 · « votre compagnon pour les cinq prochaines années »     6.55 → 10.4
   Nothing existing is changed: this only ADDS an animated layer (#s01-comp, screen space, right-hand copy space under the
   title that is clearing) that plays in real time with the voice-over. Word timings come from the recording's transcript:
     votre 6.60 · compagnon 6.92-7.36 · pour 7.48 · les 7.62 · cinq 7.84 · prochaines 8.08 · années 8.46-8.70
   Beats
     6.55  « votre » slides in
     6.88  « COMPAGNON » – letters rise one by one in gold with a light sheen, gold rule draws under it
     7.48  « pour les cinq » – words land on the beat of the voice
     8.05  « prochaines années. » – a 5-step timeline draws; each step pops on its own syllable, the 5th is the RAWBANK « W »
     8.70  the W lights up: ring burst + dust, then the block holds and exits (10.0 → 10.45) just before Scene 2's pictograms
   ============================================================ */
(function () {
  const $ = (q) => document.querySelector(q), $$ = (q) => Array.from(document.querySelectorAll(q));
  // split « compagnon » into letters (kept inline so kerning stays natural)
  const word = $("#s01-comp .cp-word");
  word.innerHTML = word.textContent.split("").map((c) => `<span class="cp-ch">${c}</span>`).join("");

  Film.addScene({
    el: null, start: 6.5, end: 10.5, at: 0,
    build(tl) {
      const root = "#s01-comp", ch = $$("#s01-comp .cp-ch"), k = $$(`${root} .cp-k .w`), l1 = $$(`${root} .cp-l:nth-of-type(1) .w`), l2 = $$(`${root} .cp-l:nth-of-type(2) .w`);
      const nodes = $$(`${root} .cp-n`), fill = `${root} .cp-linef`, rule = `${root} .cp-rule`;
      const LINES = [$$(`${root} .cp-l`)[0], $$(`${root} .cp-l`)[1]];
      const wA = Array.from(LINES[0].querySelectorAll(".w")), wB = Array.from(LINES[1].querySelectorAll(".w"));

      gsap.set(root, { opacity: 0, visibility: "hidden" });
      gsap.set(k, { opacity: 0, x: -40, filter: "blur(10px)" });
      gsap.set(ch, { opacity: 0, y: 70, rotationX: -50, filter: "blur(14px)", transformOrigin: "50% 100%" });
      gsap.set([...wA, ...wB], { opacity: 0, y: 36, filter: "blur(10px)" });
      gsap.set(rule, { scaleX: 0 });
      gsap.set(nodes, { scale: 0, opacity: 0 });
      gsap.set(fill, { width: 0 });
      gsap.set(`${root} .cp-line`, { opacity: 0 });
      gsap.set(`${root} .cp-w5`, { backgroundColor: "#171417" });

      tl.set(root, { visibility: "visible", opacity: 1 }, 6.5)
        .set(root, { visibility: "hidden" }, 10.5);

      // « votre »
      tl.to(k, { opacity: 1, x: 0, filter: "blur(0px)", duration: 0.55, ease: "power3.out" }, 6.6)
        .call(Film.fx("ping", 1318, 0.05), null, 6.62);

      // « COMPAGNON » – letter cascade on the word's 0.44 s
      tl.to(ch, { opacity: 1, y: 0, rotationX: 0, filter: "blur(0px)", duration: 0.55, stagger: 0.045, ease: "back.out(1.9)" }, 6.9)
        .call(Film.fx("shimmer", 0.05, 1568), null, 6.95)
        .to(rule, { scaleX: 1, duration: 0.7, ease: "power3.inOut" }, 7.25)
        .to(ch, { color: "#FFE3A0", duration: 0.12, stagger: { each: 0.035, yoyo: true, repeat: 1 } }, 7.35)   // sheen sweeping through the letters
        .to("#w-halo", { opacity: 0.85, duration: 0.5, yoyo: true, repeat: 1, ease: "sine.inOut" }, 6.95)
        .to(Film.world.dust, { v: 2.0, duration: 0.4, ease: "power2.out" }, 6.95)
        .to(Film.world.dust, { v: 1.0, duration: 1.2, ease: "power2.inOut" }, 7.6);

      // « pour les cinq »  /  « prochaines années. »
      const T1 = [7.46, 7.6, 7.82], T2 = [8.06, 8.44];
      wA.forEach((w, i) => tl.to(w, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.5, ease: "power3.out" }, T1[i]));
      wB.forEach((w, i) => tl.to(w, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.55, ease: "power3.out" }, T2[i]));
      tl.to(wA[2], { scale: 1.12, duration: 0.18, yoyo: true, repeat: 1, ease: "sine.inOut", transformOrigin: "50% 70%" }, 7.9);   // « cinq » gets a small punch

      // five-step timeline : 5 ans → 1·2·3·4 then the RAWBANK W
      tl.to(`${root} .cp-line`, { opacity: 1, duration: 0.3 }, 7.8)
        .to(fill, { width: 500, duration: 0.95, ease: "power1.inOut" }, 7.85);
      const TN = [7.92, 8.14, 8.36, 8.56];
      nodes.slice(0, 4).forEach((n, i) => tl.to(n, { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(3)" }, TN[i]).call(Film.fx("ping", [1175, 1318, 1568, 1760][i], 0.05), null, TN[i] + 0.04));
      tl.to(nodes[4], { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(2.6)" }, 8.7)
        .to(`${root} .cp-w5`, { backgroundColor: "#FDB525", boxShadow: "0 0 0 4px rgba(255,217,131,.9),0 0 46px rgba(253,181,37,.95)", duration: 0.35 }, 8.78)
        .call(Film.fx("bloom", 0.05, 988), null, 8.74)
        .to(`${root} .cp-w5 img`, { filter: "brightness(0.12)", duration: 0.2 }, 8.8)
        .to(nodes[4], { scale: 1.18, duration: 0.3, yoyo: true, repeat: 1, ease: "sine.inOut" }, 8.95)
        .to("#w-halo", { opacity: 0.9, scale: 1.08, duration: 0.5, yoyo: true, repeat: 1, ease: "sine.inOut" }, 8.7)
        .to(Film.world.dust, { v: 2.2, duration: 0.35, ease: "power2.out" }, 8.7)
        .to(Film.world.dust, { v: 1.0, duration: 1.3, ease: "power2.inOut" }, 9.1);

      // hold, then exit just before the pictograms of Scene 2 (10.9)
      tl.to(root, { y: -8, duration: 1.2, ease: "none" }, 8.8)
        .to(root, { opacity: 0, x: 60, filter: "blur(8px)", duration: 0.5, ease: "power2.in" }, 9.95);
    },
  });
})();
