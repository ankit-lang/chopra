# SEO Action Plan - Chopras Indian Restaurant
**Generated:** 2026-04-17 | **Overall Score:** 73/100
**Full findings:** FULL-AUDIT-REPORT.md

---

## Critical — Fix Before Next Deploy

### 1. Remove all "lunch" references from evenementenruimte-den-haag
**File:** `src/app/[locale]/evenementenruimte-den-haag/page.tsx` lines 87, 101-107
**Why:** Chopras has no lunch service (opens 16:30). These lines say "Lunches" and "Luncheons" in both EN and NL. An absolute CLAUDE.md rule violation. A visitor reading this may arrive expecting a lunch and find the restaurant closed.
**Fix:** Replace with references to corporate dinners, evening receptions, and private evening events.

### 2. Fix About page Dutch branch — translate English copy to Dutch
**File:** `src/app/[locale]/about/page.tsx` lines 144-148
**Why:** The `isNl ? (` branch for "Het Begrip van Authenticiteit" renders identical English paragraphs in both locales. Dutch visitors at `/nl/about` get English body text. Bilingual architecture failure.
**Fix:** Write Dutch translations for the three paragraphs (spice grinding, halal sourcing, daily vegetables).

### 3. Fix `getCateringServiceSchema` invalid type
**File:** `src/lib/schema.ts` line 319
**Why:** `@type: 'FoodService'` does not exist in Schema.org. Google silently ignores this entire schema block. One-line fix with zero risk.
**Fix:** Change `'FoodService'` to `'Service'`.

### 4. Fix blog hreflang — single-language only
**File:** `src/app/[locale]/blog/[slug]/page.tsx` lines 28-32
**Why:** Dutch blog posts set `x-default: https://chopras.nl/blog` (the blog index page), not the post itself. This tells Google the default for a Dutch post is the blog index — semantically incorrect.
**Fix:** For posts with no translated counterpart, set `x-default` to the post's own URL:
```ts
languages: {
  [post.language]: getLocalizedUrl(post.language, `blog/${post.slug}`),
  'x-default': getLocalizedUrl(post.language, `blog/${post.slug}`),
},
```

### 5. Fix 2-hop redirect chain for `/en/party-venue-den-haag`
**File:** `next.config.mjs` line 20
**Why:** Two 301 hops (config → middleware) waste crawl budget and dilute link equity.
**Fix:** Change destination from `/en/feestzaal-den-haag` to `/feestzaal-den-haag` directly.

### 6. Resolve party-venue-den-haag canonical conflict
**Files:** `src/app/[locale]/party-venue-den-haag/page.tsx`, `src/app/sitemap.ts`, `next.config.mjs`
**Why:** The page is indexable (no noindex), canonical points to itself, but it is not in the sitemap. The NL version redirects to feestzaal-den-haag but the EN root version does not.
**Decision required:** Either add to sitemap (if the "party venue Den Haag" keyword is worth targeting as a separate page) OR add `robots: { index: false }` + add `/party-venue-den-haag` → `/feestzaal-den-haag` redirect to `next.config.mjs`.

### 7. Remove or correct generated-schema.json
**File:** `generated-schema.json` (project root)
**Why:** Contains broken `/en/` URLs, wrong geo coordinates, wrong rating (4.7/83 instead of 4.9/800), and "Founder and Head Chef" which CLAUDE.md explicitly prohibits. This file is a source of confusion and error.
**Fix:** Delete the file, or update every field to match current `constants.ts` and `schema.ts` values.

### 8. Fix layout-level hreflang
**File:** `src/app/[locale]/layout.tsx` lines 67-72
**Why:** Layout always emits `https://chopras.nl` and `https://chopras.nl/nl` as hreflang regardless of page. Any new page without its own `alternates` silently inherits homepage hreflang.
**Fix:** Remove the `alternates` block from layout `generateMetadata` entirely.

### 9. Add FAQAccordion to About page (minimum 4 questions)
**File:** `src/app/[locale]/about/page.tsx`
**Why:** Zero FAQs — violates CLAUDE.md minimum. Also missing `getFaqPageSchema()` in JSON-LD.
**Suggested questions:** Who founded Chopras Indian Restaurant? What are the opening hours? Is Chopras fully halal certified? Where is Chopras Indian Restaurant located?

### 10. Fix evenementenruimte English meta description
**File:** `src/app/[locale]/evenementenruimte-den-haag/page.tsx` lines 21-24
**Why:** `descriptions.en` is set to Dutch text. English visitors receive a Dutch meta description.
**Fix:** Set English description (154 chars): "Event venue Den Haag at Chopras Indian Restaurant. Private space for corporate events, celebrations and team dinners. Indian catering included. Get a quote."

### 11. Reduce Catering page FAQ to maximum 6
**File:** `src/app/[locale]/catering/page.tsx` lines 17-18
**Why:** 17 FAQs in English (7 in NL). CLAUDE.md maximum is 6. Padded FAQ content is a September 2025 QRG red flag.
**Fix:** Keep the 2 `cateringFaqs` + pick the 4 strongest `eventFaqs`. Trim NL to 6 as well.

### 12. Fix all 9 meta descriptions outside 140-155 character range
**File:** `src/lib/blog-data.ts` (7 posts), `src/app/[locale]/page.tsx` NL, `src/app/[locale]/diwali-dinner-den-haag/page.tsx` NL
**Why:** Over-length descriptions get truncated or rewritten by Google. Under-length descriptions (diwali NL at 113 chars) leave SERP real estate unused.
**Note:** The CLAUDE.md approved blog descriptions are also over the limit — the approved list needs updating alongside the code.

---

## High Priority — Fix Within 1 Week

### 13. Add GEO blocks to the 30 pages that are missing them
**Files:** See list of 30 pages in FULL-AUDIT-REPORT.md (GEO section)
**Why:** 30 of 45 pages cannot be cited by ChatGPT, Perplexity, or Google AIO. This is the single largest AI citation gap on the site. High-value targets first: halal-food-den-haag, indian-wedding-catering-den-haag, all 6 location pages, vegan-menu, indo-chinese-restaurant-den-haag.
**Template:** Use `butter-chicken-den-haag/page.tsx` GEO block as the reference implementation. Each block: full brand name, Leyweg 986, primary service, one verifiable fact, hours (Tuesday to Sunday 16:30 to 22:30), 2+ inline links, bilingual, 60-130 words, question-format H2.

### 14. Add GEO block to blog post template
**File:** `src/app/[locale]/blog/[slug]/page.tsx`
**Why:** All 5 blog posts are prime AI citation targets but have no self-contained restaurant data passage. The most efficient fix is a standardised GEO block in the shared template, below the article body.

### 15. Add explicit noindex to order-confirmation page
**File:** `src/app/[locale]/order-confirmation/page.tsx`
**Why:** No metadata export — may inherit `index: true` from layout default. Transactional confirmation pages should never be indexed.
**Fix:** Add `export const metadata = { robots: { index: false, follow: false } }`.

### 16. Fix homepage NL meta description
**File:** `src/app/[locale]/page.tsx` line 49
**Why:** Live NL meta is 157 chars (over limit) and starts with the brand name instead of the primary keyword.
**Fix:** Replace with CLAUDE.md approved version: "Beste Indiaas restaurant Den Haag bij Chopras Indian Restaurant. Authentieke Noord-Indiaase keuken, volledig halal. Beoordeeld 4.9 sterren. Bezoek ons." (149 chars).

### 17. Add Content-Security-Policy header
**File:** `next.config.mjs`
**Why:** CSP is absent from the five security headers set. Lighthouse flags it. Protects against XSS.
**Fix:** Add at minimum: `default-src 'self'; script-src 'self' 'unsafe-inline'; frame-src https://www.google.com/maps/;`

### 18. Fix "always open at midnight" and "deliver to Leyweg" errors on proximity pages
**Files:** `src/app/[locale]/indian-restaurant-near-peace-palace-den-haag/page.tsx`, `src/app/[locale]/indian-restaurant-near-den-haag-centraal/page.tsx`
**Why:** "Always open" implies 24-hour service (Chopras closes at 22:30). "We deliver to Leyweg" is backwards — delivery is FROM Leyweg to customers. Both are factual errors visible to visitors and Google.

### 19. Add 4th FAQ to all 8 location and proximity pages
**Files:** Delft, Rijswijk, Zoetermeer, Voorburg, Leidschendam, Westland, near-peace-palace, near-den-haag-centraal
**Why:** All have only 3 FAQs — one below the CLAUDE.md minimum of 4.
**Suggestion:** Add a delivery or catering question specific to each city's distance from Leyweg 986.

### 20. Add `suitableForDiet` to main Restaurant and LocalBusiness schemas
**File:** `src/lib/schema.ts` lines 78 and 130
**Why:** Halal is the restaurant's primary differentiator. The main entity schema and all location-page schemas currently lack this signal.
**Fix:** Add `suitableForDiet: ['https://schema.org/HalalDiet', 'https://schema.org/VegetarianDiet', 'https://schema.org/VeganDiet']` to both `getRestaurantSchema()` and `getLocalRestaurantSchema()`.

### 21. Fix party-venue-den-haag schema — replace hardcoded values with constants
**File:** `src/app/[locale]/party-venue-den-haag/page.tsx`
**Why:** Hardcoded Maps URL uses wrong coordinates. Hardcoded rating duplicates code from `AGGREGATE_RATING`. Hardcoded `url` bypasses `SITE_URL`.
**Fix:** Import `RESTAURANT`, `SAME_AS`, `AGGREGATE_RATING`, `SITE_URL` from constants/schema and use them in the inline `eventVenueSchema`.

### 22. Fix homepage FAQ section H2 heading class
**File:** `src/app/[locale]/page.tsx` line 285
**Fix:** Replace `font-semibold text-4xl mb-6 leading-[1.4] [letter-spacing:0.02em] mt-2` with `font-heading text-4xl md:text-5xl text-[#1B2B5E] mb-6 leading-[1.4]`.

### 23. Expand three short FAQ answers in faq-data.ts
**File:** `src/lib/faq-data.ts`
**Why:** Three FAQ answers are 26-38 words — below the threshold for AI citation eligibility. These appear in homepage FAQPage schema.
- "How spicy is your food": expand to describe heat levels per dish (butter chicken mild, rogan josh medium, chilli chicken hot)
- "Is there a dress code": mention casual welcome and festival attire for cultural events
- "Do you accept walk-ins": specify Friday/Saturday evenings as high-demand, Diwali/Eid as requiring advance booking

---

## Medium Priority — Fix Within 1 Month

### 24. Rewrite near-peace-palace and near-den-haag-centraal as substantive location pages
**Files:** Both proximity pages
**Why:** Both pages are thin compared to Delft/Rijswijk. They lack city-specific hooks, demographic angles, and transport specifics. Target word count per section: match Delft (237 lines, 4-5 sections).
- Peace Palace page: reference diplomatic community, ICC/ICJ visitor patterns, international courts staff
- Centraal page: reference commuter patterns, intercity rail passengers, Randstad worker audience

### 25. Convert Catering service paragraphs to inline TSX with Link components
**File:** `src/app/[locale]/catering/page.tsx` lines 174-175
**Why:** `{tr.catering.serviceP1}` and `{tr.catering.serviceP2}` are plain translation strings — Links cannot be injected into JSON. CLAUDE.md requires Links in all 3+ sentence paragraphs.
**Fix:** Move these two paragraphs from `en.json`/`nl.json` into inline TSX using the `isNl` conditional pattern.

### 26. Fix menu page inline link classes
**File:** `src/app/[locale]/menu/page.tsx` lines 171-287
**Why:** ~20 links use `hover:underline` instead of the mandatory `hover:text-[#e8c84a] font-semibold`.
**Fix:** Global find-replace `hover:underline transition-colors duration-200` → `hover:text-[#e8c84a] font-semibold` on this page.

### 27. Add explicit Monday-closed to OpeningHoursSpecification
**File:** `src/lib/schema.ts`
**Why:** Monday is absent from the `OPENING_HOURS` array. Some parsers infer an unconstrained Monday.
**Fix:** Add: `{ '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday'], opens: '00:00', closes: '00:00' }`.

### 28. Add `dateModified` tracking to blog posts
**Files:** `src/lib/blog-data.ts`, `src/lib/schema.ts` line 284
**Why:** `dateModified` always equals `publishedAt`. Updated posts cannot signal freshness to Google AIO or Bing Copilot.
**Fix:** Add optional `dateModified?: string` to `BlogPost` type. In `getBlogPostingSchema()`, use `post.dateModified ?? post.publishedAt`. Update the five existing posts with today's date if any content has been revised.

### 29. Fix NL diwali-dinner meta — expand to 140+ characters
**File:** `src/app/[locale]/diwali-dinner-den-haag/page.tsx`
**Current:** 113 chars (under minimum by 27).

### 30. Fix About page meta — write query-first version
**File:** `src/app/[locale]/about/page.tsx` line 22
**Why:** Current EN meta opens with "Meet Arun Chopra..." (brand-first). Primary keyword should appear in first 60 characters.
**Suggested (155 chars):** "About Chopras Indian Restaurant Den Haag. Founded 2023 by Arun Chopra. Halal certified North Indian cuisine at Leyweg 986. Open Tuesday to Sunday."

### 31. Fix "not for profit" claim on About page
**File:** `src/app/[locale]/about/page.tsx` line 177
**Why:** "not for profit" has legal meaning (non-profit entity). Misleading for a commercial restaurant.
**Fix:** "A restaurant built on a single purpose: to bring authentic North Indian food to the Netherlands."

### 32. Fix hover colour typo on halal-indian-restaurant-netherlands page
**File:** `src/app/[locale]/halal-indian-restaurant-netherlands/page.tsx` line 352
**Fix:** Change `hover:text-[#e8c48a]` to `hover:text-[#e8c84a]`.

### 33. Fix Dutch FAQ possessive
**File:** `src/lib/faq-data.ts` line 141
**Fix:** "Den Haag's" → "een van de meest vegetarier-vriendelijke Indiaase restaurants in Den Haag."

### 34. Fix English Rijswijk info card — add missing Parking entry
**File:** `src/app/[locale]/indian-restaurant-rijswijk/page.tsx` line 159
**Why:** English practical info array has 3 items; Dutch has 4. Parking card missing from EN.

### 35. Add Google Maps embed to contact page
**File:** `src/app/[locale]/contact/page.tsx`
**Why:** No `<iframe>` embed found anywhere. Embedded map reinforces physical location signal and is standard GBP reinforcement for brick-and-mortar restaurants.

### 36. Implement IndexNow
**Where:** `public/` directory + deploy hook
**Why:** New pages and content updates rely on sitemap polling (days to weeks for Bing/Yandex). IndexNow enables instant URL submission on publish.

### 37. Add X-XSS-Protection header
**File:** `next.config.mjs`
**Fix:** Add `{ key: 'X-XSS-Protection', value: '1; mode=block' }` to the headers array.

---

## Low Priority — Backlog

### 38. Create LinkedIn presence and add to sameAs arrays
**File:** `src/lib/schema.ts` line 30 (SAME_AS array)
**Why:** LinkedIn is absent from all sameAs arrays. It provides entity disambiguation for AI systems. Create a LinkedIn company page for Chopras Indian Restaurant + an Arun Chopra personal profile, then add the company URL to `SAME_AS`.

### 39. Add `hasMenu` to `getLocalRestaurantSchema()`
**File:** `src/lib/schema.ts` line 130
**Fix:** Add `hasMenu: locale === 'nl' ? \`${SITE_URL}/nl/menu\` : \`${SITE_URL}/menu\`` to match the main `getRestaurantSchema()`.

### 40. Investigate `SearchAction` for WebSite schema
**File:** `src/lib/schema.ts` line 63
**Why:** A Sitelinks Search Box is achievable if `/menu?search=query` renders actual search results. Verify the URL param works in the `MenuPageClient` component before implementing.

### 41. Add `ReservationAction` to Restaurant schema
**File:** `src/lib/schema.ts`
**Fix:** Add `potentialAction: { '@type': 'ReserveAction', target: { '@type': 'EntryPoint', urlTemplate: \`${SITE_URL}/contact\` } }`.

### 42. Fix blog internal links — convert to locale-aware relative paths
**File:** `src/lib/blog-data.ts` (throughout)
**Why:** All `<a href="https://chopras.nl/...">` bypass Next.js `<Link>` and serve EN URLs to all locales. Dutch blog visitors follow links to EN pages.
**Fix:** Either move blog content to TSX components, or build a post-render link rewriter that converts absolute EN URLs to locale-relative paths.

### 43. Raise Image minimumCacheTTL to 1 year
**File:** `next.config.mjs` line 6
**Fix:** Change `minimumCacheTTL: 2592000` to `minimumCacheTTL: 31536000`. Safe for a restaurant site where images change infrequently. Resolves inconsistency with static image 1-year cache.

### 44. Add `size-adjust` CSS for Cormorant Garamond fallback
**File:** `src/app/globals.css` (or equivalent)
**Why:** Display serif has high metric difference from system fallback, risking CLS at font swap. Low impact but easy fix.

### 45. Add `blog/` `lastModified` tracking to sitemap
**File:** `src/app/sitemap.ts` line 103
**Fix:** Use `post.dateModified ?? post.publishedAt` once the `dateModified` field exists (see item 28).

---

## Summary Counts

| Priority | Count |
|---|---|
| Critical (fix before next deploy) | 12 |
| High (fix within 1 week) | 11 |
| Medium (fix within 1 month) | 13 |
| Low (backlog) | 8 |
| **Total** | **44** |

---

## Score Projection

Completing all Critical + High items will raise the overall score from 73 to approximately **84/100**.
Completing all items will raise it to approximately **91/100**.

The biggest single score improvement comes from adding GEO blocks to the 30 missing pages (item 13 + 14) — this alone is worth approximately +4 points on the overall score.
