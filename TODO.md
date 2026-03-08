# TODO

## PNG Icons for iOS Home Screen

SVG icons are not supported as iOS app icons. PNG versions are required for the
Home Screen icon to appear correctly after "Add to Home Screen".

### Files needed

| File | Size | Purpose |
|---|---|---|
| `assets/icons/icon-180.png` | 180×180 | `apple-touch-icon` (iOS Home Screen) |
| `assets/icons/icon-192.png` | 192×192 | Web App Manifest |
| `assets/icons/icon-512.png` | 512×512 | Web App Manifest (splash/store) |

### How to convert

**Option A — Inkscape CLI:**
```bash
inkscape assets/icons/icon-512.svg --export-png=assets/icons/icon-512.png --export-width=512
inkscape assets/icons/icon-512.svg --export-png=assets/icons/icon-192.png --export-width=192
inkscape assets/icons/icon-512.svg --export-png=assets/icons/icon-180.png --export-width=180
```

**Option B — Node.js `sharp`:**
```js
const sharp = require('sharp');
for (const size of [180, 192, 512]) {
  sharp('assets/icons/icon-512.svg')
    .resize(size, size)
    .png()
    .toFile(`assets/icons/icon-${size}.png`);
}
```

**Option C — Online tools:**
- https://squoosh.app
- https://svg2png.com

### After generating PNGs

**`_layouts/rutina-default.html`** — replace the `apple-touch-icon` line:
```html
<!-- before -->
<link rel="apple-touch-icon" href="/assets/icons/icon-192.svg">
<!-- after -->
<link rel="apple-touch-icon" href="/assets/icons/icon-180.png">
```

**`manifest.json`** — add PNG entries (keep SVGs or replace them):
```json
"icons": [
  { "src": "/assets/icons/icon-192.png", "sizes": "192x192", "type": "image/png" },
  { "src": "/assets/icons/icon-512.png", "sizes": "512x512", "type": "image/png" }
]
```
