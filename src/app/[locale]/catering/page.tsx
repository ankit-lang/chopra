import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {
  Heart, Briefcase, Cake, Star, Users, Sun, Camera, Music,
  CheckCircle, ChefHat, Shield,
} from 'lucide-react'
import JsonLd from '@/components/seo/JsonLd'
import { getLocalizedUrl } from '@/lib/utils'
import { getCateringServiceSchema, getBreadcrumbSchema, getFaqPageSchema } from '@/lib/schema'
import CateringForm from '@/components/catering/CateringForm'
import FaqAccordion from '@/components/sections/FaqAccordion'
import { cateringPageFaqs, cateringPageFaqsNl } from '@/lib/faq-data'
import { getTranslations, type Locale } from '@/lib/useTranslations'

type Props = { params: { locale: Locale } }

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'nl' }]
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params
  const titles = {
    en: 'Indian Catering Den Haag | Chopras Indian Restaurant',
    nl: 'Indiaas Catering Den Haag | Chopras Indian Restaurant',
  }
  const descriptions = {
    en: 'Indian catering Den Haag by Chopras Indian Restaurant. Weddings, birthdays and corporate events. Halal certified and fresh. Request a free quote.',
    nl: 'Indiaas catering Den Haag door Chopras Indian Restaurant. Bruiloften, verjaardagen en bedrijfsevenementen. Halal gecertificeerd en vers. Offerte aanvragen.',
  }
  return {
    title: titles[locale],
    description: descriptions[locale],
    alternates: {
      canonical: getLocalizedUrl(locale, 'catering'),
      languages: {
        en: getLocalizedUrl('en', 'catering'),
        nl: getLocalizedUrl('nl', 'catering'),
        'x-default': getLocalizedUrl('en', 'catering'),
      },
    },
    openGraph: {
      title: titles[locale],
      description: descriptions[locale],
      url: getLocalizedUrl(locale, 'catering'),
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

export default function LocaleCateringPage({ params }: Props) {
  const { locale } = params
  const tr = getTranslations(locale)
  const base = locale === 'nl' ? '/nl' : ''
  const isNl = locale === 'nl'

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: tr.common.nav.home, item: getLocalizedUrl(locale) },
    { name: tr.common.nav.catering, item: getLocalizedUrl(locale, 'catering') },
  ])

  const eventTypes = [
    { Icon: Heart, label: isNl ? 'Bruiloften' : 'Weddings' },
    { Icon: Briefcase, label: isNl ? 'Zakelijke Diners' : 'Corporate Dinners' },
    { Icon: Cake, label: isNl ? 'Verjaardagsfeesten' : 'Birthday Parties' },
    { Icon: Star, label: isNl ? 'Diwali Vieringen' : 'Diwali Celebrations' },
    { Icon: Users, label: isNl ? 'Gemeenschapsfeesten' : 'Community Events' },
    { Icon: Sun, label: isNl ? 'Eid Vieringen' : 'Eid Celebrations' },
    { Icon: Camera, label: isNl ? 'Fotoshoots' : 'Photo Shoots' },
    { Icon: Music, label: isNl ? 'Culturele Events' : 'Cultural Events' },
  ]

  const whyCards = [
    { Icon: ChefHat, title: tr.catering.why1Title, body: tr.catering.why1Copy },
    { Icon: CheckCircle, title: tr.catering.why2Title, body: tr.catering.why2Copy },
    { Icon: Shield, title: tr.catering.why3Title, body: tr.catering.why3Copy },
    { Icon: Users, title: tr.catering.why4Title, body: tr.catering.why4Copy },
  ]

  const capacityStats = [
    { number: '25-80', label: isNl ? 'Gasten' : 'Guests' },
    { number: '4.9', label: isNl ? 'Google Sterren' : 'Google Stars' },
    { number: '800+', label: isNl ? 'Beoordelingen' : 'Reviews' },
  ]

  return (
    <>
      <JsonLd data={getCateringServiceSchema(locale)} />
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={getFaqPageSchema(isNl ? cateringPageFaqsNl : cateringPageFaqs)} />

      {/* HERO */}
      <section className="relative min-h-[60vh] flex items-center justify-center">
        <Image
          src="/images/catering/wedding-celebrations---1.png"
          alt={isNl
            ? 'Indiaas catering voor bruiloften en evenementen bij Chopras Indian Restaurant Den Haag'
            : 'Indian catering for weddings and events at Chopras Indian Restaurant Den Haag'}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.45) 100%)' }}
        />
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto py-20">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-[#C7A348]/40 bg-white/10 backdrop-blur-sm mb-4">
            <span className="text-[#C7A348] text-xs font-medium uppercase tracking-widest">
              • CATERING · CHOPRAS INDIAN RESTAURANT · DEN HAAG •
            </span>
          </div>
          <h1
            className="font-vibes text-5xl md:text-7xl text-white mb-6"
            style={{ textShadow: '0 2px 8px rgba(0,0,0,0.6)' }}
          >
            {tr.catering.heroH1}
          </h1>
          <p
            className="text-white/80 text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-8"
            style={{ textShadow: '0 1px 4px rgba(0,0,0,0.7)' }}
          >
            {isNl
              ? 'Bruiloften. Zakelijke diners. Verjaardagsfeesten. Diwali-vieringen.'
              : 'Weddings. Corporate dinners. Birthday parties. Diwali celebrations.'}
          </p>
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center justify-center gap-2 text-[#D4AF37]/70 text-xs uppercase tracking-widest">
              <li>
                <Link href={base || '/'} className="hover:text-[#D4AF37] transition-colors">
                  {tr.common.nav.home}
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-[#D4AF37]/50">{tr.common.nav.catering}</li>
            </ol>
          </nav>
          <a
            href="#catering-form"
            className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#C7A348] bg-white/10 px-6 py-3 text-white text-sm font-medium uppercase tracking-wide transition-all duration-200 ease-out hover:bg-[rgba(199,163,72,0.3)] active:scale-[0.98] min-h-[48px] backdrop-blur-[10px]"
          >
            {isNl ? 'Offerte Aanvragen' : 'Get a Catering Quote'}
          </a>
        </div>
      </section>

      {/* SERVICE OVERVIEW — bg-white */}
      <section className="bg-white py-20 md:py-28 px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-xs uppercase tracking-widest text-[#D4AF37] font-medium mb-4">
                {isNl ? 'WAT WIJ DOEN' : 'WHAT WE DO'}
              </p>
              <h2 className="font-vibes text-4xl md:text-5xl text-[#C7A348] mb-6">
                {tr.catering.serviceH2}
              </h2>
              <div className="space-y-4 text-[#1A1A1A] text-base md:text-lg leading-relaxed">
                {isNl ? (
                  <>
                    <p>
                      Chopras inhuren voor je evenement betekent het echte restaurant op je locatie krijgen, geen cateringbedrijf dat toevallig ook Indiaas kookt. Onze koks zijn dezelfde koks die elke avond in onze keuken op{' '}
                      <Link href={`${base}/contact`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                        Leyweg 986, Den Haag
                      </Link>{' '}
                      koken. De specerijen zijn dezelfde hele specerijen rechtstreeks uit India, die elke ochtend vers worden gemalen. De{' '}
                      <Link href={`${base}/biryani-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                        biryani
                      </Link>{' '}
                      die je gasten eten op je evenement is dezelfde biryani waarvoor mensen vanuit heel Den Haag komen.
                    </p>
                    <p>
                      Elk menu wordt van scratch opgebouwd voor jouw evenement. Jouw datum, jouw gastenlijst, jouw dieetvereisten.{' '}
                      <Link href={`${base}/halal-food-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                        Halal als standaard
                      </Link>
                      , zonder uitzondering.{' '}
                      <Link href={`${base}/vegan-menu`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                        Vegetarische en veganistische opties
                      </Link>{' '}
                      standaard inbegrepen zonder dat je ernaar hoeft te vragen. Een bericht of telefoontje start het gesprek.
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      Hiring Chopras Indian Restaurant for your event means getting the actual restaurant at your venue, not a catering company that happens to do Indian food. Our chefs are the same chefs who cook in our kitchen at{' '}
                      <Link href={`${base}/contact`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                        Leyweg 986, Den Haag
                      </Link>{' '}
                      every evening. The spices are the same whole spices sourced directly from India, ground fresh every morning. The{' '}
                      <Link href={`${base}/biryani-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                        biryani
                      </Link>{' '}
                      your guests eat at your event is the same biryani that people drive across Den Haag to order.
                    </p>
                    <p>
                      Every menu is built from scratch for your event. Your date, your guest count, your dietary requirements.{' '}
                      <Link href={`${base}/halal-food-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                        Halal as standard
                      </Link>
                      , no exceptions.{' '}
                      <Link href={`${base}/vegan-menu`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                        Vegetarian and vegan options
                      </Link>{' '}
                      included without being asked. One call or email starts the conversation.
                    </p>
                  </>
                )}
              </div>
            </div>
            <div className="space-y-4">
              {[
                isNl ? 'Halal Gecertificeerd als Standaard' : 'Halal Certified as Standard',
                isNl ? 'Vegetarische en Veganistische Opties Inbegrepen' : 'Vegetarian and Vegan Options Included',
                isNl ? 'Privé Evenementenruimte: 25 tot 80 Gasten' : 'Private Hall: 25 to 80 Guests',
                isNl ? 'Den Haag, Rijswijk, Delft en Omgeving' : 'Den Haag, Rijswijk, Delft and Surroundings',
              ].map((label) => (
                <div
                  key={label}
                  className="flex items-center gap-4 p-5 bg-[#F7F8FC] rounded-2xl border border-gray-100 shadow-sm"
                >
                  <CheckCircle className="text-[#D4AF37] w-5 h-5 flex-shrink-0" />
                  <span className="text-[#1A1A1A] text-base font-medium">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* EVENT TYPES — dark navy */}
      <section
        className="py-20 md:py-28 px-6 md:px-16"
        style={{ background: 'linear-gradient(135deg, #000066 0%, #0000FF 100%)' }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-widest text-[#D4AF37] font-medium mb-4">
              {isNl ? 'VOOR WIE WE CATEREN' : 'WHO WE CATER FOR'}
            </p>
            <h2 className="font-vibes text-4xl md:text-5xl text-white">
              {tr.catering.eventsH2}
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {eventTypes.map(({ Icon, label }) => (
              <div
                key={label}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center hover:bg-white/20 transition-all"
              >
                <Icon className="text-[#D4AF37] w-8 h-8 mx-auto mb-3" />
                <p className="text-white font-medium text-sm">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* THE FOOD STANDARD — bg-[#F7F8FC] */}
      <section className="bg-[#F7F8FC] py-20 md:py-28 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-[#D4AF37] font-medium mb-4">
            {isNl ? 'DE STANDAARD' : 'THE DIFFERENCE'}
          </p>
          <h2 className="font-vibes text-4xl md:text-5xl text-[#C7A348] mb-6 leading-[1.4]">
            {isNl
              ? 'Het Eten op Uw Evenement Is Hetzelfde als in Ons Restaurant'
              : 'The Food at Your Event Is the Same Food We Serve in Our Restaurant'}
          </h2>
          <div className="space-y-4 text-[#1A1A1A] text-base md:text-lg leading-relaxed mb-8">
            {isNl ? (
              <>
                <p>
                  De meeste cateringbedrijven bereiden eten in een centrale productiekeuken, laden het in busjes en warmen het op op je locatie. Het eten dat je gasten eten is uren eerder bereid, verpakt in containers en ter plaatse opgewarmd. Je kunt het verschil proeven. Je gasten ook.
                </p>
                <p>
                  Bij Chopras Indian Restaurant wordt het eten op je evenement bereid met dezelfde methoden als in onze restaurantkeuken. Hele specerijen rechtstreeks uit India, op de dag vers gemalen.{' '}
                  <Link href={`${base}/butter-chicken-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                    Butter chicken
                  </Link>{' '}
                  uit hetzelfde recept dat gasten 4.9 sterren op Google hebben gegeven.{' '}
                  <Link href={`${base}/tandoori-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                    Tandoori gerechten
                  </Link>{' '}
                  bereid op de temperatuur waarvoor ze zijn ontworpen: 400 graden Celsius in onze kleioven.
                </p>
                <p>
                  Dat is het verschil tussen een cateringbedrijf dat Indiaas kookt en een Indiaas restaurant dat cateert.
                </p>
              </>
            ) : (
              <>
                <p>
                  Most catering companies prepare food in a central production kitchen, load it into vans, and reheat it at your venue. The meal your guests eat has been cooked hours earlier, packed into containers, and warmed up on site. You can taste the difference. Your guests can too.
                </p>
                <p>
                  At Chopras Indian Restaurant, the food at your event is prepared with the same methods as our restaurant kitchen. Whole spices sourced directly from India, ground fresh on the day.{' '}
                  <Link href={`${base}/butter-chicken-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                    Butter chicken
                  </Link>{' '}
                  made from the same recipe that guests have rated 4.9 stars on Google.{' '}
                  <Link href={`${base}/tandoori-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                    Tandoori dishes
                  </Link>{' '}
                  cooked at the temperature they were designed for: 400 degrees Celsius in our clay oven.
                </p>
                <p>
                  That is the difference between a catering company that does Indian food and an Indian restaurant that does catering.
                </p>
              </>
            )}
          </div>
          <a
            href="#catering-form"
            className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#C7A348] bg-[rgba(199,163,72,0.1)] px-6 py-3 text-[#C7A348] text-sm font-medium uppercase tracking-wide transition-all duration-200 ease-out hover:bg-[#C7A348] hover:text-white active:scale-[0.98] min-h-[48px]"
          >
            {isNl ? 'Offerte Aanvragen' : 'Request a Catering Quote'}
          </a>
        </div>
      </section>

      {/* PRIVATE HALL — bg-white */}
      <section className="bg-white py-20 md:py-28 px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="aspect-[4/3] relative rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/images/catering/party-decor.png"
                alt={isNl
                  ? 'Privé evenementenruimte bij Chopras Indian Restaurant Den Haag'
                  : 'Private event hall at Chopras Indian Restaurant Den Haag'}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-[#D4AF37] font-medium mb-4">
                {isNl ? 'ONZE EVENEMENTENRUIMTE' : 'OUR EVENT HALL'}
              </p>
              <h2 className="font-vibes text-4xl md:text-5xl text-[#C7A348] mb-6">
                {isNl ? 'Privé Evenementenruimte in Den Haag' : 'Private Event Hall in Den Haag'}
              </h2>
              <div className="space-y-4 text-[#1A1A1A] text-base leading-relaxed">
                <p>{tr.catering.hallP1}</p>
                <p>{tr.catering.hallP2}</p>
                <p>{tr.catering.hallP3}</p>
              </div>
              <div className="flex gap-8 mt-8 mb-8">
                {capacityStats.map(({ number, label }) => (
                  <div key={label} className="text-center">
                    <p className="font-vibes text-4xl text-[#D4AF37]">{number}</p>
                    <p className="text-[#1A1A1A]/60 text-sm mt-1">{label}</p>
                  </div>
                ))}
              </div>
              <Link
                href={`${base}/contact`}
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#C7A348] bg-[rgba(199,163,72,0.1)] px-6 py-3 text-[#C7A348] text-sm font-medium uppercase tracking-wide transition-all duration-200 ease-out hover:bg-[#C7A348] hover:text-white active:scale-[0.98] min-h-[48px]"
              >
                {tr.catering.bookHall}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOPRAS — dark navy */}
      <section
        className="py-20 md:py-28 px-6 md:px-16"
        style={{ background: 'linear-gradient(135deg, #000066 0%, #0000FF 100%)' }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-widest text-[#D4AF37] font-medium mb-4">
              {isNl ? 'WAAROM CHOPRAS' : 'WHY CHOOSE US'}
            </p>
            <h2 className="font-vibes text-4xl md:text-5xl text-white">
              {tr.catering.whyH2}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {whyCards.map(({ Icon, title, body }) => (
              <div
                key={title}
                className="bg-white/10 border border-white/20 rounded-3xl p-8"
              >
                <Icon className="text-[#D4AF37] w-8 h-8 mb-4" />
                <h3 className="font-vibes text-xl text-white mb-3">{title}</h3>
                <p className="text-white/70 text-base leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT IS INCLUDED — bg-[#F7F8FC] */}
      <section className="bg-[#F7F8FC] py-20 md:py-28 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-[#D4AF37] font-medium mb-4">
            {isNl ? 'WAT IS INBEGREPEN' : 'WHAT IS INCLUDED'}
          </p>
          <h2 className="font-vibes text-4xl md:text-5xl text-[#C7A348] mb-6 leading-[1.4]">
            {isNl
              ? 'Alles Geregeld in Één Boeking'
              : 'Everything Handled in One Booking'}
          </h2>
          <div className="space-y-4 text-[#1A1A1A] text-base md:text-lg leading-relaxed mb-8">
            {isNl ? (
              <>
                <p>
                  Chopras Indian Restaurant verzorgt catering in Den Haag en de omgeving: Rijswijk, Delft, Zoetermeer, Voorburg en Leidschendam. Of je het evenement nu organiseert in onze{' '}
                  <Link href={`${base}/feestzaal-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                    privé evenementenruimte op Leyweg 986
                  </Link>{' '}
                  of op je eigen locatie, het eten arriveert warm, netjes gepresenteerd en op tijd.
                </p>
                <p>
                  Elke boeking is inclusief professioneel personeel voor opbouw, bediening en opruiming. Jij coördineert geen aparte leveranciers. Jij brieft geen meerdere partijen. Een team regelt alles zodat jij je kunt richten op je gasten.
                </p>
                <p>
                  Dezelfde{' '}
                  <Link href={`${base}/halal-menu`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                    halal-certificering
                  </Link>{' '}
                  die ons restaurantmenu dekt, dekt elk cateringevenement. Elk vleesgerecht, elke leverancier, altijd. Bekijk ook onze{' '}
                  <Link href={`${base}/indian-buffet-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                    Indiase buffetopties
                  </Link>{' '}
                  voor grotere groepen.
                </p>
              </>
            ) : (
              <>
                <p>
                  Chopras Indian Restaurant caters across Den Haag and the surrounding area: Rijswijk, Delft, Zoetermeer, Voorburg, and Leidschendam. Whether you host the event in our{' '}
                  <Link href={`${base}/feestzaal-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                    private hall at Leyweg 986
                  </Link>{' '}
                  or at your own venue, the food arrives hot, properly presented, and on time.
                </p>
                <p>
                  Every booking includes professional staff for setup, service, and clearing. You do not coordinate separate vendors. You do not brief multiple suppliers. One team handles everything so you can focus on your guests.
                </p>
                <p>
                  The same{' '}
                  <Link href={`${base}/halal-menu`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                    halal certification
                  </Link>{' '}
                  that covers our restaurant menu covers every catering event. Every meat dish, every supplier, every time. See our{' '}
                  <Link href={`${base}/indian-buffet-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                    Indian buffet options
                  </Link>{' '}
                  for larger groups.
                </p>
              </>
            )}
          </div>
          <a
            href="#catering-form"
            className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#C7A348] bg-[rgba(199,163,72,0.1)] px-6 py-3 text-[#C7A348] text-sm font-medium uppercase tracking-wide transition-all duration-200 ease-out hover:bg-[#C7A348] hover:text-white active:scale-[0.98] min-h-[48px]"
          >
            {isNl ? 'Offerte Aanvragen' : 'Request a Catering Quote'}
          </a>
        </div>
      </section>

      {/* POPULAR DISHES — bg-white */}
      <section className="bg-white py-20 md:py-28 px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-[#C7A348] mb-12 text-center">
            {isNl ? 'Populaire Gerechten voor Catering' : 'Popular Dishes for Catering'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <Link
              href={`${base}/butter-chicken-den-haag`}
              className="block p-6 bg-[#F7F8FC] rounded-lg border border-gray-200 hover:border-[#D4AF37] hover:shadow-lg transition-all"
            >
              <p className="text-[#D4AF37] text-sm font-semibold uppercase tracking-widest mb-2">
                {isNl ? 'Kip Curry' : 'Chicken Curry'}
              </p>
              <p className="text-[#1B2B5E] font-semibold">Butter chicken Den Haag</p>
            </Link>
            <Link
              href={`${base}/mutton-rogan-josh-den-haag`}
              className="block p-6 bg-[#F7F8FC] rounded-lg border border-gray-200 hover:border-[#D4AF37] hover:shadow-lg transition-all"
            >
              <p className="text-[#D4AF37] text-sm font-semibold uppercase tracking-widest mb-2">
                {isNl ? 'Lams Curry' : 'Lamb Curry'}
              </p>
              <p className="text-[#1B2B5E] font-semibold">Mutton rogan josh Den Haag</p>
            </Link>
            <Link
              href={`${base}/biryani-den-haag`}
              className="block p-6 bg-[#F7F8FC] rounded-lg border border-gray-200 hover:border-[#D4AF37] hover:shadow-lg transition-all"
            >
              <p className="text-[#D4AF37] text-sm font-semibold uppercase tracking-widest mb-2">Biryani</p>
              <p className="text-[#1B2B5E] font-semibold">
                {isNl ? 'Authentieke biryani Den Haag' : 'Authentic biryani Den Haag'}
              </p>
            </Link>
          </div>
          <div className="text-center">
            <Link
              href={`${base}/menu`}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#C7A348] bg-[rgba(199,163,72,0.1)] px-6 py-3 text-[#C7A348] text-sm font-medium uppercase tracking-wide transition-all duration-200 ease-out hover:bg-[#C7A348] hover:text-white active:scale-[0.98] min-h-[48px]"
            >
              {isNl ? 'Bekijk het Volledige Menu' : 'View the Full Menu'}
            </Link>
          </div>
        </div>
      </section>

      {/* CATERING OCCASIONS — bg-[#F7F8FC] */}
      <section className="bg-[#F7F8FC] py-20 md:py-28 px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-[#C7A348] mb-12 text-center">
            {isNl ? 'Catering voor Elke Gelegenheid' : 'Catering Options for Every Occasion'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <Link
              href={`${base}/indian-wedding-catering-den-haag`}
              className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-[#D4AF37] hover:shadow-lg transition-all"
            >
              <p className="text-[#D4AF37] text-sm font-semibold uppercase tracking-widest mb-2">
                {isNl ? 'Bruiloften' : 'Weddings'}
              </p>
              <p className="text-[#1B2B5E] font-semibold text-lg">
                {isNl ? 'Indiaas bruiloftscatering Den Haag' : 'Indian wedding catering Den Haag'}
              </p>
            </Link>
            <Link
              href={`${base}/indian-birthday-catering-den-haag`}
              className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-[#D4AF37] hover:shadow-lg transition-all"
            >
              <p className="text-[#D4AF37] text-sm font-semibold uppercase tracking-widest mb-2">
                {isNl ? 'Verjaardagen' : 'Birthdays'}
              </p>
              <p className="text-[#1B2B5E] font-semibold text-lg">
                {isNl ? 'Verjaardagscatering Den Haag' : 'Birthday catering Den Haag'}
              </p>
            </Link>
            <Link
              href={`${base}/corporate-events-den-haag`}
              className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-[#D4AF37] hover:shadow-lg transition-all"
            >
              <p className="text-[#D4AF37] text-sm font-semibold uppercase tracking-widest mb-2">
                {isNl ? 'Zakelijk' : 'Corporate'}
              </p>
              <p className="text-[#1B2B5E] font-semibold text-lg">
                {isNl ? 'Zakelijke catering Den Haag' : 'Corporate events catering Den Haag'}
              </p>
            </Link>
            <Link
              href={`${base}/diwali-dinner-den-haag`}
              className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-[#D4AF37] hover:shadow-lg transition-all"
            >
              <p className="text-[#D4AF37] text-sm font-semibold uppercase tracking-widest mb-2">
                {isNl ? 'Vieringen' : 'Celebrations'}
              </p>
              <p className="text-[#1B2B5E] font-semibold text-lg">
                {isNl ? 'Diwali diner catering Den Haag' : 'Diwali dinner catering Den Haag'}
              </p>
            </Link>
            <Link
              href={`${base}/bruiloft-catering-den-haag`}
              className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-[#D4AF37] hover:shadow-lg transition-all"
            >
              <p className="text-[#D4AF37] text-sm font-semibold uppercase tracking-widest mb-2">Bruiloft</p>
              <p className="text-[#1B2B5E] font-semibold text-lg">Bruiloft catering Den Haag</p>
            </Link>
            <Link
              href={`${base}/zaal-huren-den-haag`}
              className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-[#D4AF37] hover:shadow-lg transition-all"
            >
              <p className="text-[#D4AF37] text-sm font-semibold uppercase tracking-widest mb-2">
                {isNl ? 'Zaal Huren' : 'Venue'}
              </p>
              <p className="text-[#1B2B5E] font-semibold text-lg">
                {isNl ? 'Zaal huren Den Haag' : 'Zaal huren Den Haag'}
              </p>
            </Link>
          </div>
          <div className="text-center max-w-2xl mx-auto">
            {isNl ? (
              <p className="text-[#1A1A1A] text-base">
                Wil je een feestzaal huren in Den Haag met catering inbegrepen?{' '}
                <Link href={`${base}/feestzaal-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                  Bekijk onze feestzaal
                </Link>{' '}
                voor de perfecte setting, of bezoek{' '}
                <Link href={base || '/'} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                  Chopras Indian Restaurant Den Haag
                </Link>{' '}
                om ons restaurant te zien.
              </p>
            ) : (
              <p className="text-[#1A1A1A] text-base">
                Do you want to hire a party venue in Den Haag with catering included?{' '}
                <Link href={`${base}/feestzaal-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                  View our event space
                </Link>{' '}
                for the perfect setting, or visit{' '}
                <Link href={base || '/'} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                  Chopras Indian Restaurant Den Haag
                </Link>{' '}
                to see our restaurant.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* GEO BLOCK — bg-white */}
      <section className="bg-white py-20 md:py-28 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-[#C7A348] mb-6 leading-[1.3]">
            {isNl
              ? 'Verzorgt Chopras Indian Restaurant Catering in Den Haag?'
              : 'Does Chopras Indian Restaurant Do Catering in Den Haag?'}
          </h2>
          {isNl ? (
            <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed mb-8">
              Ja. Chopras Indian Restaurant verzorgt volledige Indiase catering in Den Haag en omgeving, waaronder Rijswijk, Delft, Zoetermeer, Voorburg en Leidschendam. Vanuit Leyweg 986, Den Haag, verzorgen wij{' '}
              <Link href={`${base}/bruiloft-catering-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">bruiloften</Link>
              , nikah-recepties,{' '}
              <Link href={`${base}/indian-birthday-catering-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">verjaardagsfeesten</Link>
              ,{' '}
              <Link href={`${base}/corporate-events-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">zakelijke diners</Link>{' '}
              en{' '}
              <Link href={`${base}/diwali-dinner-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">Diwali-vieringen</Link>
              . Alle gerechten worden vers bereid door hetzelfde keukenteam als het restaurant, met specerijen die dagelijks vers worden gemalen. Elk vleesgerecht is standaard{' '}
              <Link href={`${base}/halal-food-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">halal gecertificeerd</Link>
              . De eigen evenementenruimte biedt ruimte aan{' '}
              <Link href={`${base}/feestzaal-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">25 tot 80 gasten</Link>
              . Open dinsdag tot en met zondag, 16:30 tot 22:30.
            </p>
          ) : (
            <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed mb-8">
              Yes. Chopras Indian Restaurant provides full Indian catering in Den Haag and surrounding areas, including Rijswijk, Delft, Zoetermeer, Voorburg, and Leidschendam. Based at Leyweg 986, Den Haag, Chopras caters{' '}
              <Link href={`${base}/indian-wedding-catering-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">weddings</Link>
              , nikah receptions,{' '}
              <Link href={`${base}/indian-birthday-catering-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">birthday parties</Link>
              ,{' '}
              <Link href={`${base}/corporate-events-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">corporate dinners</Link>
              , and{' '}
              <Link href={`${base}/diwali-dinner-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">Diwali celebrations</Link>
              . All food is prepared fresh by the same kitchen team as the restaurant, using spices ground daily in-house. Every meat dish is{' '}
              <Link href={`${base}/halal-food-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">halal certified</Link>{' '}
              as standard. The private event hall accommodates{' '}
              <Link href={`${base}/feestzaal-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">25 to 80 guests</Link>
              . Open Tuesday to Sunday, 16:30 to 22:30.
            </p>
          )}
          <a
            href="#catering-form"
            className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#C7A348] bg-[rgba(199,163,72,0.1)] px-6 py-3 text-[#C7A348] text-sm font-medium uppercase tracking-wide transition-all duration-200 ease-out hover:bg-[#C7A348] hover:text-white active:scale-[0.98] min-h-[48px]"
          >
            {isNl ? 'Offerte Aanvragen' : 'Request a Catering Quote'}
          </a>
        </div>
      </section>

      {/* FAQ — bg-[#F7F8FC] */}
      <section className="bg-[#F7F8FC] py-20 md:py-28 px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-widest text-[#D4AF37] font-medium mb-4">FAQ</p>
            <h2 className="font-vibes text-4xl md:text-5xl text-[#C7A348]">
              {tr.catering.faqH2}
            </h2>
          </div>
          <FaqAccordion faqs={isNl ? cateringPageFaqsNl : cateringPageFaqs} locale={locale} />
        </div>
      </section>

      {/* CATERING FORM — dark navy */}
      <section
        id="catering-form"
        className="py-20 md:py-28 px-6 md:px-16"
        style={{ background: 'linear-gradient(135deg, #000066 0%, #0000FF 100%)' }}
      >
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-xs uppercase tracking-widest text-[#D4AF37] font-medium mb-4">
            {isNl ? 'OFFERTE AANVRAGEN' : 'GET A QUOTE'}
          </p>
          <h2 className="font-vibes text-4xl md:text-5xl text-white mb-3">
            {tr.catering.formH2}
          </h2>
          <p className="text-white/60 text-base md:text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
            {tr.catering.formSub}
          </p>
          <CateringForm />
        </div>
      </section>
    </>
  )
}
