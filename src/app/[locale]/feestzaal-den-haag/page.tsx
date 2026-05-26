import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { CheckCircle } from 'lucide-react'
import JsonLd from '@/components/seo/JsonLd'
import FaqAccordion from '@/components/sections/FaqAccordion'
import { getLocalizedUrl } from '@/lib/utils'
import { getBreadcrumbSchema, getFaqPageSchema, getCateringServiceSchema } from '@/lib/schema'
import { getTranslations, type Locale } from '@/lib/useTranslations'

type Props = { params: { locale: Locale } }

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'nl' }]
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params
  const titles = {
    en: 'Feestzaal Huren Den Haag | Chopras Indian Restaurant',
    nl: 'Feestzaal Huren Den Haag | Chopras Indian Restaurant',
  }
  const descriptions = {
    en: 'Feestzaal huren Den Haag bij Chopras Indian Restaurant. Verjaardagen, bruiloften en bedrijfsfeesten. Indiaas catering inbegrepen. Offerte aanvragen.',
    nl: 'Feestzaal huren Den Haag bij Chopras Indian Restaurant. Verjaardagen, bruiloften en bedrijfsfeesten. Indiaas catering inbegrepen. Offerte aanvragen.',
  }
  return {
    title: titles[locale],
    description: descriptions[locale],
    alternates: {
      canonical: getLocalizedUrl(locale, 'feestzaal-den-haag'),
      languages: {
        en: getLocalizedUrl('en', 'feestzaal-den-haag'),
        nl: getLocalizedUrl('nl', 'feestzaal-den-haag'),
        'x-default': getLocalizedUrl('en', 'feestzaal-den-haag'),
      },
    },
    openGraph: {
      title: titles[locale],
      description: descriptions[locale],
      url: getLocalizedUrl(locale, 'feestzaal-den-haag'),
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
    question: 'Can I hire a party hall at Chopras Indian Restaurant in Den Haag?',
    answer: 'Yes. Chopras Indian Restaurant offers a private event hall for hire at Leyweg 986 in Den Haag, accommodating 25 to 80 guests. The hall is available for birthdays, weddings, nikah receptions, corporate events, Diwali dinners, and private parties. Full authentic Indian catering from the Chopras kitchen is included. Contact us for a free no-obligation quote.',
  },
  {
    question: 'Is catering included when hiring the feestzaal?',
    answer: 'Yes. Full authentic Indian catering from the Chopras kitchen is included with your feestzaal hire. The menu is customized to your occasion, with buffet or plated dinner service available. Everything is prepared fresh on the day of your event by the same team that earns 4.9 stars on Google from 800+ reviews. No outside caterer and no reheated trays.',
  },
  {
    question: 'What occasions is the feestzaal suitable for?',
    answer: 'The private hall at Chopras Indian Restaurant Den Haag is suitable for birthday parties, weddings, nikah receptions, corporate events, team dinners, staff parties, Diwali celebrations, Eid gatherings, baby showers, and drinks receptions. Every occasion gets a fully customized menu built in consultation with the Chopras team.',
  },
  {
    question: 'How many guests does the event hall at Chopras accommodate?',
    answer: 'The private event hall at Chopras Indian Restaurant Den Haag accommodates between 25 and 80 guests. This covers intimate family dinners and large wedding or corporate receptions. Contact us with your guest count and we confirm availability and the best room setup for your event.',
  },
  {
    question: 'How do I book the feestzaal at Chopras Indian Restaurant Den Haag?',
    answer: 'Contact us via the contact page or call +31 6 30645930. Tell us your date, guest count, and occasion type. We discuss menu options and send a free quote within 24 hours. For groups of 25 to 40 guests, contact us at least 2 to 3 weeks ahead. For larger events of 50 to 80 guests, plan 6 to 8 weeks in advance.',
  },
  {
    question: 'Is the food at Chopras Indian Restaurant fully halal certified?',
    answer: 'Yes. Every dish at Chopras Indian Restaurant is fully halal certified. Every meat supplier holds halal certification. There is no non-halal meat anywhere on the premises, which means no cross-contamination risk. Muslim families planning a nikah reception, Eid celebration, or any halal event can book with complete confidence.',
  },
]

const faqsNl: Array<{ question: string; answer: string }> = [
  {
    question: 'Kan ik een feestzaal huren bij Chopras Indian Restaurant in Den Haag?',
    answer: 'Ja. Chopras Indian Restaurant biedt een privé feestzaal te huur op Leyweg 986 in Den Haag voor 25 tot 80 gasten. De zaal is beschikbaar voor verjaardagen, bruiloften, nikah-recepties, bedrijfsfeesten, Diwali-diners en privéfeesten. Authentiek Indiaas catering vanuit de Chopras-keuken is inbegrepen. Neem contact op voor een vrijblijvende offerte.',
  },
  {
    question: 'Is er catering inbegrepen bij het huren van de feestzaal?',
    answer: 'Ja. Volledig authentiek Indiaas catering uit de Chopras-keuken is inbegrepen bij uw feestzaal huur. Het menu wordt op maat gemaakt voor uw gelegenheid, met buffet- of bordbediening naar keuze. Alles wordt op de dag zelf vers bereid door hetzelfde team dat 4,9 sterren scoort op Google van 800+ beoordelaars. Geen externe cateraar en geen opgewarmde bakken.',
  },
  {
    question: 'Voor welke gelegenheden is de feestzaal geschikt?',
    answer: 'De privé feestzaal van Chopras Indian Restaurant Den Haag is geschikt voor verjaardagsfeesten, bruiloften, nikah-recepties, bedrijfsfeesten, teamdiners, personeelsfeesten, Diwali-vieringen, Eid-bijeenkomsten, babyshowers en borrels. Elke gelegenheid krijgt een volledig op maat gemaakt menu, samengesteld in overleg met het Chopras-team.',
  },
  {
    question: 'Hoeveel personen passen er in de feestzaal van Chopras Indian Restaurant?',
    answer: 'De privé feestzaal van Chopras Indian Restaurant Den Haag heeft een capaciteit van 25 tot 80 gasten. Dit dekt zowel intieme familiebijeenkomsten als grote bruiloften of bedrijfsrecepties. Neem contact op met uw aantal gasten en wij bevestigen de beschikbaarheid en de beste zaalopstelling voor uw evenement.',
  },
  {
    question: 'Hoe boek ik een feestzaal bij Chopras Indian Restaurant Den Haag?',
    answer: 'Neem contact op via de contactpagina of bel +31 6 30645930. Vertel ons uw datum, aantal gasten en type gelegenheid. Wij bespreken menu-opties en sturen u binnen 24 uur een vrijblijvende offerte. Voor groepen van 25 tot 40 gasten neemt u minimaal 2 tot 3 weken van tevoren contact op. Voor grotere evenementen van 50 tot 80 gasten boekt u 6 tot 8 weken vooruit.',
  },
  {
    question: 'Is het eten bij Chopras Indian Restaurant volledig halal gecertificeerd?',
    answer: 'Ja. Elk gerecht bij Chopras Indian Restaurant is volledig halal gecertificeerd. Elke vleesleverancier heeft een halal-certificering. Er is nergens in de keuken niet-halal vlees aanwezig, wat betekent dat er geen risico op kruiscontaminatie bestaat. Moslimfamilies die een nikah-receptie, Eid-viering of ander halal evenement plannen kunnen met volledig vertrouwen boeken.',
  },
]

export default function FeestzaalDenHaagPage({ params }: Props) {
  const { locale } = params
  const tr = getTranslations(locale)
  const base = locale === 'nl' ? '/nl' : ''
  const isNl = locale === 'nl'

  return (
    <>
      <JsonLd data={getCateringServiceSchema(locale)} />
      <JsonLd data={getBreadcrumbSchema([
        { name: tr.common.nav.home, item: getLocalizedUrl(locale) },
        { name: isNl ? 'Feestzaal Huren' : 'Event Venue', item: getLocalizedUrl(locale, 'feestzaal-den-haag') },
      ])} />
      <JsonLd data={getFaqPageSchema(isNl ? faqsNl : faqsEn)} />

      {/* HERO */}
      <section className="relative min-h-[75vh] md:min-h-[85vh] flex items-center justify-center bg-[#1B2B5E] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/catering/party-decor.png"
            alt="Feestzaal Den Haag at Chopras Indian Restaurant"
            fill
            className="object-cover scale-105 animate-[pulse_20s_ease-in-out_infinite_alternate]"
            sizes="100vw"
            priority
          />
        </div>
        {/* CHANGED TO BE LESS OPAQUE */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1B2B5E]/60 via-[#1B2B5E]/40 to-[#1B2B5E]/80" />
        
        {/* Decorative gold frame */}
        <div className="absolute inset-4 md:inset-8 border border-[#C7A348]/20 rounded-3xl pointer-events-none hidden md:block">
           <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-[#C7A348]/50 rounded-tl-3xl" />
           <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-[#C7A348]/50 rounded-tr-3xl" />
           <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-[#C7A348]/50 rounded-bl-3xl" />
           <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-[#C7A348]/50 rounded-br-3xl" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto py-20 mt-16">
          <div className="inline-flex items-center justify-center gap-3 px-6 py-2 rounded-full border border-[#C7A348]/40 bg-[#1B2B5E]/40 backdrop-blur-md mb-8 shadow-[0_0_20px_rgba(199,163,72,0.15)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C7A348]" />
            <span className="text-[#C7A348] text-[10px] md:text-xs font-semibold uppercase tracking-[0.2em]">
              {isNl ? 'FEESTZAAL · CHOPRAS INDIAN RESTAURANT' : 'EVENT VENUE · CHOPRAS INDIAN RESTAURANT'}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#C7A348]" />
          </div>
          <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-semibold text-white mb-6 drop-shadow-2xl tracking-tight leading-[1.1]">
            {isNl
              ? 'Feestzaal Huren in Den Haag bij Chopras Indian Restaurant'
              : 'Event Venue for Hire in Den Haag at Chopras Indian Restaurant'}
          </h1>
          <p className="text-white/80 text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto mb-10">
            {isNl
              ? 'Privé feestzaal voor 25 tot 80 gasten. Authentiek Indiaas catering inbegrepen. Dezelfde keuken die 4,9 sterren scoort op Google van 800+ beoordelaars.'
              : 'Private event hall for 25 to 80 guests. Authentic Indian catering included. The same kitchen rated 4.9 stars on Google from 800+ reviewers.'}
          </p>
          <Link
            href={`${base}/contact`}
            className="group relative inline-flex items-center justify-center gap-3 rounded-full border border-[#C7A348] bg-transparent px-8 py-4 text-white text-sm font-semibold uppercase tracking-widest transition-all duration-500 hover:border-white overflow-hidden"
          >
            <div className="absolute inset-0 bg-[#C7A348] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]" />
            <span className="relative z-10 group-hover:text-[#1B2B5E] transition-colors duration-500 delay-100">{isNl ? 'Offerte Aanvragen' : 'Request a Quote'}</span>
          </Link>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
          <span className="text-[#C7A348] text-[10px] tracking-[0.3em] uppercase opacity-60">Scroll</span>
          <div className="w-px h-16 bg-gradient-to-b from-[#C7A348] to-transparent opacity-60" />
        </div>
      </section>

      {/* INTRO */}
      <section className="relative bg-[#F7F8FC] py-24 md:py-32 px-6 md:px-16 overflow-hidden">
        <div className="absolute -left-64 top-0 w-[800px] h-[800px] bg-[#D4AF37]/[0.03] rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute -right-64 bottom-0 w-[800px] h-[800px] bg-[#1B2B5E]/[0.02] rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
            <div className="lg:col-span-5 relative order-2 lg:order-1">
              <div className="relative rounded-3xl overflow-hidden aspect-[4/5] shadow-2xl">
                 <Image src="/images/catering/party-decor.png" alt="Zaal" fill className="object-cover" />
                 <div className="absolute inset-0 border-[6px] border-white/20 rounded-3xl m-4 pointer-events-none" />
              </div>
              <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-white p-2 rounded-2xl shadow-xl hidden md:block">
                 <div className="w-full h-full border border-[#D4AF37]/20 rounded-[0.85rem] bg-[#F7F8FC] flex flex-col items-center justify-center text-center p-6">
                    <span className="text-5xl font-vibes text-[#C7A348]">25-80</span>
                    <span className="text-[10px] uppercase tracking-widest text-[#1B2B5E] mt-3 font-semibold">{isNl ? 'Gasten' : 'Guests'}</span>
                 </div>
              </div>
            </div>
            
            <div className="lg:col-span-7 order-1 lg:order-2">
              <div className="inline-flex items-center gap-4 mb-6">
                <div className="w-12 h-px bg-[#C7A348]" />
                <span className="text-[#C7A348] text-xs font-semibold uppercase tracking-widest">{isNl ? 'De Locatie' : 'The Venue'}</span>
              </div>
              {/* RESTORED HEADINGS */}
              <h2 className="font-vibes text-5xl md:text-6xl lg:text-7xl text-[#C7A348] mb-10 leading-[1.1]">
                {isNl
                  ? 'Feestzaal Huren Den Haag - Zaal en Catering Onder Een Dak'
                  : 'Feestzaal Huren Den Haag - Venue and Catering Under One Roof'}
              </h2>
              
              <div className="space-y-6 font-body text-[#1A1A1A]/70 text-lg leading-relaxed relative pl-6 border-l-2 border-[#D4AF37]/30">
                {isNl ? (
                  <>
                  <p>
                    De meeste mensen die een feestzaal zoeken in Den Haag lopen tegen hetzelfde probleem op. Ze vinden een geschikte ruimte. Dan beginnen ze aan een tweede zoektocht naar een cateraar. Ze onderhandelen twee contracten, stemmen twee planningen op elkaar af, en steken de week voor het feest door met logistiek in plaats van ernaar uit te kijken. Bij{' '}
                    <Link href={`${base}/`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">Chopras Indian Restaurant</Link>{' '}
                    op Leyweg 986 in Den Haag zijn de feestzaal en de keuken één operatie. U belt eenmaal. Alles wordt geregeld.
                  </p>
                  <p>
                    De privé feestzaal biedt ruimte voor <strong>25 tot 80 gasten</strong>. Van een intieme{' '}
                    <Link href={`${base}/indian-wedding-catering-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">nikah-receptie</Link>{' '}
                    voor de naaste familie tot een groot bedrijfsdiner voor tachtig medewerkers: het bereik dekt het allemaal. Het eten komt uit dezelfde keuken die 4,9 sterren verdient van 800+ Google-beoordelaars elke week. Uw gasten bij een privé-evenement krijgen exact dezelfde standaard. Geen aparte cateraar. Geen coördinatieproblemen.
                  </p>
                  <p>
                    Of u nu een verjaardagsfeest, een{' '}
                    <Link href={`${base}/diwali-dinner-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">Diwali-viering</Link>{' '}
                    of een{' '}
                    <Link href={`${base}/corporate-events-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">bedrijfsevenement</Link>{' '}
                    organiseert, het beginpunt is hetzelfde: vertel ons uw datum, aantal gasten en gelegenheid. Wij regelen het menu, de opstelling en de service.
                  </p>
                  </>
                ) : (
                  <>
                  <p>
                    Most people searching for a feestzaal in Den Haag run into the same problem. They find a room they like. Then they begin a second search for a caterer. They negotiate two contracts, coordinate two schedules, and spend the week before the event managing logistics instead of looking forward to it. At{' '}
                    <Link href={`${base}/`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">Chopras Indian Restaurant</Link>{' '}
                    at Leyweg 986 in Den Haag, the event hall and the kitchen are a single operation. You make one call. Everything is handled.
                  </p>
                  <p>
                    The private hall seats between <strong>25 and 80 guests</strong>. From an intimate{' '}
                    <Link href={`${base}/indian-wedding-catering-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">nikah reception</Link>{' '}
                    for close family to a corporate dinner for eighty, that range covers everything. The food comes from the same kitchen that earns 4.9 stars on Google from 800+ reviewers every week. Your private event guests receive exactly the same standard. No separate caterer. No coordination gap.
                  </p>
                  <p>
                    Whether you are planning a birthday party, a{' '}
                    <Link href={`${base}/diwali-dinner-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">Diwali celebration</Link>
                    , or a{' '}
                    <Link href={`${base}/corporate-events-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">corporate event</Link>
                    , the starting point is the same: tell us your date, your guest count, and your occasion. We handle the menu, the setup, and the service.
                  </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="py-24 px-6 md:px-16 bg-[#1B2B5E] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 mix-blend-overlay" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="font-vibes text-5xl md:text-6xl text-[#C7A348]">
              {isNl ? 'Sfeerimpressie' : 'Atmosphere'}
            </h2>
            <div className="w-24 h-px bg-[#C7A348]/40 mx-auto mt-8" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-5 h-[300px] md:h-[450px] relative rounded-3xl overflow-hidden group shadow-2xl">
              <Image src="/images/catering/proposal---1.png" alt="Proposal dinner at Chopras Indian Restaurant Den Haag private hall" fill className="object-cover transition-transform duration-1000 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1B2B5E]/80 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
            </div>
            <div className="md:col-span-7 h-[300px] md:h-[450px] relative rounded-3xl overflow-hidden group shadow-2xl">
              <Image src="/images/catering/proposal---2.png" alt="Private dining proposal at Chopras Indian Restaurant Den Haag" fill className="object-cover transition-transform duration-1000 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1B2B5E]/80 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
            </div>
            <div className="md:col-span-12 h-[300px] md:h-[500px] relative rounded-3xl overflow-hidden group shadow-2xl">
              <Image src="/images/catering/baby-shower-pic-1.png" alt="Baby shower catering at Chopras Indian Restaurant Den Haag" fill className="object-cover transition-transform duration-1000 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1B2B5E]/90 via-transparent to-transparent opacity-70 group-hover:opacity-50 transition-opacity duration-500" />
              <div className="absolute bottom-10 left-10 md:bottom-12 md:left-12 border border-white/20 backdrop-blur-md bg-white/10 px-8 py-4 rounded-2xl">
                 <p className="text-white font-vibes text-4xl">{isNl ? 'Elk detail perfect' : 'Every detail perfect'}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT IS INCLUDED */}
      <section className="bg-white py-24 md:py-32 px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-4 mb-6">
                <div className="w-12 h-px bg-[#C7A348]" />
                <span className="text-[#C7A348] text-xs font-semibold uppercase tracking-widest">{isNl ? 'Standaard' : 'Standard'}</span>
              </div>
              <h2 className="font-vibes text-5xl md:text-6xl text-[#C7A348] mb-8 leading-[1.2]">
                {isNl
                  ? 'De Privé Feestzaal op Leyweg 986 - Capaciteit, Catering en Standaard'
                  : 'The Private Hall at Leyweg 986 - Capacity, Catering, and Standard'}
              </h2>
              <div className="space-y-6 font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                {isNl ? (
                  <>
                  <p>
                    De feestzaal van Chopras Indian Restaurant Den Haag heeft een capaciteit van <strong>25 tot 80 gasten</strong>. De ruimte is volledig privé tijdens uw evenement: uw gasten delen de zaal niet met andere diners. De opstelling wordt aangepast aan uw gelegenheid, van een formele tafelindeling voor een meergangendiner tot een ruimere opstelling voor een buffetreceptie met meerdere stations.
                  </p>
                  <p>
                    Volledige catering is inbegrepen bij elke boeking. Het menu wordt samengesteld in overleg met ons team en kan alles bevatten van het{' '}
                    <Link href={`${base}/menu`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">volledige restaurantmenu</Link>
                    :{' '}
                    <Link href={`${base}/butter-chicken-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">butter chicken</Link>
                    ,{' '}
                    <Link href={`${base}/biryani-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">biryani</Link>
                    , tandoorige gerechten, vegetarische en veganistische opties en Indo Chinese specialiteiten. Elk vleesgerecht is{' '}
                    <Link href={`${base}/halal-food-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">halal gecertificeerd</Link>
                    . Elke leverancier is gecertificeerd. Er is geen risico op kruiscontaminatie omdat er nergens in de keuken niet-halal vlees aanwezig is.
                  </p>
                  <p>
                    De keukenstandaard op uw evenement is gelijk aan die van het restaurant. Specerijen worden rechtstreeks uit India betrokken en elke ochtend vers gemalen vóór de service. De tandoor brandt op <strong>400 graden Celsius</strong>. De gerechten die op uw tafels komen zijn bereid door dezelfde chefs die van Chopras Indian Restaurant het{' '}
                    <Link href={`${base}/beste-indiaas-restaurant-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">best beoordeelde Indiaas restaurant in Den Haag</Link>{' '}
                    hebben gemaakt. Die standaard daalt niet voor evenementen.
                  </p>
                  </>
                ) : (
                  <>
                  <p>
                    The feestzaal at Chopras Indian Restaurant Den Haag holds between <strong>25 and 80 guests</strong>. The space is entirely private during your event. Your guests do not share the hall with other diners. The layout is configured for your occasion, from formal seated tables for a plated dinner to a wider arrangement for a standing buffet reception.
                  </p>
                  <p>
                    Full catering is included with every booking. The menu is built in consultation with our team and can draw from the{' '}
                    <Link href={`${base}/menu`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">full restaurant menu</Link>
                    :{' '}
                    <Link href={`${base}/butter-chicken-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">butter chicken</Link>
                    ,{' '}
                    <Link href={`${base}/biryani-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">biryani</Link>
                    , tandoori dishes, vegetarian and vegan options, and Indo Chinese specialties. Every meat dish is{' '}
                    <Link href={`${base}/halal-food-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">halal certified</Link>
                    . Every supplier holds certification. No cross-contamination risk exists because there is no non-halal meat anywhere on the premises.
                  </p>
                  <p>
                    The kitchen standard at your event matches the restaurant. Spices are sourced directly from India and ground fresh every morning before service. The tandoor fires to <strong>400 degrees Celsius</strong>. The dishes at your tables are prepared by the same chefs who made Chopras Indian Restaurant the{' '}
                    <Link href={`${base}/beste-indiaas-restaurant-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">strongly rated Indian restaurant in Den Haag</Link>
                    . That standard does not drop for events.
                  </p>
                  </>
                )}
              </div>
            </div>
            <div className="relative rounded-3xl bg-[#F7F8FC] p-12 lg:p-16 text-center border border-[#D4AF37]/20">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[url('/images/pattern-dots.svg')] opacity-20" />
              <div className="relative z-10">
                <h3 className="font-vibes text-4xl text-[#C7A348] mb-8">{isNl ? 'Wat Is Inbegrepen?' : 'What Is Included?'}</h3>
                <ul className="space-y-4 text-left font-body text-[#1B2B5E] font-medium">
                  {[
                    isNl ? 'Volledig privé zaalgebruik' : 'Fully private hall usage',
                    isNl ? 'Custom Indiaas catering menu' : 'Custom Indian catering menu',
                    isNl ? 'Tafelschikking naar wens' : 'Seating arrangement of choice',
                    isNl ? 'Professionele bediening' : 'Professional service staff',
                    isNl ? '100% halal gecertificeerd eten' : '100% halal certified food',
                    isNl ? 'Geen verborgen schoonmaakkosten' : 'No hidden cleaning fees'
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-4 border-b border-[#1B2B5E]/5 pb-4 last:border-0 last:pb-0">
                      <div className="w-6 h-6 rounded-full bg-[#D4AF37]/10 flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-3.5 h-3.5 text-[#C7A348]" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OCCASIONS AND CATERING */}
      <section className="bg-[#F7F8FC] py-24 md:py-32 px-6 md:px-16 border-t border-[#D4AF37]/10">
        <div className="max-w-4xl mx-auto text-center mb-20">
           <h2 className="font-vibes text-5xl md:text-6xl text-[#C7A348] mb-6">
             {isNl
               ? 'Verjaardag, Bruiloft, Bedrijfsdiner en Meer in Den Haag'
               : 'Birthday, Wedding, Corporate Dinner and More in Den Haag'}
           </h2>
        </div>
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-6 font-body text-[#1A1A1A]/70 text-lg leading-relaxed bg-white p-10 md:p-14 rounded-3xl shadow-sm border border-gray-100 transition-all duration-500 hover:shadow-xl hover:-translate-y-2">
             <h3 className="font-heading text-2xl text-[#C7A348] mb-6 font-semibold">{isNl ? 'Trouwen en Recepties' : 'Weddings and Receptions'}</h3>
            {isNl ? (
              <>
              <p>
                Stel u voor: een verjaardagsdiner voor dertig personen op Leyweg 986. De gasten arriveren, de zaal is gereed, het eten staat klaar. De gastheer heeft de week ervoor niet besteed aan het afstemmen van twee aparte bedrijven. Dat is wat het huren van de feestzaal bij Chopras Indian Restaurant in de praktijk inhoudt.
              </p>
              <p>
                Voor{' '}
                <Link href={`${base}/bruiloft-catering-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">bruiloft catering in Den Haag</Link>{' '}
                wordt het menu het middelpunt. Een nikah-receptie voor zeventig gasten kan worden opgezet als een overvloedig buffet met meerdere stations:{' '}
                <Link href={`${base}/biryani-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">biryani</Link>{' '}
                in grote karahi potten, tandoori platters en een volledig vegetarisch aanbod zodat elke gast gedekt is. Een walimahdiner kan worden gestructureerd als een formele bordbediening. Het format past bij de formaliteit van de gelegenheid.
              </p>
              <p>
                Bedrijfsevenementen vragen om iets anders. Een teamdiner bij Chopras Indian Restaurant Den Haag is gedenkwaardiger dan een vergaderkamer met cateringboxen. De privézaal laat uw team ontspannen weg van een drukke eetzaal. Voor{' '}
                <Link href={`${base}/diwali-dinner-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">Diwali-diners in Den Haag</Link>{' '}
                staan traditionele gerechten centraal:{' '}
                <Link href={`${base}/dal-makhani-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">dal makhani</Link>
                , paneer tikka en de biryani die de gelegenheid verdient. Bekijk ons volledige aanbod voor{' '}
                <Link href={`${base}/corporate-events-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">bedrijfsevenementen in Den Haag</Link>.
              </p>
              </>
            ) : (
              <>
              <p>
                Picture a birthday dinner for thirty guests at Leyweg 986 in Den Haag. Guests arrive, the hall is set, the food is ready. The host did not spend the week before coordinating two separate companies. That is what hiring the feestzaal at Chopras Indian Restaurant actually looks like.
              </p>
              <p>
                For{' '}
                <Link href={`${base}/indian-wedding-catering-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">Indian wedding catering in Den Haag</Link>
                , the menu becomes the centrepiece. A nikah reception for seventy guests can run as a generous buffet with multiple stations:{' '}
                <Link href={`${base}/biryani-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">biryani</Link>{' '}
                in large karahi pots, tandoori platters, and a full vegetarian spread so every guest is covered. A walima dinner can be structured as formal plated service. The format matches the formality of the occasion.
              </p>
              <p>
                Corporate events need something different. A team dinner at Chopras Indian Restaurant Den Haag is more memorable than a standard catered meeting room. The private hall lets your group relax away from a public dining room. For{' '}
                <Link href={`${base}/diwali-dinner-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">Diwali dinners in Den Haag</Link>
                , traditional dishes take centre stage:{' '}
                <Link href={`${base}/dal-makhani-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">dal makhani</Link>
                , paneer tikka, and the biryani the occasion deserves. Explore our full{' '}
                <Link href={`${base}/corporate-events-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">corporate events offering in Den Haag</Link>.
              </p>
              </>
            )}
          </div>
          
          <div className="space-y-6 font-body text-[#1A1A1A]/70 text-lg leading-relaxed bg-white p-10 md:p-14 rounded-3xl shadow-sm border border-gray-100 transition-all duration-500 hover:shadow-xl hover:-translate-y-2">
             <h3 className="font-heading text-2xl text-[#C7A348] mb-6 font-semibold">{isNl ? 'Kruiden Die Leven, Niet Alleen Kleur Geven' : 'Spices That Live, Not Just Add Color'}</h3>
            {isNl ? (
              <>
              <p>
                Het eten bij uw evenement is niet afkomstig van een externe cateraar en niet samengesteld uit een vast pakket. Het komt rechtstreeks uit de Chopras-keuken en wordt op de dag zelf vers bereid. Dit onderscheid klinkt eenvoudig. Het maakt het verschil.
              </p>
              <p>
                De meeste eventcateraars werken met kant-en-klare kruidenmengsels van een leverancier. Bij Chopras Indian Restaurant worden hele specerijen rechtstreeks uit India ingevoerd en elke ochtend vers gemalen vóór de service. De vluchtige aromatische verbindingen in komijn, kardemom en koriander bereiken hun hoogtepunt binnen uren na het malen. Uw evenementgasten eten het eten op het absolute hoogtepunt van zijn smaak. Dat is het verschil tussen Indiaas eten dat leeft en Indiaas eten dat uit een pot komt.
              </p>
              <p>
                Het menu voor uw evenement wordt samengesteld in overleg met ons team. Van{' '}
                <Link href={`${base}/butter-chicken-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">butter chicken</Link>{' '}
                en{' '}
                <Link href={`${base}/mutton-rogan-josh-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">mutton rogan josh</Link>{' '}
                tot{' '}
                <Link href={`${base}/soya-chaap-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">soya chaap</Link>{' '}
                en{' '}
                <Link href={`${base}/chaat-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">chaat</Link>
                , alles van het restaurantmenu is beschikbaar. Vegetarische en veganistische gasten zijn volledig gedekt. Een buffet werkt goed voor grotere groepen; een meergangendiner met bordbediening geeft formele gelegenheden meer gewicht. Meer over onze volledige{' '}
                <Link href={`${base}/catering`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">Indiaas catering diensten in Den Haag</Link>.
              </p>
              </>
            ) : (
              <>
              <p>
                The food at your event does not come from an outside caterer or a fixed package. It comes directly from the Chopras kitchen and is prepared fresh on the day. That distinction sounds simple. It makes all the difference.
              </p>
              <p>
                Most event caterers work from pre-mixed spice blends bought from a supplier. At Chopras Indian Restaurant, whole spices are sourced directly from India and ground fresh every morning before service. The volatile aromatic compounds in cumin, cardamom, and coriander peak within hours of grinding. Your event guests eat the food at its absolute best. That is the difference between Indian food that tastes alive and Indian food that tastes like it came from a jar.
              </p>
              <p>
                The menu for your event is built in consultation with our team. From{' '}
                <Link href={`${base}/butter-chicken-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">butter chicken</Link>{' '}
                and{' '}
                <Link href={`${base}/mutton-rogan-josh-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">mutton rogan josh</Link>{' '}
                to{' '}
                <Link href={`${base}/soya-chaap-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">soya chaap</Link>{' '}
                and{' '}
                <Link href={`${base}/chaat-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">chaat</Link>
                , everything from the restaurant menu is available. Vegetarian and vegan guests are fully covered. A buffet works well for larger groups; a plated multi-course dinner adds formality to wedding receptions and corporate dinners. Explore our full{' '}
                <Link href={`${base}/catering`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">Indian catering services in Den Haag</Link>.
              </p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="bg-white py-24 md:py-32 px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="font-vibes text-5xl md:text-6xl text-[#C7A348] mb-6">
              {isNl
                ? 'Waarom Chopras Indian Restaurant Kiezen voor Uw Evenement'
                : 'Why Choose Chopras Indian Restaurant for Your Event'}
            </h2>
            <div className="w-16 h-px bg-[#1B2B5E]/20 mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {[
              {
                title: isNl ? 'Restaurant Kwaliteit Eten' : 'Restaurant Quality Food',
                desc: isNl
                  ? 'Dezelfde chefs, recepten en specerijen als in het restaurant. Vers gemalen specerijen rechtstreeks uit India. 4,9 sterren op Google van 800+ beoordelaars. Geen aparte evenementenkeuken.'
                  : 'The same chefs, recipes, and spices as the restaurant. Freshly ground spices sourced directly from India. 4.9 stars on Google from 800+ reviewers. No separate event kitchen.',
              },
              {
                title: isNl ? 'Alles Onder Een Dak' : 'Everything Under One Roof',
                desc: isNl
                  ? 'Ruimte, catering en service in één boeking. Geen aparte cateraar. Geen dubbele contracten. Één aanspreekpunt voor het hele evenement.'
                  : 'Venue, catering, and service in one booking. No separate caterer. No double contracts. One point of contact for the entire event.',
              },
              {
                title: isNl ? 'Volledig Halal Gecertificeerd' : 'Fully Halal Certified',
                desc: isNl
                  ? 'Elk gerecht, elke leverancier, elke bereiding is halal gecertificeerd. Geen uitzonderingen. Geen risico op kruiscontaminatie. Boek met volledige zekerheid.'
                  : 'Every dish, every supplier, every preparation is halal certified. No exceptions. No cross-contamination risk. Book with complete confidence.',
              },
              {
                title: isNl ? '25 tot 80 Gasten' : '25 to 80 Guests',
                desc: isNl
                  ? 'De privézaal past zich aan uw groep aan. Intiem familiediner of grote receptie, de ruimte werkt voor uw gelegenheid zonder verplichte vaste pakketten.'
                  : 'The private hall adapts to your group size. Intimate family dinner or large reception, the space works for your occasion without mandatory fixed packages.',
              },
            ].map((item) => (
              <div key={item.title} className="group relative rounded-3xl bg-[#F7F8FC] p-2 transition-all duration-500 hover:shadow-xl hover:-translate-y-1">
                <div className="absolute inset-0 rounded-3xl border border-[#D4AF37]/0 group-hover:border-[#D4AF37]/20 transition-colors duration-500" />
                <div className="relative h-full rounded-[1.25rem] bg-white p-10 flex flex-col justify-between border border-gray-100">
                  <div>
                    <div className="w-14 h-14 rounded-2xl bg-[#D4AF37]/5 flex items-center justify-center mb-8 ring-1 ring-[#D4AF37]/15 group-hover:scale-110 transition-transform duration-500 ease-out">
                      <CheckCircle className="text-[#C7A348] w-6 h-6" />
                    </div>
                    <h3 className="font-heading text-2xl text-[#C7A348] font-semibold mb-4">{item.title}</h3>
                    <p className="font-body text-[#1A1A1A]/70 text-base leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GEO & BOOKING SPLIT */}
      <section className="bg-[#1B2B5E] py-24 md:py-32 px-6 md:px-16 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 mix-blend-overlay" />
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10">
           <div>
              <h2 className="font-vibes text-4xl md:text-5xl text-[#C7A348] mb-8 leading-[1.3]">
                {isNl
                  ? 'Kan ik een feestzaal huren bij Chopras Indian Restaurant in Den Haag?'
                  : 'Can I Rent an Event Hall at Chopras Indian Restaurant in Den Haag?'}
              </h2>
              <div className="font-body text-white/80 text-lg leading-relaxed">
                {isNl ? (
                  <p>
                    Ja. Chopras Indian Restaurant op{' '}
                    <Link href={`${base}/contact`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">Leyweg 986 in Den Haag</Link>{' '}
                    biedt een privé feestzaal te huur voor <strong>25 tot 80 gasten</strong>. De zaal is beschikbaar voor verjaardagen, bruiloften, nikah-recepties, bedrijfsfeesten, Diwali-diners en privéfeesten. Authentiek{' '}
                    <Link href={`${base}/catering`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">Indiaas catering</Link>{' '}
                    is inbegrepen, bereid door dezelfde keuken die 4,9 sterren scoort op Google van 800+ beoordelaars. Open dinsdag tot en met zondag. Neem contact op voor een vrijblijvende offerte.
                  </p>
                ) : (
                  <p>
                    Yes. Chopras Indian Restaurant at{' '}
                    <Link href={`${base}/contact`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">Leyweg 986, Den Haag</Link>{' '}
                    operates a private event hall for hire accommodating <strong>25 to 80 guests</strong>. The hall is available for birthdays, weddings, nikah receptions, corporate events, Diwali dinners, and private parties. Full authentic{' '}
                    <Link href={`${base}/catering`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">Indian catering</Link>{' '}
                    is included, from the same kitchen rated 4.9 stars on Google from 800+ reviews. Open Tuesday to Sunday. Contact us to request a free quote for your event.
                  </p>
                )}
              </div>
           </div>
           <div className="border-l border-white/10 pl-0 lg:pl-16 pt-16 lg:pt-0 border-t lg:border-t-0 mt-8 lg:mt-0">
              <h2 className="font-vibes text-4xl md:text-5xl text-[#C7A348] mb-8 leading-[1.3]">
                {isNl
                  ? 'Hoe Boek Je een Feestzaal bij Chopras Indian Restaurant Den Haag'
                  : 'How to Book the Event Hall at Chopras Indian Restaurant Den Haag'}
              </h2>
              <div className="font-body text-white/80 text-lg leading-relaxed space-y-6">
                {isNl ? (
                  <>
                  <p>
                    Het boekingsproces is eenvoudig. Neem contact op via de{' '}
                    <Link href={`${base}/contact`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">contactpagina</Link>{' '}
                    of bel ons direct op <strong>+31 6 30645930</strong>. Vertel ons drie dingen: de datum die u in gedachten heeft, uw verwachte aantal gasten en het type gelegenheid. Dat is genoeg om het gesprek te starten.
                  </p>
                  <p>
                    Wij bespreken de beschikbaarheid, lopen met u door de menu-opties voor uw gelegenheid, en sturen u binnen <strong>24 uur</strong> een vrijblijvende offerte. Voor evenementen van 25 tot 40 gasten raden wij aan minimaal <strong>2 tot 3 weken van tevoren</strong> contact op te nemen. Voor grotere bruiloften en bedrijfsfeesten van 50 tot 80 gasten is <strong>6 tot 8 weken vooruit</strong> het juiste moment. Zo hebben wij voldoende tijd om het menu en de zaalopstelling volledig af te stemmen op uw gelegenheid.
                  </p>
                  </>
                ) : (
                  <>
                  <p>
                    The booking process is straightforward. Contact us via the{' '}
                    <Link href={`${base}/contact`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">contact page</Link>{' '}
                    or call us directly on <strong>+31 6 30645930</strong>. Tell us three things: the date you have in mind, your expected guest count, and the type of occasion. That is enough to start the conversation.
                  </p>
                  <p>
                    We discuss availability, walk you through menu options for your occasion, and send a free no-obligation quote within <strong>24 hours</strong>. For events of 25 to 40 guests, reaching out at least <strong>2 to 3 weeks in advance</strong> gives us the preparation time your event deserves. For larger weddings and corporate dinners of 50 to 80 guests, <strong>6 to 8 weeks ahead</strong> is the right window. That gives us enough time to build the menu and configure the hall exactly as your occasion requires.
                  </p>
                  </>
                )}
              </div>
           </div>
        </div>
      </section>

      {/* INTERNAL LINKS */}
      <section className="bg-white py-24 md:py-32 px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-vibes text-5xl text-[#C7A348] mb-6">
              {isNl ? 'Meer Over Onze Diensten' : 'Learn More About Our Services'}
            </h2>
            <div className="w-16 h-px bg-[#1B2B5E]/10 mx-auto" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <Link href={`${base}/`} className="group block p-6 bg-[#F7F8FC] rounded-2xl border border-transparent hover:border-[#D4AF37]/30 hover:bg-white hover:shadow-lg transition-all duration-300">
              <p className="text-[#C7A348] text-xs font-semibold uppercase tracking-widest mb-2 group-hover:translate-x-1 transition-transform">{isNl ? 'Restaurant' : 'Restaurant'}</p>
              <p className="text-[#1B2B5E] font-medium text-sm">{isNl ? 'Chopras Indian Restaurant - beste Indiaas restaurant in Den Haag' : 'Chopras Indian Restaurant - best Indian restaurant in Den Haag'}</p>
            </Link>
            <Link href={`${base}/menu`} className="group block p-6 bg-[#F7F8FC] rounded-2xl border border-transparent hover:border-[#D4AF37]/30 hover:bg-white hover:shadow-lg transition-all duration-300">
              <p className="text-[#C7A348] text-xs font-semibold uppercase tracking-widest mb-2 group-hover:translate-x-1 transition-transform">{isNl ? 'Menu' : 'Menu'}</p>
              <p className="text-[#1B2B5E] font-medium text-sm">{isNl ? 'Bekijk ons volledige menu voor uw evenement' : 'View our full menu for your event'}</p>
            </Link>
            <Link href={`${base}/catering`} className="group block p-6 bg-[#F7F8FC] rounded-2xl border border-transparent hover:border-[#D4AF37]/30 hover:bg-white hover:shadow-lg transition-all duration-300">
              <p className="text-[#C7A348] text-xs font-semibold uppercase tracking-widest mb-2 group-hover:translate-x-1 transition-transform">{isNl ? 'Catering' : 'Catering'}</p>
              <p className="text-[#1B2B5E] font-medium text-sm">{isNl ? 'Indiaas catering Den Haag' : 'Indian catering Den Haag'}</p>
            </Link>
            <Link href={`${base}/contact`} className="group block p-6 bg-[#F7F8FC] rounded-2xl border border-transparent hover:border-[#D4AF37]/30 hover:bg-white hover:shadow-lg transition-all duration-300">
              <p className="text-[#C7A348] text-xs font-semibold uppercase tracking-widest mb-2 group-hover:translate-x-1 transition-transform">{isNl ? 'Contact' : 'Contact'}</p>
              <p className="text-[#1B2B5E] font-medium text-sm">{isNl ? 'Vraag een vrijblijvende offerte aan' : 'Request a no-obligation quote'}</p>
            </Link>
            <Link href={`${base}/indian-wedding-catering-den-haag`} className="group block p-6 bg-[#F7F8FC] rounded-2xl border border-transparent hover:border-[#D4AF37]/30 hover:bg-white hover:shadow-lg transition-all duration-300">
              <p className="text-[#C7A348] text-xs font-semibold uppercase tracking-widest mb-2 group-hover:translate-x-1 transition-transform">{isNl ? 'Bruiloft' : 'Wedding'}</p>
              <p className="text-[#1B2B5E] font-medium text-sm">{isNl ? 'Indiaas bruiloft catering Den Haag' : 'Indian wedding catering Den Haag'}</p>
            </Link>
            <Link href={`${base}/indian-birthday-catering-den-haag`} className="group block p-6 bg-[#F7F8FC] rounded-2xl border border-transparent hover:border-[#D4AF37]/30 hover:bg-white hover:shadow-lg transition-all duration-300">
              <p className="text-[#C7A348] text-xs font-semibold uppercase tracking-widest mb-2 group-hover:translate-x-1 transition-transform">{isNl ? 'Verjaardag' : 'Birthday'}</p>
              <p className="text-[#1B2B5E] font-medium text-sm">{isNl ? 'Verjaardag catering Den Haag' : 'Birthday catering Den Haag'}</p>
            </Link>
            <Link href={`${base}/corporate-events-den-haag`} className="group block p-6 bg-[#F7F8FC] rounded-2xl border border-transparent hover:border-[#D4AF37]/30 hover:bg-white hover:shadow-lg transition-all duration-300">
              <p className="text-[#C7A348] text-xs font-semibold uppercase tracking-widest mb-2 group-hover:translate-x-1 transition-transform">{isNl ? 'Bedrijf' : 'Corporate'}</p>
              <p className="text-[#1B2B5E] font-medium text-sm">{isNl ? 'Bedrijfsfeest Den Haag' : 'Corporate events Den Haag'}</p>
            </Link>
            <Link href={`${base}/diwali-dinner-den-haag`} className="group block p-6 bg-[#F7F8FC] rounded-2xl border border-transparent hover:border-[#D4AF37]/30 hover:bg-white hover:shadow-lg transition-all duration-300">
              <p className="text-[#C7A348] text-xs font-semibold uppercase tracking-widest mb-2 group-hover:translate-x-1 transition-transform">{isNl ? 'Diwali' : 'Diwali'}</p>
              <p className="text-[#1B2B5E] font-medium text-sm">{isNl ? 'Diwali dinner Den Haag' : 'Diwali dinner Den Haag'}</p>
            </Link>
            <Link href={`${base}/bruiloft-catering-den-haag`} className="group block p-6 bg-[#F7F8FC] rounded-2xl border border-transparent hover:border-[#D4AF37]/30 hover:bg-white hover:shadow-lg transition-all duration-300">
              <p className="text-[#C7A348] text-xs font-semibold uppercase tracking-widest mb-2 group-hover:translate-x-1 transition-transform">{isNl ? 'Trouwlocatie' : 'Wedding'}</p>
              <p className="text-[#1B2B5E] font-medium text-sm">{isNl ? 'Bruiloft catering Den Haag' : 'Wedding catering Den Haag'}</p>
            </Link>
            <Link href={`${base}/zaal-huren-den-haag`} className="group block p-6 bg-[#F7F8FC] rounded-2xl border border-transparent hover:border-[#D4AF37]/30 hover:bg-white hover:shadow-lg transition-all duration-300">
              <p className="text-[#C7A348] text-xs font-semibold uppercase tracking-widest mb-2 group-hover:translate-x-1 transition-transform">{isNl ? 'Zaal' : 'Venue'}</p>
              <p className="text-[#1B2B5E] font-medium text-sm">{isNl ? 'Zaal huren Den Haag' : 'Hall for hire Den Haag'}</p>
            </Link>
            <Link href={`${base}/evenementenruimte-den-haag`} className="group block p-6 bg-[#F7F8FC] rounded-2xl border border-transparent hover:border-[#D4AF37]/30 hover:bg-white hover:shadow-lg transition-all duration-300">
              <p className="text-[#C7A348] text-xs font-semibold uppercase tracking-widest mb-2 group-hover:translate-x-1 transition-transform">{isNl ? 'Evenement' : 'Event'}</p>
              <p className="text-[#1B2B5E] font-medium text-sm">{isNl ? 'Evenementenruimte Den Haag' : 'Event venue Den Haag'}</p>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#F7F8FC] py-24 px-6 md:px-16 border-t border-[#D4AF37]/10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
             <h2 className="font-vibes text-5xl md:text-6xl text-[#C7A348] mb-6">
               {isNl
                 ? 'Veelgestelde Vragen over de Feestzaal in Den Haag'
                 : 'Frequently Asked Questions About the Event Hall in Den Haag'}
             </h2>
             <div className="w-16 h-px bg-[#1B2B5E]/20 mx-auto" />
          </div>
          <FaqAccordion faqs={isNl ? faqsNl : faqsEn} locale={locale} />
        </div>
      </section>

      {/* CTA */}
      <section className="relative bg-[#1B2B5E] py-32 px-6 md:px-16 text-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/catering/party-decor.png')] bg-cover bg-center opacity-10 mix-blend-luminosity" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1B2B5E] via-[#1B2B5E]/90 to-[#1B2B5E]" />
        
        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full border border-[#C7A348]/40 bg-white/5 backdrop-blur-sm mb-8">
            <span className="text-[#C7A348] text-[10px] font-semibold uppercase tracking-[0.2em]">
              {isNl ? 'RESERVEER UW DATUM' : 'RESERVE YOUR DATE'}
            </span>
          </div>
          <h2 className="font-vibes text-5xl md:text-7xl text-white mb-8 leading-[1.2]">
            {isNl
              ? 'Klaar om uw feestzaal te boeken in Den Haag?'
              : 'Ready to Book Your Event Hall in Den Haag?'}
          </h2>
          <p className="text-white/70 font-body text-lg md:text-xl mb-12 leading-relaxed max-w-2xl mx-auto font-light">
            {isNl
              ? 'Neem vandaag nog contact op en ontvang een vrijblijvende offerte voor uw privé evenement in Den Haag. Open dinsdag tot en met zondag op Leyweg 986.'
              : 'Contact us today and receive a free quote for your private event in Den Haag. Open Tuesday to Sunday at Leyweg 986.'}
          </p>
          <Link
            href={`${base}/contact`}
            className="group relative inline-flex items-center justify-center gap-3 rounded-full border border-[#C7A348] bg-[#C7A348] px-10 py-5 text-[#1B2B5E] text-sm font-semibold uppercase tracking-widest transition-all duration-500 hover:bg-white hover:border-white overflow-hidden shadow-[0_0_30px_rgba(199,163,72,0.3)]"
          >
            <span className="relative z-10">{isNl ? 'Offerte Aanvragen' : 'Request a Quote'}</span>
          </Link>
        </div>
      </section>
    </>
  )
}
