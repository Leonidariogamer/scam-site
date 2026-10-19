# Links scam findings (static site)

Plain HTML, CSS and JavaScript. No build step, no dependencies, no external requests (system fonts only, no analytics).

```
index.html                         home page and sample list
samples/*.html                     one page per sample (summary, animation, spot-it checklist, technical details)
assets/style.css                   theme, layout, accessibility styles
assets/stage.js                    the diagram engine and the three animated stories (autoplay, loop, pause)
assets/site.js                     theme toggle, copy-hash buttons
assets/home.js                     home page stats count-up and the "spot the odd one out" quiz
404.html                           not-found page (uses root-relative paths, so it needs the site at a domain root)
```

## Preview locally

Open `index.html` in a browser, or run any static server in this folder, for example:

```bash
npx serve .
```

## Deploy via GitHub Pages (this repo, subdomain: scams.linkslair.xyz)

This repo already ships a `CNAME` file containing `scams.linkslair.xyz`, which is how GitHub Pages learns the custom domain.

1. On GitHub, create a new **public** repository named `links-scam-findings` (or whatever you called it). Leave it empty: no README, no license, no `.gitignore` — this folder already has its own.
2. From this folder, push what's already committed locally:
   ```bash
   git remote add origin https://github.com/<your-username>/links-scam-findings.git
   git branch -M main
   git push -u origin main
   ```
3. In the repo's **Settings → Pages**, set **Source** to "Deploy from a branch", branch `main`, folder `/ (root)`. Save.
4. Still in **Settings → Pages**, under **Custom domain**, enter `scams.linkslair.xyz` and save (it should already be pre-filled from the `CNAME` file). Wait for the DNS check to pass, then tick **Enforce HTTPS** once it's available.
5. In your DNS provider (wherever `linkslair.xyz` is managed), add a `CNAME` record:
   - Name/host: `scams`
   - Value/target: `<your-username>.github.io`
6. Wait for DNS to propagate and the certificate to issue — usually minutes, sometimes longer.

### Alternative hosts

Any static host works the same way in principle (no build command, output is this folder): Cloudflare Pages, Netlify, etc. Point their custom-domain feature at `scams.linkslair.xyz` and add the `CNAME`/`ALIAS` record they ask for instead of step 5 above.

Alternative subdomain names, if you'd rather not use `scams`: `scamlab.linkslair.xyz` (matches the site name) or `threats.linkslair.xyz` — change the `CNAME` file and the DNS record name to match.

## Adding a new sample

1. Copy an existing page in `samples/` and change the text. Keep the `<ol id="steps">` buttons; their text is also the on-screen caption.
2. In `assets/stage.js`, add a story to `STORIES`: a list of `nodes` (boxes) and `arrows` (paths), each with the step (`st`) at which it appears. Arrows with `pk` send a coloured packet along the path when their step plays.
3. Call `ScamStage.mount('#stage', '<story-id>')` at the bottom of the page.
4. Add a card for it in `index.html`.

## Rules this site follows

- No sample files, no download links, no working links to attacker servers.
- No tokens, passwords, webhook or channel identifiers. Hashes only.
- Statements about analysis say how they were obtained (read, not run) and when scanner results were checked.
- Add a contact method before publishing if you want corrections to reach you; none is included.

## Animation behaviour

- Plays by itself and loops (about 5 seconds per step). A Pause/Play button is always visible.
- Pauses automatically while off-screen or in a background tab.
- Clicking a step, Back or Next pauses it so the reader stays in control.
- With "reduce motion" turned on in the visitor's system, autoplay starts off and packets do not move.

## Relationship to the main site at linkslair.xyz

The root of `linkslair.xyz` already hosts a separate portfolio. This project is a different deployment and must not replace it.

- Deploy this folder as its own project and attach only the subdomain `scams.linkslair.xyz` to it. Do not point the root domain (`linkslair.xyz` or `www`) at this project.
- In DNS, adding a `CNAME` record named `scams` does not change the root records, so the portfolio is unaffected.
- The two sites do not share files, scripts or settings. The theme preference is stored per site (browser storage is separate for each subdomain).
- The footer links back to `https://linkslair.xyz`. Change that link if the portfolio lives somewhere else.
- Reputation note: a site about malware can occasionally be flagged by browser or email filters. That is another reason to keep it on a subdomain, and to keep the content to hashes and descriptions only, as it is now.

## VirusTotal links

Each sample page has a "Check on VirusTotal" button for its main malicious file, and a VirusTotal link beside every hash. They are plain links to `virustotal.com/gui/file/<hash>`; nothing is uploaded and no API key is needed. A hash nobody has submitted shows "not found" there.
