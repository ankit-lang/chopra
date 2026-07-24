import type { Metadata } from 'next'
import Link from 'next/link'
import JsonLd from '@/components/seo/JsonLd'
import FaqAccordion from '@/components/sections/FaqAccordion'
import { getLocalizedUrl } from '@/lib/utils'
import { getLocalRestaurantSchema, getBreadcrumbSchema, getFaqPageSchema, getCateringServiceSchema } from '@/lib/schema'
import { getTranslations, type Locale } from '@/lib/useTranslations'

type Props = { params: { locale: Locale } }

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'nl' }]
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params
  const title = 'Bruiloft Catering Den Haag | Chopras Indian Restaurant'
  const description = 'Bruiloft catering Den Haag bij Chopras Indian Restaurant. Authentiek Indiaas eten voor uw trouwdag. Volledig halal. Vraag een vrijblijvende offerte aan.'
  return {
    title,
    description,
    robots: locale === 'en' ? { index: false, follow: true } : undefined,
    alternates: {
      canonical: getLocalizedUrl(locale, 'bruiloft-catering-den-haag'),
      languages: {
        en: getLocalizedUrl('en', 'bruiloft-catering-den-haag'),
        nl: getLocalizedUrl('nl', 'bruiloft-catering-den-haag'),
        'x-default': getLocalizedUrl('en', 'bruiloft-catering-den-haag'),
      },
    },
    openGraph: {
      title,
      description,
      url: getLocalizedUrl(locale, 'bruiloft-catering-den-haag'),
      images: [{ url: '/og/home-og.jpg', width: 1200, height: 630, alt: 'Bruiloft catering Den Haag bij Chopras Indian Restaurant' }],
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

const faqs = [
  {
    question: 'Hoe ver van tevoren moet ik bruiloft catering boeken?',
    answer: 'Voor een bruiloft van 25 tot 80 gasten raden wij aan om minimaal drie maanden van tevoren contact op te nemen. Dit geeft ons de ruimte om het menu op maat samen te stellen, de logistiek te plannen en ervoor te zorgen dat alles op uw trouwdag vlekkeloos verlopt.',
  },
  {
    question: 'Is de bruiloft catering van Chopras volledig halal?',
    answer: 'Ja, volledig. Chopras Indian Restaurant is volledig halal gecertificeerd. Niet alleen de kip en het lam, maar elke vleesleverancier en elk ingrediënt in onze keuken is halal. Er is geen risico op kruisbesmetting, omdat er nergens op de locatie niet-halal vlees aanwezig is.',
  },
  {
    question: 'Hoeveel gasten kan Chopras bedienen bij een bruiloft?',
    answer: 'Onze privézaal op Leyweg 986 in Den Haag biedt ruimte voor 25 tot 80 gasten. Voor bruiloften op externe locaties in Den Haag, Rijswijk, Delft en omgeving verzorgen wij ook volledige catering. Neem contact op voor een offerte op maat.',
  },
  {
    question: 'Welke gerechten zijn het meest populair bij Indiaas bruiloft catering Den Haag?',
    answer: 'De meest gevraagde gerechten zijn biryani, butter chicken, mutton rogan josh, dal makhani en tandoori gegrilde gerechten. Wij stellen altijd een gebalanceerd menu samen met zowel vegetarische als vleesgerechten, zodat alle gasten ruim keuze hebben.',
  },
  {
    question: 'Kan ik ook de feestzaal bij Chopras huren voor mijn bruiloft?',
    answer: 'Ja. De privézaal van Chopras Indian Restaurant op Leyweg 986 in Den Haag is beschikbaar voor bruiloften, nikah-recepties en trouwfeesten. U kunt de zaal combineren met ons volledige cateringpakket voor een totaaloplossing op één locatie.',
  },
]

export default function BruiloftCateringPage({ params }: Props) {
  const { locale } = params
  const tr = getTranslations(locale)
  const base = locale === 'nl' ? '/nl' : ''

  return (
    <>
      <JsonLd data={getCateringServiceSchema(locale)} />
      <JsonLd data={getLocalRestaurantSchema(locale, ['Den Haag'], getLocalizedUrl(locale, 'bruiloft-catering-den-haag'))} />
      <JsonLd
        data={getBreadcrumbSchema([
          { name: tr.common.nav.home, item: getLocalizedUrl(locale) },
          { name: 'Bruiloft Catering', item: getLocalizedUrl(locale, 'bruiloft-catering-den-haag') },
        ])}
      />
      <JsonLd data={getFaqPageSchema(faqs)} />

      {/* Hero */}
      <section className="btn-gradient py-20 px-6 md:px-16 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-white/40 bg-white/10 backdrop-blur-sm mb-6">
            <span className="text-white text-xs font-medium uppercase tracking-widest">
              CATERING · CHOPRAS INDIAN RESTAURANT · DEN HAAG
            </span>
          </div>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight">
            Bruiloft Catering Den Haag
          </h1>
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-white/40" />
            <span className="text-white/90 text-lg">✦</span>
            <div className="h-[1px] w-16 bg-gradient-to-l from-white/40 to-transparent" />
          </div>
          <p className="font-body text-white/85 text-lg md:text-xl mt-6 mb-8 max-w-2xl mx-auto leading-relaxed">
            Authentiek Indiaas eten voor uw trouwdag. Volledig halal gecertificeerd. Wij verzorgen de catering, u geniet van de dag.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`${base}/contact`}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white bg-white/10 px-6 py-3 text-white text-sm font-medium uppercase tracking-wide transition-all duration-200 ease-out active:scale-[0.98] min-h-[48px] backdrop-blur-[10px]"
            >
              Offer Aanvragen
            </Link>
            <Link
              href={`${base}/menu`}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white bg-white/10 px-6 py-3 text-white text-sm font-medium uppercase tracking-wide transition-all duration-200 ease-out active:scale-[0.98] min-h-[48px] backdrop-blur-[10px]"
            >
              Bekijk Menu
            </Link>
          </div>
        </div>
      </section>

      {/* Intro section */}
      <section className="bg-white py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-4xl md:text-5xl text-[#06068a] mb-6 leading-[1.3]">
            Authentiek Indiaas Eten voor Uw Trouwdag in Den Haag
          </h2>
          <div className="space-y-6 font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
            <p>
              Uw trouwdag is een van de belangrijkste dagen in uw leven. Het eten op uw receptie of feest hoort onvergetelijk te zijn — niet alleen lekker, maar authentiek, rijk van smaak en tot in de puntjes verzorgd. Chopras Indian Restaurant op Leyweg 986 in Den Haag verzorgt bruiloft catering die precies dat biedt.
            </p>
            <p>
              Van intieme bruiloftsdiners tot uitgebreide buffetten voor tientallen gasten: onze keuken bereidt elk gerecht met specerijen die elke ochtend vers worden gemalen van hele ingrediënten rechtstreeks uit India. Geen halffabrikaten, geen concessies.
            </p>
          </div>
        </div>
      </section>

      {/* Proof section */}
      <section className="btn-gradient py-20 px-6 md:px-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-4xl md:text-5xl text-white mb-6 leading-[1.3]">
            Waarom Kiezen voor Chopras Bruiloft Catering?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-10">
            <div className="bg-white/10 rounded-xl p-6 border border-white/30">
              <p className="font-heading text-3xl text-white mb-3 leading-[1.3]">Volledig Halal</p>
              <p className="font-body text-white/85 text-base leading-relaxed">
                Elk vleesgerecht en elk ingrediënt is 100% halal gecertificeerd. Geen risico op kruisbesmetting.
              </p>
            </div>
            <div className="bg-white/10 rounded-xl p-6 border border-white/30">
              <p className="font-heading text-3xl text-white mb-3 leading-[1.3]">4.9 Sterren</p>
              <p className="font-body text-white/85 text-base leading-relaxed">
                Meer dan 1100 geverifieerde gasten beoordelen ons eten en service met een 4.9 op Google.
              </p>
            </div>
            <div className="bg-white/10 rounded-xl p-6 border border-white/30">
              <p className="font-heading text-3xl text-white mb-3 leading-[1.3]">Eigen Feestzaal</p>
              <p className="font-body text-white/85 text-base leading-relaxed">
                Privézaal op Leyweg 986 voor 25 tot 80 gasten. Zaal huren én catering op één locatie.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Menu options section */}
      <section className="bg-[#FFFAF5] py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-4xl md:text-5xl text-[#06068a] mb-6 leading-[1.3]">
            Onze Populairste Bruiloft Catering Gerechten
          </h2>
          <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed mb-8">
            Wij stellen het bruiloftsmenu altijd samen in overleg met u. Hier zijn de gerechten die het meest gekozen worden door bruidsparen in Den Haag:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="font-heading text-2xl text-[#06068a] mb-2 leading-[1.3]">
                <Link href={`${base}/biryani-den-haag`} className="hover:text-[#0000B3] transition-colors">
                  Biryani Den Haag
                </Link>
              </h3>
              <p className="font-body text-[#1A1A1A]/70 text-base leading-relaxed">
                Geurige basmatirijst met saffraan en vers gemalen specerijen, langzaam gegaard met halal kip, lamsvlees of groenten. Een feestelijk hoofdgerecht dat op geen enkele bruiloft mag ontbreken.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="font-heading text-2xl text-[#06068a] mb-2 leading-[1.3]">
                <Link href={`${base}/butter-chicken-den-haag`} className="hover:text-[#0000B3] transition-colors">
                  Butter Chicken Den Haag
                </Link>
              </h3>
              <p className="font-body text-[#1A1A1A]/70 text-base leading-relaxed">
                Tandoori-gegrilde halal kip in een milde, romige tomaat-botersaus. Het populairste gerecht op elk evenement, geliefd bij zowel jong als oud.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="font-heading text-2xl text-[#06068a] mb-2 leading-[1.3]">
                <Link href={`${base}/mutton-rogan-josh-den-haag`} className="hover:text-[#0000B3] transition-colors">
                  Mutton Rogan Josh
                </Link>
              </h3>
              <p className="font-body text-[#1A1A1A]/70 text-base leading-relaxed">
                Mals halal lamsvlees in een diepe, kruidige Kasjmirse curry. Langzaam gegaard voor maximale smaak en zachtheid.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="font-heading text-2xl text-[#06068a] mb-2 leading-[1.3]">
                <Link href={`${base}/dal-makhani-den-haag`} className="hover:text-[#0000B3] transition-colors">
                  Dal Makhani Den Haag
                </Link>
              </h3>
              <p className="font-body text-[#1A1A1A]/70 text-base leading-relaxed">
                Zwarte linzen die een hele nacht langzaam hebben gesudderd met boter en room. Rijk, romig en onmisbaar op een Noord-Indiaas bruiloftsbanket.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="font-heading text-2xl text-[#06068a] mb-2 leading-[1.3]">
                <Link href={`${base}/tandoori-den-haag`} className="hover:text-[#0000B3] transition-colors">
                  Tandoori Specialiteiten
                </Link>
              </h3>
              <p className="font-body text-[#1A1A1A]/70 text-base leading-relaxed">
                Kip tikka, seekh kabab en paneer tikka vers uit onze 400-graden tandoor kleioven. Rokerig, saftig en vol smaak.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="font-heading text-2xl text-[#06068a] mb-2 leading-[1.3]">
                <Link href={`${base}/naan-den-haag`} className="hover:text-[#0000B3] transition-colors">
                  Vers Tandoori Brood
                </Link>
              </h3>
              <p className="font-body text-[#1A1A1A]/70 text-base leading-relaxed">
                Garlic naan, butter naan en roti, vers gebakken in de kleioven en warm geserveerd aan uw gasten.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Internal links / Location section */}
      <section className="bg-white py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-4xl md:text-5xl text-[#06068a] mb-6 leading-[1.3]">
            Catering op Locatie of in Onze Feestzaal in Den Haag
          </h2>
          <div className="space-y-6 font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
            <p>
              Chopras biedt twee mogelijkheden voor uw bruiloft catering:
            </p>
            <ul className="list-disc pl-6 space-y-3">
              <li>
                <strong>Catering op uw eigen locatie:</strong> Wij leveren het eten warm en serveerklaar af op uw feestlocatie in Den Haag, <Link href={`${base}/indian-restaurant-rijswijk`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">Rijswijk</Link>, <Link href={`${base}/indian-restaurant-delft`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">Delft</Link>, <Link href={`${base}/indian-restaurant-zoetermeer`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">Zoetermeer</Link> of omliggende steden.
              </li>
              <li>
                <strong>Feestzaal huren op Leyweg 986:</strong> Onze sfeervolle <Link href={`${base}/feestzaal-den-haag`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">feestzaal in Den Haag</Link> is geschikt voor 25 tot 80 gasten. Ideaal voor bruiloftsfeesten, nikah-recepties en familiebanketten.
              </li>
            </ul>
            <p>
              Wilt u ook andere cateringmogelijkheden verkennen? Bekijk ons overzicht voor <Link href={`${base}/catering`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">Indiaas catering Den Haag</Link>, <Link href={`${base}/indian-birthday-catering-den-haag`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">verjaardagscatering</Link> of <Link href={`${base}/corporate-events-den-haag`} className="text-[#06068a] hover:text-[#0000B3] font-semibold">zakelijke catering</Link>.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ section */}
      <section className="bg-white py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-4xl md:text-5xl text-[#06068a] mb-6 leading-[1.3]">
            Veelgestelde Vragen Over Bruiloft Catering Den Haag
          </h2>
          <FaqAccordion faqs={faqs} locale={locale} />
        </div>
      </section>

      {/* CTA section */}
      <section className="btn-gradient py-20 px-6 md:px-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-4xl md:text-5xl text-white mb-6 leading-[1.3]">
            Vraag een Vrijblijvende Offerte Aan
          </h2>
          <p className="font-body text-white/85 text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
            Vertel ons uw wensen, het aantal gasten en de datum. Wij nemen binnen 24 uur contact met u op met een voorstel op maat.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`${base}/contact`}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white bg-white/10 px-6 py-3 text-white text-sm font-medium uppercase tracking-wide transition-all duration-200 ease-out active:scale-[0.98] min-h-[48px] backdrop-blur-[10px]"
            >
              Neem Contact Op
            </Link>
            <Link
              href={`${base}/menu`}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white bg-white/10 px-6 py-3 text-white text-sm font-medium uppercase tracking-wide transition-all duration-200 ease-out active:scale-[0.98] min-h-[48px] backdrop-blur-[10px]"
            >
              Bekijk Menukaart
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
