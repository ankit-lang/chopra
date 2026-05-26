# CLAUDE.md - Chopras Indian Restaurant Website

## ABSOLUTE WRITING RULES - NEVER VIOLATE

1. NEVER use em dashes (the — character) anywhere in any file.
   Replace with: hyphen-space-hyphen ( - ) or rewrite the sentence.
   This applies to: TSX files, JSON files, MD files, TXT files,
   component copy, translation strings, blog content, everywhere.

2. NEVER use contractions (don't, can't, won't, it's, we've, they're).
   Always write in full: do not, cannot, will not, it is, we have,
   they are.

3. These rules apply to ALL content generated for this project
   without exception.

## Project
Next.js 14 App Router website for Chopras Indian Restaurant, Den Haag.
Package manager: pnpm. Node: 20.x.

## Key Commands
- Dev server: pnpm dev
- Production build: pnpm build
- Type check: pnpm tsc --noEmit
- Lint: pnpm lint

## Architecture Rules
- App Router only — no Pages Router patterns ever
- All data lives in /src/lib/*.ts files — never hardcode content in components
- Use Next.js Image component for every image — never raw img tags
- Server Components by default — add "use client" only when hooks or interactivity is needed
- TypeScript strict mode is ON — fix all type errors, never use any

## Brand Colors
- Primary: #1B2B5E (deep navy blue)
- Accent: #D4AF37 (saffron gold)
- Background: #F7F8FC (cool off-white, premium)
- Text: #1A1A1A
- Secondary: #0F1F4B (darker navy, used for dark sections)

## Fonts
- Headings: Cormorant Garamond
- Body: DM Sans

## Content Rules
- All menu data lives in /src/lib/menu-data.ts only
- All blog content lives in /src/lib/blog-data.ts only
- All schema markup generated through /src/lib/schema.ts
- Images always have descriptive alt text — never empty alt

## Hard Rules
- Never use raw img tag — always Next.js Image
- Never use inline styles — always Tailwind classes
- Never hardcode restaurant data — always import from constants.ts
- Never commit .env.local

## URL STRUCTURE — CRITICAL
- English pages live at ROOT: chopras.nl/butter-chicken-den-haag (NO /en/ prefix)
- Dutch pages live at /nl/: chopras.nl/nl/butter-chicken-den-haag
- The /en/ prefix does NOT exist and must never be used in links
- Internal link base pattern:
    const base = locale === 'nl' ? '/nl' : ''
  NEVER use: const base = `/${locale}` — this generates broken /en/ links
- getLocalizedUrl() already handles this correctly for canonical/hreflang

## TRANSLATION ARCHITECTURE
- JSON keys (en.json / nl.json) are used for plain text headings and subtext
- Copy sections that contain embedded <Link> JSX components must use the
  isNl conditional pattern directly in TSX — JSON cannot hold JSX
- Pattern for bilingual sections with links:
    {isNl ? (
      <p>Dutch text with <Link href={`${base}/slug`}>Dutch anchor</Link></p>
    ) : (
      <p>English text with <Link href={`${base}/slug`}>English anchor</Link></p>
    )}
- Blog content and blog meta descriptions live in src/lib/blog-data.ts only
  — never in the blog page.tsx file

## SCHEMA RULES
- datePublished and dateModified: ONLY on Article / BlogPosting schema types
- NEVER add date fields to: FAQPage, Service, LocalBusiness, Organization,
  Menu, or any non-blog schema — static dates confuse Google and generate
  unwanted "X days ago" timestamps in search results
- getFaqPageSchema() must never include date parameters

## RESTAURANT FACTS — NEVER GET THESE WRONG
- Opening hours: Tuesday to Sunday, 16:30 to 22:30
- Closed: Monday — every Monday, no exceptions
- NO LUNCH SERVICE — Chopras opens at 16:30 only
  Never write: "lunch", "open for lunch", "working lunches", "lunchtime",
  "11:30", "12:00", "13:00", or any implication of daytime food service
- Capacity: 25 to 80 guests (private hall) — never claim above 80
- Review proof point: use "800+" not specific counts like "834"
  (specific counts go stale — "800+" stays accurate)
- Address: Leyweg 986, 2545 GW Den Haag
- Phone: +31 6 30645930
- Email: info@chopras.nl
- Founded: 2023 by Arun Chopra
- Arun Chopra is the FOUNDER only - never "Head Chef", never "Founder and Head Chef"
- Serves: Den Haag, Rijswijk, Delft, Zoetermeer, Voorburg, Leidschendam, Westland
- NO FREE PARKING — paid parking is available in the surrounding area. Never write "free parking", "gratis parkeren", or imply parking is free or on-site. Use "paid parking available nearby" or replace with tram access (tram line 2, Leyweg stop).
- NO ALCOHOL — Chopras does not serve alcohol and does not permit it on the premises. Never write or imply alcohol is available.

## META DESCRIPTION RULES — MANDATORY FOR ALL PAGES

1. Primary keyword must appear within the first 60 characters
2. Length must be between 140 and 155 characters exactly
3. Must include "Chopras Indian Restaurant" — full brand name, never "Chopras" alone
4. Must include "Den Haag" or "The Hague" or "Leyweg 986"
5. Must end with a call to action
6. No contractions, no em dashes — per existing writing rules
7. Dutch pages must have meta description in Dutch with Dutch primary keyword
8. Every page must have a unique meta description — no duplicates
9. Rewrite any meta description where Google Search Console CTR is under 2%

## APPROVED META DESCRIPTIONS — ALL 46 PAGES

Homepage /
Primary keyword: Best Indian restaurant Den Haag
Title: Best Indian Restaurant Den Haag (The Hague) | Chopras Indian Restaurant
Meta: Best Indian restaurant Den Haag and The Hague. Chopras Indian Restaurant. 4.9 stars, 800+ reviews. Halal certified, vegetarian options. Book a table.

Menu /menu
Primary keyword: Indian restaurant menu Den Haag
Meta: Indian restaurant menu Den Haag at Chopras Indian Restaurant. 143 dishes including curries, tandoori and biryani. Halal certified. Order online.

Catering /catering
Primary keyword: Indian catering Den Haag
Meta: Indian catering Den Haag by Chopras Indian Restaurant. Weddings, birthdays and corporate events. Halal certified and fresh. Request a free quote.

Contact /contact
Primary keyword: Chopras Indian Restaurant Den Haag contact
Meta: Contact Chopras Indian Restaurant Den Haag. Leyweg 986, open Tuesday to Sunday. Reserve a table, call us or send a message. Tram line 2 stops at the door.

Vacancy /vacancy
Primary keyword: Vacature Indiaas restaurant Den Haag
Meta: Vacature Indiaas restaurant Den Haag. Join Chopras Indian Restaurant as a chef, front-of-house or catering assistant. Apply today at Leyweg 986.

Feestzaal /feestzaal-den-haag
Primary keyword: Feestzaal huren Den Haag
Meta: Feestzaal huren Den Haag bij Chopras Indian Restaurant. Verjaardagen, bruiloften en bedrijfsfeesten. Indiaas catering inbegrepen. Offerte aanvragen.

Biryani /biryani-den-haag
Primary keyword: Biryani Den Haag
Meta: Authentic biryani Den Haag at Chopras Indian Restaurant. Chicken, lamb and veg biryani with saffron basmati rice. Halal certified. Order online today.

Butter Chicken /butter-chicken-den-haag
Primary keyword: Butter chicken Den Haag
Meta: Best butter chicken Den Haag at Chopras Indian Restaurant. Halal chicken in rich tomato and cream sauce. Made fresh daily at Leyweg 986. Order online.

Tandoori /tandoori-den-haag
Primary keyword: Tandoori Den Haag
Meta: Authentic tandoori Den Haag at Chopras Indian Restaurant. Chicken tikka and seekh kebab from our clay oven. Halal certified. Order online or dine in.

Dal Makhani /dal-makhani-den-haag
Primary keyword: Dal makhani Den Haag
Meta: Authentic dal makhani Den Haag at Chopras Indian Restaurant. Black lentils slow cooked with butter and cream. Served fresh daily at Leyweg 986.

Mutton Rogan Josh /mutton-rogan-josh-den-haag
Primary keyword: Mutton rogan josh Den Haag
Meta: Authentic mutton rogan josh Den Haag at Chopras Indian Restaurant. Halal lamb in a deep Kashmiri spice gravy. A signature North Indian dish at Leyweg 986.

Naan /naan-den-haag
Primary keyword: Naan Den Haag
Meta: Fresh naan Den Haag at Chopras Indian Restaurant. Garlic, butter and Peshwari naan baked hot in our tandoor clay oven. Best Indian bread in The Hague.

Chaat /chaat-den-haag
Primary keyword: Chaat Den Haag
Meta: Authentic chaat Den Haag at Chopras Indian Restaurant. Papdi chaat, dahi puri and aloo tikki fresh daily at Leyweg 986. Best street food in The Hague.

Pani Puri /pani-puri-den-haag
Primary keyword: Pani puri Den Haag
Meta: Authentic pani puri Den Haag at Chopras Indian Restaurant. Crispy shells with spiced potato and tamarind water. Real Indian street food at Leyweg 986.

Soya Chaap /soya-chaap-den-haag
Primary keyword: Soya chaap Den Haag
Meta: Authentic soya chaap Den Haag at Chopras Indian Restaurant. Vegan plant-based mock meat grilled in the tandoor. The best vegan Indian food in The Hague.

Indian Buffet /indian-buffet-den-haag
Primary keyword: Indian buffet Den Haag
Meta: Indian buffet Den Haag at Chopras Indian Restaurant. Authentic curries, tandoori and biryani for groups. Halal certified at Leyweg 986. Get a quote.

Indo Chinese /indo-chinese-restaurant-den-haag
Primary keyword: Indo Chinese restaurant Den Haag
Meta: Indo Chinese food Den Haag at Chopras Indian Restaurant. Chilli chicken, chilli paneer and Hakka noodles. The only Indo Chinese restaurant in The Hague.

Halal Menu /halal-menu
Primary keyword: Halal menu Den Haag
Meta: Halal menu Den Haag at Chopras Indian Restaurant. All meat halal certified. No alcohol on premises. 4.9 stars. Dine with confidence at Leyweg 986.

Vegan Menu /vegan-menu
Primary keyword: Vegan Indian food Den Haag
Title: Vegan Indian Food Den Haag | Chopras Indian Restaurant
Meta: Vegan Indian food Den Haag at Chopras Indian Restaurant. 40+ plant-based dishes including soya chaap and dal makhani. 4.9 stars. Order online today.

Halal Food /halal-food-den-haag
Primary keyword: Halal Indian restaurant Den Haag
Title: Halal Indian Restaurant Den Haag | Chopras Indian Restaurant
Meta: Halal Indian restaurant Den Haag at Chopras Indian Restaurant. Only fully halal certified. No alcohol. 4.9 stars. Open Tuesday to Sunday. Book now.

Halal Indian Restaurant Netherlands /halal-indian-restaurant-netherlands
Primary keyword: Halal Indian restaurant Netherlands
Meta: Halal Indian restaurant Netherlands. Chopras Indian Restaurant Den Haag is fully halal certified. 143 dishes, 4.9 stars. Open Tuesday to Sunday. Visit us.

Wedding Catering /indian-wedding-catering-den-haag
Primary keyword: Indian wedding catering Den Haag
Meta: Indian wedding catering Den Haag by Chopras Indian Restaurant. Nikah, walima and reception catering. Fully halal certified. Request a free quote today.

Birthday Catering /indian-birthday-catering-den-haag
Primary keyword: Indian birthday catering Den Haag
Meta: Indian birthday catering Den Haag by Chopras Indian Restaurant. Authentic food delivered hot to your party. Halal certified. Book your catering today.

Corporate Events /corporate-events-den-haag
Primary keyword: Corporate events Den Haag
Meta: Corporate events Den Haag. Chopras Indian Restaurant provides Indian catering for team dinners and receptions. Halal certified. Up to 80 guests. Book now.

Diwali Dinner /diwali-dinner-den-haag
Primary keyword: Diwali dinner Den Haag
Meta: Diwali dinner Den Haag at Chopras Indian Restaurant. Dine in or book catering for your Diwali celebration. Biryani, tandoori and dal. Book now.

Bruiloft Catering /bruiloft-catering-den-haag
Primary keyword: Bruiloft catering Den Haag
Meta: Bruiloft catering Den Haag bij Chopras Indian Restaurant. Authentiek Indiaas eten voor uw trouwdag. Volledig halal. Vraag een vrijblijvende offerte aan.

Zaal Huren /zaal-huren-den-haag
Primary keyword: Zaal huren Den Haag
Meta: Zaal huren Den Haag bij Chopras Indian Restaurant. Feesten en vergaderingen met Indiaas catering inbegrepen. Flexibel en betaalbaar. Offerte aanvragen.

Evenementenruimte /evenementenruimte-den-haag
Primary keyword: Evenementenruimte Den Haag
Meta: Evenementenruimte Den Haag bij Chopras Indian Restaurant. Bedrijfsfeesten en vergaderingen. Indiaas catering beschikbaar. Offerte aanvragen vandaag.

Food Delivery /indian-food-delivery-den-haag
Primary keyword: Indian food delivery Den Haag
Meta: Indian food delivery Den Haag from Chopras Indian Restaurant. Fresh curries and biryani delivered hot to your door. Halal certified. Order online.

Indian Takeaway /indian-takeaway-den-haag
Primary keyword: Indian takeaway Den Haag
Meta: Indian takeaway Den Haag from Chopras Indian Restaurant. Order curries, biryani and naan for collection at Leyweg 986. Fresh and ready for pickup today.

Near Delft /indian-restaurant-delft
Primary keyword: Indian restaurant Delft
Meta: Indian restaurant near Delft. Chopras Indian Restaurant Den Haag is 15 minutes via the A13. Authentic halal food at Leyweg 986. Open Tuesday to Sunday.

Near Rijswijk /indian-restaurant-rijswijk
Primary keyword: Indian restaurant Rijswijk
Meta: Indian restaurant near Rijswijk. Chopras Indian Restaurant Den Haag is 5 minutes away. Authentic halal food and vegetarian options. Book now.

Near Zoetermeer /indian-restaurant-zoetermeer
Primary keyword: Indian restaurant Zoetermeer
Meta: Indian restaurant near Zoetermeer. Chopras Indian Restaurant is 20 minutes via the A12. Authentic halal food at Leyweg 986. Open Tuesday to Sunday.

Near Peace Palace /indian-restaurant-near-peace-palace-den-haag
Primary keyword: Indian restaurant near Peace Palace Den Haag
Meta: Indian restaurant near Peace Palace Den Haag. Chopras Indian Restaurant is 10 minutes away at Leyweg 986. Authentic halal food. Book a table now.

Near Den Haag Centraal /indian-restaurant-near-den-haag-centraal
Primary keyword: Indian restaurant near Den Haag Centraal
Meta: Indian restaurant near Den Haag Centraal. Chopras Indian Restaurant is 15 minutes by tram. Halal food at Leyweg 986. Open Tuesday to Sunday.

Beste Indiaas Restaurant /beste-indiaas-restaurant-den-haag
Primary keyword: Beste Indiaas restaurant Den Haag
Meta: Beste Indiaas restaurant Den Haag bij Chopras Indian Restaurant. Authentieke Noord-Indiaase keuken, volledig halal. Beoordeeld 4.9 sterren. Bezoek ons.

Family Restaurant /family-restaurant-den-haag
Primary keyword: Family restaurant Den Haag
Meta: Family restaurant Den Haag. Chopras Indian Restaurant has a dedicated kids menu and generous portions. Authentic Indian food for all ages at Leyweg 986.

Indian Food Netherlands /indian-food-netherlands
Primary keyword: Authentic Indian food Netherlands
Meta: Authentic Indian food Netherlands at Chopras Indian Restaurant Den Haag. 143 dishes, 4.9 stars, fully halal certified. Open Tuesday to Sunday. Visit.

Blog: Best Indian Restaurant /blog/best-indian-restaurant-den-haag
Primary keyword: Best Indian restaurant Den Haag
Meta: Best Indian restaurant Den Haag. Discover what makes Chopras Indian Restaurant stand out. Authentic food, halal certified and rated 4.9 stars on Google. Read more.

Blog: Halal Indian Restaurant /blog/halal-indian-restaurant-den-haag
Primary keyword: Halal Indian restaurant Den Haag
Meta: Halal Indian restaurant Den Haag. Chopras Indian Restaurant is fully halal certified. Biryani, tandoori and curries. Full halal menu available at Leyweg 986.

Blog: Indiaas Catering /blog/indiaas-catering-den-haag
Primary keyword: Indiaas catering Den Haag
Meta: Indiaas catering Den Haag van Chopras Indian Restaurant. Voor verjaardagen, bruiloften en bedrijfsfeesten. Authentiek, halal en vers bereid. Offerte aanvragen.

Blog: Vegetarian Indian Food /blog/vegetarian-indian-food-den-haag
Primary keyword: Vegetarian Indian food Den Haag
Meta: Vegetarian Indian food Den Haag at Chopras Indian Restaurant. Dal makhani, soya chaap and paneer. A complete vegetarian and vegan Indian menu at Leyweg 986.

Blog: Indian Street Food /blog/indian-street-food-den-haag
Primary keyword: Indian street food Den Haag
Meta: Indian street food Den Haag at Chopras Indian Restaurant. Pani puri, chaat and samosa from India. Authentic snacks at Leyweg 986. Open Tuesday to Sunday.

Near Leidschendam /indian-restaurant-leidschendam
Primary keyword: Indian restaurant Leidschendam
Meta: Indian restaurant near Leidschendam. Chopras Indian Restaurant Den Haag is 10 minutes away. Authentic halal food at Leyweg 986. Open Tuesday to Sunday.

Near Voorburg /indian-restaurant-voorburg
Primary keyword: Indian restaurant Voorburg
Meta: Indian restaurant near Voorburg. Chopras Indian Restaurant Den Haag is 5 minutes away. Authentic halal food and 143 dishes at Leyweg 986. Book now.

Near Westland /indian-restaurant-westland
Primary keyword: Indian restaurant Westland
Meta: Indian restaurant near Westland. Chopras Indian Restaurant Den Haag is 20 minutes away. Authentic halal food at Leyweg 986. Open Tuesday to Sunday.

## HITESH — WORKING PREFERENCES (READ THIS EVERY SESSION)

- NEVER say "your call" on SEO or technical decisions — always give the definitive answer
- If Hitesh is going in the wrong direction, say so immediately and directly
- If something matters for SEO, say it matters and explain why — no hedging
- Assume Hitesh does not know the technical answer — guide him to the best outcome
- Double-check every fact, every claim, every recommendation before stating it
- Call out codebase errors even when not asked
- Goal: Hitesh wants to be the best in the world at SEO and local SEO - every decision must serve that goal
- After every task or suggestion, ALWAYS provide a ready-to-paste Claude Code prompt that Hitesh can run directly in his terminal. Format it clearly under a "CLAUDE CODE PROMPT" heading. Include any context Claude Code will need since it has no memory of this conversation.

## BRAND STYLING STANDARDS - MANDATORY ON ALL PAGES

### Headings - always use these exact classes
- H2 (light/white bg): font-vibes text-4xl md:text-5xl text-[#C7A348] mb-6 leading-[1.3]
- H2 (navy bg):        font-vibes text-4xl md:text-5xl text-white mb-6 leading-[1.3]
- H3 (light/white bg): font-vibes text-3xl md:text-4xl text-[#C7A348] mb-4 leading-[1.3]
- H3 (navy bg):        font-vibes text-3xl md:text-4xl text-white mb-4 leading-[1.3]
- H4 (light/white bg): font-vibes text-2xl md:text-3xl text-[#C7A348] mb-3 leading-[1.3]
- H4 (navy bg):        font-vibes text-2xl md:text-3xl text-white mb-3 leading-[1.3]
- NEVER use font-heading or font-bold alone for H2/H3/H4
- NEVER use text-[#1B2B5E] on any heading on a light/white background

### Body Text
- Light bg paragraphs: font-body text-[#1A1A1A]/70 text-lg leading-relaxed
- Navy bg paragraphs:  font-body text-white/85 text-lg leading-relaxed

### Section Wrappers
- Standard: py-20 px-6 md:px-16
- Inner container: max-w-4xl mx-auto

### Section Backgrounds - alternate in this order
- bg-white
- bg-[#FFFAF5]
- Dark accent: bg-[#1B2B5E] (navy) with white text

### FAQ - mandatory pattern
- Always use <FaqAccordion faqs={array} locale={locale} />
- NEVER use raw <details> elements
- FAQ arrays defined as module-level constants before the component function
- Arrays use { question: string, answer: string } shape

### Inline Links - mandatory in all prose copy
- Every paragraph of 3 or more sentences must contain at least one inline Link component
- Links must use keyword-rich anchor text - never "click here" or "read more"
- Link class: className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold"
- Minimum 8 inline links per page across all prose sections combined
- GEO block paragraph must also contain at least 2 inline Link components
- Target pages come from sitemap.md

### GEO Block - mandatory on every page
- One visible section with a question-format H2
- Self-contained 60-100 word answer paragraph
- Must contain: restaurant name, address (Leyweg 986), primary service, one verifiable fact, opening hours
- Must be bilingual using isNl conditional
- Must contain at least 2 inline Link components
- Never use sr-only - must be visible to human visitors

## FORBIDDEN AI PHRASES — NEVER USE IN ANY CONTENT
These phrases flag content as machine-generated to both human readers and Google's HCU:
- "Delve into" / "dive into" — never
- "It is worth noting" — never
- "In conclusion" / "To summarize" — never
- "Furthermore" / "Moreover" / "Additionally" — never
- "It goes without saying" — never
- "At the end of the day" — never
- "Game-changing" / "Revolutionary" / "Cutting-edge" — never
- "Leverage" (as a verb) — never
- "Robust" / "Seamless" / "Scalable" — never
- "In today's fast-paced world" — never
- "Committed to quality" / "Exceptional service" — never
- "Culinary journey" / "Culinary experience" — never (restaurant-specific)
- "We are passionate about" — never
- "A true gem" / "Hidden gem" — never
- Opening a paragraph with "This" as the first word — never
- Three adjectives in a row before a noun — never
- Symmetrical bullet points all the same length — never

## FAQ RULES — MANDATORY COUNT
- Minimum 4 FAQ questions per page, maximum 6 per page
- Exception: homepage may go up to 8 because of its breadth of topics
- Questions must be phrased exactly as users type them into Google or ChatGPT
- Each answer must be self-contained — readable without the question above it
- Always use <FaqAccordion faqs={array} locale={locale} /> — never raw <details>
- Provide full Dutch translations for every FAQ question and answer on bilingual pages
- Do NOT add datePublished or dateModified to FAQPage schema ever

## SITEMAP AND LLMS.TXT - MANDATORY AFTER EVERY PAGE CHANGE

These two files are SEO-critical infrastructure. They MUST be kept in sync with the live site at all times. Never leave them stale.

### src/app/sitemap.ts
- NEW PAGE created: add the slug to the staticPages array with today's date as lastMod
- PAGE significantly rewritten (new sections, new FAQ, new copy): update that page's lastMod date to today
- No other changes to sitemap.ts are needed for minor copy tweaks or bug fixes
- Use YYYY-MM-DD format for lastMod (e.g. '2026-04-21')

### public/llms.txt
- NEW PAGE created: add both the English URL and the Dutch /nl/ URL to the relevant section in the Important Pages block
- PAGE title or primary keyword changed: update the corresponding entry
- No URL change needed for content-only rewrites
- Dutch /nl/ URLs must always appear alongside their English counterparts

### Commit rule
- Both sitemap.ts and llms.txt must be committed in the SAME commit as the page change
- Never push a new page without also pushing updated sitemap.ts and llms.txt
- If you forget, the fix commit message must be: "fix: update sitemap and llms.txt for [page-slug]"

## BUILD CHECK - MANDATORY BEFORE EVERY COMMIT
- ALWAYS run: pnpm build (not just pnpm tsc --noEmit)
- pnpm tsc --noEmit misses ESLint errors and runtime issues that break Vercel
- Zero build errors required before any commit
- Fix all ESLint and TypeScript errors before committing and pushing

