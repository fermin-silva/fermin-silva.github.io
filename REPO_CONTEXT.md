# Repo Context

Small Jekyll/GitHub Pages repo for the personal site. No app framework beyond Jekyll + vanilla JS/CSS.

## Structure

- Main site pages: [`index.html`](/Users/ferminsilva/code/fermin-silva.github.io/index.html), [`work/index.html`](/Users/ferminsilva/code/fermin-silva.github.io/work/index.html), [`photos/index.html`](/Users/ferminsilva/code/fermin-silva.github.io/photos/index.html), [`projects.html`](/Users/ferminsilva/code/fermin-silva.github.io/projects.html).
- Main site shell: [`_layouts/site-default.html`](/Users/ferminsilva/code/fermin-silva.github.io/_layouts/site-default.html), [`_includes/site-header.html`](/Users/ferminsilva/code/fermin-silva.github.io/_includes/site-header.html), [`assets/css/base.css`](/Users/ferminsilva/code/fermin-silva.github.io/assets/css/base.css), [`assets/css/site.css`](/Users/ferminsilva/code/fermin-silva.github.io/assets/css/site.css).
- Photos gallery data is in [`_data/gallery.yml`](/Users/ferminsilva/code/fermin-silva.github.io/_data/gallery.yml).
- Legacy `/rutina/...` paths are static redirect pages that dispatch to `https://rutinario.app`.

## Site Areas

- Home: goal = simple hub into the rest of the site.
- Work: goal = present CV, credibility, and contact path.
- Photos: goal = show photography work with minimal friction.
- Projects: goal = list built software projects.

## UI Sections

- Main navbar: goal = move between portfolio areas fast.
- Home hero/cards: goal = state identity and route users into the main sections.
- Work page: goal = present experience, education, and contact information.
- Photos page: goal = show a lightweight gallery with a modal lightbox.
- Projects page: goal = link to selected external or separate projects.

## Local Dev

- Run with [`serve_local.sh`](/Users/ferminsilva/code/fermin-silva.github.io/serve_local.sh): `bundle exec jekyll serve --livereload --host 0.0.0.0`
- Ruby deps are minimal: [`Gemfile`](/Users/ferminsilva/code/fermin-silva.github.io/Gemfile) uses `github-pages`.
