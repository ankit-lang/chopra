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
    en: 'Soya Chaap Den Haag | Chopras Indian Restaurant',
    nl: 'Soya Chaap Den Haag | Chopras Indian Restaurant',
  }
  const descriptions = {
    en: 'Authentic soya chaap Den Haag at Chopras Indian Restaurant. Vegan plant-based mock meat grilled in the tandoor. The best vegan Indian food in The Hague.',
    nl: 'Authentieke soya chaap Den Haag bij Chopras Indian Restaurant. Veganistisch plantaardig gerecht gegrild in de tandoor. Het beste veganistisch Indiaas eten.',
  }
  return {
    title: titles[locale],
    description: descriptions[locale],
    alternates: {
      canonical: getLocalizedUrl(locale, 'soya-chaap-den-haag'),
      languages: {
        en: getLocalizedUrl('en', 'soya-chaap-den-haag'),
        nl: getLocalizedUrl('nl', 'soya-chaap-den-haag'),
        'x-default': getLocalizedUrl('en', 'soya-chaap-den-haag'),
      },
    },
    openGraph: {
      title: titles[locale],
      description: descriptions[locale],
      url: getLocalizedUrl(locale, 'soya-chaap-den-haag'),
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
    question: 'What is achari soya chaap and how is it cooked at Chopras?',
    answer: 'Achari soya chaap is soya protein marinated in an achari spice blend - pickling spices including mustard seed, fennel, nigella and dried chilli. At Chopras Indian Restaurant, the marinated soya chaap goes directly into the tandoor clay oven, which reaches 400 degrees Celsius. The result is a smoky char on the outside and a tender, spice-saturated centre. It is fully vegan and available at Leyweg 986, Den Haag, Tuesday to Sunday from 16:30.',
  },
  {
    question: 'Is soya chaap at Chopras Indian Restaurant fully vegan?',
    answer: 'Yes. The soya chaap preparation is completely vegan - soya protein, achari spice marinade, no animal products in the tandoor-grilled version. If you order a sauce-based preparation, ask your server and we will adjust for a fully plant-based version. Chopras serves a dedicated vegan Indian menu in Den Haag with multiple plant-based dishes prepared to the same standard as the meat dishes.',
  },
  {
    question: 'What other vegan Indian dishes does Chopras serve in Den Haag?',
    answer: 'Chopras Indian Restaurant Den Haag serves a full plant-based menu including dal makhani, chana masala, palak paneer, aloo gobi and vegetable biryani. Every dish is prepared with the same fresh-ground spices and standards as the meat dishes. No compromise, no separate preparation line. View the full vegan menu at chopras.nl or visit Leyweg 986. Open Tuesday to Sunday, 16:30 to 22:30.',
  },
]

const faqsNl: Array<{ question: string; answer: string }> = [
  {
    question: 'Wat is achari soya chaap en hoe wordt het bereid bij Chopras?',
    answer: 'Achari soya chaap is soya-eiwit gemarineerd in een achari specerijenmengsel - ingelegde kruiden met mosterdzaad, venkel, nigella en gedroogde chili. Bij Chopras Indian Restaurant gaat de gemarineerde soya chaap direct in de tandoor kleioven, die 400 graden Celsius bereikt. Het resultaat is een rokerig korstje aan de buitenkant en een mals, kruidenrijk hart. Volledig veganistisch, verkrijgbaar op Leyweg 986, Den Haag, dinsdag tot en met zondag vanaf 16:30.',
  },
  {
    question: 'Is de soya chaap bij Chopras volledig veganistisch?',
    answer: 'Ja. De achari soya chaap is volledig veganistisch - soya-eiwit, achari specerijenmarinade, geen dierlijke producten in de tandoor-gegrilde versie. Als je een sausbereiding bestelt, vraag dan je bediening en wij passen het aan voor een volledig plantaardige versie. Chopras serveert een uitgebreid veganistisch Indiaas menu in Den Haag met meerdere plantaardige gerechten die op hetzelfde niveau worden bereid als de vleesgerechten.',
  },
  {
    question: 'Welke andere veganistische Indiase gerechten serveert Chopras in Den Haag?',
    answer: 'Chopras Indian Restaurant Den Haag serveert een volledig plantaardig menu inclusief dal makhani, chana masala, palak paneer, aloo gobi en groente biryani. Elk gerecht wordt bereid met dezelfde versgemalen specerijen en kookstandaarden als de vleesgerechten. Geen compromissen, geen aparte bereiding. Bekijk het volledige veganistische menu op chopras.nl of bezoek Leyweg 986. Open dinsdag tot en met zondag, 16:30 tot 22:30.',
  },
]

export default function SoyaChaapPage({ params }: Props) {
  const { locale } = params
  const tr = getTranslations(locale)
  const base = locale === 'nl' ? '/nl' : ''
  const isNl = locale === 'nl'

  return (
    <>
      <JsonLd data={getLocalRestaurantSchema(locale, ['Den Haag'], getLocalizedUrl(locale, 'soya-chaap-den-haag'))} />
      <JsonLd data={getBreadcrumbSchema([
        { name: tr.common.nav.home, item: getLocalizedUrl(locale) },
        { name: 'Soya Chaap Den Haag', item: getLocalizedUrl(locale, 'soya-chaap-den-haag') },
      ])} />
      <JsonLd data={getFaqPageSchema(isNl ? faqsNl : faqsEn)} />
      <JsonLd data={getDishPageSchema(locale, 'Soya Chaap Den Haag', 'Soya Chaap Den Haag', 'Authentic vegan soya chaap at Chopras Indian Restaurant Den Haag. Achari-marinated plant-based mock meat grilled in the tandoor clay oven at 400 degrees Celsius. Leyweg 986 Den Haag.', 'Authentieke veganistische soya chaap bij Chopras Indian Restaurant Den Haag. Achari-gemarineerd plantaardig eiwit gegrild in de tandoor kleioven op 400 graden Celsius. Leyweg 986 Den Haag.', ['https://schema.org/VeganDiet', 'https://schema.org/VegetarianDiet', 'https://schema.org/HalalDiet'])} />

      {/* HERO */}
      <section className="btn-gradient py-20 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-white/40 bg-white/10 backdrop-blur-sm mb-4">
            <span className="text-white text-xs font-medium uppercase tracking-widest">
              OUR DISHES · CHOPRAS INDIAN RESTAURANT · DEN HAAG
            </span>
          </div>
          <h1
            className="font-heading text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight"
            style={{ textShadow: '0 2px 6px rgba(0,0,0,0.99), 0 6px 24px rgba(0,0,0,0.85)' }}
          >
            {isNl
              ? 'Soya Chaap Den Haag - Achari Gemarineerd, Tandoor Gegrild bij Chopras'
              : 'Soya Chaap Den Haag - Achari Spices, Tandoor Grilled at Chopras'}
          </h1>
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-white/40" />
            <span className="text-white/90 text-lg">✦</span>
            <div className="h-[1px] w-16 bg-gradient-to-l from-white/40 to-transparent" />
          </div>
          <p
            className="text-white/75 text-lg md:text-xl mt-6 mb-8"
            style={{ textShadow: '0 1px 4px rgba(0,0,0,0.7)' }}
          >
            {isNl
              ? 'Plantaardig soya-eiwit in achari marinade. 400 graden tandoor. Leyweg 986, Den Haag.'
              : 'Plant-based soya protein in achari marinade. 400 degree tandoor. Leyweg 986, Den Haag.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`${base}/contact`}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white bg-white/10 px-6 py-3 text-white text-sm font-medium uppercase tracking-wide transition-all duration-200 ease-out active:scale-[0.98] min-h-[48px] backdrop-blur-[10px]"
            >
              {tr.common.reserve}
            </Link>
            <Link
              href={`${base}/vegan-menu`}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white bg-white/10 px-6 py-3 text-white text-sm font-medium uppercase tracking-wide transition-all duration-200 ease-out active:scale-[0.98] min-h-[48px] backdrop-blur-[10px]"
            >
              {isNl ? 'Veganistisch Menu' : 'Vegan Menu'}
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 1: Core angle */}
      <section className="bg-white py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-left mb-12">
            <h2 className="font-heading font-semibold text-3xl md:text-4xl text-[#06068a] mb-6 leading-tight mt-2 text-left">
              {isNl
                ? 'De Vegan Tandoor Ervaring Bestaat - in Den Haag'
                : 'The Vegan Tandoor Experience Exists - in Den Haag'}
            </h2>
          </div>
          <div className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed space-y-5">
            {isNl ? (
              <>
                <p>Soya chaap Den Haag bij Chopras Indian Restaurant is geen vegetarisch bijgerecht. Het is een volwaardig tandoor-gerecht, bereid met achari marinade en dezelfde kleioven die wordt gebruikt voor alle tandoori-gerechten op het menu. Als je <Link href={`${base}/vegan-menu`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">veganistisch Indiaas eten</Link> zoekt dat echt smaakt naar tandoor - rokerig, gegrild, krokant aan de buitenkant - is dit het enige gerecht in Den Haag dat dat biedt.</p>
                <p>De achari marinade is gebaseerd op de smaken van Noord-Indiase ingelegde kruiden: mosterdzaad, venkel, nigella en gedroogde chili. Die combinatie van zure en aromatische componenten penetreert het soya-eiwit diep voordat het de oven ingaat. Achari betekent letterlijk &apos;van de ingelegde specerijen&apos; - het is scherp, complex en precies het soort marinade dat <Link href={`${base}/blog/vegetarian-indian-food-den-haag`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">plantaardig Indiaas koken</Link> bevredigend maakt in plaats van een compromis.</p>
                <p>Bij Chopras worden de specerijen elke ochtend vers gemalen uit hele kruidenzaden die direct uit India worden betrokken. Geen zakje, geen poedermix uit een leveranciersbak. <Link href={`${base}/tandoori-den-haag`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">De tandoor</Link> bereikt 400 graden Celsius. Die combinatie - verse achari kruiden en extreme hitte - geeft de soya chaap een rokerig korstje dat een gewone oven nooit kan repliceren. 4,9 sterren van 1100+ Google-beoordelingen. Dat niveau geldt voor elk gerecht, inclusief dit.</p>
              </>
            ) : (
              <>
                <p>Soya chaap Den Haag at Chopras Indian Restaurant is not a vegetarian side dish. It is a full tandoor dish, prepared with achari marinade and the same clay oven used for every tandoori preparation on the menu. If you are looking for <Link href={`${base}/vegan-menu`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">vegan Indian food</Link> that genuinely tastes of the tandoor - smoky, charred, crisp on the outside - this is the strong option in Den Haag that delivers it.</p>
                <p>The achari marinade is built on North Indian pickling spices: mustard seed, fennel, nigella, and dried chilli. That combination of acidic and aromatic compounds penetrates the soya protein before it enters the oven. Achari means literally &apos;of the pickled spices&apos; - it is sharp, complex, and exactly the kind of marinade that makes <Link href={`${base}/blog/vegetarian-indian-food-den-haag`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">plant-based Indian cooking</Link> satisfying rather than a compromise.</p>
                <p>At Chopras, spices are ground fresh every morning from whole seeds sourced directly from India. No pre-packaged mix. No powder blend from a supplier. <Link href={`${base}/tandoori-den-haag`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">The tandoor</Link> reaches 400 degrees Celsius. That combination - fresh achari spices and extreme heat - gives the soya chaap a smoky char you cannot replicate in a conventional oven. 4.9 stars from 1100+ Google reviews. That standard applies to every dish on the menu, including this one.</p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* SECTION 2: Why soya protein works in the tandoor */}
      <section className="bg-white py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-4xl md:text-5xl text-[#06068a] mb-6 leading-[1.3]">
            {isNl
              ? 'Waarom Soya Chaap in de Tandoor Werkt'
              : 'Why Soya Chaap Works in the Tandoor'}
          </h2>
          <div className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed space-y-5">
            {isNl ? (
              <>
                <p>Soya chaap bestaat uit soya-eiwit dat is gevormd tot een compacte, vezelige structuur. Het is niet zacht als tofu. Het heeft een stevige, vlezige textuur die warmte goed geleidt en marinade vasthoudt. Dat is de reden waarom <Link href={`${base}/blog/vegetarian-indian-food-den-haag`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">vegetarische Indiase kooktradities</Link> soya chaap al generaties lang gebruiken voor tandoor-bereiding. Het gedraagt zich anders dan groentegebaseerde alternatieven. Het trekt de achari marinade op, houdt hitte vast en ontwikkelt een gegrild buitenste korstje terwijl het binnenin mals blijft.</p>
                <p>In de tandoor op 400 graden Celsius gebeurt iets wat een pan niet kan repliceren. De directe stralingswarmte van de kleioven bereikt het oppervlak van de soya chaap bijna direct. De achari marinade karamelliseert. De suikers in het mosterdzaad verbranden lichtjes. De rook van de kolenbodem dringt het soya-eiwit binnen. Het resultaat is een gerecht dat smaakt naar geroosterd, naar kruid, naar warmte - niet naar vlees, maar ook niet naar een vervanging. Iets op zichzelf.</p>
                <p>Voor een <Link href={`${base}/halal-food-den-haag`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">halal gecertificeerd restaurant</Link> met echte vegan tandoor-opties in Den Haag is Chopras Indian Restaurant op Leyweg 986 de enige keuze. Het volledige menu is halal gecertificeerd - elke leverancier, elk gerecht. De soya chaap is halal en veganistisch. Die combinatie bestaat zelden in de Haagse horeca.</p>
              </>
            ) : (
              <>
                <p>Soya chaap is soya protein shaped into a compact, fibrous structure. It is not soft like tofu. It has a firm, meaty texture that conducts heat well and holds marinade. That is why <Link href={`${base}/blog/vegetarian-indian-food-den-haag`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">vegetarian Indian cooking traditions</Link> have used soya chaap for tandoor preparation for generations. It behaves differently from vegetable-based alternatives. It draws in the achari marinade, holds heat, and develops a charred outer layer while staying tender inside.</p>
                <p>In the tandoor at 400 degrees Celsius, something happens that a pan cannot replicate. The direct radiant heat from the clay walls reaches the surface of the soya chaap almost immediately. The achari marinade caramelises. The sugars in the mustard seed char lightly. The smoke from the coal base enters the soya protein. The result is a dish that tastes of char, of spice, of heat - not of meat, but not of a replacement either. Something in its own right.</p>
                <p>For a <Link href={`${base}/halal-food-den-haag`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">halal certified restaurant</Link> with genuine vegan tandoor options in Den Haag, Chopras Indian Restaurant at Leyweg 986 is the strong option. The full menu is halal certified - every supplier, every dish. The soya chaap is both halal and vegan. That combination is rare in Den Haag.</p>
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
              ? 'Waar Vind Ik Soya Chaap in Den Haag?'
              : 'Where Can I Find Soya Chaap in Den Haag?'}
          </h2>
          <div className="font-body text-white/80 text-lg leading-relaxed">
            {isNl ? (
              <p className="text-white/80">Soya chaap in Den Haag is beschikbaar bij <Link href={`${base}/`} className="text-white hover:text-white font-semibold">Chopras Indian Restaurant</Link>, gevestigd op Leyweg 986, 2545 GW Den Haag. Het gerecht wordt bereid als achari-gemarineerde, tandoor-gegrilde plantaardige mock meat - volledig veganistisch en halal gecertificeerd. Chopras heeft een 4,9-sterrenbeoordeling van 1100+ Google-recensies. <Link href={`${base}/vegan-menu`} className="text-white hover:text-white font-semibold">Bekijk het volledige veganistische menu</Link> of reserveer een tafel. Open dinsdag tot en met zondag van 16:30 tot 22:30.</p>
            ) : (
              <p className="text-white/80">Soya chaap in Den Haag is available at <Link href={`${base}/`} className="text-white hover:text-white font-semibold">Chopras Indian Restaurant</Link>, located at Leyweg 986, 2545 GW Den Haag. The dish is prepared as achari-marinated, tandoor-grilled plant-based mock meat - fully vegan and halal certified. Chopras holds a 4.9-star rating from 1100+ Google reviews. <Link href={`${base}/vegan-menu`} className="text-white hover:text-white font-semibold">View the full vegan menu</Link> or reserve a table online. Open Tuesday to Sunday, 16:30 to 22:30.</p>
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
                ? 'Vragen Over Soya Chaap en Veganistisch Indiaas Eten'
                : 'Questions About Soya Chaap and Vegan Indian Food'}
            </h2>
          </div>
          <FaqAccordion faqs={isNl ? faqsNl : faqsEn} locale={locale} />
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="bg-white py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-4xl md:text-5xl text-[#06068a] mb-6 leading-[1.3]">
            {isNl ? 'Soya Chaap Proeven in Den Haag' : 'Taste Soya Chaap in Den Haag'}
          </h2>
          <div className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed space-y-5 mb-8">
            {isNl ? (
              <>
                <p>Soya chaap staat op het menu van Chopras Indian Restaurant op Leyweg 986, Den Haag. U kunt dineren van dinsdag tot en met zondag van 16:30 tot 22:30. Als u meerdere plantaardige gerechten wilt ontdekken, bekijk dan het <Link href={`${base}/vegan-menu`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">volledige veganistische menu</Link> of het <Link href={`${base}/menu`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">volledige menuoverzicht</Link> met alle 143 gerechten.</p>
                <p>Chopras serveert ook <Link href={`${base}/dal-makhani-den-haag`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">dal makhani</Link>, chaat en pani puri - volledig vegetarisch en veganistisch. Het <Link href={`${base}/contact`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">reserveren van een tafel</Link> duurt minder dan twee minuten. Maandag gesloten.</p>
              </>
            ) : (
              <>
                <p>Soya chaap is on the menu at Chopras Indian Restaurant at Leyweg 986, Den Haag. You can dine Tuesday to Sunday, 16:30 to 22:30. If you want to explore more plant-based options, view the <Link href={`${base}/vegan-menu`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">full vegan menu</Link> or the <Link href={`${base}/menu`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">complete menu overview</Link> across all 143 dishes.</p>
                <p>Chopras also serves <Link href={`${base}/dal-makhani-den-haag`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">dal makhani</Link>, chaat, and pani puri - all fully vegetarian and vegan. <Link href={`${base}/contact`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">Reserving a table</Link> takes under two minutes. Closed Monday.</p>
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
              href={`${base}/vegan-menu`}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white btn-gradient px-6 py-3 text-white text-sm font-semibold uppercase tracking-wide transition-all duration-200 ease-out active:scale-[0.98] min-h-[48px]"
            >
              {isNl ? 'Veganistisch Menu' : 'Vegan Menu'}
            </Link>
            <Link
              href={`${base}/menu`}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white btn-gradient px-6 py-3 text-white text-sm font-semibold uppercase tracking-wide transition-all duration-200 ease-out active:scale-[0.98] min-h-[48px]"
            >
              {tr.common.viewMenu}
            </Link>
          </div>
        </div>
      </section>

      {/* EXPLORE MORE DISHES */}
      <section className="bg-white py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-4xl md:text-5xl text-[#06068a] mb-6 leading-[1.3]">
            {isNl ? 'Meer Gerechten bij Chopras Indian Restaurant' : 'More Dishes at Chopras Indian Restaurant'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Link href={`${base}/dal-makhani-den-haag`} className="block p-6 bg-[#F7F8FC] rounded-lg border border-gray-200 hover:border-[#06068a]/30 hover:shadow-lg transition-all">
              <p className="text-[#06068a] text-sm font-semibold uppercase tracking-widest mb-2">{isNl ? 'Vegetarisch' : 'Vegetarian'}</p>
              <p className="text-[#06068a] font-semibold">Dal Makhani Den Haag</p>
            </Link>
            <Link href={`${base}/tandoori-den-haag`} className="block p-6 bg-[#F7F8FC] rounded-lg border border-gray-200 hover:border-[#06068a]/30 hover:shadow-lg transition-all">
              <p className="text-[#06068a] text-sm font-semibold uppercase tracking-widest mb-2">Tandoor</p>
              <p className="text-[#06068a] font-semibold">{isNl ? 'Tandoori Gerechten Den Haag' : 'Tandoori Dishes Den Haag'}</p>
            </Link>
            <Link href={`${base}/pani-puri-den-haag`} className="block p-6 bg-[#F7F8FC] rounded-lg border border-gray-200 hover:border-[#06068a]/30 hover:shadow-lg transition-all">
              <p className="text-[#06068a] text-sm font-semibold uppercase tracking-widest mb-2">{isNl ? 'Streetfood' : 'Street Food'}</p>
              <p className="text-[#06068a] font-semibold">Pani Puri Den Haag</p>
            </Link>
            <Link href={`${base}/chaat-den-haag`} className="block p-6 bg-[#F7F8FC] rounded-lg border border-gray-200 hover:border-[#06068a]/30 hover:shadow-lg transition-all">
              <p className="text-[#06068a] text-sm font-semibold uppercase tracking-widest mb-2">Chaat</p>
              <p className="text-[#06068a] font-semibold">{isNl ? 'Chaat en Indiaas Streetfood Den Haag' : 'Chaat and Indian Street Food Den Haag'}</p>
            </Link>
          </div>
          <div className="text-center space-y-4">
            <p className="font-body text-[#1A1A1A] text-base">
              <Link href={`${base}/`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">
                {isNl ? 'Chopras Indian Restaurant - beste Indiaas restaurant in Den Haag' : 'Chopras Indian Restaurant - best Indian restaurant in Den Haag'}
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
