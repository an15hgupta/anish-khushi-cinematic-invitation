# Anish Weds Khushi — Cinematic Wedding Invitation

Serve this folder with a local web server (for example, `python -m http.server`) and open `http://localhost:8000`, or visit the live site. The scene modules load with `fetch`, so opening `index.html` directly as a `file://` URL will not load them. This is a full-screen animated presentation, not a scrolling/sliding-page website:
- 10 scenes including the two supplied opening visuals
- automatic timed scene progression when Play presentation is selected
- Previous/Next, keyboard arrow keys, spacebar, and swipe navigation
- cinematic fades, subtle Ken Burns image movement, progress indicator
- one continuous browser-generated instrumental-style melody with a music toggle
- responsive layout

Music starts only after the visitor taps Music because browsers require a user gesture before audio playback.

Image credits:
- “Doors of City Palace Jaipur” by Iloveplantsforever, CC0 1.0. Used as decorative Jaipur architecture; it does not depict the wedding venue. [Source](https://commons.wikimedia.org/wiki/File:Doors_of_City_Palace_Jaipur.jpg)
- “Wooden Block prints Jaipur” by Silverrays, CC BY-SA 4.0. Displayed with CSS cropping and a tint overlay. [Source](https://commons.wikimedia.org/wiki/File:Wooden_Block_prints_Jaipur.jpg) · [License](https://creativecommons.org/licenses/by-sa/4.0/)
- “Tabla set Music Instrument” by Adbh266, CC BY-SA 4.0. Displayed with CSS cropping and a tint overlay. [Source](https://commons.wikimedia.org/wiki/File:Tabla_set_Music_Instrument.jpg) · [License](https://creativecommons.org/licenses/by-sa/4.0/)
- “Fresco Painting 1 Jaipur” by Ajit Kumar Majhi, CC BY-SA 4.0. Displayed with CSS cropping and a tint overlay. [Source](https://commons.wikimedia.org/wiki/File:Fresco_Painting_1_Jaipur.jpg) · [License](https://creativecommons.org/licenses/by-sa/4.0/)

The new image files are stored locally in `assets/`. CC BY-SA 4.0 images remain under that license; the visual treatment is applied in CSS and the invitation is not presented as depicting the couple or their actual venues.

To publish: upload the complete project folder to the existing Netlify site. Keep `assets/`, `scenes/`, `styles.css`, and `app.js` alongside `index.html`.
