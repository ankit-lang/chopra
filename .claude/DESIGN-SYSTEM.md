---

# Chopras Indian Restaurant — Design System Rules
## These rules apply to EVERY page built on this website. No exceptions.

---

## BRAND COLORS

Primary gold: #C7A348
Primary gold hover: rgba(199, 163, 72, 0.3)
Primary gold subtle: rgba(199, 163, 72, 0.1)
Dark navy: #000066
Bright blue: #0000FF
White text primary: #FFFFFF
White text secondary: rgba(255, 255, 255, 0.7)
White text muted: rgba(255, 255, 255, 0.5)
Background light: #F7F8FC
Background warm: #FFFAF5

---

## TYPOGRAPHY

Hero H1:
- Font: Cormorant Garamond (font-heading)
- Size: text-4xl to text-7xl responsive
- Weight: font-bold
- Color: white on dark backgrounds, #1B2B5E on light backgrounds
- Line height: leading-tight

H2 headings (ALL pages, ALL backgrounds):
- Font: Great Vibes script (font-vibes) — ALWAYS, no exceptions
- Light/white/cream backgrounds: text-[#C7A348] — gold
- Dark/navy backgrounds: text-white — NEVER gold on dark
- Size: text-4xl md:text-5xl
- Line height: leading-[1.3]
- Margin bottom: mb-6
- Class (light bg): font-vibes text-4xl md:text-5xl text-[#C7A348] mb-6 leading-[1.3]
- Class (navy bg): font-vibes text-4xl md:text-5xl text-white mb-6 leading-[1.3]

H3 subheadings (ALL pages, ALL backgrounds):
- Font: Great Vibes script (font-vibes) — ALWAYS, no exceptions
- Light/white/cream backgrounds: text-[#C7A348] — gold
- Dark/navy backgrounds: text-white — NEVER gold on dark
- Size: text-3xl md:text-4xl
- Line height: leading-[1.3]
- Margin bottom: mb-4
- Class (light bg): font-vibes text-3xl md:text-4xl text-[#C7A348] mb-4 leading-[1.3]
- Class (navy bg): font-vibes text-3xl md:text-4xl text-white mb-4 leading-[1.3]

H4 subheadings (ALL pages, ALL backgrounds):
- Font: Great Vibes script (font-vibes) — ALWAYS, no exceptions
- Light/white/cream backgrounds: text-[#C7A348] — gold
- Dark/navy backgrounds: text-white
- Size: text-2xl md:text-3xl
- Line height: leading-[1.3]
- Margin bottom: mb-3
- Class (light bg): font-vibes text-2xl md:text-3xl text-[#C7A348] mb-3 leading-[1.3]
- Class (navy bg): font-vibes text-2xl md:text-3xl text-white mb-3 leading-[1.3]

NEVER use font-heading (Cormorant) for H2, H3, or H4. Cormorant is ONLY for H1.
NEVER use font-bold alone for H2/H3/H4.
NEVER use text-[#1B2B5E] on any heading on a light/white background.

Body copy:
- Font: DM Sans (font-body)
- Size: text-lg
- Line height: leading-relaxed
- Color on light backgrounds: text-[#1A1A1A]/70
- Color on navy/dark backgrounds: text-white/85
- Class (light bg): font-body text-[#1A1A1A]/70 text-lg leading-relaxed
- Class (navy bg): font-body text-white/85 text-lg leading-relaxed

---

## EYEBROW / OVERLINE COMPONENT

Every page hero section MUST have an eyebrow label above the H1.

Design specification:
- Centered dot-separator pill format: "• TEXT •"
- Font: uppercase, tracking-widest, text-xs, font-medium
- Color: #C7A348 (gold)
- Glassmorphism pill container: rounded-full border, subtle gold tint background, backdrop blur
- Margin bottom: 16px (mb-4) before the H1, or 24px (mb-6) for full-screen hero sections
- Example from homepage: "• AUTHENTIC INDIAN RESTAURANT · DEN HAAG · EST. 2023 •"

How to implement on each page:
Use this EXACT component pattern including the full glassmorphism pill container:
<div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-[#C7A348]/40 bg-white/10 backdrop-blur-sm mb-4">
  <span className="text-[#C7A348] text-xs font-medium uppercase tracking-widest">
    • [PAGE CATEGORY TEXT HERE] •
  </span>
</div>

For full-screen hero sections (video/canvas backgrounds), use mb-6 instead of mb-4 on the wrapper div.

NEVER use the lined format (h-px w-12 decorative lines) — that format is retired.
NEVER use Great Vibes script font for eyebrow labels.
NEVER use a plain div or span for an eyebrow without the glassmorphism pill container (rounded-full border border-[#C7A348]/40 bg-white/10 backdrop-blur-sm). Every eyebrow on every page must have the full pill container wrapper.

Eyebrow text per page type:
- Homepage: "• AUTHENTIC INDIAN RESTAURANT · DEN HAAG · EST. 2023 •"
- Menu page: "• OUR MENU · CHOPRAS INDIAN RESTAURANT · DEN HAAG •"
- Dish pages: "• OUR DISHES · CHOPRAS INDIAN RESTAURANT · DEN HAAG •"
- Catering pages: "• CATERING · CHOPRAS INDIAN RESTAURANT · DEN HAAG •"
- Location pages: "• NEAR YOU · CHOPRAS INDIAN RESTAURANT · DEN HAAG •"
- Blog pages: "• BLOG · CHOPRAS INDIAN RESTAURANT · DEN HAAG •"
- Feestzaal / party venue pages: "• FEESTZAAL · CHOPRAS INDIAN RESTAURANT · DEN HAAG •"
- Halal/Vegan/Menu pages: "• MENU · CHOPRAS INDIAN RESTAURANT · DEN HAAG •"
- Discover / best / family / netherlands pages: "• DISCOVER · CHOPRAS INDIAN RESTAURANT · DEN HAAG •"
- Vacancy: "• JOIN OUR TEAM · CHOPRAS INDIAN RESTAURANT · DEN HAAG •"
- Contact: "• VISIT US · CHOPRAS INDIAN RESTAURANT · DEN HAAG •"
- MeetTheFounder component: "• MEET THE FOUNDER •"
- ReviewsSection component: "• WHAT OUR GUESTS SAY •"

---

## CTA BUTTONS — UNIFIED STYLE

There are TWO variants. Choose based on background color.

DARK VARIANT (use on dark/navy/video/image backgrounds):
className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#C7A348] bg-white/10 px-6 py-3 text-white text-sm font-medium uppercase tracking-wide transition-all duration-200 ease-out hover:bg-[rgba(199,163,72,0.3)] active:scale-[0.98] min-h-[48px] backdrop-blur-[10px]"

LIGHT VARIANT (use on white/cream/light backgrounds):
className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#C7A348] bg-[rgba(199,163,72,0.1)] px-6 py-3 text-[#C7A348] text-sm font-medium uppercase tracking-wide transition-all duration-200 ease-out hover:bg-[#C7A348] hover:text-white active:scale-[0.98] min-h-[48px]"

SOLID VARIANT (use for primary CTA / form submit buttons):
className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#C7A348] bg-[#C7A348] px-6 py-3 text-white text-sm font-medium uppercase tracking-wide transition-all duration-200 ease-out hover:bg-transparent hover:text-[#C7A348] active:scale-[0.98] min-h-[48px] cursor-pointer"

RULES:
- All buttons are pill shaped (rounded-full) — no square corners ever
- All buttons have border-2 border-[#C7A348] always
- Minimum height 48px for touch targets
- Font always uppercase tracking-wide text-sm
- Never use plain blue, green, or red buttons anywhere on the site

---

## HERO SECTION STRUCTURE — EVERY PAGE

Every page hero must follow this exact structure in order:

1. Eyebrow label (gold, uppercase, dot-separator pill format)
2. H1 heading (large, bold, Cormorant serif — font-heading)
3. Subtext paragraph (1-2 sentences max, describes the page)
4. CTA buttons row (2-4 buttons max)

On dark/image/video hero backgrounds:
- All text white
- Use DARK variant buttons
- Add dark overlay: bg-black/40 or bg-gradient-to-b from-black/50

On light/cream hero backgrounds:
- H1 in #1B2B5E
- Subtext in text-[#1A1A1A]/70
- Use LIGHT variant buttons

---

## INTERNAL LINKS IN BODY COPY

All contextual internal links in body copy:
className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold"

Never use plain blue browser default link color anywhere.
Never use hover:underline — use hover:text-[#e8c84a] instead.

---

## SECTION SPACING

Between major sections: py-20 px-6 md:px-16
Between heading and body: mb-6
Between body and CTA: mt-8
Card padding: p-6 md:p-8
Inner container: max-w-4xl mx-auto (copy-heavy sections)
Wide container: max-w-6xl mx-auto (grid/card sections)
Full container: max-w-7xl mx-auto px-4 sm:px-6 lg:px-8

---

## SECTION BACKGROUNDS — ALTERNATE IN THIS ORDER

1. bg-white
2. bg-[#FFFAF5]
3. bg-[#F7F8FC]
Dark accent: bg-[#1B2B5E] (navy) with white text

---

## FAQ — MANDATORY PATTERN

Always use: <FaqAccordion faqs={isNl ? faqsNl : faqsEn} locale={locale} />
NEVER use raw <details> elements.
Define faqsEn and faqsNl as module-level constants before the component function.
Arrays use { question: string, answer: string } shape.
Minimum 4 questions, maximum 6 per page.
Wire getFaqPageSchema(isNl ? faqsNl : faqsEn) to a JsonLd block.
NEVER add date parameters to getFaqPageSchema.

---

## GEO BLOCK — MANDATORY PATTERN

One visible section with a question-format H2 (font-vibes, gold on light bg).
Self-contained 60-100 word answer paragraph.
Must contain: restaurant name, address (Leyweg 986), primary service, one verifiable fact, opening hours.
Must be bilingual using isNl conditional.
Must contain at least 2 inline Link components.
Never use sr-only — must be visible to human visitors.

---

## DIET INDICATORS (MENU PAGE)

Vegetarian: green leaf icon, color #22c55e, no background, no border
Vegan: darker green leaf icon, color #2D7A2D, with small V indicator
Non-vegetarian: filled dark red circle inside square border, color #8B0000

---

## RESTAURANT FACTS — NEVER GET THESE WRONG

- Name: Chopras Indian Restaurant (never "Chopras" alone)
- Address: Leyweg 986, 2545 GW Den Haag
- Phone: +31 6 30645930
- Email: info@chopras.nl
- Hours: Tuesday to Sunday, 16:30 to 22:30. Closed Monday.
- NO LUNCH SERVICE. Never write lunch, 11:30, 12:00, or any daytime food reference.
- Capacity: 25 to 80 guests. Never claim above 80.
- Founded: 2023 by Arun Chopra (Founder only — never "Head Chef")
- Google rating: 4.9 stars, 800+ reviews
- TheFork rating: 8.6
- Tripadvisor: Excellent
- Delivery: Thuisbezorgd and Uber Eats (both, never just one)
- No alcohol served or permitted. Chopras is fully halal.
- Serves: Den Haag, Rijswijk, Delft, Zoetermeer, Voorburg, Leidschendam

---

## WHAT NEVER TO DO

- Never use "Chopras" alone — always "Chopras Indian Restaurant"
- Never use em dashes (—) in copy
- Never use contractions in copy
- Never use square cornered buttons
- Never use plain blue hyperlink color for internal links
- Never use hover:underline on internal links
- Never stack two H1 tags on one page
- Never use font sizes smaller than text-xs for any visible text
- Never use pure black (#000000) as a text color — use #1B2B5E or text-[#1A1A1A]/70
- Never remove the eyebrow label from a hero section
- Never render an eyebrow as a plain div or span without the glassmorphism pill container
- Never use a different button style than the three variants defined above
- Never use background color #FFF8F4 or #F5F0EA — use #F7F8FC or #FFFAF5
- NEVER use font-heading (Cormorant) for H2, H3, or H4 — Cormorant is H1 only
- NEVER use gold (#C7A348 or #D4AF37) for H2/H3/H4 on dark/navy backgrounds — use text-white
- NEVER use text-[#1B2B5E] on any heading on a light/white background
- NEVER use font-bold alone for headings

---

## FOOTER RULES

Background: linear-gradient(135deg, #000066 0%, #0000FF 100%)
Top border: 1px solid rgba(199, 163, 72, 0.3)
Column headings: text-[#C7A348] uppercase tracking-wider text-xs font-semibold
Footer links: text-white/70 hover:text-white hover:text-[#C7A348]
Copyright bar: text-white/50 text-sm

---

This file must be read before making ANY design changes to the Chopras Indian Restaurant website. All new pages, components, and sections must follow these rules exactly.
