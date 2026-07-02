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
    question: 'Is chaat vegetarisch?',
    answer: 'Ja. Alle chaat bij Chopras Indian Restaurant is volledig vegetarisch. Papdi chaat, dahi puri, aloo tikki en pani puri zijn gemaakt van aardappel, kikkererwten, yoghurt en specerijen. Geen vlees, geen vis. Ideaal voor vegetariërs die authentiek Indiaas straatvoedsel willen proberen in Den Haag.',
  },
  {
    question: 'Wat is het verschil tussen papdi chaat en dahi puri?',
    answer: 'Papdi chaat is gebouwd op een bed van krokante wafers met kikkererwten, aardappel, tamarinde chutney en muntchutney. Dahi puri is een holle puri gevuld van binnenuit met dezelfde ingrediënten plus koele yoghurt. Papdi chaat is krokanter en scherper van smaak. Dahi puri is romiger en milder. Beide zijn klassiek Mumbaistraatvoedsel.',
  },
  {
    question: 'Is chaat gezond?',
    answer: 'Chaat bevat kikkererwten, aardappel, yoghurt en verse kruiden. Het is voedzaam en rijk aan plantaardige eiwitten. De papdi en aloo tikki worden gebakken, dus het is geen dieetvoedsel. Maar het is echte voeding met echte ingrediënten. Geen conserveringsmiddelen. Dagelijks vers gemaakt op Leyweg 986, Den Haag.',
  },
  {
    question: 'Kan ik chaat meenemen?',
    answer: 'Chaat smaakt het beste wanneer het net gemaakt is. De krokante papdi verliest zijn textuur snel. We raden aan om chaat ter plaatse te eten bij Chopras op Leyweg 986, Den Haag. Voor afhalen is aloo tikki de beste keuze omdat die beter meereist dan de natte chaat-varianten.',
  },
  {
    question: 'Serveren jullie chaat op cateringevenementen?',
    answer: 'Ja. Chaat is een populaire keuze voor Indiaas catering in Den Haag. Papdi chaat, aloo tikki en pani puri worden vers bereid en geserveerd op verjaardagen, bruiloften en bedrijfsfeesten. Neem contact op via info [at] chopras.nl voor een vrijblijvende offerte.',
  },
  {
    question: 'Wat is pani puri precies?',
    answer: 'Pani puri is een holle, krokante bol gevuld met gekruide aardappel, kikkererwten en tamarinde water. Je eet het in één hap. Het barst open in je mond met een explosie van zoet, zuur en pittig tegelijk. Bij Chopras Indian Restaurant in Den Haag wordt het bereid zoals in Mumbai.',
  },
]

const faqsEn: Array<{ question: string; answer: string }> = [
  {
    question: 'Is chaat vegetarian?',
    answer: 'Yes. All chaat at Chopras Indian Restaurant is fully vegetarian. Papdi chaat, dahi puri, aloo tikki and pani puri are made from potato, chickpeas, yoghurt and spices. No meat, no fish. Perfect for vegetarians looking for authentic Indian street food in Den Haag.',
  },
  {
    question: 'What is the difference between papdi chaat and dahi puri?',
    answer: 'Papdi chaat is built on a bed of crispy wafers with chickpeas, potato, tamarind chutney and mint chutney. Dahi puri is a hollow puri filled from inside with the same ingredients plus cool yoghurt. Papdi chaat is crispier and sharper. Dahi puri is creamier and milder. Both are classic Mumbai street food.',
  },
  {
    question: 'Is chaat healthy?',
    answer: 'Chaat contains chickpeas, potato, yoghurt and fresh spices. It is nourishing and rich in plant-based protein. The papdi and aloo tikki are fried, so it is not diet food. But it is real food with real ingredients. No preservatives. No artificial flavours. Made fresh every day at Leyweg 986, Den Haag.',
  },
  {
    question: 'Can I take chaat home?',
    answer: 'Chaat tastes best the moment it is made. The crispy papdi loses its texture quickly. We recommend eating chaat on the spot at Chopras at Leyweg 986, Den Haag. For takeaway, aloo tikki is the best choice because it travels better than the wet chaat varieties.',
  },
  {
    question: 'Do you serve chaat at catering events?',
    answer: 'Yes. Chaat is a popular choice for Indian catering in Den Haag. Papdi chaat, aloo tikki and pani puri are made fresh and served at birthday parties, weddings and corporate dinners. Contact us at info [at] chopras.nl for a free catering quote.',
  },
  {
    question: 'What exactly is pani puri?',
    answer: 'Pani puri is a hollow, crispy shell filled with spiced potato, chickpeas and tamarind water. You eat it in one bite. It bursts in your mouth with an explosion of sweet, sour and spicy all at once. At Chopras Indian Restaurant in Den Haag, it is made the way it is made in Mumbai.',
  },
]

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params
  const titles = {
    en: 'Chaat Den Haag | Chopras Indian Restaurant',
    nl: 'Chaat Den Haag | Chopras Indian Restaurant',
  }
  const descriptions = {
    en: 'Authentic chaat Den Haag at Chopras Indian Restaurant. Papdi chaat, dahi puri and aloo tikki fresh daily at Leyweg 986. Best street food in The Hague.',
    nl: 'Chaat bij Chopras Den Haag. Papdi chaat, aloo tikki, pani puri. Authentiek Mumbai straatvoedsel. Bestel online of bezoek Leyweg 986.',
  }
  return {
    title: titles[locale],
    description: descriptions[locale],
    alternates: {
      canonical: getLocalizedUrl(locale, 'chaat-den-haag'),
      languages: {
        en: getLocalizedUrl('en', 'chaat-den-haag'),
        nl: getLocalizedUrl('nl', 'chaat-den-haag'),
        'x-default': getLocalizedUrl('en', 'chaat-den-haag'),
      },
    },
    openGraph: {
      title: titles[locale],
      description: descriptions[locale],
      url: getLocalizedUrl(locale, 'chaat-den-haag'),
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

export default function ChaatPage({ params }: Props) {
  const { locale } = params
  const tr = getTranslations(locale)
  const base = locale === 'nl' ? '/nl' : ''
  const isNl = locale === 'nl'

  return (
    <>
      <JsonLd data={getLocalRestaurantSchema(locale, ['Den Haag'], getLocalizedUrl(locale, 'chaat-den-haag'))} />
      <JsonLd data={getBreadcrumbSchema([
        { name: tr.common.nav.home, item: getLocalizedUrl(locale) },
        { name: 'Chaat Den Haag', item: getLocalizedUrl(locale, 'chaat-den-haag') },
      ])} />
      <JsonLd data={getFaqPageSchema(isNl ? faqsNl : faqsEn)} />
      <JsonLd data={getDishPageSchema(locale, 'Chaat Den Haag', 'Chaat Den Haag', 'Authentic Indian street food chaat at Chopras Indian Restaurant Den Haag. Papdi chaat, dahi puri and aloo tikki made fresh daily at Leyweg 986.', 'Authentiek Indiaas street food chaat bij Chopras Indian Restaurant Den Haag. Papdi chaat, dahi puri en aloo tikki dagelijks vers bereid op Leyweg 986.', ['https://schema.org/VegetarianDiet', 'https://schema.org/HalalDiet'])} />

      {/* HERO */}
      <section className="bg-[#1B2B5E] py-20 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-white/40 bg-white/10 backdrop-blur-sm mb-4">
            <span className="text-white text-xs font-medium uppercase tracking-widest">
              • OUR DISHES · CHOPRAS INDIAN RESTAURANT · DEN HAAG •
            </span>
          </div>
          <h1 
            className="font-heading text-4xl md:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-6 leading-tight"
            style={{ textShadow: '0 2px 8px rgba(0,0,0,0.6)' }}
          >
            {isNl ? 'Chaat in Den Haag - Indiaas Straatvoedsel bij Chopras' : 'Chaat in Den Haag - Indian Street Food at Chopras'}
          </h1>
          <p
            className="text-white/75 text-lg md:text-xl"
            style={{ textShadow: '0 1px 4px rgba(0,0,0,0.7)' }}
          >
            {isNl
              ? 'Papdi chaat, dahi puri, aloo tikki en pani puri. Gemaakt zoals in Mumbai. Zonder aanpassingen. Elke dag vers bij Leyweg 986, Den Haag.'
              : 'Papdi chaat, dahi puri, aloo tikki and pani puri. Made the way Mumbai makes it. No adaptations. Fresh every day at Leyweg 986, Den Haag.'}
          </p>
        </div>
      </section>

      {/* WHAT IS CHAAT */}
      <section className="bg-[#F7F8FC] py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-6 leading-[1.3]">
            {isNl ? 'Wat Is Chaat? Mumbais Straatvoedsel in Jouw Handen' : 'What Is Chaat? Mumbai Street Food in Your Hands'}
          </h2>
          <div className="space-y-5 font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
            {isNl ? (
              <>
                <p>Chaat Den Haag is geen enkel gerecht. Het is een hele categorie van Indiaas straatvoedsel: papdi chaat, aloo tikki, <Link href={`${base}/pani-puri-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">pani puri</Link>, dahi puri. Wat ze gemeen hebben is de manier waarop ze smaken: zuur en zoet tegelijk, krokant en romig in dezelfde hap, pittig maar nooit overweldigend. Chaat is voedsel dat alle zintuigen tegelijk aanspreekt. Het is niet iets wat je rustig opeet. Het is iets wat je proeft, voelt en onthoudt.</p>
                <p>Mumbai draait op chaat. Bij elk station, bij elke tempel, bij elke drukke straathoek staat een chaat-verkoper. Ze maken elke dag dezelfde dingen: papdi chaat, aloo tikki, pani puri, dahi puri. Miljoenen mensen eten het. Niet vanwege de mode, maar omdat het gewoon goed is. <Link href={`${base}/blog/indian-street-food-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">Indiaas straatvoedsel in Den Haag</Link> op dit niveau is zeldzaam. De meeste restaurants serveren currys en naan. Chaat vereist iets anders: de vaardigheid om vijf smaakniveaus tegelijk in balans te houden en elk element op het juiste moment te serveren.</p>
                <p>Bij Chopras Indian Restaurant wordt chaat gemaakt zonder aanpassingen. De specerijen zijn rechtstreeks uit India afkomstig en worden elke ochtend vers gemalen. De tamarinde chutney is zelfgemaakt. De papdi wordt vers gebakken. Alle chaat is volledig <Link href={`${base}/vegan-menu`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">vegetarisch</Link>: kikkererwten, aardappel, yoghurt en bloem. Geen vlees, geen compromissen ten aanzien van authenticiteit. Chopras heeft 4,9 sterren van 800+ Google-beoordelingen, en de chaat-selectie is een van de redenen waarom gasten steeds terugkomen.</p>
                <p><strong>Chaat is verslavend.</strong> Niet als een reclameslogan. Als een feit. De combinatie van tamarinde, muntchutney, chaat masala en verse yoghurt is zo precies uitgebalanceerd dat één portie papdi chaat zelden genoeg is. Dit is waarom chaat al generaties lang de straten van Mumbai domineert en waarom het nu zijn weg vindt naar de tafels van Leyweg 986. Combineer het met onze andere <Link href={`${base}/soya-chaap-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">vegetarische specialiteiten zoals soya chaap</Link> voor de volledige straatvoedselervaring.</p>
              </>
            ) : (
              <>
                <p>Chaat Den Haag is not a single dish. It is a whole category of Indian street food: papdi chaat, aloo tikki, <Link href={`${base}/pani-puri-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">pani puri</Link>, dahi puri. What they have in common is the way they taste: sour and sweet in the same bite, crispy and smooth at once, spiced but never overwhelming. Chaat engages every sense simultaneously. It is not something you eat quietly. It is something you taste, feel and remember.</p>
                <p>Mumbai runs on chaat. At every railway station, every temple gate, every busy street corner, there is a chaat vendor. They make the same things every day: papdi chaat, aloo tikki, pani puri, dahi puri. Millions of people eat it. Not because it is fashionable - because it is genuinely that good. Finding authentic <Link href={`${base}/blog/indian-street-food-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">Indian street food in Den Haag</Link> at this standard is rare. Most restaurants serve curries and naan. Chaat requires a different skill: balancing five flavour layers simultaneously and timing every element perfectly.</p>
                <p>At Chopras Indian Restaurant, chaat is made without adjustments. Spices are sourced directly from India and ground fresh every morning before service. The tamarind chutney is made in-house. The papdi is freshly fried. All chaat is fully <Link href={`${base}/vegan-menu`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">vegetarian</Link>: chickpeas, potato, yoghurt and flour. No meat, no compromise on authenticity. Chopras carries 4.9 stars from 800+ Google reviews, and the chaat selection is one of the reasons guests return every time.</p>
                <p><strong>Chaat is addictive.</strong> Not as a marketing claim. As a fact. The combination of tamarind, mint chutney, chaat masala and fresh yoghurt is so precisely balanced that a single plate of papdi chaat rarely feels like enough. This is why chaat has dominated the streets of Mumbai for generations - and why it now finds its way to the tables at Leyweg 986. Pair it with our other <Link href={`${base}/soya-chaap-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">vegetarian specialities like soya chaap</Link> for the full street food experience.</p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* OUR CHAAT SPECIALITIES */}
      <section className="bg-white py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-6 leading-[1.3]">
            {isNl ? 'De Chaat-Specialiteiten bij Chopras Indian Restaurant' : 'The Chaat Specialities at Chopras Indian Restaurant'}
          </h2>
          <div className="space-y-10 font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
            {isNl ? (
              <>
                <div>
                  <h3 className="font-vibes text-3xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-4">Papdi Chaat</h3>
                  <p>Papdi chaat begint met papdi: dunne, krokante wafers van bloem, gebakken tot ze perfect breekbaar zijn. Daarop komen gekookte kikkererwten en gekruide aardappel, gevolgd door twee chutneys tegelijk. Tamarinde chutney voor het zure en zoete. Muntchutney voor het frisse. Dan de koele yoghurt. Dan chaat masala en zwart zout als afsluiting. Elk element heeft een functie. Niets is decoratief. Wanneer je een hap neemt, breekt alles tegelijk: krokant, romig, zuur, zoet, pittig in één seconde. Dit is waarom papdi chaat het meest bestelde gerecht op onze chaat-kaart is.</p>
                </div>

                <div>
                  <h3 className="font-vibes text-3xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-4">Aloo Tikki</h3>
                  <p>Aloo tikki is een klein aardappelkoekje - maar beschrijf het zo en je doet het tekort. Het is aardappel gemengd met groene chili, gember en verse specerijen, gevormd in een schijf en gebakken in hete olie tot de buitenkant goud en knapperig is terwijl het midden zacht blijft. Geserveerd op papdi met tamarinde en korianderchutneys, koele dahi er bovenop en een royale bestrooing van chaat masala. <Link href={`${base}/blog/vegetarian-indian-food-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">Vegetarisch Indiaas eten in Den Haag</Link> bereikt hier zijn hoogtepunt. Aloo tikki is straatvoedsel dat mensen terugbrengt naar de kindertijd, in elke stad in India.</p>
                </div>

                <div>
                  <h3 className="font-vibes text-3xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-4">Dahi Puri</h3>
                  <p>Dahi puri is een holle puri, gebakken tot hij perfect krokant is, gevuld van binnenuit. Aardappel, kikkererwten, tamarinde chutney, muntchutney en dan een volle lepel koele yoghurt als afsluiting. Het contrast is het punt: de warmte van de specerijen tegenover de koelte van de dahi, de knapperigheid van de puri tegenover de zachtheid van de vulling. Afgewerkt met chaat masala en rode chilipoeier. Dit is chaat die je net zoveel voelt als proeft. Dahi puri is volledig <Link href={`${base}/halal-food-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">halal gecertificeerd</Link>, net als alle gerechten bij Chopras.</p>
                </div>

                <div>
                  <h3 className="font-vibes text-3xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-4">Pani Puri</h3>
                  <p>Pani puri is de meest directe chaat-ervaring. Een holle, krokante bol. Een gat bovenin geprikt. Gevuld met gekruide aardappel, kikkererwten en een lepel pani: het speciale tamarinde- en muntwater dat in één seconde naar binnen glijdt. Één hap. Het barst open in je mond: zoet, zuur, pittig, alles tegelijk. Je kunt het moeilijk rustig eten. Dat is precies het punt. Bekijk onze volledige <Link href={`${base}/pani-puri-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">pani puri-pagina</Link> voor meer over dit iconische gerecht.</p>
                </div>
              </>
            ) : (
              <>
                <div>
                  <h3 className="font-vibes text-3xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-4">Papdi Chaat</h3>
                  <p>Papdi chaat starts with papdi: thin, crispy wafers made from flour, fried until perfectly brittle. On top go cooked chickpeas and spiced potato, followed by two chutneys at once. Tamarind chutney for the sour and sweet. Mint chutney for the brightness. Then the cold yoghurt. Then chaat masala and black salt as the finish. Every element has a function. Nothing is decorative. When you take a bite, everything breaks at once: crispy, creamy, sour, sweet, spiced in a single second. This is why papdi chaat is the most ordered item on our chaat menu.</p>
                </div>

                <div>
                  <h3 className="font-vibes text-3xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-4">Aloo Tikki</h3>
                  <p>Aloo tikki is a small potato patty - but describe it that way and you do it a disservice. It is potato mixed with green chilli, ginger and fresh spices, shaped into a disc and fried in hot oil until the outside is golden and crisp while the centre stays soft. Served on papdi with tamarind and coriander chutneys, cool dahi on top, and a generous dusting of chaat masala. <Link href={`${base}/blog/vegetarian-indian-food-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">Vegetarian Indian food in Den Haag</Link> reaches its peak here. Aloo tikki is street food that takes people back to childhood, in every city across India.</p>
                </div>

                <div>
                  <h3 className="font-vibes text-3xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-4">Dahi Puri</h3>
                  <p>Dahi puri is a hollow puri, fried until perfectly crisp, filled from the inside. Potato, chickpeas, tamarind chutney, mint chutney and then a full spoon of cold yoghurt as the finish. The contrast is the point: the heat of the spices against the coolness of the dahi, the crunch of the puri against the softness of the filling. Finished with chaat masala and red chilli powder. This is chaat you feel as much as taste. Dahi puri is fully <Link href={`${base}/halal-food-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">halal certified</Link>, like every dish at Chopras.</p>
                </div>

                <div>
                  <h3 className="font-vibes text-3xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-4">Pani Puri</h3>
                  <p>Pani puri is the most direct chaat experience. A hollow, crispy shell. A hole punched in the top. Filled with spiced potato, chickpeas and a spoon of pani: the special tamarind and mint water that goes down in one gulp. One bite. It bursts in your mouth: sweet, sour, spicy, everything at once. You cannot eat it slowly. That is precisely the point. See our dedicated <Link href={`${base}/pani-puri-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">pani puri page</Link> for more on this iconic dish.</p>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* GEO BLOCK */}
      <section className="bg-[#1B2B5E] py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-6 leading-[1.3]">
            {isNl
              ? 'Waar Vind Je Authentieke Chaat en Indiaas Straatvoedsel in Den Haag?'
              : 'Where Can You Find Authentic Chaat and Indian Street Food in Den Haag?'}
          </h2>
          <div className="font-body text-white/80 text-lg leading-relaxed">
            {isNl ? (
              <p>Authentieke chaat en Indiaas straatvoedsel in Den Haag vindt u bij Chopras Indian Restaurant, Leyweg 986, 2545 GW Den Haag. Papdi chaat, <Link href={`${base}/pani-puri-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">pani puri</Link>, dahi puri en aloo tikki worden dagelijks vers bereid. Chopras is beoordeeld met 4,9 sterren door 800+ Google-reviewers, de hoogst gewaardeerde Indiase restaurant in Den Haag. Open dinsdag tot en met zondag van 16:30 tot 22:30. <Link href={`${base}/contact`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">Reserveer een tafel</Link> en proef de volledige chaat-selectie.</p>
            ) : (
              <p>Authentic chaat and Indian street food in Den Haag is found at Chopras Indian Restaurant, Leyweg 986, 2545 GW Den Haag. Papdi chaat, <Link href={`${base}/pani-puri-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">pani puri</Link>, dahi puri and aloo tikki are made fresh every day. Chopras is rated 4.9 stars by 800+ Google reviewers, one of the strongest-rated Indian restaurants in The Hague. Open Tuesday to Sunday from 16:30 to 22:30. <Link href={`${base}/contact`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">Reserve your table</Link> and taste the full chaat selection.</p>
            )}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#F7F8FC] py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-6 leading-[1.3]">
            {isNl ? 'Veelgestelde Vragen Over Chaat' : 'Frequently Asked Questions About Chaat'}
          </h2>
          <FaqAccordion faqs={isNl ? faqsNl : faqsEn} locale={locale} />
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-6 leading-[1.3]">
            {isNl ? 'Proef de Chaat-Selectie bij Chopras in Den Haag' : 'Taste the Chaat Selection at Chopras in Den Haag'}
          </h2>
          <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed mb-8">
            {isNl ? (
              <>
                Chaat is voedsel dat je deelt. Bestel een selectie voor de tafel en laat iedereen proeven. Bezoek Chopras Indian Restaurant op Leyweg 986, open van dinsdag tot zondag van 16:30 tot 22:30. Bekijk het{' '}
                <Link href={`${base}/menu`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">volledige menu</Link>{' '}
                met 143 gerechten, of informeer over{' '}
                <Link href={`${base}/catering`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">Indiaas catering in Den Haag</Link>{' '}
                als u chaat wilt serveren op uw volgende evenement.
              </>
            ) : (
              <>
                Chaat is food you share. Order a selection for the table and let everyone taste. Visit Chopras Indian Restaurant at Leyweg 986, open Tuesday to Sunday from 16:30 to 22:30. View the{' '}
                <Link href={`${base}/menu`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">full menu</Link>{' '}
                across 143 dishes, or ask about{' '}
                <Link href={`${base}/catering`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">Indian catering in Den Haag</Link>{' '}
                if you want to serve chaat at your next event.
              </>
            )}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href={`${base}/contact`}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white bg-[rgba(199,163,72,0.1)] px-6 py-3 text-white text-sm font-medium uppercase tracking-wide transition-all duration-200 ease-out hover:bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] hover:text-white active:scale-[0.98] min-h-[48px]"
            >
              {tr.common.reserve}
            </Link>
            <Link
              href={`${base}/menu`}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white bg-[rgba(199,163,72,0.1)] px-6 py-3 text-white text-sm font-medium uppercase tracking-wide transition-all duration-200 ease-out hover:bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] hover:text-white active:scale-[0.98] min-h-[48px]"
            >
              {tr.common.viewMenu}
            </Link>
            <Link
              href={`${base}/pani-puri-den-haag`}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white bg-[rgba(199,163,72,0.1)] px-6 py-3 text-white text-sm font-medium uppercase tracking-wide transition-all duration-200 ease-out hover:bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] hover:text-white active:scale-[0.98] min-h-[48px]"
            >
              {isNl ? 'Pani Puri Proberen' : 'Try Pani Puri'}
            </Link>
          </div>
        </div>
      </section>

      {/* INTERNAL LINKS */}
      <section className="bg-[#F7F8FC] py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-6 leading-[1.3]">
            {isNl ? 'Meer Gerechten Ontdekken' : 'Explore More Dishes'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Link href={`${base}/naan-den-haag`} className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-white hover:shadow-lg transition-all">
              <p className="text-white text-sm font-semibold uppercase tracking-widest mb-2">{isNl ? 'Brood' : 'Bread'}</p>
              <p className="text-[#1B2B5E] font-semibold">{isNl ? 'Naan Den Haag - vers uit de tandoor' : 'Naan Den Haag - fresh from the tandoor'}</p>
            </Link>
            <Link href={`${base}/dal-makhani-den-haag`} className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-white hover:shadow-lg transition-all">
              <p className="text-white text-sm font-semibold uppercase tracking-widest mb-2">{isNl ? 'Vegetarisch' : 'Vegetarian'}</p>
              <p className="text-[#1B2B5E] font-semibold">{isNl ? 'Dal Makhani Den Haag - zwarte linzen met boter' : 'Dal Makhani Den Haag - black lentils with butter'}</p>
            </Link>
            <Link href={`${base}/pani-puri-den-haag`} className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-white hover:shadow-lg transition-all">
              <p className="text-white text-sm font-semibold uppercase tracking-widest mb-2">{isNl ? 'Chaat' : 'Chaat'}</p>
              <p className="text-[#1B2B5E] font-semibold">{isNl ? 'Pani Puri Den Haag - één hap, alles tegelijk' : 'Pani Puri Den Haag - one bite, everything at once'}</p>
            </Link>
            <Link href={`${base}/soya-chaap-den-haag`} className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-white hover:shadow-lg transition-all">
              <p className="text-white text-sm font-semibold uppercase tracking-widest mb-2">{isNl ? 'Plantaardig' : 'Plant-Based'}</p>
              <p className="text-[#1B2B5E] font-semibold">{isNl ? 'Soya Chaap Den Haag - vegaans vleesvervanger uit de tandoor' : 'Soya Chaap Den Haag - vegan mock meat from the tandoor'}</p>
            </Link>
          </div>
          <div className="text-center space-y-4">
            <p className="font-body text-[#1A1A1A] text-base">
              <Link href={`${base}/`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">
                {isNl ? 'Chopras Indian Restaurant - beste Indiaas restaurant in Den Haag' : 'Chopras Indian Restaurant - best Indian restaurant in Den Haag'}
              </Link>
            </p>
            <p className="font-body text-[#1A1A1A] text-base">
              {isNl ? 'Bekijk het volledige menu of' : 'View the full menu or'}{' '}
              <Link href={`${base}/contact`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">
                {isNl ? 'maak een reservering bij Chopras Indian Restaurant Den Haag' : 'book a table at Chopras Indian Restaurant Den Haag'}
              </Link>.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
