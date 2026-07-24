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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params
  const titles = {
    en: 'Pani Puri Den Haag | Chopras Indian Restaurant',
    nl: 'Pani Puri Den Haag | Chopras Indian Restaurant',
  }
  const descriptions = {
    en: 'Authentic pani puri Den Haag at Chopras Indian Restaurant. Crispy shells with spiced potato and tamarind water. Real Indian street food at Leyweg 986.',
    nl: 'Pani puri Den Haag bij Chopras Indian Restaurant. Krokante schelpjes gevuld met aardappel en tamarindwater. Echt Indiaas straatvoedsel op Leyweg 986.',
  }
  return {
    title: titles[locale],
    description: descriptions[locale],
    alternates: {
      canonical: getLocalizedUrl(locale, 'pani-puri-den-haag'),
      languages: {
        en: getLocalizedUrl('en', 'pani-puri-den-haag'),
        nl: getLocalizedUrl('nl', 'pani-puri-den-haag'),
        'x-default': getLocalizedUrl('en', 'pani-puri-den-haag'),
      },
    },
    openGraph: {
      title: titles[locale],
      description: descriptions[locale],
      url: getLocalizedUrl(locale, 'pani-puri-den-haag'),
      images: [{ url: '/og/home-og.jpg', width: 1200, height: 630, alt: 'Pani puri at Chopras Indian Restaurant Den Haag' }],
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

const faqsEn: Array<{ question: string; answer: string }> = [
  {
    question: 'What is golgappa and is it the same as pani puri?',
    answer: 'Golgappa and pani puri are the same dish. In Delhi and northern India it is called golgappa. In Mumbai and the west it is pani puri. In West Bengal it is puchka, and in Bihar it is gupchup. Every version uses the same base: a crispy hollow puri filled with spiced potato and dipped in flavoured tamarind water.',
  },
  {
    question: 'What does pani puri taste like?',
    answer: 'Pani puri delivers four flavours at once: sour from the tamarind water and lime, spicy from green chilli, sweet from the date and jaggery chutney, and earthy from the spiced potato filling. The puri itself is light and crispy until the water hits it. The entire experience lasts about three seconds per piece, which is why one order is never enough.',
  },
  {
    question: 'Is pani puri vegetarian and vegan?',
    answer: 'Yes. Pani puri contains no meat, no fish, and no animal products. The puri is made from flour and water. The filling is spiced potato and chickpeas. The pani is a blend of mint, tamarind, lime, and spices. Every component is naturally vegetarian and vegan. It is also halal certified at Chopras Indian Restaurant.',
  },
  {
    question: 'Do I need to book a table to try pani puri at Chopras?',
    answer: 'You can walk in, but booking is recommended especially on Friday and Saturday evenings. Pani puri is served as a starter and is most enjoyable when the kitchen can prepare it fresh while you are seated. Call us on +31 6 30645930 or use the contact page to reserve your table at Leyweg 986 in Den Haag.',
  },
  {
    question: 'Can pani puri be included in an Indian catering order?',
    answer: 'Yes. Pani puri is one of the most popular choices for birthday parties, weddings, and corporate events catered by Chopras Indian Restaurant. It works as an interactive starter for groups. The components are prepared separately and assembled on site to keep the puri crispy. Contact us for a catering quote.',
  },
]

const faqsNl: Array<{ question: string; answer: string }> = [
  {
    question: 'Wat is golgappa en is het hetzelfde als pani puri?',
    answer: 'Golgappa en pani puri zijn hetzelfde gerecht. In Delhi en Noord-India wordt het golgappa genoemd. In Mumbai en het westen pani puri. In West-Bengalen puchka, en in Bihar gupchup. Elke versie gebruikt dezelfde basis: een krokante, holle puri gevuld met gekruid aardappel en gedoopt in gekruid tamarindwater.',
  },
  {
    question: 'Hoe smaakt pani puri?',
    answer: 'Pani puri levert vier smaken tegelijk: zuur van het tamarindwater en de limoen, pittig van de groene chili, zoet van de dadel- en jaggerychutney, en aards van de gekruide aardappelvulling. De puri zelf is licht en knapperig totdat het water hem raakt. De hele ervaring duurt ongeveer drie seconden per stukje, en dat is waarom een bestelling nooit genoeg is.',
  },
  {
    question: 'Is pani puri vegetarisch en veganistisch?',
    answer: 'Ja. Pani puri bevat geen vlees, geen vis en geen dierlijke producten. De puri is gemaakt van bloem en water. De vulling is gekruid aardappel en kikkererwten. Het water is een mengsel van munt, tamarinde, limoen en kruiden. Elk onderdeel is van nature vegetarisch en veganistisch. Het is ook halal gecertificeerd bij Chopras Indian Restaurant.',
  },
  {
    question: 'Moet ik een tafel reserveren om pani puri te proberen bij Chopras?',
    answer: 'Inlopen kan, maar reserveren wordt aanbevolen, vooral op vrijdag- en zaterdagavond. Pani puri wordt geserveerd als voorgerecht en smaakt het beste wanneer de keuken het vers kan bereiden terwijl u zit. Bel ons op +31 6 30645930 of gebruik de contactpagina om uw tafel op Leyweg 986 in Den Haag te reserveren.',
  },
  {
    question: 'Kan pani puri worden opgenomen in een Indiaas cateringorder?',
    answer: 'Ja. Pani puri is een van de populairste keuzes voor verjaardagsfeesten, bruiloften en bedrijfsevenementen verzorgd door Chopras Indian Restaurant. Het werkt als een interactief voorgerecht voor groepen. De onderdelen worden apart bereid en ter plaatse geassembleerd om de puri knapperig te houden. Neem contact met ons op voor een cateringofferte.',
  },
]

export default function PaniPuriPage({ params }: Props) {
  const { locale } = params
  const tr = getTranslations(locale)
  const base = locale === 'nl' ? '/nl' : ''
  const isNl = locale === 'nl'

  return (
    <>
      <JsonLd data={getLocalRestaurantSchema(locale, ['Den Haag'], getLocalizedUrl(locale, 'pani-puri-den-haag'))} />
      <JsonLd data={getBreadcrumbSchema([
        { name: tr.common.nav.home, item: getLocalizedUrl(locale) },
        { name: 'Pani Puri Den Haag', item: getLocalizedUrl(locale, 'pani-puri-den-haag') },
      ])} />
      <JsonLd data={getFaqPageSchema(isNl ? faqsNl : faqsEn)} />
      <JsonLd data={getDishPageSchema(locale, 'Pani Puri Den Haag', 'Pani Puri Den Haag', 'Authentic pani puri at Chopras Indian Restaurant Den Haag. Crispy shells filled with spiced potato and tamarind water, made fresh daily at Leyweg 986.', 'Authentieke pani puri bij Chopras Indian Restaurant Den Haag. Knapperige schelpjes gevuld met gekruide aardappel en tamarindwater, dagelijks vers op Leyweg 986.', ['https://schema.org/VegetarianDiet', 'https://schema.org/HalalDiet'])} />

      {/* HERO */}
      <section className="btn-gradient py-20 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-white/40 bg-white/10 backdrop-blur-sm mb-4">
            <span className="text-white text-xs font-medium uppercase tracking-widest">OUR DISHES · CHOPRAS INDIAN RESTAURANT · DEN HAAG</span>
          </div>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight" style={{ textShadow: '0 2px 6px rgba(0,0,0,0.99), 0 6px 24px rgba(0,0,0,0.85)' }}>
            {isNl
              ? 'Pani Puri in Den Haag - Authentiek Indiaas Straatvoedsel bij Chopras'
              : 'Pani Puri in Den Haag - Authentic Indian Street Food at Chopras'}
          </h1>
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-white/40" />
            <span className="text-white/90 text-lg">✦</span>
            <div className="h-[1px] w-16 bg-gradient-to-l from-white/40 to-transparent" />
          </div>
          <p className="text-white/75 text-lg md:text-xl mt-6" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.7)' }}>
            {isNl
              ? 'De krokante schelpje barst. Het gekruide aardappel vult je mond. Het tamarindwater treft als laatste. Dit is golgappa - het meest interactieve gerecht in het Indiaas straatvoedsel.'
              : 'The crispy shell shatters. The spiced potato fills your mouth. The tamarind water hits last. This is golgappa - the most interactive dish in Indian street food.'}
          </p>
        </div>
      </section>

      {/* THE MOMENT */}
      <section className="bg-white py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-left mb-12">
            <h2 className="font-heading font-semibold text-3xl md:text-4xl text-[#06068a] mb-6 leading-tight mt-2 text-left">
              {isNl
              ? 'Een Hap. Vier Smaken. Nul Seconden om te Denken.'
              : 'One Shell. Four Flavours. Zero Time to Think.'}
            </h2>
          </div>
          <div className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed space-y-5">
            {isNl ? (
              <>
                <p>Je pakt de puri. Je dompelt hem in het tamarindwater. Je stopt hem in je mond. Zuur. Pittig. Zoet. Knapperig. En dan is hij weg. Dat is pani puri Den Haag bij <Link href={`${base}/`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">Chopras Indian Restaurant</Link>. Geen gewoon voedsel. Een ervaring die drie seconden duurt maar die je bijblijft.</p>
                <p>Pani puri staat in de Indiase straatvoedseltraditie als het meest interactieve gerecht dat er is. Op elke straathoek in Mumbai staat een chaatverkoper die ze met een hand maakt - duim door de schelpje, lepel aardappel erin, een draai in de pani, direct in uw handen. U eet het staand. U eet het snel. U vraagt direct om meer. Chopras brengt precies die ervaring naar Den Haag, zonder snelkoppelingen.</p>
                <p>Met 4,9 sterren van 1100+ geverifieerde beoordelingen is Chopras Indian Restaurant het hoogst beoordeelde Indiase restaurant in Den Haag. De pani puri die we serveren volgt hetzelfde recept en dezelfde toewijding aan versheid als al het andere uit onze keuken. De kruiden worden elke ochtend vers gemalen. De puri wordt dagelijks gebakken. De pani wordt elke ochtend vers bereid. Dit is <Link href={`${base}/blog/indian-street-food-den-haag`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">authentiek Indiaas straatvoedsel in Den Haag</Link>, geen benadering ervan.</p>
              </>
            ) : (
              <>
                <p>You pick up the puri. You dip it in the tamarind water. You put it in your mouth in one go. Sour. Spicy. Sweet. Crispy. And then it is gone. That is pani puri Den Haag at <Link href={`${base}/`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">Chopras Indian Restaurant</Link>. Not ordinary food. An experience that lasts three seconds and stays with you.</p>
                <p>Pani puri sits at the heart of the Indian street food tradition as the most interactive dish there is. On every corner in Mumbai, a chaat vendor makes them with one hand - thumb through the shell, spoon the potato in, one dip in the pani, straight into your hands. You eat it standing. You eat it fast. You ask for more immediately. Chopras brings exactly that experience to Den Haag, without shortcuts.</p>
                <p>With 4.9 stars from 1100+ verified reviews, Chopras Indian Restaurant is one of the strongest-rated Indian restaurants in Den Haag. The pani puri we serve follows the same recipe and the same commitment to freshness as everything else from our kitchen. The spices are ground fresh every morning. The puri is fried daily. The pani is made the same day. This is <Link href={`${base}/blog/indian-street-food-den-haag`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">authentic Indian street food in Den Haag</Link>, not an approximation of it.</p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* WHAT IS PANI PURI */}
      <section className="bg-white py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-4xl md:text-5xl text-[#06068a] mb-6 leading-[1.3]">
            {isNl
              ? 'Wat Is Pani Puri? En Waarom Heet Het Ook Golgappa?'
              : 'What Is Pani Puri? And Why Is It Also Called Golgappa?'}
          </h2>
          <div className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed space-y-5">
            {isNl ? (
              <>
                <p>Pani puri is een <Link href={`${base}/chaat-den-haag`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">chaat-gerecht uit Den Haag</Link> dat bestaat uit drie componenten: de puri (een kleine, holle, gefrituurde deegbal), de vulling (gekruide aardappel met kikkererwten en specerijen), en de pani (een gekruid water van tamarinde, munt, limoen en Indiase kruiden). Die drie componenten komen samen op het moment van serveren. Er is geen wachttijd bij het eten. Je pakt hem op, dompelt hem in, eet hem op. Dat is het.</p>
                <p>De naam verschilt per regio in India. In Delhi en Noord-India wordt het golgappa genoemd, een naam die veel Den Haag-bezoekers van Hindustaanse families al kennen. In Mumbai en Maharashtra is het pani puri. In West-Bengalen puchka, en in Bihar en Jharkhand gupchup. De basis is altijd dezelfde: holle puri, gekruide vulling, pittig zuur water. Alleen de lokale aanpassing verschilt licht in kruidenmix en scherpte.</p>
                <p>Pani puri is van nature vegetarisch en veganistisch. Geen vlees, geen zuivelproduct, geen ei in een van de traditionele componenten. Dit maakt het een uitstekend gerecht voor gasten die <Link href={`${base}/vegan-menu`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">veganistisch Indiaas eten in Den Haag</Link> zoeken. En omdat de gehele keuken van Chopras Indian Restaurant halal gecertificeerd is, eten alle gasten met volledige zekerheid.</p>
                <p>Het is ook het snelste gerecht in de Indiase keuken. Een geoefende chaatverkoper in India kan meer dan 200 stuks per uur samenstellen. Bij Chopras bereiden we elke bestelling vers, niet vooraf bereid, niet uit een doos, niet van gisteren. De puri die u eet, is diezelfde dag gebakken. Het water is die ochtend bereid. Dat is het verschil dat u proeft in het eerste hapje pani puri Den Haag.</p>
              </>
            ) : (
              <>
                <p>Pani puri is a <Link href={`${base}/chaat-den-haag`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">chaat dish</Link> from India made up of three components: the puri (a small, hollow, deep-fried dough ball), the filling (spiced potato mixed with chickpeas and spices), and the pani (a spiced water made from tamarind, mint, lime and Indian spices). Those three components come together at the moment of serving. There is no preparation time when eating. You pick it up, you dip it in, you eat it. That is it.</p>
                <p>The name changes depending on where in India you are. In Delhi and northern India it is called golgappa, a name many Den Haag visitors from Hindustani families already know. In Mumbai and Maharashtra it is pani puri. In West Bengal it is puchka, and in Bihar it is gupchup. The base is always the same: hollow puri, spiced filling, tart spiced water. Only the local adjustment differs slightly in spice blend and heat level.</p>
                <p>Pani puri is naturally vegetarian and vegan. There is no meat, no dairy, no egg in any of the traditional components. This makes it an excellent choice for guests looking for <Link href={`${base}/vegan-menu`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">vegan Indian food in Den Haag</Link>. And because the entire kitchen at Chopras Indian Restaurant is halal certified, every guest eats with complete confidence.</p>
                <p>It is also the fastest dish in Indian cuisine. A skilled chaat vendor in India can assemble more than 200 pieces per hour. At Chopras we prepare every order fresh, not pre-made, not from a box, not from yesterday. The puri you eat was fried that same day. The water was prepared that morning. That is the difference you taste in the first bite of pani puri Den Haag.</p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* HOW IT IS MADE */}
      <section className="bg-white py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-4xl md:text-5xl text-[#06068a] mb-6 leading-[1.3]">
            {isNl ? 'Hoe Pani Puri Wordt Gemaakt bij Chopras' : 'How Pani Puri Is Made at Chopras'}
          </h2>
          <div className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed space-y-5">
            {isNl ? (
              <>
                <h3 className="font-heading text-3xl text-[#06068a] mt-6 mb-4">De Puri</h3>
                <p>De puri begint met maida, fijn tarwebloem, vermengd met semolina, water en zout tot een strak, elastisch deeg. Het deeg wordt uitgerold en uitgestoken in kleine ronde vormpjes. Elk rondje gaat in hete olie op de juiste temperatuur. Te laag en ze worden vet. Te hoog en ze verbranden voor ze opbollen. De puri moet volledig hol opblazen en goudgeel worden, niet bruin. Chopras bakt de puri elke dag vers, twee tot drie keer per service, zodat u nooit een oudbakken puri eet van ons <Link href={`${base}/menu`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">volledige Indiase menu in Den Haag</Link>.</p>
                <h3 className="font-heading text-3xl text-[#06068a] mt-6 mb-4">De Vulling</h3>
                <p>Verse aardappelen worden die ochtend gekookt, niet te zacht. Ze worden met de hand in kleine stukjes gebroken en gemengd met gekookte kikkererwten, fijngehakte groene chili, chaat masala, garam masala, kurkuma en zwart zout. Niet gepureerd. Niet glad. De vulling moet textuur hebben. U voelt elk onderdeel afzonderlijk: de aardappel, de kikkererwt, de specerij. Onze kruiden worden elke ochtend vers gemalen uit hele specerijen die rechtstreeks uit India worden betrokken, de kern van <Link href={`${base}/blog/vegetarian-indian-food-den-haag`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">authentiek vegetarisch Indiaas eten Den Haag</Link>.</p>
                <h3 className="font-heading text-3xl text-[#06068a] mt-6 mb-4">De Pani</h3>
                <p>De pani is wat dit gerecht zijn naam geeft - pani betekent water in het Hindi. Het water wordt bereid met verse munt, koriander, geraspte gember, groene chili, tamarindpasta, limoen, zwart zout en garam masala. Alles wordt fijngemalen en gezeefd tot een heldere, intens gearomatiseerde vloeistof. Geen kunstmatige smaakmakers. Geen conserveermiddelen. De pani wordt elke ochtend vers bereid bij Chopras Indian Restaurant, op hetzelfde niveau als alles wat wij serveren op Leyweg 986. Dit is waarom hij fris smaakt, helder smaakt, levendig smaakt.</p>
                <h3 className="font-heading text-3xl text-[#06068a] mt-6 mb-4">De Samenstelling</h3>
                <p>Wanneer u pani puri bestelt, doet onze kok het volgende. Hij pakt een puri. Met zijn duim maakt hij een klein gat aan de bovenkant, niet te groot, niet te klein. Hij lepelt de aardappelvulling erin. Hij voegt een scheutje zoete tamarindchutney toe. Dan dompelt hij hem volledig onder in de pani. Nu heeft u uw pani puri. U eet hem onmiddellijk. Elke seconde die u wacht, verliest u knapperigheid. Het ideale moment is direct na de samenstelling. Dat is de kunst van dit gerecht. <Link href={`${base}/contact`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">Reserveer een tafel bij Chopras</Link> om het zelf te ervaren.</p>
              </>
            ) : (
              <>
                <h3 className="font-heading text-3xl text-[#06068a] mt-6 mb-4">The Puri</h3>
                <p>The puri starts with maida, fine wheat flour, mixed with semolina, water and salt into a tight, elastic dough. The dough is rolled out and cut into small rounds. Each round goes into hot oil at the right temperature. Too low and they become greasy. Too high and they burn before they puff. The puri must inflate fully hollow and turn golden, not brown. Chopras fries puri fresh every day, two to three times per service, so you never eat a stale one from our <Link href={`${base}/menu`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">full Indian restaurant menu Den Haag</Link>.</p>
                <h3 className="font-heading text-3xl text-[#06068a] mt-6 mb-4">The Filling</h3>
                <p>Fresh potatoes are boiled that morning, not too soft. They are broken by hand into small pieces and mixed with cooked chickpeas, finely chopped green chilli, chaat masala, garam masala, turmeric and black salt (kala namak). Not mashed. Not smooth. The filling must have texture. You feel each component separately: the potato, the chickpea, the spice. Our spices are ground fresh every morning from whole spices sourced directly from India, which is the foundation of <Link href={`${base}/blog/vegetarian-indian-food-den-haag`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">authentic vegetarian Indian food Den Haag</Link>.</p>
                <h3 className="font-heading text-3xl text-[#06068a] mt-6 mb-4">The Pani</h3>
                <p>The pani is what gives this dish its name - pani means water in Hindi. The water is prepared with fresh mint, coriander, grated ginger, green chilli, tamarind paste, lime, black salt and garam masala. Everything is ground fine and strained into a clear, intensely aromatic liquid. No artificial flavourings. No preservatives. The pani is prepared fresh every morning at Chopras Indian Restaurant, held to the same standard as everything we serve at Leyweg 986. This is why it tastes bright, clear and alive.</p>
                <h3 className="font-heading text-3xl text-[#06068a] mt-6 mb-4">The Assembly</h3>
                <p>When you order pani puri, our chef does this. He picks up a puri. With his thumb he makes a small hole at the top, not too big, not too small. He spoons the potato filling in. He adds a dash of sweet tamarind chutney. Then he dips the whole thing into the pani. Now you have your pani puri. You eat it immediately. Every second you wait, you lose crispiness. The perfect moment is directly after assembly. That is the skill of this dish. <Link href={`${base}/contact`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">Reserve a table at Chopras</Link> to experience it yourself.</p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* GEO BLOCK */}
      <section className="btn-gradient py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-4xl md:text-5xl text-white mb-6 leading-[1.3]">
            {isNl
              ? 'Waar Vind Ik Authentieke Pani Puri in Den Haag?'
              : 'Where Can I Find Authentic Pani Puri in Den Haag?'}
          </h2>
          <div className="font-body text-white/80 text-lg leading-relaxed">
            {isNl ? (
              <p className="text-white/80">Authentieke pani puri in Den Haag is beschikbaar bij Chopras Indian Restaurant op Leyweg 986, 2545 GW Den Haag. De keuken bakt dagelijks verse puri, vult elke schelpje met gekruid aardappel en tamarindwater, en serveert elke bestelling direct. Met 4,9 sterren van 1100+ geverifieerde beoordelingen is Chopras Indian Restaurant het hoogst beoordeelde Indiase restaurant in Den Haag. Open dinsdag tot zondag vanaf 16:30. Bekijk ons volledige <Link href={`${base}/chaat-den-haag`} className="text-white hover:text-white font-semibold">chaat-menu Den Haag</Link> of <Link href={`${base}/contact`} className="text-white hover:text-white font-semibold">reserveer een tafel bij Chopras Indian Restaurant</Link>.</p>
            ) : (
              <p className="text-white/80">Authentic pani puri in Den Haag is available at Chopras Indian Restaurant, located at Leyweg 986, 2545 GW Den Haag. The kitchen fries fresh puri daily, fills each shell with spiced potato and tamarind water, and serves every order immediately. With 4.9 stars from 1100+ verified reviews, Chopras Indian Restaurant is one of the strongest-rated Indian restaurants in Den Haag. Open Tuesday to Sunday from 16:30. Browse our full <Link href={`${base}/chaat-den-haag`} className="text-white hover:text-white font-semibold">chaat menu Den Haag</Link> or <Link href={`${base}/contact`} className="text-white hover:text-white font-semibold">reserve a table at Chopras Indian Restaurant</Link>.</p>
            )}
          </div>
        </div>
      </section>

      {/* VEGETARIAN / VEGAN / HALAL */}
      <section className="bg-white py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-4xl md:text-5xl text-[#06068a] mb-6 leading-[1.3]">
            {isNl
              ? 'Pani Puri Is 100% Vegetarisch, Veganistisch en Halal Gecertificeerd'
              : 'Pani Puri Is 100% Vegetarian, Vegan and Halal Certified'}
          </h2>
          <div className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed space-y-5">
            {isNl ? (
              <>
                <p>Pani puri is een van de weinige gerechten in de Indiase keuken die van nature volledig plantaardig is. Geen vlees. Geen vis. Geen zuivel. Geen ei. De puri is bloem en water. De vulling is aardappel en kikkererwten. De pani is een water van kruiden en specerijen. Elk onderdeel is vegetarisch en veganistisch van nature. Er is niets aan het recept veranderd om dit te bereiken.</p>
                <p>Bij Chopras Indian Restaurant is de gehele keuken <Link href={`${base}/halal-food-den-haag`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">volledig halal gecertificeerd</Link>. Dit betekent niet alleen dat de vleesgerechten halal zijn. Het betekent dat er geen niet-halal vlees in de keuken is. Geen kruisbesmetting. Geen onduidelijkheid. Gasten die halal eten kunnen elk gerecht op het menu met vertrouwen bestellen, inclusief de pani puri en alle andere <Link href={`${base}/chaat-den-haag`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">chaat-specialiteiten in Den Haag</Link>.</p>
                <p>Als u meer wil ontdekken over onze plantaardige opties, bekijk dan ons <Link href={`${base}/vegan-menu`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">veganistisch Indiaas menu Den Haag</Link>. Andere populaire vegetarische en veganistische gerechten bij Chopras zijn <Link href={`${base}/soya-chaap-den-haag`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">soya chaap Den Haag</Link> en <Link href={`${base}/dal-makhani-den-haag`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">dal makhani Den Haag</Link>, langzaam gestoofde zwarte linzen met boter.</p>
              </>
            ) : (
              <>
                <p>Pani puri is one of the few dishes in Indian cuisine that is naturally fully plant-based. No meat. No fish. No dairy. No egg. The puri is flour and water. The filling is potato and chickpeas. The pani is a water of herbs and spices. Every component is vegetarian and vegan by nature. Nothing in the recipe has been altered to achieve this.</p>
                <p>At Chopras Indian Restaurant, the entire kitchen is <Link href={`${base}/halal-food-den-haag`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">fully halal certified</Link>. This does not just mean the meat dishes are halal. It means there is no non-halal meat in the kitchen at all. No cross-contamination. No ambiguity. Guests who eat halal can order any dish on the menu with complete confidence, including pani puri and all other <Link href={`${base}/chaat-den-haag`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">chaat specialities in Den Haag</Link>.</p>
                <p>If you want to explore more of our plant-based options, browse our <Link href={`${base}/vegan-menu`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">vegan Indian menu Den Haag</Link>. Other popular vegetarian and vegan dishes at Chopras include <Link href={`${base}/soya-chaap-den-haag`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">soya chaap Den Haag</Link> and <Link href={`${base}/dal-makhani-den-haag`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">dal makhani Den Haag</Link>, slow-cooked black lentils with butter.</p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-20 px-6 md:px-16">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-heading font-semibold text-3xl md:text-4xl text-[#06068a] mb-6 leading-tight mt-2 text-center">
              {isNl
                ? 'Veelgestelde Vragen Over Pani Puri in Den Haag'
                : 'Frequently Asked Questions About Pani Puri in Den Haag'}
            </h2>
          </div>
          <FaqAccordion faqs={isNl ? faqsNl : faqsEn} locale={locale} />
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-4xl md:text-5xl text-[#06068a] mb-6 leading-[1.3]">
            {isNl
              ? 'Reserveer een Tafel en Ervaar Pani Puri Den Haag'
              : 'Reserve a Table and Experience Pani Puri Den Haag'}
          </h2>
          <div className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed space-y-5 mb-8">
            {isNl ? (
              <>
                <p>Chopras Indian Restaurant is open dinsdag tot zondag vanaf 16:30 op Leyweg 986, 2545 GW Den Haag. Pani puri wordt geserveerd als onderdeel van ons <Link href={`${base}/menu`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">volledige Indiase menu Den Haag</Link> naast andere chaat-opties. Lees ook ons artikel over <Link href={`${base}/blog/indian-street-food-den-haag`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">Indiaas straatvoedsel in Den Haag</Link> voor de volledige selectie.</p>
                <p>Wilt u pani puri voor een feestje of evenement? Chopras Indian Restaurant verzorgt ook <Link href={`${base}/catering`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">Indiaas catering Den Haag</Link> voor verjaardagen, bruiloften en bedrijfsbijeenkomsten. Pani puri werkt als een interactief en indrukwekkend startgerecht voor elke groep.</p>
              </>
            ) : (
              <>
                <p>Chopras Indian Restaurant is open Tuesday to Sunday from 16:30 at Leyweg 986, 2545 GW Den Haag. Pani puri is served as part of our <Link href={`${base}/menu`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">full Indian restaurant menu Den Haag</Link> alongside other chaat options. Read our guide to <Link href={`${base}/blog/indian-street-food-den-haag`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">Indian street food in Den Haag</Link> for the complete selection.</p>
                <p>Want pani puri for a party or event? Chopras Indian Restaurant also provides <Link href={`${base}/catering`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">Indian catering Den Haag</Link> for birthdays, weddings and corporate gatherings. Pani puri works as an interactive and impressive starter dish for any group size.</p>
              </>
            )}
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href={`${base}/contact`}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white btn-gradient px-6 py-3 text-white text-sm font-semibold uppercase tracking-wide transition-all duration-200 ease-out active:scale-[0.98] min-h-[48px]"
            >
              {tr.common.reserve}
            </Link>
            <Link
              href={`${base}/menu`}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white btn-gradient px-6 py-3 text-white text-sm font-semibold uppercase tracking-wide transition-all duration-200 ease-out active:scale-[0.98] min-h-[48px]"
            >
              {tr.common.viewMenu}
            </Link>
            <Link
              href={`${base}/chaat-den-haag`}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white btn-gradient px-6 py-3 text-white text-sm font-semibold uppercase tracking-wide transition-all duration-200 ease-out active:scale-[0.98] min-h-[48px]"
            >
              {isNl ? 'Meer Chaat Ontdekken' : 'Explore More Chaat'}
            </Link>
          </div>
        </div>
      </section>

      {/* INTERNAL LINKS */}
      <section className="bg-white py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-4xl md:text-5xl text-[#06068a] mb-6 leading-[1.3]">
            {isNl ? 'Meer Gerechten bij Chopras Indian Restaurant Den Haag' : 'Explore More Dishes at Chopras Indian Restaurant Den Haag'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Link href={`${base}/chaat-den-haag`} className="block p-6 bg-[#F7F8FC] rounded-lg border border-gray-200 hover:border-[#06068a]/30 hover:shadow-lg transition-all">
              <p className="text-[#06068a] text-sm font-semibold uppercase tracking-widest mb-2">{isNl ? 'Streetfood' : 'Street Food'}</p>
              <p className="text-[#06068a] font-semibold">{isNl ? 'Chaat Den Haag - authentiek Indiaas straatvoedsel' : 'Chaat Den Haag - authentic Indian street food'}</p>
            </Link>
            <Link href={`${base}/soya-chaap-den-haag`} className="block p-6 bg-[#F7F8FC] rounded-lg border border-gray-200 hover:border-[#06068a]/30 hover:shadow-lg transition-all">
              <p className="text-[#06068a] text-sm font-semibold uppercase tracking-widest mb-2">{isNl ? 'Veganistisch' : 'Vegan'}</p>
              <p className="text-[#06068a] font-semibold">{isNl ? 'Soya Chaap Den Haag bij Chopras' : 'Soya Chaap Den Haag at Chopras'}</p>
            </Link>
            <Link href={`${base}/dal-makhani-den-haag`} className="block p-6 bg-[#F7F8FC] rounded-lg border border-gray-200 hover:border-[#06068a]/30 hover:shadow-lg transition-all">
              <p className="text-[#06068a] text-sm font-semibold uppercase tracking-widest mb-2">{isNl ? 'Vegetarisch' : 'Vegetarian'}</p>
              <p className="text-[#06068a] font-semibold">{isNl ? 'Dal Makhani Den Haag' : 'Dal Makhani Den Haag'}</p>
            </Link>
            <Link href={`${base}/catering`} className="block p-6 bg-[#F7F8FC] rounded-lg border border-gray-200 hover:border-[#06068a]/30 hover:shadow-lg transition-all">
              <p className="text-[#06068a] text-sm font-semibold uppercase tracking-widest mb-2">{isNl ? 'Catering' : 'Catering'}</p>
              <p className="text-[#06068a] font-semibold">{isNl ? 'Indiaas catering Den Haag voor evenementen' : 'Indian catering Den Haag for events'}</p>
            </Link>
          </div>
          <div className="text-center space-y-4">
            <p className="font-body text-[#1A1A1A] text-base">
              <Link href={`${base}/`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">
                {isNl ? 'Chopras Indian Restaurant - beste Indiase restaurant in Den Haag' : 'Chopras Indian Restaurant - best Indian restaurant in Den Haag'}
              </Link>
            </p>
            <p className="font-body text-[#1A1A1A] text-base">
              {isNl ? 'Bekijk het volledige menu of' : 'View the full menu or'}{' '}
              <Link href={`${base}/contact`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">
                {isNl ? 'maak een reservering bij Chopras Indian Restaurant Den Haag' : 'book a table at Chopras Indian Restaurant Den Haag'}
              </Link>.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
