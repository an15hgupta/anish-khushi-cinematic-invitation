# Website instructions

## Open the invitation

- Open `index.html` in a modern web browser, or visit the live site: https://anish-khushi-cinematic-invitation.netlify.app
- Keep the `assets` folder beside `index.html`; the invitation uses images, video, and audio from that folder.
- Use the on-screen Previous and Next buttons, the left/right arrow keys, or swipe on a touch screen to move between scenes. Play starts the timed presentation. Music may require a tap because browsers restrict automatic audio playback.

## Make edits

- Edit `index.html` to change invitation text, event details, colors, layout, and animation styles. The page is a standalone HTML file with its CSS and JavaScript inside it.
- Replace or add media in `assets`. Keep filenames and file extensions in sync with the corresponding `src` references in `index.html`.
- Save text files as UTF-8 so Hindi text and symbols such as `·`, `❦`, and `✧` remain readable.
- Preview the page in a browser after editing. Check that all referenced media files are present.

## Publish updates

The site is hosted on Netlify at https://anish-khushi-cinematic-invitation.netlify.app. To publish changes, deploy the updated project folder to the existing Netlify project named `anish-khushi-cinematic-invitation`. Include `index.html` and the complete `assets` folder in every deploy. Avoid creating a second Netlify project when updating this site.

## Project files

- `index.html` — invitation scenes, styles, and browser behavior
- `assets/` — images, video, and audio used by the invitation
- `README.md` — project overview and media credits
- `instructions.md` — these editing and publishing instructions
