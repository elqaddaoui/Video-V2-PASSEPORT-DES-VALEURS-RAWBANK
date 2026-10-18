# RAWBANK – Passeport des Valeurs · film preview

Browser-playable 16:9 (1920×1080, auto-scaled) preview, built scene by scene. **All 8 scenes are in (0:00 → 0:59.32).**

- Open `index.html` through any static server (`python3 -m http.server`) **or** double-click `dist/RAWBANK_Passeport_Film_standalone.html` (single file, works offline).
- Controls: Space play/pause · ← → ±1 s · C captions (approved script) · F fullscreen · drag the bar to scrub.
- `?capture` hides the player UI; `Film.captureAt(t)` renders a still at time t.

## Architecture (shared world)
- One master GSAP timeline driven by the voice-over clock; every scene is authored in **absolute film time**.
- `js/lib/world.js` – atmosphere + gold dust. `js/lib/people.js` – character kit (Amina + the manager; `#duo` layer for Scene 7).
- `#cam` is the single film camera (poses in `Film.cam`: C1 hero, C2 pulled-back, C3 push-in). The Passeport is ONE persistent 3D object re-posed per scene – never re-created – so transitions are continuous camera/page moves.
- Transitions: T1 "Pull-Back" (S1→S2, 6.55→8.35), T2 "Page-Turn Push-In" (S2→S3, 13.85→15.70). T3 "Leaf Whip" (S3→S4, 20.10→21.30: leaf 2 whips over + light veil + 01→02 odometer), T4 "Depth Pull" (S4→S5, 24.85→26.15: camera pulls back, Passeport defocused in the background, 02→03).
- Persistent layers `#stepdim`, `#dark`, `#veil` and the step numerals share one fixed slot so numbers roll without a seam. T5 "Cards Fold Into The Book" (S5→S6, 32.10→34.30: the five lit cards shrink and fly onto the rows of the behavioural grid; leaf 3 reveals the semester calendar), T6 "The Book Exhales" (S6→S7, 39.75→41.30: book shrinks to the centre and dissolves in a gold shock-ring; Amina and the manager resolve from the sides, the two behaviour cards unfold, orbs converge on the big checkmark). Scene 8 starts from Scene 7's last frame (duo + two cards + gold tick, rail complete).

## Add the next scene
1. Add a `<section class="scene" id="sNN">` in `index.html` (inside `<!-- SCENES -->`).
2. Add `#sNN` styles in `css/scenes.css` (keep the `#rail` and `.idp` blocks at the end).
3. Create `js/scenes/sceneNN.js` – `Film.addScene({el, start, end, at:0, show, hide, build(tl){…}})`, `Film.addCaptions`, `Film.addMarkers`. Start the scene from the previous scene's last pose.
4. Add its `<script>` before `js/boot.js`; update `Film.previewEnd`.
5. `python3 tools/build_standalone.py` to rebuild the single file.

## Real Passeport pages
Drop PNGs (440×600 ratio) into `assets/passport/` – `cover.png`, `page-left.png`, `page-right.png`, `page-left-2.png`, `page-left-3.png`, `identite.png`, `conditions.png`. They overlay the placeholder pages automatically.
Voice-over: `assets/audio/voiceover.mp3` (55.97 s). Timecodes follow the storyboard document.

## Scene 8 + audio notes
- **Scene 8 starts at 46.75 s**, directly on Scene 7's last frame (same cards, same gold tick, no cut). Beats: the two cards flip inward like closing pages (46.78) and their gold edges meet at the checkmark; a seam of light opens the Passeport between Amina and the manager in one motion (47.38); the camera pulls back (48.0) revealing five colleagues (Amina, Léa, Naomi, Karim and the manager, `js/lib/people_extra.js`); each picks up their own Passeport (49.45 → 49.85); a slow push-in, then the picture dissolves into the **unchanged end card** from 53.2 (logo returns to the centre, VOTRE PASSEPORT DES VALEURS / Les comportements qui nous rassemblent. / RAWBANK INSPIRE, held to 59.32).
- **Every character wears the RAWBANK « W » badge** on the chest of the suit (vector paths traced from the logo, `Film.People.badge`).
- **Add-on, Scene 1 (6.5 → 10.5 s):** an animated typographic layer for the voice-over « votre compagnon pour les cinq prochaines années » (`js/scenes/scene01_compagnon.js`), timed to the spoken words; it only adds to the existing scene.
- Full caption track: `js/captions.js`.

## Download (⬇ button in the player bar)
Opens a panel: **Full HD 1920×1080 / 2K 2560×1440**, **30 / 60 fps**, captions as a `.srt` file and/or burned into the picture (follows the CC button).
`js/export.js` renders the film **frame by frame** (not a screen recording): master timeline at t → DOM snapshot (SVG `foreignObject`) → canvas → WebCodecs `VideoEncoder` (H.264, VP9 fallback) + the voice-over through `AudioEncoder` (AAC, Opus fallback) → MP4 via `assets/vendor/mp4-muxer.js` (MIT). Needs a WebCodecs browser (Chrome / Edge / Safari 16.4+). Render time grows with resolution and fps (keep the tab open; progress, ETA and Cancel are shown). API: `Film.exportVideo({res:'fhd'|'qhd', fps:30|60, srt, burn, from, to})`.
