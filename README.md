# Professor Gazala Habib website

A complete, editable static website for GitHub Pages. It uses HTML, CSS and JavaScript, with no package installation, database, server or build command. Open `index.html` in a browser to preview it locally. JavaScript must be enabled because the page content is read from the included data files.

The package includes eight pages, six research themes, 16 students, nine projects and 84 publication records. Photographs and institutional logos that have not been supplied have empty image fields; the site displays labelled placeholders or the institution's text abbreviation. No missing image is represented as an authentic instrument, student or institution logo.

## 1. Is there separate code for each website tab?

Yes. Each tab links to its own HTML page. All pages share the same stylesheet and presentation script. Most routine edits only require changing the relevant data file.

| Tab | Page file | File to edit for content |
| --- | --- | --- |
| Home | `index.html` | `data/site.js` |
| Research | `research.html` | `data/research.js` |
| Research group | `group.html` | `data/students.js` |
| Facilities | `facilities.html` | `data/facilities.js` |
| Projects | `projects.html` | `data/projects.js` |
| Publications | `publications.html` | `data/publications.js` |
| Partnerships | `partnerships.html` | `data/partners.js` |
| Opportunities | `opportunities.html` | `data/opportunities.js` |

Shared appearance: `assets/css/styles.css`.
Shared page rendering and slideshow controls: `assets/js/app.js`.
Photos and logos: `assets/images/`.
Site icon: `assets/favicon.svg`.

Page titles, descriptions, navigation labels and the basic header/footer are in the HTML files. The main biography and page content come from the data files. If the professor's title, institutional branding or email changes, update the shared header/footer text in all eight HTML files as well as the relevant data.

## 2. Publish on GitHub Pages without the command line

1. Sign in to your GitHub account.
2. Click **New repository**. Use a name such as `gazala-habib-website`. Choose **Public** for free GitHub Pages hosting and create the repository. You can initialize it with a README, which this package can replace.
3. Extract the downloaded ZIP on your computer.
4. Open the extracted `github-website` folder. Upload its **contents**, not the folder itself and not the ZIP: `index.html`, the other seven HTML files, `assets`, `data`, `README.md`, `PHOTO-CHECKLIST.md`, `SOURCES.md`, and `.nojekyll`.
5. On GitHub, use **Add file → Upload files** (or the upload link in an empty repository). Drag the files and the `assets` and `data` folders into the upload area. Preserve the folder structure. Click **Commit changes** to save to the `main` branch.
6. Confirm `index.html` is visible at the top level of the repository, beside the `assets` and `data` folders.
7. Open **Settings → Pages**.
8. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
9. Select **main**, select **/(root)**, and click **Save**.
10. Wait for the Pages deployment to finish. The **Pages** settings screen will display the actual published address. The **Actions** tab shows deployment progress and errors.
11. Your expected project-site address is `https://YOUR-USERNAME.github.io/gazala-habib-website/`. Replace `YOUR-USERNAME` with your actual GitHub username. These are examples, not reserved addresses.
12. Test all eight navigation tabs on the published site, including the slideshows and the publication links.

Do not select “GitHub Actions” as the Source for this package. It is ready for **Deploy from a branch** and does not require a custom workflow or compilation.

The file `.nojekyll` may be hidden on your computer. If it was not uploaded, choose **Add file → Create new file**, name the file `.nojekyll`, enter a short line such as `Static website`, and commit it. Its presence tells GitHub to serve the files directly.

Publication can take up to 10 minutes after a change. Once published, everyone can view the website without signing into GitHub. The repository code is also public; this does not grant visitors write access.

For a shorter address, a repository named exactly `YOUR-USERNAME.github.io` can publish at `https://YOUR-USERNAME.github.io/`. The supplied relative paths support both this layout and a named project repository.

Official instructions: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
Quickstart: https://docs.github.com/en/pages/quickstart

## 3. Update information later

1. Sign into GitHub and open the repository.
2. Open the appropriate file from the content table above.
3. Click the pencil/Edit button.
4. Change the text while keeping the surrounding quotation marks, commas, brackets and braces.
5. Click **Commit changes** and save to the publishing branch, `main`.
6. GitHub Pages republishes the changed files automatically.

You can also edit the files on your computer, preview `index.html`, then upload the updated files into the same paths. You do not need to learn React or use a terminal for routine changes.

For example, a student entry in `data/students.js` is:

```javascript
{
  "name": "Mohd Haneef",
  "status": "current",
  "photo": "assets/images/mohd-haneef.jpg",
  "joined": "",
  "graduated": "",
  "expectedGraduation": "",
  "thesis": "",
  "affiliation": ""
}
```

Fill empty strings with verified information. Use `"current"` for present students and `"alumni"` for past students. On graduation, change the status to `"alumni"`, fill `graduated`, and update the current affiliation. For present students, the site displays an expected graduation date only if you explicitly provide one; otherwise it displays the joining date or “Current PhD researcher”.

Keep these objects inside the existing array. Separate adjacent objects with a comma. Text containing double quotation marks must escape them as `\"`. Normal apostrophes do not need escaping inside double-quoted text.

When adding a publication, copy one existing object and update the title, DOI, year, journal, authors and type. The page sorts entries by year. Keep preprints, conference abstracts and corrections correctly labelled. Update `publicationSnapshot` in `data/site.js` when you review the bibliography.

## 4. Add your photos and logos

1. Use descriptive filenames with lowercase letters and hyphens, such as `aethalometer-ae33.jpg`.
2. Upload the image into `assets/images/`. JPEG, PNG and WebP are supported. Use only image files you intend to publish.
3. In the matching data file, replace the empty image field with a relative path: `"assets/images/aethalometer-ae33.jpg"`.
4. Add useful alternative text in the associated `alt` or `imageAlt` field. This describes the photo to screen readers.
5. Commit the image and data edits. Filenames are case-sensitive on GitHub Pages.

Avoid image paths that start with `/`; they can fail when the website is hosted beneath a repository name. All supplied links and assets use relative paths.

Recommended sizes: homepage photos around 1600 × 700 pixels, student portraits around 600 × 750 pixels, research photos around 1000 × 650 pixels. Instrument photos use “contain” so the full instrument remains visible. These are suggestions, not required dimensions. Compress large photographs before uploading.

### Homepage

Edit `homePhotos` in `data/site.js`. Set each `image` field, caption, descriptive `alt` text and optional credit. Empty homepage image fields are skipped. If all are empty, one labelled placeholder appears. Two or more supplied photographs activate the slideshow. A single photo is displayed without unnecessary controls.

The `position` value controls cropping, for example `"50% 25%"` keeps more of the upper part of an image visible. `slideshowInterval` is measured in milliseconds; the default is 6500.

The supplied professor portrait is the existing credited portrait. To replace it, upload your selected portrait and change `portrait`, `portraitCredit` and `portraitCreditUrl` in `data/site.js`.

### Research

Each research theme in `data/research.js` has one `image`. It appears above the theme description and representative publication.

### Students

Each student in `data/students.js` has one `photo`. Cards show the name, graduation/joining information, thesis title and current affiliation. Missing student photos show labelled portrait spaces.

### Facilities

In `data/facilities.js`, each instrument has an `image`, `alt` and optional `description`. Each facility category has its own slideshow and a complete instrument list. Slideshow controls permit manual browsing, while automatic motion is enabled only when multiple photographs are supplied. Missing photos remain labelled until replaced.

### Projects

Project cards in `data/projects.js` have `funderLogo` fields, as well as the agency, amount, dates, duration, role and collaborators. A blank logo displays the agency abbreviation as text. If several projects have the same funder, they can all reference the same image file.

### Partnerships

Each confirmed collaboration in `data/partners.js` has a `logo` field. Text abbreviations are used until supplied logos are added. Funding support and academic collaborations are distinguished; the entries do not claim formal institutional agreements.

See `PHOTO-CHECKLIST.md` for the individual photo and logo slots.

## 5. Add Professor Habib as a collaborator

1. Ask for her exact GitHub username.
2. In your repository, open **Settings → Collaborators**.
3. Click **Add people** and select her GitHub account.
4. Send the invitation. She must accept it.
5. She can then sign into her own account and edit or upload files in the repository. Changes to the publishing branch update the website.

Official instructions: https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/repository-access-and-collaboration/inviting-collaborators-to-a-personal-repository

Collaborator access lets her edit, but you remain the repository owner. For a lasting handover when you leave the group, arrange a transfer of repository ownership to her account or an organization controlled by the group. Another option is for her to own the repository from the beginning and invite you as a collaborator.

Before transferring, review the future website address. GitHub Pages addresses are tied to the account and repository name, and an existing Pages URL is not automatically redirected after a repository transfer. Recheck the Pages settings and any custom domain after transferring; update links to the old address.

Transfer instructions: https://docs.github.com/en/repositories/creating-and-managing-repositories/transferring-a-repository

## 6. Troubleshooting

- **404 after publishing:** check Settings → Pages and confirm `main` and `/(root)` are selected. Confirm `index.html` is at the repository root, not inside an extra `github-website` folder.
- **The page looks unstyled:** verify `assets/css/styles.css` was uploaded with exactly that path and letter case.
- **Only the header appears:** check that `assets/js/app.js`, `data/site.js` and the relevant page data file were uploaded. Check any recent edit for a missing quote, brace or comma; the browser developer console shows JavaScript errors.
- **A photo placeholder still appears:** verify the path and letter case. The file must actually exist in `assets/images/`. A failed image intentionally shows a fallback instead of a broken-image icon.
- **An update is not visible:** confirm the change reached `main`, wait for the Pages deployment, then refresh the page. A hard refresh can clear cached assets.
- **Publication links fail:** check the DOI against the publisher record. External faculty/publisher websites can also be temporarily unavailable.

## 7. What this package does not require

There is no website administrator login, editable online database or external hosting service. GitHub account permissions control who can modify the source files. Photos and data are shipped as static files. No credentials, private CV information, database dumps or hosting-account secrets are included.

Content provenance and the current photo credit are recorded in `SOURCES.md`. Replace image placeholders and review missing dates and affiliations before considering the content complete.
