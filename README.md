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
- T7 "The Medal Releases The Values" (49.45→50.5): the two cards pour into the checkmark, which rises as a seal and sends three sparks that land on Intégrité / Professionnalisme / Éthique. End card from 53.4: logo returns from the corner bug to the centre, then VOTRE PASSEPORT DES VALEURS / Les comportements qui nous rassemblent. / RAWBANK INSPIRE, held to 59.32.
- The voice-over is 55.97 s; after it ends the film clock continues on the system clock so the end card plays out fully.
- Preview SFX are placeholders (button SFX toggles them): the output now goes through a limiter and the checkmark uses a soft `bloom` chime instead of the old low thump.
