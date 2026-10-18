/* ============================================================
   RAWBANK film – the five-colleague cast for the new Scene 8 (same flat 2.5D language, same palette, same face grid).
   Existing: Amina (#duoA) + the manager (#duoM).  New: Karim (young, fade cut), Léa (braids), Naomi (afro puff + gold glasses).
   Every character wears the RAWBANK « W » badge on the chest.
   Each person is ONE 800×1400 container (.duo-c, same box as the duo) holding:  back svg (body+head) → .s8hold (their Passeport) → front svg (sleeves + hands).
   ============================================================ */
(function () {
  const P = Film.People, C = P.C, M = P.M, suffix = P.suffix;
  const AMINA_BODY = "M150 1080 L150 650 C150 590 205 556 270 548 L356 536 L444 536 L530 548 C595 556 650 590 650 650 L650 1080Z";
  const MAN_BODY = "M110 1080 L110 664 C110 598 186 558 262 548 L352 536 L448 536 L538 548 C614 558 690 598 690 664 L690 1080Z";
  const HEAD = "M308 292 C308 212 350 182 400 182 C450 182 492 212 492 292 C492 362 456 424 400 428 C344 424 308 362 308 292Z";

  function personBack(f) {
    const man = f.kind === "man";
    // corporate / banking hair: Léa = sleek side-parted bob, Naomi = smooth pulled-back hair with a small tight chignon
    const hl = (c) => `<path d="M${c}" fill="none" stroke="#FFFFFF" stroke-width="5" stroke-linecap="round" opacity=".13"/>`;
    const hairBack = f.hair === "bob"
      ? `<path d="M296 262 C282 168 340 140 400 140 C462 140 520 168 504 262 L520 452 C522 492 490 508 462 498 L458 392 L342 392 L338 498 C310 508 278 492 280 452Z" fill="${f.hairC}"/>`
      : f.hair === "chignon"
        ? `<circle cx="400" cy="138" r="46" fill="${f.hairC}"/><ellipse cx="400" cy="176" rx="104" ry="60" fill="${f.hairC}"/>`
        : "";
    const hairFront = f.hair === "bob"
      ? `<path d="M300 296 C292 196 346 158 404 158 C466 158 508 196 500 296 C498 262 484 236 460 222 C436 236 396 250 356 262 C330 270 312 284 300 296Z" fill="${f.hairC}"/>
         ${hl("340 196 C372 170 430 172 462 204")}`
      : f.hair === "chignon"
        ? `<path d="M304 276 C300 206 346 176 400 176 C454 176 500 206 496 276 C484 238 454 218 400 216 C346 218 316 238 304 276Z" fill="${f.hairC}"/>
           <path d="M396 128 C424 130 440 142 444 152" fill="none" stroke="#FFFFFF" stroke-width="5" stroke-linecap="round" opacity=".14"/>${hl("336 206 C366 186 436 186 466 206")}`
        : `<path d="M306 262 C302 192 348 162 400 162 C454 162 498 192 494 262 C488 240 470 222 446 214 C424 208 376 208 354 214 C330 222 312 240 306 262Z" fill="${f.hairC}"/>
           <path d="M354 214 C376 208 424 208 446 214" fill="none" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round" opacity=".10"/>`;
    const braids = f.hair === "braids"
      ? [[318, 300, 292, 420, 304, 640], [296, 268, 262, 380, 270, 590], [482, 300, 508, 420, 496, 640], [504, 268, 538, 380, 530, 590]]
        .map(([x0, y0, cx, cy, x1, y1]) => `<path d="M${x0} ${y0} C${cx} ${cy - 30} ${cx} ${cy + 80} ${x1} ${y1}" fill="none" stroke="${f.hairC}" stroke-width="30" stroke-linecap="round"/><path d="M${x0} ${y0} C${cx} ${cy - 30} ${cx} ${cy + 80} ${x1} ${y1}" fill="none" stroke="#2B2427" stroke-width="3" stroke-dasharray="2 13" stroke-linecap="round"/><circle cx="${x1}" cy="${y1 + 6}" r="8" fill="${C.gold}"/>`).join("")
      : "";
    const glasses = f.glasses ? `<g fill="none" stroke="${C.gold}" stroke-width="4" opacity=".95"><circle cx="361" cy="305" r="31"/><circle cx="439" cy="305" r="31"/><path d="M392 301 Q400 295 408 301"/><path d="M330 300 L312 292"/><path d="M470 300 L488 292"/></g>` : "";
    const torso = man
      ? `<path d="${MAN_BODY}" fill="url(#gSu)"/>
         <path d="M346 392 L454 392 L460 548 Q400 590 340 548Z" fill="url(#gSk)"/><path d="M346 392 L454 392 L454 456 Q400 492 346 456Z" fill="#000" opacity=".3"/>
         <path d="M340 540 L460 540 L406 700 L394 700Z" fill="${C.ivory}"/><path d="M338 538 L372 548 L398 600 L350 592Z" fill="#fff"/><path d="M462 538 L428 548 L402 600 L450 592Z" fill="#EDE5D3"/>
         <path d="M262 548 L340 540 L394 700 L322 740 L270 664Z" fill="${f.suitD}"/><path d="M538 548 L460 540 L406 700 L478 740 L530 664Z" fill="${f.suitD}"/>
         <path d="M262 548 L340 540 L326 562 L276 592Z" fill="${f.suitL}" opacity=".7"/><path d="M538 548 L460 540 L474 562 L524 592Z" fill="${f.suitL}" opacity=".45"/>
         <path d="M394 600 L406 600 L410 640 L400 700 L390 640Z" fill="${C.gold}" opacity=".0"/>`
      : `<path d="${AMINA_BODY}" fill="url(#gSu)"/>
         <path d="M352 536 L448 536 L404 690 L396 690Z" fill="${C.ivory}"/><path d="M352 536 L396 690 L404 690 L448 536 L426 540 L400 620 L374 540Z" fill="#E7DFCD" opacity=".85"/>
         <path d="M270 548 L352 536 L396 690 L338 722 L282 640Z" fill="${f.suitD}"/><path d="M530 548 L448 536 L404 690 L462 722 L518 640Z" fill="${f.suitD}"/>
         <path d="M270 548 L352 536 L336 556 L286 586Z" fill="${f.suitL}" opacity=".7"/><path d="M530 548 L448 536 L464 556 L514 586Z" fill="${f.suitL}" opacity=".5"/>
         <path d="M358 392 L442 392 L448 548 Q400 586 352 548Z" fill="url(#gSk)"/><path d="M358 392 L442 392 L442 452 Q400 488 358 452Z" fill="#000" opacity=".28"/>
         <path d="M372 560 Q400 606 428 560" fill="none" stroke="${C.gold}" stroke-width="3" opacity=".9"/><circle cx="400" cy="610" r="7" fill="${C.gold}"/>`;
    const ears = f.earr ? `<circle cx="308" cy="334" r="6" fill="${C.gold}"/><circle cx="492" cy="334" r="6" fill="${C.gold}"/>` : "";
    const stubble = f.stubble ? `<path d="M312 330 C318 398 352 440 400 444 C448 440 482 398 488 330 C478 372 452 396 400 396 C348 396 322 372 312 330Z" fill="${f.hairC}" opacity=".55"/>` : "";
    return `
<svg viewBox="0 0 800 1400" width="800" height="1400" xmlns="http://www.w3.org/2000/svg" class="cast-svg">
  <defs>
    <linearGradient id="gSu" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${f.suitL}"/><stop offset="1" stop-color="${f.suitD}"/></linearGradient>
    <linearGradient id="gSk" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${f.skinL}"/><stop offset=".55" stop-color="${f.skin}"/><stop offset="1" stop-color="${f.skinS}"/></linearGradient>
    <linearGradient id="gRm" x1="${man ? 0 : 1}" y1="0" x2="${man ? 1 : 0}" y2="0"><stop offset="0" stop-color="${C.gold2}" stop-opacity=".9"/><stop offset="1" stop-color="${C.gold2}" stop-opacity="0"/></linearGradient>
    <clipPath id="cpH"><path d="${HEAD}"/></clipPath>
  </defs>
  <g id="body">${torso}
    <path d="${man ? "M110 664 C110 598 186 558 262 548" : "M650 650 C650 590 595 556 530 548"}" fill="none" stroke="url(#gRm)" stroke-width="5" opacity=".7" stroke-linecap="round"/>
    ${P.badge(f.badge[0], f.badge[1], f.badge[2])}
  </g>
  <g id="head">
    ${hairBack}
    <ellipse cx="308" cy="306" rx="14" ry="24" fill="${f.skinS}"/><ellipse cx="492" cy="306" rx="14" ry="24" fill="${f.skin}"/>${ears}
    <path d="${HEAD}" fill="url(#gSk)"/>
    <g clip-path="url(#cpH)"><rect x="440" y="170" width="70" height="270" fill="#000" opacity=".12"/><ellipse cx="318" cy="330" rx="38" ry="110" fill="${f.skinL}" opacity=".35"/></g>
    ${stubble}${hairFront}
    <g id="brows" stroke="${f.hairC}" stroke-width="${man ? 8 : 7}" stroke-linecap="round" fill="none"><path d="M340 276 Q362 262 382 272"/><path d="M418 272 Q438 262 460 276"/></g>
    <g fill="#1A1010"><g class="eye" id="eyeL"><ellipse cx="361" cy="304" rx="13" ry="9"/><circle cx="365" cy="301" r="3.4" fill="#fff"/></g><g class="eye" id="eyeR"><ellipse cx="439" cy="304" rx="13" ry="9"/><circle cx="443" cy="301" r="3.4" fill="#fff"/></g></g>
    ${glasses}
    <path d="M402 314 Q390 340 400 347 Q412 349 414 341" fill="none" stroke="${f.skinS}" stroke-width="5" stroke-linecap="round" opacity=".85"/>
    <path id="smile" d="M366 366 Q400 392 434 366" fill="none" stroke="#3A1E16" stroke-width="6" stroke-linecap="round"/>
    ${f.hair === "chignon" || f.hair === "bob" ? `<circle cx="344" cy="346" r="22" fill="#E58A5A" opacity=".16"/><circle cx="456" cy="346" r="22" fill="#E58A5A" opacity=".16"/>` : ""}
    ${braids}
  </g>
</svg>`;
  }

  /* sleeves + hands, in FRONT of the Passeport: forearms rise from the elbows to the book's lower sides */
  function holdFront(s) {   // s = {ax, sD, sL, skin, skinL, id}
    const L = s.ax, R = 800 - s.ax, hx = 262, hy = 922;
    const sleeve = (d, w) => `<path d="${d}" fill="none" stroke="${s.sD}" stroke-width="${w + 10}" stroke-linecap="round"/><path d="${d}" fill="none" stroke="url(#gSl)" stroke-width="${w}" stroke-linecap="round"/>`;
    const dUL = `M${L + 4} 640 C${L - 24} 760 ${L - 34} 860 ${L - 20} 960`, dUR = `M${R - 4} 640 C${R + 24} 760 ${R + 34} 860 ${R + 20} 960`;
    const dFL = `M${L - 20} 960 C${L + 10} 952 ${hx - 70} 938 ${hx} ${hy}`, dFR = `M${R + 20} 960 C${R - 10} 952 ${800 - hx + 70} 938 ${800 - hx} ${hy}`;
    return `
<svg viewBox="0 0 800 1400" width="800" height="1400" xmlns="http://www.w3.org/2000/svg" class="cast-svg">
  <defs><linearGradient id="gSl" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${s.sL}"/><stop offset="1" stop-color="${s.sD}"/></linearGradient>
  <linearGradient id="gHd" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${s.skinL}"/><stop offset=".6" stop-color="${s.skin}"/><stop offset="1" stop-color="${s.skinS}"/></linearGradient></defs>
  ${sleeve(dUL, 96)}${sleeve(dUR, 96)}${sleeve(dFL, 84)}${sleeve(dFR, 84)}
  <g transform="translate(${hx} ${hy})"><ellipse cx="0" cy="4" rx="40" ry="46" fill="url(#gHd)" transform="rotate(-18)"/><path d="M-6 -6 C14 -36 44 -34 46 -14 C48 6 26 12 6 8Z" fill="${s.skinL}"/><path d="M12 -26 q20 -2 30 10" fill="none" stroke="#F2D2BE" stroke-width="3" stroke-linecap="round" opacity=".6"/></g>
  <g transform="translate(${800 - hx} ${hy})"><ellipse cx="0" cy="4" rx="40" ry="46" fill="url(#gHd)" transform="rotate(18)"/><path d="M6 -6 C-14 -36 -44 -34 -46 -14 C-48 6 -26 12 -6 8Z" fill="${s.skinL}"/><path d="M-12 -26 q-20 -2 -30 10" fill="none" stroke="#F2D2BE" stroke-width="3" stroke-linecap="round" opacity=".6"/></g>
</svg>`;
  }

  /* the closed Passeport (cover artwork = the one of Scene 1) */
  function bookHTML() {
    return `<div class="s8bk"><i class="bk-pg"></i><div class="cover-art"><div class="leather"></div><div class="frame"></div>
      <img class="emb" src="assets/img/rawbank-mark-gold.png" alt=""><div class="ctitle"><span>PASSEPORT</span><span>DES VALEURS</span></div><div class="foil"></div><div class="hinge"></div></div></div>`;
  }

  const CAST = [
    { id: "duoA", key: "A", sleeve: { ax: 176, sD: C.blzD, sL: C.blzL, skin: C.skin, skinL: C.skinL, skinS: C.skinS } },
    { id: "duoM", key: "M", sleeve: { ax: 120, sD: M.suitD, sL: M.suitL, skin: M.skin, skinL: M.skinL, skinS: M.skinS } },
    { id: "s8pK", key: "K", f: { kind: "man", skin: "#6E4631", skinS: "#52331F", skinL: "#8A5C41", hairC: "#120F11", suitL: "#34303A", suitD: "#17151B", badge: [228, 716, 31], stubble: true }, sleeve: { ax: 120, sD: "#17151B", sL: "#34303A", skin: "#6E4631", skinL: "#8A5C41", skinS: "#52331F" } },
    { id: "s8pL", key: "L", f: { kind: "woman", hair: "bob", skin: "#9A6546", skinS: "#744A33", skinL: "#B27A58", hairC: "#17120F", suitL: "#3A353B", suitD: "#19161A", badge: [552, 672, 24], earr: true }, sleeve: { ax: 176, sD: "#19161A", sL: "#3A353B", skin: "#9A6546", skinL: "#B27A58", skinS: "#744A33" } },
    { id: "s8pN", key: "N", f: { kind: "woman", hair: "chignon", glasses: true, skin: "#7B4C34", skinS: "#5B3624", skinL: "#966449", hairC: "#150F11", suitL: "#37323A", suitD: "#18161A", badge: [552, 672, 24], earr: true }, sleeve: { ax: 176, sD: "#18161A", sL: "#37323A", skin: "#7B4C34", skinL: "#966449", skinS: "#5B3624" } },
  ];
  const duo = document.getElementById("duo");
  Film.cast8 = {};
  CAST.forEach((c, i) => {
    let el = document.getElementById(c.id);
    if (!el) { el = document.createElement("div"); el.className = "duo-c"; el.id = c.id; duo.appendChild(el); }
    const sfx = "-" + c.key.toLowerCase() + "8";
    if (c.f) el.innerHTML = suffix(personBack(c.f), sfx);
    const hold = document.createElement("div"); hold.className = "s8hold"; hold.innerHTML = bookHTML();
    const fr = document.createElement("div"); fr.className = "s8fr"; fr.innerHTML = suffix(holdFront(c.sleeve), "-f" + c.key.toLowerCase());
    el.appendChild(hold); el.appendChild(fr);
    Film.cast8[c.key] = { el, hold, fr, f: c.f };
  });
})();
