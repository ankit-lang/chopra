import type { Metadata } from 'next'
import Link from 'next/link'
import JsonLd from '@/components/seo/JsonLd'
import FaqAccordion from '@/components/sections/FaqAccordion'
import VacancyForm from '@/components/sections/VacancyForm'
import { getTranslations, type Locale } from '@/lib/useTranslations'
import { getLocalizedUrl } from '@/lib/utils'
import { getBreadcrumbSchema, getFaqPageSchema } from '@/lib/schema'

type Props = { params: { locale: Locale } }

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'nl' }]
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params
  const titles = {
    en: 'Vacancies at Chopras Indian Restaurant Den Haag | Join Our Team',
    nl: 'Vacatures bij Chopras Indiaas Restaurant Den Haag | Word Onderdeel van Ons Team',
  }
  const descriptions = {
    en: 'Vacature Indiaas restaurant Den Haag. Join Chopras Indian Restaurant as a chef, front-of-house or catering assistant. Apply today at Leyweg 986.',
    nl: 'Vacature Indiaas restaurant Den Haag. Word onderdeel van het Chopras-team als kok, bediening of cateringassistent. Solliciteer vandaag op Leyweg 986.',
  }
  return {
    title: titles[locale],
    description: descriptions[locale],
    alternates: {
      canonical: getLocalizedUrl(locale, 'vacancy'),
      languages: {
        en: getLocalizedUrl('en', 'vacancy'),
        nl: getLocalizedUrl('nl', 'vacancy'),
        'x-default': getLocalizedUrl('en', 'vacancy'),
      },
    },
    openGraph: {
      title: titles[locale],
      description: descriptions[locale],
      url: getLocalizedUrl(locale, 'vacancy'),
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

const jobSchemas = [
  {
    '@context': 'https://schema.org', '@type': 'JobPosting',
    title: 'Kitchen Chef - Indian Cuisine', datePosted: '2026-04-03', validThrough: '2026-12-31',
    description: 'We are looking for an experienced Indian cuisine chef to join our kitchen team at Chopras Indian Restaurant in Den Haag. You will prepare authentic North Indian dishes using traditional spices and a real tandoor clay oven.',
    employmentType: 'FULL_TIME',
    hiringOrganization: { '@type': 'Organization', name: 'Chopras Indian Restaurant', sameAs: 'https://chopras.nl' },
    jobLocation: { '@type': 'Place', address: { '@type': 'PostalAddress', streetAddress: 'Leyweg 986', addressLocality: 'Den Haag', postalCode: '2545 GW', addressCountry: 'NL' } },
  },
  {
    '@context': 'https://schema.org', '@type': 'JobPosting',
    title: 'Front-of-House Server', datePosted: '2026-04-03', validThrough: '2026-12-31',
    description: 'We are looking for a warm and guest-focused front-of-house server to join our team at Chopras Indian Restaurant in Den Haag. You will welcome guests, take orders, and ensure every guest has a memorable experience.',
    employmentType: 'PART_TIME',
    hiringOrganization: { '@type': 'Organization', name: 'Chopras Indian Restaurant', sameAs: 'https://chopras.nl' },
    jobLocation: { '@type': 'Place', address: { '@type': 'PostalAddress', streetAddress: 'Leyweg 986', addressLocality: 'Den Haag', postalCode: '2545 GW', addressCountry: 'NL' } },
  },
  {
    '@context': 'https://schema.org', '@type': 'JobPosting',
    title: 'Event and Catering Assistant', datePosted: '2026-04-03', validThrough: '2026-12-31',
    description: 'We are looking for a reliable and energetic event and catering assistant to support our busy private event hall and catering operation at Chopras Indian Restaurant in Den Haag.',
    employmentType: 'OTHER',
    hiringOrganization: { '@type': 'Organization', name: 'Chopras Indian Restaurant', sameAs: 'https://chopras.nl' },
    jobLocation: { '@type': 'Place', address: { '@type': 'PostalAddress', streetAddress: 'Leyweg 986', addressLocality: 'Den Haag', postalCode: '2545 GW', addressCountry: 'NL' } },
  },
]

const faqsEn = [
  {
    question: 'Is Chopras Indian Restaurant in Den Haag hiring?',
    answer: 'Yes. Chopras Indian Restaurant at Leyweg 986 in Den Haag is actively hiring kitchen chefs, front-of-house staff, and event catering assistants. Rated 4.9 stars from 800+ Google reviews since opening in 2023, Chopras runs service Tuesday to Sunday from 16:30 to 22:30. Applications are open now. Complete the form on this page or email info [at] chopras.nl to apply.',
  },
  {
    question: 'What positions are available at Chopras Indian Restaurant?',
    answer: 'Chopras Indian Restaurant in Den Haag currently has three open positions: a Kitchen Chef (Indian Cuisine) on a full-time or part-time basis, a Front-of-House Server on a flexible part-time schedule, and an Event and Catering Assistant on an event-based flexible schedule. All roles are based at Leyweg 986, Den Haag.',
  },
  {
    question: 'Do I need restaurant experience to apply for a vacature at Chopras?',
    answer: 'For the Kitchen Chef role, experience in North Indian cuisine is preferred and tandoor knowledge is a strong advantage. For the Front-of-House Server position, restaurant experience is a bonus but not required. Personality and genuine care for guests matter more. For the Catering Assistant role, a positive attitude and physical reliability are the main requirements.',
  },
  {
    question: 'What are the working hours for staff at Chopras Indian Restaurant Den Haag?',
    answer: 'Chopras Indian Restaurant is open Tuesday to Sunday from 16:30 to 22:30. Kitchen and front-of-house shifts run in the evenings and at weekends. Event and catering work takes place on an event-by-event basis, including weekends. All shifts are confirmed at least one week in advance.',
  },
  {
    question: 'How do I apply for a vacancy at Chopras Indian Restaurant in Den Haag?',
    answer: 'Complete the application form on this page with your name, contact details, the position you are applying for, and a short cover note. You can also email info [at] chopras.nl directly. We aim to respond to all applications within 3 working days. Chopras Indian Restaurant is located at Leyweg 986, 2545 GW Den Haag.',
  },
]

const faqsNl = [
  {
    question: 'Is Chopras Indian Restaurant in Den Haag op zoek naar personeel?',
    answer: 'Ja. Chopras Indian Restaurant op Leyweg 986 in Den Haag is actief op zoek naar koks, bedieningsmedewerkers en cateringassistenten. Met een 4,9 sterrenbeoordeling van meer dan 800 Google reviews, geopend in 2023, verzorgt Chopras service van dinsdag tot en met zondag van 16:30 tot 22:30. Sollicitaties zijn nu open. Vul het formulier op deze pagina in of mail naar info [at] chopras.nl.',
  },
  {
    question: 'Welke vacatures zijn er bij Chopras Indian Restaurant?',
    answer: 'Chopras Indian Restaurant in Den Haag heeft momenteel drie openstaande functies: een Kok (Indiase Keuken) op fulltime of parttime basis, een Bedieningsmedewerker op flexibele parttime basis, en een Evenementen- en Cateringassistent op flexibele eventbasis. Alle functies zijn gebaseerd op Leyweg 986, Den Haag.',
  },
  {
    question: 'Heb ik restaurantervaring nodig om te solliciteren bij Chopras?',
    answer: 'Voor de koksfunctie is ervaring in de Noord-Indiase keuken gewenst en kennis van de tandoor is een groot voordeel. Voor de bedieningsfunctie is restaurantervaring een plus maar niet vereist. Persoonlijkheid en echte gastvrijheid tellen zwaarder. Voor de cateringassistentfunctie zijn een positieve instelling en betrouwbaarheid de belangrijkste vereisten.',
  },
  {
    question: 'Wat zijn de werktijden bij Chopras Indian Restaurant Den Haag?',
    answer: 'Chopras Indian Restaurant is open van dinsdag tot en met zondag van 16:30 tot 22:30. Keuken- en bedieningsdiensten zijn in de avonden en weekenden. Evenementen- en cateringwerk vindt per evenement plaats, inclusief weekenden. Alle diensten worden minimaal een week van tevoren bevestigd.',
  },
  {
    question: 'Hoe solliciteer ik naar een vacature bij Chopras Indian Restaurant in Den Haag?',
    answer: 'Vul het sollicitatieformulier op deze pagina in met uw naam, contactgegevens, de functie waarnaar u solliciteert en een korte motivatie. U kunt ook rechtstreeks e-mailen naar info [at] chopras.nl. Wij streven ernaar binnen 3 werkdagen op alle sollicitaties te reageren. Chopras Indian Restaurant is gevestigd op Leyweg 986, 2545 GW Den Haag.',
  },
]

export default function LocaleVacancyPage({ params }: Props) {
  const { locale } = params
  const tr = getTranslations(locale)
  const base = locale === 'nl' ? '/nl' : ''
  const isNl = locale === 'nl'

  const vacancies = [
    {
      badge: tr.vacancy.fulltime,
      badgeColor: 'bg-green-100 text-green-800',
      title: tr.vacancy.vacancy1Title,
      schedule: tr.vacancy.vacancy1Schedule,
      desc: tr.vacancy.vacancy1Desc,
      reqs: isNl
        ? ['Ervaring in Noord-Indiase keuken gewenst', 'Kennis van de tandoor is een plus', 'Teamspeler, kalm onder druk', 'Werkvergunning in Nederland']
        : ['Experience in North Indian cuisine preferred', 'Tandoor knowledge a plus', 'Team player, calm under pressure', 'Legal right to work in the Netherlands'],
      bens: isNl
        ? ['Competitief salaris te bespreken', 'Personeelsmaaltijden elke dienst', 'Echte doorgroeimogelijkheden']
        : ['Competitive pay discussed at interview', 'Staff meals every shift', 'Real advancement as we grow'],
    },
    {
      badge: tr.vacancy.parttime,
      badgeColor: 'bg-blue-100 text-blue-800',
      title: tr.vacancy.vacancy2Title,
      schedule: tr.vacancy.vacancy2Schedule,
      desc: tr.vacancy.vacancy2Desc,
      reqs: isNl
        ? ['Gastgericht en van nature warm', 'Communicatie in Nederlands of Engels', 'Betrouwbaar en punctueel', 'Restaurantervaring een plus, niet vereist']
        : ['Guest-focused and naturally warm', 'Dutch or English communication', 'Reliable and punctual', 'Restaurant experience a plus, not required'],
      bens: isNl
        ? ['Fooien', 'Personeelsmaaltijden', 'Flexibele uren']
        : ['Tips', 'Staff meals', 'Flexible hours around your schedule'],
    },
    {
      badge: tr.vacancy.eventBased,
      badgeColor: 'bg-purple-100 text-purple-800',
      title: tr.vacancy.vacancy3Title,
      schedule: tr.vacancy.vacancy3Schedule,
      desc: tr.vacancy.vacancy3Desc,
      reqs: isNl
        ? ['Fysiek in staat tot opzet en afbraak', 'Punctueel en betrouwbaar', 'Flexibele beschikbaarheid inclusief weekenden', 'Positieve houding']
        : ['Physically capable of setup and breakdown work', 'Punctual and reliable', 'Flexible availability including weekends', 'Positive attitude'],
      bens: isNl
        ? ['Uurloon', 'Verscheidenheid aan evenementen', 'Potentieel voor fulltime cateringrol']
        : ['Hourly pay', 'Variety of events and venues', 'Potential to grow into a full-time catering role'],
    },
  ]

  return (
    <>
      {jobSchemas.map((schema, i) => (
        <JsonLd key={i} data={schema as Record<string, unknown>} />
      ))}
      <JsonLd data={getBreadcrumbSchema([
        { name: tr.common.nav.home, item: getLocalizedUrl(locale) },
        { name: tr.common.nav.vacancy, item: getLocalizedUrl(locale, 'vacancy') },
      ])} />
      <JsonLd data={getFaqPageSchema(isNl ? faqsNl : faqsEn)} />

      {/* Hero */}
      <section className="bg-[#1B2B5E] py-24 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-[#C7A348]/40 bg-white/10 backdrop-blur-sm mb-4">
            <span className="text-[#C7A348] text-xs font-medium uppercase tracking-widest">
              • JOIN OUR TEAM · CHOPRAS INDIAN RESTAURANT · DEN HAAG •
            </span>
          </div>
          <h1
            className="font-heading text-4xl md:text-6xl text-white font-bold leading-tight"
            style={{ textShadow: '0 2px 8px rgba(0,0,0,0.6)' }}
          >
            {tr.vacancy.heroH1}
          </h1>
          <p
            className="font-body text-white/85 text-lg mt-4 max-w-2xl mx-auto leading-relaxed"
            style={{ textShadow: '0 1px 4px rgba(0,0,0,0.7)' }}
          >
            {tr.vacancy.heroSub}
          </p>
        </div>
      </section>

      {/* Why Work at Chopras */}
      <section className="bg-[#FFFAF5] py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          {isNl ? (
            <>
              <h2 className="font-vibes text-4xl md:text-5xl text-[#C7A348] mb-6 leading-[1.3]">
                Het best beoordeelde Indiase restaurant van Den Haag groeit
              </h2>
              <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed mb-4">
                Chopras Indian Restaurant opende op Leyweg in 2023 en verdiende een{' '}
                <Link href={`${base}/blog/best-indian-restaurant-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                  4,9 sterrenbeoordeling van meer dan 800 Google reviews
                </Link>{' '}
                sneller dan enig ander Indiaas restaurant in Den Haag. Die beoordeling wordt niet gedragen door één goede week. Het is opgebouwd dienst na dienst door een team dat opkomt, het eten serieus neemt en gasten behandelt zoals zij behandeld willen worden. Als dat uw manier van werken is, hoort u hier.
              </p>
              <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed mb-4">
                De keukenstandaard bij Chopras is specifiek. Hele specerijen worden rechtstreeks uit India betrokken en elke ochtend vers gemalen voordat de eerste bestelling binnenkomt. De{' '}
                <Link href={`${base}/tandoori-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                  tandoor kleioven op Leyweg 986
                </Link>{' '}
                bereikt 400 graden Celsius. Dit is geen verkooppraatje. Het is de reden waarom een Chopras naan kooltjes aan de rand heeft en de chicken tikka een korstje heeft dat geen gewone oven kan geven. Koks die om dit verschil geven, zullen merken dat Chopras voor hen gebouwd is.
              </p>
              <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                Chopras groeit verder dan het restaurant zelf. De{' '}
                <Link href={`${base}/feestzaal-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                  privézaal op Leyweg
                </Link>{' '}
                biedt ruimte voor 25 tot 80 gasten voor diners en recepties. Het{' '}
                <Link href={`${base}/catering`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                  cateringteam
                </Link>{' '}
                bedient evenementen in Den Haag, Rijswijk, Delft en Zoetermeer. Nieuwe functies ontstaan naarmate de activiteiten uitbreiden, en de mensen die nu meedoen zijn degenen die als eerste doorgroeien.
              </p>
            </>
          ) : (
            <>
              <h2 className="font-vibes text-4xl md:text-5xl text-[#C7A348] mb-6 leading-[1.3]">
                Den Haag&apos;s strongly rated Indian restaurant is growing
              </h2>
              <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed mb-4">
                Chopras Indian Restaurant opened on Leyweg in 2023 and earned{' '}
                <Link href={`${base}/blog/best-indian-restaurant-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                  4.9 stars from 800+ Google reviews
                </Link>{' '}
                faster than any other Indian restaurant in Den Haag. That rating is not held up by one good week. It is built service by service by a team that shows up, takes the food seriously, and treats guests the way they want to be treated. If that is how you work, you belong here.
              </p>
              <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed mb-4">
                The kitchen standard at Chopras is specific. Whole spices are sourced directly from India and ground fresh every morning before the first order is placed. The{' '}
                <Link href={`${base}/tandoori-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                  tandoor clay oven at Leyweg 986
                </Link>{' '}
                reaches 400 degrees Celsius. This is not a talking point. It is the reason a Chopras naan has char on the edges and the chicken tikka has a crust no conventional oven can give it. Chefs who care about this difference will find Chopras is built for them.
              </p>
              <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                Chopras is growing beyond the restaurant itself. The{' '}
                <Link href={`${base}/feestzaal-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                  private event hall at Leyweg
                </Link>{' '}
                handles private dinners and receptions for 25 to 80 guests. The{' '}
                <Link href={`${base}/catering`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                  catering team
                </Link>{' '}
                serves events across Den Haag, Rijswijk, Delft, and Zoetermeer. New positions are opening as the operation expands, and the people who join now are the ones who will advance first.
              </p>
            </>
          )}
        </div>
      </section>

      {/* Culture */}
      <section className="bg-[#F7F8FC] py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          {isNl ? (
            <>
              <h2 className="font-vibes text-4xl md:text-5xl text-[#C7A348] mb-6 leading-[1.3]">
                Hoe werken bij Chopras er echt uitziet
              </h2>
              <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed mb-4">
                Werken bij Chopras Indian Restaurant is geen script-volgend werk. Het is deel uitmaken van een keuken- en bedieningsteam dat oprecht geeft om het eten goed te krijgen, gasten welkom te laten voelen en elkaar te steunen op een drukke zaterdagavond. Ons{' '}
                <Link href={`${base}/menu`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                  menu van 143 gerechten
                </Link>{' '}
                omvat Noord-Indiase curry, tandoori en Indiaas streetfood dat echte vakkennis en zorg vereist. Dat is de standaard die wij hanteren, elke dienst.
              </p>
              <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed mb-4">
                Wij zijn geopend in 2023 en groeien, wat betekent echte kansen voor mensen die met ons willen groeien. Onze koks leren elke dag technieken en geven die door. Ons bedieningsteam kent stammegasten binnen een paar weken bij naam. Onze{' '}
                <Link href={`${base}/catering`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                  cateringactiviteiten
                </Link>{' '}
                zijn uitgegroeid tot het bedienen van Den Haag, Rijswijk, Delft en Zoetermeer. Als u blijft, groeit u.
              </p>
              <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                Wij zoeken mensen die trots zijn op hun werk, komen opdagen wanneer zij zeggen dat zij zullen komen en echte energie meebrengen naar een dienst. Houding telt zwaarder dan ervaring. De vaardigheden kunnen wij leren.
              </p>
            </>
          ) : (
            <>
              <h2 className="font-vibes text-4xl md:text-5xl text-[#C7A348] mb-6 leading-[1.3]">
                What working at Chopras actually looks like
              </h2>
              <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed mb-4">
                Working at Chopras Indian Restaurant is not a script-following exercise. It is being part of a kitchen and front-of-house team that genuinely cares about getting the food right, about making guests feel welcome, and about having each other&apos;s backs on a busy Saturday night. Our{' '}
                <Link href={`${base}/menu`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                  menu of 143 dishes
                </Link>{' '}
                spans North Indian curries, tandoori and Indian street food that requires real skill and care. That is the standard we hold ourselves to, every service.
              </p>
              <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed mb-4">
                We opened in 2023 and we are growing, which means real opportunities for people who want to grow with us. Our chefs are learning and passing on techniques every day. Our front-of-house team know regulars by name within a few weeks. Our{' '}
                <Link href={`${base}/catering`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                  catering operation
                </Link>{' '}
                has expanded to serve Den Haag, Rijswijk, Delft, and Zoetermeer. If you stay, you grow.
              </p>
              <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                We want people who take pride in their work, show up when they say they will, and bring actual energy to a shift. Attitude matters more than experience. The skills, we can teach.
              </p>
            </>
          )}
        </div>
      </section>

      {/* Vacancies */}
      <section className="bg-white py-20 px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-[#C7A348] mb-6 leading-[1.3] text-center">
            {tr.vacancy.vacanciesH2}
          </h2>
          <div className="space-y-8 mt-10">
            {vacancies.map((v) => (
              <div key={v.title} className="bg-[#F7F8FC] rounded-2xl p-8 border border-gray-100 shadow-sm">
                <div className="flex flex-wrap items-start gap-4 mb-4">
                  <span className={`${v.badgeColor} text-xs px-3 py-1 rounded-full font-medium`}>
                    {v.badge}
                  </span>
                </div>
                <h3 className="font-vibes text-3xl md:text-4xl text-[#C7A348] mb-2 leading-[1.3]">{v.title}</h3>
                <p className="text-gray-500 text-sm mb-4">{v.schedule}</p>
                <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed mb-6">{v.desc}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-[#1B2B5E] mb-2 text-sm uppercase tracking-wide">
                      {tr.vacancy.requirements}
                    </h4>
                    <ul className="space-y-1.5">
                      {v.reqs.map((req) => (
                        <li key={req} className="flex items-start gap-2 text-gray-600 text-sm">
                          <span className="text-[#D4AF37] mt-0.5">✓</span>
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#1B2B5E] mb-2 text-sm uppercase tracking-wide">
                      {tr.vacancy.benefits}
                    </h4>
                    <ul className="space-y-1.5">
                      {v.bens.map((ben) => (
                        <li key={ben} className="flex items-start gap-2 text-gray-600 text-sm">
                          <span className="text-[#D4AF37] mt-0.5">✓</span>
                          {ben}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GEO Block */}
      <section className="bg-[#FFFAF5] py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          {isNl ? (
            <>
              <h2 className="font-vibes text-4xl md:text-5xl text-[#C7A348] mb-6 leading-[1.3]">
                Is Chopras Indian Restaurant in Den Haag op zoek naar personeel?
              </h2>
              <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                Ja. Chopras Indian Restaurant op Leyweg 986, Den Haag, is actief op zoek naar koks, bedieningsmedewerkers en cateringassistenten. Het restaurant heeft een 4,9 sterrenbeoordeling van meer dan 800 Google reviews en is geopend in 2023. De openingstijden zijn dinsdag tot en met zondag van 16:30 tot 22:30. Bekijk ons{' '}
                <Link href={`${base}/menu`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                  volledig menu van 143 gerechten op Leyweg 986
                </Link>{' '}
                of neem contact op via{' '}
                <Link href={`${base}/contact`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                  Chopras Indian Restaurant Den Haag
                </Link>{' '}
                om te solliciteren of meer te weten te komen.
              </p>
            </>
          ) : (
            <>
              <h2 className="font-vibes text-4xl md:text-5xl text-[#C7A348] mb-6 leading-[1.3]">
                Is Chopras Indian Restaurant in Den Haag hiring?
              </h2>
              <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                Yes. Chopras Indian Restaurant at Leyweg 986, Den Haag, is actively hiring kitchen chefs, front-of-house staff, and event catering assistants. Rated 4.9 stars from 800+ Google reviews since opening in 2023, Chopras runs service Tuesday to Sunday from 16:30 to 22:30. Browse our{' '}
                <Link href={`${base}/menu`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                  full menu of 143 dishes at Leyweg 986
                </Link>{' '}
                or visit{' '}
                <Link href={`${base}/contact`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                  Chopras Indian Restaurant Den Haag
                </Link>{' '}
                to apply or learn more about open positions.
              </p>
            </>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-[#C7A348] mb-6 leading-[1.3] text-center">
            {isNl ? 'Veelgestelde vragen over werken bij Chopras' : 'Frequently Asked Questions About Working at Chopras'}
          </h2>
          <div className="mt-8">
            <FaqAccordion faqs={isNl ? faqsNl : faqsEn} locale={locale} />
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="bg-[#1B2B5E] py-20 px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-white mb-6 leading-[1.3] text-center">
            {tr.vacancy.applyH2}
          </h2>
          <VacancyForm />
        </div>
      </section>

      <nav aria-label="Breadcrumb" className="sr-only">
        <ol>
          <li><Link href={base}>{tr.common.nav.home}</Link></li>
          <li><span>{tr.common.nav.vacancy}</span></li>
        </ol>
      </nav>
    </>
  )
}
