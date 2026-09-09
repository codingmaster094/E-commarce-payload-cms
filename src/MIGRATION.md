# MeaNova Payload CMS — audit, plan, and migration notes

## Phase 1–2: Current architecture

| Layer | Current state |
| --- | --- |
| Payload | **3.60.0** (latest 3.x is 3.88.0, Aug 2026) |
| Next.js | **15.4.8** (Payload 3.88 requires Next **15.4.11+** or 16.2.6+) |
| Database | MongoDB via `@payloadcms/db-mongodb` |
| Media | Vercel Blob (`@payloadcms/storage-vercel-blob`) |
| Frontend | App Router route group `(frontend)` + Payload admin `(payload)` |
| Content | **Pages** for homepage and CMS pages; globals for `header`, `footer`, `menus`, `impressum`, `datenschutzerklaerung`, `robots` |
| Collections | `users`, `media`, `pages` (pages previously had only title + slug) |

### What already works (kept)

- Homepage is a **Page** with reusable blocks: Hero, Personalvermittlung, Unternehmen, Offene Stellen, FAQ, Contact, SEO.
- Header / Footer / Menus are globals consumed by the site layout.
- Lexical rich text, SEO field group (`@payloadcms/plugin-seo/fields` used as fields, plugin itself was not registered to avoid duplicate auto-fields).
- Contact form API at `/api/send-email`.
- German marketing UI (Hero, tabs/cards, FAQ accordion, cookie banner).

### Problems found (not a full rewrite)

- Homepage is **not** a page builder; `pages` collection was unused on the frontend.
- Field groups (links, CTA, SEO) were duplicated instead of shared.
- `impressum` / `datenschutzerklaerung` CMS globals were ignored; legal pages were hardcoded.
- `serverURL` pointed at a stale Vercel alias → admin `Failed to fetch` on first user.
- Sitemap fetched itself / missed static legal URLs.
- Globals used `unique` slugs (awkward on globals).
- CMS field configs live under `src/app/components/*` (Payload website-template leftover).
- Payload 3.88 was **not** applied in this pass: it requires a Next.js bump first and would add Vercel risk on a live site.

## Phase 3: Plan (what we implemented vs deferred)

**Implemented (backward compatible)**

1. Shared access helpers, link fields, block settings, slug helper, site URL helper, CMS fetch helper.
2. **Pages** collection gained a `layout` **blocks** field (additive). Existing page docs still work with empty layout.
3. Block registry maps CMS `blockType` → existing React sections (Hero, FAQ, Kontakt, etc.).
4. Dynamic route `/(frontend)/[slug]` renders CMS pages; reserved routes stay hardcoded.
5. `site-settings` global for defaults (new; no existing data).
6. Legal pages read CMS HTML when present, otherwise keep static copy.
7. Sitemap includes `/`, `/impressum`, `/datenschutzerklaerung`, plus `pages`.
8. Media `alt` no longer required (existing uploads); optional `caption`.
9. Write access on pages/media requires a logged-in user; public **read** unchanged.

**Deferred (on purpose)**

- Jump to Payload **3.88** + Next **15.4.11** (separate deploy after admin login works).
- Moving all `src/app/components/*` configs into `src/fields` (imports would churn; wrappers added instead).
- Homepage content has been migrated into the Pages document with slug `home`; the old homepage global is removed.
- Designing unique UI for every conceptual block (Gallery, Pricing, Team, …). Add a new block in `src/blocks/index.ts` + one renderer entry when needed.
- Registering `seoPlugin()` (would duplicate the existing `seo` group).

## Data safety

- No destructive Mongo migrations.
- Header / footer field names unchanged; homepage content is stored in `pages.layout`.
- New `layout` and `site-settings` are additive.

## How editors use the page builder

1. Admin → **Pages** → create page → slug e.g. `leistungen`.
2. Add blocks (Hero, FAQ, CTA, …).
3. Visit `https://<domain>/leistungen`.

Homepage editing is under **Collections → Pages → home**.

## Follow-up upgrade (when stable)

```bash
npm i next@15.4.11 eslint-config-next@15.4.11
npm i payload@3.88.0 @payloadcms/next@3.88.0 @payloadcms/db-mongodb@3.88.0 @payloadcms/richtext-lexical@3.88.0 @payloadcms/ui@3.88.0 @payloadcms/plugin-seo@3.88.0 @payloadcms/storage-vercel-blob@3.88.0
npx payload generate:types
npx payload generate:importmap
```
