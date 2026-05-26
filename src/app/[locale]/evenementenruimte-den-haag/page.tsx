import type { Metadata } from 'next'
import Link from 'next/link'
import JsonLd from '@/components/seo/JsonLd'
import { getLocalizedUrl } from '@/lib/utils'
import { getLocalRestaurantSchema, getBreadcrumbSchema, getFaqPageSchema, getCateringServiceSchema } from '@/lib/schema'
import { getTranslations, type Locale } from '@/lib/useTranslations'
import FaqAccordion from '@/components/sections/FaqAccordion'
import EmailLink from '@/components/ui/EmailLink'

type Props = { params: { locale: Locale } }

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'nl' }]
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params
  const title = 'Evenementenruimte Den Haag | Chopras Indian Restaurant'
  const description = 'Evenementenruimte Den Haag bij Chopras Indian Restaurant. Bedrijfsfeesten en vergaderingen. Indiaas catering beschikbaar. Offerte aanvragen vandaag.'
  return {
    title,
    description,
    robots: locale === 'en' ? { index: false, follow: true } : undefined,
    alternates: {
      canonical: getLocalizedUrl(locale, 'evenementenruimte-den-haag'),
      languages: {
        en: getLocalizedUrl('en', 'evenementenruimte-den-haag'),
        nl: getLocalizedUrl('nl', 'evenementenruimte-den-haag'),
        'x-default': getLocalizedUrl('en', 'evenementenruimte-den-haag'),
      },
    },
    openGraph: {
      title,
      description,
      url: getLocalizedUrl(locale, 'evenementenruimte-den-haag'),
      images: [{ url: '/og/home-og.jpg', width: 1200, height: 630, alt: 'Evenementenruimte Den Haag bij Chopras Indian Restaurant' }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/og/home-og.jpg'],
    },
  }
}

const faqsNl = [
  {
    question: 'Wat is de capaciteit van de evenementenruimte bij Chopras Indian Restaurant?',
    answer: 'De privéruimte bij Chopras Indian Restaurant op Leyweg 986 in Den Haag biedt ruimte voor 25 tot 80 gasten. Afhankelijk van de opstelling is de ruimte geschikt voor zowel kleine vergaderingen als grotere bedrijfsfeesten en personeelsevenementen.',
  },
  {
    question: 'Is het eten bij evenementen volledig halal gecertificeerd?',
    answer: 'Ja. Chopras Indian Restaurant is volledig halal gecertificeerd. Elk vleesgerecht, elke leverancier en elke bereiding in onze keuken voldoet aan de halal-norm. Er is geen kruisbesmetting mogelijk, omdat er geen niet-halal vlees aanwezig is in het pand.',
  },
  {
    question: 'Kan ik een aangepast menu samenstellen voor mijn evenement?',
    answer: 'Ja. Wij stellen een menu samen op basis van uw wensen, het type evenement en het aantal gasten. Vegetarische, veganistische en glutenvrije opties zijn beschikbaar. Onze menukaart bevat 143 gerechten verspreid over 13 categorieën, zodat u altijd een passende samenstelling vindt.',
  },
  {
    question: 'Hoe ver van tevoren moet ik een evenement reserveren bij Chopras?',
    answer: 'Wij adviseren minimaal twee weken van tevoren te reserveren voor evenementen tot 40 gasten. Voor grotere groepen of evenementen met specifieke catering-wensen raden wij vier weken of meer aan. Neem contact op via info [at] chopras.nl of via de contactpagina om beschikbaarheid te bespreken.',
  },
  {
    question: 'Kunnen we audio-visuele apparatuur gebruiken in de evenementenruimte?',
    answer: 'Ja. Geef bij het aanvragen van uw offerte aan welke apparatuur u nodig hebt, zoals een projector, scherm of geluidssysteem. Wij stemmen de opstelling in overleg met u af.',
  },
]

export default function EvenementenruimtePage({ params }: Props) {
  const { locale } = params
  const tr = getTranslations(locale)
  const base = locale === 'nl' ? '/nl' : ''

  return (
    <>
      <JsonLd data={getCateringServiceSchema(locale)} />
      <JsonLd data={getLocalRestaurantSchema(locale, ['Den Haag'], getLocalizedUrl(locale, 'evenementenruimte-den-haag'))} />
      <JsonLd data={getBreadcrumbSchema([
        { name: tr.common.nav.home, item: getLocalizedUrl(locale) },
        { name: 'Evenementenruimte Den Haag', item: getLocalizedUrl(locale, 'evenementenruimte-den-haag') },
      ])} />
      <JsonLd data={getFaqPageSchema(faqsNl)} />

      {/* Hero */}
      <section className="bg-[#1B2B5E] py-20 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-[#C7A348]/40 bg-white/10 backdrop-blur-sm mb-4">
            <span className="text-[#C7A348] text-xs font-medium uppercase tracking-widest">
              • EVENEMENTENRUIMTE · CHOPRAS INDIAN RESTAURANT · DEN HAAG •
            </span>
          </div>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight">
            Evenementenruimte in Den Haag
          </h1>
          <p className="font-body text-white/85 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Privéruimte voor 25 tot 80 gasten bij Chopras Indian Restaurant op Leyweg 986. Authentiek Indiaas catering inbegrepen voor elk bedrijfsevenement in Den Haag.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`${base}/contact`}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#C7A348] bg-white/10 px-6 py-3 text-white text-sm font-medium uppercase tracking-wide transition-all duration-200 ease-out hover:bg-[rgba(199,163,72,0.3)] active:scale-[0.98] min-h-[48px] backdrop-blur-[10px]"
            >
              Offerte Aanvragen
            </Link>
            <Link
              href={`${base}/zaal-huren-den-haag`}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#C7A348] bg-white/10 px-6 py-3 text-white text-sm font-medium uppercase tracking-wide transition-all duration-200 ease-out hover:bg-[rgba(199,163,72,0.3)] active:scale-[0.98] min-h-[48px] backdrop-blur-[10px]"
            >
              Zaal Huren in Den Haag
            </Link>
          </div>
        </div>
      </section>

      {/* Section 1: Main intro */}
      <section className="bg-white py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-[#C7A348] mb-6 leading-[1.3]">
            Een evenementenruimte die uw gasten bijblijft
          </h2>
          <div className="space-y-5">
            <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
              Uw bedrijfsevenement verdient meer dan een standaard zalencentrum met voorverpakte catering. De{' '}
              <strong>evenementenruimte van Chopras Indian Restaurant</strong> in Den Haag biedt privéruimte voor 25 tot 80 gasten, gecombineerd met authentiek Noord-Indiaas eten dat uw gasten direct van het vuur bereikt. Elk evenement in onze{' '}
              <Link href={`${base}/feestzaal-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">feestzaal in Den Haag</Link>{' '}
              wordt verzorgd met dezelfde keukenstandaard als ons restaurant.
            </p>
            <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
              De specerijen in onze keuken worden elke ochtend vers gemalen van hele kruiden die rechtstreeks uit India worden ingevoerd. Niet uit een zak, niet van een groothandelsleverancier. Dit is het verschil tussen eten dat uw gasten onthouden en eten dat vergeten is zodra men naar huis rijdt.
            </p>
            <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
              Chopras Indian Restaurant staat beoordeeld met{' '}
              <strong>4,9 sterren op basis van 800+ Google-beoordelingen</strong>. Geen enkel ander Indiaas restaurant in Den Haag combineert dit cijfer met dit volume aan beoordelingen. Als u uw gasten onder de indruk wilt brengen, begint dat met de keuze van de locatie. Bekijk ons{' '}
              <Link href={`${base}/menu`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">volledig Indiaas menu</Link>{' '}
              voor een indruk van de 143 gerechten die wij serveren.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Types of events */}
      <section className="bg-[#FFFAF5] py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-[#C7A348] mb-6 leading-[1.3]">
            Welke evenementen organiseren wij in Den Haag?
          </h2>
          <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed mb-10">
            Onze evenementenruimte in Den Haag is geschikt voor vrijwel elk type zakelijk of privé-evenement. Van een intieme vergadering met tien personen tot een uitgebreid personeelsfeest voor tachtig gasten. Hieronder vindt u de meest gevraagde evenementtypen.
          </p>

          <div className="space-y-10">
            <div>
              <h3 className="font-vibes text-3xl md:text-4xl text-[#C7A348] mb-4 leading-[1.3]">
                Bedrijfsfeesten en personeelsevenementen
              </h3>
              <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                Uw personeel werkt het hele jaar hard. Een <strong>bedrijfsfeest</strong> bij Chopras Indian Restaurant laat zien dat u dat waardeert. Indiaas eten brengt mensen samen op een manier die een standaardborrel niet bereikt. Gasten ontspannen, gesprekken komen op gang en de sfeer zet de toon voor de rest van het jaar. Bekijk ook onze pagina over{' '}
                <Link href={`${base}/corporate-events-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">corporate events in Den Haag</Link>{' '}
                voor meer informatie over zakelijke arrangementen.
              </p>
            </div>

            <div>
              <h3 className="font-vibes text-3xl md:text-4xl text-[#C7A348] mb-4 leading-[1.3]">
                Vergaderingen met catering
              </h3>
              <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                Een <strong>vergaderruimte in Den Haag</strong> met verse Indiaas catering is een combinatie die weinig locaties bieden. Wij verzorgen alles: de ruimte, het eten en de opstelling. U brengt alleen uw deelnemers mee. Onze keuken is volledig{' '}
                <Link href={`${base}/halal-food-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">halal gecertificeerd</Link>,{' '}
                zodat alle gasten zonder vragen aan tafel kunnen gaan.
              </p>
            </div>

            <div>
              <h3 className="font-vibes text-3xl md:text-4xl text-[#C7A348] mb-4 leading-[1.3]">
                Teambuilding en borrels
              </h3>
              <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                Teambuildingevenementen draaien om verbinding. Gedeeld eten brengt dat sneller tot stand dan veel andere activiteiten. Een gezamenlijke maaltijd met gerechten als{' '}
                <Link href={`${base}/biryani-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">authentieke biryani</Link>{' '}
                of{' '}
                <Link href={`${base}/tandoori-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">tandoori uit onze kleioven</Link>{' '}
                geeft uw team iets om over te praten. De kleioven in onze keuken bereikt 400 graden Celsius. Dat is de temperatuur waar tandoori voor gemaakt is. Geen conventionele oven kan dat repliceren.
              </p>
            </div>

            <div>
              <h3 className="font-vibes text-3xl md:text-4xl text-[#C7A348] mb-4 leading-[1.3]">
                Jubilea en productlanceringen
              </h3>
              <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                Een jubileum of productlancering vraagt om een locatie die de gelegenheid past. Onze <strong>evenementenruimte in Den Haag</strong> biedt een privéomgeving waar uw gasten de aandacht krijgen die zij verdienen. Het eten is de gespreksopener. De ruimte is de setting. En Leyweg 986 is de adres dat uw gasten met plezier bezoeken.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Social proof - navy */}
      <section className="bg-[#1B2B5E] py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-white mb-6 leading-[1.3]">
            Waarom kiezen bedrijven in Den Haag voor Chopras?
          </h2>
          <p className="font-body text-white/85 text-lg leading-relaxed mb-10">
            Bedrijven die een evenementenruimte huren in Den Haag hebben keuze genoeg. Toch kiezen steeds meer organisaties voor Chopras Indian Restaurant op Leyweg 986 als hun vaste bedrijfsfeest locatie Den Haag. Dat heeft concrete redenen die u hieronder terugvindt.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm border border-white/20">
              <p className="font-body text-white font-semibold text-xl mb-2">4,9 sterren op Google</p>
              <p className="font-body text-white/85 text-lg leading-relaxed">
                800+ beoordelingen, het hoogste cijfer van elk Indiaas restaurant in Den Haag. Bewijs dat publiek zichtbaar en controleerbaar is.
              </p>
            </div>
            <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm border border-white/20">
              <p className="font-body text-white font-semibold text-xl mb-2">Volledig halal gecertificeerd</p>
              <p className="font-body text-white/85 text-lg leading-relaxed">
                Elk gerecht, elke leverancier, elke bereiding. Geen gedeeltelijke halal-optie. Alle gasten eten zonder vragen te stellen.
              </p>
            </div>
            <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm border border-white/20">
              <p className="font-body text-white font-semibold text-xl mb-2">Verse specerijen elke ochtend</p>
              <p className="font-body text-white/85 text-lg leading-relaxed">
                Masala&apos;s worden dagelijks gemalen van hele kruiden uit India. Niet uit een blend, niet van een leverancier. Het resultaat is eten dat uw gasten herkennen als authentiek.
              </p>
            </div>
            <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm border border-white/20">
              <p className="font-body text-white font-semibold text-xl mb-2">25 tot 80 gasten</p>
              <p className="font-body text-white/85 text-lg leading-relaxed">
                Flexibele ruimte die past bij uw groep. Klein genoeg voor een intiem diner. Groot genoeg voor een volledig bedrijfsfeest in Den Haag.
              </p>
            </div>
          </div>
          <div className="mt-10 text-center">
            <Link
              href={`${base}/contact`}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#C7A348] bg-white/10 px-8 py-3 text-white text-sm font-medium uppercase tracking-wide transition-all duration-200 ease-out hover:bg-[rgba(199,163,72,0.3)] active:scale-[0.98] min-h-[48px] backdrop-blur-[10px]"
            >
              Vrijblijvende Offerte Aanvragen
            </Link>
          </div>
        </div>
      </section>

      {/* GEO Block */}
      <section className="bg-[#FFFAF5] py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-[#C7A348] mb-6 leading-[1.3]">
            Biedt Chopras Indian Restaurant een evenementenruimte aan in Den Haag?
          </h2>
          <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
            Chopras Indian Restaurant biedt een privé-evenementenruimte aan op{' '}
            <Link href={`${base}/contact`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">Leyweg 986 in Den Haag</Link>,{' '}
            geschikt voor 25 tot 80 gasten. De ruimte is ideaal voor bedrijfsfeesten, personeelsevenementen, vergaderingen en teambuildingevenementen. Ons{' '}
            <Link href={`${base}/catering`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">Indiaas catering aanbod</Link>{' '}
            is volledig halal gecertificeerd en bij elk evenement inbegrepen. Chopras staat beoordeeld met 4,9 sterren op basis van 800+ Google-beoordelingen. De evenementenruimte is beschikbaar van dinsdag tot en met zondag.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-[#C7A348] mb-6 leading-[1.3]">
            Veelgestelde vragen over onze evenementenruimte
          </h2>
          <FaqAccordion faqs={faqsNl} locale={locale} />
        </div>
      </section>

      {/* CTA + Internal Links */}
      <section className="bg-[#F7F8FC] py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-[#C7A348] mb-6 leading-[1.3]">
            Plan uw evenement in Den Haag
          </h2>
          <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed mb-8">
            Beschikbaarheid bespreken, een menu samenstellen of een vrijblijvende offerte aanvragen? Neem contact op via{' '}
            <Link href={`${base}/contact`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">onze contactpagina</Link>{' '}
            of mail direct naar <EmailLink />. Wij reageren binnen een werkdag. U kunt ook het{' '}
            <Link href={`${base}/indian-buffet-den-haag`} className="text-[#D4AF37] hover:text-[#e8c48a] font-semibold">Indiaas buffet arrangement</Link>{' '}
            bekijken voor evenementen waarbij een breed aanbod gewenst is.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-14">
            <Link
              href={`${base}/contact`}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#C7A348] bg-[rgba(199,163,72,0.1)] px-6 py-3 text-[#C7A348] text-sm font-medium uppercase tracking-wide transition-all duration-200 ease-out hover:bg-[#C7A348] hover:text-white active:scale-[0.98] min-h-[48px]"
            >
              Offerte Aanvragen
            </Link>
            <Link
              href={`${base}/menu`}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#C7A348] bg-[rgba(199,163,72,0.1)] px-6 py-3 text-[#C7A348] text-sm font-medium uppercase tracking-wide transition-all duration-200 ease-out hover:bg-[#C7A348] hover:text-white active:scale-[0.98] min-h-[48px]"
            >
              {tr.common.viewMenu}
            </Link>
          </div>

          <h3 className="font-vibes text-3xl md:text-4xl text-[#C7A348] mb-6 leading-[1.3]">
            Andere cateringmogelijkheden in Den Haag
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link href={`${base}/zaal-huren-den-haag`} className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-[#D4AF37] hover:shadow-lg transition-all">
              <p className="text-[#D4AF37] text-sm font-semibold uppercase tracking-widest mb-2">Zaal Huren</p>
              <p className="text-[#1B2B5E] font-semibold">Zaal huren in Den Haag met Indiaas catering</p>
            </Link>
            <Link href={`${base}/feestzaal-den-haag`} className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-[#D4AF37] hover:shadow-lg transition-all">
              <p className="text-[#D4AF37] text-sm font-semibold uppercase tracking-widest mb-2">Feestzaal</p>
              <p className="text-[#1B2B5E] font-semibold">Feestzaal huren in Den Haag</p>
            </Link>
            <Link href={`${base}/corporate-events-den-haag`} className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-[#D4AF37] hover:shadow-lg transition-all">
              <p className="text-[#D4AF37] text-sm font-semibold uppercase tracking-widest mb-2">Zakelijk</p>
              <p className="text-[#1B2B5E] font-semibold">Corporate events en bedrijfsdinners in Den Haag</p>
            </Link>
            <Link href={`${base}/bruiloft-catering-den-haag`} className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-[#D4AF37] hover:shadow-lg transition-all">
              <p className="text-[#D4AF37] text-sm font-semibold uppercase tracking-widest mb-2">Bruiloft</p>
              <p className="text-[#1B2B5E] font-semibold">Bruiloft catering in Den Haag</p>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
