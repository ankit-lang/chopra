import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import JsonLd from '@/components/seo/JsonLd'
import { getLocalizedUrl } from '@/lib/utils'
import { getLocalRestaurantSchema, getBreadcrumbSchema, getFaqPageSchema, getCateringServiceSchema } from '@/lib/schema'
import { getTranslations, type Locale } from '@/lib/useTranslations'
import FaqAccordion from '@/components/sections/FaqAccordion'

type Props = { params: { locale: Locale } }

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'nl' }]
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params
  const titles = {
    en: 'Indian Birthday Catering Den Haag | Chopras Indian Restaurant',
    nl: 'Indiaas Verjaardagseten Den Haag | Chopras Indian Restaurant',
  }
  const descriptions = {
    en: 'Indian birthday catering Den Haag by Chopras Indian Restaurant. Authentic food delivered hot to your party. Halal certified. Book your catering today.',
    nl: 'Indiaas verjaardagseten Den Haag bij Chopras Indian Restaurant. Vers eten bezorgd voor je feest. Halal gecertificeerd. Boek je catering vandaag.',
  }
  return {
    title: titles[locale],
    description: descriptions[locale],
    alternates: {
      canonical: getLocalizedUrl(locale, 'indian-birthday-catering-den-haag'),
      languages: {
        en: getLocalizedUrl('en', 'indian-birthday-catering-den-haag'),
        nl: getLocalizedUrl('nl', 'indian-birthday-catering-den-haag'),
        'x-default': getLocalizedUrl('en', 'indian-birthday-catering-den-haag'),
      },
    },
    openGraph: {
      title: titles[locale],
      description: descriptions[locale],
      url: getLocalizedUrl(locale, 'indian-birthday-catering-den-haag'),
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
    question: 'How many guests can Chopras cater for a birthday in Den Haag?',
    answer: 'Chopras Indian Restaurant caters birthday celebrations for groups of 25 to 80 guests. Our private hall at Leyweg 986, Den Haag is also available for parties that want to dine on site rather than have food delivered to a separate venue.',
  },
  {
    question: 'Is the birthday catering food halal certified?',
    answer: 'Yes. Every dish at Chopras Indian Restaurant is prepared in a fully halal-certified kitchen. Every meat supplier is halal certified. There is no cross-contamination risk because there is no non-halal meat anywhere on the premises. This is not a halal menu section — it is the entire kitchen.',
  },
  {
    question: 'How far in advance should I book birthday catering in Den Haag?',
    answer: 'We recommend booking at least one week in advance for birthday catering. For larger groups of 50 or more guests, two weeks notice gives us time to source everything we need and prepare at full quality. Contact us to check availability for your date.',
  },
  {
    question: 'Can Chopras deliver birthday catering outside Den Haag?',
    answer: 'Yes. Chopras Indian Restaurant delivers birthday catering to Den Haag, Rijswijk, Delft, Zoetermeer, Voorburg, and Leidschendam. If your location is in or near South Holland, send us a message and we will confirm availability for your area.',
  },
  {
    question: 'What Indian food works best for a birthday party?',
    answer: 'Biryani works well for large groups because it is a complete, crowd-pleasing dish that travels well. Tandoori platters add variety and visual impact at the table. For a full birthday spread, we recommend a curry alongside fresh-baked naan. We build the menu with you based on your guest count and preferences.',
  },
]

const faqsNl: Array<{ question: string; answer: string }> = [
  {
    question: 'Voor hoeveel gasten kan Chopras cateren voor een verjaardag in Den Haag?',
    answer: 'Chopras Indian Restaurant verzorgt verjaardagsfeesten voor groepen van 25 tot 80 gasten. Onze feestzaal op Leyweg 986, Den Haag is ook beschikbaar voor feesten die ter plaatse willen dineren in plaats van eten te laten bezorgen naar een aparte locatie.',
  },
  {
    question: 'Is het verjaardagseten halal gecertificeerd?',
    answer: 'Ja. Elk gerecht bij Chopras Indian Restaurant wordt bereid in een volledig halal-gecertificeerde keuken. Elke vleesleverancier is halal gecertificeerd. Er is geen risico op kruisbesmetting omdat er nergens op het terrein niet-halal vlees aanwezig is. Dit is geen halal sectie op het menu - het is de hele keuken.',
  },
  {
    question: 'Hoe ver van tevoren moet ik verjaardagseten in Den Haag boeken?',
    answer: 'Wij raden aan minimaal een week van tevoren te boeken voor verjaardagseten. Voor grotere groepen van 50 of meer gasten geeft twee weken opzegtermijn ons de tijd om alles op volle kwaliteit voor te bereiden. Neem contact met ons op om de beschikbaarheid voor jouw datum te controleren.',
  },
  {
    question: 'Kan Chopras verjaardagseten bezorgen buiten Den Haag?',
    answer: 'Ja. Chopras Indian Restaurant bezorgt verjaardagseten naar Den Haag, Rijswijk, Delft, Zoetermeer, Voorburg en Leidschendam. Als jouw locatie in of nabij Zuid-Holland ligt, stuur ons een bericht en wij bevestigen de beschikbaarheid voor jouw gebied.',
  },
  {
    question: 'Welk Indiaas eten werkt het beste voor een verjaardagsfeest?',
    answer: 'Biryani werkt goed voor grote groepen omdat het een compleet, geliefd gerecht is dat goed te transporteren is. Tandoori schotels voegen variatie en visuele impact toe aan tafel. Voor een volledig feestelijk menu raden wij een curry aan naast vers gebakken naan. Wij stellen het menu met je samen op basis van jouw aantal gasten en voorkeuren.',
  },
]

export default function IndianBirthdayCateringPage({ params }: Props) {
  const { locale } = params
  const tr = getTranslations(locale)
  const base = locale === 'nl' ? '/nl' : ''
  const isNl = locale === 'nl'

  return (
    <>
      <JsonLd data={getCateringServiceSchema(locale)} />
      <JsonLd data={getLocalRestaurantSchema(locale, ['Den Haag'], getLocalizedUrl(locale, 'indian-birthday-catering-den-haag'))} />
      <JsonLd data={getBreadcrumbSchema([
        { name: tr.common.nav.home, item: getLocalizedUrl(locale) },
        { name: isNl ? 'Verjaardagseten' : 'Birthday Catering', item: getLocalizedUrl(locale, 'indian-birthday-catering-den-haag') },
      ])} />
      <JsonLd data={getFaqPageSchema(isNl ? faqsNl : faqsEn)} />

      {/* HERO */}
      <section className="relative min-h-[60vh] flex items-center justify-center bg-[#1B2B5E]">
        <div className="absolute inset-0">
          <Image
            src="/images/catering/birthday-party.png"
            alt="Indian birthday catering Den Haag at Chopras Indian Restaurant"
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#1B2B5E]/60 via-[#1B2B5E]/40 to-[#1B2B5E]/75" />
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto py-20">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-white/40 bg-white/10 backdrop-blur-sm mb-4">
            <span className="text-white text-xs font-medium uppercase tracking-widest">
              • CATERING · CHOPRAS INDIAN RESTAURANT · DEN HAAG •
            </span>
          </div>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-6 leading-tight">
            {isNl ? 'Indiaas Verjaardagseten Den Haag' : 'Indian Birthday Catering Den Haag'}
          </h1>
          <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto">
            {isNl
              ? 'Wij regelen het eten. Jij geniet van je eigen feest. Vers bereid, halal gecertificeerd, bezorgd tot aan de deur.'
              : 'We handle the food. You enjoy your own party. Fresh-made, halal certified, delivered to your door.'}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`${base}/contact`}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white bg-white/10 px-6 py-3 text-white text-sm font-medium uppercase tracking-wide transition-all duration-200 ease-out hover:bg-[rgba(199,163,72,0.3)] active:scale-[0.98] min-h-[48px] backdrop-blur-[10px]"
            >
              {isNl ? 'Offerte Aanvragen' : 'Request a Quote'}
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

      {/* INTRO */}
      <section className="bg-[#FFFAF5] py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-6 leading-[1.3]">
            {isNl ? 'Indiaas Verjaardagseten in Den Haag' : 'Indian Birthday Catering in Den Haag'}
          </h2>
          {isNl ? (
            <div className="space-y-5 font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
              <p>
                De meeste verjaardagsgastheren brengen hun eigen feest door in de keuken. Eten opwarmen, containers controleren, gasten vragen om te wachten. Tegen de tijd dat het eten op tafel staat, is het moment al voorbij. Met Indiaas verjaardagseten van Chopras Indian Restaurant is dat verleden tijd.
              </p>
              <p>
                Wij regelen alles van keuken tot tafel. De kruiden worden vers gemalen in onze keuken op Leyweg 986, dezelfde ochtend als jouw catering wordt bereid. De{' '}
                <Link href={`${base}/biryani-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">biryani</Link>,
                de <Link href={`${base}/tandoori-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">tandoori gerechten</Link>,
                de curry&apos;s worden bereid volgens dezelfde standaard als het eten dat wij in het restaurant serveren. Omdat het ook echt hetzelfde is.
              </p>
              <p>
                Chopras Indian Restaurant heeft 4.9 sterren van meer dan 800 geverifieerde Google-recensies. Die beoordeling is opgebouwd gerecht voor gerecht, feest voor feest. Als wij{' '}
                <Link href={`${base}/catering`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">verjaardagseten in Den Haag</Link>{' '}
                verzorgen, gaan dezelfde keuken en dezelfde standaard mee.
              </p>
            </div>
          ) : (
            <div className="space-y-5 font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
              <p>
                Most birthday hosts spend their own party in the kitchen. Reheating food, checking containers, telling guests to wait. By the time the food is out, the moment has already passed. Indian birthday catering from Chopras Indian Restaurant changes that completely.
              </p>
              <p>
                We handle everything from kitchen to table. The spices are ground fresh in our kitchen at Leyweg 986, the same morning your catering is prepared. The{' '}
                <Link href={`${base}/biryani-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">biryani</Link>,
                the <Link href={`${base}/tandoori-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">tandoori dishes</Link>,
                the curries are cooked to the same standard as the food we serve inside the restaurant. Because they are.
              </p>
              <p>
                Chopras Indian Restaurant has 4.9 stars from over 800 verified Google reviews. That rating was built dish by dish, celebration by celebration. When we provide{' '}
                <Link href={`${base}/catering`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">birthday catering in Den Haag</Link>,
                the same kitchen and the same standard comes with us.
              </p>
            </div>
          )}
          <Image
            src="/images/catering/birthday-party---2.png"
            alt="Birthday party catering at Chopras Indian Restaurant Den Haag"
            width={800}
            height={500}
            className="rounded-2xl w-full object-cover mt-10"
          />
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-white py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-6 leading-[1.3]">
            {isNl ? 'Hoe Verjaardagseten bij Chopras Werkt' : 'How Birthday Catering at Chopras Works'}
          </h2>
          {isNl ? (
            <div className="space-y-8 font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
              <div>
                <h3 className="font-vibes text-3xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-4">Stap 1 - Neem Contact Op</h3>
                <p>
                  Stuur ons een bericht of bel ons. Vertel ons de datum, het aantal gasten, en eventuele dieetwensen.{' '}
                  <Link href={`${base}/halal-food-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">Halal gecertificeerd</Link>{' '}
                  bij elke bestelling als standaard.{' '}
                  <Link href={`${base}/vegan-menu`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">Veganistische opties</Link>{' '}
                  beschikbaar als dat nodig is.
                </p>
              </div>
              <div>
                <h3 className="font-vibes text-3xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-4">Stap 2 - Kies je Menu</h3>
                <p>
                  We stellen een menu samen rond jouw viering. Biryani, curry&apos;s, tandoori schotels, brood, bijgerechten. Van 25 gasten tot 80, wij hebben evenementen van elke omvang verzorgd vanuit onze{' '}
                  <Link href={`${base}/feestzaal-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">feestzaal in Den Haag</Link>{' '}
                  en bezorgd door de hele regio.
                </p>
              </div>
              <div>
                <h3 className="font-vibes text-3xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-4">Stap 3 - Aanwezig en Genieten</h3>
                <p>
                  Wij komen voor je gasten aan. Het eten staat warm en klaar. Jij begroet mensen, jij viert, jij geniet van de verjaardag. De jarige kan eindelijk zijn of haar eigen feest beleven zonder in de keuken te staan.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-8 font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
              <div>
                <h3 className="font-vibes text-3xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-4">Step 1 - Get in Touch</h3>
                <p>
                  Send us a message or call us. Tell us the date, the number of guests, and any dietary requirements.{' '}
                  <Link href={`${base}/halal-food-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">Halal certified</Link>{' '}
                  on every order as standard.{' '}
                  <Link href={`${base}/vegan-menu`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">Vegan options</Link>{' '}
                  available if needed.
                </p>
              </div>
              <div>
                <h3 className="font-vibes text-3xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-4">Step 2 - Choose Your Menu</h3>
                <p>
                  We build a menu around your celebration. Biryani, curries, tandoori platters, bread, sides. From 25 guests to 80, we have catered events of every size from our{' '}
                  <Link href={`${base}/feestzaal-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">private hall in Den Haag</Link>{' '}
                  and delivered across the region.
                </p>
              </div>
              <div>
                <h3 className="font-vibes text-3xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-4">Step 3 - Arrive and Eat</h3>
                <p>
                  We arrive before your guests do. The food is set up hot and ready. You greet people, you celebrate, you enjoy the birthday. The birthday person can finally experience their own party without standing in the kitchen.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* THE FOOD */}
      <section className="bg-[#FFFAF5] py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-6 leading-[1.3]">
            {isNl ? 'Wat Wij Naar je Verjaardag Brengen' : 'What We Bring to Your Birthday'}
          </h2>
          {isNl ? (
            <div className="space-y-5 font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
              <p>
                Het{' '}
                <Link href={`${base}/menu`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">volledige menu</Link>{' '}
                bij Chopras Indian Restaurant omvat 143 gerechten in 13 categorieën. Voor verjaardagseten in Den Haag stellen we een selectie samen die werkt voor een groep. Dat betekent populaire gerechten met diepgang: biryani in grote bakken, tandoori schotels vers uit de kleiovens, rijke Noord-Indiase curry&apos;s, en brood dat nog stoomt als het wordt opengemaakt.
              </p>
              <p>
                Elk vlees op het catering menu is afkomstig van{' '}
                <Link href={`${base}/halal-food-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">halal-gecertificeerde leveranciers</Link>.
                Niet sommige gerechten. Allemaal. Dit maakt ons verjaardagseten de juiste keuze voor gemengde groepen waarbij sommige gasten alleen halal eten.
              </p>
              <p>
                Gasten die geen vlees eten zijn volledig gedekt. Het{' '}
                <Link href={`${base}/vegan-menu`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">veganistische menu</Link>{' '}
                bij Chopras omvat dal makhani, soya chaap en chaat. Dit zijn geen bijzaken. Het zijn gerechten waarvoor gasten speciaal naar het restaurant komen.
              </p>
            </div>
          ) : (
            <div className="space-y-5 font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
              <p>
                The{' '}
                <Link href={`${base}/menu`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">full menu</Link>{' '}
                at Chopras Indian Restaurant spans 143 dishes across 13 categories. For birthday catering in Den Haag, we build a selection that works for a crowd. That means crowd-pleasers with genuine depth: biryani in large tray format, tandoori platters fresh from the clay oven, rich North Indian curries, and bread hot enough to steam when opened.
              </p>
              <p>
                Every meat on the catering menu is sourced from{' '}
                <Link href={`${base}/halal-food-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">halal-certified suppliers</Link>.
                Not some dishes. All of them. This makes our birthday catering the right choice for mixed groups where some guests only eat halal food.
              </p>
              <p>
                Guests who do not eat meat are fully covered. The{' '}
                <Link href={`${base}/vegan-menu`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">vegan menu</Link>{' '}
                at Chopras includes dal makhani, soya chaap, and chaat. These are not afterthoughts. They are dishes that guests specifically come to the restaurant for.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* PROOF - DARK */}
      <section className="bg-[#1B2B5E] py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-6 leading-[1.3]">
            {isNl
              ? 'Waarom 800+ Gasten Chopras Vertrouwen voor hun Feesten'
              : 'Why 800+ Guests Trust Chopras for Their Celebrations'}
          </h2>
          {isNl ? (
            <div className="space-y-5 font-body text-white/80 text-lg leading-relaxed">
              <p>
                <strong className="text-white">4.9 sterren van meer dan 800 geverifieerde Google-recensies.</strong>{' '}
                Dat is geen recente boost. Dat is de consistente beoordeling van een restaurant dat zijn standaard heeft gehandhaafd vanaf de eerste dag van dienst in 2023.
              </p>
              <p>
                De kruiden voor elk gerecht worden rechtstreeks uit India gehaald en elke ochtend vers gemalen in onze keuken. De vluchtige aromatische oliën in komijn, kardemom en koriander beginnen binnen enkele uren na het malen te vervagen. Dit is waarom het eten bij Chopras anders smaakt. Niet beter op papier. Anders op het bord.
              </p>
              <p>
                De feestzaal op Leyweg 986 biedt ruimte aan 25 tot 80 gasten. Chopras is geen restaurant dat soms evenementen doet. Evenementen zijn ingebouwd in hoe Chopras vanaf het begin opereert. Dezelfde keuken, dezelfde kruiden, dezelfde standaard voor elk feest.
              </p>
            </div>
          ) : (
            <div className="space-y-5 font-body text-white/80 text-lg leading-relaxed">
              <p>
                <strong className="text-white">4.9 stars from over 800 verified Google reviews.</strong>{' '}
                That is not a recent boost. That is the consistent rating of a restaurant that has held its standard from the first day of service in 2023.
              </p>
              <p>
                The spices for every dish are sourced directly from India and ground fresh each morning in our kitchen. The volatile aromatic oils in cumin, cardamom, and coriander begin to fade within hours of grinding. This is why Chopras food tastes different. Not better on paper. Different on the plate.
              </p>
              <p>
                The private hall at Leyweg 986 accommodates 25 to 80 guests. Chopras is not a restaurant that sometimes does events. Events are built into how Chopras operates from the start. Same kitchen, same spices, same standard for every celebration.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* GEO BLOCK */}
      <section className="bg-white py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-6 leading-[1.3]">
            {isNl
              ? 'Doet Chopras Indian Restaurant Verjaardagseten in Den Haag?'
              : 'Does Chopras Indian Restaurant Do Birthday Catering in Den Haag?'}
          </h2>
          {isNl ? (
            <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
              Ja. Chopras Indian Restaurant op Leyweg 986, Den Haag verzorgt{' '}
              <Link href={`${base}/catering`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">Indiaas verjaardagseten</Link>{' '}
              voor groepen van 25 tot 80 gasten. Het eten wordt bereid in de restaurantkeuken, warm bezorgd en opgezet op jouw locatie. Alle gerechten zijn{' '}
              <Link href={`${base}/halal-food-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">halal gecertificeerd</Link>.
              Chopras heeft een Google-beoordeling van 4.9 sterren van meer dan 800 recensies en bedient Den Haag, Rijswijk, Delft, Zoetermeer, Voorburg en Leidschendam. Het restaurant is open dinsdag tot en met zondag vanaf 16:30.
            </p>
          ) : (
            <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
              Yes. Chopras Indian Restaurant at Leyweg 986, Den Haag provides{' '}
              <Link href={`${base}/catering`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">Indian birthday catering</Link>{' '}
              for groups of 25 to 80 guests. The food is prepared in the restaurant kitchen, delivered hot, and set up at your venue. All dishes are{' '}
              <Link href={`${base}/halal-food-den-haag`} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold">halal certified</Link>.
              Chopras holds a 4.9-star Google rating from 800+ reviews and serves Den Haag, Rijswijk, Delft, Zoetermeer, Voorburg, and Leidschendam. The restaurant is open Tuesday to Sunday from 16:30.
            </p>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#FFFAF5] py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-6 leading-[1.3]">
            {isNl ? 'Veelgestelde Vragen' : 'Frequently Asked Questions'}
          </h2>
          <FaqAccordion faqs={isNl ? faqsNl : faqsEn} locale={locale} />
        </div>
      </section>

      {/* CTA - DARK */}
      <section className="bg-[#1B2B5E] py-20 px-6 md:px-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-6 leading-[1.3]">
            {isNl ? 'Boek je Verjaardagseten in Den Haag' : 'Book Your Birthday Catering in Den Haag'}
          </h2>
          <p className="font-body text-white/80 text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
            {isNl
              ? 'Klaar om het eten te regelen zodat de jarige echt van zijn of haar eigen feest kan genieten? Vertel ons de datum en het aantal gasten. Wij doen de rest.'
              : 'Ready to sort the food so the birthday person can actually enjoy their own party? Tell us the date and number of guests. We handle the rest.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`${base}/contact`}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] px-6 py-3 text-white text-sm font-medium uppercase tracking-wide transition-all duration-200 ease-out hover:bg-transparent hover:text-white active:scale-[0.98] min-h-[48px]"
            >
              {isNl ? 'Offerte Aanvragen' : 'Request a Quote'}
            </Link>
            <Link
              href={`${base}/indian-wedding-catering-den-haag`}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white bg-white/10 px-6 py-3 text-white text-sm font-medium uppercase tracking-wide transition-all duration-200 ease-out hover:bg-[rgba(199,163,72,0.3)] active:scale-[0.98] min-h-[48px] backdrop-blur-[10px]"
            >
              {isNl ? 'Bruiloft Catering' : 'Wedding Catering'}
            </Link>
          </div>
        </div>
      </section>

      {/* OTHER CATERING OPTIONS */}
      <section className="bg-white py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-6 leading-[1.3] text-center">
            {isNl ? 'Andere Cateringmogelijkheden' : 'Other Catering Options'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
            <Link
              href={`${base}/indian-wedding-catering-den-haag`}
              className="block p-6 bg-[#FFFAF5] rounded-lg border border-gray-200 hover:border-white hover:shadow-lg transition-all"
            >
              <p className="text-white text-sm font-semibold uppercase tracking-widest mb-2">{isNl ? 'Bruiloft' : 'Wedding'}</p>
              <p className="text-[#1B2B5E] font-semibold">{isNl ? 'Nikah-recepties en bruiloftsfestiviteiten' : 'Nikah receptions and wedding festivities'}</p>
            </Link>
            <Link
              href={`${base}/corporate-events-den-haag`}
              className="block p-6 bg-[#FFFAF5] rounded-lg border border-gray-200 hover:border-white hover:shadow-lg transition-all"
            >
              <p className="text-white text-sm font-semibold uppercase tracking-widest mb-2">{isNl ? 'Zakelijk' : 'Corporate'}</p>
              <p className="text-[#1B2B5E] font-semibold">{isNl ? 'Bedrijfsdiners en teamvieringen' : 'Corporate dinners and team celebrations'}</p>
            </Link>
            <Link
              href={`${base}/feestzaal-den-haag`}
              className="block p-6 bg-[#FFFAF5] rounded-lg border border-gray-200 hover:border-white hover:shadow-lg transition-all"
            >
              <p className="text-white text-sm font-semibold uppercase tracking-widest mb-2">{isNl ? 'Feestzaal' : 'Event Space'}</p>
              <p className="text-[#1B2B5E] font-semibold">{isNl ? 'Verjaardagsfeest locatie Den Haag' : 'Birthday party venue Den Haag'}</p>
            </Link>
            <Link
              href={`${base}/diwali-dinner-den-haag`}
              className="block p-6 bg-[#FFFAF5] rounded-lg border border-gray-200 hover:border-white hover:shadow-lg transition-all"
            >
              <p className="text-white text-sm font-semibold uppercase tracking-widest mb-2">Diwali</p>
              <p className="text-[#1B2B5E] font-semibold">{isNl ? 'Diwali-diners en festiviteiten' : 'Diwali dinners and festival celebrations'}</p>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
