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
    en: 'Naan Den Haag | Chopras Indian Restaurant',
    nl: 'Naan Den Haag | Chopras Indian Restaurant',
  }
  const descriptions = {
    en: 'Fresh naan Den Haag at Chopras Indian Restaurant. Garlic, butter and Peshwari naan baked hot in our tandoor clay oven. Best Indian bread in The Hague.',
    nl: 'Naan bij Chopras Den Haag. Knoflook naan, tandoori naan, gewone naan. Vers gebakken in tandoor. Bestel nu via Leyweg 986.',
  }
  return {
    title: titles[locale],
    description: descriptions[locale],
    alternates: {
      canonical: getLocalizedUrl(locale, 'naan-den-haag'),
      languages: {
        en: getLocalizedUrl('en', 'naan-den-haag'),
        nl: getLocalizedUrl('nl', 'naan-den-haag'),
        'x-default': getLocalizedUrl('en', 'naan-den-haag'),
      },
    },
    openGraph: {
      title: titles[locale],
      description: descriptions[locale],
      url: getLocalizedUrl(locale, 'naan-den-haag'),
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

const faqsEn: Array<{ question: string; answer: string }> = [
  {
    question: 'What types of naan does Chopras serve?',
    answer: 'Chopras serves six types of naan: plain naan, garlic naan, butter naan, cheese naan, Peshwari naan, and keema naan. All are freshly baked in a 400-degree tandoor clay oven at Leyweg 986 in Den Haag, every evening from Tuesday to Sunday.',
  },
  {
    question: 'What temperature does the tandoor reach at Chopras?',
    answer: 'The tandoor clay oven at Chopras Indian Restaurant reaches 400 degrees Celsius. At that temperature, naan bakes in approximately 90 seconds. That extreme heat gives the bread its characteristic charring at the edges and its soft, elastic interior. No conventional oven can replicate this.',
  },
  {
    question: 'Is naan at Chopras halal?',
    answer: 'Yes. Most naan varieties at Chopras are vegetarian: plain naan, garlic naan, butter naan, cheese naan, and Peshwari naan contain no meat. The keema naan contains halal-certified minced lamb. The entire kitchen at Chopras is fully halal certified.',
  },
  {
    question: 'What is the difference between garlic naan and plain naan?',
    answer: 'Plain naan is the original: dough, tandoor, butter. Garlic naan starts the same but receives a brush of melted butter with finely chopped fresh garlic the moment it comes out of the oven. The garlic cooks slightly against the warm surface. It does not sit raw on top. The flavour is sharper and richer.',
  },
  {
    question: 'What should I eat with naan at Chopras?',
    answer: 'Naan pairs with almost everything on the Chopras menu. The most popular combinations are butter chicken with garlic naan, dal makhani with plain naan, and mutton rogan josh with butter naan. Keema naan is substantial enough to serve as a main course. Peshwari naan is most popular as a finish, as a sweet counterpoint after a spiced curry.',
  },
]

const faqsNl: Array<{ question: string; answer: string }> = [
  {
    question: 'Welke soorten naan serveert Chopras?',
    answer: 'Chopras serveert zes soorten naan: gewone naan, knoflooknaan, boternaan, kaasnaan, Peshwarinaan en keema naan. Alle soorten worden vers gebakken in een tandoor kleioven van 400 graden op Leyweg 986 in Den Haag, elke avond van dinsdag tot zondag.',
  },
  {
    question: 'Welke temperatuur bereikt de tandoor bij Chopras?',
    answer: 'De tandoor kleioven bij Chopras Indian Restaurant bereikt 400 graden Celsius. Op die temperatuur bakt naan in ongeveer 90 seconden. Die extreme hitte geeft het brood zijn kenmerkende verkoling aan de randen en de zachte, elastische binnenkant. Geen gewone oven kan dit evenaren.',
  },
  {
    question: 'Is naan bij Chopras halal?',
    answer: 'Ja. De meeste naan soorten bij Chopras zijn vegetarisch: gewone naan, knoflooknaan, boternaan, kaasnaan en Peshwarinaan bevatten geen vlees. De keema naan bevat halal gecertificeerd gehakt lamsvlees. De gehele keuken bij Chopras is volledig halal gecertificeerd.',
  },
  {
    question: 'Wat is het verschil tussen knoflooknaan en gewone naan?',
    answer: 'Gewone naan is het origineel: deeg, tandoor, boter. Knoflooknaan begint hetzelfde maar krijgt na het bakken direct een kwast gesmolten boter met fijngehakte verse knoflook. De knoflook gaart licht tegen het warme oppervlak. Het ligt niet rauw bovenop. De smaak is scherper en rijker.',
  },
  {
    question: 'Waarmee kan ik naan het beste eten bij Chopras?',
    answer: 'Naan past bij bijna alles op het menu van Chopras. De meest populaire combinaties zijn butter chicken met knoflooknaan, dal makhani met gewone naan en mutton rogan josh met boternaan. Keema naan is substantieel genoeg om als hoofdgerecht te dienen. Peshwarinaan is het populairst als afsluiting, als zoet tegenwicht na een gekruide curry.',
  },
]

export default function NaanPage({ params }: Props) {
  const { locale } = params
  const tr = getTranslations(locale)
  const base = locale === 'nl' ? '/nl' : ''
  const isNl = locale === 'nl'

  return (
    <>
      <JsonLd data={getLocalRestaurantSchema(locale, ['Den Haag'], getLocalizedUrl(locale, 'naan-den-haag'))} />
      <JsonLd data={getBreadcrumbSchema([
        { name: tr.common.nav.home, item: getLocalizedUrl(locale) },
        { name: 'Naan Den Haag', item: getLocalizedUrl(locale, 'naan-den-haag') },
      ])} />
      <JsonLd data={getFaqPageSchema(isNl ? faqsNl : faqsEn)} />
      <JsonLd data={getDishPageSchema(locale, 'Naan Den Haag', 'Naan Den Haag', 'Fresh naan baked in a 400-degree tandoor clay oven at Chopras Indian Restaurant Den Haag. Garlic, butter, cheese and Peshwari naan at Leyweg 986.', 'Verse naan gebakken in een tandoorkleioven van 400 graden bij Chopras Indian Restaurant Den Haag. Knoflook-, boter- en Peshwarinaan op Leyweg 986.', ['https://schema.org/VegetarianDiet', 'https://schema.org/HalalDiet'])} />

      {/* HERO */}
      <section className="bg-[#1B2B5E] py-20 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-[#C7A348]/40 bg-white/10 backdrop-blur-sm mb-4">
            <span className="text-[#C7A348] text-xs font-medium uppercase tracking-widest">• OUR DISHES · CHOPRAS INDIAN RESTAURANT · DEN HAAG •</span>
          </div>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.6)' }}>
            {isNl
              ? 'Naan in Den Haag - Vers Gebakken in een Kleioven van 400 Graden'
              : 'Naan in Den Haag - Fresh Baked in a 400-Degree Clay Oven'}
          </h1>
          <p className="text-white/75 text-lg md:text-xl" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.7)' }}>
            {isNl
              ? 'Zes soorten naan. Negentig seconden in de tandoor. Knoflook, kaas, Peshwari en keema naan op Leyweg 986, Den Haag.'
              : 'Six types of naan. Ninety seconds in the tandoor. Garlic, cheese, Peshwari and keema naan at Leyweg 986, Den Haag.'}
          </p>
        </div>
      </section>

      {/* THE 400-DEGREE DIFFERENCE */}
      <section className="bg-[#F7F8FC] py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-[#C7A348] mb-6 leading-[1.3]">
            {isNl
              ? 'De 400 Graden Kleioven Die Alles Verandert'
              : 'The 400-Degree Clay Oven That Changes Everything'}
          </h2>
          <div className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed space-y-5">
            {isNl ? (
              <>
                <p>De meeste naan die u in Den Haag hebt gegeten, is gebakken in een gewone oven op ongeveer 250 graden. Dat proeft u. Het komt zacht, bleek en deegachtig naar buiten. Geen verkoling aan de randen. Geen treksterkte. Geen rook. Dat is geen naan brood. Dat is een plat brood dat naast warmte heeft gelegen.</p>
                <p>Bij <Link href={`${base}/`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">Chopras Indian Restaurant</Link> op Leyweg 986 in Den Haag bereikt de tandoor kleioven 400 graden Celsius voordat de eerste gast arriveert. Dit is geen instelling op een knop. Dit is een fysieke toestand die de oven de hele avond behoudt. Wanneer naan-deeg de binnenwand van die tandoor raakt, bakt het in ongeveer 90 seconden. Het oppervlak verkoolt. De binnenkant blijft zacht. De randen borrelen en blazen op. Scheur het uit elkaar en er komt stoom naar buiten.</p>
                <p>Geen gewone oven kan dit. De hitteverdeling is totaal anders. Een tandoor straalt hitte af van alle kanten tegelijkertijd: van de kleiswanden, van de bodem, en van de stralende hitte die weerkaatst van het gebogen interieur. Die combinatie creëert een textuur en een smaakprofiel dat geen keukenapparaat voor thuis of een standaard commerciële keuken kan nabootsen. Dit is de reden waarom <Link href={`${base}/tandoori-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">tandoori gerechten in Den Haag</Link> zo sterk variëren van restaurant tot restaurant. Sommigen hebben de oven. Sommigen doen alsof.</p>
              </>
            ) : (
              <>
                <p>Most naan you have eaten in Den Haag was baked in a conventional oven set to around 250 degrees. You can tell. It comes out soft, pale, slightly doughy. No char on the edges. No pull. No smoke. That is not naan bread. That is flatbread that has been adjacent to heat.</p>
                <p>At <Link href={`${base}/`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">Chopras Indian Restaurant</Link> at Leyweg 986 in Den Haag, the tandoor clay oven reaches 400 degrees Celsius before the first guest arrives. This is not a setting on a dial. This is a physical state the oven holds for the entire evening service. When naan dough hits the inner wall of that tandoor, it bakes in approximately 90 seconds. The surface chars. The inside stays soft. The edges bubble and blister. Pull it apart and steam comes out.</p>
                <p>No conventional oven can do this. The heat distribution is completely different. A tandoor radiates heat from all sides simultaneously: from the clay walls, from the base, and from the radiant heat bouncing off the curved interior. That combination creates a texture and a flavour profile that no kitchen appliance built for a home or a standard commercial kitchen can replicate. This is why <Link href={`${base}/tandoori-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">tandoori dishes in Den Haag</Link> vary so dramatically from restaurant to restaurant. Some have the oven. Some pretend to.</p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* SIX TYPES OF NAAN */}
      <section className="bg-white py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-[#C7A348] mb-6 leading-[1.3]">
            {isNl
              ? 'Zes Soorten Naan op het Menu van Chopras'
              : 'Six Types of Naan on the Chopras Menu'}
          </h2>
          <div className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed space-y-5">
            {isNl ? (
              <>
                <p>De tandoor maakt variaties mogelijk. Zodra u de hitte en de techniek in huis heeft, kunt u op de basis verder bouwen. Bij Chopras zijn er zes soorten naan beschikbaar elke avond van dinsdag tot zondag. Elke variant begint met hetzelfde deeg. Het verschil zit in de vulling, de afwerking, en de bestemming op het bord.</p>
                <p><strong>Knoflooknaan.</strong> De meest bestelde. Vers deeg, hete tandoor, dan direct een kwast gesmolten boter en fijngehakte knoflook zodra het eruit komt. De knoflook gaart licht tegen het warme oppervlak. Het zit niet rauw bovenop. Bestellen naast <Link href={`${base}/butter-chicken-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">butter chicken Den Haag</Link> is bijna een verplichting.</p>
                <p><strong>Boternaan.</strong> De klassieke. Gewone tandoori naan met een royale kwast geklaarde boter. Eet het met <Link href={`${base}/dal-makhani-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">dal makhani Den Haag</Link> en er blijft niets op het bord over.</p>
                <p><strong>Kaasnaan.</strong> Zachte kaas gevouwen in het deeg voor het in de tandoor gaat. De hitte smelt het volledig. De buitenkant verkoolt. De binnenkant rekt wanneer u het opentrekt. Dit is de variant die kinderen standaard bestellen nadat ze hem eens hebben geproefd.</p>
                <p><strong>Peshwarinaan.</strong> De zoete variant. Een vulling van kokos, amandelen en rozijnen. Dit is de naan die eerste bezoekers verrast. Het is geen dessert, maar ook niet volledig hartig. Wie het kent, bestelt het altijd.</p>
                <p><strong>Keema naan.</strong> Gekruid gehakt lamsvlees gevouwen in het deeg. Halal gecertificeerd. Deze is op zichzelf al een vol bord, maar de meeste gasten bestellen hem toch naast een curry van het <Link href={`${base}/menu`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">volledige Chopras menu</Link>.</p>
                <p><strong>Gewone naan.</strong> Het origineel. Tandoor hitte, deeg, verder niets. Als de basis goed is, is er niets anders nodig. Bij 400 graden verdient de gewone naan zijn plek op elk bord. Combineer het met <Link href={`${base}/mutton-rogan-josh-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">mutton rogan josh Den Haag</Link> voor een samenspel dat voor zichzelf spreekt.</p>
              </>
            ) : (
              <>
                <p>The tandoor unlocks possibilities. Once you have the heat and the technique, you can build on the base. At Chopras, there are six types of naan available every evening Tuesday to Sunday. Every variety starts with the same dough. The difference is in the filling, the finish, and the destination on the plate.</p>
                <p><strong>Garlic naan.</strong> The most ordered. Fresh dough, hot tandoor, then immediately a brush of melted butter and finely chopped garlic the moment it comes out. The garlic cooks slightly against the warm surface. It does not sit raw on top. Ordering this alongside <Link href={`${base}/butter-chicken-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">butter chicken Den Haag</Link> is practically obligatory.</p>
                <p><strong>Butter naan.</strong> The classic. Plain tandoor naan with a generous brush of clarified butter. Eat it with <Link href={`${base}/dal-makhani-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">dal makhani Den Haag</Link> and nothing is left on the plate.</p>
                <p><strong>Cheese naan.</strong> Soft cheese folded inside the dough before it goes into the tandoor. The heat melts it completely. The outside chars. The inside stretches when you pull it apart. This is the variety children default to after trying it once.</p>
                <p><strong>Peshwari naan.</strong> The sweet one. A filling of coconut, almonds, and sultanas. This is the naan that surprises first-time guests. It is not dessert but it is not entirely savoury either. Those who know it always order it.</p>
                <p><strong>Keema naan.</strong> Spiced minced lamb folded into the dough. Halal certified. This one is a full plate on its own, though most guests still order it alongside a curry from the <Link href={`${base}/menu`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">full Chopras menu</Link>.</p>
                <p><strong>Plain naan.</strong> The original. Tandoor heat, dough, nothing else. If the base is right, nothing more is needed. At 400 degrees, plain naan earns its place. Serve it with <Link href={`${base}/mutton-rogan-josh-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">mutton rogan josh Den Haag</Link> for a combination that speaks for itself.</p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* HOW IT IS MADE */}
      <section className="bg-[#F7F8FC] py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-[#C7A348] mb-6 leading-[1.3]">
            {isNl ? 'Hoe Naan Wordt Gemaakt bij Chopras' : 'How Naan Is Made at Chopras'}
          </h2>
          <div className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed space-y-5">
            {isNl ? (
              <>
                <p>Het deeg komt eerst. Bloem, yoghurt, zout, een kleine hoeveelheid olie. Gemengd en minimaal drie tot vier uur gerust. Te kort rusten geeft taaie naan. Dit is de stap die de meeste shortcuts overslaan, en de reden waarom naan van minder zorgvuldige keukens nooit goed aanvoelt in de mond.</p>
                <p>Wanneer de tandoor op temperatuur is, worden de deegballen met de hand platgedrukt en op de binnenwand van de oven geklitst. Ze plakken vast aan het klei. In ongeveer 90 seconden puft het deeg op, verkoolt aan de randen, en laat iets los van de wand. Dat is het moment dat het eruit komt. Direct geborsteld met boter. Aan tafel geserveerd terwijl het nog heet genoeg is om stoom te zien stijgen.</p>
                <p>Het timing-raam is smal. Dertig seconden te lang en het droogt uit. Dertig seconden te kort en het midden is rauw. Dit elke avond goed doen, voor elke bestelling, onderscheidt een keuken die jaren heeft gewerkt aan <Link href={`${base}/tandoori-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">tandoori koken in Den Haag</Link> van een keuken die gewoon deeg verplaatst. Chopras Indian Restaurant is beoordeeld met 4,9 sterren door 800+ gasten op Google. Die beoordeling is voor een deel het verhaal van dit brood.</p>
              </>
            ) : (
              <>
                <p>The dough comes first. Flour, yoghurt, salt, a small amount of oil. Mixed and rested for a minimum of three to four hours. Rushing the rest produces tough naan. This is the step most shortcuts skip, and the reason naan from less careful kitchens never feels right in the mouth.</p>
                <p>When the tandoor is at temperature, the dough balls are flattened by hand and pressed against the inner wall of the oven. They stick to the clay. In roughly 90 seconds, the dough puffs, chars at the edges, and pulls slightly away from the wall. That is when it comes out. Immediately brushed with butter. Served at the table still hot enough to see steam rising from the surface.</p>
                <p>The timing window is narrow. Thirty seconds too long and it dries out. Thirty seconds too short and the centre is raw. Getting this right every service, for every order, is what distinguishes a kitchen that has spent years on <Link href={`${base}/tandoori-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">tandoori cooking in Den Haag</Link> from one that is just moving dough around. Chopras Indian Restaurant holds a 4.9-star rating from 800+ guests on Google. That rating is partly the story of this bread.</p>
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
              ? 'Waar Kunt U Vers Naan Brood Krijgen in Den Haag?'
              : 'Where Can You Get Fresh Naan Bread in Den Haag?'}
          </h2>
          <div className="font-body text-white/80 text-lg leading-relaxed">
            {isNl ? (
              <p>Chopras Indian Restaurant op Leyweg 986 in Den Haag bakt vers naan brood in een tandoor kleioven van 400 graden elke avond van dinsdag tot zondag vanaf 16:30. Zes soorten naan zijn beschikbaar: knoflooknaan, boternaan, kaasnaan, Peshwarinaan, keema naan en gewone naan. Het restaurant heeft een 4,9-sterrenbeoordeling op Google van 800+ gasten en is volledig halal gecertificeerd. <Link href={`${base}/contact`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">Reserveer een tafel bij Chopras Indian Restaurant</Link> of bestel <Link href={`${base}/indian-takeaway-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">Indiaas takeaway in Den Haag</Link>.</p>
            ) : (
              <p>Chopras Indian Restaurant at Leyweg 986 in Den Haag bakes fresh naan bread in a 400-degree tandoor clay oven every evening from Tuesday to Sunday from 16:30. Six types of naan are available: garlic naan, butter naan, cheese naan, Peshwari naan, keema naan, and plain naan. The restaurant holds a 4.9-star rating on Google from 800+ guests and is fully halal certified. <Link href={`${base}/contact`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">Reserve a table at Chopras Indian Restaurant</Link> or order <Link href={`${base}/indian-takeaway-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">Indian takeaway in Den Haag</Link>.</p>
            )}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#F7F8FC] py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-[#C7A348] mb-6 leading-[1.3]">
            {isNl ? 'Veelgestelde Vragen Over Naan' : 'Frequently Asked Questions About Naan'}
          </h2>
          <FaqAccordion faqs={isNl ? faqsNl : faqsEn} locale={locale} />
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-[#C7A348] mb-6 leading-[1.3]">
            {isNl
              ? 'Naan Bestellen bij Chopras Indian Restaurant Den Haag'
              : 'Order Naan at Chopras Indian Restaurant Den Haag'}
          </h2>
          <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed mb-8">
            {isNl
              ? 'Naan is het brood dat u deelt. Het is het brood dat naast een curry hoort. Het is het brood dat naar India ruikt. Bezoek Chopras op Leyweg 986 in Den Haag, open dinsdag tot en met zondag vanaf 16:30. Bestel vers naan direct uit onze 400 graden tandoor.'
              : 'Naan is the bread you share. It is the bread that belongs beside a curry. It is the bread that smells like India. Visit Chopras at Leyweg 986 in Den Haag, open Tuesday to Sunday from 16:30. Order fresh naan directly from our 400-degree tandoor.'}
          </p>
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

      {/* INTERNAL LINKS */}
      <section className="bg-[#F7F8FC] py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-[#C7A348] mb-6 leading-[1.3]">
            {isNl ? 'Meer Gerechten Ontdekken' : 'Explore More Dishes'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Link href={`${base}/tandoori-den-haag`} className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-[#D4AF37] hover:shadow-lg transition-all">
              <p className="text-[#D4AF37] text-sm font-semibold uppercase tracking-widest mb-2">{isNl ? 'Tandoor' : 'Tandoor'}</p>
              <p className="text-[#1B2B5E] font-semibold">{isNl ? 'Tandoori gerechten Den Haag bij Chopras' : 'Tandoori dishes Den Haag at Chopras'}</p>
            </Link>
            <Link href={`${base}/butter-chicken-den-haag`} className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-[#D4AF37] hover:shadow-lg transition-all">
              <p className="text-[#D4AF37] text-sm font-semibold uppercase tracking-widest mb-2">{isNl ? 'Curry' : 'Curry'}</p>
              <p className="text-[#1B2B5E] font-semibold">{isNl ? 'Butter chicken Den Haag' : 'Butter chicken Den Haag'}</p>
            </Link>
            <Link href={`${base}/dal-makhani-den-haag`} className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-[#D4AF37] hover:shadow-lg transition-all">
              <p className="text-[#D4AF37] text-sm font-semibold uppercase tracking-widest mb-2">{isNl ? 'Vegetarisch' : 'Vegetarian'}</p>
              <p className="text-[#1B2B5E] font-semibold">{isNl ? 'Dal makhani Den Haag' : 'Dal makhani Den Haag'}</p>
            </Link>
            <Link href={`${base}/biryani-den-haag`} className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-[#D4AF37] hover:shadow-lg transition-all">
              <p className="text-[#D4AF37] text-sm font-semibold uppercase tracking-widest mb-2">{isNl ? 'Rijst' : 'Rice'}</p>
              <p className="text-[#1B2B5E] font-semibold">{isNl ? 'Biryani Den Haag bij Chopras' : 'Biryani Den Haag at Chopras'}</p>
            </Link>
          </div>
          <div className="text-center space-y-4">
            <p className="font-body text-[#1A1A1A] text-base">
              <Link href={`${base}/`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                {isNl
                  ? 'Chopras Indian Restaurant - beste Indiaas restaurant in Den Haag'
                  : 'Chopras Indian Restaurant - best Indian restaurant in Den Haag'}
              </Link>
            </p>
            <p className="font-body text-[#1A1A1A] text-base">
              {isNl ? 'Bekijk het volledige menu of' : 'View the full menu or'}{' '}
              <Link href={`${base}/contact`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                {isNl
                  ? 'maak een reservering bij Chopras Indian Restaurant Den Haag'
                  : 'book a table at Chopras Indian Restaurant Den Haag'}
              </Link>.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
