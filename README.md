# Labrador.lk — Exact Zaira Index Template Converted to React

This project converts the provided **Zaira `index.html` default homepage** into a React/Vite project.

## What was done

- Used the default `index.html` homepage from the uploaded Zaira template.
- Ignored the other homepage files as requested.
- Preserved the original Zaira homepage layout, class names, assets, and section structure.
- Copied the original template assets into `public/assets`.
- Converted the homepage into a React-rendered template.
- Added a Royal Canin-inspired palette: white, red, deep red, cream, and light gold.
- Added Labrador.lk branding/logo.
- Added smooth scroll reveal animations.
- Added fallback React-side interactions for menu, offcanvas, dark mode, scroll-to-top, and background images.

## Run locally

```bash
npm install
npm run dev
```

If npm ever points to a wrong registry, run:

```bash
npm config set registry https://registry.npmjs.org/
npm cache clean --force
npm install
```

## Build

```bash
npm run build
```

## Main files

- `src/templateHtml.js` — converted Zaira default homepage markup.
- `src/App.jsx` — React wrapper and behavior hooks.
- `src/royal-canin-theme.css` — Royal Canin-inspired color palette and smooth animations.
- `public/assets/` — original Zaira assets.

## Next step

After confirming this template conversion is visually correct, the Labrador.lk article/category/content system can be added step by step without breaking the original template layout.
