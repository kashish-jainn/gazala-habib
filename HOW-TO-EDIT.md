# Updating ARCID photos, logos and researcher dates

All website photographs and logos can live together in `assets/images/`. JPEG (`.jpg` or `.jpeg`), PNG and WebP are supported. The filename and extension must match the path in the data file exactly. Only upload images you intend to make public.

## Upload a file on GitHub

1. Open the repository `kashish-jainn/gazala-habib` and open `assets`, then `images`.
2. Select **Add file → Upload files**. Select or drag in your photographs.
3. Commit the upload to `main` when ready to publish.
4. Open the corresponding data file below, click the pencil/Edit button, fill the image path, and commit the edit.
5. Wait for the Pages deployment in **Actions** to complete, then refresh the website. If an old image persists, use Ctrl+Shift+R.

Uploading an image does not automatically select a page for it. The path in the data file connects the image to the page.

## Professor's main portrait and both header logos

Open `data/site.js`. Replace the existing empty values for these three fields (do not add duplicate fields):

```javascript
"portrait": "assets/images/gazala-habib.jpg",
"labLogo": "assets/images/arcid-logo.jpg",
"institutionLogo": "assets/images/iit-delhi-logo.jpg",
```

These are suggested filenames. Use the actual filenames you uploaded. The portrait appears beside the professor's biography. ARCID's logo appears at the upper left and IIT Delhi's at the upper right, on all eight pages. JPEG logos are displayed without cropping. If your logo is a `.jpeg` or `.png`, keep that actual extension in the path.

Leave an image value empty (`""`) until its file is available. Text placeholders appear in its place. The old portrait is not displayed. The old homepage credit is removed. Its provenance remains documented in `SOURCES.md` for the archived file; it is not a homepage reference.

`portraitCredit` and `portraitCreditUrl` may stay empty for your own photograph if no credit is needed. Add a credit if required for a replacement photograph.

The shared header and footer are rendered by `header()` and `footer()` in `assets/js/app.js`, using settings from `data/site.js`. Their HTML copies are refreshed by `scripts/build-static.cjs`. You do not need to edit all eight pages to set either logo.

## Homepage slideshow

In `data/site.js`, find `homePhotos` and set an entry's `image` to a path such as `assets/images/lab-group.jpg`. Update its `caption` and `alt` to describe the actual photo. Empty entries are skipped. Two or more supplied images enable automatic rotation; no images means no empty homepage slideshow.

## Student portraits and dates

Open `data/students.js` and locate the student's `name`. Both current students and alumni use the `photo` field. For example, replace the empty photo field with:

```javascript
"photo": "assets/images/mohd-haneef.jpg",
```

For a **current student**, fill `joined`. For an **alumnus/alumna**, fill `graduated`. Use a three-letter English month, a hyphen, and a four-digit year. The following dates are EXAMPLES ONLY, not real student dates:

```javascript
"joined": "Jul-2024",
"graduated": "May-2023",
```

In practice, set only the relevant field to the person's verified date. Current students display `Joined: Jul-2024`; alumni display `Graduated: May-2023`. Blank dates display `To be added`. `January 2024` and `2024-01` also normalize to `Jan-2024`. Use `Sep`, not `Sept`, in your edited data.

Keep `status` as `current` or `alumni`, since this controls which section contains the student. The old `expectedGraduation` field is retained for compatibility but is not displayed. Fill `thesis` and `affiliation` independently when you have the details.

You can add portraits for only the people whose photos are available. Leave everyone else's `photo` empty; their cards retain name placeholders.

## Research Group page headings

The introductory `<div class="page-heading">...</div>` was removed from `group.html`. This removed the repeated “People”, “Research group”, and description text above the student sections. The navigation tab and browser title still identify the page.

The page now starts with “Current PhD researchers”. `group()` in `assets/js/app.js` generates that heading and the “PhD alumni” heading. `studentCard()` generates each card; `monthYear()` formats the dates. Group-page top spacing is in `assets/css/styles.css` under `body[data-page=group] #main`.

## Instrument and research photographs

Instrument photos: upload to `assets/images/`, then set the matching instrument's `image` in `data/facilities.js`. Example: `"image": "assets/images/marga-r.jpg"`. Set `alt` to a short description of the actual photograph.

Research theme photos: set the relevant `image` and `imageAlt` in `data/research.js`.

## Private previews and fallback content

Download the latest repository ZIP, extract it, open `index.html` locally, edit the data files in a code editor, save and refresh the browser. Local trials do not change the public website or create public GitHub commits. Upload only the final edits to their matching folders.

Browsers with JavaScript read your data-file changes on the next page load. The site also includes full HTML copies for use when scripts are unavailable. After finalizing edits, refresh these copies from the website folder with Node.js:

```bash
node scripts/build-static.cjs
```

Commit the updated HTML files alongside the data changes. This also updates the shared header/footer copies. No dependencies need installing. Do not edit generated content between `CONTENT START` and `CONTENT END` directly, because rebuilding replaces it.
