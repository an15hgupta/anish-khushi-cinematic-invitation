# Website instructions

## Open the invitation

- Open the live site: https://anish-khushi-cinematic-invitation.netlify.app
- For local preview, serve this folder with a local web server (for example, `python -m http.server`) and open `http://localhost:8000`. Scene modules load with `fetch`, so opening `index.html` directly as a `file://` URL will not load them.
- Keep `assets/` and `scenes/` beside `index.html`. The invitation uses images, video, and audio from `assets/`; the individual scene fragments live in `scenes/`.
- Use the Previous and Next buttons, left/right arrow keys, or swipe to move between scenes. Play starts the timed presentation. Music may require a tap because browsers restrict automatic audio playback.

## Make edits

- Edit the relevant `scenes/<scene-id>.html` file to change the text or markup for a scene. `app.js` lists the scene IDs in presentation order.
- Edit `styles.css` for colors, layout, and animation styles. Edit `app.js` for navigation, timers, and interactive effects.
- Replace or add media in `assets/`, keeping filenames and file extensions in sync with the `src` references in scene modules.
- Save text files as UTF-8 so Hindi text and symbols remain readable.

## Publish updates

The site is hosted on Netlify at https://anish-khushi-cinematic-invitation.netlify.app. Deploy the complete project folder to the existing Netlify project named `anish-khushi-cinematic-invitation`, including `index.html`, `styles.css`, `app.js`, `scenes/`, and the complete `assets/` folder.

## Project files

- `index.html` ? page shell and controls
- `styles.css` ? presentation styling
- `app.js` ? scene loading and browser behavior
- `scenes/` ? one HTML fragment per scene
- `assets/` ? images, video, and audio
- `README.md` ? project overview and media credits
