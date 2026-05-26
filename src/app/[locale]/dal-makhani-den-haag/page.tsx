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
    question: 'Wat maakt dal makhani anders dan andere linzengerechten?',
    answer: 'Dal makhani wordt gemaakt van hele zwarte linzen (urad dal) die een nacht worden geweekt en daarna langzaam worden gekookt met boter, room en vers gemalen specerijen. Het resultaat is een dikke, romige curry met diepe smaak. Andere linzengerechten zoals masoor dal zijn dunner en minder rijk. Dal makhani is het gerecht waaraan alle andere linzengerechten worden afgemeten.',
  },
  {
    question: 'Is dal makhani vegetarisch?',
    answer: 'Ja. Dal makhani bevat geen vlees of vis. Het is een volledig vegetarisch gerecht gemaakt van zwarte linzen, boter, room en specerijen. Bij Chopras Indian Restaurant zijn alle dal makhani bereidingen vegetarisch en geschikt voor gasten die geen vlees eten. Het is ook een van de populairste gerechten bij vleesliefhebbers die simpelweg van de smaak houden.',
  },
  {
    question: 'Hoe smaakt dal makhani?',
    answer: 'Dal makhani smaakt rijk, romig en licht rokerig. De boter en room geven een volle, ronde body. De tomaten voegen een lichte zuurheid toe die in evenwicht wordt gebracht door de specerijen. Het is comfort food in de ware zin van het woord. De versie bij Chopras gebruikt specerijen die elke ochtend vers worden gemalen, waardoor de smaak merkbaar levendiger is dan dal bereid met voorgemaalde mengsels.',
  },
  {
    question: 'Kan ik dal makhani bestellen voor bezorging of afhalen bij Chopras?',
    answer: 'Ja. Chopras Indian Restaurant op Leyweg 986 in Den Haag biedt zowel afhalen als bezorging aan. U kunt ook een tafel reserveren voor dineren op locatie. De keuken is open van dinsdag tot en met zondag vanaf 16:30. Dal makhani is beschikbaar tijdens elke dienst.',
  },
  {
    question: 'Wat eet je bij dal makhani?',
    answer: 'Dal makhani wordt traditioneel gegeten met naan of basmati rijst. Bij Chopras wordt de tandoori naan vers gebakken in onze kleioven op 400 graden Celsius en is de ideale begeleiding. De naan absorbeert de dikke saus perfect. Een portie dal makhani met twee stukken knoflooknaan is een van de meest bevredigende maaltijden op het menu.',
  },
]

const faqsEn: Array<{ question: string; answer: string }> = [
  {
    question: 'What makes dal makhani different from other lentil dishes?',
    answer: 'Dal makhani is made from whole black lentils (urad dal) soaked overnight and slow-cooked with butter, cream, and freshly ground spices. The result is a thick, clinging curry with genuine depth. Other lentil dishes such as masoor dal are thinner and less rich. Dal makhani is the standard against which other lentil dishes are compared.',
  },
  {
    question: 'Is dal makhani vegetarian?',
    answer: 'Yes. Dal makhani contains no meat or fish. It is a fully vegetarian dish made from black lentils, butter, cream, and spices. At Chopras Indian Restaurant, all dal makhani preparations are vegetarian and suitable for guests who do not eat meat. It is also one of the most popular dishes among non-vegetarians who simply love the flavour.',
  },
  {
    question: 'What does dal makhani taste like?',
    answer: 'Dal makhani tastes rich, creamy, and lightly smoky. The butter and cream give it a full, round body. The tomatoes add a gentle acidity that is balanced by the spices. It is comfort food in the truest sense. The version at Chopras uses spices ground fresh each morning, which makes the flavour noticeably more alive than dal made with pre-mixed blends.',
  },
  {
    question: 'Can I order dal makhani for delivery or takeaway from Chopras?',
    answer: 'Yes. Chopras Indian Restaurant at Leyweg 986 in Den Haag offers both takeaway and delivery. You can also reserve a table for dine-in. The kitchen is open Tuesday to Sunday from 16:30. Dal makhani is available every service.',
  },
  {
    question: 'What should I eat with dal makhani?',
    answer: 'Dal makhani is traditionally served with naan or basmati rice. At Chopras, the tandoori naan is baked fresh in our clay oven at 400 degrees Celsius and is the ideal accompaniment. The naan pulls through the thick sauce and holds it cleanly. A bowl of dal makhani with two pieces of garlic naan is one of the most satisfying meals on the menu.',
  },
]

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params
  const titles = {
    en: 'Dal Makhani Den Haag | Chopras Indian Restaurant',
    nl: 'Dal Makhani Den Haag | Chopras Indian Restaurant',
  }
  const descriptions = {
    en: 'Authentic dal makhani Den Haag at Chopras Indian Restaurant. Black lentils slow cooked with butter and cream. Served fresh daily at Leyweg 986.',
    nl: 'Authentieke dal makhani Den Haag bij Chopras Indian Restaurant. Zwarte linzen langzaam gegaard met boter en room. Dagelijks vers bereid op Leyweg 986.',
  }
  return {
    title: titles[locale],
    description: descriptions[locale],
    alternates: {
      canonical: getLocalizedUrl(locale, 'dal-makhani-den-haag'),
      languages: {
        en: getLocalizedUrl('en', 'dal-makhani-den-haag'),
        nl: getLocalizedUrl('nl', 'dal-makhani-den-haag'),
        'x-default': getLocalizedUrl('en', 'dal-makhani-den-haag'),
      },
    },
    openGraph: {
      title: titles[locale],
      description: descriptions[locale],
      url: getLocalizedUrl(locale, 'dal-makhani-den-haag'),
      images: [{ url: '/og/home-og.jpg', width: 1200, height: 630, alt: 'Dal makhani at Chopras Indian Restaurant Den Haag' }],
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

export default function DalMakhaniPage({ params }: Props) {
  const { locale } = params
  const tr = getTranslations(locale)
  const base = locale === 'nl' ? '/nl' : ''
  const isNl = locale === 'nl'

  return (
    <>
      <JsonLd data={getLocalRestaurantSchema(locale, ['Den Haag'], getLocalizedUrl(locale, 'dal-makhani-den-haag'))} />
      <JsonLd data={getBreadcrumbSchema([
        { name: tr.common.nav.home, item: getLocalizedUrl(locale) },
        { name: 'Dal Makhani Den Haag', item: getLocalizedUrl(locale, 'dal-makhani-den-haag') },
      ])} />
      <JsonLd data={getFaqPageSchema(isNl ? faqsNl : faqsEn)} />
      <JsonLd data={getDishPageSchema(locale, 'Dal Makhani Den Haag', 'Dal Makhani Den Haag', 'Authentic dal makhani at Chopras Indian Restaurant Den Haag. Black lentils slow cooked with butter and cream using spices ground fresh daily at Leyweg 986.', 'Authentieke dal makhani bij Chopras Indian Restaurant Den Haag. Zwarte linzen langzaam gekookt met boter en room met dagelijks vers gemalen specerijen op Leyweg 986.', ['https://schema.org/VegetarianDiet', 'https://schema.org/HalalDiet'])} />

      {/* HERO */}
      <section className="bg-[#1B2B5E] py-20 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-[#C7A348]/40 bg-white/10 backdrop-blur-sm mb-4">
            <span className="text-[#C7A348] text-xs font-medium uppercase tracking-widest">• OUR DISHES · CHOPRAS INDIAN RESTAURANT · DEN HAAG •</span>
          </div>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight">
            {isNl
              ? 'Dal Makhani Den Haag - Langzaam Gegaard bij Chopras'
              : 'Dal Makhani Den Haag - Slow-Cooked at Chopras Indian Restaurant'}
          </h1>
          <p className="text-white/75 text-lg md:text-xl mb-8">
            {isNl
              ? 'Zwarte linzen. Een nacht geweekt. Langzaam gegaard met boter, room en vers gemalen specerijen op Leyweg 986, Den Haag.'
              : 'Black lentils. Soaked overnight. Slow-cooked with butter, cream, and spices ground fresh that morning at Leyweg 986, Den Haag.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`${base}/contact`}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#C7A348] bg-white/10 px-6 py-3 text-white text-sm font-medium uppercase tracking-wide transition-all duration-200 ease-out hover:bg-[rgba(199,163,72,0.3)] active:scale-[0.98] min-h-[48px] backdrop-blur-[10px]"
            >
              {tr.common.reserve}
            </Link>
            <Link
              href={`${base}/menu`}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#C7A348] bg-white/10 px-6 py-3 text-white text-sm font-medium uppercase tracking-wide transition-all duration-200 ease-out hover:bg-[rgba(199,163,72,0.3)] active:scale-[0.98] min-h-[48px] backdrop-blur-[10px]"
            >
              {tr.common.viewMenu}
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 1 - What proper dal makhani tastes like */}
      <section className="bg-[#F7F8FC] py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-[#C7A348] mb-6 leading-[1.3]">
            {isNl ? 'Wat echte dal makhani smaakt als' : 'What Proper Dal Makhani Actually Tastes Like'}
          </h2>
          <div className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed space-y-5">
            {isNl ? (
              <>
                <p>Er bestaat een versie van dal makhani die door heel Nederland wordt geserveerd. Dun. Licht zuur. Een saus die de achterkant van een lepel bedekt maar er niet aan blijft kleven. U eet het, en er ontbreekt iets. Niet helemaal verkeerd. Gewoon te snel gemaakt.</p>
                <p><strong>Echte dal makhani begint de avond ervoor.</strong> Zwarte linzen - urad dal - worden een nacht geweekt totdat ze opzwellen en zacht worden. De volgende ochtend koken ze totdat ze volledig zacht zijn. De saus wordt in lagen opgebouwd: ui langzaam gebakken in boter, gember en knoflook die diezelfde ochtend vers zijn gemalen, tomaten afgebroken totdat alle zuurheid is verdwenen en alleen zoetheid overblijft. Dan room. Dan boter. Dan de specerijen die Chopras Indian Restaurant rechtstreeks uit India haalt en elke ochtend vers maalt voor de dienst.</p>
                <p>Elke fase kost tijd. Dat is geen sentiment - dat is scheikunde. De vluchtige aromatische olien in komijn en kardemom beginnen binnen enkele uren na het malen te vervluchtigen. Linzen die worden gehaast blijven korrelig van binnen. Een saus die niet lang genoeg wordt ingekookt blijft scherp in plaats van rond. Tijd is geen optie in dit gerecht. Tijd is het ingrediënt.</p>
                <p>Dit is <Link href={`${base}/blog/vegetarian-indian-food-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">vegetarisch Indiaas comfort food</Link> zoals het bedoeld is. Niet als vervanging voor vlees. Als het echte ding.</p>
              </>
            ) : (
              <>
                <p>There is a version of dal makhani served across the Netherlands. Thin. Slightly acidic. A sauce that coats the back of a spoon but does not cling to it. You eat it and something feels off. Not wrong exactly. Just rushed.</p>
                <p><strong>Proper dal makhani starts the night before.</strong> Black lentils - urad dal - are soaked overnight until they swell and soften. The next morning they cook until completely tender. The sauce is built in layers: onions cooked slow in butter, ginger and garlic ground fresh that same morning, tomatoes broken down until all acidity is gone and only sweetness remains. Then cream. Then butter. Then the spices that Chopras Indian Restaurant sources directly from India and grinds fresh every morning before service.</p>
                <p>Every stage takes time. That is not sentiment - that is chemistry. The volatile aromatic oils in cumin and cardamom begin evaporating within hours of grinding. Lentils that are rushed stay grainy at the centre. A sauce that is not reduced long enough stays sharp instead of round. Time is not optional in this dish. Time is the ingredient.</p>
                <p>This is <Link href={`${base}/blog/vegetarian-indian-food-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">vegetarian Indian comfort food</Link> done as it was intended. Not as a substitute for meat. As the real thing.</p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* SECTION 2 - The Punjabi standard */}
      <section className="bg-white py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-[#C7A348] mb-6 leading-[1.3]">
            {isNl ? 'Dal Makhani Den Haag - De Punjabi Standaard' : 'Dal Makhani Den Haag - The Punjabi Standard'}
          </h2>
          <div className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed space-y-5">
            {isNl ? (
              <>
                <p>Dal makhani is een Noord-Indiaas gerecht uit Punjab. De versie die de meeste mensen kennen werd in de twintigste eeuw in Delhi ontwikkeld, in een restaurant dat begreep dat boter en room linzen niet rijker maken door aan het einde te worden toegevoegd. Ze maken het rijker door vanaf het begin in het gerecht te koken.</p>
                <p>Bij <Link href={`${base}/`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">Chopras Indian Restaurant</Link> op Leyweg 986 volgt de keuken deze aanpak. De boter gaat vroeg erin. De room wordt in fasen toegevoegd. De hele pan kookt langzaam in totdat de saus dik en glanzend is. Dit is <strong>Punjabi dal makhani zoals bedoeld</strong> - geen soep met linzen erin, maar een dikke, kleverige, diep smakende curry die u door hete <Link href={`${base}/naan-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">tandoori naan</Link> haalt of over basmati rijst eet en volledig tevreden bent.</p>
                <p>De specerijen komen niet uit een zak. Chopras haalt hele specerijen rechtstreeks uit India en maalt ze elke ochtend vers voor de dienst. Het verschil is onmiddellijk en onmiskenbaar. Komijn die die ochtend is gemalen ruikt levend. Kardemom die weken in een voorgemengd mengsel heeft gezeten ruikt naar niets.</p>
                <p>Met een Google-beoordeling van 4,9 sterren van 800+ beoordeelde gasten is dit het meest gewaardeerde <Link href={`${base}/beste-indiaas-restaurant-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">Indiaas restaurant in Den Haag</Link>. Dal makhani is een van de gerechten die gasten keer op keer terugbrengt.</p>
              </>
            ) : (
              <>
                <p>Dal makhani is a North Indian dish from Punjab. The version most people know was developed in the twentieth century in Delhi, at a restaurant that understood that butter and cream do not make lentils richer by being added last. They make it richer by cooking into the dish from the beginning.</p>
                <p>At <Link href={`${base}/`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">Chopras Indian Restaurant</Link> on Leyweg 986, the kitchen follows this approach. The butter goes in early. The cream is added in stages. The whole pot reduces slowly until the sauce is thick and glossy. This is <strong>Punjabi dal makhani as it was intended</strong> - not a soup with lentils floating in it, but a thick, clinging, deeply flavoured curry that you pull through hot <Link href={`${base}/naan-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">tandoori naan</Link> or eat over basmati rice and feel completely satisfied.</p>
                <p>The spices are not from a bag. Chopras sources whole spices directly from India and grinds them fresh every morning before service. The difference is immediate and unmistakable. Cumin ground that morning smells alive. Cardamom sitting in a pre-mixed blend for weeks smells of nothing.</p>
                <p>With a 4.9-star Google rating from 800+ verified reviews, Chopras is one of the strongest-rated <Link href={`${base}/beste-indiaas-restaurant-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">Indian restaurant in Den Haag</Link>. Dal makhani is one of the dishes that brings guests back.</p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* SECTION 3 - Vegetarian Indian food Den Haag */}
      <section className="bg-[#F7F8FC] py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-[#C7A348] mb-6 leading-[1.3]">
            {isNl ? 'Vegetarisch Indiaas in Den Haag - Geen Compromis' : 'Vegetarian Indian Food Den Haag - No Compromise'}
          </h2>
          <div className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed space-y-5">
            {isNl ? (
              <>
                <p>Veel restaurants behandelen vegetarische gerechten als voetnoten op het menu. Chopras behandelt dal makhani als het hoofdgerecht dat het is. De aandacht, de bereidingstijd, de kwaliteit van de specerijen - alles is identiek aan onze vlees curries.</p>
                <p>Dal makhani staat niet alleen. Ons <Link href={`${base}/vegan-menu`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">vegetarisch en veganistisch menu</Link> omvat ook <Link href={`${base}/soya-chaap-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">soya chaap</Link> - plantaardig vlees gegrild in de tandoor - evenals paneer curries, chaat en meer dan twintig andere vegetarische opties verspreid over 143 gerechten. Gasten die geen vlees eten vinden bij Chopras een volledig menu, geen bijgerecht.</p>
                <p>De gehele keuken is volledig <Link href={`${base}/halal-food-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">halal gecertificeerd</Link>. Chopras verwerkt uitsluitend halal vlees, waardoor er geen risico op kruisbesmetting bestaat voor gasten die een strikte halal-standaard volgen.</p>
              </>
            ) : (
              <>
                <p>Many restaurants treat vegetarian dishes as footnotes on the menu. Chopras treats dal makhani as the main dish it is. The attention, the preparation time, the quality of the spices - everything is identical to our meat curries.</p>
                <p>Dal makhani does not stand alone. Our <Link href={`${base}/vegan-menu`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">vegetarian and vegan menu</Link> also includes <Link href={`${base}/soya-chaap-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">soya chaap</Link> - plant-based mock meat grilled in the tandoor - along with paneer curries, chaat, and over twenty other vegetarian options across 143 dishes. Guests who do not eat meat find a complete menu at Chopras, not a side option.</p>
                <p>The entire kitchen is fully <Link href={`${base}/halal-food-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">halal certified</Link>. Chopras uses only halal-certified meat throughout, which means zero cross-contamination risk for guests who follow a strict halal standard.</p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* GEO BLOCK */}
      <section className="bg-[#1B2B5E] py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-white mb-6 leading-[1.3]">
            {isNl
              ? 'Waar vind ik authentieke dal makhani in Den Haag?'
              : 'Where Can I Find Authentic Dal Makhani in Den Haag?'}
          </h2>
          <p className="font-body text-white/80 text-lg leading-relaxed">
            {isNl ? (
              <>
                Chopras Indian Restaurant serveert authentieke dal makhani op{' '}
                <Link href={`${base}/contact`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">Leyweg 986, 2545 GW Den Haag</Link>.
                {' '}Zwarte linzen worden een nacht geweekt en langzaam gegaard met boter, room en specerijen die elke ochtend vers worden gemalen. Het restaurant heeft een Google-beoordeling van 4,9 sterren van 800+ gasten en is open van dinsdag tot en met zondag vanaf 16:30. Zowel{' '}
                <Link href={`${base}/indian-takeaway-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">afhalen</Link>
                {' '}als dineren op locatie zijn beschikbaar. Dit is echte Punjabi dal makhani - niet gehaast, niet uit blik.
              </>
            ) : (
              <>
                Chopras Indian Restaurant serves authentic dal makhani at{' '}
                <Link href={`${base}/contact`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">Leyweg 986, 2545 GW Den Haag</Link>.
                {' '}Black lentils are soaked overnight and slow-cooked with butter, cream, and spices ground fresh each morning. The restaurant holds a 4.9-star Google rating from 800+ verified reviews and is open Tuesday to Sunday from 16:30. Both{' '}
                <Link href={`${base}/indian-takeaway-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">takeaway</Link>
                {' '}and dine-in are available. This is proper Punjabi dal makhani - not rushed, not from a tin.
              </>
            )}
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#F7F8FC] py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-[#C7A348] mb-6 leading-[1.3]">
            {isNl ? 'Veelgestelde Vragen Over Dal Makhani' : 'Frequently Asked Questions About Dal Makhani'}
          </h2>
          <FaqAccordion faqs={isNl ? faqsNl : faqsEn} locale={locale} />
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="bg-white py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-[#C7A348] mb-6 leading-[1.3]">
            {isNl ? 'Dal Makhani Bestellen in Den Haag' : 'Order Dal Makhani in Den Haag'}
          </h2>
          <div className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed space-y-5 mb-8">
            {isNl ? (
              <>
                <p>
                  Dal makhani is beschikbaar elke avond dat Chopras open is. Eet het met verse{' '}
                  <Link href={`${base}/naan-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">tandoori naan</Link>
                  {' '}uit onze kleioven, of combineer het met een portie{' '}
                  <Link href={`${base}/biryani-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">biryani Den Haag</Link>
                  {' '}voor een complete Noord-Indiase maaltijd. Voor grotere groepen biedt Chopras ook{' '}
                  <Link href={`${base}/catering`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">Indiaas catering in Den Haag</Link>
                  {' '}aan, inclusief dal makhani als onderdeel van een volledig menu.
                </p>
                <p>Bezoek ons op Leyweg 986, Den Haag. Open dinsdag tot en met zondag vanaf 16:30.</p>
              </>
            ) : (
              <>
                <p>
                  Dal makhani is available every evening that Chopras is open. Eat it with fresh{' '}
                  <Link href={`${base}/naan-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">tandoori naan</Link>
                  {' '}from our clay oven, or pair it with a portion of{' '}
                  <Link href={`${base}/biryani-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">biryani Den Haag</Link>
                  {' '}for a complete North Indian meal. For larger groups, Chopras also offers{' '}
                  <Link href={`${base}/catering`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">Indian catering in Den Haag</Link>
                  {' '}including dal makhani as part of a full menu.
                </p>
                <p>Visit us at Leyweg 986, Den Haag. Open Tuesday to Sunday from 16:30.</p>
              </>
            )}
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
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
        </div>
      </section>

      {/* EXPLORE MORE DISHES */}
      <section className="bg-[#F7F8FC] py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-[#C7A348] mb-6 leading-[1.3]">
            {isNl ? 'Meer Gerechten Ontdekken' : 'Explore More Dishes'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Link href={`${base}/butter-chicken-den-haag`} className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-[#D4AF37] hover:shadow-lg transition-all">
              <p className="text-[#D4AF37] text-sm font-semibold uppercase tracking-widest mb-2">{isNl ? 'Boter Kip' : 'Butter Chicken'}</p>
              <p className="text-[#1B2B5E] font-semibold">{isNl ? 'Rijke tomaten-room curry met halal kip' : 'Rich tomato cream curry with halal chicken'}</p>
            </Link>
            <Link href={`${base}/soya-chaap-den-haag`} className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-[#D4AF37] hover:shadow-lg transition-all">
              <p className="text-[#D4AF37] text-sm font-semibold uppercase tracking-widest mb-2">{isNl ? 'Soya Chaap' : 'Soya Chaap'}</p>
              <p className="text-[#1B2B5E] font-semibold">{isNl ? 'Plantaardig vlees gegrild in de tandoor' : 'Plant-based mock meat grilled in the tandoor'}</p>
            </Link>
            <Link href={`${base}/naan-den-haag`} className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-[#D4AF37] hover:shadow-lg transition-all">
              <p className="text-[#D4AF37] text-sm font-semibold uppercase tracking-widest mb-2">{isNl ? 'Naan' : 'Naan'}</p>
              <p className="text-[#1B2B5E] font-semibold">{isNl ? 'Vers gebakken tandoori naan uit de kleioven' : 'Fresh tandoori naan baked in the clay oven'}</p>
            </Link>
            <Link href={`${base}/catering`} className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-[#D4AF37] hover:shadow-lg transition-all">
              <p className="text-[#D4AF37] text-sm font-semibold uppercase tracking-widest mb-2">{isNl ? 'Catering' : 'Catering'}</p>
              <p className="text-[#1B2B5E] font-semibold">{isNl ? 'Indiaas catering Den Haag voor uw evenement' : 'Indian catering Den Haag for your event'}</p>
            </Link>
          </div>
          <div className="text-center">
            <p className="font-body text-[#1A1A1A] text-base">
              <Link href={`${base}/`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                {isNl
                  ? 'Chopras Indian Restaurant - het beste Indiaas restaurant in Den Haag'
                  : 'Chopras Indian Restaurant - best Indian restaurant in Den Haag'}
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
