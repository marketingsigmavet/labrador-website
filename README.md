# Labrador.lk React Website

Labrador.lk is a premium, article-first educational website for Labrador Retriever owners in Sri Lanka. It is built with Vite, React, and React Router.

## Local Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

The production build is written to `dist/`.

## Routes

- `/` - curated magazine homepage
- `/articles` - searchable article library
- `/articles/:slug` - article detail page
- `/hubs/:hubSlug` - hub page for Puppy Care, Nutrition, Breed, Grooming, or Health
- `/tags/:tagSlug` - articles filtered by tag
- `/series/:seriesSlug` - articles in a series
- `/about` - about Labrador.lk
- `/ask` - Ask Labrador.lk / FAQ

Legacy paths such as `/puppy-care`, `/nutrition`, `/breed`, `/grooming`, `/health`, and `/contact` redirect to their routed equivalents.

## Article Data

Article files live in `src/data/articles/{hub}/`. The master index is `src/data/articleData.js`, which imports all article files and normalizes them into the publish-ready schema.

Required normalized fields:

- `id`
- `slug`
- `title`
- `hub`
- `category`
- `tags`
- `excerpt`
- `readingTime`
- `difficultyLevel`
- `lifeStage`
- `relatedArticles`
- `recommendedNext`
- `series`
- `productsMentioned`
- `seoTitle`
- `seoDescription`
- `aiSummary`
- `quickAnswer`
- `sections`
- `faqs`
- `productBlock`

Existing article files can still use legacy fields such as `tag`, `readTime`, and `content`; the master index normalizes them.

## Adding An Article

1. Create a new file in the correct hub folder under `src/data/articles/`.
2. Export it as `export const article = { ... }`.
3. Add the import and raw article entry in `src/data/articleData.js`.
4. Use only Labrador-specific educational content.
5. Keep product mentions subtle and educational:
   - Royal Canin: puppy feeding, nutrition, feeding routine, weight management, obesity, breed-specific nutrition.
   - Beaphar: dental care, ear care, grooming hygiene, comfort/stress, supplements, daily care.
6. Run `npm run build`.

## SEO And AI Structure

Article pages update title, meta description, canonical URL, Open Graph basics, and JSON-LD for Article, FAQPage, and BreadcrumbList. Hub and article listing pages output ItemList JSON-LD.

## Publishing Note

Because this is a React SPA, the hosting platform should route unknown paths back to `index.html` so direct URLs like `/articles/complete-labrador-feeding-guide-sri-lanka` load correctly.

