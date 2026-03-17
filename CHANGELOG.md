# Changelog

All notable changes to Palmarès Digital Auto France 2026.

## [Unreleased]

## [0.3.0] — 2026-03-17

### Fixed
- Apply remaining high/medium/low code quality fixes:
  - Removed dead `data/preview-tokens.json` (tokens consolidated in `scores.json`)
  - Added `loading.tsx` skeleton loaders for `/classement` and `/insights`
  - SchemaOrg now outputs `@graph` format when multiple schemas are passed
  - Removed `unsafe-eval` from CSP `script-src`
  - Added `poweredByHeader: false` to `next.config.ts`
  - Sitemap `lastModified` now uses dynamic `new Date()`
  - Fixed insights page server/client boundary (extracted `InsightsContent`)
  - Fixed `Button` `asChild` type error in `error.tsx`
  - Fixed `router.replace` type mismatch in `header.tsx`
- Remove unused `getTranslations` import from homepage

## [0.2.0] — 2026-03-17

### Added
- Custom 404 pages with lead capture forms (FR + EN)
- Root-level `not-found.tsx` with locale detection
- SHA-256 hardened preview tokens per group in `scores.json`
- Pre-launch gate: group detail pages show teaser only unless `NEXT_PUBLIC_SITE_LIVE=true` or valid preview token
- Confidential preview banner for DGs with right-of-rectification notice
- `/preview/[token]` route for direct DG access

### Fixed
- Breadcrumb slug resolution: group name now resolved from `scores.json`
- Breadcrumbs: removed all `as any` casts, typed with `Pathnames`
- Breadcrumbs: added `SEGMENT_TO_PATHNAME` map for DRY path resolution
- Language switcher: uses `router.replace(pathname, { locale })` instead of `window.location` hacks
- Recharts lazy-loaded with `dynamic()` to reduce initial bundle
- French diacritics: "Delivrabilite" → "Délivrabilité" in `lib/data.ts`
- OG image alt text: "Palmares" → "Palmarès"
- Honest lead form submission message (no fake success)

## [0.1.0] — 2026-03-17

### Added
- 35 audit fixes: SEO, schema, content, legal, security headers
- CSP headers, X-Frame-Options, Referrer-Policy, Permissions-Policy
- Locale switcher with proper cross-locale path translation
- IndexNow key for Bing/Yandex indexing
- AI bot rules in `robots.ts`
- `rel="noopener noreferrer"` on all external links
- Print-optimized styles

### Fixed
- Middleware locale routing (removed conflicting root `page.tsx`)

## [0.0.1] — 2026-03-16

### Added
- Full bilingual website (FR/EN) with next-intl
- 16 car dealer groups with scores, tiers, quick wins
- Radar chart and dimension comparison chart (Recharts)
- Schema.org JSON-LD: WebSite, ItemList, Dataset, Review, BreadcrumbList, Organization
- Sitemap (55 URLs, both locales) + robots.ts
- Custom OG image generation
- `/preview/[token]` route
- `/votre-score` lead capture page
