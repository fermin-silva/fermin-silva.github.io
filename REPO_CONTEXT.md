# Repo Context

Small Jekyll/GitHub Pages repo. No app framework beyond Jekyll + vanilla JS/CSS.

## Structure

- Main site pages: [`index.html`](/Users/ferminsilva/code/fermin-silva.github.io/index.html), [`work/index.html`](/Users/ferminsilva/code/fermin-silva.github.io/work/index.html), [`photos/index.html`](/Users/ferminsilva/code/fermin-silva.github.io/photos/index.html), [`projects.html`](/Users/ferminsilva/code/fermin-silva.github.io/projects.html).
- Main site shell: [`_layouts/site-default.html`](/Users/ferminsilva/code/fermin-silva.github.io/_layouts/site-default.html), [`_includes/site-header.html`](/Users/ferminsilva/code/fermin-silva.github.io/_includes/site-header.html), [`assets/css/base.css`](/Users/ferminsilva/code/fermin-silva.github.io/assets/css/base.css), [`assets/css/site.css`](/Users/ferminsilva/code/fermin-silva.github.io/assets/css/site.css).
- `projects.html` exists but is not linked from the main navbar.
- Photos gallery data is in [`_data/gallery.yml`](/Users/ferminsilva/code/fermin-silva.github.io/_data/gallery.yml).

## Site Areas: Goal + Motif

- Home: goal = simple hub into the rest of the site. motif = personal index / quick orientation.
- Work: goal = present CV, credibility, and contact path. motif = professional profile / career snapshot.
- Photos: goal = show photography work with minimal friction. motif = visual portfolio / browsing.
- Projects: goal = list built software projects. motif = lightweight project shelf.
- Rutinario hub: goal = explain the product and list routines to enter. motif = utility app directory / onboarding.
- Routine pages: goal = support actual workout tracking session by session. motif = personal training log / repeat use.

## Rutinario

- `rutina` is a separate mini-site/PWA under `/rutina/`.
- Config is in [`_config.yml`](/Users/ferminsilva/code/fermin-silva.github.io/_config.yml): `routines` collection outputs to `/rutina/routines/:slug/`.
- Landing page: [`rutina/index.html`](/Users/ferminsilva/code/fermin-silva.github.io/rutina/index.html).
- Shared shell: [`_layouts/rutina-default.html`](/Users/ferminsilva/code/fermin-silva.github.io/_layouts/rutina-default.html).
- Routine renderer: [`_layouts/rutina-routine.html`](/Users/ferminsilva/code/fermin-silva.github.io/_layouts/rutina-routine.html).
- Routine content lives in [`_routines/fullbody.md`](/Users/ferminsilva/code/fermin-silva.github.io/_routines/fullbody.md) and [`_routines/ppl.md`](/Users/ferminsilva/code/fermin-silva.github.io/_routines/ppl.md).
- Add/edit routines in `_routines/*.md`; front matter drives everything.

## UI Sections: Goal + Motif

- Main navbar: goal = move between portfolio areas fast. motif = persistent site map.
- Home hero: goal = state identity and role immediately. motif = personal intro.
- Home cards: goal = route users into main interests. motif = curated entry points.
- Work header: goal = frame the page as CV/contact. motif = resume summary.
- Contact card: goal = send users to LinkedIn/contact path. motif = single outbound action.
- Experience list: goal = show career progression quickly. motif = compact timeline.
- Education list: goal = add background and credentials. motif = supporting credibility.
- Photos header: goal = introduce the portfolio section. motif = artist intro.
- Photo gallery: goal = encourage lightweight exploration. motif = visual grid browsing.
- Lightbox: goal = let images be viewed larger without leaving page. motif = focused viewing.
- Projects header/list: goal = present projects briefly with links. motif = minimal project catalog.
- Rutinario hero: goal = explain app value in one glance. motif = product pitch.
- Routine cards on `/rutina/`: goal = let users choose a routine fast. motif = app launcher.
- `How it works` steps: goal = explain usage and retention model. motif = guided onboarding.
- Rutina navbar/menu: goal = switch routines and language. motif = in-app navigation.
- Language switch: goal = flip between `en` and `es`. motif = bilingual utility.
- Week bar: goal = navigate workout history by week. motif = time-based tracker control.
- Routine title/desc: goal = explain what the routine is for. motif = training context.
- Exercise groups/labels: goal = chunk long routines into readable blocks. motif = structured workout plan.
- Exercise checklist: goal = mark completion and persist progress. motif = session tracker.
- Progress counters: goal = show completion per group. motif = lightweight feedback.
- Install button: goal = push repeat users toward PWA install. motif = habit / retention prompt.

## Rutina Behavior

- Main logic is in [`assets/js/rutina-app.js`](/Users/ferminsilva/code/fermin-silva.github.io/assets/js/rutina-app.js).
- Bilingual UI (`en`/`es`) uses `data-i18n-*` attributes plus [`_data/i18n/en.yml`](/Users/ferminsilva/code/fermin-silva.github.io/_data/i18n/en.yml) and [`_data/i18n/es.yml`](/Users/ferminsilva/code/fermin-silva.github.io/_data/i18n/es.yml).
- Exercise state is local-only in `localStorage`, keyed by routine slug + ISO week. No backend.
- Week nav is relative to the current week; future weeks are blocked.
- Service worker + manifest are [`sw.js`](/Users/ferminsilva/code/fermin-silva.github.io/sw.js) and [`manifest.json`](/Users/ferminsilva/code/fermin-silva.github.io/manifest.json).
- If a new routine/asset should work offline, update `PRECACHE_URLS` and bump `CACHE_NAME` in `sw.js`.

## Local Dev

- Run with [`serve_local.sh`](/Users/ferminsilva/code/fermin-silva.github.io/serve_local.sh): `bundle exec jekyll serve --livereload --host 0.0.0.0`
- Ruby deps are minimal: [`Gemfile`](/Users/ferminsilva/code/fermin-silva.github.io/Gemfile) uses `github-pages`.
