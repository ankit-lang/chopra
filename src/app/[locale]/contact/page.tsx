import type { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, Phone, Clock, Bus } from 'lucide-react'
import JsonLd from '@/components/seo/JsonLd'
import FaqAccordion from '@/components/sections/FaqAccordion'
import { RESTAURANT } from '@/lib/constants'
import { getLocalizedUrl } from '@/lib/utils'
import { getRestaurantSchema, getBreadcrumbSchema, getContactPageSchema, getFaqPageSchema } from '@/lib/schema'
import ContactForm from '@/components/contact/ContactForm'
import TrustBar from '@/components/sections/TrustBar'
import ReservationForm from '@/components/contact/ReservationForm'
import { getTranslations, type Locale } from '@/lib/useTranslations'
import EmailLink from '@/components/ui/EmailLink'

type Props = { params: { locale: Locale } }

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'nl' }]
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params
  const titles = {
    en: 'Contact Chopras Indian Restaurant Den Haag | Reservations and Enquiries',
    nl: 'Contact Chopras Indiaas Restaurant Den Haag | Reserveringen',
  }
  const descriptions = {
    en: 'Contact Chopras Indian Restaurant Den Haag. Leyweg 986, open Tuesday to Sunday. Reserve a table, call us or send a message. Tram line 2 stops at the door.',
    nl: 'Neem contact op met Chopras Indiaas Restaurant in Den Haag. Bel, mail of gebruik ons formulier voor tafelreserveringen, cateringaanvragen en evenementboekingen.',
  }
  return {
    title: titles[locale],
    description: descriptions[locale],
    alternates: {
      canonical: getLocalizedUrl(locale, 'contact'),
      languages: {
        en: getLocalizedUrl('en', 'contact'),
        nl: getLocalizedUrl('nl', 'contact'),
        'x-default': getLocalizedUrl('en', 'contact'),
      },
    },
    openGraph: {
      title: titles[locale],
      description: descriptions[locale],
      url: getLocalizedUrl(locale, 'contact'),
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

const faqsEn = [
  {
    question: 'How do I reserve a table at Chopras Indian Restaurant Den Haag?',
    answer: 'Use the reservation form at the top of this page, call +31 6 30645930 directly, or email info [at] chopras.nl. For groups of four or more, a reservation is recommended. For eight or more guests, call the team so the right table configuration can be arranged. Chopras Indian Restaurant at Leyweg 986 Den Haag is open Tuesday to Sunday from 16:30 to 22:30.',
  },
  {
    question: 'Where is Chopras Indian Restaurant located in Den Haag?',
    answer: 'Chopras Indian Restaurant is at Leyweg 986, 2545 GW Den Haag, in the Leyenburg neighbourhood. Paid parking is available in the Leyweg area. By public transport, tram line 2 and several bus routes stop near the Leyweg stop, a short walk from the restaurant. The nearest major green space is the Zuiderpark, five minutes away on foot.',
  },
  {
    question: 'What are the opening hours of Chopras Indian Restaurant Den Haag?',
    answer: 'Chopras Indian Restaurant Den Haag is open Tuesday to Sunday from 16:30 to 22:30. The restaurant is closed on Monday, every Monday without exception. The kitchen opens at 16:30 only and last orders are taken at 22:00.',
  },
  {
    question: 'How do I get to Chopras Indian Restaurant from Den Haag Centraal?',
    answer: 'From Den Haag Centraal, take tram line 2 towards Leyenburg and exit at the Leyweg stop. The journey takes approximately 15 minutes. By car from the city centre, follow the Rijswijkseweg south and turn onto Leyweg. Paid parking is available in the Leyweg area.',
  },
  {
    question: 'Can I book Chopras Indian Restaurant for a private event or catering in Den Haag?',
    answer: 'Yes. Chopras Indian Restaurant offers a private event space at Leyweg 986 Den Haag for between 25 and 80 guests, with full Indian catering included. The team handles weddings, birthday celebrations, and corporate dinners. Send an enquiry via the contact form on this page or call +31 6 30645930 to discuss your requirements.',
  },
]

const faqsNl = [
  {
    question: 'Hoe reserveer ik een tafel bij Chopras Indian Restaurant in Den Haag?',
    answer: 'Gebruik het reserveringsformulier bovenaan deze pagina, bel +31 6 30645930 of stuur een e-mail naar info [at] chopras.nl. Voor groepen van vier of meer personen wordt een reservering aanbevolen. Voor acht of meer gasten belt u het team zodat de juiste tafelopstelling kan worden geregeld. Chopras Indian Restaurant op Leyweg 986 in Den Haag is open van dinsdag tot en met zondag van 16:30 tot 22:30.',
  },
  {
    question: 'Waar is Chopras Indian Restaurant gevestigd in Den Haag?',
    answer: 'Chopras Indian Restaurant is gevestigd op Leyweg 986, 2545 GW Den Haag, in de wijk Leyenburg. Betaald parkeren is beschikbaar in de omgeving van Leyweg. Met het openbaar vervoer stoppen tramlijn 2 en meerdere buslijnen bij of nabij de halte Leyweg, op loopafstand van het restaurant.',
  },
  {
    question: 'Wat zijn de openingstijden van Chopras Indian Restaurant Den Haag?',
    answer: 'Chopras Indian Restaurant Den Haag is open van dinsdag tot en met zondag van 16:30 tot 22:30. Het restaurant is gesloten op maandag, elke maandag zonder uitzondering. De keuken opent om 16:30 en de laatste bestelling wordt opgenomen om 22:00.',
  },
  {
    question: 'Hoe kom ik van Den Haag Centraal naar Chopras Indian Restaurant?',
    answer: 'Neem vanaf Den Haag Centraal tramlijn 2 richting Leyenburg en stap uit bij de halte Leyweg. De rit duurt ongeveer 15 minuten. Met de auto vanuit het centrum volgt u de Rijswijkseweg naar het zuiden en slaat u de Leyweg in. Betaald parkeren is beschikbaar in de omgeving van Leyweg.',
  },
  {
    question: 'Kan ik Chopras Indian Restaurant boeken voor een privé-evenement of catering in Den Haag?',
    answer: 'Ja. Chopras Indian Restaurant biedt een evenementenruimte op Leyweg 986 in Den Haag voor 25 tot 80 gasten, inclusief volledig Indiaas catering. Het team verzorgt bruiloften, verjaardagsfeesten en bedrijfsdiners. Stuur een aanvraag via het contactformulier op deze pagina of bel +31 6 30645930 om uw wensen te bespreken.',
  },
]

export default function LocaleContactPage({ params }: Props) {
  const { locale } = params
  const tr = getTranslations(locale)
  const isNl = locale === 'nl'
  const base = locale === 'nl' ? '/nl' : ''
  const restaurantSchema = getRestaurantSchema(locale)

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: tr.common.nav.home, item: getLocalizedUrl(locale) },
    { name: tr.common.nav.contact, item: getLocalizedUrl(locale, 'contact') },
  ])

  return (
    <>
      <JsonLd data={restaurantSchema} />
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={getContactPageSchema(locale)} />
      <JsonLd data={getFaqPageSchema(isNl ? faqsNl : faqsEn)} />

      {/* SECTION 1  -  DUAL FORM SPLIT */}
      <section
        className="py-10 md:py-14"
        style={{ background: 'linear-gradient(135deg, #000066 0%, #0000B3 100%)' }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[80vh] items-start gap-6 lg:gap-8">

            {/* LEFT  -  Reservation Form */}
            <div className="bg-white rounded-3xl p-8 md:p-10 shadow-2xl ring-1 ring-white/10">
              <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-white/40 bg-white/10 backdrop-blur-sm mb-4">
                <span className="text-white text-xs font-medium uppercase tracking-widest">
                  • VISIT US · CHOPRAS INDIAN RESTAURANT · DEN HAAG •
                </span>
              </div>
              <h1 className="font-vibes text-3xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mt-2 mb-2 leading-[1.3]">
                {isNl ? 'Reserveer uw Tafel bij Chopras' : 'Reserve Your Table at Chopras'}
              </h1>
              <p className="text-[#1A1A1A]/60 text-sm mt-2 mb-6">
                {isNl
                  ? 'Open dinsdag t/m zondag · 16:30 tot 22:30 · Leyweg 986, Den Haag'
                  : 'Open Tuesday to Sunday · 16:30 to 22:30 · Leyweg 986, Den Haag'}
              </p>
              <ReservationForm />
            </div>

            {/* RIGHT  -  Contact Form */}
            <div className="bg-white rounded-3xl p-8 md:p-10 shadow-2xl ring-1 ring-white/10">
              <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-white/40 bg-white/10 backdrop-blur-sm mb-4">
                <span className="text-white text-xs font-medium uppercase tracking-widest">
                  • CATERING · EVENTS · GENERAL ENQUIRIES •
                </span>
              </div>
              <h2 className="font-vibes text-3xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mt-2 mb-2 leading-[1.3]">
                {isNl
                  ? 'Catering, Evenement en Algemene Vragen'
                  : 'Catering, Event and General Enquiries'}
              </h2>
              <p className="text-[#1A1A1A]/60 text-sm mt-2 mb-4">
                {isNl
                  ? 'Voor feestzaal huren, bruiloftscatering, bedrijfsdiners en alle overige vragen'
                  : 'For feestzaal hire, wedding catering, corporate dinners and all other enquiries'}
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                <Link
                  href={`${base}/feestzaal-den-haag`}
                  className="border border-white/40 rounded-full px-3 py-1 text-xs text-white hover:bg-[#0000B3]/10 transition-colors"
                >
                  Feestzaal huren
                </Link>
                <Link
                  href={`${base}/catering`}
                  className="border border-white/40 rounded-full px-3 py-1 text-xs text-white hover:bg-[#0000B3]/10 transition-colors"
                >
                  Catering
                </Link>
                <Link
                  href={`${base}/corporate-events-den-haag`}
                  className="border border-white/40 rounded-full px-3 py-1 text-xs text-white hover:bg-[#0000B3]/10 transition-colors"
                >
                  {isNl ? 'Zakelijke Evenementen' : 'Corporate Events'}
                </Link>
              </div>
              <ContactForm />
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 2  -  COMPACT INFO STRIP */}
      <section className="bg-[#1B2B5E] py-10 px-6 md:px-16">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="flex items-start gap-3">
              <MapPin className="text-white w-5 h-5 mt-0.5 flex-shrink-0" />
              <p className="text-white text-sm leading-relaxed">Leyweg 986, 2545 GW Den Haag</p>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="text-white w-5 h-5 mt-0.5 flex-shrink-0" />
              <a
                href={`tel:${RESTAURANT.contact.phone}`}
                className="text-white text-sm leading-relaxed hover:text-white transition-colors"
              >
                {RESTAURANT.contact.phoneDisplay}
              </a>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="text-white w-5 h-5 mt-0.5 flex-shrink-0" />
              <p className="text-white text-sm leading-relaxed">
                {isNl ? (
                  <>Dinsdag t/m Zondag 16:30 tot 22:30<br />Maandag gesloten</>
                ) : (
                  <>Tuesday to Sunday 16:30 to 22:30<br />Monday closed</>
                )}
              </p>
            </div>
            <div className="flex items-start gap-3">
              <Bus className="text-white w-5 h-5 mt-0.5 flex-shrink-0" />
              <p className="text-white text-sm leading-relaxed">
                {isNl ? 'Tramlijn 2, halte Leyweg' : 'Tram line 2, Leyweg stop'}
              </p>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2457.8!2d4.2742654!3d52.0487367!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c5b12ba9dd450d%3A0xf932c69c8e71a16b!2sChopras%20Indian%20Restaurant%20Den%20Haag!5e0!3m2!1sen!2snl!4v1744000000000!5m2!1sen!2snl"
              width="100%"
              height="260"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-2xl"
              title="Chopras Indian Restaurant Den Haag location"
            />
          </div>
        </div>
      </section>

      {/* SECTION 3  -  PLAN YOUR VISIT PROSE */}
      <section className="bg-[#FFFAF5] py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-6 leading-[1.3]">
            {isNl
              ? 'Uw Bezoek aan Chopras Indian Restaurant Plannen'
              : 'Plan Your Visit to Chopras Indian Restaurant Den Haag'}
          </h2>
          {isNl ? (
            <>
              <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed mb-4">
                Chopras Indian Restaurant bevindt zich op Leyweg 986, 2545 GW Den Haag, in de wijk Leyenburg. Betaald parkeren is beschikbaar in de omgeving van Leyweg. Tramlijn 2 en meerdere buslijnen stoppen bij de halte Leyweg op loopafstand van de ingang. Open van dinsdag tot en met zondag van 16:30 tot 22:30, maandag gesloten.
              </p>
              <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed mb-4">
                Vanuit Den Haag Centraal duurt de tramrit naar Leyweg ongeveer 15 minuten. Vanuit{' '}
                <Link href={`${base}/indian-restaurant-rijswijk`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">
                  Rijswijk
                </Link>{' '}
                is het restaurant vijf minuten rijden. Gasten die komen uit{' '}
                <Link href={`${base}/indian-restaurant-delft`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">
                  Delft
                </Link>{' '}
                bereiken Chopras Indian Restaurant via de A13 in circa 15 minuten. Tramlijn 2 stopt bij halte Leyweg, op loopafstand van het restaurant.
              </p>
              <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                Voor groepen van vier of meer wordt een reservering aanbevolen, met name op vrijdag- en zaterdagavond. Gebruik het reserveringsformulier bovenaan deze pagina of bel +31 6 30645930. Voor{' '}
                <Link href={`${base}/catering`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">
                  Indiaas catering in Den Haag
                </Link>{' '}
                of om de{' '}
                <Link href={`${base}/feestzaal-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">
                  feestzaal te huren in Den Haag
                </Link>
                , neemt u contact op via het formulier hieronder.
              </p>
            </>
          ) : (
            <>
              <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed mb-4">
                Chopras Indian Restaurant is at Leyweg 986, 2545 GW Den Haag, in the Leyenburg neighbourhood. Paid parking is available in the Leyweg area. Tram line 2 and several bus routes stop at the Leyweg stop, a short walk from the restaurant entrance. Open Tuesday to Sunday from 16:30 to 22:30, closed on Monday.
              </p>
              <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed mb-4">
                From Den Haag Centraal the tram journey to Leyweg takes around 15 minutes. From{' '}
                <Link href={`${base}/indian-restaurant-rijswijk`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">
                  Rijswijk
                </Link>{' '}
                the restaurant is five minutes by car. Guests coming from{' '}
                <Link href={`${base}/indian-restaurant-delft`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">
                  Delft
                </Link>{' '}
                reach Chopras Indian Restaurant via the A13 in around 15 minutes. Tram line 2 stops at Leyweg, a short walk from the entrance.
              </p>
              <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                For groups of four or more, a reservation is recommended, particularly on Friday and Saturday evenings. Use the reservation form at the top of this page or call +31 6 30645930. For{' '}
                <Link href={`${base}/catering`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">
                  Indian catering in Den Haag
                </Link>{' '}
                or to{' '}
                <Link href={`${base}/feestzaal-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">
                  hire the event space in Den Haag
                </Link>
                , use the contact form below.
              </p>
            </>
          )}
        </div>
      </section>

      {/* SECTION 4  -  GEO BLOCK */}
      <section className="bg-[#FFFAF5] py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-6 leading-[1.3]">
            {isNl
              ? 'Hoe neem ik contact op of reserveer ik bij Chopras Indian Restaurant Den Haag?'
              : 'How do I contact or reserve at Chopras Indian Restaurant Den Haag?'}
          </h2>
          {isNl ? (
            <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
              Chopras Indian Restaurant is bereikbaar via{' '}
              <Link href={`tel:${RESTAURANT.contact.phone}`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">
                +31 6 30645930
              </Link>{' '}
              of <EmailLink />. Het restaurant is gevestigd op Leyweg 986, 2545 GW Den Haag. Reserveringen zijn mogelijk via het formulier bovenaan deze pagina. Open van dinsdag tot en met zondag van 16:30 tot 22:30. Betaald parkeren beschikbaar in de omgeving van Leyweg. Beoordeeld met 4,9 sterren van meer dan 800 gasten op Google. Voor{' '}
              <Link href={`${base}/catering`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">
                Indiaas catering of privé-evenementen in Den Haag
              </Link>
              , gebruik het contactformulier hierboven.
            </p>
          ) : (
            <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
              Chopras Indian Restaurant is reachable at{' '}
              <Link href={`tel:${RESTAURANT.contact.phone}`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">
                +31 6 30645930
              </Link>{' '}
              or <EmailLink />. The restaurant is at Leyweg 986, 2545 GW Den Haag. Reservations can be made using the form at the top of this page. Open Tuesday to Sunday from 16:30 to 22:30. Paid parking is available in the Leyweg area. Rated 4.9 stars from over 800 verified guests on Google. For{' '}
              <Link href={`${base}/catering`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">
                Indian catering or private events in Den Haag
              </Link>
              , use the contact form above.
            </p>
          )}
        </div>
      </section>

      {/* SECTION 5  -  FAQ */}
      <section className="bg-[#F7F8FC] py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-6 leading-[1.3]">
            {isNl
              ? 'Veelgestelde vragen over Chopras Indian Restaurant Den Haag'
              : 'Frequently asked questions about Chopras Indian Restaurant Den Haag'}
          </h2>
          <FaqAccordion faqs={isNl ? faqsNl : faqsEn} locale={locale} />
        </div>
      </section>

      {/* TRUST BAR */}
      <TrustBar locale={locale} />
    </>
  )
}
