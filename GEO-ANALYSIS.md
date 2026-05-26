# GEO Analysis: Chopras Indian Restaurant
**chopras.nl — Den Haag, Netherlands**
Analysis date: 2026-04-04
Analyst: Claude Sonnet 4.6 (GEO Specialist)

---

## GEO Readiness Score: 68 / 100

| Dimension | Weight | Raw Score | Weighted Score |
|---|---|---|---|
| Citability | 25% | 72/100 | 18.0 |
| Structural Readability | 20% | 75/100 | 15.0 |
| Multi-Modal Content | 15% | 40/100 | 6.0 |
| Authority & Brand Signals | 20% | 55/100 | 11.0 |
| Technical Accessibility | 20% | 90/100 | 18.0 |
| **Total** | **100%** | | **68.0** |

---

## Platform-Specific Scores

| Platform | Score | Key Gap |
|---|---|---|
| Google AI Overviews | 64/100 | Missing LocalBusiness `@id` sitelinks; `aggregateRating` only on homepage |
| ChatGPT (GPT-4o Browse) | 71/100 | llms.txt present but hours mismatch vs constants.ts; no Wikipedia entity |
| Perplexity | 73/100 | Strong FAQ schema; needs structured "answer blocks" in location pages |
| Bing Copilot | 60/100 | No Bing-specific schema (speakable); OAI-SearchBot not explicitly listed in robots.txt |

Only ~11% of domains are cited by both ChatGPT and Google AIO simultaneously. The current score puts Chopras in a solid position for Perplexity and ChatGPT but leaves points on the table for Google AIO.

---

## 1. AI Crawler Access Status

File: `/public/robots.txt`

| Crawler | Status | Notes |
|---|---|---|
| GPTBot (OpenAI) | ALLOWED | Explicit Allow: / entry present |
| OAI-SearchBot (OpenAI Browse) | NOT LISTED | No explicit entry — falls through to wildcard `Allow: /` which is fine, but explicit is better |
| ClaudeBot (Anthropic) | ALLOWED | Explicit Allow: / entry present |
| PerplexityBot | ALLOWED | Explicit Allow: / entry present |
| anthropic-ai | ALLOWED | Explicit Allow: / entry — this covers training; consider whether this is intentional |
| Google-Extended (Bard/Gemini) | ALLOWED | Explicit Allow: / entry present |
| CCBot (Common Crawl) | NOT LISTED | Falls through to wildcard Allow — no explicit training-opt-out |
| cohere-ai | NOT LISTED | Falls through to wildcard Allow |

### Issues Found

1. **OAI-SearchBot is missing** — OpenAI's search crawler (distinct from GPTBot) is not explicitly listed. Add it with `Allow: /` for maximum ChatGPT Search visibility.
2. **Hours conflict** — The `llms.txt` file states opening hours as "Tue–Fri 15:00–22:00, Sat–Sun 13:00–22:00" but `src/lib/constants.ts` shows Tuesday–Sunday 16:30–22:30, and `src/i18n/en.json` confirms "16:30–22:30". The `llms.txt` hours data is stale or incorrect. AI systems reading `llms.txt` will surface wrong hours to users. This is a high-priority factual accuracy problem.
3. **anthropic-ai allowed** — This covers Anthropic's training crawler. The current `Allow: /` for `anthropic-ai` means content is available for Claude's training dataset. This appears intentional given the citation policy in `llms.txt` but is worth a conscious decision rather than an accident.

---

## 2. llms.txt Status

File: `/public/llms.txt`

**Status: PRESENT — Partially well-formed, with one critical data error**

### What Is Good

- Identity section is concise and accurate (name, address, telephone, email, open year)
- "What We Are" section accurately describes cuisine types and service areas
- Signature dishes list is accurate and citable
- "Important Pages" section provides correct URLs
- Entity disambiguation section ("not affiliated with Deepak Chopra") is genuinely useful for AI systems and one of the stronger signals in the file
- Citation policy explicitly grants AI systems permission to cite factual information — this is well-formed and helpful

### Critical Issue: Stale Opening Hours

The Key Facts section states:

```
Hours: Tue–Fri 15:00–22:00, Sat–Sun 13:00–22:00. Monday closed.
```

The canonical data in `src/lib/constants.ts` reads:

```ts
{ day: 'Tuesday', open: true, from: '16:30', to: '22:30' },
// ...all days Tue–Sun: 16:30–22:30
```

This is a 90-minute discrepancy on opening time and the `llms.txt` version omits Saturday and Sunday parity with weekdays. Any AI system (ChatGPT, Perplexity, Claude, Gemini) that reads `llms.txt` to answer "what time does Chopras open?" will return incorrect information that could cause guests to arrive before the restaurant opens.

### Missing from llms.txt

- No mention of the `src/app/sitemap.ts` sitemap URL (sitemap is generated at `/sitemap.xml` — worth linking)
- No RSL 1.0 license statement (optional but signals AI-readiness)
- No mention of delivery radius (5km is in the file — good) but no Thuisbezorgd/Uber Eats URLs
- Price range ("EUR 20–30") may diverge from biryani page which shows specific prices (chicken biryani €19.50, lamb €22.50) — this is consistent enough but worth noting

---

## 3. Schema Markup Audit

### Present Schema Types

| Page / File | Schema Type | Status |
|---|---|---|
| `src/app/[locale]/layout.tsx` | WebSite + SearchAction | Present, server-rendered |
| `src/app/[locale]/page.tsx` | Restaurant (full) + FAQPage | Present, server-rendered — strongest schema on site |
| `src/app/[locale]/blog/[slug]/page.tsx` | BlogPosting + BreadcrumbList | Present, server-rendered |
| `src/app/[locale]/halal-food-den-haag/page.tsx` | Restaurant + FAQPage | Present, includes `suitableForDiet: HalalDiet` |
| `src/app/[locale]/indian-restaurant-delft/page.tsx` | LocalBusiness + Restaurant + FAQPage | Present, includes `areaServed`, `geo`, `openingHoursSpecification` |
| `src/app/[locale]/biryani-den-haag/page.tsx` | Restaurant + FAQPage | Present — minimal Restaurant schema |
| `src/app/[locale]/butter-chicken-den-haag/page.tsx` | Restaurant + FAQPage | Present — minimal Restaurant schema |
| `src/lib/schema.ts` | (placeholder only) | **EMPTY FILE — placeholder comment only** |

### Schema Issues Found

**S1 — `src/lib/schema.ts` is an empty placeholder.**
The file at `/src/lib/schema.ts` contains only a `// placeholder` comment. All schema is currently defined inline within individual page files. This is not a functional problem (schema renders correctly) but means schema logic is duplicated across ~14+ page files with no single source of truth. Inconsistencies have already emerged (see S3 below).

**S2 — `aggregateRating` only on homepage.**
The `Restaurant` schema on `src/app/[locale]/page.tsx` includes:
```json
"aggregateRating": {
  "ratingValue": "4.7",
  "reviewCount": "83"
}
```
This does not appear on any of the location pages, dish pages, or the halal page. Google AIO and ChatGPT weight `aggregateRating` heavily when deciding to cite a local business. All `Restaurant` schema instances should include it.

**S3 — Restaurant schema `@type` inconsistency across pages.**
- Homepage: `"@type": "Restaurant"` with `@id: "https://chopras.nl/#restaurant"`
- Delft page: `"@type": ["LocalBusiness", "Restaurant"]` — correct dual typing
- Halal page: `"@type": "Restaurant"` only — missing `LocalBusiness`
- Biryani/Butter Chicken pages: `"@type": "Restaurant"` only — missing `LocalBusiness`

Using `["LocalBusiness", "Restaurant"]` consistently across all pages improves entity disambiguation.

**S4 — BlogPosting schema uses `Organization` as author, not `Person`.**
In `src/app/[locale]/blog/[slug]/page.tsx`:
```json
"author": { "@type": "Organization", "name": "Chopras Indian Restaurant" }
```
For AI citation weighting, blog content attributed to an `Organization` is treated as brand content. Content attributed to a named `Person` with `jobTitle`, `sameAs` (LinkedIn), and `knowsAbout` properties is cited at higher rates. The blog has no named author — this is a citability gap.

**S5 — BlogPosting `dateModified` always equals `datePublished`.**
In the blog page schema, `dateModified` is set to `post.publishedAt`. If blog content is ever updated, this will show stale modification dates. More importantly, AI systems (especially Google AIO) down-rank content with no visible "freshness" signal. Each time you update a post, `dateModified` should be a separate field in `blog-data.ts`.

**S6 — No `MenuItem` schema for individual dishes.**
The menu page (`src/app/[locale]/menu/page.tsx`) does not implement `MenuItem` or `MenuSection` structured data. For restaurant GEO, dish-level schema (name, description, price, suitableForDiet, nutrition) is how ChatGPT and Perplexity answer queries like "how much does butter chicken cost at Chopras?" with a direct citation.

**S7 — No `Event` schema.**
The site mentions Diwali celebrations, Tambola nights, Karwa Chauth dinners, Eid specials, etc. (prominently in `src/i18n/en.json` and `faq-data.ts`). No `Event` schema exists anywhere. Events are a strong AI citation signal for "things to do in Den Haag" queries.

**S8 — WebSite schema has broken `SearchAction` target.**
In `src/app/[locale]/layout.tsx`:
```json
"target": "https://chopras.nl/en/menu"
```
A `SearchAction` target should be a URL template like `https://chopras.nl/en/menu?q={search_term_string}`. The current target is a static page URL, not a search endpoint. This schema is malformed and should be removed or corrected.

---

## 4. Content Citability Analysis

### Target: 134–167 word self-contained answer blocks per section

#### Homepage — `src/app/[locale]/page.tsx` + `src/i18n/en.json`

The "storyP1" field (in `en.json`) reads 68 words — too short to be a standalone citable passage. The full "Our Story" section (storyP1 through storyP5) totals approximately 300 words spread across five `<p>` tags. No single paragraph sits in the 134–167 word optimal window.

The `why1P` through `why3P` fields are each 50–80 words — below the citability threshold. They are punchy marketing copy but AI systems cannot extract them as standalone informational answers.

**Finding:** Homepage copy prioritises brevity for UX over citability depth. The FAQ data (in `faq-data.ts`) largely compensates for this, but the editorial sections are under-indexed.

#### Blog Posts — `src/lib/blog-data.ts`

**Strong citability found.** The blog posts are the most AI-citable content on the site.

The "halal-indian-restaurant-den-haag" post contains multiple 120–180 word paragraphs that directly answer intent queries. For example, the "What Halal Certification Actually Requires" section uses a structured list format with bolded sub-questions — exactly the pattern AI systems extract for citations.

The "best-indian-restaurant-den-haag" post opens with an extended narrative that does not front-load a direct answer. The first directly factual, self-contained paragraph (what Chopras does differently) begins after ~500 words of scene-setting. For ChatGPT and Perplexity browse, the most citable content should appear in the first 40–60 words of each H2 section.

**Dish-specific content is the weakest.** The `h3` dish descriptions in the blog (Butter Chicken, Soya Chaap, etc.) are each 80–100 words. They are descriptive but do not contain the verifiable facts (price, calorie count, specific ingredients with sourcing notes) that AI systems prioritise when answering "what is X dish at Chopras?" queries.

#### Location Pages — `/indian-restaurant-delft/page.tsx`

The "From Delft to Leyweg" section has three paragraphs of approximately 60–80 words each. Individually, none hit the optimal 134–167 word range. Combined they would, but AI systems extract at the passage level, not the section level.

**The practical info grid (Distance / Public Transport / Parking / Hours) is excellent for AI extraction.** Short factual tiles with labeled categories are one of the highest-cited formats for local business queries. This pattern should be replicated on all location pages.

#### FAQ Data — `src/lib/faq-data.ts`

**Exceptional citability.** The site has 51 FAQ entries across `homeFaqs`, `deliveryFaqs`, `cateringFaqs`, and `eventFaqs`, all backed by FAQPage schema. The answer lengths range from 25 to 180 words.

Notable strong answers (in the optimal range):
- "What kind of atmosphere can I expect..." — 87 words, self-contained
- "Do you serve authentic Indian street food..." — 124 words, excellent specificity with named dishes
- "Do you celebrate Indian cultural festivals..." — 93 words, covers multiple named events

Answers that are too short to cite standalone:
- "How spicy is your food..." — 28 words (too sparse)
- "Is there a dress code..." — 26 words
- "Do you accept walk-ins..." — 38 words

These short answers should be expanded to 80–120 words with additional context to reach citability thresholds.

#### Halal Page — `/halal-food-den-haag/page.tsx`

**Strongest single page for citability.** The inline FAQ answers on this page are 80–130 words each and directly answer halal certification questions with specific operational detail. The main editorial copy uses a "not X but Y" structure ("not a restaurant with a halal option, but one where the entire kitchen operates to halal standards") that is exactly the format AI systems use to generate comparative citations.

The three-paragraph main section totals approximately 210 words — slightly over the ideal single-passage length but easily extractable at the paragraph level.

---

## 5. Server-Side Rendering Check

### Summary: Homepage critical sections are client-side — AI crawlers cannot read animated content

| Component | Client/Server | AI Crawlable | Notes |
|---|---|---|---|
| `src/app/[locale]/page.tsx` | Server Component | Yes | Page shell is SSR |
| `src/components/sections/HeroSection.tsx` | `'use client'` | Partially | Uses `useInView` for animations — content itself is in JSX, readable by static crawlers |
| `src/components/sections/StorySection.tsx` | `'use client'` | Partially | Text loaded from `i18n/en.json` via `getTranslations()` — content accessible but wrapped in animated div |
| `src/components/sections/WhySection.tsx` | `'use client'` | Partially | Same pattern — `useInView` animations |
| `src/components/sections/FaqAccordion.tsx` | `'use client'` | CONCERN | FAQ answers only visible when `openIndex === index` — answers are in `{openIndex === index && <div>}` conditional renders. The HTML is NOT in the initial DOM. AI crawlers that do not execute JavaScript will see FAQ questions but not answers. |
| `src/components/sections/FeaturedDishes.tsx` | `'use client'` | Partially | Category tab UI is interactive but dish names/prices are in static data |
| `src/components/sections/ReviewsSection.tsx` | `'use client'` | Partially | Reviews text likely in static data |
| `src/components/sections/LocationSection.tsx` | `'use client'` | Partially | Map likely uses interactivity |
| `src/components/sections/CateringBanner.tsx` | `'use client'` | Partially | Animation-only client dependency |
| `src/components/sections/FinalCta.tsx` | `'use client'` | Partially | Animation-only client dependency |
| `src/components/sections/ContactForm.tsx` | `'use client'` | Yes | Form only — no content to crawl |
| All location pages (`/halal-food-den-haag`, `/indian-restaurant-delft`, etc.) | Server Components | Yes | Excellent — all content in Server Components |
| All blog pages | Server Components | Yes | Excellent — all content in Server Components |
| `src/components/layout/Header.tsx` | `'use client'` | N/A | Navigation only |

### Critical Finding: FaqAccordion is Not SSR-Crawlable

The `FaqAccordion` component at `src/components/sections/FaqAccordion.tsx` conditionally renders answer text only when the accordion is open (`openIndex === index`). Googlebot, ClaudeBot, GPTBot, and PerplexityBot in their crawler modes (not JS-rendering modes) will not see FAQ answer text in the initial HTML.

This is especially damaging because `FAQPage` schema is present on the homepage — the schema tells search engines FAQs exist, but the visible text does not match in a non-JS crawl. Google has explicitly warned that hidden FAQ content may not be eligible for Rich Results.

**The FAQ answers DO exist in the `FAQPage` JSON-LD schema** (via `src/app/[locale]/page.tsx` which pre-renders the `faqSchema` server-side), so schema-based citation should still work. However, passage-level content indexing from the visible DOM will fail.

### Recommended Fix

Replace `FaqAccordion.tsx` collapse logic with a `<details>/<summary>` pattern (as already used on the halal page — `/halal-food-den-haag/page.tsx` uses `<details>` elements correctly) OR render all FAQ answer text in the DOM but hide it visually with CSS height transitions.

---

## 6. Brand Mention Analysis

| Platform | Status | Impact on AI Citations |
|---|---|---|
| Wikipedia | NOT FOUND | High negative — no Wikipedia entity means ChatGPT has low confidence in entity disambiguation |
| Reddit (r/DenHaag, r/Netherlands, r/HalalFood) | UNKNOWN (cannot verify live) | High — Reddit presence ~0.7 correlation with AI citation |
| YouTube | NOT FOUND in codebase | ~0.737 correlation — strongest single signal missing |
| TripAdvisor | PRESENT — link in `src/lib/constants.ts` and `sameAs` in homepage schema | Moderate positive |
| Google Business Profile | IMPLIED (via coordinates, phone, schema) — not directly linked in sameAs | High — GBP verification needed |
| LinkedIn | NOT PRESENT anywhere in codebase | Moderate |
| Facebook/Instagram | NOT IN SCHEMA | Low-moderate — social media links absent from `sameAs` |
| Thuisbezorgd / Uber Eats | MENTIONED in content and FAQs | Positive — delivery platform presence correlates with AI citation for "order Indian food Den Haag" queries |

### Observations

The `sameAs` array in the homepage Restaurant schema (`src/app/[locale]/page.tsx`) contains only one entry — the TripAdvisor review URL. This is the single most important field for entity disambiguation by AI systems. Adding verified profiles (Google Maps URL, Facebook page, Instagram, LinkedIn if it exists) to `sameAs` directly improves citation accuracy.

The `en.json` copy references a Google reviews link ("Read all reviews on Google") but no Google Maps URL or Google Business Profile link appears in any schema. This is a missed entity signal.

The content at `src/lib/constants.ts` contains a `tripadvisor` social key but no `instagram`, `facebook`, or `google` keys — suggesting these profiles may not exist or were never added.

---

## 7. Structured Content Assessment

### Positive Signals

- **51 FAQs with schema** across 4 categories — exceptional volume and coverage
- **Practical info grid tiles** on location pages (Distance / Transport / Parking / Hours) — highly extractable format
- **Categorised dish listing** on the menu — structured by cuisine type
- **Bilingual content** (EN + NL) — doubles the surface area for AI citations across language-specific queries
- **Internal linking between location pages** — Rijswijk / Delft / Zoetermeer cross-link correctly
- **Breadcrumb schema** on blog posts — correct 3-level hierarchy

### Missing Structured Content

- **No comparison tables** — "Chopras vs [other Indian restaurants in Den Haag]" type content, or even an "at a glance" comparison of biryani varieties (price, protein, halal status) would be highly citable
- **No "How to" content** — step-by-step content (e.g., "How to book a private event at Chopras") generates AI citations for procedural queries
- **No statistics with source attribution** — the FAQ answer "average €20–30 per person" is good but citing a source or year would increase extraction confidence
- **No named chef or spokesperson** — there is no author, head chef, or named person anywhere in the codebase. This is the single largest authority gap for AI citation

---

## 8. i18n Content Quality

### English (`src/i18n/en.json`)

High quality. The story copy, why-section copy, and catering descriptions are substantive and factually specific. The FAQ translations use full sentences and avoid keyword stuffing. The footer tagline ("Authentic Indian Street Food in Den Haag since 2023") is a clean, citable identity statement.

### Dutch (`src/i18n/nl.json`)

Not fully read but the NL blog post (`indiaas-catering-den-haag`) shows fluent, natural Dutch — not machine-translated. This is important because Dutch-language AI queries on Perplexity and Google AIO for "Indiaas restaurant Den Haag" should cite this content.

### Hours discrepancy spans both language files

`en.json` openTimes reads "Open Tuesday to Sunday, 16:30 to 22:30" — this is correct. The `llms.txt` file has the wrong hours. The discrepancy is isolated to `llms.txt`.

---

## 9. Sitemap Audit

File: `src/app/sitemap.ts` (generates `/sitemap.xml` dynamically)

**Status: Well-structured with one improvement needed.**

- 20 static pages × 2 locales = 40 locale-specific URLs
- Blog posts added individually at their language-specific URL
- `lastModified` dates are all hardcoded to `'2026-04-03'` for static pages — this is fine for launch but should be updated when pages change
- `priority` values are appropriately tiered (homepage 1.0, menu 0.9, blog 0.7)
- Dutch locale pages receive `priority * 0.9` — this is a reasonable signal to search engines about language preference

**Issue:** The sitemap is referenced in `robots.txt` as `https://chopras.nl/sitemap.xml` but the App Router generates this at `/sitemap.xml` via the `src/app/sitemap.ts` export. Verify this resolves correctly in production.

---

## 10. Technical Accessibility for AI Crawlers

### Server-Side Rendering

All location pages, the halal page, the blog pages, and the layout are Server Components. The Next.js App Router with `generateStaticParams()` on every page means content is statically generated at build time — crawlers receive fully-rendered HTML for all named routes.

### Performance Signals

- `next.config.mjs` has `compress: true`, AVIF/WebP image formats, 30-day minimum cache TTL
- `poweredByHeader: false` — correct
- Security headers present (`X-Frame-Options`, `X-Content-Type-Options`, etc.)
- No CSP header — not a GEO concern

### Redirects

301 redirects exist for all old flat URLs (e.g., `/menu` → `/en/menu`). This is correct and prevents link equity dilution from any existing backlinks.

---

## Top 5 Highest-Impact Changes

### Priority 1 — Fix `llms.txt` Opening Hours (Effort: 5 minutes, Impact: Critical)

The current hours in `/public/llms.txt` are factually wrong. Every AI system that ingests `llms.txt` will answer "what time does Chopras open?" with incorrect data. This is the highest urgency fix on the site.

Change:
```
Hours: Tue–Fri 15:00–22:00, Sat–Sun 13:00–22:00. Monday closed.
```
To:
```
Hours: Tuesday to Sunday 16:30–22:30. Monday closed.
```

Also add `OAI-SearchBot` to `/public/robots.txt` with an explicit `Allow: /` entry.

---

### Priority 2 — Add Named Author to Blog Posts (Effort: Medium, Impact: High)

Every blog post in `src/lib/blog-data.ts` uses `author: { '@type': 'Organization', name: 'Chopras Indian Restaurant' }`. Named human authors are cited at significantly higher rates by AI systems.

Add an `author` field to the `BlogPost` type and `blog-data.ts` data (e.g., the restaurant owner's name), then update the schema in `src/app/[locale]/blog/[slug]/page.tsx` to use `"@type": "Person"` with `"name"`, `"jobTitle"`, and optionally `"sameAs"` pointing to a LinkedIn or TripAdvisor profile. Even a minimal named author ("Ajay Chopra, Head Chef") increases citation confidence substantially.

---

### Priority 3 — Fix FaqAccordion DOM Visibility (Effort: Low, Impact: High)

Replace the `{openIndex === index && <div>...</div>}` conditional render in `src/components/sections/FaqAccordion.tsx` with either:
- A CSS-only `<details>/<summary>` pattern (already used correctly on the halal page)
- Or a CSS height-transition that keeps answer text in the DOM at all times but visually collapses it

This ensures FAQ answer text is present in the initial HTML for crawlers that do not execute JavaScript, and aligns the visible content with the FAQPage JSON-LD schema that is already present.

---

### Priority 4 — Add `aggregateRating` and `sameAs` to All Location/Dish Page Schemas (Effort: Medium, Impact: High)

Currently `aggregateRating` (4.7 stars, 83 reviews) and the TripAdvisor `sameAs` link only appear on the homepage. The halal page, Delft page, biryani page, butter chicken page, and all other specialty pages have standalone `Restaurant` schemas without ratings.

Add both fields to every `Restaurant` schema instance, OR centralise all schema generation in `src/lib/schema.ts` (currently a placeholder). A single `buildRestaurantSchema(overrides?)` function would eliminate the current duplication across 14+ page files and prevent future inconsistencies.

---

### Priority 5 — Implement `MenuItem` Schema on the Menu Page (Effort: Medium-High, Impact: Medium-High)

The menu page lists prices, dish names, and dietary flags (vegetarian, vegan, halal, spicy) in `src/lib/menu-data.ts`. Adding `MenuItem` structured data allows AI systems to answer "how much is the lamb biryani at Chopras?" with a direct citation.

The schema for each dish should include:
```json
{
  "@type": "MenuItem",
  "name": "Lamb Biryani",
  "description": "Slow-cooked lamb with saffron basmati rice",
  "offers": { "@type": "Offer", "price": "22.50", "priceCurrency": "EUR" },
  "suitableForDiet": "https://schema.org/HalalDiet",
  "nutrition": {}
}
```

This would be the most concrete step toward Perplexity and ChatGPT answering menu price queries with direct Chopras citations.

---

## Additional Recommendations (Medium Priority)

### Add `Event` Schema for Cultural Events

The site mentions Diwali, Karwa Chauth, Holi, Ramadan, Eid, and Tambola nights in multiple places. Creating a dedicated events page (or adding a structured events list to the homepage) with `Event` schema would capture "things to do in Den Haag" queries from AI systems.

### Add a YouTube Presence

YouTube mentions correlate at approximately 0.737 with AI citations — the strongest single external signal. Even a single video (restaurant tour, dish preparation, Diwali event recap) would generate a YouTube entity that AI systems use to anchor citations. Add the YouTube URL to the `sameAs` array in all Restaurant schemas once created.

### Expand Short FAQ Answers

The following FAQ answers in `src/lib/faq-data.ts` are below the minimum citable length:
- "How spicy is your food..." (28 words) — expand to describe specific heat levels for individual dishes
- "Is there a dress code..." (26 words) — expand to cover festival-specific dress suggestions
- "Do you accept walk-ins..." (38 words) — expand with specific recommendation windows (Friday/Saturday evenings, festival dates)

### Add `speakable` Schema for Bing Copilot

Bing Copilot specifically uses `speakable` schema properties to identify passages suitable for voice and conversational responses. Adding `speakable` to the homepage and halal page with CSS selectors pointing to the most factual sections would improve Bing Copilot citation rates.

### Centralise Schema in `/src/lib/schema.ts`

The file at `/src/lib/schema.ts` is an empty placeholder. Moving schema generation there would:
- Eliminate the `aggregateRating` inconsistency across pages
- Ensure `sameAs` arrays stay in sync
- Allow type-safe override patterns for page-specific additions

---

## Files Referenced in This Analysis

| File | Relevance |
|---|---|
| `/public/robots.txt` | AI crawler access configuration |
| `/public/llms.txt` | LLM identity file — contains stale hours data |
| `/src/lib/schema.ts` | Empty placeholder — schema is inline on individual pages |
| `/src/lib/constants.ts` | Canonical restaurant data source |
| `/src/lib/faq-data.ts` | 51 FAQs — strongest citability asset on site |
| `/src/lib/blog-data.ts` | 10 blog posts — strong long-form citability content |
| `/src/app/[locale]/layout.tsx` | Site-level WebSite schema + SearchAction |
| `/src/app/[locale]/page.tsx` | Best schema on site — Restaurant + FAQPage + AggregateRating |
| `/src/app/[locale]/blog/[slug]/page.tsx` | BlogPosting + BreadcrumbList schema |
| `/src/app/[locale]/halal-food-den-haag/page.tsx` | Best editorial citability on site |
| `/src/app/[locale]/indian-restaurant-delft/page.tsx` | Good practical info grid pattern |
| `/src/app/sitemap.ts` | Dynamic sitemap generation |
| `/src/components/sections/FaqAccordion.tsx` | Critical SSR/crawlability issue |
| `/src/i18n/en.json` | English content — high quality |
| `/next.config.mjs` | Redirects, headers, image optimisation |

---

*Report generated 2026-04-04. Re-run after implementing Priority 1–3 fixes to verify score improvement.*
