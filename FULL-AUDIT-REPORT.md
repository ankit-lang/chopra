# Full SEO Audit Report - Chopras Indian Restaurant
**Site:** https://chopras.nl
**Date:** 2026-04-17
**Prior Audit:** 2026-04-05 (score: 73/100)
**Framework:** Next.js 14 App Router, bilingual EN/NL, 45+ pages

---

## Overall SEO Health Score: 73 / 100

| Category | Weight | Score | Weighted |
|---|---|---|---|
| Technical SEO | 22% | 74 | 16.3 |
| Content Quality | 23% | 72 | 16.6 |
| On-Page SEO | 20% | 70 | 14.0 |
| Schema / Structured Data | 10% | 72 | 7.2 |
| Performance (CWV) | 10% | 70* | 7.0 |
| AI Search Readiness (GEO) | 10% | 82 | 8.2 |
| Images | 5% | 80 | 4.0 |
| **Total** | | | **73.3** |

*CWV estimated from code configuration — live measurement required for accurate score.

---

## Business Type Detected

Brick-and-mortar restaurant. North Indian / Halal cuisine. Den Haag, Netherlands. Bilingual EN/NL site with asymmetric i18n (English at root, Dutch at /nl/). Serves dine-in, takeaway, delivery, and catering. Founded 2023 by Arun Chopra.

---

## Executive Summary

### Top 5 Critical Issues

1. **30 of 45 pages are missing the mandatory GEO block** — the single largest AI citation gap on the site. Without a self-contained passage containing restaurant name, address, service, a verifiable fact, and hours, ChatGPT, Perplexity, and Google AIO cannot cite these pages.
2. **"Lunch" service mentioned on evenementenruimte-den-haag** — Chopras has no lunch service (opens 16:30). Factual error that could send visitors to a closed restaurant.
3. **About page Dutch branch renders English copy** — Dutch visitors at /nl/about get English body text in the "Het Begrip van Authenticiteit" section.
4. **Blog hreflang is single-language only** — Dutch blog posts output `x-default: homepage` rather than the post itself. Semantically wrong.
5. **`getCateringServiceSchema` uses `@type: 'FoodService'`** — this type does not exist in Schema.org. Google silently ignores the entire block.

### Top 5 Quick Wins

1. Fix `getCateringServiceSchema` type: `'FoodService'` → `'Service'` in `src/lib/schema.ts` — one line change.
2. Fix evenementenruimte English meta (currently Dutch text) — one string fix.
3. Fix 2-hop redirect chain in `next.config.mjs` for `/en/party-venue-den-haag`.
4. Trim the 5 over-length blog meta descriptions in `src/lib/blog-data.ts`.
5. Add explicit `robots: { index: false }` to `src/app/[locale]/order-confirmation/page.tsx`.

---

## Technical SEO
**Score: 74 / 100**

### Critical

**C-T1: party-venue-den-haag indexable but absent from sitemap — canonical conflict**
- Files: `src/app/[locale]/party-venue-den-haag/page.tsx`, `src/app/sitemap.ts`
- The page renders fully, has no noindex, and its canonical points to `chopras.nl/party-venue-den-haag`. The `next.config.mjs` redirects the `/nl/` version to `feestzaal-den-haag` but not the English root version. Choose: add to sitemap if it should rank, or add noindex + direct redirect from `/party-venue-den-haag` to `/feestzaal-den-haag`.

**C-T2: 2-hop redirect chain for `/en/party-venue-den-haag`**
- Files: `next.config.mjs` line 20, `src/middleware.ts`
- `/en/party-venue-den-haag` → 301 → `/en/feestzaal-den-haag` (config) → 301 → `/feestzaal-den-haag` (middleware). Two hops waste crawl budget and dilute link equity.
- Fix: change destination in `next.config.mjs` directly to `/feestzaal-den-haag`.

**C-T3: Blog hreflang outputs single language only**
- File: `src/app/[locale]/blog/[slug]/page.tsx` lines 28-32
- Dutch blog posts set `x-default: https://chopras.nl/blog` (the blog index), not the post itself. Fix: for posts with no translated counterpart, set `x-default` to the post's own URL.

**C-T4: Layout hreflang always points to homepage**
- File: `src/app/[locale]/layout.tsx` lines 67-72
- Layout-level `alternates` always emits `https://chopras.nl` and `https://chopras.nl/nl` regardless of page. Any new page added without its own `alternates` inherits homepage hreflang silently.
- Fix: remove `alternates` from layout `generateMetadata` entirely. Keep it only at page level.

### High

**H-T5: 9 meta descriptions outside 140-155 character range**
- `src/lib/blog-data.ts`: best-indian-restaurant (163 chars), halal-indian-restaurant (157), indiaas-catering (159), vegetarian-indian-food (156), indian-food-netherlands-guide (159), diwali-dinner blog (160), butter-chicken-guide NL (139 — under)
- `src/app/[locale]/page.tsx` NL: 157 chars
- `src/app/[locale]/diwali-dinner-den-haag/page.tsx` NL: 113 chars (under by 27)
- Note: the CLAUDE.md approved list itself has these blog descriptions over the limit — the approved list and code agree, but both violate the rule. A systematic fix is needed.

**H-T6: No Content-Security-Policy header**
- File: `next.config.mjs` lines 30-49
- Five security headers set but CSP is absent. CSP is a Lighthouse audit flag. Add a permissive CSP at minimum covering `self`, `unsafe-inline` for Next.js scripts, and Google Maps iframe domains.

**H-T7: order-confirmation has no noindex metadata**
- File: `src/app/[locale]/order-confirmation/page.tsx`
- `checkout/layout.tsx` sets `robots: noindex` but `order-confirmation/page.tsx` has no metadata export. May inherit the layout default of `index: true`. Add explicit `robots: { index: false, follow: false }`.

### Medium

**M-T8: IndexNow not implemented**
- No IndexNow key file in `public/`. New pages rely on sitemap polling (days to weeks for Bing). Low-effort win for indexing speed.

**M-T9: No X-XSS-Protection header**
- `next.config.mjs` — trivial addition: `'X-XSS-Protection': '1; mode=block'`.

**M-T10: Blog `lastModified` in sitemap uses `publishedAt`**
- File: `src/app/sitemap.ts` line 103
- Updated posts never emit a changed `lastModified` signal. Add a `dateModified` field to the `BlogPost` type.

### Low

**L-T11: Font swap CLS risk for Cormorant Garamond**
- `display: 'swap'` on a display serif. High metric difference from system fallback can cause CLS. Consider `size-adjust` overrides on the fallback font.

**L-T12: Image cache TTL inconsistency**
- `next.config.mjs`: `minimumCacheTTL: 2592000` (30 days) for `/_next/image` vs 1 year for static `public/images/`. Safe to raise to `31536000` for a restaurant site.

### Pass Items
- robots.txt: AI crawlers explicitly allowed, correct structure
- HTTPS + HSTS (2-year preload): correct
- X-Frame-Options, X-Content-Type-Options, Referrer-Policy: set
- `poweredByHeader: false`: set
- URL structure: zero `/en/` prefix violations in entire `src/` directory
- All 47 page.tsx files use `getLocalizedUrl()` correctly for canonicals
- Image optimisation: AVIF + WebP enabled, deviceSizes correct
- Font loading: `display: 'swap'` on all three fonts via `next/font/google`
- Sitemap: EN at root, NL at `/nl/`, blog posts handled separately

---

## Content Quality
**Score: 72 / 100 | E-E-A-T: 76 / 100**

### Critical

**C-C1: About page Dutch branch has English copy**
- File: `src/app/[locale]/about/page.tsx` lines 144-148
- The `isNl ? (` branch for "Het Begrip van Authenticiteit" renders identical English paragraphs in both locales. Dutch visitors at `/nl/about` see English body text.

**C-C2: About page has zero FAQs**
- File: `src/app/[locale]/about/page.tsx`
- CLAUDE.md requires a minimum 4 FAQ questions using `<FaqAccordion>`. The About page has none. No `getFaqPageSchema()` in JSON-LD either.

**C-C3: 5 meta descriptions exceed 155-character maximum**
- Blog posts (4 violations) in `src/lib/blog-data.ts` — see H-T5 for values
- Homepage NL (`src/app/[locale]/page.tsx` line 49): 157 chars

**C-C4: About page meta — primary keyword not in first 60 characters**
- File: `src/app/[locale]/about/page.tsx` line 22
- EN opens "Meet Arun Chopra, founder..." — brand-first, not query-first. The About page is not in the CLAUDE.md approved 43-page list; a new approved meta needs to be written.

**C-C5: Catering page FAQ count is 17 (maximum is 6)**
- File: `src/app/[locale]/catering/page.tsx` lines 17-18
- `[...cateringFaqs, ...eventFaqs]` produces 17 FAQs in EN. Maximum per CLAUDE.md is 6. This creates padded content that Google's QRG flags as low-value.

### High

**H-C6: Homepage NL meta does not match CLAUDE.md approved version**
- File: `src/app/[locale]/page.tsx` line 49
- Live: "Chopras Indian Restaurant in Den Haag..." (157 chars, brand-first). Approved: "Beste Indiaas restaurant Den Haag bij Chopras Indian Restaurant..." (149 chars, keyword-first).

**H-C7: Blog posts have no GEO blocks**
- File: `src/app/[locale]/blog/[slug]/page.tsx`
- Blog posts are prime AI citation targets but have no self-contained extractable passage with full restaurant data. Add a bilingual-aware standardised GEO block as a closing section in the blog template.

**H-C8: Homepage FAQ H2 uses `font-semibold` instead of `font-heading`**
- File: `src/app/[locale]/page.tsx` line 285
- Current: `font-semibold text-4xl mb-6 leading-[1.4]`. Required: `font-heading text-4xl md:text-5xl text-[#1B2B5E] mb-6 leading-[1.4]`. Renders in DM Sans instead of Cormorant Garamond.

**H-C9: Catering service paragraphs have no inline links**
- File: `src/app/[locale]/catering/page.tsx` lines 174-175
- `{tr.catering.serviceP1}` and `{tr.catering.serviceP2}` are plain translation strings. Link components cannot be injected into translation JSON — requires converting these to inline TSX.

### Medium

**M-C10: Blog internal links are absolute EN URLs**
- File: `src/lib/blog-data.ts` (throughout)
- `<a href="https://chopras.nl/...">` bypasses Next.js `<Link>` and serves EN URLs to all locales. Dutch blog visitors follow links to the EN version of pages.

**M-C11: "not for profit" claim on About page**
- File: `src/app/[locale]/about/page.tsx` line 177
- "A restaurant created not for profit..." has legal meaning (non-profit entity). Factually misleading for a commercial restaurant. Replace with: "A restaurant built on a single purpose: to bring authentic North Indian food to the Netherlands."

**M-C12: Menu page inline link class missing `font-semibold` and `hover:text-[#e8c84a]`**
- File: `src/app/[locale]/menu/page.tsx` lines 171-287
- ~20 link instances use `hover:underline` instead of `hover:text-[#e8c84a] font-semibold`.

**M-C13: Hover colour typo on halal-indian-restaurant-netherlands page**
- File: `src/app/[locale]/halal-indian-restaurant-netherlands/page.tsx` line 352
- `hover:text-[#e8c48a]` should be `hover:text-[#e8c84a]`.

**M-C14: Dutch FAQ uses English-style apostrophe possessive**
- File: `src/lib/faq-data.ts` line 141
- "Den Haag's" is incorrect Dutch. Change to: "een van de meest vegetarier-vriendelijke Indiaase restaurants in Den Haag."

---

## On-Page SEO
**Score: 70 / 100**

**C-O1: evenementenruimte English meta is Dutch text**
- File: `src/app/[locale]/evenementenruimte-den-haag/page.tsx` lines 21-24
- `descriptions.en` and `descriptions.nl` are identical Dutch strings. English visitors receive a Dutch meta description. The CLAUDE.md approved list has no English entry for this page — one must be written.
- Suggested English meta (154 chars): "Event venue Den Haag at Chopras Indian Restaurant. Private space for corporate events, celebrations and team dinners. Indian catering included. Get a quote."

**C-O2: "lunch" mentions in evenementenruimte-den-haag**
- File: `src/app/[locale]/evenementenruimte-den-haag/page.tsx` lines 87, 101-107
- "Lunches" and "Luncheons" appear in both EN and NL copy. Chopras opens at 16:30 and has no lunch service. Absolute CLAUDE.md violation, factually wrong.

**H-O3: "always open at midnight" on near-peace-palace page**
- File: `src/app/[locale]/indian-restaurant-near-peace-palace-den-haag/page.tsx` line 107
- Implies unlimited hours. Chopras closes at 22:30. Factual inaccuracy that could mislead visitors.

**H-O4: "we deliver to Leyweg" factual error on two proximity pages**
- Files: `indian-restaurant-near-peace-palace-den-haag/page.tsx`, `indian-restaurant-near-den-haag-centraal/page.tsx`
- Delivery is FROM Leyweg 986 to customers, not TO Leyweg. Invert the phrasing.

**H-O5: All 6 location pages and both proximity pages have only 3 FAQs**
- Files: all location/proximity pages
- CLAUDE.md minimum: 4 FAQs per page. Delft, Rijswijk, Zoetermeer, Voorburg, Leidschendam, Westland, near-peace-palace, and near-den-haag-centraal all have 3.

**M-O6: NL diwali-dinner meta is 113 characters (minimum is 140)**
- File: `src/app/[locale]/diwali-dinner-den-haag/page.tsx`
- Under the minimum by 27 characters. Needs expansion.

---

## Schema / Structured Data
**Score: 72 / 100**

### Critical

**C-S1: `getCateringServiceSchema` uses invalid `@type: 'FoodService'`**
- File: `src/lib/schema.ts` line 319
- `FoodService` does not exist in the Schema.org vocabulary. Google's validator silently ignores this block.
- Fix: change `'@type': 'FoodService'` to `'@type': 'Service'`.

**C-S2: `generated-schema.json` contains multiple errors**
- File: `generated-schema.json` (project root)
- Contains broken `/en/` URLs, wrong geo coordinates (52.0583/4.2932 vs constants' 52.04874/4.27684), wrong rating (4.7/83 instead of 4.9/800), and "Founder and Head Chef" (CLAUDE.md explicitly forbids this title for Arun Chopra). Delete this file or correct every error.

### High

**H-S3: `suitableForDiet` missing from main Restaurant and LocalBusiness schemas**
- File: `src/lib/schema.ts` lines 78 and 130
- `getRestaurantSchema()` and `getLocalRestaurantSchema()` do not include `suitableForDiet`. Halal is the restaurant's primary differentiator.
- Fix: add `suitableForDiet: ['https://schema.org/HalalDiet', 'https://schema.org/VegetarianDiet', 'https://schema.org/VeganDiet']` to both generators.

**H-S4: party-venue-den-haag schema bypasses schema.ts entirely**
- File: `src/app/[locale]/party-venue-den-haag/page.tsx`
- Inline `eventVenueSchema` hardcodes a wrong Maps URL, duplicates the aggregate rating instead of using the `AGGREGATE_RATING` constant, and hardcodes `url` instead of using `SITE_URL`. The only page on the site that does not use the centralised schema module.

### Medium

**M-S5: `SearchAction` missing from `getWebSiteSchema()`**
- File: `src/lib/schema.ts` line 63
- A Sitelinks Search Box is achievable if `/menu?search=query` renders results. Verify the URL parameter works before adding `potentialAction: SearchAction`.

**M-S6: `dateModified` in BlogPosting always mirrors `publishedAt`**
- File: `src/lib/schema.ts` line 284, `src/lib/blog-data.ts`
- No update tracking. Add optional `dateModified` to `BlogPost` type, fall back to `publishedAt` when absent.

**M-S7: Monday not explicitly listed as closed in `OPENING_HOURS`**
- File: `src/lib/schema.ts`
- Add: `{ '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday'], opens: '00:00', closes: '00:00' }`.

### Low

**L-S8: `hasMenu` missing from `getLocalRestaurantSchema()`**
- File: `src/lib/schema.ts` line 130
- The main `getRestaurantSchema()` has `hasMenu`; the version used on 20+ pages does not.

**L-S9: `ReservationAction` and `OrderAction` missing**
- Missed opportunities for rich result eligibility on Restaurant and delivery/takeaway page schemas.

### Pass Items
- `getFaqPageSchema()`: no `datePublished` / `dateModified` — correct per CLAUDE.md
- `getBlogPostingSchema()`: `datePublished` and `dateModified` present — correct
- All non-blog schemas: zero date fields — correct
- LocalBusiness address, phone, hours, geo: all match `constants.ts`
- `aggregateRating.reviewCount: '800'` with visible copy "800+": defensible and consistent
- Founder schema: `jobTitle: 'Founder'` — correct per CLAUDE.md (not "Head Chef")
- `sameAs` arrays: TripAdvisor, Google Maps, Facebook, Instagram, YouTube — all present

---

## Performance (Core Web Vitals)
**Score: 70 / 100 (estimated)**

Live measurement required for accurate scoring. Code-level signals:

Positive: AVIF + WebP enabled, `display: 'swap'` on all fonts, `next/font/google` (zero-layout-shift DNS), `compress: true`, `minimumCacheTTL: 2592000`, no detected render-blocking scripts.

Risk: Cormorant Garamond display serif may cause CLS at font swap (large metric diff from system serif). Image cache TTL inconsistency between `/_next/image` and static files.

---

## AI Search Readiness (GEO)
**Score: 82 / 100** (up from 68/100 at 2026-04-04)

### Critical

**C-G1: 30 of 45 pages have no GEO block**

Pages missing GEO blocks: beste-indiaas-restaurant-den-haag, bruiloft-catering-den-haag, corporate-events-den-haag, diwali-dinner-den-haag, evenementenruimte-den-haag, family-restaurant-den-haag, halal-food-den-haag, halal-menu, indian-birthday-catering-den-haag, indian-buffet-den-haag, indian-food-delivery-den-haag, indian-food-netherlands, indian-restaurant-delft, indian-restaurant-leidschendam, indian-restaurant-near-den-haag-centraal, indian-restaurant-near-peace-palace-den-haag, indian-restaurant-rijswijk, indian-restaurant-voorburg, indian-restaurant-westland, indian-restaurant-zoetermeer, indian-takeaway-den-haag, indian-wedding-catering-den-haag, indo-chinese-restaurant-den-haag, party-venue-den-haag, vacancy, vegan-menu, zaal-huren-den-haag, and all 5 blog posts (in template).

Use `butter-chicken-den-haag/page.tsx` as the template — it is the best-executed example. Required elements per block: full brand name "Chopras Indian Restaurant", Leyweg 986, primary service for the page, one verifiable fact (rating, capacity, dish count, delivery radius), opening hours (Tuesday to Sunday 16:30 to 22:30), 2 inline links minimum, bilingual (isNl conditional), 60-130 words, question-format H2.

### High

**H-G2: `dateModified` always mirrors `publishedAt` in blog schema** (also M-S6)
- Freshness signals suppressed for updated posts. Google AIO weights recently-modified authoritative content.

**H-G3: Three FAQ answers too short for AI citation**
- File: `src/lib/faq-data.ts`
- "How spicy is your food" (~28 words), "Is there a dress code" (~26 words), "Do you accept walk-ins" (~38 words). Expand each to 80-120 words with specific detail.

### Medium

**M-G4: LinkedIn absent from all `sameAs` arrays**
- File: `src/lib/schema.ts` line 30
- LinkedIn provides entity disambiguation and authority signals for AI systems. Create a LinkedIn company page, then add URL to `SAME_AS` array.

### Progress Since 2026-04-04
- OAI-SearchBot added to robots.txt
- llms.txt hours corrected (was "Tue-Fri 15:00-22:00", now "16:30-22:30, Tuesday to Sunday")
- schema.ts built out from empty placeholder to comprehensive library
- About page created with E-E-A-T signals
- sameAs arrays expanded from TripAdvisor-only to 5 platforms
- 15 pages now have compliant GEO blocks (was 0)
- Named author on all blog posts with Person schema

---

## Local SEO
**Score: 74 / 100**

### Critical

**C-L1: "lunch" mentions in evenementenruimte-den-haag** (same as C-O2)
- File: `src/app/[locale]/evenementenruimte-den-haag/page.tsx` lines 87, 101-107

**C-L2: party-venue-den-haag uses hardcoded wrong Maps URL in schema**
- File: `src/app/[locale]/party-venue-den-haag/page.tsx`
- `sameAs` hardcodes `@52.0583,4.2932` instead of the Place ID URL from `constants.ts`. Creates a forked entity graph.

### High

**H-L3: evenementenruimte English meta is Dutch text** (same as C-O1)

**H-L4: "always open at midnight" on near-peace-palace** (same as H-O3)

**H-L5: All 8 location and proximity pages have only 3 FAQs** (same as H-O5)

**H-L6: near-peace-palace and near-den-haag-centraal are thin pages**
- Both lack city-specific hooks and depth compared to Delft/Rijswijk pages. near-peace-palace should reference diplomatic community patterns; near-den-haag-centraal should address commuter and Randstad worker audiences.

### Medium

**M-L7: Monday not listed as closed in schema** (same as M-S7)

**M-L8: No Google Maps embed on contact page**
- No `<iframe>` embed found anywhere in the codebase. Embedded map is a standard brick-and-mortar GBP reinforcement.

**M-L9: English Rijswijk page missing Parking info card**
- File: `src/app/[locale]/indian-restaurant-rijswijk/page.tsx` line 159
- English practical info array has 3 items; Dutch has 4. Add the Parking card to the English array.

### Pass Items

- NAP fully consistent: Leyweg 986, 2545 GW Den Haag, +31 6 30645930, "Chopras Indian Restaurant" — match across constants.ts, schema.ts, faq-data.ts, footer, API email templates
- Location pages (Delft, Rijswijk, Zoetermeer): strong unique content, low doorway risk
- Rating display: "800+" consistently used across all pages — correct per CLAUDE.md
- Schema aggregateRating: 4.9 / 800 — correct
- Google Place ID present in constants.ts

---

## Images
**Score: 80 / 100**

- All images use Next.js `<Image>` component — CLAUDE.md rule observed
- AVIF + WebP formats enabled
- deviceSizes: 320 to 3840px — full coverage
- Alt text: descriptive alt found on all audited visible images, no empty `alt=""`
- OG images: `opengraph-image.tsx` and `apple-icon.png` confirmed present
- Cache TTL: raise `minimumCacheTTL` to 1 year (low risk for restaurant site)

---

## Files With Multiple Issues (Reference)

| File | Issue Count | Highest Severity |
|---|---|---|
| `src/app/[locale]/evenementenruimte-den-haag/page.tsx` | 3 | Critical |
| `src/app/[locale]/party-venue-den-haag/page.tsx` | 4 | Critical |
| `src/lib/schema.ts` | 6 | Critical |
| `src/lib/blog-data.ts` | 3 | High |
| `src/app/[locale]/about/page.tsx` | 5 | Critical |
| `src/app/[locale]/blog/[slug]/page.tsx` | 3 | Critical |
| `next.config.mjs` | 4 | Critical |
| `src/app/[locale]/layout.tsx` | 1 | Critical |
| `src/app/[locale]/indian-restaurant-near-peace-palace-den-haag/page.tsx` | 3 | High |
| `src/app/[locale]/indian-restaurant-near-den-haag-centraal/page.tsx` | 2 | High |
| `src/app/[locale]/page.tsx` (homepage) | 2 | High |
| `src/app/[locale]/menu/page.tsx` | 1 | Medium |
