import type { Metadata } from 'next'
import Link from 'next/link'
import JsonLd from '@/components/seo/JsonLd'
import { getLocalizedUrl } from '@/lib/utils'
import { getLocalRestaurantSchema, getBreadcrumbSchema, getFaqPageSchema, getDeliveryServiceSchema } from '@/lib/schema'
import { getTranslations, type Locale } from '@/lib/useTranslations'
import FaqAccordion from '@/components/sections/FaqAccordion'

type Props = { params: { locale: Locale } }

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'nl' }]
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params
  const titles = {
    en: 'Indian Food Delivery in Den Haag | Chopras Indian Restaurant',
    nl: 'Indiaas Eten Bezorgen in Den Haag | Chopras Indian Restaurant',
  }
  const descriptions = {
    en: 'Indian food delivery Den Haag from Chopras Indian Restaurant. Fresh curries and biryani delivered hot to your door. Halal certified. Order online.',
    nl: 'Indiaas eten bezorgen Den Haag van Chopras Indian Restaurant. Verse curry en biryani heet bezorgd. Halal gecertificeerd. Bestel online vandaag.',
  }
  return {
    title: titles[locale],
    description: descriptions[locale],
    alternates: {
      canonical: getLocalizedUrl(locale, 'indian-food-delivery-den-haag'),
      languages: {
        en: getLocalizedUrl('en', 'indian-food-delivery-den-haag'),
        nl: getLocalizedUrl('nl', 'indian-food-delivery-den-haag'),
        'x-default': getLocalizedUrl('en', 'indian-food-delivery-den-haag'),
      },
    },
    openGraph: {
      title: titles[locale],
      description: descriptions[locale],
      url: getLocalizedUrl(locale, 'indian-food-delivery-den-haag'),
      images: [{ url: '/og/home-og.jpg', width: 1200, height: 630, alt: 'Chopras Indian Restaurant Den Haag food delivery' }],
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
    question: 'Does Chopras Indian Restaurant deliver food in Den Haag?',
    answer: 'Yes. Chopras Indian Restaurant delivers food across Den Haag via Thuisbezorgd and Uber Eats. You can also order directly by calling +31 6 30645930. Every delivery order is cooked fresh after it is placed at our kitchen at Leyweg 986. We are open Tuesday to Sunday from 16:30 to 22:30.',
  },
  {
    question: 'Is the food delivered by Chopras halal certified?',
    answer: 'Yes, fully. Chopras Indian Restaurant is a completely halal kitchen. Every meat supplier is halal certified. Every dish on the menu is halal. There is no mixed kitchen and no cross-contamination risk. When you order delivery from Chopras, you are ordering from a kitchen where every ingredient has been verified.',
  },
  {
    question: 'What Indian dishes can I order for delivery in Den Haag?',
    answer: 'The full menu is available for delivery. This includes all curries, biryani, tandoori dishes, naan and roti, Indo Chinese dishes including chilli chicken and Hakka noodles, and vegetarian and vegan options. Chopras has 143 dishes across 13 categories. You can view the complete menu online before ordering.',
  },
  {
    question: 'How does Chopras make sure the food arrives hot?',
    answer: 'Every order is cooked fresh after it is placed. Nothing sits under heating lights waiting. Food goes into insulated containers immediately after cooking and is collected promptly. Naan is baked in our 400-degree tandoor and sealed while still warm. The result is food that arrives tasting the way it was made.',
  },
  {
    question: 'Which areas in Den Haag does Chopras deliver to?',
    answer: 'Chopras Indian Restaurant delivers across Den Haag including Leyenburg, Voorburg, and surrounding areas. We also serve guests from Rijswijk, Delft, Zoetermeer, and Leidschendam. Delivery availability depends on your distance from Leyweg 986. Check Thuisbezorgd or Uber Eats with your postcode to confirm your area.',
  },
]

const faqsNl: Array<{ question: string; answer: string }> = [
  {
    question: 'Bezorgt Chopras Indian Restaurant eten in Den Haag?',
    answer: 'Ja. Chopras Indian Restaurant bezorgt in heel Den Haag via Thuisbezorgd en Uber Eats. Je kunt ook rechtstreeks bestellen door te bellen naar +31 6 30645930. Elke bezorgbestelling wordt vers bereid na plaatsing in onze keuken op Leyweg 986. We zijn open van dinsdag tot en met zondag van 16:30 tot 22:30.',
  },
  {
    question: 'Is het eten van Chopras halal gecertificeerd?',
    answer: 'Ja, volledig. Chopras Indian Restaurant is een volledig halal keuken. Elke vleesleverancier is halal gecertificeerd. Elk gerecht op het menu is halal. Er is geen gemengde keuken en geen risico op kruisbesmetting. Als je bij Chopras bestelt, bestel je uit een keuken waar elk ingrediënt is geverifieerd.',
  },
  {
    question: 'Welke Indiase gerechten kan ik laten bezorgen in Den Haag?',
    answer: 'Het volledige menu is beschikbaar voor bezorging. Dit omvat alle currys, biryani, tandoorigerechten, naan en roti, Indo-Chinese gerechten zoals chilli chicken en Hakka noodles, en vegetarische en veganistische opties. Chopras heeft 143 gerechten in 13 categorieën. Je kunt het volledige menu online bekijken voor het bestellen.',
  },
  {
    question: 'Hoe zorgt Chopras ervoor dat het eten heet aankomt?',
    answer: 'Elke bestelling wordt vers bereid nadat deze is geplaatst. Niets staat te wachten onder warmtelampen. Het eten gaat direct na het koken in geïsoleerde containers en wordt snel opgehaald. Naan wordt gebakken in onze tandoor op 400 graden en verzegeld terwijl hij nog warm is. Het resultaat is eten dat aankomt zoals het is bereid.',
  },
  {
    question: 'Naar welke wijken in Den Haag bezorgt Chopras?',
    answer: 'Chopras Indian Restaurant bezorgt in heel Den Haag, inclusief Leyenburg, Voorburg en omliggende gebieden. We bedienen ook gasten uit Rijswijk, Delft, Zoetermeer en Leidschendam. De beschikbaarheid van bezorging hangt af van je afstand tot Leyweg 986. Controleer Thuisbezorgd of Uber Eats met je postcode.',
  },
]

export default function IndianFoodDeliveryPage({ params }: Props) {
  const { locale } = params
  const tr = getTranslations(locale)
  const base = locale === 'nl' ? '/nl' : ''
  const isNl = locale === 'nl'

  return (
    <>
      <JsonLd data={getLocalRestaurantSchema(locale, ['Den Haag'], getLocalizedUrl(locale, 'indian-food-delivery-den-haag'))} />
      <JsonLd data={getBreadcrumbSchema([
        { name: tr.common.nav.home, item: getLocalizedUrl(locale) },
        { name: isNl ? 'Indiaas Eten Bezorgen' : 'Indian Food Delivery', item: getLocalizedUrl(locale, 'indian-food-delivery-den-haag') },
      ])} />
      <JsonLd data={getFaqPageSchema(isNl ? faqsNl : faqsEn)} />
      <JsonLd data={getDeliveryServiceSchema(locale)} />

      {/* HERO */}
      <section className="bg-[#1B2B5E] py-20 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-white/40 bg-white/10 backdrop-blur-sm mb-6">
            <span className="text-white text-xs font-medium uppercase tracking-widest">
              • CATERING · CHOPRAS INDIAN RESTAURANT · DEN HAAG •
            </span>
          </div>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-6 leading-tight">
            {isNl ? 'Indiaas Eten Bezorgen in Den Haag' : 'Indian Food Delivery in Den Haag'}
          </h1>
          <p className="font-body text-white/85 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-8">
            {isNl
              ? 'Dezelfde keuken. Dezelfde kruiden. Dezelfde standaard. Heet bezorgd aan je deur.'
              : 'Same kitchen. Same spices. Same standard. Delivered hot to your door.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`${base}/contact`}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] px-6 py-3 text-white text-sm font-medium uppercase tracking-wide transition-all duration-200 ease-out hover:bg-transparent hover:text-white active:scale-[0.98] min-h-[48px]"
            >
              {isNl ? 'Nu Bestellen' : 'Order Now'}
            </Link>
            <Link
              href={`${base}/menu`}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white bg-white/10 px-6 py-3 text-white text-sm font-medium uppercase tracking-wide transition-all duration-200 ease-out hover:bg-[rgba(199,163,72,0.3)] active:scale-[0.98] min-h-[48px] backdrop-blur-[10px]"
            >
              {tr.common.viewMenu}
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 1 — Same Kitchen, Delivered */}
      <section className="bg-[#F7F8FC] py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-6 leading-[1.3]">
            {isNl ? 'Dezelfde Keuken. Bezorgd aan Jouw Deur.' : 'The Same Kitchen. Delivered to Your Door.'}
          </h2>
          {isNl ? (
            <div className="space-y-5">
              <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                Koude bezorging is een breuk in vertrouwen. Je hebt Indiaas eten besteld bij een restaurant dat je vertrouwt, en het arriveert in een bakje dat goed ruikt maar verkeerd smaakt. De saus is gesplitst. De naan is zacht geworden. De rijst is samengekoekt. Dit gebeurt wanneer het eten uren voor vertrek uit de keuken is bereid, of wanneer het te lang in een bezorgtas heeft gezeten zonder goede isolatie.
              </p>
              <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                <strong>Chopras Indian Restaurant</strong> werkt anders. Elke bestelling wordt vers bereid nadat je hem plaatst. Je{' '}
                <Link href={`${base}/butter-chicken-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">butter chicken</Link>{' '}
                komt van een saus die op het vuur heeft staan pruttelen, niet opgewarmd uit een bak. Je{' '}
                <Link href={`${base}/biryani-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">biryani Den Haag</Link>{' '}
                wordt samengesteld en verzegeld op het perfecte moment. Je naan komt van een tandoor die 400 graden Celsius bereikt en gaat direct in een geïsoleerde tas. Het eten dat bij je deur aankomt is hetzelfde eten dat aan je tafel in Leyweg 986 zou worden geserveerd.
              </p>
              <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                Bestel via Thuisbezorgd of Uber Eats, of bel ons rechtstreeks. Chopras Indian Restaurant is open van dinsdag tot en met zondag vanaf 16:30. Elk gerecht op{' '}
                <Link href={`${base}/menu`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">ons volledige menu</Link>{' '}
                is beschikbaar voor bezorging. Volledig{' '}
                <Link href={`${base}/halal-food-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">halal gecertificeerd</Link>{' '}
                - geen uitzonderingen.
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                Cold delivery is a betrayal of trust. You ordered Indian food from a restaurant you rely on, and it arrives in a container that smells right but tastes wrong. The sauce has split. The naan has gone soft. The rice has clumped. This happens when the food was cooked hours before it left the kitchen, or when it sat too long in a delivery bag with no insulation worth mentioning.
              </p>
              <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                <strong>Chopras Indian Restaurant</strong> handles Indian food delivery in Den Haag differently. Every order is cooked fresh after you place it. Your{' '}
                <Link href={`${base}/butter-chicken-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">butter chicken</Link>{' '}
                is made from a sauce that has been building on the stove, not reheated from a tub. Your{' '}
                <Link href={`${base}/biryani-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">biryani Den Haag</Link>{' '}
                is assembled and sealed at its peak. Your naan comes from a tandoor fired at 400 degrees Celsius and goes straight into an insulated bag. The food that arrives at your door is the same food that would arrive at your table at Leyweg 986.
              </p>
              <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                Order via Thuisbezorgd or Uber Eats, or call us directly. Chopras Indian Restaurant is open Tuesday to Sunday from 16:30. Every dish on{' '}
                <Link href={`${base}/menu`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">our full menu</Link>{' '}
                is available for delivery. Fully{' '}
                <Link href={`${base}/halal-food-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">halal certified</Link>{' '}
                throughout.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* SECTION 2 — What Den Haag Orders */}
      <section className="bg-white py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-6 leading-[1.3]">
            {isNl ? 'Wat Den Haag Bestelt bij Chopras' : 'What Den Haag Orders from Chopras'}
          </h2>
          {isNl ? (
            <div className="space-y-8">
              <div>
                <h3 className="font-vibes text-3xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-4 leading-[1.3]">Currys</h3>
                <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                  Een goede curry wordt beter in de eerste tien minuten nadat hij de keuken verlaat. De kruiden settelen. De saus verdiept. Bij Chopras worden kruiden elke ochtend vers gemalen van hele specerijen die rechtstreeks uit India worden gehaald, niet uit een pakket of kant-en-klare mix. Dat is het verschil dat je proeft.{' '}
                  <Link href={`${base}/dal-makhani-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">Dal makhani</Link>,{' '}
                  <Link href={`${base}/mutton-rogan-josh-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">mutton rogan josh</Link>,{' '}
                  kip tikka masala, soya chaap - allemaal vers gemaakt van scratch.
                </p>
              </div>
              <div>
                <h3 className="font-vibes text-3xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-4 leading-[1.3]">Biryani</h3>
                <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                  Biryani is de test van elke Indiase keuken. Echte biryani bestaat uit laagjes gemarineerd vlees, saffraan-gestempelde basmatirijst en langzaam gegaarde aroma&apos;s, samen verzegeld en afgewerkt. We verzegelen de container op het moment dat hij klaar is. Je opent hem thuis en hij heeft nog steeds die stoom. Kip biryani, lamsvlees biryani, groente biryani - allemaal beschikbaar voor bezorging in Den Haag.
                </p>
              </div>
              <div>
                <h3 className="font-vibes text-3xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-4 leading-[1.3]">Brood uit de Tandoor</h3>
                <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                  <Link href={`${base}/naan-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">Tandoori naan</Link>{' '}
                  wordt gebakken tegen de kleienmuur van onze tandoor op 400 graden. Het verlaat de oven met aangebrande randen en stoom van binnen. Het is niet mogelijk om dit thuis na te maken. We bakken het op je bestelling. Het gaat warm in de tas. Het arriveert warm. Roti en paratha ook beschikbaar.
                </p>
              </div>
              <div>
                <h3 className="font-vibes text-3xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-4 leading-[1.3]">Indo-Chinees</h3>
                <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                  Chopras Indian Restaurant is een van de weinige restaurants in Den Haag dat authentiek{' '}
                  <Link href={`${base}/indo-chinese-restaurant-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">Indo-Chinees eten</Link>{' '}
                  serveert naast een volledig Noord-Indiaas menu. Chilli chicken, chilli paneer, Hakka noodles en Manchow soep. Dit is een keukencategorie die moeilijk te vinden is in Den Haag - en het is ook beschikbaar voor bezorging.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              <div>
                <h3 className="font-vibes text-3xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-4 leading-[1.3]">Curries</h3>
                <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                  A well-made curry gets better in the first ten minutes after it leaves the kitchen. The spices settle. The sauce deepens. At Chopras, spices are ground fresh every morning from whole ingredients sourced directly from India, not from a packet or a pre-mixed blend. That is the difference you taste.{' '}
                  <Link href={`${base}/dal-makhani-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">Dal makhani</Link>,{' '}
                  <Link href={`${base}/mutton-rogan-josh-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">mutton rogan josh</Link>,{' '}
                  chicken tikka masala, soya chaap - all made from scratch, every order.
                </p>
              </div>
              <div>
                <h3 className="font-vibes text-3xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-4 leading-[1.3]">Biryani</h3>
                <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                  Biryani is the test of any Indian kitchen. Real biryani is layers of marinated meat, saffron-stained basmati rice, and slow-cooked aromatics, sealed together and finished in the pot. We seal the container the moment it is ready. You open it at home and it still has that steam. Chicken biryani, lamb biryani, vegetable biryani - all available for delivery across Den Haag.
                </p>
              </div>
              <div>
                <h3 className="font-vibes text-3xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-4 leading-[1.3]">Bread from the Tandoor</h3>
                <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                  <Link href={`${base}/naan-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">Tandoori naan</Link>{' '}
                  is baked against the clay wall of our tandoor at 400 degrees Celsius. It comes out with char on the edges and steam inside. It is not possible to replicate this at home. We bake it on your order. It goes into the bag warm. It arrives warm. Roti and paratha are also available.
                </p>
              </div>
              <div>
                <h3 className="font-vibes text-3xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-4 leading-[1.3]">Indo Chinese</h3>
                <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                  Chopras Indian Restaurant serves authentic{' '}
                  <Link href={`${base}/indo-chinese-restaurant-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">Indo Chinese food</Link>{' '}
                  alongside a full North Indian menu. Chilli chicken, chilli paneer, Hakka noodles, Manchow soup. This is a cuisine category that is hard to find elsewhere in Den Haag - and it is available for delivery.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* SECTION 3 — Halal Delivery Standard */}
      <section className="bg-[#FFFAF5] py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-6 leading-[1.3]">
            {isNl ? 'Halal Indiaas Eten Bezorgen in Den Haag' : 'Halal Indian Food Delivery Den Haag'}
          </h2>
          {isNl ? (
            <div className="space-y-5">
              <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                Halal bij Chopras Indian Restaurant is geen label op sommige menu-items. Het is de hele keuken. Elke vleesleverancier is halal gecertificeerd. Elk gerecht is halal. Er is geen gemengde keuken, geen risico op kruisbesmetting, geen onduidelijkheid. Als je{' '}
                <Link href={`${base}/halal-menu`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">halal bezorging in Den Haag</Link>{' '}
                bestelt bij ons, bestel je bij een keuken waar elk ingrediënt is geverifieerd.
              </p>
              <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                Dit is bijzonder belangrijk bij bezorging. Als je de keuken niet kunt zien, vertrouw je op de standaard. Chopras heeft 4,9 sterren van meer dan 800 beoordelingen op Google - waaronder honderden van moslimfamilies uit Den Haag, Rijswijk en Zoetermeer die specifiek terugkomen omdat de halal-certificering bevestigd is en het eten echt is. De{' '}
                <Link href={`${base}/halal-food-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">halal standaard bij Chopras</Link>{' '}
                is niet onderhandelbaar.
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                Halal at Chopras Indian Restaurant is not a label on some menu items. It is the entire kitchen. Every meat supplier is halal certified. Every dish is halal. There is no mixed kitchen, no cross-contamination risk, no ambiguity. When you order{' '}
                <Link href={`${base}/halal-menu`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">halal delivery in Den Haag</Link>{' '}
                from us, you are ordering from a kitchen where every ingredient has been verified.
              </p>
              <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                This matters for delivery in particular. When you cannot see the kitchen, you are trusting the standard. Chopras has 4.9 stars from 800+ Google reviews, including hundreds from Muslim families across Den Haag, Rijswijk, and Zoetermeer who return specifically because the halal is confirmed and the food is genuine. The{' '}
                <Link href={`${base}/halal-food-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">halal standard at Chopras</Link>{' '}
                is not negotiable.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* GEO BLOCK */}
      <section className="bg-[#F7F8FC] py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-6 leading-[1.3]">
            {isNl
              ? 'Bezorgt Chopras Indian Restaurant Eten in Den Haag?'
              : 'Does Chopras Indian Restaurant Deliver Food in Den Haag?'}
          </h2>
          {isNl ? (
            <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
              Ja. Chopras Indian Restaurant bezorgt eten in heel Den Haag via Thuisbezorgd en Uber Eats, of rechtstreeks via de telefoon. De keuken bevindt zich op Leyweg 986, 2545 GW Den Haag, en elke bezorgbestelling wordt vers bereid na plaatsing. Chopras is open van dinsdag tot en met zondag van 16:30 tot 22:30 en is volledig halal gecertificeerd. Met 4,9 sterren van meer dan 800 Google reviews is het het best beoordeelde{' '}
              <Link href={`${base}/`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">Indiaas restaurant in Den Haag</Link>{' '}
              met{' '}
              <Link href={`${base}/contact`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">online bestellen</Link>{' '}
              nu beschikbaar.
            </p>
          ) : (
            <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
              Yes. Chopras Indian Restaurant delivers food across Den Haag via Thuisbezorgd and Uber Eats, or directly by phone. The kitchen is at Leyweg 986, 2545 GW Den Haag, and every delivery order is cooked fresh after it is placed. Chopras is open Tuesday to Sunday from 16:30 to 22:30 and is fully halal certified. With 4.9 stars from 800+ Google reviews, it is one of the strongest-rated{' '}
              <Link href={`${base}/`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">Indian restaurant in Den Haag</Link>{' '}
              with{' '}
              <Link href={`${base}/contact`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">online ordering</Link>{' '}
              available now.
            </p>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-6 leading-[1.3]">
            {isNl ? 'Veelgestelde Vragen over Bezorging' : 'Indian Food Delivery Den Haag — Common Questions'}
          </h2>
          <FaqAccordion faqs={isNl ? faqsNl : faqsEn} locale={locale} />
        </div>
      </section>

      {/* POPULAR DELIVERY DISHES GRID */}
      <section className="bg-[#FFFAF5] py-20 px-6 md:px-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-6 leading-[1.3] text-center">
            {isNl ? 'Populaire Bezorggerechten' : 'Most Ordered Delivery Dishes'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
            <Link href={`${base}/butter-chicken-den-haag`} className="block p-6 md:p-8 bg-white rounded-lg border border-gray-200 hover:border-white hover:shadow-lg transition-all">
              <p className="text-white text-sm font-semibold uppercase tracking-widest mb-2">
                {isNl ? 'Butter Chicken' : 'Butter Chicken'}
              </p>
              <p className="font-body text-[#1A1A1A]/70 text-base leading-relaxed">
                {isNl ? 'Verse tomatensaus met room en gegrilde kip. Een van onze meest bestelde bezorggerechten.' : 'Fresh tomato and cream sauce with grilled halal chicken. One of our most ordered delivery dishes.'}
              </p>
            </Link>
            <Link href={`${base}/biryani-den-haag`} className="block p-6 md:p-8 bg-white rounded-lg border border-gray-200 hover:border-white hover:shadow-lg transition-all">
              <p className="text-white text-sm font-semibold uppercase tracking-widest mb-2">
                {isNl ? 'Biryani' : 'Biryani'}
              </p>
              <p className="font-body text-[#1A1A1A]/70 text-base leading-relaxed">
                {isNl ? 'Saffraan basmatirijst met gemarineerd vlees. Kip, lam of groente.' : 'Saffron basmati rice with marinated meat. Chicken, lamb, or vegetable.'}
              </p>
            </Link>
            <Link href={`${base}/dal-makhani-den-haag`} className="block p-6 md:p-8 bg-white rounded-lg border border-gray-200 hover:border-white hover:shadow-lg transition-all">
              <p className="text-white text-sm font-semibold uppercase tracking-widest mb-2">
                Dal Makhani
              </p>
              <p className="font-body text-[#1A1A1A]/70 text-base leading-relaxed">
                {isNl ? 'Zwarte linzen langzaam gekookt met boter en room. Vegetarisch en halal.' : 'Black lentils slow-cooked with butter and cream. Vegetarian and halal.'}
              </p>
            </Link>
            <Link href={`${base}/tandoori-den-haag`} className="block p-6 md:p-8 bg-white rounded-lg border border-gray-200 hover:border-white hover:shadow-lg transition-all">
              <p className="text-white text-sm font-semibold uppercase tracking-widest mb-2">
                {isNl ? 'Tandoori Gerechten' : 'Tandoori Dishes'}
              </p>
              <p className="font-body text-[#1A1A1A]/70 text-base leading-relaxed">
                {isNl ? 'Gegrild in onze kleiovens op 400 graden. Seekh kebab, chicken tikka, meer.' : 'Grilled in our clay oven at 400 degrees Celsius. Seekh kebab, chicken tikka, and more.'}
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-[#1B2B5E] py-20 px-6 md:px-16 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-6 leading-[1.3]">
            {isNl ? 'Klaar om te Bestellen?' : 'Ready to Order?'}
          </h2>
          <p className="font-body text-white/85 text-lg leading-relaxed mb-8">
            {isNl
              ? 'Bestel nu via Thuisbezorgd of Uber Eats. Of bel ons rechtstreeks op +31 6 30645930. Open van dinsdag tot en met zondag, 16:30 tot 22:30.'
              : 'Order now via Thuisbezorgd or Uber Eats. Or call us directly on +31 6 30645930. Open Tuesday to Sunday, 16:30 to 22:30.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`${base}/contact`}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] px-6 py-3 text-white text-sm font-medium uppercase tracking-wide transition-all duration-200 ease-out hover:bg-transparent hover:text-white active:scale-[0.98] min-h-[48px]"
            >
              {isNl ? 'Nu Bestellen' : 'Order Now'}
            </Link>
            <Link
              href={`${base}/indian-takeaway-den-haag`}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white bg-white/10 px-6 py-3 text-white text-sm font-medium uppercase tracking-wide transition-all duration-200 ease-out hover:bg-[rgba(199,163,72,0.3)] active:scale-[0.98] min-h-[48px] backdrop-blur-[10px]"
            >
              {isNl ? 'Afhalen' : 'Indian Takeaway'}
            </Link>
            <Link
              href={`${base}/catering`}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white bg-white/10 px-6 py-3 text-white text-sm font-medium uppercase tracking-wide transition-all duration-200 ease-out hover:bg-[rgba(199,163,72,0.3)] active:scale-[0.98] min-h-[48px] backdrop-blur-[10px]"
            >
              {isNl ? 'Catering voor Evenementen' : 'Catering for Events'}
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
