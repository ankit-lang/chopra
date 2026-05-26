import type { Metadata } from 'next'
import Link from 'next/link'
import JsonLd from '@/components/seo/JsonLd'
import { getLocalizedUrl } from '@/lib/utils'
import { getLocalRestaurantSchema, getBreadcrumbSchema, getFaqPageSchema, getDishPageSchema } from '@/lib/schema'
import { getTranslations, type Locale } from '@/lib/useTranslations'
import FaqAccordion from '@/components/sections/FaqAccordion'

type Props = { params: { locale: Locale } }

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'nl' }]
}

const faqsNl: Array<{ question: string; answer: string }> = [
  {
    question: 'Is de butter chicken bij Chopras halal?',
    answer: 'Ja. Alle kip bij Chopras is uitsluitend afkomstig van halal-gecertificeerde leveranciers. De gehele keuken werkt volgens halal-normen - het is geen optie of speciaal verzoek. U kunt hier met volledig vertrouwen eten.',
  },
  {
    question: 'Hoe pittig is de butter chicken bij Chopras?',
    answer: 'Butter chicken is een van de mildste gerechten op het Indiase menu - het is bewust mild van hitte, waarbij de warmte afkomstig is van aromatische kruiden in plaats van chili. De meeste kinderen eten het graag. Als u van pittiger houdt, kan de keuken dit aanpassen.',
  },
  {
    question: 'Kan ik butter chicken laten bezorgen in Den Haag?',
    answer: 'Ja. Chopras is beschikbaar op Thuisbezorgd en Uber Eats voor bezorging in het grootste deel van Den Haag binnen een straal van 5 km vanaf Leyweg 986. Butter chicken gaat uitstekend mee - de saus blijft rijk en romig tijdens transport.',
  },
  {
    question: 'Wat is het verschil tussen butter chicken en tikka masala?',
    answer: 'Butter chicken (murgh makhani) is rijker, romiger en licht zoet door de tomaten-botersaus. Tikka masala is pittiger en heeft een scherpere tomatenbasis. Beide beginnen met tandoor-kip, maar de sauzen zijn fundamenteel anders van smaak en karakter.',
  },
  {
    question: 'Gebruikt Chopras verse of kant-en-klare kruiden?',
    answer: 'Verse kruiden, elke ochtend. Chopras maalt zijn masalas van hele kruiden die rechtstreeks uit India worden geimporteerd. De vluchtige aromatische olien in vers gemalen komijn en kardemom verdampen binnen enkele uren na het malen. Dit verschil proeft u direct in elk gerecht.',
  },
]

const faqsEn: Array<{ question: string; answer: string }> = [
  {
    question: "Is Chopras' butter chicken halal?",
    answer: 'Yes. All chicken at Chopras is sourced exclusively from halal-certified suppliers. The entire kitchen operates to halal standards - it is not an option or a special request. You can eat here with complete confidence.',
  },
  {
    question: 'How spicy is the butter chicken at Chopras?',
    answer: 'Butter chicken is one of the mildest dishes on the Indian menu - it is intentionally gentle in heat, with the warmth coming from the aromatic spices rather than chilli. Most children eat it happily. If you prefer more heat, ask the kitchen and they will adjust.',
  },
  {
    question: 'Can I order butter chicken for delivery in Den Haag?',
    answer: 'Yes. Chopras is available on Thuisbezorgd and Uber Eats for delivery across most of Den Haag within a 5km radius of Leyweg 986. Butter chicken travels exceptionally well - the sauce holds its richness and stays creamy during transit.',
  },
  {
    question: 'What is the difference between butter chicken and tikka masala?',
    answer: 'Butter chicken (murgh makhani) is richer, creamier and slightly sweeter from the tomato and butter reduction. Tikka masala is spicier with a sharper tomato base. Both start with tandoor-cooked chicken, but the sauces are fundamentally different in taste and character.',
  },
  {
    question: 'Does Chopras use fresh or pre-mixed spices in the butter chicken?',
    answer: 'Fresh spices, ground every morning. Chopras grinds its masalas from whole spices sourced directly from India. The volatile aromatic oils in freshly ground cumin and cardamom evaporate within hours of grinding. This is the tangible difference you taste in every single bite.',
  },
]

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params
  const titles = {
    en: 'Butter Chicken in Den Haag | Chopras Indian Restaurant',
    nl: 'Butter Chicken in Den Haag | Chopras Indiaas Restaurant',
  }
  const descriptions = {
    en: 'Best butter chicken Den Haag at Chopras Indian Restaurant. Halal chicken in rich tomato and cream sauce. Made fresh daily at Leyweg 986. Order online.',
    nl: 'Beste butter chicken Den Haag bij Chopras Indian Restaurant. Halal kip in rijke tomaten-roomsaus. Dagelijks vers bereid op Leyweg 986. Bestel online.',
  }
  return {
    title: titles[locale],
    description: descriptions[locale],
    alternates: {
      canonical: getLocalizedUrl(locale, 'butter-chicken-den-haag'),
      languages: {
        en: getLocalizedUrl('en', 'butter-chicken-den-haag'),
        nl: getLocalizedUrl('nl', 'butter-chicken-den-haag'),
        'x-default': getLocalizedUrl('en', 'butter-chicken-den-haag'),
      },
    },
    openGraph: {
      title: titles[locale],
      description: descriptions[locale],
      url: getLocalizedUrl(locale, 'butter-chicken-den-haag'),
      images: [{ url: '/og/home-og.jpg', width: 1200, height: 630, alt: 'Chopras Indian Restaurant Den Haag' }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: titles[locale],
      description: descriptions[locale],
      images: ['/og/home-og.jpg'],
    },
  }
}

export default function ButterChickenPage({ params }: Props) {
  const { locale } = params
  const tr = getTranslations(locale)
  const base = locale === 'nl' ? '/nl' : ''
  const isNl = locale === 'nl'

  return (
    <>
      <JsonLd data={getLocalRestaurantSchema(locale, ['Den Haag'], getLocalizedUrl(locale, 'butter-chicken-den-haag'))} />
      <JsonLd data={getBreadcrumbSchema([
        { name: tr.common.nav.home, item: getLocalizedUrl(locale) },
        { name: 'Butter Chicken Den Haag', item: getLocalizedUrl(locale, 'butter-chicken-den-haag') },
      ])} />
      <JsonLd data={getFaqPageSchema(isNl ? faqsNl : faqsEn)} />
      <JsonLd data={getDishPageSchema(locale, 'Butter Chicken Den Haag', 'Butter Chicken Den Haag', 'Authentic halal butter chicken at Chopras Indian Restaurant Den Haag. Tender chicken in rich tomato and cream sauce with spices ground fresh daily at Leyweg 986.', 'Authentieke halal butter chicken bij Chopras Indian Restaurant Den Haag. Malse kip in rijke tomaten-roomsaus met dagelijks vers gemalen specerijen op Leyweg 986.')} />

      {/* HERO */}
      <section className="bg-[#1B2B5E] py-20 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-[#C7A348]/40 bg-white/10 backdrop-blur-sm mb-4">
            <span className="text-[#C7A348] text-xs font-medium uppercase tracking-widest">
              • OUR DISHES · CHOPRAS INDIAN RESTAURANT · DEN HAAG •
            </span>
          </div>
          <h1
            className="font-heading text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight"
            style={{ textShadow: '0 2px 8px rgba(0,0,0,0.6)' }}
          >
            {isNl
              ? 'Butter Chicken in Den Haag - Het Echte Werk bij Chopras'
              : 'Butter Chicken in Den Haag - The Real Thing at Chopras'}
          </h1>
          <p
            className="text-white/75 text-lg md:text-xl max-w-2xl mx-auto"
            style={{ textShadow: '0 1px 4px rgba(0,0,0,0.7)' }}
          >
            {isNl
              ? 'Een nacht gemarineerd. Kruiden elke ochtend vers gemalen. Tandoor gebakken op 400 graden. Volledig halal gecertificeerd op Leyweg 986, Den Haag.'
              : 'Marinated overnight. Spices ground every morning. Tandoor-fired at 400 degrees. Fully halal certified at Leyweg 986, Den Haag.'}
          </p>
        </div>
      </section>

      {/* SECTION 1: What Real Butter Chicken Tastes Like */}
      <section className="bg-[#F7F8FC] py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-vibes text-3xl md:text-4xl text-[#C7A348] mb-8">
            {isNl ? 'Hoe Echte Butter Chicken Smaakt' : 'What Real Butter Chicken Tastes Like'}
          </h2>
          <div className="prose prose-lg max-w-none text-[#1A1A1A] space-y-5">
            {isNl ? (
              <>
                <p>De meeste butter chicken in Den Haag is aangepast. Zoeter gemaakt voor een Europees gehemelte. De tomaten-roomsaus verdund tot een consistentie die nergens op slaat. Het rokerige karakter van de <Link href={`${base}/tandoori-den-haag`} className="text-[#D4AF37] hover:underline">tandoor-kip</Link> verdwenen of nooit aanwezig geweest. Het resultaat smaakt aangenaam maar heeft weinig gemeen met de murgh makhani die in Oud-Delhi is bedacht.</p>
                <p>Bij Chopras, het <Link href={`${base}/beste-indiaas-restaurant-den-haag`} className="text-[#D4AF37] hover:underline">beste Indiaas restaurant in Den Haag</Link> op Leyweg 986, wordt butter chicken langzaam gegaard van een nacht gemarineerde tandoor-kip, vers ingedikte tomaten en kruiden die diezelfde ochtend zijn gemalen. Het gerecht zelf - murgh makhani - werd geboren bij Moti Mahal in Oud-Delhi in de jaren vijftig. Kundan Lal Gujral had aan het einde van de avond overgebleven tandoor-kip en voegde die toe aan een tomaten-botersaus die hij aan het ontwikkelen was. Murgh makhani reisde van Oud-Delhi naar de rest van de wereld en onderging het lot van de meeste grote gerechten die te ver reizen: vereenvoudigd, benaderd en geindustrialiseerd.</p>
                <p>Wat geweldige butter chicken onderscheidt van middelmatige komt neer op een paar keukenbesluiten. De kwaliteit van de tomaten is doorslaggevend - de saus heeft de natuurlijke zoetheid en zuurheid van rijpe tomaten nodig, geen toegevoegde suiker. De room moet volvette room zijn en op de juiste temperatuur worden toegevoegd.</p>
                <p>De garam masala moet vers gemalen zijn. De vluchtige aromatische olien in komijn, koriander en groene kardemom beginnen te verdampen binnen enkele uren na het malen. Een voorgemengd kruidenmengsel dat weken in een magazijn heeft gelegen, kan niet concurreren met wat er uit een keuken komt die zijn masalas elke ochtend vers maalt van hele ingredienten die rechtstreeks uit India zijn verscheept.</p>
              </>
            ) : (
              <>
                <p>Most butter chicken served in Den Haag has been adjusted. Sweetened to soften it for a European palate. The tomato cream sauce thinned to a consistency that pours like soup. The char of the <Link href={`${base}/tandoori-den-haag`} className="text-[#D4AF37] hover:underline">tandoor chicken</Link> diluted or absent entirely. The result is a dish that is pleasant but bears very little resemblance to murgh makhani as it was designed in Old Delhi.</p>
                <p>At Chopras on Leyweg 986 - the <Link href={`${base}/blog/best-indian-restaurant-den-haag`} className="text-[#D4AF37] hover:underline">best Indian restaurant in Den Haag</Link> by Google review volume - butter chicken is slow-cooked from overnight-marinated tandoor chicken, fresh-reduced tomatoes, and spices ground that same morning. The dish itself, murgh makhani, was born at Moti Mahal in Old Delhi in the 1950s. Kundan Lal Gujral found himself with leftover tandoor chicken at the end of service and added it to a tomato and butter sauce he had been working on. Murgh makhani spread from Old Delhi across the world and suffered the fate of most great dishes that travel too far: simplified, approximated, and industrialised.</p>
                <p>What separates great butter chicken from mediocre comes down to a small number of kitchen decisions. The quality of the tomatoes matters enormously - the sauce needs the natural sweetness and acidity of ripe tomatoes, not added sugar. The cream must be full fat and added at the right temperature.</p>
                <p>The garam masala must be freshly ground. The volatile aromatic oils in cumin, coriander, and green cardamom begin evaporating within hours of grinding. A pre-mixed spice blend sitting in a warehouse for weeks cannot compete with what comes out of a kitchen that grinds its masalas fresh every morning from whole ingredients shipped directly from India.</p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* SECTION 2: How We Make Ours */}
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-vibes text-3xl md:text-4xl text-[#C7A348] mb-8">
            {isNl ? 'Hoe Wij Het Maken bij Chopras Den Haag' : 'How We Make Ours at Chopras Den Haag'}
          </h2>
          <div className="prose prose-lg max-w-none text-[#1A1A1A] space-y-5">
            {isNl ? (
              <>
                <p>De kip wordt <Link href={`${base}/tandoori-den-haag`} className="text-[#D4AF37] hover:underline">de avond van tevoren gemarineerd in onze tandoor-keuken</Link>. Niet een uur voor de service - de avond ervoor. De marinade is op basis van yoghurt met verse gember, knoflook en een mengsel van kruiden die die ochtend in huis zijn gemalen. De yoghurt maakt het vlees malser en draagt de kruiden diep in het vlees, zodat de kip tegen de tijd dat het de tandoor bereikt, al van binnenuit smaak heeft opgenomen.</p>
                <p>In de tandoor - die opereert bij circa 400°C - verschroeit de marinade op het oppervlak. Die verschroeiting is het punt. Het creëert een laag van gekarameliseerde, rokerige smaak die overgaat in de saus wanneer de kip wordt toegevoegd.</p>
                <p>De saus begint met verse tomaten die langzaam worden gekookt gedurende ongeveer 45 minuten totdat het water is verdampt en de natuurlijke suikers zijn geconcentreerd. Volle room wordt vervolgens op de juiste temperatuur toegevoegd. De boter - makhan, de makhani in murgh makhani - wordt aan het einde geroerd, van het directe vuur af, zodat het emulsigeert in de saus in plaats van te breken. Chopras serveert dit gerecht elke avond als onderdeel van het <Link href={`${base}/menu`} className="text-[#D4AF37] hover:underline">volledige Noord-Indiase menu</Link>.</p>
                <p>De kruiden worden in huis gemalen van hele kruiden rechtstreeks uit India: groene kardemom, kruidnagel, kaneel, gedroogde rode peper, korianderzaad en komijn. Alle kip is afkomstig van <Link href={`${base}/halal-food-den-haag`} className="text-[#D4AF37] hover:underline">halal-gecertificeerde leveranciers</Link>. Elk gerecht, elke avond. Butter chicken staat op de kaart voor €18,50.</p>
              </>
            ) : (
              <>
                <p>The chicken is <Link href={`${base}/tandoori-den-haag`} className="text-[#D4AF37] hover:underline">marinated overnight in our tandoor kitchen</Link>. Not for an hour before service - overnight. The marinade is yogurt-based with fresh ginger, garlic, and a blend of spices ground in-house that morning. The yogurt tenderises the meat and carries the spices deep into the flesh, so by the time the chicken reaches the tandoor, it has already been absorbing flavour from within.</p>
                <p>In the tandoor - which operates at around 400°C - the marinade chars on the surface. That char is the point. It creates a layer of caramelised, smoky flavour that transfers into the sauce when the chicken is added.</p>
                <p>The sauce starts with fresh tomatoes cooked down slowly for around 45 minutes until the water has evaporated and the natural sugars have concentrated. Full-fat cream is then added at the correct temperature. The butter - makhan, the makhani in murgh makhani - is stirred in at the end, off the direct heat, so it emulsifies into the sauce rather than breaking. Chopras serves this dish nightly as part of the <Link href={`${base}/menu`} className="text-[#D4AF37] hover:underline">full North Indian menu</Link>.</p>
                <p>The spices are ground in-house from whole spices sourced directly from India: green cardamom, cloves, cinnamon, dried red chilli, coriander seed, and cumin. All chicken is sourced from <Link href={`${base}/halal-food-den-haag`} className="text-[#D4AF37] hover:underline">halal-certified suppliers</Link>. Every dish, every evening. Butter chicken is priced at €18.50.</p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* GEO BLOCK */}
      <section className="bg-[#1B2B5E] py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-vibes text-3xl md:text-4xl text-white mb-8">
            {isNl
              ? 'Waar Vind Ik de Beste Butter Chicken in Den Haag?'
              : 'Where Can I Find the Best Butter Chicken in Den Haag?'}
          </h2>
          <div className="text-white/90 text-lg leading-relaxed">
            {isNl ? (
              <p>De beste butter chicken in Den Haag vindt u bij Chopras Indian Restaurant, Leyweg 986, 2545 GW Den Haag, open van dinsdag tot en met zondag van 16:30 tot 22:30. Chopras staat beoordeeld met 4,9 sterren op basis van 800+ Google-recensies. De kip wordt een nacht gemarineerd, gebakken in een 400-graden tandoor en afgemaakt in een langzaam ingedikte tomaten-roomsaus met kruiden die elke ochtend vers worden gemalen van hele ingredienten uit India. Elk gerecht is volledig <Link href={`${base}/halal-food-den-haag`} className="text-[#C7A348] hover:underline font-semibold">halal gecertificeerd</Link>. <Link href={`${base}/contact`} className="text-[#C7A348] hover:underline font-semibold">Reserveer uw tafel</Link> of bestel via Thuisbezorgd.</p>
            ) : (
              <p>The best butter chicken in Den Haag is at Chopras Indian Restaurant, Leyweg 986, 2545 GW Den Haag, open Tuesday to Sunday from 16:30 to 22:30. Chopras is rated 4.9 stars across 800+ Google reviews. The chicken is marinated overnight, cooked in a 400-degree tandoor, then finished in a slow-reduced tomato cream sauce with spices ground fresh every morning from whole ingredients sourced in India. Every dish is fully <Link href={`${base}/halal-food-den-haag`} className="text-[#C7A348] hover:underline font-semibold">halal certified</Link>. <Link href={`${base}/contact`} className="text-[#C7A348] hover:underline font-semibold">Reserve a table</Link> or order for delivery from Thuisbezorgd.</p>
            )}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#F7F8FC] py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-[#C7A348] mb-6 leading-[1.3]">
            {isNl ? 'Veelgestelde Vragen over Butter Chicken' : 'Frequently Asked Questions About Butter Chicken'}
          </h2>
          <FaqAccordion faqs={isNl ? faqsNl : faqsEn} locale={locale} />
        </div>
      </section>

      {/* CTA / Visit */}
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-vibes text-3xl md:text-4xl text-[#C7A348] mb-8">
            {isNl
              ? 'Bezoek Chopras voor Butter Chicken in Den Haag'
              : 'Visit Chopras for Butter Chicken in Den Haag'}
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Link
              href={`${base}/contact`}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#C7A348] bg-[rgba(199,163,72,0.1)] px-6 py-3 text-[#C7A348] text-sm font-medium uppercase tracking-wide transition-all duration-200 ease-out hover:bg-[#C7A348] hover:text-white active:scale-[0.98] min-h-[48px]"
            >
              {tr.common.reserve}
            </Link>
            <Link
              href={`${base}/menu`}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#C7A348] bg-[rgba(199,163,72,0.1)] px-6 py-3 text-[#C7A348] text-sm font-medium uppercase tracking-wide transition-all duration-200 ease-out hover:bg-[#C7A348] hover:text-white active:scale-[0.98] min-h-[48px]"
            >
              {tr.common.viewMenu}
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link href={`${base}/biryani-den-haag`} className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-[#D4AF37] hover:shadow-lg transition-all">
              <p className="text-[#D4AF37] text-sm font-semibold uppercase tracking-widest mb-2">Biryani</p>
              <p className="text-[#1B2B5E] font-semibold">{isNl ? 'Authentieke biryani Den Haag' : 'Authentic biryani Den Haag'}</p>
            </Link>
            <Link href={`${base}/tandoori-den-haag`} className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-[#D4AF37] hover:shadow-lg transition-all">
              <p className="text-[#D4AF37] text-sm font-semibold uppercase tracking-widest mb-2">Tandoori</p>
              <p className="text-[#1B2B5E] font-semibold">{isNl ? 'Tandoori specialiteiten Den Haag' : 'Tandoori specialities Den Haag'}</p>
            </Link>
            <Link href={`${base}/dal-makhani-den-haag`} className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-[#D4AF37] hover:shadow-lg transition-all">
              <p className="text-[#D4AF37] text-sm font-semibold uppercase tracking-widest mb-2">{isNl ? 'Vegetarisch' : 'Vegetarian'}</p>
              <p className="text-[#1B2B5E] font-semibold">Dal Makhani Den Haag</p>
            </Link>
            <Link href={`${base}/mutton-rogan-josh-den-haag`} className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-[#D4AF37] hover:shadow-lg transition-all">
              <p className="text-[#D4AF37] text-sm font-semibold uppercase tracking-widest mb-2">{isNl ? 'Lam Curry' : 'Lamb Curry'}</p>
              <p className="text-[#1B2B5E] font-semibold">Mutton Rogan Josh Den Haag</p>
            </Link>
            <Link href={`${base}/indian-food-delivery-den-haag`} className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-[#D4AF37] hover:shadow-lg transition-all">
              <p className="text-[#D4AF37] text-sm font-semibold uppercase tracking-widest mb-2">{isNl ? 'Bezorging' : 'Delivery'}</p>
              <p className="text-[#1B2B5E] font-semibold">{isNl ? 'Indiaas eten bezorgen Den Haag' : 'Indian food delivery Den Haag'}</p>
            </Link>
            <Link href={`${base}/catering`} className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-[#D4AF37] hover:shadow-lg transition-all">
              <p className="text-[#D4AF37] text-sm font-semibold uppercase tracking-widest mb-2">Catering</p>
              <p className="text-[#1B2B5E] font-semibold">{isNl ? 'Indiaas catering Den Haag voor uw evenement' : 'Indian catering Den Haag for your event'}</p>
            </Link>
          </div>
          <div className="mt-8 text-center space-y-4">
            <p className="text-[#1A1A1A] text-base">
              <Link href={`${base}/`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                {isNl ? 'Chopras Indian Restaurant - beste Indiaas restaurant in Den Haag' : 'Chopras Indian Restaurant - best Indian restaurant in Den Haag'}
              </Link>
            </p>
            <p className="text-[#1A1A1A] text-base">
              {isNl ? 'Bekijk het volledige menu of' : 'View the full menu or'}{' '}
              <Link href={`${base}/contact`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                {isNl ? 'maak een reservering' : 'book a table at Chopras Indian Restaurant Den Haag'}
              </Link>.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
