/* ============================================================
   RAWBANK film – character kit (flat 2.5D vector, built to be re-used by Scenes 6-8)
   Character 1 – "Amina", the collaborator (Scenes 2, 6, 7, 8)
     skin  #8A5A3F  (shade #6B4230 / light #A77253)   hair  #1A1517 (short natural curls)
     wardrobe: graphite blazer #2B272C, ivory blouse #FAF6EE, small gold pendant + gold stud earrings
   Character 2 – manager (Scenes 7-8) is added later with the same palette rules.
   Layers: "back" (head/torso/arms – sits BEHIND the 3D Passeport) and
           "front" (hands/thumbs – sits IN FRONT of it, so the book is truly held).
   ============================================================ */
(function () {
  const C = { skin: "#8A5A3F", skinS: "#6B4230", skinL: "#A77253", hair: "#1A1517", blz: "#2B272C", blzD: "#19161A", blzL: "#3A353B", ivory: "#FAF6EE", gold: "#FDB525", gold2: "#FFD983" };


  /* ---- RAWBANK « W » chest badge (traced from the supplied mark) – worn by EVERY character ---- */
  const W_PATHS = ["M6 239.7c-1.2 -0.5 -2.2 -3.1 -1.5 -3.9 0.1 -0.1 0.7 -1.3 1.1 -2.6 0.5 -1.3 1.2 -2.9 1.5 -3.5 0.3 -0.6 0.6 -1.2 0.6 -1.3 0 -0.1 0.3 -0.9 0.8 -1.8 0.4 -0.9 0.8 -1.7 0.8 -1.8 0 -0.1 0.3 -0.8 0.6 -1.4 0.3 -0.7 1 -2.3 1.5 -3.5 0.5 -1.2 1.1 -2.5 1.3 -2.8 0.2 -0.3 0.7 -1.5 1.1 -2.6 0.4 -1.1 0.8 -2.2 0.9 -2.3 0.1 -0.1 0.6 -1.3 1.1 -2.6 0.5 -1.3 1.1 -2.4 1.2 -2.5 0.1 -0.1 0.2 -0.3 0.2 -0.5 0 -0.2 0.3 -1.1 0.8 -2 0.4 -0.9 1.1 -2.5 1.5 -3.5 0.4 -1 0.9 -2.1 1.1 -2.4 0.2 -0.3 0.4 -0.8 0.5 -1.1 0.1 -0.3 0.7 -1.8 1.4 -3.2 0.7 -1.4 1.3 -3 1.4 -3.5 0.1 -0.5 0.4 -1.2 0.6 -1.4 0.2 -0.3 0.4 -0.7 0.4 -0.8 0 -0.2 0.5 -1.3 1 -2.5 0.6 -1.2 1.1 -2.5 1.4 -2.9 0.2 -0.4 0.7 -1.6 1.1 -2.6 0.4 -1 1.1 -2.5 1.4 -3.1 0.3 -0.7 0.6 -1.4 0.6 -1.6 0 -0.2 0.2 -0.6 0.4 -1 0.7 -1.2 2.1 -4.5 2.1 -4.8 0 -0.1 0.2 -0.7 0.5 -1.2 1 -2 3.5 -7.8 3.5 -8 0 -0.2 0.3 -0.9 0.7 -1.8 0.4 -0.8 1.1 -2.3 1.5 -3.4 0.5 -1.1 1 -2.4 1.3 -2.8 0.2 -0.4 0.5 -0.9 0.5 -1.1 0 -0.2 0.2 -0.8 0.5 -1.3 0.3 -0.6 0.8 -1.6 1 -2.4 0.3 -0.8 0.7 -1.6 0.8 -2 0.2 -0.4 0.9 -2 1.6 -3.6 1.7 -4 1.6 -3.6 2.9 -6.5 0.6 -1.4 1.1 -2.6 1.1 -2.8 0 -0.2 0.3 -0.8 0.6 -1.5 0.8 -1.6 2.5 -5.3 3.3 -7.5 0.4 -0.9 0.8 -1.9 0.9 -2 0.1 -0.1 0.7 -1.4 1.2 -2.8 0.6 -1.4 1.2 -2.8 1.4 -3.2 1.2 -2.7 3.4 -7.6 3.4 -7.8 0 -0.2 3.1 -7.5 4.4 -10.1 0.5 -1 0.8 -2 0.8 -2.2 0 -0.2 0.2 -0.8 0.5 -1.3 0.6 -1.1 1.9 -4.1 2.9 -6.3 0.3 -0.9 0.8 -1.9 1 -2.4 0.2 -0.4 0.7 -1.5 1 -2.4 0.4 -0.9 1.1 -2.6 1.6 -3.8 0.5 -1.2 1.7 -3.9 2.6 -6 0.9 -2.1 2 -4.7 2.5 -5.7 0.5 -1 0.8 -1.9 0.8 -2.1 0 -0.2 0.8 -2.1 1.9 -4.3 0.3 -0.7 1 -2.2 1.5 -3.4 0.5 -1.2 1.1 -2.5 1.2 -2.9 0.2 -0.4 0.6 -1.3 0.8 -2 0.7 -1.7 2.9 -6.7 4.2 -9.5 0.4 -0.8 0.8 -1.9 1 -2.4 0.2 -0.5 0.6 -1.4 0.8 -1.9 0.3 -0.6 0.5 -1.2 0.5 -1.4 0 -0.2 0.2 -0.8 0.5 -1.2 0.3 -0.5 0.9 -1.8 1.4 -3 0.8 -2 2.5 -6.1 3.6 -8.4 0.2 -0.6 0.9 -2.1 1.5 -3.5 0.6 -1.4 1.2 -3 1.5 -3.5 1.4 -3 3.5 -7.8 3.5 -8.2 0 -0.2 0.2 -0.7 0.5 -1.1 0.3 -0.4 0.8 -1.6 1.2 -2.6 0.8 -2 1.9 -3 3.2 -3 1.3 0 2.1 0.8 4 4 1 1.6 1.8 3.1 1.8 3.2 0 0.1 0.2 0.6 0.6 1.1 0.3 0.5 0.9 1.6 1.3 2.5 0.4 0.9 1 2.2 1.3 2.9 1.2 2.7 2.6 6.4 3.4 9.1 0.4 1.6 0.9 3.3 1.1 3.9 0.7 2.1 1.6 7.4 2.2 13.8 0.7 6.5 0.3 16.1 -0.8 24.1 -0.8 5.5 -0.9 6 -2.4 12.5 -1.4 6.2 -5.1 18.2 -6.8 21.9 -0.3 0.7 -0.7 1.6 -1.6 4.3 -0.2 0.7 -0.6 1.5 -0.7 1.8 -0.5 0.8 -2 4.5 -2 4.8 0 0.3 -6.3 13.6 -7.8 16.4 -0.2 0.5 -1 2 -1.7 3.2 -2.1 4 -3 5.7 -3.9 7.2 -0.5 0.8 -0.9 1.6 -0.9 1.7 0 0.1 -0.3 0.6 -0.6 1.1 -0.3 0.5 -1.1 1.9 -1.8 3.1 -0.7 1.2 -1.4 2.5 -1.6 2.7 -0.4 0.5 -1.2 1.8 -2.9 4.8 -0.6 1 -4.2 6.6 -6.1 9.3 -0.6 0.9 -1.4 2.1 -1.8 2.7 -0.6 0.9 -2.4 3.5 -5.7 8.2 -0.8 1.1 -1.7 2.3 -2 2.6 -0.3 0.3 -1 1.2 -1.5 1.9 -1.2 1.8 -9.7 12.2 -13.3 16.5 -0.6 0.7 -2.1 2.4 -3.3 3.7 -8.3 9.1 -19 19.7 -24.3 24.1 -0.9 0.8 -1.8 1.5 -1.9 1.6 -0.1 0.1 -0.8 0.7 -1.6 1.4 -0.8 0.7 -1.9 1.6 -2.2 2 -0.4 0.4 -1.7 1.5 -2.8 2.4 -1.1 0.9 -2.6 2 -3.2 2.5 -2.2 1.8 -8 6.2 -8.6 6.5 -0.7 0.5 -1.8 0.6 -2.8 0.2z", "M104.6 203.3c-2 -1.1 -2.2 -2 -1 -5.2 0.5 -1.2 1.2 -2.9 1.5 -3.5 0.3 -0.7 0.9 -2 1.2 -2.9 1.4 -3.2 2.9 -6.7 3.2 -7.3 0.2 -0.4 0.4 -0.8 0.4 -0.9 0 -0.1 0.3 -0.9 0.7 -1.8 0.4 -0.9 1 -2.2 1.2 -2.9 0.3 -0.7 0.8 -2 1.3 -2.8 0.4 -0.8 0.8 -1.6 0.8 -1.8 0 -0.1 0.4 -1.1 0.8 -2.1 0.5 -1 1.2 -2.5 1.5 -3.4 0.4 -0.9 0.9 -2.2 1.3 -2.9 0.3 -0.7 0.6 -1.4 0.6 -1.5 0 -0.1 0.3 -0.9 0.7 -1.7 0.4 -0.8 1.4 -3 2.2 -5 0.8 -1.9 1.9 -4.5 2.5 -5.6 0.6 -1.2 1.1 -2.4 1.1 -2.8 0.1 -0.3 0.5 -1.2 0.8 -1.9 1.5 -3.2 3 -6.8 3.8 -8.8 0.3 -0.7 1 -2.4 1.7 -3.9 0.6 -1.4 1.3 -3 1.5 -3.4 0.2 -0.4 0.6 -1.2 0.8 -1.9 0.3 -0.6 0.6 -1.3 0.6 -1.4 0 -0.2 0.2 -0.7 0.4 -1 0.7 -1.3 3.2 -6.9 3.6 -8.3 0.3 -0.7 0.6 -1.5 0.7 -1.6 0.1 -0.1 0.5 -0.9 0.8 -1.6 0.3 -0.8 0.8 -2 1.1 -2.8 0.3 -0.8 0.7 -1.6 0.8 -1.9 0.1 -0.3 0.6 -1.4 1.1 -2.5 0.5 -1.1 1.4 -3.1 1.9 -4.4 0.5 -1.3 1.3 -3 1.7 -3.9 0.4 -0.8 1 -2.3 1.4 -3.2 0.4 -0.9 0.8 -1.9 0.9 -2.1 0.1 -0.2 0.8 -1.8 1.5 -3.4 0.7 -1.6 1.4 -3.2 1.5 -3.5 0.1 -0.3 0.6 -1.4 1 -2.4 0.4 -1 1.1 -2.6 1.5 -3.5 0.4 -0.8 0.9 -2 1.1 -2.6 0.2 -0.6 0.5 -1.1 0.6 -1.3 0.1 -0.1 0.8 -1.7 1.5 -3.4 1.4 -3.2 1.4 -3.4 2.9 -6.5 0.5 -1.1 0.9 -2 0.9 -2.2 0 -0.2 0.5 -1.4 1.1 -2.6 0.6 -1.2 1.2 -2.5 1.3 -2.9 0.2 -0.6 0.7 -1.7 2.1 -4.9 0.5 -0.9 1.2 -2.7 1.7 -3.9 0.5 -1.2 1.1 -2.5 1.4 -2.9 0.2 -0.4 0.5 -0.9 0.5 -1.1 0 -0.2 0.4 -1.1 0.9 -2.2 0.5 -1 0.9 -1.9 0.9 -2 0 -0.1 0.2 -0.6 0.5 -1.2 1 -2.1 3.1 -6.8 3.5 -8.1 0.7 -1.9 1.5 -2.5 3 -2.5 0.9 0 1.4 0.1 1.9 0.6 0.7 0.7 3.2 4.7 3.5 5.7 0.1 0.3 0.6 1.4 1 2.2 1.2 2.4 2.4 5.5 3.4 8.7 0.5 1.5 0.9 3.2 1.1 3.8 0.2 0.6 0.3 1.4 0.3 1.7 0 0.3 0.2 1.6 0.5 2.9 0.3 1.2 0.6 3.6 0.8 5.3 0.5 4.8 0 17.4 -0.8 20.6 -0.1 0.6 -0.4 1.7 -0.5 2.4 -0.3 1.6 -1.4 6.6 -1.9 8.4 -1.1 4 -1.7 6.2 -1.9 6.6 -0.1 0.3 -0.3 0.9 -0.5 1.5 -0.3 1.2 -1 3.1 -1.3 3.6 -0.1 0.2 -0.3 0.8 -0.4 1.2 -0.1 0.5 -0.3 1 -0.4 1.2 -0.3 0.5 -0.9 2.2 -1.4 3.4 -0.7 2 -1.6 4.5 -2 5 -0.2 0.3 -0.6 1.4 -1 2.4 -0.8 2.1 -4.5 9.8 -7 14.5 -0.9 1.7 -2 3.8 -2.5 4.7 -0.5 0.9 -1.1 1.9 -1.5 2.4 -0.3 0.5 -0.6 0.9 -0.6 1.1 0 0.1 -0.4 0.8 -0.8 1.4 -0.5 0.6 -1.3 1.9 -1.9 3 -0.6 1 -1.6 2.5 -2.1 3.2 -0.6 0.8 -1.6 2.2 -2.2 3.2 -0.7 1 -1.4 2 -1.6 2.1 -0.2 0.1 -0.7 0.8 -1.1 1.4 -1.4 1.9 -5.2 7 -6.5 8.3 -0.6 0.7 -2.1 2.5 -3.4 3.9 -6.3 7.3 -21.2 21.2 -28.8 26.8 -0.8 0.6 -2 1.5 -2.6 2 -0.6 0.5 -2.3 1.7 -3.8 2.7 -1.5 1 -2.8 1.9 -2.9 2.1 -0.2 0.3 -3.1 1.7 -3.5 1.7 -0.1 0 -0.6 -0.2 -1 -0.4z", "M183.8 182.4c-0.4 -0.3 -0.8 -0.9 -0.9 -1.3 -0.1 -0.8 0.2 -3 0.7 -3.8 0.5 -0.9 3.2 -7 3.5 -7.7 0.1 -0.3 0.5 -1.3 0.9 -2.1 0.4 -0.8 0.9 -1.9 1.1 -2.5 0.2 -0.5 0.6 -1.5 1 -2.1 0.3 -0.7 0.7 -1.3 0.7 -1.4 0 -0.1 0.3 -0.8 0.7 -1.6 0.4 -0.8 0.9 -2 1.2 -2.7 0.3 -0.7 0.6 -1.4 0.6 -1.5 0 -0.1 0.4 -1 0.8 -1.9 0.9 -1.9 2.4 -5.2 3.5 -7.9 0.4 -0.9 0.9 -2.2 1.3 -2.9 1.7 -3.6 2.1 -4.6 2.1 -4.8 0 -0.1 0.4 -1 0.8 -2 0.5 -1 1.2 -2.7 1.8 -3.9 1.4 -3.2 2.1 -5 2.9 -6.6 0.4 -0.8 0.9 -2 1.1 -2.7 0.6 -1.5 2.3 -3.2 3.2 -3.2 0.3 0 1 0.1 1.4 0.3 0.8 0.3 3.1 2.5 3.9 3.7 0.2 0.3 1.2 1.6 2.1 2.9 2 2.7 4.2 6.9 5.1 10.1 0.7 2.2 0.7 2.6 0.7 6.8 0 4.2 -0.1 4.5 -0.8 6.8 -2 5.9 -4.4 9.6 -9.7 14.9 -3.9 3.9 -4.8 4.7 -9.2 7.7 -6.4 4.5 -16.4 9.8 -18.6 10.1 -1 0.1 -1.3 0 -1.9 -0.6z"];
  function badge(cx, cy, r) {
    const k = (r * 1.12) / 244, w = 229 * k, h = 244 * k;
    return `<g class="rb-badge" transform="translate(${cx} ${cy})">
      <circle r="${r + 4}" cy="3" fill="#000" opacity=".3"/>
      <circle r="${r}" fill="#151215" stroke="${C.gold}" stroke-width="${(r * 0.15).toFixed(1)}"/>
      <circle r="${(r * 0.8).toFixed(1)}" fill="none" stroke="${C.gold2}" stroke-width="1.6" opacity=".35"/>
      <circle class="rb-ring" r="${r + 2}" fill="none" stroke="${C.gold2}" stroke-width="3" opacity="0"/>
      <g transform="translate(${(-w / 2).toFixed(2)} ${(-h / 2).toFixed(2)}) scale(${k.toFixed(4)})"><g transform="translate(0 244) scale(1 -1)" fill="${C.gold}">${W_PATHS.map((d) => `<path d="${d}"/>`).join("")}</g></g>
    </g>`;
  }

  function collabBack() {
    return `
<svg viewBox="0 0 800 1400" width="800" height="1400" xmlns="http://www.w3.org/2000/svg" class="cast-svg">
  <defs>
    <linearGradient id="gBlz" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${C.blzL}"/><stop offset="1" stop-color="${C.blzD}"/></linearGradient>
    <linearGradient id="gSkin" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${C.skinL}"/><stop offset=".55" stop-color="${C.skin}"/><stop offset="1" stop-color="${C.skinS}"/></linearGradient>
    <radialGradient id="gBounce" cx=".5" cy="1" r=".9"><stop offset="0" stop-color="${C.gold}" stop-opacity=".55"/><stop offset="1" stop-color="${C.gold}" stop-opacity="0"/></radialGradient>
    <linearGradient id="gRim" x1="1" y1="0" x2="0" y2="0"><stop offset="0" stop-color="${C.gold2}" stop-opacity=".95"/><stop offset="1" stop-color="${C.gold2}" stop-opacity="0"/></linearGradient>
    <filter id="fBlur20" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="20"/></filter>
    <filter id="fBlur6"><feGaussianBlur stdDeviation="6"/></filter>
    <clipPath id="cpHead"><path d="M308 292 C308 212 350 182 400 182 C450 182 492 212 492 292 C492 362 456 424 400 428 C344 424 308 362 308 292Z"/></clipPath>
    <clipPath id="cpBody"><path d="M150 1080 L150 650 C150 590 205 556 270 548 L356 536 L444 536 L530 548 C595 556 650 590 650 650 L650 1080Z"/></clipPath>
  </defs>

  <!-- contact shadow under the book (the book is in front of this layer) -->
  

  <g id="amina-body">
    <!-- torso / blazer -->
    <path d="M150 1080 L150 650 C150 590 205 556 270 548 L356 536 L444 536 L530 548 C595 556 650 590 650 650 L650 1080Z" fill="url(#gBlz)"/>
    <!-- blouse + V neckline -->
    <path d="M352 536 L448 536 L404 690 L396 690Z" fill="${C.ivory}"/>
    <path d="M352 536 L396 690 L404 690 L448 536 L426 540 L400 620 L374 540Z" fill="#E7DFCD" opacity=".85"/>
    <!-- lapels -->
    <path d="M270 548 L352 536 L396 690 L338 722 L282 640Z" fill="${C.blzD}"/>
    <path d="M530 548 L448 536 L404 690 L462 722 L518 640Z" fill="${C.blzD}"/>
    <path d="M270 548 L352 536 L336 556 L286 586Z" fill="${C.blzL}" opacity=".7"/>
    <path d="M530 548 L448 536 L464 556 L514 586Z" fill="${C.blzL}" opacity=".5"/>
    <!-- gold pendant -->
    <path d="M372 560 Q400 610 428 560" fill="none" stroke="${C.gold}" stroke-width="3" opacity=".9"/>
    <path d="M400 610 q-9 12 0 24 q9 -12 0 -24z" fill="${C.gold}"/>
    <!-- neck -->
    <path d="M358 392 L442 392 L448 548 Q400 586 352 548Z" fill="url(#gSkin)"/>
    <path d="M358 392 L442 392 L442 452 Q400 488 358 452Z" fill="#000" opacity=".28"/>
    <!-- warm bounce from the Passeport on chin/neck -->
    <ellipse cx="400" cy="560" rx="150" ry="70" fill="url(#gBounce)" opacity=".6"/>
    <!-- arms: upper arms hang outside the book, forearms rise from below to the hands at the lower corners -->
    <g id="amina-arms">
      <path d="M176 640 C150 720 138 790 146 850" fill="none" stroke="${C.blzD}" stroke-width="112" stroke-linecap="round"/>
      <path d="M176 640 C150 720 138 790 146 850" fill="none" stroke="url(#gBlz)" stroke-width="102" stroke-linecap="round"/>
      <path d="M624 640 C650 720 662 790 654 850" fill="none" stroke="${C.blzD}" stroke-width="112" stroke-linecap="round"/>
      <path d="M624 640 C650 720 662 790 654 850" fill="none" stroke="url(#gBlz)" stroke-width="102" stroke-linecap="round"/>
      <path d="M146 850 C150 800 176 750 214 722" fill="none" stroke="${C.blzD}" stroke-width="92" stroke-linecap="round"/>
      <path d="M146 850 C150 800 176 750 214 722" fill="none" stroke="url(#gBlz)" stroke-width="84" stroke-linecap="round"/>
      <path d="M654 850 C650 800 624 750 586 722" fill="none" stroke="${C.blzD}" stroke-width="92" stroke-linecap="round"/>
      <path d="M654 850 C650 800 624 750 586 722" fill="none" stroke="url(#gBlz)" stroke-width="84" stroke-linecap="round"/>
    </g>
    <!-- gold rim light (right side, from the halo) -->
    <path d="M650 650 C650 590 595 556 530 548" fill="none" stroke="url(#gRim)" stroke-width="5" opacity=".7" stroke-linecap="round"/>
    ${badge(552, 672, 24)}
  </g>

  <g id="amina-head">
    <!-- hair (back mass) -->
    <g fill="${C.hair}">
      <ellipse cx="400" cy="244" rx="128" ry="112"/>
      <circle cx="292" cy="262" r="30"/><circle cx="508" cy="262" r="30"/><circle cx="282" cy="224" r="32"/><circle cx="518" cy="224" r="32"/>
      <circle cx="306" cy="172" r="36"/><circle cx="494" cy="172" r="36"/><circle cx="352" cy="140" r="40"/><circle cx="448" cy="140" r="40"/><circle cx="400" cy="128" r="44"/>
      <circle cx="320" cy="150" r="34"/><circle cx="480" cy="150" r="34"/>
    </g>
    <!-- ears + earrings -->
    <ellipse cx="308" cy="306" rx="14" ry="24" fill="${C.skinS}"/><ellipse cx="492" cy="306" rx="14" ry="24" fill="${C.skin}"/>
    <circle cx="308" cy="334" r="6" fill="${C.gold}"/><circle cx="492" cy="334" r="6" fill="${C.gold}"/>
    <!-- face -->
    <path d="M308 292 C308 212 350 182 400 182 C450 182 492 212 492 292 C492 362 456 424 400 428 C344 424 308 362 308 292Z" fill="url(#gSkin)"/>
    <g clip-path="url(#cpHead)">
      <rect x="440" y="170" width="70" height="270" fill="#000" opacity=".12"/>
      <ellipse cx="318" cy="330" rx="38" ry="110" fill="${C.skinL}" opacity=".35"/>
      <path d="M492 230 C498 300 480 380 420 428" fill="none" stroke="url(#gRim)" stroke-width="4" opacity=".45" stroke-linecap="round"/>
    </g>
    <!-- fringe -->
    <g fill="${C.hair}">
      <path d="M306 276 C306 204 352 176 400 176 C448 176 494 204 494 276 C476 238 446 218 400 218 C354 218 324 238 306 276Z"/>
      <circle cx="334" cy="220" r="22"/><circle cx="366" cy="204" r="24"/><circle cx="402" cy="198" r="26"/><circle cx="438" cy="204" r="24"/><circle cx="468" cy="220" r="22"/>
    </g>
    <!-- features -->
    <g id="amina-brows" stroke="${C.hair}" stroke-width="7" stroke-linecap="round" fill="none"><path d="M340 276 Q362 262 382 272"/><path d="M418 272 Q438 262 460 276"/></g>
    <g id="amina-eyes" fill="#1A1010">
      <g class="eye" id="eyeL"><ellipse cx="361" cy="304" rx="13" ry="9"/><circle cx="365" cy="301" r="3.4" fill="#fff"/></g>
      <g class="eye" id="eyeR"><ellipse cx="439" cy="304" rx="13" ry="9"/><circle cx="443" cy="301" r="3.4" fill="#fff"/></g>
    </g>
    <path d="M402 314 Q390 340 400 347 Q412 349 414 341" fill="none" stroke="${C.skinS}" stroke-width="5" stroke-linecap="round" opacity=".85"/>
    <path id="amina-smile" d="M366 366 Q400 392 434 366" fill="none" stroke="#3A1E16" stroke-width="6" stroke-linecap="round"/>
    <circle cx="344" cy="346" r="22" fill="#E58A5A" opacity=".16"/><circle cx="456" cy="346" r="22" fill="#E58A5A" opacity=".16"/>
  </g>
</svg>`;
  }

  function collabFront() {
    return `
<svg viewBox="0 0 800 1400" width="800" height="1400" xmlns="http://www.w3.org/2000/svg" class="cast-svg">
  <defs>
    <linearGradient id="gSkinF" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${C.skinL}"/><stop offset=".6" stop-color="${C.skin}"/><stop offset="1" stop-color="${C.skinS}"/></linearGradient>
  </defs>
  <!-- hands (front layer): palm under the page edge, thumb pad pressed on the page -->
  <g id="hand-l" transform="translate(222 706)">
    <ellipse cx="0" cy="4" rx="40" ry="46" fill="url(#gSkinF)" transform="rotate(-18)"/>
    <path d="M-6 -6 C14 -36 44 -34 46 -14 C48 6 26 12 6 8Z" fill="${C.skinL}"/>
    <path d="M12 -26 q20 -2 30 10" fill="none" stroke="#F2D2BE" stroke-width="3" stroke-linecap="round" opacity=".6"/>
  </g>
  <g id="hand-r" transform="translate(578 706)">
    <ellipse cx="0" cy="4" rx="40" ry="46" fill="url(#gSkinF)" transform="rotate(18)"/>
    <path d="M6 -6 C-14 -36 -44 -34 -46 -14 C-48 6 -26 12 -6 8Z" fill="${C.skinL}"/>
    <path d="M-12 -26 q-20 -2 -30 10" fill="none" stroke="#F2D2BE" stroke-width="3" stroke-linecap="round" opacity=".6"/>
  </g>
</svg>`;
  }


  /* Character 2 – the manager (Scenes 7-8). Same flat 2.5D language as Amina, same face grid (so the two read as one cast):
     skin #7A4E35, short cropped hair with a hint of grey at the temples, short beard, thin gold glasses,
     charcoal suit, ivory shirt, GOLD tie (brand accent). Rim light comes from the LEFT (he stands on the right of frame). */
  const M = { skin: "#7A4E35", skinS: "#5A3727", skinL: "#95664A", hair: "#141012", grey: "#7A7476", suit: "#2A272D", suitD: "#17151A", suitL: "#3B373E" };
  function managerBack() {
    return `
<svg viewBox="0 0 800 1400" width="800" height="1400" xmlns="http://www.w3.org/2000/svg" class="cast-svg">
  <defs>
    <linearGradient id="gSuit" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${M.suitL}"/><stop offset="1" stop-color="${M.suitD}"/></linearGradient>
    <linearGradient id="gSkinM" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${M.skinL}"/><stop offset=".55" stop-color="${M.skin}"/><stop offset="1" stop-color="${M.skinS}"/></linearGradient>
    <linearGradient id="gRimM" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${C.gold2}" stop-opacity=".95"/><stop offset="1" stop-color="${C.gold2}" stop-opacity="0"/></linearGradient>
    <linearGradient id="gTie" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${C.gold2}"/><stop offset=".5" stop-color="${C.gold}"/><stop offset="1" stop-color="#C98A0E"/></linearGradient>
    <clipPath id="cpHeadM"><path d="M306 290 C306 214 348 184 400 184 C452 184 494 214 494 290 C494 366 462 428 400 436 C338 428 306 366 306 290Z"/></clipPath>
  </defs>
  <g id="mgr-body">
    <path d="M110 1080 L110 664 C110 598 186 558 262 548 L352 536 L448 536 L538 548 C614 558 690 598 690 664 L690 1080Z" fill="url(#gSuit)"/>
    <path d="M346 392 L454 392 L460 548 Q400 590 340 548Z" fill="url(#gSkinM)"/>
    <path d="M346 392 L454 392 L454 456 Q400 492 346 456Z" fill="#000" opacity=".3"/>
    <!-- shirt + collar -->
    <path d="M340 540 L460 540 L406 720 L394 720Z" fill="${C.ivory}"/>
    <path d="M338 538 L372 548 L398 600 L350 592Z" fill="#fff"/><path d="M462 538 L428 548 L402 600 L450 592Z" fill="#EDE5D3"/>
    <!-- lapels -->
    <path d="M262 548 L340 540 L394 720 L322 760 L270 664Z" fill="${M.suitD}"/><path d="M538 548 L460 540 L406 720 L478 760 L530 664Z" fill="${M.suitD}"/>
    <path d="M262 548 L340 540 L326 562 L276 592Z" fill="${M.suitL}" opacity=".7"/><path d="M538 548 L460 540 L474 562 L524 592Z" fill="${M.suitL}" opacity=".45"/>
    <!-- gold tie -->
    <path d="M386 588 L414 588 L410 616 L390 616Z" fill="url(#gTie)"/>
    <path d="M391 616 L409 616 L422 770 L400 806 L378 770Z" fill="url(#gTie)"/><path d="M400 616 L409 616 L422 770 L400 806Z" fill="#000" opacity=".16"/>
    <!-- pocket square -->
    <path d="M520 668 L566 660 L560 690 Z" fill="${C.ivory}" opacity=".95"/><path d="M520 668 L566 660 L544 676Z" fill="${C.gold2}"/>
    <!-- warm light from the left (Passeport / halo) -->
    <path d="M110 664 C110 598 186 558 262 548" fill="none" stroke="url(#gRimM)" stroke-width="5" opacity=".75" stroke-linecap="round"/>
    ${badge(228, 716, 31)}
  </g>
  <g id="mgr-head">
    <ellipse cx="310" cy="306" rx="14" ry="25" fill="${M.skin}"/><ellipse cx="490" cy="306" rx="14" ry="25" fill="${M.skinS}"/>
    <path d="M306 290 C306 214 348 184 400 184 C452 184 494 214 494 290 C494 366 462 428 400 436 C338 428 306 366 306 290Z" fill="url(#gSkinM)"/>
    <g clip-path="url(#cpHeadM)">
      <rect x="438" y="170" width="70" height="280" fill="#000" opacity=".14"/>
      <ellipse cx="316" cy="330" rx="36" ry="110" fill="${M.skinL}" opacity=".4"/>
      <path d="M308 230 C302 300 320 380 380 432" fill="none" stroke="url(#gRimM)" stroke-width="4" opacity=".5" stroke-linecap="round"/>
    </g>
    <!-- short hair + temples -->
    <path d="M302 270 C296 196 346 160 400 160 C456 160 504 196 498 270 C484 228 454 206 400 206 C346 206 316 228 302 270Z" fill="${M.hair}"/>
    <ellipse cx="312" cy="262" rx="9" ry="22" fill="${M.grey}" opacity=".75"/><ellipse cx="488" cy="262" rx="9" ry="22" fill="${M.grey}" opacity=".75"/>
    <!-- beard + moustache -->
    <path d="M310 326 C314 398 350 444 400 448 C450 444 486 398 490 326 C480 372 452 394 400 394 C348 394 320 372 310 326Z" fill="${M.hair}"/>
    <path d="M364 364 Q400 350 436 364 Q400 376 364 364Z" fill="${M.hair}"/>
    <path id="mgr-smile" d="M378 380 Q400 396 422 380" fill="none" stroke="#C48A70" stroke-width="5.5" stroke-linecap="round"/>
    <!-- features -->
    <g id="mgr-brows" stroke="${M.hair}" stroke-width="9" stroke-linecap="round" fill="none"><path d="M336 276 Q360 262 384 272"/><path d="M416 272 Q440 262 464 276"/></g>
    <g id="mgr-eyes" fill="#1A1010">
      <g class="eye" id="eyeL-m"><ellipse cx="361" cy="304" rx="12" ry="8.5"/><circle cx="365" cy="301" r="3.2" fill="#fff"/></g>
      <g class="eye" id="eyeR-m"><ellipse cx="439" cy="304" rx="12" ry="8.5"/><circle cx="443" cy="301" r="3.2" fill="#fff"/></g>
    </g>
    <g fill="none" stroke="${C.gold}" stroke-width="4" stroke-linecap="round" opacity=".95">
      <rect x="330" y="284" width="64" height="46" rx="16"/><rect x="406" y="284" width="64" height="46" rx="16"/><path d="M394 303 Q400 297 406 303"/><path d="M330 300 L312 292"/><path d="M470 300 L488 292"/>
    </g>
    <path d="M402 316 Q390 342 400 349 Q412 351 414 343" fill="none" stroke="${M.skinS}" stroke-width="5" stroke-linecap="round" opacity=".85"/>
  </g>
</svg>`;
  }
  // Same Amina as Scenes 2-3 (identical artwork, ids suffixed so both can live in the DOM)
  const suffix = (svg, s) => svg.replace(/id="([^"]+)"/g, 'id="$1' + s + '"').replace(/url\(#([^)]+)\)/g, "url(#$1" + s + ")");

  Film.People = { C, M, collabBack, collabFront, managerBack, badge, suffix };
  document.getElementById("cast-back").innerHTML = collabBack();
  document.getElementById("cast-front").innerHTML = collabFront();
})();

(function () {
  const P = Film.People;
  const suffix = (svg, s) => svg.replace(/id="([^"]+)"/g, 'id="$1' + s + '"').replace(/url\(#([^)]+)\)/g, "url(#$1" + s + ")");
  const a = document.getElementById("duoA"), m = document.getElementById("duoM");
  if (a) { a.innerHTML = suffix(P.collabBack(), "-d"); const arms = a.querySelector("#amina-arms-d"); if (arms) arms.style.display = "none"; }
  if (m) m.innerHTML = suffix(P.managerBack(), "-x");
})();
