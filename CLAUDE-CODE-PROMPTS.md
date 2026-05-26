# Chopras Indian Restaurant — Claude Code Prompts
# All 43 pages. Copy the full prompt block. Paste directly into Claude Code. Done.
# No preparation needed. Everything is pre-filled.

---

## HOW TO USE

1. Find the page you want to write below
2. Copy the entire prompt block (everything between the triple backticks)
3. Paste it directly into Claude Code
4. Claude Code will read the project files, activate the seo-copywriting skill, write the copy, and update the page.tsx file

**Recommended: max 2 pages per Claude Code session. Start a fresh session for each Tier 1 page.**

---

## MASTER RULES — APPLY TO EVERY SINGLE PROMPT WITHOUT EXCEPTION

These rules override everything else. Claude Code must follow all of them on every page.

**INLINE LINKS — MANDATORY IN ALL PROSE:**
Every paragraph of 3 or more sentences must contain at least one inline Link component.
Links must use keyword-rich anchor text — never "click here", never "read more".
Use: className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold"
Target pages come from sitemap.md. The GEO block paragraph must also contain inline links.
Minimum 8 inline links per page across all prose sections combined.

**BRAND STYLING — MANDATORY ON ALL SECTIONS:**
- H2 (light/white bg): font-vibes text-4xl md:text-5xl text-[#C7A348] mb-6 leading-[1.3]
- H2 (navy/dark bg): font-vibes text-4xl md:text-5xl text-white mb-6 leading-[1.3]
- H3 (light/white bg): font-vibes text-3xl md:text-4xl text-[#C7A348] mb-4 leading-[1.3]
- H3 (navy/dark bg): font-vibes text-3xl md:text-4xl text-white mb-4 leading-[1.3]
- H1 ONLY: font-heading (Cormorant Garamond) — NEVER use font-heading for H2/H3/H4
- Body: font-body text-[#1A1A1A]/70 text-lg leading-relaxed (light bg)
- Body: font-body text-white/85 text-lg leading-relaxed (navy bg)
- Section padding: py-20 px-6 md:px-16
- NEVER use font-bold alone for headings
- NEVER use text-[#1B2B5E] on any heading on a light/white background
- NEVER use gold (#C7A348) for H2/H3 on dark/navy backgrounds — use text-white

**FAQ — MANDATORY ON EVERY PAGE:**
Every page must have a FAQ section with 4-5 bilingual Q&A pairs.
Always use: <FaqAccordion faqs={isNl ? faqsNl : faqsEn} locale={locale} />
NEVER use raw <details> elements.
Define faqsEn and faqsNl as module-level constants before the component.
Wire getFaqPageSchema(isNl ? faqsNl : faqsEn) to a JsonLd block — NO date parameters.

**GEO BLOCK — MANDATORY ON EVERY PAGE:**
One visible section with a question-format H2 and a 60-100 word self-contained answer.
Must contain: restaurant name, address (Leyweg 986), primary service, verifiable fact, opening hours.
Must be bilingual using isNl conditional.
Must contain at least 2 inline Link components.

**FACTS — NEVER GET THESE WRONG:**
- Hours: Tuesday to Sunday, 16:30 to 22:30. Closed Monday.
- NO LUNCH SERVICE. Never write lunch, 11:30, 12:00, or any daytime food reference.
- Capacity: 25 to 80 guests. Never claim above 80.
- Reviews: "800+" not specific counts like "834".
- Delivery: Thuisbezorgd and Uber Eats (both, not just one).
- No alcohol served or permitted. Chopras is fully halal.

**BUILD CHECK — MANDATORY BEFORE EVERY COMMIT:**
Run pnpm build (not just pnpm tsc --noEmit).
Zero errors required. Fix all ESLint and build errors before committing.
Then: git add, git commit, git push origin main.

---

## PRIORITY ORDER

**Tier 1 — Start here (highest traffic impact):**
Prompts 01, 02, 03, 05, 06, 07, 16, 17

**Tier 2 — Dish pages (fastest ranking wins):**
Prompts 08, 09, 10, 11, 12, 13, 14, 15

**Tier 3 — Catering and events:**
Prompts 04, 18, 19, 20, 21, 22, 23, 24, 25

**Tier 4 — Location, delivery, blogs, specialty, utility:**
Prompts 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43

---

## PROMPT 01 — HOMEPAGE

```
Read CLAUDE.md, SEO-BRIEF.md, and sitemap.md from the project root.
Then read .claude/DESIGN-SYSTEM.md.
Then use the seo-copywriting skill.

Write long-form SEO copy for the Homepage and update the file at:
src/app/[locale]/page.tsx

Follow the existing bilingual EN/NL pattern already in the file.
Never use em dashes. Never use contractions. Match the brand voice in SEO-BRIEF.md.
Include a GEO block: one self-contained 60-100 word paragraph that answers
"What is the best Indian restaurant in Den Haag?" without needing surrounding context.
Update the meta description to exactly match the approved one in CLAUDE.md.

BRIEFING BLOCK:
Content Type: Homepage
Content Format: Long form SEO homepage
Client: Chopras Indian Restaurant Den Haag
Funnel Stage: TOFU + BOFU
Awareness Level: Problem-Aware to Solution-Aware
Traffic Source: Organic
Search Intent: Commercial + Navigational
Content Angle: Den Haag has plenty of Indian restaurants. Only one grinds spices fresh every morning, runs a 400-degree clay oven, and holds 4.9 stars from 800+ verified reviews.
Primary Keyword: Best Indian restaurant Den Haag
Secondary Keywords: authentic Indian restaurant Den Haag, beste Indiaas restaurant Den Haag, Indian restaurant The Hague, halal Indian restaurant Den Haag, top Indian restaurant Den Haag
LSI / Related Terms: North Indian food, butter chicken, biryani, tandoori, chaat, Leyweg, feestzaal, catering, 800+ reviews, 4.9 stars, clay oven, fresh spices
Internal Links: use sitemap.md
Audience: Den Haag residents, South Asian community, Dutch families, corporate guests, tourists
Customer Language: "proper Indian food", "real spices", "halal confirmed", "good for groups", "best curry Den Haag"
Already Tried: Indian restaurants that water down spices, questionable halal claims, inconsistent quality
Language: English
Tone Notes: Confident authority. Not boastful, just certain. Use Chopras brand voice from SEO-BRIEF.md throughout.
Schema Type: LocalBusiness + FAQPage + Organization
Word Count: 1200 to 1800
CTA Goal: Reserve a table or view menu
Available Proof: 4.9 stars Google, 800+ reviews, 8.6 TheFork, Tripadvisor Excellent, 143 dishes, 13 categories, halal certified, spices from India ground daily, 400 degree tandoor, open since 2023, Arun Chopra founder, private hall 25 to 80 guests
Do Not Include: competitor names, fake urgency, generic phrases like "culinary journey" or "passionate about food"
```

---

## PROMPT 02 — MENU PAGE

```
Read CLAUDE.md, SEO-BRIEF.md, and sitemap.md from the project root.
Then read .claude/DESIGN-SYSTEM.md.
Then use the seo-copywriting skill.

Write long-form SEO copy for the Menu page and update the file at:
src/app/[locale]/menu/page.tsx

Follow the existing bilingual EN/NL pattern already in the file.
Never use em dashes. Never use contractions. Match the brand voice in SEO-BRIEF.md.
Include a GEO block: one self-contained 60-100 word paragraph that answers
"What is on the menu at Chopras Indian Restaurant Den Haag?" without needing surrounding context.
Update the meta description to exactly match the approved one in CLAUDE.md.

BRIEFING BLOCK:
Content Type: Service Page
Content Format: Menu overview SEO page
Client: Chopras Indian Restaurant Den Haag
Funnel Stage: MOFU
Awareness Level: Solution-Aware
Traffic Source: Organic
Search Intent: Commercial + Informational
Content Angle: 143 dishes. 13 categories. Every spice ground fresh that morning. This is what a real Indian restaurant menu looks like.
Primary Keyword: Indian restaurant menu Den Haag
Secondary Keywords: Indiaas menu Den Haag, halal menu Den Haag, vegetarian menu Indian restaurant Den Haag, Indian food menu The Hague
LSI / Related Terms: biryani, tandoori, butter chicken, chaat, naan, dal makhani, Indo Chinese, vegan options, halal certified, 143 dishes
Internal Links: use sitemap.md
Audience: Visitors exploring what Chopras serves before deciding to visit or order
Customer Language: "what do they serve", "is there vegetarian", "halal menu", "what is the best dish"
Already Tried: Menus that do not describe dishes properly, restaurants with limited vegetarian options
Language: English
Tone Notes: Knowledgeable guide tone. Help them navigate 143 dishes without overwhelming them. Lead with the category highlights.
Schema Type: Menu + MenuSection + FAQPage
Word Count: 800 to 1200
CTA Goal: View full menu or reserve a table
Available Proof: 143 dishes, 13 categories, halal certified, vegetarian options clearly labelled, vegan options, Indo Chinese exclusive to Den Haag, fresh spices daily
Do Not Include: individual prices, competitor names, unverifiable superlatives
```

---

## PROMPT 03 — CATERING PAGE

```
Read CLAUDE.md, SEO-BRIEF.md, and sitemap.md from the project root.
Then read .claude/DESIGN-SYSTEM.md.
Then use the seo-copywriting skill.

Write long-form SEO copy for the Catering page and update the file at:
src/app/[locale]/catering/page.tsx

Follow the existing bilingual EN/NL pattern already in the file.
Never use em dashes. Never use contractions. Match the brand voice in SEO-BRIEF.md.
Include a GEO block: one self-contained 60-100 word paragraph that answers
"Does Chopras Indian Restaurant do catering in Den Haag?" without needing surrounding context.
Update the meta description to exactly match the approved one in CLAUDE.md.

BRIEFING BLOCK:
Content Type: Service Page
Content Format: Long form catering SEO page
Client: Chopras Indian Restaurant Den Haag
Funnel Stage: BOFU
Awareness Level: Solution-Aware
Traffic Source: Organic
Search Intent: Transactional
Content Angle: Indian catering in Den Haag that handles everything so you can actually enjoy your own event.
Primary Keyword: Indian catering Den Haag
Secondary Keywords: Indiaas catering Den Haag, halal catering Den Haag, Indian corporate catering Den Haag, Indian party catering Den Haag
LSI / Related Terms: wedding catering, birthday catering, corporate dinner, Diwali catering, nikah reception, private hall, 25 to 80 guests, Leyweg 986, feestzaal, buffet
Internal Links: use sitemap.md
Audience: Event planners, families organising celebrations, corporate HR managers, anyone who needs Indian food for a group
Customer Language: "can you do catering", "how many guests", "do you have a private room", "all inclusive", "halal catering"
Already Tried: Catering that arrives cold, coordinating venue and caterer separately
Language: English
Tone Notes: Reassuring and organised. They are handing you responsibility for their event. Show you handle it completely.
Schema Type: Service + FAQPage
Word Count: 1000 to 1500
CTA Goal: Request a catering quote
Available Proof: Private hall 25 to 80 guests, halal certified, same kitchen as restaurant, serves Den Haag, Rijswijk, Delft, Zoetermeer, Voorburg, Leidschendam, wedding catering, corporate dinners, Diwali, birthdays, nikah receptions
Do Not Include: competitor names, fake capacity claims, vague pricing
```

---

## PROMPT 04 — FEESTZAAL PAGE

```
Read CLAUDE.md, SEO-BRIEF.md, and sitemap.md from the project root.
Then read .claude/DESIGN-SYSTEM.md.
Then use the seo-copywriting skill.

Write long-form SEO copy for the Feestzaal page and update the file at:
src/app/[locale]/feestzaal-den-haag/page.tsx

Follow the existing bilingual EN/NL pattern already in the file.
Never use em dashes. Never use contractions. Match the brand voice in SEO-BRIEF.md.
Include a GEO block: one self-contained 60-100 word paragraph that answers
"Can I rent an event hall at Chopras Indian Restaurant in Den Haag?" without needing surrounding context.
Update the meta description to exactly match the approved one in CLAUDE.md.

BRIEFING BLOCK:
Content Type: Service Page
Content Format: Long form event venue SEO page
Client: Chopras Indian Restaurant Den Haag
Funnel Stage: BOFU
Awareness Level: Solution-Aware
Traffic Source: Organic
Search Intent: Transactional
Content Angle: A feestzaal in Den Haag where the food is as good as the venue because it comes from the same kitchen. No separate caterer. No coordination headache.
Primary Keyword: Feestzaal huren Den Haag
Secondary Keywords: Zaal huren Den Haag, zaalverhuur Den Haag, feestlocatie Den Haag, party venue Den Haag, event space Den Haag, restaurant met feestzaal Den Haag
LSI / Related Terms: verjaardagsfeest, bruiloft, bedrijfsfeest, Diwali, nikah, personeelsfeest, 25 tot 80 gasten, Leyweg 986, Indiaas catering inbegrepen, vrijblijvende offerte
Internal Links: use sitemap.md
Audience: Anyone organising a birthday, wedding, corporate event, Diwali dinner, or private party in Den Haag
Customer Language: "feestzaal huren Den Haag", "zaal met catering", "hoeveel personen passen er", "kunnen ze alles regelen"
Already Tried: Venues without catering, caterers without a venue, coordinating both separately
Language: English (Dutch NL version follows the same content, translated)
Tone Notes: Organised and warm. Show them the vision of their event going perfectly.
Schema Type: Service + FAQPage
Word Count: 1000 to 1400
CTA Goal: Request a free quote for the event hall
Available Proof: Private hall 25 to 80 guests, Leyweg 986, full catering included, same kitchen as restaurant, halal certified, 4.9 Google rating
Do Not Include: competitor venue names, fake availability claims
```

---

## PROMPT 05 — BUTTER CHICKEN PAGE

```
Read CLAUDE.md, SEO-BRIEF.md, and sitemap.md from the project root.
Then read .claude/DESIGN-SYSTEM.md.
Then use the seo-copywriting skill.

Write long-form SEO copy for the Butter Chicken page and update the file at:
src/app/[locale]/butter-chicken-den-haag/page.tsx

Follow the existing bilingual EN/NL pattern already in the file.
Never use em dashes. Never use contractions. Match the brand voice in SEO-BRIEF.md.
Include a GEO block: one self-contained 60-100 word paragraph that answers
"Where can I find the best butter chicken in Den Haag?" without needing surrounding context.
Update the meta description to exactly match the approved one in CLAUDE.md.

BRIEFING BLOCK:
Content Type: Dish Page
Content Format: Long form dish SEO page
Client: Chopras Indian Restaurant Den Haag
Funnel Stage: BOFU
Awareness Level: Solution-Aware
Traffic Source: Organic
Search Intent: Commercial
Content Angle: Butter chicken in Den Haag made the way Delhi made it famous. Not sweetened for a European palate, not simplified, not from a jar.
Primary Keyword: Butter chicken Den Haag
Secondary Keywords: Best butter chicken Den Haag, halal butter chicken Den Haag, chicken curry Den Haag, murgh makhani Den Haag
LSI / Related Terms: tandoor chicken, tomato cream sauce, fresh spices, North Indian curry, Leyweg, halal, slow cooked, authentic, 4.9 stars
Internal Links: use sitemap.md
Audience: Den Haag residents craving butter chicken, expats who know what authentic murgh makhani should taste like, families ordering a crowd-pleasing curry
Customer Language: "proper butter chicken", "not too sweet", "real Indian taste", "halal", "creamy curry Den Haag"
Already Tried: Butter chicken that is too sweet, too mild, or clearly made from a pre-mixed sauce
Language: English
Tone Notes: Sensory and specific. Make them taste it before they arrive. No generic curry descriptions.
Schema Type: Service + FAQPage
Word Count: 800 to 1200
CTA Goal: Reserve a table or order online
Available Proof: 4.9 stars 800+ reviews, halal certified, chicken cooked in tandoor first then finished in slow-cooked tomato cream sauce, spices ground fresh that morning, Leyweg 986
Do Not Include: competitor dish comparisons, generic "creamy and delicious" language
```

---

## PROMPT 06 — BIRYANI PAGE

```
Read CLAUDE.md, SEO-BRIEF.md, and sitemap.md from the project root.
Then read .claude/DESIGN-SYSTEM.md.
Then use the seo-copywriting skill.

Write long-form SEO copy for the Biryani page and update the file at:
src/app/[locale]/biryani-den-haag/page.tsx

Follow the existing bilingual EN/NL pattern already in the file.
Never use em dashes. Never use contractions. Match the brand voice in SEO-BRIEF.md.
Include a GEO block: one self-contained 60-100 word paragraph that answers
"Where can I find authentic biryani in Den Haag?" without needing surrounding context.
Update the meta description to exactly match the approved one in CLAUDE.md.

BRIEFING BLOCK:
Content Type: Dish Page
Content Format: Long form dish SEO page
Client: Chopras Indian Restaurant Den Haag
Funnel Stage: BOFU
Awareness Level: Solution-Aware
Traffic Source: Organic
Search Intent: Commercial
Content Angle: Dum biryani in Den Haag slow cooked the way it was meant to be. Sealed, steamed, saffron basmati, whole spices. Not rice mixed with curry. The real thing.
Primary Keyword: Biryani Den Haag
Secondary Keywords: Best biryani Den Haag, chicken biryani Den Haag, lamb biryani Den Haag, dum biryani Den Haag, veg biryani Den Haag
LSI / Related Terms: saffron basmati rice, slow cooked, whole spices, halal, dum method, sealed pot, aromatic, Leyweg, authentic biryani Netherlands
Internal Links: use sitemap.md
Audience: Biryani lovers who know the difference between real dum biryani and mixed rice, South Asian community, expats craving authentic biryani
Customer Language: "proper biryani", "dum biryani Den Haag", "not mixed rice", "best biryani in The Hague", "halal biryani"
Already Tried: Biryani that is just rice stirred with curry, dry biryani, biryani with no aroma
Language: English
Tone Notes: Specific and technical where it adds credibility. The dum method. The saffron. The sealing. These details separate Chopras from every competitor.
Schema Type: Service + FAQPage
Word Count: 800 to 1200
CTA Goal: Reserve a table or order online
Available Proof: 4.9 stars 800+ reviews, halal certified, chicken and lamb and veg options, saffron basmati rice, slow cooked, Leyweg 986, spices ground fresh daily
Do Not Include: generic biryani descriptions, unverifiable cooking time claims
```

---

## PROMPT 07 — TANDOORI PAGE

```
Read CLAUDE.md, SEO-BRIEF.md, and sitemap.md from the project root.
Then read .claude/DESIGN-SYSTEM.md.
Then use the seo-copywriting skill.

Write long-form SEO copy for the Tandoori page and update the file at:
src/app/[locale]/tandoori-den-haag/page.tsx

Follow the existing bilingual EN/NL pattern already in the file.
Never use em dashes. Never use contractions. Match the brand voice in SEO-BRIEF.md.
Include a GEO block: one self-contained 60-100 word paragraph that answers
"Where can I find authentic tandoori dishes in Den Haag?" without needing surrounding context.
Update the meta description to exactly match the approved one in CLAUDE.md.

BRIEFING BLOCK:
Content Type: Dish Page
Content Format: Long form dish SEO page
Client: Chopras Indian Restaurant Den Haag
Funnel Stage: BOFU
Awareness Level: Solution-Aware
Traffic Source: Organic
Search Intent: Commercial
Content Angle: The tandoor at Leyweg 986 reaches 400 degrees Celsius. That is not an oven. That is the only temperature at which tandoori chicken gets the smoky crust it was designed for.
Primary Keyword: Tandoori Den Haag
Secondary Keywords: Tandoori chicken Den Haag, clay oven Den Haag, chicken tikka Den Haag, authentic tandoori Den Haag, halal tandoori Den Haag
LSI / Related Terms: seekh kebab, paneer tikka, clay oven, 400 degrees, chargrilled, marinated overnight, yogurt marinade, smoky, Leyweg, halal
Internal Links: use sitemap.md
Audience: Guests who specifically want tandoori dishes, the smoky chargrilled experience that cannot be faked in a conventional oven
Customer Language: "real tandoori", "chargrilled chicken", "smoky chicken Den Haag", "chicken tikka Den Haag", "halal kebab Den Haag"
Already Tried: Tandoori chicken that is just baked chicken with red food coloring, no char, no smokiness
Language: English
Tone Notes: The 400-degree clay oven fact is the anchor of this page. Build everything around it. Specificity is the differentiator.
Schema Type: Service + FAQPage
Word Count: 800 to 1200
CTA Goal: Reserve a table or order online
Available Proof: 4.9 stars 800+ reviews, halal certified, tandoor reaches 400 degrees Celsius, chicken tikka, seekh kebab, paneer tikka, tandoori chicken, marinated overnight, Leyweg 986
Do Not Include: generic grilled food descriptions, competitor names
```

---

## PROMPT 08 — DAL MAKHANI PAGE

```
Read CLAUDE.md, SEO-BRIEF.md, and sitemap.md from the project root.
Then read .claude/DESIGN-SYSTEM.md.
Then use the seo-copywriting skill.

Write long-form SEO copy for the Dal Makhani page and update the file at:
src/app/[locale]/dal-makhani-den-haag/page.tsx

Follow the existing bilingual EN/NL pattern already in the file.
Never use em dashes. Never use contractions. Match the brand voice in SEO-BRIEF.md.
Include a GEO block: one self-contained 60-100 word paragraph that answers
"Where can I find authentic dal makhani in Den Haag?" without needing surrounding context.
Update the meta description to exactly match the approved one in CLAUDE.md.

BRIEFING BLOCK:
Content Type: Dish Page
Content Format: Long form dish SEO page
Client: Chopras Indian Restaurant Den Haag
Funnel Stage: BOFU
Awareness Level: Solution-Aware
Traffic Source: Organic
Search Intent: Commercial
Content Angle: Dal makhani done right requires overnight slow cooking. Not 20 minutes. Not a pressure cooker shortcut. The depth of flavour in this dish is time. Chopras does not rush it.
Primary Keyword: Dal makhani Den Haag
Secondary Keywords: Indian lentils Den Haag, vegetarian Indian main Den Haag, black dal Den Haag, Punjabi dal Den Haag, Indian comfort food Den Haag
LSI / Related Terms: black lentils, overnight cooking, butter, cream, Punjabi, vegetarian, North Indian, Leyweg, authentic, slow cooked
Internal Links: use sitemap.md
Audience: Vegetarians, people who love North Indian comfort food, South Asian community who grew up eating dal makhani
Customer Language: "proper dal makhani", "slow cooked", "not from a tin", "real Punjabi dal", "vegetarian Indian food Den Haag"
Already Tried: Dal makhani that is thin, acidic, clearly rushed, or made from pre-cooked lentils
Language: English
Tone Notes: Slow, deliberate copy tone mirrors the dish. This is comfort food. Write with warmth and specificity.
Schema Type: Service + FAQPage
Word Count: 700 to 1000
CTA Goal: Reserve a table or view the full menu
Available Proof: 4.9 stars 800+ reviews, vegetarian certified, slow cooked overnight, spices ground fresh, Leyweg 986
Do Not Include: competitor comparisons, cooking time claims unless verified
```

---

## PROMPT 09 — MUTTON ROGAN JOSH PAGE

```
Read CLAUDE.md, SEO-BRIEF.md, and sitemap.md from the project root.
Then read .claude/DESIGN-SYSTEM.md.
Then use the seo-copywriting skill.

Write long-form SEO copy for the Mutton Rogan Josh page and update the file at:
src/app/[locale]/mutton-rogan-josh-den-haag/page.tsx

Follow the existing bilingual EN/NL pattern already in the file.
Never use em dashes. Never use contractions. Match the brand voice in SEO-BRIEF.md.
Include a GEO block: one self-contained 60-100 word paragraph that answers
"Where can I find authentic mutton rogan josh in Den Haag?" without needing surrounding context.
Update the meta description to exactly match the approved one in CLAUDE.md.

BRIEFING BLOCK:
Content Type: Dish Page
Content Format: Long form dish SEO page
Client: Chopras Indian Restaurant Den Haag
Funnel Stage: BOFU
Awareness Level: Solution-Aware
Traffic Source: Organic
Search Intent: Commercial
Content Angle: Mutton rogan josh is a Kashmiri dish with a specific identity. Deep red, Kashmiri chilli, fennel, slow-cooked bone-in lamb. Not a generic lamb curry. The real Kashmiri version.
Primary Keyword: Mutton rogan josh Den Haag
Secondary Keywords: Lamb curry Den Haag, Kashmiri curry Den Haag, halal lamb Den Haag, Indian lamb curry Den Haag, rogan josh Netherlands
LSI / Related Terms: Kashmiri spices, fennel, bone-in lamb, slow cooked, halal, North Indian, Leyweg, authentic rogan josh
Internal Links: use sitemap.md
Audience: Lamb curry lovers, South Asian community who know rogan josh specifically, guests looking for a substantial halal meat dish
Customer Language: "proper rogan josh", "Kashmiri lamb curry", "halal lamb Den Haag", "bone-in mutton", "slow cooked lamb Den Haag"
Already Tried: Generic lamb curries marketed as rogan josh with no Kashmiri character
Language: English
Tone Notes: Confident and specific. Educate lightly on what makes rogan josh Kashmiri. This specificity separates Chopras from every generic lamb curry in Den Haag.
Schema Type: Service + FAQPage
Word Count: 700 to 1000
CTA Goal: Reserve a table or order online
Available Proof: 4.9 stars 800+ reviews, halal certified, Kashmiri spice gravy, slow cooked, Leyweg 986, spices from India
Do Not Include: generic lamb curry descriptions, unverifiable cooking time
```

---

## PROMPT 10 — NAAN PAGE

```
Read CLAUDE.md, SEO-BRIEF.md, and sitemap.md from the project root.
Then read .claude/DESIGN-SYSTEM.md.
Then use the seo-copywriting skill.

Write long-form SEO copy for the Naan page and update the file at:
src/app/[locale]/naan-den-haag/page.tsx

Follow the existing bilingual EN/NL pattern already in the file.
Never use em dashes. Never use contractions. Match the brand voice in SEO-BRIEF.md.
Include a GEO block: one self-contained 60-100 word paragraph that answers
"Where can I get fresh naan bread in Den Haag?" without needing surrounding context.
Update the meta description to exactly match the approved one in CLAUDE.md.

BRIEFING BLOCK:
Content Type: Dish Page
Content Format: Long form dish SEO page
Client: Chopras Indian Restaurant Den Haag
Funnel Stage: MOFU to BOFU
Awareness Level: Solution-Aware
Traffic Source: Organic
Search Intent: Commercial
Content Angle: Naan baked in a 400-degree clay oven in 90 seconds develops a char and a chew that no conventional oven can produce. This is why the bread at Chopras is different.
Primary Keyword: Naan Den Haag
Secondary Keywords: Indian bread Den Haag, garlic naan Den Haag, tandoori naan Den Haag, naan brood Den Haag, Indian flatbread Den Haag
LSI / Related Terms: garlic naan, butter naan, cheese naan, Peshwari naan, keema naan, clay oven, 400 degrees, char, tandoor, fresh baked, Leyweg
Internal Links: use sitemap.md
Audience: Anyone who loves naan, guests ordering curry who want to know about the bread, carb lovers
Customer Language: "fresh naan Den Haag", "garlic naan", "best naan in The Hague", "Indian bread Den Haag"
Already Tried: Naan that is soft and doughy with no char, clearly microwaved or pre-baked
Language: English
Tone Notes: The clay oven is the story here. The 90-second bake. The char. Write so specifically they can smell it.
Schema Type: Service + FAQPage
Word Count: 600 to 900
CTA Goal: Reserve a table or view the full menu
Available Proof: 400 degree clay oven, 6 types of naan, Leyweg 986, 4.9 stars 800+ reviews
Do Not Include: generic bread descriptions
```

---

## PROMPT 11 — CHAAT PAGE

```
Read CLAUDE.md, SEO-BRIEF.md, and sitemap.md from the project root.
Then read .claude/DESIGN-SYSTEM.md.
Then use the seo-copywriting skill.

Write long-form SEO copy for the Chaat page and update the file at:
src/app/[locale]/chaat-den-haag/page.tsx

Follow the existing bilingual EN/NL pattern already in the file.
Never use em dashes. Never use contractions. Match the brand voice in SEO-BRIEF.md.
Include a GEO block: one self-contained 60-100 word paragraph that answers
"Where can I find authentic chaat and Indian street food in Den Haag?" without needing surrounding context.
Update the meta description to exactly match the approved one in CLAUDE.md.

BRIEFING BLOCK:
Content Type: Dish Page
Content Format: Long form dish SEO page
Client: Chopras Indian Restaurant Den Haag
Funnel Stage: BOFU
Awareness Level: Solution-Aware
Traffic Source: Organic
Search Intent: Commercial
Content Angle: Indian street food in Den Haag. Pani puri, papdi chaat, dahi puri, aloo tikki. Served the way they are served on Mumbai streets. No adaptations. No Dutch compromises.
Primary Keyword: Chaat Den Haag
Secondary Keywords: Indian street food Den Haag, papdi chaat Den Haag, dahi puri Den Haag, aloo tikki Den Haag, Indian snacks Den Haag
LSI / Related Terms: tamarind chutney, mint chutney, spiced potato, crispy wafers, yogurt, chaat masala, pani puri, Mumbai street food, vegetarian, Leyweg
Internal Links: use sitemap.md
Audience: Indian food enthusiasts who know chaat, expats craving street food, adventurous Dutch diners
Customer Language: "chaat Den Haag", "Indian snacks", "street food Den Haag", "pani puri", "papdi chaat"
Already Tried: Westernised Indian starters, restaurants that do not serve proper chaat
Language: English
Tone Notes: Playful energy. This is street food. Quick, bright, specific. The explosion of flavours in one bite.
Schema Type: Service + FAQPage
Word Count: 700 to 1000
CTA Goal: Reserve a table and try the chaat selection
Available Proof: 4.9 stars 800+ reviews, papdi chaat, dahi puri, aloo tikki, pani puri all on menu, vegetarian, Leyweg 986
Do Not Include: competitor names
```

---

## PROMPT 12 — PANI PURI PAGE

```
Read CLAUDE.md, SEO-BRIEF.md, and sitemap.md from the project root.
Then read .claude/DESIGN-SYSTEM.md.
Then use the seo-copywriting skill.

Write long-form SEO copy for the Pani Puri page and update the file at:
src/app/[locale]/pani-puri-den-haag/page.tsx

Follow the existing bilingual EN/NL pattern already in the file.
Never use em dashes. Never use contractions. Match the brand voice in SEO-BRIEF.md.
Include a GEO block: one self-contained 60-100 word paragraph that answers
"Where can I find authentic pani puri in Den Haag?" without needing surrounding context.
Update the meta description to exactly match the approved one in CLAUDE.md.

BRIEFING BLOCK:
Content Type: Dish Page
Content Format: Long form dish SEO page
Client: Chopras Indian Restaurant Den Haag
Funnel Stage: BOFU
Awareness Level: Solution-Aware
Traffic Source: Organic
Search Intent: Commercial
Content Angle: One bite. The crispy shell shatters. The spiced potato fills your mouth. The tamarind water hits last. This is golgappa, the most interactive dish in Indian street food.
Primary Keyword: Pani puri Den Haag
Secondary Keywords: Golgappa Den Haag, Indian street food Den Haag, Indian snacks Den Haag, authentic Indian food Netherlands
LSI / Related Terms: hollow puri, tamarind water, spiced potato filling, golgappa, vegetarian, vegan, street food, Mumbai, Leyweg
Internal Links: use sitemap.md
Audience: Indian food lovers, expats who grew up eating pani puri, adventurous Dutch guests, vegetarians and vegans
Customer Language: "pani puri Den Haag", "golgappa", "Indian street food", "hollow puri"
Already Tried: Finding authentic pani puri anywhere in Den Haag
Language: English
Tone Notes: Sensory first sentence. Make them experience the dish before they read about it. This dish is interactive, the copy should be too.
Schema Type: Service + FAQPage
Word Count: 600 to 900
CTA Goal: Reserve a table and experience the street food
Available Proof: 4.9 stars 800+ reviews, vegetarian and vegan, Leyweg 986, authentic recipe
Do Not Include: generic street food descriptions
```

---

## PROMPT 13 — SOYA CHAAP PAGE

```
Read CLAUDE.md, SEO-BRIEF.md, and sitemap.md from the project root.
Then read .claude/DESIGN-SYSTEM.md.
Then use the seo-copywriting skill.

Write long-form SEO copy for the Soya Chaap page and update the file at:
src/app/[locale]/soya-chaap-den-haag/page.tsx

Follow the existing bilingual EN/NL pattern already in the file.
Never use em dashes. Never use contractions. Match the brand voice in SEO-BRIEF.md.
Include a GEO block: one self-contained 60-100 word paragraph that answers
"Where can I find soya chaap in Den Haag?" without needing surrounding context.
Update the meta description to exactly match the approved one in CLAUDE.md.

BRIEFING BLOCK:
Content Type: Dish Page
Content Format: Long form dish SEO page
Client: Chopras Indian Restaurant Den Haag
Funnel Stage: BOFU
Awareness Level: Solution-Aware
Traffic Source: Organic
Search Intent: Commercial
Content Angle: The only vegan dish in Den Haag that does not taste like a compromise. Soya chaap marinated in achari spices and grilled in the tandoor. Smoky, satisfying, completely plant-based.
Primary Keyword: Soya chaap Den Haag
Secondary Keywords: Vegan Indian food Den Haag, plant based Indian Den Haag, Indian vegetarian Den Haag, vegan Indian restaurant Den Haag
LSI / Related Terms: achari marinade, tandoor grilled, soy protein, plant-based, vegan, vegetarian, mock meat, Leyweg, North Indian
Internal Links: use sitemap.md
Audience: Vegans, vegetarians, people reducing meat consumption who still want the tandoor experience
Customer Language: "vegan Indian food Den Haag", "plant based Indian Den Haag", "soya chaap", "good vegan Indian restaurant"
Already Tried: Vegan options that are boring, vegetable dishes that feel like an afterthought, no vegan tandoor options
Language: English
Tone Notes: Proud but not preachy. This dish earns its place on the menu. Write it that way.
Schema Type: Service + FAQPage
Word Count: 600 to 900
CTA Goal: Reserve a table or view the vegan menu
Available Proof: 4.9 stars 800+ reviews, fully vegan, tandoor grilled, achari spices, Leyweg 986, vegan menu available
Do Not Include: preachy vegan messaging, competitor comparisons
```

---

## PROMPT 14 — INDIAN BUFFET PAGE

```
Read CLAUDE.md, SEO-BRIEF.md, and sitemap.md from the project root.
Then read .claude/DESIGN-SYSTEM.md.
Then use the seo-copywriting skill.

Write long-form SEO copy for the Indian Buffet page and update the file at:
src/app/[locale]/indian-buffet-den-haag/page.tsx

Follow the existing bilingual EN/NL pattern already in the file.
Never use em dashes. Never use contractions. Match the brand voice in SEO-BRIEF.md.
Include a GEO block: one self-contained 60-100 word paragraph that answers
"Does Chopras Indian Restaurant offer a buffet in Den Haag?" without needing surrounding context.
Update the meta description to exactly match the approved one in CLAUDE.md.

BRIEFING BLOCK:
Content Type: Service Page
Content Format: Long form SEO page
Client: Chopras Indian Restaurant Den Haag
Funnel Stage: MOFU to BOFU
Awareness Level: Solution-Aware
Traffic Source: Organic
Search Intent: Commercial
Content Angle: Indian buffet in Den Haag for groups who want variety. Curries, tandoori, biryani, naan, desserts. All halal. All from the same kitchen. No quality drop for catering quantity.
Primary Keyword: Indian buffet Den Haag
Secondary Keywords: Indiaas buffet Den Haag, Indian all you can eat Den Haag, buffet catering Den Haag, Indian group dining Den Haag
LSI / Related Terms: group dining, catering, halal buffet, corporate lunch, event catering, 25 to 80 guests, Leyweg 986, variety, fresh daily
Internal Links: use sitemap.md
Audience: Groups organising team events, families celebrating, corporate event planners who want Indian buffet
Customer Language: "Indian buffet Den Haag", "group Indian food Den Haag", "catering buffet halal", "Indiaas buffet bestellen"
Already Tried: Buffets where quality drops because it is mass produced, caterers who cannot do halal buffet
Language: English
Tone Notes: Generous and organised. Emphasise variety and quality consistency at scale.
Schema Type: Service + FAQPage
Word Count: 700 to 1000
CTA Goal: Request a buffet catering quote
Available Proof: 4.9 stars 800+ reviews, halal certified, 143 dish menu to draw from, private hall 25 to 80 guests, Leyweg 986
Do Not Include: price per head claims unless verified, competitor names
```

---

## PROMPT 15 — INDO CHINESE PAGE

```
Read CLAUDE.md, SEO-BRIEF.md, and sitemap.md from the project root.
Then read .claude/DESIGN-SYSTEM.md.
Then use the seo-copywriting skill.

Write long-form SEO copy for the Indo Chinese page and update the file at:
src/app/[locale]/indo-chinese-restaurant-den-haag/page.tsx

Follow the existing bilingual EN/NL pattern already in the file.
Never use em dashes. Never use contractions. Match the brand voice in SEO-BRIEF.md.
Include a GEO block: one self-contained 60-100 word paragraph that answers
"Is there an Indo Chinese restaurant in Den Haag?" without needing surrounding context.
Update the meta description to exactly match the approved one in CLAUDE.md.

BRIEFING BLOCK:
Content Type: Service Page
Content Format: Long form dish category SEO page
Client: Chopras Indian Restaurant Den Haag
Funnel Stage: BOFU
Awareness Level: Solution-Aware
Traffic Source: Organic
Search Intent: Commercial
Content Angle: Indo Chinese food is a cuisine category born in the Indian Chinese community of Kolkata. It is not Chinese food. It is not Indian food. It is something else entirely. And in Den Haag, only Chopras serves it properly.
Primary Keyword: Indo Chinese restaurant Den Haag
Secondary Keywords: Indian Chinese food Den Haag, Indo Chinese food Den Haag, chilli chicken Den Haag, chilli paneer Den Haag, Hakka noodles Den Haag
LSI / Related Terms: Manchow soup, wok tossed, soy sauce, Indo Chinese cuisine, fusion, chilli paneer, chilli chicken, veg noodles, Kolkata Chinese, Leyweg
Internal Links: use sitemap.md
Audience: People who know Indo Chinese food and cannot find it in Den Haag, South Asian community, adventurous diners
Customer Language: "Indo Chinese food Den Haag", "chilli chicken Den Haag", "Hakka noodles", "Indian Chinese restaurant Den Haag"
Already Tried: Regular Chinese restaurants without Indo Chinese, Indian restaurants without a Chinese section
Language: English
Tone Notes: Educational first. Explain what Indo Chinese is. Then position Chopras as the exclusive provider in Den Haag. The exclusivity angle is the strongest differentiator on this page.
Schema Type: Service + FAQPage
Word Count: 900 to 1300
CTA Goal: Reserve a table and try the Indo Chinese menu
Available Proof: 4.9 stars 800+ reviews, only Indo Chinese restaurant in Den Haag, chilli chicken, chilli paneer, Hakka noodles, Manchow soup, Leyweg 986
Do Not Include: generic Chinese food descriptions, competitor names
```

---

## PROMPT 16 — HALAL FOOD PAGE

```
Read CLAUDE.md, SEO-BRIEF.md, and sitemap.md from the project root.
Then read .claude/DESIGN-SYSTEM.md.
Then use the seo-copywriting skill.

Write long-form SEO copy for the Halal Food page and update the file at:
src/app/[locale]/halal-food-den-haag/page.tsx

Follow the existing bilingual EN/NL pattern already in the file.
Never use em dashes. Never use contractions. Match the brand voice in SEO-BRIEF.md.
Include a GEO block: one self-contained 60-100 word paragraph that answers
"Is there fully halal certified Indian food in Den Haag?" without needing surrounding context.
Update the meta description to exactly match the approved one in CLAUDE.md.

BRIEFING BLOCK:
Content Type: Service Page
Content Format: Long form halal SEO page
Client: Chopras Indian Restaurant Den Haag
Funnel Stage: MOFU to BOFU
Awareness Level: Solution-Aware
Traffic Source: Organic
Search Intent: Commercial
Content Angle: Halal food in Den Haag where the certification is not a menu option. It is the whole kitchen. Every supplier. Every dish. No cross-contamination risk because there is no non-halal meat on the premises.
Primary Keyword: Halal food Den Haag
Secondary Keywords: Halal Indian restaurant Den Haag, halal eten Den Haag, certified halal Den Haag, halal Indiaas eten, Muslim friendly restaurant Den Haag
LSI / Related Terms: halal certified, halal supplier, no cross-contamination, Muslim family, halal biryani, halal tandoori, halal catering, Leyweg 986
Internal Links: use sitemap.md
Audience: Muslim families, individuals who require confirmed halal food, community groups
Customer Language: "100% halal", "certified halal", "no cross-contamination", "safe for the whole family", "halal confirmed"
Already Tried: Restaurants claiming halal with no certification visible, restaurants where only some dishes are halal
Language: English
Tone Notes: Clear, trustworthy, specific. Halal guests do not want marketing. They want certainty. Give it to them.
Schema Type: Service + FAQPage
Word Count: 800 to 1200
CTA Goal: Reserve a table with confidence
Available Proof: 4.9 stars 800+ reviews, fully halal certified kitchen, all suppliers halal certified, 143 dishes all halal, Leyweg 986
Do Not Include: vague halal claims without specifics, competitor names
```

---

## PROMPT 17 — HALAL MENU PAGE

```
Read CLAUDE.md, SEO-BRIEF.md, and sitemap.md from the project root.
Then read .claude/DESIGN-SYSTEM.md.
Then use the seo-copywriting skill.

Write long-form SEO copy for the Halal Menu page and update the file at:
src/app/[locale]/halal-menu/page.tsx

Follow the existing bilingual EN/NL pattern already in the file.
Never use em dashes. Never use contractions. Match the brand voice in SEO-BRIEF.md.
Include a GEO block: one self-contained 60-100 word paragraph that answers
"What is the halal menu at Chopras Indian Restaurant Den Haag?" without needing surrounding context.
Update the meta description to exactly match the approved one in CLAUDE.md.

BRIEFING BLOCK:
Content Type: Service Page
Content Format: Halal menu SEO page
Client: Chopras Indian Restaurant Den Haag
Funnel Stage: BOFU
Awareness Level: Product-Aware
Traffic Source: Organic
Search Intent: Commercial
Content Angle: The full halal menu at Chopras. Biryani, tandoori, curries, street food, breads and desserts. All certified. Every dish listed by category so halal guests know exactly what to order.
Primary Keyword: Halal menu Den Haag
Secondary Keywords: Halal Indian restaurant Den Haag, halal certified Den Haag, halal Indiaas eten Den Haag, Muslim friendly restaurant Den Haag
LSI / Related Terms: halal biryani, halal butter chicken, halal tandoori, halal catering, halal certified supplier, Leyweg 986
Internal Links: use sitemap.md
Audience: Muslim guests specifically looking for the halal menu before visiting
Customer Language: "halal menu", "what is halal here", "full halal menu", "halal certified"
Already Tried: Menus where halal dishes are not clearly indicated
Language: English
Tone Notes: Direct and reassuring. This page is a decision-maker for halal guests. Make every answer obvious.
Schema Type: Service + FAQPage
Word Count: 600 to 900
CTA Goal: Visit Chopras and dine with confidence
Available Proof: 4.9 stars 800+ reviews, full kitchen halal certified, all suppliers certified, Leyweg 986
Do Not Include: non-halal menu items, competitor names
```

---

## PROMPT 18 — VEGAN MENU PAGE

```
Read CLAUDE.md, SEO-BRIEF.md, and sitemap.md from the project root.
Then read .claude/DESIGN-SYSTEM.md.
Then use the seo-copywriting skill.

Write long-form SEO copy for the Vegan Menu page and update the file at:
src/app/[locale]/vegan-menu/page.tsx

Follow the existing bilingual EN/NL pattern already in the file.
Never use em dashes. Never use contractions. Match the brand voice in SEO-BRIEF.md.
Include a GEO block: one self-contained 60-100 word paragraph that answers
"Does Chopras Indian Restaurant have vegan options in Den Haag?" without needing surrounding context.
Update the meta description to exactly match the approved one in CLAUDE.md.

BRIEFING BLOCK:
Content Type: Service Page
Content Format: Vegan menu SEO page
Client: Chopras Indian Restaurant Den Haag
Funnel Stage: BOFU
Awareness Level: Solution-Aware
Traffic Source: Organic
Search Intent: Commercial
Content Angle: Vegan Indian food in Den Haag that is actually satisfying. Not a side salad and plain rice. Dal makhani, soya chaap, chana masala, baingan bharta. Real dishes, real spices, completely plant-based.
Primary Keyword: Vegan Indian food Den Haag
Secondary Keywords: Vegan Indian restaurant Den Haag, plant based Indian food Den Haag, dairy free Indian food Den Haag, vegetarisch Indiaas Den Haag
LSI / Related Terms: soya chaap, chana masala, dal tadka, aloo gobi, baingan bharta, no dairy, no meat, plant based, vegan catering, Leyweg 986
Internal Links: use sitemap.md
Audience: Vegans, vegetarians, people reducing animal products, health-conscious guests
Customer Language: "vegan Indian food Den Haag", "plant based Indian", "dairy free Indian", "good vegan restaurant Den Haag"
Already Tried: Indian restaurants where vegan options are afterthoughts, limited plant-based menus
Language: English
Tone Notes: Confident and appetising. Vegan food at Chopras is not an accommodation. It is a full menu section. Write it that way.
Schema Type: Service + FAQPage
Word Count: 700 to 1000
CTA Goal: View the vegan menu or reserve a table
Available Proof: 4.9 stars 800+ reviews, dedicated vegan dishes, soya chaap in tandoor, dal makhani, chana masala, Leyweg 986
Do Not Include: preachy vegan messaging, health claims without evidence
```

---

## PROMPT 19 — WEDDING CATERING PAGE

```
Read CLAUDE.md, SEO-BRIEF.md, and sitemap.md from the project root.
Then read .claude/DESIGN-SYSTEM.md.
Then use the seo-copywriting skill.

Write long-form SEO copy for the Wedding Catering page and update the file at:
src/app/[locale]/indian-wedding-catering-den-haag/page.tsx

Follow the existing bilingual EN/NL pattern already in the file.
Never use em dashes. Never use contractions. Match the brand voice in SEO-BRIEF.md.
Include a GEO block: one self-contained 60-100 word paragraph that answers
"Does Chopras Indian Restaurant do wedding catering in Den Haag?" without needing surrounding context.
Update the meta description to exactly match the approved one in CLAUDE.md.

BRIEFING BLOCK:
Content Type: Service Page
Content Format: Long form wedding catering SEO page
Client: Chopras Indian Restaurant Den Haag
Funnel Stage: BOFU
Awareness Level: Solution-Aware
Traffic Source: Organic
Search Intent: Transactional
Content Angle: Indian wedding catering in Den Haag where every dish at the reception is made from the same kitchen as the restaurant. No drop in quality for scale. Nikah, walima, sangeet, all handled.
Primary Keyword: Indian wedding catering Den Haag
Secondary Keywords: Bruiloft catering Den Haag, nikah catering Den Haag, walima dinner Den Haag, Indian wedding food Netherlands, trouwen catering Den Haag
LSI / Related Terms: nikah reception, walima dinner, sangeet catering, 25 to 80 guests, halal certified, full service, Leyweg 986, South Holland catering
Internal Links: use sitemap.md
Audience: Couples planning Indian weddings, families organising nikah receptions, wedding planners looking for halal Indian catering
Customer Language: "Indian wedding catering Den Haag", "nikah catering", "walima dinner catering", "halal wedding food"
Already Tried: Caterers who cannot do halal, non-Indian caterers who attempt Indian food, restaurants that cannot handle wedding-scale groups
Language: English
Tone Notes: Celebratory but organised. This is one of the most important days of their lives. Show you understand the weight of that.
Schema Type: Service + FAQPage
Word Count: 1000 to 1500
CTA Goal: Request a free wedding catering quote
Available Proof: 4.9 stars 800+ reviews, halal certified, nikah receptions served, 25 to 80 guests, serves Den Haag and surrounding areas, same kitchen as restaurant
Do Not Include: capacity claims above 80 guests
```

---

## PROMPT 20 — BIRTHDAY CATERING PAGE

```
Read CLAUDE.md, SEO-BRIEF.md, and sitemap.md from the project root.
Then read .claude/DESIGN-SYSTEM.md.
Then use the seo-copywriting skill.

Write long-form SEO copy for the Birthday Catering page and update the file at:
src/app/[locale]/indian-birthday-catering-den-haag/page.tsx

Follow the existing bilingual EN/NL pattern already in the file.
Never use em dashes. Never use contractions. Match the brand voice in SEO-BRIEF.md.
Include a GEO block: one self-contained 60-100 word paragraph that answers
"Does Chopras Indian Restaurant do birthday catering in Den Haag?" without needing surrounding context.
Update the meta description to exactly match the approved one in CLAUDE.md.

BRIEFING BLOCK:
Content Type: Service Page
Content Format: Birthday catering SEO page
Client: Chopras Indian Restaurant Den Haag
Funnel Stage: BOFU
Awareness Level: Solution-Aware
Traffic Source: Organic
Search Intent: Transactional
Content Angle: Indian birthday catering in Den Haag. Arrive, eat, celebrate. Chopras handles the food so the birthday person can actually enjoy their own party.
Primary Keyword: Indian birthday catering Den Haag
Secondary Keywords: Birthday catering Den Haag, verjaardag catering Den Haag, Indian party catering Den Haag, verjaardagsfeest catering Den Haag
LSI / Related Terms: birthday party food, halal catering, group Indian food, delivery catering, private hall, 25 to 80 guests, Leyweg 986
Internal Links: use sitemap.md
Audience: Anyone organising a birthday celebration in Den Haag who wants Indian food catered
Customer Language: "birthday catering Den Haag", "Indian food for party", "verjaardag catering", "Indiaas catering verjaardag"
Already Tried: Generic caterers, restaurants that cannot handle groups, bad delivery catering
Language: English
Tone Notes: Light and celebratory. Make it easy. Show the process is simple.
Schema Type: Service + FAQPage
Word Count: 700 to 1000
CTA Goal: Book birthday catering
Available Proof: 4.9 stars 800+ reviews, halal certified, private hall 25 to 80 guests, same kitchen as restaurant, serves Den Haag and surrounding areas
Do Not Include: fake minimum order guarantees, competitor names
```

---

## PROMPT 21 — CORPORATE EVENTS PAGE

```
Read CLAUDE.md, SEO-BRIEF.md, and sitemap.md from the project root.
Then read .claude/DESIGN-SYSTEM.md.
Then use the seo-copywriting skill.

Write long-form SEO copy for the Corporate Events page and update the file at:
src/app/[locale]/corporate-events-den-haag/page.tsx

Follow the existing bilingual EN/NL pattern already in the file.
Never use em dashes. Never use contractions. Match the brand voice in SEO-BRIEF.md.
Include a GEO block: one self-contained 60-100 word paragraph that answers
"Does Chopras Indian Restaurant handle corporate events and catering in Den Haag?" without needing surrounding context.
Update the meta description to exactly match the approved one in CLAUDE.md.

BRIEFING BLOCK:
Content Type: Service Page
Content Format: Corporate catering SEO page
Client: Chopras Indian Restaurant Den Haag
Funnel Stage: BOFU
Awareness Level: Solution-Aware
Traffic Source: Organic
Search Intent: Transactional
Content Angle: Corporate event catering in Den Haag that impresses clients and works for diverse teams. Halal certified, vegetarian options, professional service. Chopras handles the food; you handle the agenda.
Primary Keyword: Corporate events Den Haag
Secondary Keywords: Indian corporate catering Den Haag, zakelijk evenement Den Haag, bedrijfsfeest catering Den Haag, corporate dinner Den Haag, diplomatic catering Den Haag
LSI / Related Terms: team dinner, client entertainment, corporate lunch, private dining, 15 to 80 guests, halal certified, professional service, Leyweg 986, Peace Palace area
Internal Links: use sitemap.md
Audience: Corporate HR managers, executive assistants, event coordinators, diplomatic staff near Peace Palace
Customer Language: "corporate catering Den Haag", "Indian food for business dinner", "zakelijk evenement catering", "team dinner Den Haag"
Already Tried: Generic corporate caterers, restaurants that cannot guarantee consistent quality for groups
Language: English
Tone Notes: Professional and efficient. Corporate buyers want reliability. Lead with that.
Schema Type: Service + FAQPage
Word Count: 800 to 1200
CTA Goal: Request a corporate catering quote
Available Proof: 4.9 stars 800+ reviews, halal certified, vegetarian options, 15 to 80 guests, private hall, near Peace Palace, Leyweg 986
Do Not Include: fake minimum guest claims, competitor names
```

---

## PROMPT 22 — DIWALI DINNER PAGE

```
Read CLAUDE.md, SEO-BRIEF.md, and sitemap.md from the project root.
Then read .claude/DESIGN-SYSTEM.md.
Then use the seo-copywriting skill.

Write long-form SEO copy for the Diwali Dinner page and update the file at:
src/app/[locale]/diwali-dinner-den-haag/page.tsx

Follow the existing bilingual EN/NL pattern already in the file.
Never use em dashes. Never use contractions. Match the brand voice in SEO-BRIEF.md.
Include a GEO block: one self-contained 60-100 word paragraph that answers
"Where can I celebrate Diwali with authentic Indian food in Den Haag?" without needing surrounding context.
Update the meta description to exactly match the approved one in CLAUDE.md.

BRIEFING BLOCK:
Content Type: Service Page
Content Format: Festival dining SEO page
Client: Chopras Indian Restaurant Den Haag
Funnel Stage: BOFU
Awareness Level: Solution-Aware
Traffic Source: Organic
Search Intent: Transactional
Content Angle: Celebrate Diwali in Den Haag with food that matches the occasion. Dine in with family or book authentic Indian catering for your Diwali celebration at home or at your venue.
Primary Keyword: Diwali dinner Den Haag
Secondary Keywords: Diwali restaurant Den Haag, Indian festival dinner Den Haag, Diwali catering Den Haag, Indian celebration dinner Netherlands
LSI / Related Terms: festival of lights, Indian community, Diwali celebration, family dinner, biryani, halal, sweets, gulab jamun, Leyweg 986, Den Haag South Asian community
Internal Links: use sitemap.md
Audience: Indian and South Asian families in Den Haag and South Holland celebrating Diwali
Customer Language: "Diwali dinner Den Haag", "Indian restaurant Diwali", "Diwali catering", "celebrate Diwali The Hague"
Already Tried: Restaurants with no understanding of Diwali significance, generic catering that does not feel celebratory
Language: English
Tone Notes: Warm and culturally respectful. Acknowledge the significance of the festival without being performative.
Schema Type: Service + FAQPage
Word Count: 700 to 1000
CTA Goal: Book a Diwali dinner table or catering
Available Proof: 4.9 stars 800+ reviews, halal certified, South Asian community focus, Leyweg 986, private hall available, traditional Indian sweets on menu
Do Not Include: offensive cultural generalisations, fake Diwali promotions
```

---

## PROMPT 23 — BRUILOFT CATERING PAGE (DUTCH)

```
Read CLAUDE.md, SEO-BRIEF.md, and sitemap.md from the project root.
Then read .claude/DESIGN-SYSTEM.md.
Then use the seo-copywriting skill.

Write long-form SEO copy for the Bruiloft Catering page and update the file at:
src/app/[locale]/bruiloft-catering-den-haag/page.tsx

This page is written ENTIRELY IN DUTCH. No English in the copy.
Never use em dashes. Never use contractions. Match the brand voice in SEO-BRIEF.md adapted for Dutch tone.
Include a GEO block in Dutch: one self-contained 60-100 word paragraph that answers
"Doet Chopras Indian Restaurant bruiloft catering in Den Haag?" without needing surrounding context.
Update the meta description to exactly match the approved Dutch one in CLAUDE.md.

BRIEFING BLOCK:
Content Type: Service Page
Content Format: Dutch-language wedding catering SEO page
Client: Chopras Indian Restaurant Den Haag
Funnel Stage: BOFU
Awareness Level: Solution-Aware
Traffic Source: Organic
Search Intent: Transactional
Content Angle: Bruiloft catering in Den Haag waarbij het eten net zo goed is als de locatie, omdat het uit dezelfde keuken komt als het restaurant.
Primary Keyword: Bruiloft catering Den Haag
Secondary Keywords: Indian wedding catering Den Haag, trouwen catering Den Haag, huwelijk catering Den Haag, Indian bruiloft Den Haag
LSI / Related Terms: huwelijksreceptie, nikah, trouwfeest, Indiaas eten bruiloft, halal catering bruiloft, 25 tot 80 gasten, Leyweg 986, vrijblijvende offerte
Internal Links: use sitemap.md
Audience: Dutch-speaking couples and families in Den Haag organising Indian wedding catering
Customer Language: "bruiloft catering Den Haag", "Indiaas trouwfeest catering", "halal bruiloft eten"
Language: Dutch — write entirely in Dutch. No English mixing.
Tone Notes: Warm en georganiseerd. Directe Nederlandse communicatiestijl, geen overdreven marketing, gewoon duidelijkheid.
Schema Type: Service + FAQPage
Word Count: 800 to 1200
CTA Goal: Vrijblijvende offerte aanvragen
Available Proof: 4.9 sterren Google, 800+ reviews, volledig halal gecertificeerd, 25 tot 80 gasten, Leyweg 986, Den Haag en omgeving
Do Not Include: Engels in de copy, concurrent namen
```

---

## PROMPT 24 — ZAAL HUREN PAGE (DUTCH)

```
Read CLAUDE.md, SEO-BRIEF.md, and sitemap.md from the project root.
Then read .claude/DESIGN-SYSTEM.md.
Then use the seo-copywriting skill.

Write long-form SEO copy for the Zaal Huren page and update the file at:
src/app/[locale]/zaal-huren-den-haag/page.tsx

This page is written ENTIRELY IN DUTCH. No English in the copy.
Never use em dashes. Never use contractions. Match the brand voice in SEO-BRIEF.md adapted for Dutch tone.
Include a GEO block in Dutch: one self-contained 60-100 word paragraph that answers
"Kan ik een zaal huren bij Chopras Indian Restaurant in Den Haag?" without needing surrounding context.
Update the meta description to exactly match the approved Dutch one in CLAUDE.md.

BRIEFING BLOCK:
Content Type: Service Page
Content Format: Dutch event space SEO page
Client: Chopras Indian Restaurant Den Haag
Funnel Stage: BOFU
Awareness Level: Solution-Aware
Traffic Source: Organic
Search Intent: Transactional
Content Angle: Zaal huren in Den Haag bij een restaurant waar het eten net zo goed is als de ruimte. Geen aparte cateraar nodig. Alles op een plek.
Primary Keyword: Zaal huren Den Haag
Secondary Keywords: Feestzaal huren Den Haag, zaal reserveren Den Haag, ruimte huren Den Haag, zaal huren met catering Den Haag
LSI / Related Terms: zaalverhuur, evenementenruimte, feestlocatie, 25 tot 80 gasten, Indiaas catering, Leyweg 986, flexibele indeling, vrijblijvende offerte
Internal Links: use sitemap.md
Audience: Iedereen in Den Haag die een zaal zoekt voor een feest, vergadering of evenement
Customer Language: "zaal huren Den Haag", "zaal met catering Den Haag", "feestzaal huren Den Haag"
Language: Dutch — write entirely in Dutch
Tone Notes: Direct en praktisch. Geef ze de feiten die ze nodig hebben om te beslissen.
Schema Type: Service + FAQPage
Word Count: 700 to 1000
CTA Goal: Offerte aanvragen
Available Proof: 4.9 sterren 800+ reviews, 25 tot 80 gasten, Leyweg 986, Indiaas catering inbegrepen, volledig halal
Do Not Include: Engels in de copy, concurrent namen
```

---

## PROMPT 25 — EVENEMENTENRUIMTE PAGE (DUTCH)

```
Read CLAUDE.md, SEO-BRIEF.md, and sitemap.md from the project root.
Then read .claude/DESIGN-SYSTEM.md.
Then use the seo-copywriting skill.

Write long-form SEO copy for the Evenementenruimte page and update the file at:
src/app/[locale]/evenementenruimte-den-haag/page.tsx

This page is written ENTIRELY IN DUTCH. No English in the copy.
Never use em dashes. Never use contractions. Match the brand voice in SEO-BRIEF.md adapted for Dutch tone.
Include a GEO block in Dutch: one self-contained 60-100 word paragraph that answers
"Biedt Chopras Indian Restaurant een evenementenruimte aan in Den Haag?" without needing surrounding context.
Update the meta description to exactly match the approved Dutch one in CLAUDE.md.

BRIEFING BLOCK:
Content Type: Service Page
Content Format: Dutch event space SEO page
Client: Chopras Indian Restaurant Den Haag
Funnel Stage: BOFU
Awareness Level: Solution-Aware
Traffic Source: Organic
Search Intent: Transactional
Content Angle: Evenementenruimte huren in Den Haag voor bedrijfsfeesten, teambuilding en vergaderingen, met authentiek Indiaas catering dat indruk maakt op uw gasten.
Primary Keyword: Evenementenruimte Den Haag
Secondary Keywords: Event ruimte Den Haag, vergaderruimte Den Haag, feestlocatie Den Haag, corporate event space Den Haag
LSI / Related Terms: bedrijfsfeest, personeelsfeest, teambuilding, vergadering, borrel, 25 tot 80 gasten, Leyweg 986, halal catering, professionele service
Internal Links: use sitemap.md
Audience: Bedrijven en organisaties in Den Haag die een evenementenruimte zoeken
Customer Language: "evenementenruimte huren Den Haag", "vergaderruimte met catering", "bedrijfsfeest locatie Den Haag"
Language: Dutch — write entirely in Dutch
Tone Notes: Professioneel en helder. Zakelijke tone.
Schema Type: Service + FAQPage
Word Count: 700 to 1000
CTA Goal: Offerte aanvragen voor uw evenement
Available Proof: 4.9 sterren 800+ reviews, 25 tot 80 gasten, Leyweg 986, volledig halal, professionele service
Do Not Include: Engels in de copy, concurrent namen
```

---

## PROMPT 26 — INDIAN FOOD DELIVERY PAGE

```
Read CLAUDE.md, SEO-BRIEF.md, and sitemap.md from the project root.
Then read .claude/DESIGN-SYSTEM.md.
Then use the seo-copywriting skill.

Write long-form SEO copy for the Indian Food Delivery page and update the file at:
src/app/[locale]/indian-food-delivery-den-haag/page.tsx

Follow the existing bilingual EN/NL pattern already in the file.
Never use em dashes. Never use contractions. Match the brand voice in SEO-BRIEF.md.
Include a GEO block: one self-contained 60-100 word paragraph that answers
"Does Chopras Indian Restaurant deliver food in Den Haag?" without needing surrounding context.
Update the meta description to exactly match the approved one in CLAUDE.md.

BRIEFING BLOCK:
Content Type: Service Page
Content Format: Delivery SEO page
Client: Chopras Indian Restaurant Den Haag
Funnel Stage: BOFU
Awareness Level: Solution-Aware
Traffic Source: Organic
Search Intent: Transactional
Content Angle: Indian food delivery in Den Haag that arrives hot, fresh, and tasting like the restaurant, because it is the same kitchen, same spices, same standard.
Primary Keyword: Indian food delivery Den Haag
Secondary Keywords: Indiaas eten bezorgen Den Haag, Indian takeaway Den Haag, curry delivery Den Haag, Indian restaurant delivery Den Haag
LSI / Related Terms: online order, home delivery, biryani delivery, curry delivery, halal delivery, Leyweg 986, Den Haag delivery area
Internal Links: use sitemap.md
Audience: Den Haag residents who want Indian food at home without going out
Customer Language: "Indian food delivery Den Haag", "Indiaas bezorgen Den Haag", "curry bestellen Den Haag", "halal delivery Den Haag"
Already Tried: Delivery that arrives cold, third party apps with long wait times
Language: English
Tone Notes: Convenient and reassuring. Same quality, delivered.
Schema Type: Service + FAQPage
Word Count: 600 to 900
CTA Goal: Order online now
Available Proof: 4.9 stars 800+ reviews, halal certified, same kitchen, Leyweg 986, online ordering available
Do Not Include: delivery time guarantees unless verified, delivery radius claims unless confirmed
```

---

## PROMPT 27 — INDIAN TAKEAWAY PAGE

```
Read CLAUDE.md, SEO-BRIEF.md, and sitemap.md from the project root.
Then read .claude/DESIGN-SYSTEM.md.
Then use the seo-copywriting skill.

Write long-form SEO copy for the Indian Takeaway page and update the file at:
src/app/[locale]/indian-takeaway-den-haag/page.tsx

Follow the existing bilingual EN/NL pattern already in the file.
Never use em dashes. Never use contractions. Match the brand voice in SEO-BRIEF.md.
Include a GEO block: one self-contained 60-100 word paragraph that answers
"Can I order Indian takeaway from Chopras in Den Haag?" without needing surrounding context.
Update the meta description to exactly match the approved one in CLAUDE.md.

BRIEFING BLOCK:
Content Type: Service Page
Content Format: Takeaway SEO page
Client: Chopras Indian Restaurant Den Haag
Funnel Stage: BOFU
Awareness Level: Solution-Aware
Traffic Source: Organic
Search Intent: Transactional
Content Angle: Indian takeaway in Den Haag from a kitchen that does not cut corners for convenience orders. Same spices. Same standard. Collect from Leyweg 986.
Primary Keyword: Indian takeaway Den Haag
Secondary Keywords: Indiaas eten afhalen Den Haag, Indian food to go Den Haag, takeaway Indian restaurant Den Haag, Indian afhaal Den Haag
LSI / Related Terms: collection, pickup, afhalen, biryani takeaway, curry takeaway, halal takeaway, Leyweg 986
Internal Links: use sitemap.md
Audience: Den Haag residents who prefer to collect their food rather than dine in
Customer Language: "Indian takeaway Den Haag", "Indiaas eten afhalen", "pickup Indian food Den Haag"
Already Tried: Takeaway that is worse quality than dining in, slow collection wait times
Language: English
Tone Notes: Fast and practical. This audience is decision-ready. Make ordering easy.
Schema Type: Service + FAQPage
Word Count: 500 to 800
CTA Goal: Order online for collection
Available Proof: 4.9 stars 800+ reviews, halal certified, Leyweg 986, online ordering, same kitchen standard
Do Not Include: wait time guarantees, competitor names
```

---

## PROMPT 28 — NEAR DELFT PAGE

```
Read CLAUDE.md, SEO-BRIEF.md, and sitemap.md from the project root.
Then read .claude/DESIGN-SYSTEM.md.
Then use the seo-copywriting skill.

Write long-form SEO copy for the Near Delft location page and update the file at:
src/app/[locale]/indian-restaurant-delft/page.tsx

Follow the existing bilingual EN/NL pattern already in the file.
Never use em dashes. Never use contractions. Match the brand voice in SEO-BRIEF.md.
Include a GEO block: one self-contained 60-100 word paragraph that answers
"Is there a good Indian restaurant near Delft?" without needing surrounding context.
Update the meta description to exactly match the approved one in CLAUDE.md.

BRIEFING BLOCK:
Content Type: Location Page
Content Format: Location proximity SEO page
Client: Chopras Indian Restaurant Den Haag
Funnel Stage: BOFU
Awareness Level: Solution-Aware
Traffic Source: Organic
Search Intent: Commercial
Content Angle: Indian restaurant near Delft. 15 minutes via the A13. The best Indian food in the region does not require a search in the city centre. It requires a short drive to Leyweg 986.
Primary Keyword: Indian restaurant Delft
Secondary Keywords: Indian food Delft, Indiaas restaurant Delft, halal Indian restaurant Delft, best Indian near Delft
LSI / Related Terms: TU Delft, Delft city centre, A13, 15 minutes, South Holland Indian restaurant, Den Haag from Delft, halal food Delft area
Internal Links: use sitemap.md
Audience: Delft residents and TU Delft students looking for Indian food in the region
Customer Language: "Indian restaurant near Delft", "Indian food Delft", "Indiaas restaurant Delft"
Already Tried: Indian restaurants in Delft that do not match expectations
Language: English
Tone Notes: Reassuring about the short distance. Make the drive feel worth it before they arrive.
Schema Type: LocalBusiness + FAQPage
Word Count: 700 to 1000
CTA Goal: Reserve a table or get directions
Available Proof: 4.9 stars 800+ reviews, 15 minutes from Delft via A13, halal certified, Leyweg 986, 143 dishes
Do Not Include: negative references to Delft restaurants, unverified distance claims
```

---

## PROMPT 29 — NEAR RIJSWIJK PAGE

```
Read CLAUDE.md, SEO-BRIEF.md, and sitemap.md from the project root.
Then read .claude/DESIGN-SYSTEM.md.
Then use the seo-copywriting skill.

Write long-form SEO copy for the Near Rijswijk location page and update the file at:
src/app/[locale]/indian-restaurant-rijswijk/page.tsx

Follow the existing bilingual EN/NL pattern already in the file.
Never use em dashes. Never use contractions. Match the brand voice in SEO-BRIEF.md.
Include a GEO block: one self-contained 60-100 word paragraph that answers
"Is there a good Indian restaurant near Rijswijk?" without needing surrounding context.
Update the meta description to exactly match the approved one in CLAUDE.md.

BRIEFING BLOCK:
Content Type: Location Page
Content Format: Location proximity SEO page
Client: Chopras Indian Restaurant Den Haag
Funnel Stage: BOFU
Awareness Level: Solution-Aware
Traffic Source: Organic
Search Intent: Commercial
Content Angle: Indian restaurant near Rijswijk. Less than 5 minutes from the Rijswijk border. The largest Hindustani community in the Netherlands is here and Chopras was built for exactly this audience.
Primary Keyword: Indian restaurant Rijswijk
Secondary Keywords: Indian food Rijswijk, Indiaas restaurant Rijswijk, halal restaurant Rijswijk, best Indian near Rijswijk, Hindustani restaurant Rijswijk
LSI / Related Terms: Hindustani community, South Asian community Rijswijk, Leyweg, Den Haag, halal food Rijswijk area, 5 minutes, proximity
Internal Links: use sitemap.md
Audience: Rijswijk residents, South Asian and Hindustani community in Rijswijk
Customer Language: "Indian restaurant Rijswijk", "Indiaas eten Rijswijk", "halal restaurant Rijswijk"
Already Tried: Indian restaurants that do not meet the quality expectations of a community that grew up eating real Indian food
Language: English
Tone Notes: Community-aware. Acknowledge that Rijswijk has a South Asian community that knows the difference.
Schema Type: LocalBusiness + FAQPage
Word Count: 700 to 1000
CTA Goal: Reserve a table or get directions
Available Proof: 4.9 stars 800+ reviews, 5 minutes from Rijswijk, halal certified, Leyweg 986, 143 dishes, South Asian community focus
Do Not Include: offensive cultural references, unverified distance claims
```

---

## PROMPT 30 — NEAR ZOETERMEER PAGE

```
Read CLAUDE.md, SEO-BRIEF.md, and sitemap.md from the project root.
Then read .claude/DESIGN-SYSTEM.md.
Then use the seo-copywriting skill.

Write long-form SEO copy for the Near Zoetermeer location page and update the file at:
src/app/[locale]/indian-restaurant-zoetermeer/page.tsx

Follow the existing bilingual EN/NL pattern already in the file.
Never use em dashes. Never use contractions. Match the brand voice in SEO-BRIEF.md.
Include a GEO block: one self-contained 60-100 word paragraph that answers
"Is there a good Indian restaurant near Zoetermeer?" without needing surrounding context.
Update the meta description to exactly match the approved one in CLAUDE.md.

BRIEFING BLOCK:
Content Type: Location Page
Content Format: Location proximity SEO page
Client: Chopras Indian Restaurant Den Haag
Funnel Stage: BOFU
Awareness Level: Solution-Aware
Traffic Source: Organic
Search Intent: Commercial
Content Angle: Indian restaurant near Zoetermeer. 20 minutes via the A12. Worth the drive for 4.9 stars, 800+ reviews, and spices ground fresh that morning.
Primary Keyword: Indian restaurant Zoetermeer
Secondary Keywords: Indian food Zoetermeer, Indiaas restaurant Zoetermeer, halal Indian Zoetermeer, best Indian near Zoetermeer
LSI / Related Terms: A12, 20 minutes, South Holland, Hindustani community Zoetermeer, halal food Zoetermeer area
Internal Links: use sitemap.md
Audience: Zoetermeer residents including the large South Asian community looking for authentic Indian food
Customer Language: "Indian restaurant Zoetermeer", "Indiaas eten Zoetermeer", "halal restaurant Zoetermeer"
Already Tried: Local options in Zoetermeer that do not hit the mark
Language: English
Tone Notes: Make the 20-minute drive feel like a natural decision when the quality difference is explained.
Schema Type: LocalBusiness + FAQPage
Word Count: 700 to 1000
CTA Goal: Reserve a table or get directions
Available Proof: 4.9 stars 800+ reviews, 20 minutes via A12, halal certified, Leyweg 986, 143 dishes
Do Not Include: unverified distance claims, competitor names
```

---

## PROMPT 31 — NEAR PEACE PALACE PAGE

```
Read CLAUDE.md, SEO-BRIEF.md, and sitemap.md from the project root.
Then read .claude/DESIGN-SYSTEM.md.
Then use the seo-copywriting skill.

Write long-form SEO copy for the Near Peace Palace location page and update the file at:
src/app/[locale]/indian-restaurant-near-peace-palace-den-haag/page.tsx

Follow the existing bilingual EN/NL pattern already in the file.
Never use em dashes. Never use contractions. Match the brand voice in SEO-BRIEF.md.
Include a GEO block: one self-contained 60-100 word paragraph that answers
"Is there a good Indian restaurant near the Peace Palace in Den Haag?" without needing surrounding context.
Update the meta description to exactly match the approved one in CLAUDE.md.

BRIEFING BLOCK:
Content Type: Location Page
Content Format: Landmark proximity SEO page
Client: Chopras Indian Restaurant Den Haag
Funnel Stage: BOFU
Awareness Level: Solution-Aware
Traffic Source: Organic
Search Intent: Commercial
Content Angle: Indian restaurant near Peace Palace Den Haag. 10 minutes from Vredespaleis. For diplomats, legal professionals, and international visitors who want a reliable high-quality Indian dinner.
Primary Keyword: Indian restaurant near Peace Palace Den Haag
Secondary Keywords: Restaurant Vredespaleis Den Haag, Indian food Peace Palace area, eten bij Vredespaleis Den Haag, Indian restaurant diplomatenwijk Den Haag
LSI / Related Terms: Peace Palace, Vredespaleis, international court, diplomat, Den Haag international community, 10 minutes, Leyweg 986
Internal Links: use sitemap.md
Audience: Diplomats, international court professionals, tourists visiting Peace Palace, international community in Den Haag
Customer Language: "Indian restaurant near Peace Palace", "restaurant Vredespaleis Den Haag"
Already Tried: Tourist-area restaurants with average quality at inflated prices
Language: English
Tone Notes: Professional and polished. This audience expects quality and reliability.
Schema Type: LocalBusiness + FAQPage
Word Count: 700 to 1000
CTA Goal: Reserve a table
Available Proof: 4.9 stars 800+ reviews, 10 minutes from Peace Palace, halal certified, Leyweg 986, private hall for group dinners
Do Not Include: unverified distance claims, competitor names
```

---

## PROMPT 32 — NEAR DEN HAAG CENTRAAL PAGE

```
Read CLAUDE.md, SEO-BRIEF.md, and sitemap.md from the project root.
Then read .claude/DESIGN-SYSTEM.md.
Then use the seo-copywriting skill.

Write long-form SEO copy for the Near Den Haag Centraal location page and update the file at:
src/app/[locale]/indian-restaurant-near-den-haag-centraal/page.tsx

Follow the existing bilingual EN/NL pattern already in the file.
Never use em dashes. Never use contractions. Match the brand voice in SEO-BRIEF.md.
Include a GEO block: one self-contained 60-100 word paragraph that answers
"Is there a good Indian restaurant near Den Haag Centraal station?" without needing surrounding context.
Update the meta description to exactly match the approved one in CLAUDE.md.

BRIEFING BLOCK:
Content Type: Location Page
Content Format: Landmark proximity SEO page
Client: Chopras Indian Restaurant Den Haag
Funnel Stage: BOFU
Awareness Level: Solution-Aware
Traffic Source: Organic
Search Intent: Commercial
Content Angle: Indian restaurant near Den Haag Centraal. 15 minutes by tram. A proper dinner at Leyweg 986 is worth the short tram ride from the station.
Primary Keyword: Indian restaurant near Den Haag Centraal
Secondary Keywords: Restaurant Den Haag Centraal, Indian food near train station Den Haag, Indian restaurant station Den Haag
LSI / Related Terms: tram, 15 minutes, Leyweg 986, Den Haag Centraal, commuter dining, post-work dinner
Internal Links: use sitemap.md
Audience: Commuters, professionals arriving at Den Haag Centraal, tourists staying near the station
Customer Language: "Indian restaurant near Den Haag Centraal", "restaurant near train station Den Haag"
Already Tried: Station-area restaurants that are convenient but mediocre
Language: English
Tone Notes: Practical and rewarding. The short tram ride is the only friction. Eliminate it with proof of quality.
Schema Type: LocalBusiness + FAQPage
Word Count: 700 to 1000
CTA Goal: Reserve a table or get tram directions
Available Proof: 4.9 stars 800+ reviews, 15 minutes by tram, halal certified, Leyweg 986, 143 dishes
Do Not Include: unverified transport time claims
```

---

## PROMPT 33 — BESTE INDIAAS RESTAURANT PAGE (DUTCH)

```
Read CLAUDE.md, SEO-BRIEF.md, and sitemap.md from the project root.
Then read .claude/DESIGN-SYSTEM.md.
Then use the seo-copywriting skill.

Write long-form SEO copy for the Beste Indiaas Restaurant page and update the file at:
src/app/[locale]/beste-indiaas-restaurant-den-haag/page.tsx

This page is written ENTIRELY IN DUTCH. No English in the copy.
Never use em dashes. Never use contractions. Match the brand voice in SEO-BRIEF.md adapted for Dutch tone.
Include a GEO block in Dutch: one self-contained 60-100 word paragraph that answers
"Wat is het beste Indiaas restaurant in Den Haag?" without needing surrounding context.
Update the meta description to exactly match the approved Dutch one in CLAUDE.md.

BRIEFING BLOCK:
Content Type: Specialty Page
Content Format: Dutch reputation SEO page
Client: Chopras Indian Restaurant Den Haag
Funnel Stage: MOFU to BOFU
Awareness Level: Solution-Aware
Traffic Source: Organic
Search Intent: Commercial
Content Angle: Het beste Indiaas restaurant in Den Haag, niet omdat wij het zeggen, maar omdat 800+ gasten het hebben beoordeeld met 4.9 sterren op Google.
Primary Keyword: Beste Indiaas restaurant Den Haag
Secondary Keywords: Top Indiaas restaurant Den Haag, beste curry Den Haag, lekkerste Indiaas Den Haag, authentiek Indiaas Den Haag
LSI / Related Terms: 4.9 sterren, 800+ reviews, Google beoordelingen, TheFork, Tripadvisor, halal, vers gemalen specerijen, Leyweg 986
Internal Links: use sitemap.md
Audience: Dutch speakers in Den Haag searching for the best Indian restaurant in their language
Customer Language: "beste Indiaas restaurant Den Haag", "lekkerste Indiaas eten Den Haag"
Language: Dutch — write entirely in Dutch
Tone Notes: Bescheiden zeker. Laat de bewijzen spreken. Directe Nederlandse communicatiestijl.
Schema Type: LocalBusiness + FAQPage
Word Count: 900 to 1300
CTA Goal: Tafel reserveren of menu bekijken
Available Proof: 4.9 sterren 800+ Google reviews, 8.6 TheFork, Tripadvisor Excellent, halal gecertificeerd, vers gemalen specerijen dagelijks, 143 gerechten, Leyweg 986
Do Not Include: Engels in de copy, concurrent namen
```

---

## PROMPT 34 — FAMILY RESTAURANT PAGE

```
Read CLAUDE.md, SEO-BRIEF.md, and sitemap.md from the project root.
Then read .claude/DESIGN-SYSTEM.md.
Then use the seo-copywriting skill.

Write long-form SEO copy for the Family Restaurant page and update the file at:
src/app/[locale]/family-restaurant-den-haag/page.tsx

Follow the existing bilingual EN/NL pattern already in the file.
Never use em dashes. Never use contractions. Match the brand voice in SEO-BRIEF.md.
Include a GEO block: one self-contained 60-100 word paragraph that answers
"Is Chopras Indian Restaurant good for families with children in Den Haag?" without needing surrounding context.
Update the meta description to exactly match the approved one in CLAUDE.md.

BRIEFING BLOCK:
Content Type: Service Page
Content Format: Family dining SEO page
Client: Chopras Indian Restaurant Den Haag
Funnel Stage: MOFU to BOFU
Awareness Level: Solution-Aware
Traffic Source: Organic
Search Intent: Commercial
Content Angle: A family restaurant in Den Haag where every member of the table finds something. Kids menu, halal options, vegetarian dishes, mild to spicy choices, and space for a pram.
Primary Keyword: Family restaurant Den Haag
Secondary Keywords: Familierestaurant Den Haag, restaurant for families Den Haag, kid friendly restaurant Den Haag, gezinsrestaurant Den Haag
LSI / Related Terms: kids menu, child friendly, high chairs, pram friendly, mild curry, family dining, large tables, birthday celebration, Leyweg 986
Internal Links: use sitemap.md
Audience: Families with children in Den Haag looking for a welcoming restaurant that can accommodate everyone
Customer Language: "family restaurant Den Haag", "good for kids", "restaurant with kids menu Den Haag"
Already Tried: Restaurants that claim to be family friendly but cannot handle young children, no kids menu
Language: English
Tone Notes: Warm and inclusive. Every family member feels accounted for before they arrive.
Schema Type: LocalBusiness + FAQPage
Word Count: 700 to 1000
CTA Goal: Reserve a family table
Available Proof: 4.9 stars 800+ reviews, dedicated kids menu with surprise gift, mild to spicy options, halal certified, wheelchair accessible, Leyweg 986
Do Not Include: unverified child facility claims, competitor names
```

---

## PROMPT 35 — INDIAN FOOD NETHERLANDS PAGE

```
Read CLAUDE.md, SEO-BRIEF.md, and sitemap.md from the project root.
Then read .claude/DESIGN-SYSTEM.md.
Then use the seo-copywriting skill.

Write long-form SEO copy for the Indian Food Netherlands page and update the file at:
src/app/[locale]/indian-food-netherlands/page.tsx

Follow the existing bilingual EN/NL pattern already in the file.
Never use em dashes. Never use contractions. Match the brand voice in SEO-BRIEF.md.
Include a GEO block: one self-contained 60-100 word paragraph that answers
"Where can I find authentic Indian food in the Netherlands?" without needing surrounding context.
Update the meta description to exactly match the approved one in CLAUDE.md.

BRIEFING BLOCK:
Content Type: Specialty Page
Content Format: National authority SEO page
Client: Chopras Indian Restaurant Den Haag
Funnel Stage: TOFU to MOFU
Awareness Level: Problem-Aware
Traffic Source: Organic
Search Intent: Commercial + Informational
Content Angle: Authentic Indian food in the Netherlands is rare. Most restaurants adapt to Dutch tastes. Chopras Indian Restaurant in Den Haag does not.
Primary Keyword: Authentic Indian food Netherlands
Secondary Keywords: Indian restaurant Netherlands, best Indian food Netherlands, Indiaas eten Nederland, Indian cuisine Netherlands
LSI / Related Terms: South Holland, The Hague, North Indian food Netherlands, halal food Netherlands, expat Indian food, Surinamese community, Hindustani community
Internal Links: use sitemap.md
Audience: People across the Netherlands searching for authentic Indian food, expats, Indian community, tourists
Customer Language: "authentic Indian food Netherlands", "best Indian restaurant Netherlands", "real Indian food Holland"
Already Tried: Indian restaurants across the Netherlands that water down spices or adapt recipes for local taste
Language: English
Tone Notes: Confident and educational. Position Den Haag as the best destination for Indian food in the Netherlands.
Schema Type: LocalBusiness + FAQPage
Word Count: 900 to 1300
CTA Goal: Visit Chopras at Leyweg 986
Available Proof: 4.9 stars 800+ reviews, spices from India, halal certified, 143 dishes, private hall, Tripadvisor Excellent, TheFork 8.6, Leyweg 986
Do Not Include: competitor names, unverifiable national claims
```

---

## PROMPT 36 — BLOG: BEST INDIAN RESTAURANT DEN HAAG

```
Read CLAUDE.md, SEO-BRIEF.md, and sitemap.md from the project root.
Then read .claude/DESIGN-SYSTEM.md.
Then use the seo-copywriting skill.

Write long-form SEO blog copy for the Best Indian Restaurant blog post.
IMPORTANT: Blog content and meta descriptions live in src/lib/blog-data.ts — NOT in page.tsx.
Update the content, metaDescription, and any relevant fields for slug: best-indian-restaurant-den-haag
directly inside src/lib/blog-data.ts.

Never use em dashes. Never use contractions. Match the brand voice in SEO-BRIEF.md.
Blog tone: editorial and authoritative, not a sales page. Earn the Chopras mention through context.
Include a GEO block: one self-contained 60-100 word paragraph answering
"What makes the best Indian restaurant in Den Haag?" without needing surrounding context.
Update the meta description to exactly match the approved one in CLAUDE.md.

BRIEFING BLOCK:
Content Type: Blog Article
Content Format: Authority blog post
Client: Chopras Indian Restaurant Den Haag
Funnel Stage: TOFU
Awareness Level: Problem-Aware
Traffic Source: Organic
Search Intent: Informational
Content Angle: What actually makes the best Indian restaurant in Den Haag, and why the answer comes down to three things that most restaurants skip.
Primary Keyword: Best Indian restaurant Den Haag
Secondary Keywords: Top Indian restaurant The Hague, authentic Indian food Den Haag review, best curry Den Haag 2026, Indian restaurant review Den Haag
LSI / Related Terms: spice freshness, halal certification, tandoor temperature, review volume, 4.9 stars, 800+ reviews, Leyweg 986, North Indian cuisine
Internal Links: use sitemap.md
Audience: People researching Indian restaurants in Den Haag before deciding where to go
Customer Language: "best Indian restaurant Den Haag", "where to eat Indian in Den Haag", "top Indian food The Hague"
Language: English
Tone Notes: Authoritative and genuine. This is editorial content, not a sales page. Educate first. The Chopras mention is earned through context, not pushed.
Schema Type: Article + FAQPage
Word Count: 1500 to 2000
CTA Goal: Soft CTA — visit Chopras Indian Restaurant at Leyweg 986
Available Proof: 4.9 stars 800+ reviews, TheFork 8.6, Tripadvisor Excellent, fresh spices daily, 400 degree tandoor, halal certified, 143 dishes
Do Not Include: competitor names directly, hard sales language
```

---

## PROMPT 37 — BLOG: HALAL INDIAN RESTAURANT DEN HAAG

```
Read CLAUDE.md, SEO-BRIEF.md, and sitemap.md from the project root.
Then read .claude/DESIGN-SYSTEM.md.
Then use the seo-copywriting skill.

Write long-form SEO blog copy for the Halal Indian Restaurant blog post.
IMPORTANT: Blog content and meta descriptions live in src/lib/blog-data.ts — NOT in page.tsx.
Update the content, metaDescription, and any relevant fields for slug: halal-indian-restaurant-den-haag
directly inside src/lib/blog-data.ts.

Never use em dashes. Never use contractions. Match the brand voice in SEO-BRIEF.md.
Include a GEO block: one self-contained 60-100 word paragraph answering
"How do I find a genuinely halal Indian restaurant in Den Haag?" without needing surrounding context.
Update the meta description to exactly match the approved one in CLAUDE.md.

BRIEFING BLOCK:
Content Type: Blog Article
Content Format: Authority blog post
Client: Chopras Indian Restaurant Den Haag
Funnel Stage: TOFU to MOFU
Awareness Level: Problem-Aware
Traffic Source: Organic
Search Intent: Informational
Content Angle: How to find a genuinely halal Indian restaurant in Den Haag, and the three questions you should ask before you sit down.
Primary Keyword: Halal Indian restaurant Den Haag
Secondary Keywords: Halal food Den Haag, halal certified Indian restaurant Den Haag, Muslim friendly Indian restaurant Den Haag
LSI / Related Terms: halal certification, cross-contamination, halal supplier, Muslim dining, whole kitchen halal, halal biryani, halal tandoori, Den Haag
Internal Links: use sitemap.md
Audience: Muslim families and individuals in Den Haag researching halal Indian restaurants
Customer Language: "halal Indian restaurant Den Haag", "100% halal", "certified halal restaurant Den Haag"
Already Tried: Restaurants claiming halal with no clear certification, menus where only some dishes are halal
Language: English
Tone Notes: Informative and honest. This audience has been burned before. Give them the framework to ask the right questions, then show Chopras answers all of them.
Schema Type: Article + FAQPage
Word Count: 1200 to 1800
CTA Goal: Soft CTA — visit Chopras for fully certified halal Indian food
Available Proof: Full kitchen halal certified, all suppliers halal certified, 143 dishes all halal, 4.9 stars 800+ reviews, Leyweg 986
Do Not Include: competitor names, vague halal claims
```

---

## PROMPT 38 — BLOG: INDIAAS CATERING DEN HAAG (DUTCH)

```
Read CLAUDE.md, SEO-BRIEF.md, and sitemap.md from the project root.
Then read .claude/DESIGN-SYSTEM.md.
Then use the seo-copywriting skill.

Write long-form SEO blog copy in DUTCH for the Indiaas Catering blog post.
IMPORTANT: Blog content and meta descriptions live in src/lib/blog-data.ts — NOT in page.tsx.
Update the content, metaDescription, and any relevant fields for slug: indiaas-catering-den-haag
directly inside src/lib/blog-data.ts.

This blog post is written ENTIRELY IN DUTCH. No English in the copy.
Never use em dashes. Never use contractions.
Include a GEO block in Dutch: one self-contained 60-100 word paragraph answering
"Hoe vind ik goede Indiaas catering in Den Haag?" without needing surrounding context.
Update the meta description to exactly match the approved Dutch one in CLAUDE.md.

BRIEFING BLOCK:
Content Type: Blog Article
Content Format: Dutch authority blog post
Client: Chopras Indian Restaurant Den Haag
Funnel Stage: TOFU to MOFU
Awareness Level: Problem-Aware
Traffic Source: Organic
Search Intent: Informational
Content Angle: Indiaas catering in Den Haag, waar op letten, welke vragen te stellen, en waarom de keuze van cateraar uw evenement kan maken of breken.
Primary Keyword: Indiaas catering Den Haag
Secondary Keywords: Indian catering bedrijfsfeest Den Haag, catering voor evenementen Den Haag, Indiaas catering bestellen, Indiaas buffet catering Den Haag
LSI / Related Terms: halal catering, bruiloft catering, bedrijfsfeest eten, Indiaas buffet, catering kwaliteit, Leyweg 986, vers bereid, warme gerechten
Internal Links: use sitemap.md
Audience: Dutch-speaking event organisers in Den Haag researching Indian catering options
Customer Language: "Indiaas catering Den Haag", "catering voor Indiaas feest", "Indiaas eten bestellen voor feest"
Language: Dutch — write entirely in Dutch
Tone Notes: Informatief en praktisch. Directe Nederlandse communicatiestijl.
Schema Type: Article + FAQPage
Word Count: 1200 to 1600
CTA Goal: Zachte CTA — offerte aanvragen bij Chopras Indian Restaurant
Available Proof: 4.9 sterren 800+ reviews, halal gecertificeerd, 25 tot 80 gasten, Leyweg 986, zelfde keuken als het restaurant
Do Not Include: Engels in de copy, concurrent namen
```

---

## PROMPT 39 — BLOG: VEGETARIAN INDIAN FOOD DEN HAAG

```
Read CLAUDE.md, SEO-BRIEF.md, and sitemap.md from the project root.
Then read .claude/DESIGN-SYSTEM.md.
Then use the seo-copywriting skill.

Write long-form SEO blog copy for the Vegetarian Indian Food blog post.
IMPORTANT: Blog content and meta descriptions live in src/lib/blog-data.ts — NOT in page.tsx.
Update the content, metaDescription, and any relevant fields for slug: vegetarian-indian-food-den-haag
directly inside src/lib/blog-data.ts.

Never use em dashes. Never use contractions. Match the brand voice in SEO-BRIEF.md.
Include a GEO block: one self-contained 60-100 word paragraph answering
"Where can I find good vegetarian Indian food in Den Haag?" without needing surrounding context.
Update the meta description to exactly match the approved one in CLAUDE.md.

BRIEFING BLOCK:
Content Type: Blog Article
Content Format: Authority blog post
Client: Chopras Indian Restaurant Den Haag
Funnel Stage: TOFU
Awareness Level: Problem-Aware
Traffic Source: Organic
Search Intent: Informational
Content Angle: The best vegetarian Indian food in Den Haag, and why Indian cuisine is actually one of the world's great vegetarian traditions, not a compromise.
Primary Keyword: Vegetarian Indian food Den Haag
Secondary Keywords: Vegan Indian food Den Haag, vegetarisch Indiaas Den Haag, plant based Indian restaurant Den Haag
LSI / Related Terms: dal makhani, chana masala, paneer, soya chaap, aloo gobi, baingan bharta, vegetarian curry, vegan Indian, North Indian vegetarian, Leyweg 986
Internal Links: use sitemap.md
Audience: Vegetarians and vegans in Den Haag looking for genuinely good Indian vegetarian food
Customer Language: "vegetarian Indian food Den Haag", "good vegetarian Indian restaurant Den Haag", "vegan Indian food Den Haag"
Already Tried: Vegetarian menus at Indian restaurants limited to three options
Language: English
Tone Notes: Celebratory and specific about dishes. North Indian vegetarian cuisine is vast and complex. Show that Chopras understands this.
Schema Type: Article + FAQPage
Word Count: 1200 to 1800
CTA Goal: Soft CTA — explore the vegetarian and vegan menu at Chopras
Available Proof: 4.9 stars 800+ reviews, dedicated vegetarian section, soya chaap, dal makhani, chana masala, paneer dishes, vegan options clearly labelled, Leyweg 986
Do Not Include: preachy messaging, unverifiable health claims
```

---

## PROMPT 40 — BLOG: INDIAN STREET FOOD DEN HAAG

```
Read CLAUDE.md, SEO-BRIEF.md, and sitemap.md from the project root.
Then read .claude/DESIGN-SYSTEM.md.
Then use the seo-copywriting skill.

Write long-form SEO blog copy for the Indian Street Food blog post.
IMPORTANT: Blog content and meta descriptions live in src/lib/blog-data.ts — NOT in page.tsx.
Update the content, metaDescription, and any relevant fields for slug: indian-street-food-den-haag
directly inside src/lib/blog-data.ts.

Never use em dashes. Never use contractions. Match the brand voice in SEO-BRIEF.md.
Include a GEO block: one self-contained 60-100 word paragraph answering
"Where can I find authentic Indian street food in Den Haag?" without needing surrounding context.
Update the meta description to exactly match the approved one in CLAUDE.md.

BRIEFING BLOCK:
Content Type: Blog Article
Content Format: Authority blog post
Client: Chopras Indian Restaurant Den Haag
Funnel Stage: TOFU
Awareness Level: Unaware to Problem-Aware
Traffic Source: Organic
Search Intent: Informational
Content Angle: Indian street food in Den Haag. What it is, why it is different from Indian restaurant food, and where to find the real thing without a flight to Mumbai.
Primary Keyword: Indian street food Den Haag
Secondary Keywords: Chaat Den Haag, samosa Den Haag, pani puri Den Haag, Indiaas streetfood Den Haag, aloo tikki Den Haag
LSI / Related Terms: golgappa, papdi chaat, dahi puri, samosa chaat, tamarind chutney, mint chutney, Mumbai street food, Delhi chaat, Leyweg 986
Internal Links: use sitemap.md
Audience: Food curious Den Haag residents who want to explore beyond curry and naan, expats who miss street food
Customer Language: "Indian street food Den Haag", "chaat Den Haag", "pani puri Den Haag"
Language: English
Tone Notes: Vivid and exploratory. Food journalism energy. Make them feel the heat of a Mumbai street before they arrive at Leyweg 986.
Schema Type: Article + FAQPage
Word Count: 1200 to 1800
CTA Goal: Soft CTA — try the street food selection at Chopras
Available Proof: 4.9 stars 800+ reviews, pani puri, papdi chaat, dahi puri, aloo tikki, samosa chaat all on menu, Leyweg 986
Do Not Include: competitor names, unverifiable origin stories
```

---

## PROMPT 41 — CONTACT PAGE

```
Read CLAUDE.md, SEO-BRIEF.md, and sitemap.md from the project root.
Then read .claude/DESIGN-SYSTEM.md.
Then use the seo-copywriting skill.

Write SEO copy for the Contact page and update the file at:
src/app/[locale]/contact/page.tsx

Follow the existing bilingual EN/NL pattern already in the file.
Never use em dashes. Never use contractions.
This is a utility page. Keep copy clean, functional, and welcoming. No padding.
Include a GEO block: one self-contained 60-100 word paragraph answering
"How do I contact or reserve at Chopras Indian Restaurant Den Haag?" without needing surrounding context.
Update the meta description to exactly match the approved one in CLAUDE.md.

BRIEFING BLOCK:
Content Type: Contact Page
Content Format: Contact and reservation SEO page
Client: Chopras Indian Restaurant Den Haag
Funnel Stage: BOFU
Awareness Level: Product-Aware
Traffic Source: Organic + Direct
Search Intent: Navigational
Content Angle: Every question about visiting Chopras Indian Restaurant answered in one place. Address, hours, reservation, parking, and getting there.
Primary Keyword: Chopras Indian Restaurant Den Haag contact
Secondary Keywords: Indian restaurant Leyweg Den Haag, tafel reserveren Indiaas restaurant Den Haag, Chopras openingstijden
LSI / Related Terms: Leyweg 986, Den Haag, +31 6 30645930, info@chopras.nl, Tuesday to Sunday, 16:30 to 22:30, tram directions
Internal Links: use sitemap.md
Audience: People who are ready to visit or book, they just need the practical information
Language: English
Tone Notes: Clear and welcoming. Give them everything they need in the first scroll. No padding.
Schema Type: LocalBusiness + FAQPage
Word Count: 400 to 700
CTA Goal: Reserve a table, call, or get directions
Available Proof: Leyweg 986 2545 GW Den Haag, +31 6 30645930, info@chopras.nl, Tuesday to Sunday 16:30 to 22:30, Monday closed
Do Not Include: excessive marketing copy on this page
```

---

## PROMPT 42 — VACANCY PAGE

```
Read CLAUDE.md, SEO-BRIEF.md, and sitemap.md from the project root.
Then read .claude/DESIGN-SYSTEM.md.
Then use the seo-copywriting skill.

Write SEO copy for the Vacancy page and update the file at:
src/app/[locale]/vacancy/page.tsx

Follow the existing bilingual EN/NL pattern already in the file.
Never use em dashes. Never use contractions. Match the brand voice in SEO-BRIEF.md.
Include a GEO block: one self-contained 60-100 word paragraph answering
"Is Chopras Indian Restaurant in Den Haag hiring?" without needing surrounding context.
Update the meta description to exactly match the approved one in CLAUDE.md.

BRIEFING BLOCK:
Content Type: Vacancy Page
Content Format: Jobs SEO page
Client: Chopras Indian Restaurant Den Haag
Funnel Stage: BOFU
Awareness Level: Solution-Aware
Traffic Source: Organic
Search Intent: Transactional
Content Angle: Join the team behind Den Haag's highest-rated Indian restaurant. If you care about food as much as we do, there is a place for you at Leyweg 986.
Primary Keyword: Vacature Indiaas restaurant Den Haag
Secondary Keywords: Werken restaurant Den Haag, kok vacature Den Haag, bediening vacature Den Haag, vacancy Indian restaurant Den Haag
LSI / Related Terms: kitchen staff, front of house, chef, catering assistant, Leyweg 986, Den Haag hospitality jobs
Internal Links: use sitemap.md
Audience: Job seekers in the Den Haag hospitality sector looking for restaurant work
Customer Language: "vacature restaurant Den Haag", "werken bij Indiaas restaurant", "kok vacature Den Haag"
Language: English with Dutch vacancy terms naturally included
Tone Notes: Warm and standards-driven. The best candidates want to work somewhere that takes quality seriously. Lead with that.
Schema Type: LocalBusiness + FAQPage
Word Count: 500 to 800
CTA Goal: Apply for a position at Chopras
Available Proof: 4.9 stars 800+ reviews, Leyweg 986, established 2023, growing restaurant, catering operation
Do Not Include: specific salary claims unless confirmed, false vacancy counts
```

---

## PROMPT 43 — FULL MENU PAGE

```
Read CLAUDE.md, SEO-BRIEF.md, and sitemap.md from the project root.
Then read .claude/DESIGN-SYSTEM.md.
Then use the seo-copywriting skill.

Write long-form SEO copy for the full Menu page and update the file at:
src/app/[locale]/menu/page.tsx

Note: This is the same file as Prompt 02 but covers the full menu treatment including all 13 categories.
If Prompt 02 has already been completed, review what was written and expand to include
category-by-category navigation copy and dish highlights per section.

Follow the existing bilingual EN/NL pattern already in the file.
Never use em dashes. Never use contractions. Match the brand voice in SEO-BRIEF.md.
Include a GEO block: one self-contained 60-100 word paragraph answering
"What dishes does Chopras Indian Restaurant serve in Den Haag?" without needing surrounding context.
Update the meta description to exactly match the approved one in CLAUDE.md.

BRIEFING BLOCK:
Content Type: Menu Page
Content Format: Full menu SEO page
Client: Chopras Indian Restaurant Den Haag
Funnel Stage: MOFU
Awareness Level: Solution-Aware
Traffic Source: Organic
Search Intent: Commercial + Informational
Content Angle: 143 dishes. 13 categories. Every spice sourced from India and ground fresh before service. This is what a complete Indian restaurant menu looks like.
Primary Keyword: Indian restaurant menu Den Haag
Secondary Keywords: Indiaas menu Den Haag, halal menu Den Haag, vegetarian menu Indian restaurant Den Haag, Indian food menu The Hague, menu Chopras Indian Restaurant
LSI / Related Terms: starters, tandoori, curries, biryani, breads, rice, desserts, drinks, halal certified, vegetarian, vegan, Indo Chinese, 143 dishes, Leyweg
Internal Links: use sitemap.md
Audience: Visitors exploring the full menu before deciding to visit, order, or book catering
Customer Language: "Chopras menu", "Indian menu Den Haag", "what does Chopras serve", "full Indian menu Den Haag"
Language: English
Tone Notes: Knowledgeable guide. Lead with highlights per category. Help them find their dish in 143 options without overwhelming them.
Schema Type: Menu + MenuSection + MenuItem + FAQPage
Word Count: 800 to 1200
CTA Goal: Dine in, order online, or view individual dish pages
Available Proof: 143 dishes, 13 categories, halal certified, vegetarian and vegan labelled, Indo Chinese exclusive in Den Haag, spices ground fresh daily, 4.9 stars 800+ reviews, Leyweg 986
Do Not Include: individual dish prices, competitor menu comparisons
```

---

## PROMPT 44 — NEAR LEIDSCHENDAM LOCATION PAGE

```
Read CLAUDE.md, SEO-BRIEF.md, and sitemap.md from the project root.
Then read .claude/DESIGN-SYSTEM.md.
Then use the seo-copywriting skill.

Create a new location page at:
src/app/[locale]/indian-restaurant-leidschendam/page.tsx

Use src/app/[locale]/indian-restaurant-rijswijk/page.tsx as the structural reference.
Follow the existing bilingual EN/NL pattern.
Never use em dashes. Never use contractions. Match the brand voice in SEO-BRIEF.md.
Include a GEO block: one self-contained 60-100 word paragraph answering
"Is there an Indian restaurant near Leidschendam?" without needing surrounding context.
Update the meta description to exactly match the approved one in CLAUDE.md.

BRIEFING BLOCK:
Content Type: Location Page
Content Format: Local SEO proximity page
Client: Chopras Indian Restaurant Den Haag
Funnel Stage: TOFU to MOFU
Awareness Level: Problem-Aware
Traffic Source: Organic
Search Intent: Commercial
Content Angle: Leidschendam residents searching for a good Indian restaurant are 10 minutes from Den Haag's highest-rated one. Chopras Indian Restaurant at Leyweg 986 serves the Leidschendam area.
Primary Keyword: Indian restaurant Leidschendam
Secondary Keywords: Indiaas restaurant Leidschendam, halal restaurant Leidschendam, beste Indiaas eten Leidschendam, Indian food near Leidschendam
LSI / Related Terms: Leyweg 986, Den Haag, 10 minutes, A4 motorway, Hindostaanse gemeenschap, halal certified, 4.9 stars, 143 dishes, Voorburg border
Internal Links: use sitemap.md
Audience: Leidschendam residents and visitors looking for Indian food nearby
Customer Language: "Indian restaurant Leidschendam", "Indiaas eten Leidschendam", "halal restaurant bij Leidschendam"
Language: English (bilingual EN/NL)
Tone Notes: Local and specific. Name the route, the travel time, the community connection. No generic "near you" language.
Schema Type: LocalBusiness + FAQPage
Word Count: 700 to 1000
CTA Goal: Visit Chopras at Leyweg 986 Den Haag
Available Proof: 4.9 stars 800+ reviews, 143 dishes, halal certified, Leyweg 986, 10 minutes from Leidschendam, TheFork 8.6, Tripadvisor Excellent
Do Not Include: competitor names, unverifiable travel time claims beyond 10-15 minutes

MANDATORY CHECKS BEFORE COMMITTING:
1. Page file created at src/app/[locale]/indian-restaurant-leidschendam/page.tsx
2. faqsEn and faqsNl defined as module-level constants, 4-5 questions each
3. FaqAccordion rendered with getFaqPageSchema JsonLd (no date parameters)
4. GEO block visible with question-format H2, 60-100 words, 2 inline Links
5. H2/H3 use font-vibes — NEVER font-heading for subheadings
6. Minimum 8 inline links using className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold"
7. const base = locale === 'nl' ? '/nl' : '' — NEVER use /${locale}
8. Meta description matches CLAUDE.md exactly
9. Run pnpm build — zero errors before git add, commit, push
```

---

## PROMPT 45 — NEAR VOORBURG LOCATION PAGE

```
Read CLAUDE.md, SEO-BRIEF.md, and sitemap.md from the project root.
Then read .claude/DESIGN-SYSTEM.md.
Then use the seo-copywriting skill.

Create a new location page at:
src/app/[locale]/indian-restaurant-voorburg/page.tsx

Use src/app/[locale]/indian-restaurant-rijswijk/page.tsx as the structural reference.
Follow the existing bilingual EN/NL pattern.
Never use em dashes. Never use contractions. Match the brand voice in SEO-BRIEF.md.
Include a GEO block: one self-contained 60-100 word paragraph answering
"Is there an Indian restaurant near Voorburg?" without needing surrounding context.
Update the meta description to exactly match the approved one in CLAUDE.md.

BRIEFING BLOCK:
Content Type: Location Page
Content Format: Local SEO proximity page
Client: Chopras Indian Restaurant Den Haag
Funnel Stage: TOFU to MOFU
Awareness Level: Problem-Aware
Traffic Source: Organic
Search Intent: Commercial
Content Angle: Voorburg sits directly on the border of Den Haag. Chopras Indian Restaurant at Leyweg 986 is 5 minutes away — the closest high-rated Indian restaurant to Voorburg residents.
Primary Keyword: Indian restaurant Voorburg
Secondary Keywords: Indiaas restaurant Voorburg, halal restaurant Voorburg, beste Indiaas eten Voorburg, Indian food near Voorburg
LSI / Related Terms: Leyweg 986, 5 minutes, tram line, Hindostaanse gemeenschap, halal certified, 4.9 stars, 143 dishes, Den Haag border, Leidschendam-Voorburg gemeente
Internal Links: use sitemap.md
Audience: Voorburg residents searching for Indian food — very close proximity, strong conversion intent
Customer Language: "Indian restaurant Voorburg", "Indiaas eten Voorburg", "halal restaurant Voorburg"
Language: English (bilingual EN/NL)
Tone Notes: Proximity is the angle. Voorburg is Den Haag's closest neighbour. Make the 5-minute distance feel like no decision at all.
Schema Type: LocalBusiness + FAQPage
Word Count: 700 to 1000
CTA Goal: Visit Chopras at Leyweg 986 Den Haag
Available Proof: 4.9 stars 800+ reviews, 143 dishes, halal certified, Leyweg 986, 5 minutes from Voorburg, TheFork 8.6, Tripadvisor Excellent
Do Not Include: competitor names, unverifiable travel time claims

MANDATORY CHECKS BEFORE COMMITTING:
1. Page file created at src/app/[locale]/indian-restaurant-voorburg/page.tsx
2. faqsEn and faqsNl defined as module-level constants, 4-5 questions each
3. FaqAccordion rendered with getFaqPageSchema JsonLd (no date parameters)
4. GEO block visible with question-format H2, 60-100 words, 2 inline Links
5. H2/H3 use font-vibes — NEVER font-heading for subheadings
6. Minimum 8 inline links using className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold"
7. const base = locale === 'nl' ? '/nl' : '' — NEVER use /${locale}
8. Meta description matches CLAUDE.md exactly
9. Run pnpm build — zero errors before git add, commit, push
```

---

## PROMPT 46 — NEAR WESTLAND LOCATION PAGE

```
Read CLAUDE.md, SEO-BRIEF.md, and sitemap.md from the project root.
Then read .claude/DESIGN-SYSTEM.md.
Then use the seo-copywriting skill.

Create a new location page at:
src/app/[locale]/indian-restaurant-westland/page.tsx

Use src/app/[locale]/indian-restaurant-zoetermeer/page.tsx as the structural reference.
Follow the existing bilingual EN/NL pattern.
Never use em dashes. Never use contractions. Match the brand voice in SEO-BRIEF.md.
Include a GEO block: one self-contained 60-100 word paragraph answering
"Is there an Indian restaurant near Westland?" without needing surrounding context.
Update the meta description to exactly match the approved one in CLAUDE.md.

BRIEFING BLOCK:
Content Type: Location Page
Content Format: Local SEO proximity page
Client: Chopras Indian Restaurant Den Haag
Funnel Stage: TOFU to MOFU
Awareness Level: Problem-Aware
Traffic Source: Organic
Search Intent: Commercial
Content Angle: Westland is a large municipality west of Den Haag with no comparable Indian restaurant. Chopras Indian Restaurant at Leyweg 986 is 20 minutes via the N211 — the closest high-rated Indian restaurant to the area.
Primary Keyword: Indian restaurant Westland
Secondary Keywords: Indiaas restaurant Westland, halal restaurant Westland, Indian food near Westland, beste Indiaas eten Westland
LSI / Related Terms: Leyweg 986, 20 minutes, N211, Naaldwijk, Monster, De Lier, halal certified, 4.9 stars, 143 dishes, Hoek van Holland, greenhouse region
Internal Links: use sitemap.md
Audience: Westland residents who rarely have access to authentic Indian food locally — high unmet demand
Customer Language: "Indian restaurant Westland", "Indiaas eten Westland", "halal restaurant bij Westland"
Language: English (bilingual EN/NL)
Tone Notes: Address the lack of authentic Indian food in the Westland area directly. The 20-minute drive becomes worth it when the alternative is no real Indian food at all.
Schema Type: LocalBusiness + FAQPage
Word Count: 700 to 1000
CTA Goal: Visit Chopras at Leyweg 986 Den Haag
Available Proof: 4.9 stars 800+ reviews, 143 dishes, halal certified, Leyweg 986, 20 minutes from Westland, TheFork 8.6, Tripadvisor Excellent
Do Not Include: competitor names, claims about Westland restaurants, unverifiable travel times beyond 20-25 minutes

MANDATORY CHECKS BEFORE COMMITTING:
1. Page file created at src/app/[locale]/indian-restaurant-westland/page.tsx
2. faqsEn and faqsNl defined as module-level constants, 4-5 questions each
3. FaqAccordion rendered with getFaqPageSchema JsonLd (no date parameters)
4. GEO block visible with question-format H2, 60-100 words, 2 inline Links
5. H2/H3 use font-vibes — NEVER font-heading for subheadings
6. Minimum 8 inline links using className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold"
7. const base = locale === 'nl' ? '/nl' : '' — NEVER use /${locale}
8. Meta description matches CLAUDE.md exactly
9. Run pnpm build — zero errors before git add, commit, push
```

---

*End of file. 46 prompts. Copy. Paste. Execute.*
