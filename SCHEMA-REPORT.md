# Schema Markup Audit Report - Chopras Indian Restaurant

**Date:** 2026-04-05
**Pages audited:** 10 pages (layout, homepage, catering, contact, menu, blog listing, blog post, Delft, Rijswijk, Zoetermeer)

---

## Detection Summary

All structured data uses JSON-LD format via `<script type="application/ld+json">` blocks. No Microdata or RDFa detected. JSON-LD is Google's preferred format.

---

## Validation Results (Pre-Fix State)

| Schema | Page | Type | Status | Issues Found |
|--------|------|------|--------|--------------|
| WebSite | layout | WebSite | ⚠️ | Missing SearchAction/potentialAction |
| Restaurant | homepage | Restaurant | ⚠️ | Monday 00:00-00:00 hours; schema.ts not used |
| FAQPage | homepage | FAQPage | ❌ | **RESTRICTED** - not eligible for rich results (non-gov/healthcare site) |
| Person | homepage | Person | ✅ | Correct; @id present |
| Restaurant | catering | Restaurant | ⚠️ | Hardcoded contact data; no locale in URL; Monday 00:00-00:00 |
| BreadcrumbList | catering | BreadcrumbList | ✅ | Correct |
| Restaurant | contact | Restaurant | ⚠️ | Module-level const with hardcoded data; Monday 00:00-00:00 |
| BreadcrumbList | contact | BreadcrumbList | ✅ | Correct |
| Menu | menu | Menu | ⚠️ | URL was `https://chopras.nl/menu` (missing locale); no @id |
| BreadcrumbList | menu | BreadcrumbList | ✅ | Correct |
| BlogPosting | blog/[slug] | BlogPosting | ⚠️ | image always `/og/home-og.jpg` regardless of post |
| BreadcrumbList | blog/[slug] | BreadcrumbList | ✅ | Correct |
| BreadcrumbList | blog listing | BreadcrumbList | ✅ | Correct (only schema on this page) |
| Restaurant | /indian-restaurant-delft | LocalBusiness+Restaurant | ⚠️ | Missing `@id` - entity not linked to canonical graph |
| Restaurant | /indian-restaurant-rijswijk | LocalBusiness+Restaurant | ⚠️ | Missing `@id` - entity not linked to canonical graph |
| Restaurant | /indian-restaurant-zoetermeer | LocalBusiness+Restaurant | ⚠️ | Missing `@id` - entity not linked to canonical graph |

---

## Issues Fixed in This Session

### 1. `schema.ts` was a placeholder
**Impact:** High. CLAUDE.md mandates all schema flows through `/src/lib/schema.ts` but the file contained only `// placeholder`. Schemas were scattered across 10+ pages with duplicated, hardcoded data.

**Fix:** Implemented centralized generators: `getWebSiteSchema`, `getRestaurantSchema`, `getLocalRestaurantSchema`, `getFounderSchema`, `getBreadcrumbSchema`, `getMenuSchema`, `getBlogPostingSchema`, `getCateringServiceSchema`.

---

### 2. FAQPage on homepage (RESTRICTED type)
**Impact:** Medium. Google restricted FAQ rich results to government and healthcare authority sites in August 2023. The schema generated no search enrichment but added unnecessary payload.

**Fix:** Removed `FAQPage` JSON-LD block from the homepage. The FAQ accordion section remains on-page for users.

---

### 3. Monday `opens: '00:00', closes: '00:00'`
**Impact:** Medium. Google's structured data documentation recommends omitting closed days rather than representing them as 00:00-00:00, which can cause validator warnings and incorrect knowledge panel display.

**Files fixed:** contact/page.tsx, indian-restaurant-delft/page.tsx, indian-restaurant-rijswijk/page.tsx, indian-restaurant-zoetermeer/page.tsx

**Fix:** The centralized `OPENING_HOURS` constant in `schema.ts` only includes the Tue-Sun entry. All pages using the generator inherit this correction automatically.

---

### 4. Menu schema URL missing locale
**Impact:** Medium. `'url': 'https://chopras.nl/menu'` pointed to a non-existent path (the site uses locale-prefixed URLs `/en/menu` and `/nl/menu`).

**Fix:** `getMenuSchema(locale, sections)` generates `https://chopras.nl/${locale}/menu` and adds an `@id` anchor.

---

### 5. Location pages missing `@id`
**Impact:** Medium-High. Without `@id`, the `LocalBusiness+Restaurant` entities on /indian-restaurant-delft, /indian-restaurant-rijswijk, and /indian-restaurant-zoetermeer were not linked to the canonical `#restaurant` entity. Google's entity resolver could not confirm these pages describe the same business.

**Fix:** `getLocalRestaurantSchema` always emits `'@id': '${SITE_URL}/#restaurant'`, connecting all location pages to the main entity graph.

---

### 6. WebSite schema missing SearchAction
**Impact:** Low-Medium. Google supports Sitelinks Searchbox for sites that declare a `SearchAction` on their `WebSite` entity. Missing this forfeits eligibility.

**Fix:** `getWebSiteSchema` now includes `potentialAction.SearchAction` targeting `/[locale]/menu?search={search_term_string}`.

---

### 7. Hardcoded contact data in schemas
**Impact:** Low (correctness risk). Several pages hardcoded phone, address, and URLs directly instead of importing from `constants.ts`. A phone number change would require editing multiple schema blocks.

**Fix:** All generators import exclusively from `constants.ts`. Updating `RESTAURANT.contact.phone` now propagates to every schema automatically.

---

## Remaining Recommendations (Not Yet Implemented)

### A. Blog post images - post-specific OG images
Currently `getBlogPostingSchema` falls back to `/og/home-og.jpg` for all posts because individual posts do not have an `image` property. Google's `BlogPosting` guidelines recommend a unique image per article.

**Recommendation:** Add an optional `image` field to the blog post data type in `blog-data.ts` and supply a post-specific image URL per post. The generator already accepts this via `post.image`.

### B. `aggregateRating` review count is static
The `reviewCount: '83'` is hardcoded and will become stale. Review counts that visibly mismatch public platforms can be flagged by Google's quality algorithms.

**Recommendation:** Source this from a regularly updated config value, or connect to the TripAdvisor/Google Maps API to fetch live data at build time.

### C. Blog listing page - missing CollectionPage schema
The `/[locale]/blog` page has only a BreadcrumbList. Adding a `CollectionPage` or `WebPage` schema with `about` and `url` properties would give Google richer context for indexing the listing page.

### D. `Person` sameAs - thin entity signals
The Arun Chopra `Person` entity lists only `https://chopras.nl/en` in `sameAs`. Entity authority is strengthened by linking to external profiles (LinkedIn, TripAdvisor author page, etc.) if they exist.

### E. `indianBuffet` page - CateringService schema uses em dash in name
The `getCateringServiceSchema` was written using ` - ` (hyphen-space-hyphen) per project rules, but verify the Dutch-locale name string does not inadvertently include an em dash in translation strings.

---

## Schema Entity Graph (Post-Fix)

```
WebSite (#website)
  potentialAction: SearchAction

Restaurant (#restaurant)
  address: PostalAddress
  geo: GeoCoordinates
  openingHoursSpecification: [Tue-Sun 16:30-22:30]
  aggregateRating: 4.7 / 83 reviews
  suitableForDiet: HalalDiet
  founder: Person -> #arun-chopra
  sameAs: [TripAdvisor, Google Maps, Facebook, Instagram, YouTube]

Person (#arun-chopra)
  worksFor: Restaurant -> #restaurant

Menu (#/[locale]/menu#menu)
  hasMenuSection: [12 categories]
    hasMenuItem: [89 items with Offer/price]

Location pages (Delft, Rijswijk, Zoetermeer)
  @id -> #restaurant  (linked to canonical entity)

BlogPosting (per post)
  author -> #arun-chopra
  publisher: Organization (Chopras)

BreadcrumbList (per page with depth > 1)
```
