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
    question: 'Wat is dum biryani en hoe verschilt het van gewone biryani?',
    answer: 'Dum biryani is een bereidingsmethode, geen variëteit. De pot wordt afgesloten en het gerecht gaart langzaam op stoom. De rijst en het gemarineerde vlees worden gelaagd in de pot en koken samen, zodat elke graankorrel de sappen en kruiden opneemt. Rijst die apart wordt gekookt en daarna bij curry wordt gevoegd is geen biryani. Bij Chopras Indian Restaurant in Den Haag wordt elke biryani gemaakt volgens de echte dum-methode.',
  },
  {
    question: 'Is de biryani bij Chopras Indian Restaurant halal?',
    answer: 'Ja. Alle kip en lam bij Chopras Indian Restaurant is uitsluitend afkomstig van halal-gecertificeerde leveranciers. De gehele keuken werkt volledig halal. Er is geen risico op kruisbesmetting. Elke biryani, van kip tot lam, is halal gecertificeerd en kan met volledig vertrouwen worden gegeten.',
  },
  {
    question: 'Welke soorten biryani serveren jullie in Den Haag?',
    answer: 'Chopras Indian Restaurant serveert drie soorten biryani: kipbiryani van een nacht gemarineerde halal kip, lambiryani van malse lamschouder en groentebiryani van seizoensgroenten. Alle drie worden bereid met saffraanbasmati, vers gemalen kruiden en de dum-methode. Open van dinsdag tot en met zondag vanaf 16:30 op Leyweg 986, Den Haag.',
  },
  {
    question: 'Kan ik biryani laten bezorgen in Den Haag?',
    answer: 'Ja. Chopras Indian Restaurant is beschikbaar op Thuisbezorgd en Uber Eats voor bezorging in een groot deel van Den Haag. Biryani is een van de gerechten die uitstekend gaat tijdens transport. De rijst houdt zijn textuur en de kruiden blijven aromatisch. U kunt uw bestelling ook ophalen via de afhaalservice op Leyweg 986.',
  },
  {
    question: 'Gebruikt Chopras Indian Restaurant echte saffraan in de biryani?',
    answer: 'Ja. De biryani bij Chopras Indian Restaurant wordt bereid met echte saffraandraadjes, geen kleurstoffen of smaakmakers. De saffraan wordt verwerkt in de basmatirijst en geeft de biryani zijn kenmerkende goudgele kleur en aroma. Samen met kruiden die elke ochtend vers worden gemalen van hele ingredienten rechtstreeks uit India, is dit het verschil dat u direct proeft.',
  },
]

const faqsEn: Array<{ question: string; answer: string }> = [
  {
    question: 'What is dum biryani and how is it different from regular biryani?',
    answer: 'Dum biryani is a method, not a variety. The pot is sealed and the dish cooks slowly on steam. The rice and marinated protein are layered inside the pot and cook together, so every grain absorbs the juices and spices. Rice cooked separately and then mixed with curry is not biryani. At Chopras Indian Restaurant in Den Haag, every biryani is made using the authentic dum method.',
  },
  {
    question: 'Is the biryani at Chopras Indian Restaurant halal?',
    answer: 'Yes. All chicken and lamb at Chopras Indian Restaurant is sourced exclusively from halal-certified suppliers. The entire kitchen operates fully halal. There is no cross-contamination risk. Every biryani, from chicken to lamb, is halal certified and can be eaten with complete confidence.',
  },
  {
    question: 'What types of biryani do you serve in Den Haag?',
    answer: 'Chopras Indian Restaurant serves three types of biryani: chicken biryani made from overnight-marinated halal chicken, lamb biryani made from tender lamb shoulder, and vegetable biryani made from seasonal vegetables. All three are made with saffron basmati, freshly ground spices, and the dum method. Open Tuesday to Sunday from 16:30 at Leyweg 986, Den Haag.',
  },
  {
    question: 'Can I order biryani for delivery in Den Haag?',
    answer: 'Yes. Chopras Indian Restaurant is available on Thuisbezorgd and Uber Eats for delivery across much of Den Haag. Biryani travels exceptionally well. The rice holds its texture and the spices remain aromatic. You can also collect your order via the takeaway service at Leyweg 986.',
  },
  {
    question: 'Does Chopras Indian Restaurant use real saffron in the biryani?',
    answer: 'Yes. The biryani at Chopras Indian Restaurant is made with genuine saffron threads, not food colouring or flavouring. The saffron is worked through the basmati rice and gives the biryani its characteristic golden colour and aroma. Combined with spices ground fresh every morning from whole ingredients sourced directly in India, this is the difference you taste immediately.',
  },
]

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params
  const titles = {
    en: 'Biryani in Den Haag | Chopras Indian Restaurant',
    nl: 'Biryani in Den Haag | Chopras Indian Restaurant',
  }
  const descriptions = {
    en: 'Authentic biryani Den Haag at Chopras Indian Restaurant. Chicken, lamb and veg biryani with saffron basmati rice. Halal certified. Order online today.',
    nl: 'Authentieke biryani Den Haag bij Chopras Indian Restaurant. Kip-, lam- en groentebiryani met saffraanbasmati. Halal gecertificeerd. Bestel online vandaag.',
  }
  return {
    title: titles[locale],
    description: descriptions[locale],
    alternates: {
      canonical: getLocalizedUrl(locale, 'biryani-den-haag'),
      languages: {
        en: getLocalizedUrl('en', 'biryani-den-haag'),
        nl: getLocalizedUrl('nl', 'biryani-den-haag'),
        'x-default': getLocalizedUrl('en', 'biryani-den-haag'),
      },
    },
    openGraph: {
      title: titles[locale],
      description: descriptions[locale],
      url: getLocalizedUrl(locale, 'biryani-den-haag'),
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

export default function BiryaniPage({ params }: Props) {
  const { locale } = params
  const tr = getTranslations(locale)
  const base = locale === 'nl' ? '/nl' : ''
  const isNl = locale === 'nl'

  return (
    <>
      <JsonLd data={getLocalRestaurantSchema(locale, ['Den Haag'], getLocalizedUrl(locale, 'biryani-den-haag'))} />
      <JsonLd data={getBreadcrumbSchema([
        { name: tr.common.nav.home, item: getLocalizedUrl(locale) },
        { name: 'Biryani Den Haag', item: getLocalizedUrl(locale, 'biryani-den-haag') },
      ])} />
      <JsonLd data={getFaqPageSchema(isNl ? faqsNl : faqsEn)} />
      <JsonLd data={getDishPageSchema(locale, 'Biryani Den Haag', 'Biryani Den Haag', 'Authentic halal biryani at Chopras Indian Restaurant Den Haag. Chicken, lamb and vegetable biryani with saffron basmati rice and whole spices at Leyweg 986.', 'Authentieke halal biryani bij Chopras Indian Restaurant Den Haag. Kip-, lams- en groentbiryani met saffraan basmatirijst en hele specerijen op Leyweg 986.')} />

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
              ? 'Biryani in Den Haag - Dum Biryani bij Chopras Indian Restaurant'
              : 'Biryani in Den Haag - Dum Biryani at Chopras Indian Restaurant'}
          </h1>
          <p
            className="text-white/75 text-lg md:text-xl max-w-2xl mx-auto"
            style={{ textShadow: '0 1px 4px rgba(0,0,0,0.7)' }}
          >
            {isNl
              ? 'Afgesloten. Langzaam gegaard op stoom. Echte saffraan. Kruiden elke ochtend vers gemalen. Halal gecertificeerd op Leyweg 986, Den Haag.'
              : 'Sealed. Slow-cooked on steam. Real saffron. Spices ground every morning. Halal certified at Leyweg 986, Den Haag.'}
          </p>
        </div>
      </section>

      {/* SECTION 1: What Dum Biryani Actually Is */}
      <section className="bg-[#F7F8FC] py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-vibes text-3xl md:text-4xl text-[#C7A348] mb-8">
            {isNl ? 'Wat Echte Dum Biryani Is' : 'What Real Dum Biryani Actually Is'}
          </h2>
          <div className="prose prose-lg max-w-none text-[#1A1A1A] space-y-5">
            {isNl ? (
              <>
                <p>Het woord &ldquo;dum&rdquo; komt uit het Perzisch en betekent &ldquo;adem&rdquo; of &ldquo;langzame stoom.&rdquo; Dum biryani is geen variëteit van rijstgerecht. Het is een methode. De pot wordt afgesloten. De stoom kan niet ontsnappen. Wat er in die afgesloten pot circuleert, is wat biryani tot biryani maakt en niet tot een rijstpilaf.</p>
                <p>De meeste mensen die in Nederland een teleurstellende biryani hebben gegeten, hebben rijst gegeten die apart werd gekookt en daarna bij een currysaus werd gevoegd. Dat is geen biryani. Dat is rijst en curry samen geserveerd in één schaal, gepresenteerd alsof het het echte werk is. De korrels zijn niet gelaagd. De stoom heeft zijn werk niet gedaan. De saffraan, als die al wordt gebruikt, is zo gelijkmatig door het gerecht verdeeld dat het net zo goed <Link href={`${base}/halal-food-den-haag`} className="text-[#D4AF37] hover:underline">voedingskleurstof</Link> had kunnen zijn.</p>
                <p>Bij Chopras Indian Restaurant op Leyweg 986, Den Haag, wordt elke biryani gemaakt via de dum-methode. Het gemarineerde halal vlees, kip of lam, wordt in lagen in de pot geplaatst met gedeeltelijk gekookte saffraanbasmati, vers gemalen kruiden en gefrituurde uien. De pot wordt afgesloten en het gerecht gaart langzaam op laag vuur, volledig op stoom. De saffraan zit in draadjes, niet uniform gemengd, zodat je bij het openen van de pot zakjes geur krijgt.</p>
                <p>Het resultaat is zichtbaar als het deksel aan tafel afgaat. Sommige korrels zijn goudgeel van de saffraan. Andere zijn wit. Weer andere zijn gekleurd door de <Link href={`${base}/blog/best-indian-restaurant-den-haag`} className="text-[#D4AF37] hover:underline">vers gemalen kruiden</Link>. Die variatie is het bewijs van de methode. Uniforme rijst is het bewijs dat iemand heeft gesneden.</p>
              </>
            ) : (
              <>
                <p>The word &ldquo;dum&rdquo; is Persian for &ldquo;breath&rdquo; or &ldquo;slow steam.&rdquo; Dum biryani is not a variety of rice dish. It is a method. The pot is sealed. The steam cannot escape. What circulates inside that sealed vessel is what makes biryani biryani and not a rice pilaf.</p>
                <p>Most people who have eaten a disappointing biryani in the Netherlands have eaten rice that was cooked separately and mixed with a curry sauce at the end. That is not biryani. That is rice and curry served together in one bowl, presented to look like the real thing. The grains are not layered. The steam has not done its work. The saffron, if used at all, is distributed so evenly it might as well be <Link href={`${base}/halal-food-den-haag`} className="text-[#D4AF37] hover:underline">food colouring</Link>.</p>
                <p>At Chopras Indian Restaurant on Leyweg 986, Den Haag, every biryani is made using the dum method. The marinated halal protein - chicken or lamb - is layered in the pot with partially cooked saffron basmati, freshly ground spices, and fried onions. The pot is sealed and the dish finishes on low heat, entirely on steam. The saffron sits in threads, not uniformly blended, so when the lid comes off at the table you get pockets of fragrance.</p>
                <p>The result is visible when the lid is lifted at the table. Some grains are golden from the saffron. Others are white. Others are stained by the <Link href={`${base}/blog/best-indian-restaurant-den-haag`} className="text-[#D4AF37] hover:underline">freshly ground spices</Link>. That variation is the proof of the method. Uniform rice is the proof that someone cut corners.</p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* SECTION 2: How Chopras Makes Biryani */}
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-vibes text-3xl md:text-4xl text-[#C7A348] mb-8">
            {isNl
              ? 'Hoe Chopras Indian Restaurant Biryani Maakt in Den Haag'
              : 'How Chopras Indian Restaurant Makes Biryani in Den Haag'}
          </h2>
          <div className="prose prose-lg max-w-none text-[#1A1A1A] space-y-5">
            {isNl ? (
              <>
                <p>Het begint elke ochtend voor de dienst. De keuken van Chopras Indian Restaurant maalt zijn masalas van hele kruiden die rechtstreeks uit India worden geimporteerd. Komijn, kardemom, korianderzaad, kruidnagel, zwarte peper, kaneelstokjes, laurierblaadjes. De vluchtige aromatische olien in vers gemalen kruiden beginnen te verdampen binnen enkele uren na het malen. Een voorgemengd kruidenmengsel dat weken in een magazijn heeft gelegen, kan daar niet tegenop. Dit is het verschil dat elk gerecht op het <Link href={`${base}/menu`} className="text-[#D4AF37] hover:underline">volledige Chopras Indian Restaurant-menu</Link> kenmerkt.</p>
                <p>De kip wordt de avond ervoor gemarineerd in een yoghurtbasis met verse gember en knoflook. Het lam, lamschouder voor de lambiryani, wordt op dezelfde manier behandeld. Beide zijn afkomstig van <Link href={`${base}/halal-food-den-haag`} className="text-[#D4AF37] hover:underline">volledig halal gecertificeerde leveranciers</Link>. Elke avond, zonder uitzondering. Tegen de tijd dat het vlees de pot bereikt, heeft het al een laag smaak van binnenuit opgenomen.</p>
                <p>De basmatirijst wordt geweekt en gedeeltelijk gekookt, bewust te kort gehouden, omdat hij de rest gaar trekt in de afgesloten pot. Echte saffraandraadjes worden in warm water geweekt en over de bovenste rijstlaag gedruppeld voordat de pot wordt afgesloten. Het deksel gaat op het vuur. De stoom doet de rest. Chopras Indian Restaurant serveert kipbiryani, lambiryani en groentebiryani. Alle drie zijn beschikbaar als onderdeel van het <Link href={`${base}/menu`} className="text-[#D4AF37] hover:underline">volledige Noord-Indiase menu</Link>, beoordeeld met 4,9 sterren op Google op basis van 800+ recensies.</p>
                <p>Naast biryani serveert Chopras Indian Restaurant ook <Link href={`${base}/tandoori-den-haag`} className="text-[#D4AF37] hover:underline">tandoori-specialiteiten</Link>, <Link href={`${base}/butter-chicken-den-haag`} className="text-[#D4AF37] hover:underline">butter chicken</Link> en <Link href={`${base}/dal-makhani-den-haag`} className="text-[#D4AF37] hover:underline">dal makhani</Link> op Leyweg 986. Voor grote groepen of evenementen is er ook <Link href={`${base}/indian-buffet-den-haag`} className="text-[#D4AF37] hover:underline">Indiaas buffet in Den Haag</Link> beschikbaar.</p>
              </>
            ) : (
              <>
                <p>It starts every morning before service. The kitchen at Chopras Indian Restaurant grinds its masalas from whole spices imported directly from India. Cumin, cardamom, coriander seed, cloves, black pepper, cinnamon sticks, bay leaves. The volatile aromatic oils in freshly ground spices begin to evaporate within hours of grinding. A pre-mixed blend sitting in a warehouse for weeks cannot compete. This is the difference you taste in every dish across the <Link href={`${base}/menu`} className="text-[#D4AF37] hover:underline">full Chopras Indian Restaurant menu</Link>.</p>
                <p>The chicken is marinated overnight in a yoghurt base with fresh ginger and garlic. The lamb, shoulder cut for the lamb biryani, is treated the same way. Both are sourced from <Link href={`${base}/halal-food-den-haag`} className="text-[#D4AF37] hover:underline">fully halal-certified suppliers</Link>. Every evening, without exception. By the time the protein reaches the pot, it has already absorbed a layer of flavour from within the flesh itself.</p>
                <p>The basmati rice is soaked and partially cooked, intentionally left short of done, because it will finish inside the sealed pot. Real saffron threads are steeped in warm water and drizzled across the top layer of rice before the pot is sealed. The lid goes on the heat. The steam does the rest. Chopras Indian Restaurant serves chicken biryani, lamb biryani, and vegetable biryani. All three are available as part of the <Link href={`${base}/menu`} className="text-[#D4AF37] hover:underline">full North Indian menu</Link>, rated 4.9 stars on Google from 800+ reviews.</p>
                <p>Alongside biryani, Chopras Indian Restaurant also serves <Link href={`${base}/tandoori-den-haag`} className="text-[#D4AF37] hover:underline">tandoori specialities</Link>, <Link href={`${base}/butter-chicken-den-haag`} className="text-[#D4AF37] hover:underline">butter chicken</Link>, and <Link href={`${base}/dal-makhani-den-haag`} className="text-[#D4AF37] hover:underline">dal makhani</Link> at Leyweg 986. For larger groups or events, <Link href={`${base}/indian-buffet-den-haag`} className="text-[#D4AF37] hover:underline">Indian buffet in Den Haag</Link> is also available.</p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* SECTION 3: Biryani Options */}
      <section className="bg-[#F7F8FC] py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-vibes text-3xl md:text-4xl text-[#C7A348] mb-8">
            {isNl
              ? 'Biryani Bestellen bij Chopras Indian Restaurant'
              : 'Order Biryani at Chopras Indian Restaurant'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[
              {
                name: isNl ? 'Kip Biryani' : 'Chicken Biryani',
                price: '€19.50',
                desc: isNl
                  ? 'Een nacht gemarineerde halal kip, gelaagd met saffraanbasmati en vers gemalen kruiden. Afgesloten en langzaam gegaard via de dum-methode.'
                  : 'Overnight-marinated halal chicken, layered with saffron basmati and freshly ground spices. Sealed and slow-cooked using the dum method.',
              },
              {
                name: isNl ? 'Lam Biryani' : 'Lamb Biryani',
                price: '€22.50',
                desc: isNl
                  ? 'Malse halal lamschouder gemarineerd en gelaagd met saffraanbasmati. Langzaam gegaard totdat het vlees boterzacht is en de rijst alle bouillon heeft opgenomen.'
                  : 'Tender halal lamb shoulder marinated and layered with saffron basmati. Slow-cooked until the meat is fall-apart tender and the rice has absorbed every drop of the stock.',
              },
              {
                name: isNl ? 'Groente Biryani' : 'Vegetable Biryani',
                price: '€17.50',
                desc: isNl
                  ? 'Seizoensgroenten gelaagd met saffraanbasmati en verse masala. Bereid via dezelfde dum-methode als de vleesbiryani.'
                  : 'Seasonal vegetables layered with saffron basmati and fresh masala. Prepared using the same dum method as the meat biryanis.',
              },
            ].map((item) => (
              <div key={item.name} className="bg-white rounded-xl p-6 border-l-4 border-[#D4AF37]">
                <h3 className="font-vibes text-xl text-[#C7A348] mb-1">{item.name} - {item.price}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
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

      {/* GEO BLOCK */}
      <section className="bg-[#1B2B5E] py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-vibes text-3xl md:text-4xl text-white mb-8">
            {isNl
              ? 'Waar Vind Ik Authentieke Biryani in Den Haag?'
              : 'Where Can I Find Authentic Biryani in Den Haag?'}
          </h2>
          <div className="text-white/90 text-lg leading-relaxed">
            {isNl ? (
              <p>Authentieke biryani Den Haag vindt u bij Chopras Indian Restaurant, Leyweg 986, 2545 GW Den Haag, open van dinsdag tot en met zondag van 16:30 tot 22:30. Chopras Indian Restaurant serveert kip-, lam- en groentebiryani via de echte dum-methode: afgesloten, langzaam gegaard met echte saffraandraadjes en kruiden die elke ochtend vers worden gemalen van hele ingredienten uit India. Beoordeeld met 4,9 sterren op Google op basis van 800+ recensies. Volledig <Link href={`${base}/halal-food-den-haag`} className="text-[#C7A348] hover:underline font-semibold">halal gecertificeerd</Link>. <Link href={`${base}/contact`} className="text-[#C7A348] hover:underline font-semibold">Reserveer een tafel</Link> of bestel online via Thuisbezorgd.</p>
            ) : (
              <p>Authentic biryani Den Haag is at Chopras Indian Restaurant, Leyweg 986, 2545 GW Den Haag, open Tuesday to Sunday from 16:30 to 22:30. Chopras Indian Restaurant serves chicken, lamb, and vegetable biryani using the authentic dum method: sealed, slow-cooked with real saffron threads and spices ground fresh every morning from whole ingredients sourced in India. Rated 4.9 stars on Google from 800+ reviews. Fully <Link href={`${base}/halal-food-den-haag`} className="text-[#C7A348] hover:underline font-semibold">halal certified</Link>. <Link href={`${base}/contact`} className="text-[#C7A348] hover:underline font-semibold">Reserve a table</Link> or order online via Thuisbezorgd.</p>
            )}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#F7F8FC] py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-[#C7A348] mb-6 leading-[1.3]">
            {isNl
              ? 'Veelgestelde Vragen over Biryani in Den Haag'
              : 'Frequently Asked Questions About Biryani in Den Haag'}
          </h2>
          <FaqAccordion faqs={isNl ? faqsNl : faqsEn} locale={locale} />
        </div>
      </section>

      {/* CTA + Related Dishes */}
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-vibes text-3xl md:text-4xl text-[#C7A348] mb-8">
            {isNl
              ? 'Meer Gerechten bij Chopras Indian Restaurant Den Haag'
              : 'More Dishes at Chopras Indian Restaurant Den Haag'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Link href={`${base}/tandoori-den-haag`} className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-[#D4AF37] hover:shadow-lg transition-all">
              <p className="text-[#D4AF37] text-sm font-semibold uppercase tracking-widest mb-2">Tandoori</p>
              <p className="text-[#1B2B5E] font-semibold">{isNl ? 'Authentieke tandoori specialiteiten in Den Haag' : 'Authentic tandoori specialities in Den Haag'}</p>
            </Link>
            <Link href={`${base}/butter-chicken-den-haag`} className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-[#D4AF37] hover:shadow-lg transition-all">
              <p className="text-[#D4AF37] text-sm font-semibold uppercase tracking-widest mb-2">Butter Chicken</p>
              <p className="text-[#1B2B5E] font-semibold">{isNl ? 'Butter chicken Den Haag bij Chopras Indian Restaurant' : 'Butter chicken Den Haag at Chopras Indian Restaurant'}</p>
            </Link>
            <Link href={`${base}/dal-makhani-den-haag`} className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-[#D4AF37] hover:shadow-lg transition-all">
              <p className="text-[#D4AF37] text-sm font-semibold uppercase tracking-widest mb-2">{isNl ? 'Vegetarisch' : 'Vegetarian'}</p>
              <p className="text-[#1B2B5E] font-semibold">{isNl ? 'Dal makhani Den Haag - zwarte linzen met boter en room' : 'Dal makhani Den Haag - black lentils with butter and cream'}</p>
            </Link>
            <Link href={`${base}/mutton-rogan-josh-den-haag`} className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-[#D4AF37] hover:shadow-lg transition-all">
              <p className="text-[#D4AF37] text-sm font-semibold uppercase tracking-widest mb-2">{isNl ? 'Lam Curry' : 'Lamb Curry'}</p>
              <p className="text-[#1B2B5E] font-semibold">{isNl ? 'Mutton rogan josh Den Haag - Kasjmirse lamschouder' : 'Mutton rogan josh Den Haag - Kashmiri lamb shoulder'}</p>
            </Link>
            <Link href={`${base}/indian-food-delivery-den-haag`} className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-[#D4AF37] hover:shadow-lg transition-all">
              <p className="text-[#D4AF37] text-sm font-semibold uppercase tracking-widest mb-2">{isNl ? 'Bezorging' : 'Delivery'}</p>
              <p className="text-[#1B2B5E] font-semibold">{isNl ? 'Indiaas eten bezorgen in Den Haag' : 'Indian food delivery in Den Haag'}</p>
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
                {isNl ? 'maak een reservering bij Chopras Indian Restaurant Den Haag' : 'book a table at Chopras Indian Restaurant Den Haag'}
              </Link>.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
