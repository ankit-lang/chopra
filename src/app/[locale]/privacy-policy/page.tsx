import type { Metadata } from 'next'
import Link from 'next/link'
import JsonLd from '@/components/seo/JsonLd'
import { RESTAURANT } from '@/lib/constants'
import { getLocalizedUrl } from '@/lib/utils'
import { getBreadcrumbSchema } from '@/lib/schema'
import { getTranslations, type Locale } from '@/lib/useTranslations'
import EmailLink from '@/components/ui/EmailLink'

type Props = { params: { locale: Locale } }

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'nl' }]
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params
  const titles = {
    en: 'Privacy Policy | Chopras Indian Restaurant Den Haag',
    nl: 'Privacybeleid | Chopras Indian Restaurant Den Haag',
  }
  const descriptions = {
    en: 'Privacy policy for Chopras Indian Restaurant Den Haag. How we collect, store and use your personal data in compliance with GDPR. Contact: info [at] chopras.nl.',
    nl: 'Privacybeleid van Chopras Indian Restaurant Den Haag. Hoe wij uw persoonsgegevens verzamelen en verwerken conform de AVG. Contact: info [at] chopras.nl.',
  }
  return {
    title: titles[locale],
    description: descriptions[locale],
    robots: {
      index: false,
      follow: true,
    },
    alternates: {
      canonical: getLocalizedUrl(locale, 'privacy-policy'),
      languages: {
        en: getLocalizedUrl('en', 'privacy-policy'),
        nl: getLocalizedUrl('nl', 'privacy-policy'),
        'x-default': getLocalizedUrl('en', 'privacy-policy'),
      },
    },
    openGraph: {
      title: titles[locale],
      description: descriptions[locale],
      url: getLocalizedUrl(locale, 'privacy-policy'),
      type: 'website',
    },
  }
}

export default function PrivacyPolicyPage({ params }: Props) {
  const { locale } = params
  const tr = getTranslations(locale)
  const base = locale === 'nl' ? '/nl' : ''
  const isNl = locale === 'nl'

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: tr.common.nav.home, item: getLocalizedUrl(locale) },
    { name: isNl ? 'Privacybeleid' : 'Privacy Policy', item: getLocalizedUrl(locale, 'privacy-policy') },
  ])

  return (
    <>
      <JsonLd data={breadcrumbSchema} />

      {/* HERO */}
      <section className="bg-white py-16 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-vibes text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-6 leading-[1.3]">
            {isNl ? 'Privacybeleid' : 'Privacy Policy'}
          </h1>
          <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
            {isNl
              ? 'Chopras Indian Restaurant respecteert uw privacy. Dit privacybeleid beschrijft hoe wij persoonsgegevens verzamelen, verwerken en beschermen conform de Algemene Verordening Gegevensbescherming (AVG).'
              : 'Chopras Indian Restaurant respects your privacy. This privacy policy describes how we collect, process, and protect your personal data in compliance with the General Data Protection Regulation (GDPR).'}
          </p>
          <p className="font-body text-[#1A1A1A]/70 text-base mt-4">
            {isNl ? 'Laatst bijgewerkt: April 2026' : 'Last updated: April 2026'}
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="bg-[#F7F8FC] py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto space-y-12">

          {/* SECTION 1: What Data We Collect */}
          <div>
            <h2 className="font-vibes text-3xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-6">
              {isNl ? '1. Welke Gegevens Verzamelen Wij?' : '1. What Data Do We Collect?'}
            </h2>
            <div className="space-y-4 text-[#1A1A1A] leading-relaxed">
              {isNl ? (
                <>
                  <p>Chopras verzamelt persoonlijke gegevens alleen wanneer u deze vrijwillig verstrekt. Dit gebeurt via:</p>
                  <ul className="list-disc list-inside space-y-2 ml-2">
                    <li>Reserveringsformulieren op onze website</li>
                    <li>Contactformulieren voor vragen en opmerkingen</li>
                    <li>E-mail communicatie met ons restaurant</li>
                    <li>Cateringsaanvragen voor evenementen</li>
                  </ul>
                  <p className="mt-4">De persoonsgegevens die wij verzamelen zijn:</p>
                  <ul className="list-disc list-inside space-y-2 ml-2">
                    <li>Voor- en achternaam</li>
                    <li>E-mailadres</li>
                    <li>Telefoonnummer</li>
                    <li>Adres (alleen voor leveringen en cateringaanvragen)</li>
                    <li>Eventueel dieetwensen of allergieën (voor reserveringen)</li>
                  </ul>
                </>
              ) : (
                <>
                  <p>Chopras collects personal data only when you voluntarily provide it. This occurs through:</p>
                  <ul className="list-disc list-inside space-y-2 ml-2">
                    <li>Reservation forms on our website</li>
                    <li>Contact forms for questions and comments</li>
                    <li>Email communication with our restaurant</li>
                    <li>Catering requests for events</li>
                  </ul>
                  <p className="mt-4">The personal data we collect is:</p>
                  <ul className="list-disc list-inside space-y-2 ml-2">
                    <li>First and last name</li>
                    <li>Email address</li>
                    <li>Phone number</li>
                    <li>Address (delivery and catering requests only)</li>
                    <li>Dietary requirements or allergies (if relevant to reservations)</li>
                  </ul>
                </>
              )}
            </div>
          </div>

          {/* SECTION 2: Why We Collect Your Data */}
          <div>
            <h2 className="font-vibes text-3xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-6">
              {isNl ? '2. Waarom Verzamelen Wij Uw Gegevens?' : '2. Why Do We Collect Your Data?'}
            </h2>
            <div className="space-y-4 text-[#1A1A1A] leading-relaxed">
              {isNl ? (
                <>
                  <p>Wij verzamelen uw gegevens alleen voor de volgende doeleinden:</p>
                  <ul className="list-disc list-inside space-y-2 ml-2">
                    <li>Het verwerken van tafelreserveringen</li>
                    <li>Het beantwoorden van vragen en verzoeken</li>
                    <li>Het organiseren van cateringdiensten voor evenementen</li>
                    <li>Het versturen van bevestigingen en herinneringen</li>
                    <li>Het bieden van diensten zoals bezorging en afhaling</li>
                  </ul>
                  <p className="mt-4">Wij gebruiken uw gegevens niet voor marketingdoeleinden zonder uw uitdrukkelijke toestemming. Wij verkopen, verhuren of delen uw persoonlijke gegevens niet met derden.</p>
                </>
              ) : (
                <>
                  <p>We collect your data only for the following purposes:</p>
                  <ul className="list-disc list-inside space-y-2 ml-2">
                    <li>Processing table reservations</li>
                    <li>Answering questions and requests</li>
                    <li>Organising catering services for events</li>
                    <li>Sending confirmations and reminders</li>
                    <li>Providing services such as delivery and collection</li>
                  </ul>
                  <p className="mt-4">We do not use your data for marketing purposes without your explicit consent. We do not sell, rent, or share your personal data with third parties.</p>
                </>
              )}
            </div>
          </div>

          {/* SECTION 3: How Long We Store Your Data */}
          <div>
            <h2 className="font-vibes text-3xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-6">
              {isNl ? '3. Hoe Lang Slaan Wij Uw Gegevens Op?' : '3. How Long Do We Store Your Data?'}
            </h2>
            <div className="space-y-4 text-[#1A1A1A] leading-relaxed">
              {isNl ? (
                <p>Wij bewaren uw persoonlijke gegevens alleen zolang als nodig voor het beoogde doel. Voor reserveringen worden gegevens verwijderd na de geplande datum, tenzij u een toekomstige boeking hebt. Voor cateringaanvragen en contactmeldingen worden gegevens verwijderd na verwerking en voltooiing van het verzoek. Wij bewaren geen gegevens langer dan wettelijk vereist.</p>
              ) : (
                <p>We retain your personal data only as long as necessary for the intended purpose. For reservations, data is deleted after the scheduled date unless you have a future booking. For catering requests and enquiries, data is deleted after processing and completion of the request. We do not retain data longer than legally required.</p>
              )}
            </div>
          </div>

          {/* SECTION 4: Your Rights */}
          <div>
            <h2 className="font-vibes text-3xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-6">
              {isNl ? '4. Uw Rechten onder de AVG' : '4. Your Rights Under GDPR'}
            </h2>
            <div className="space-y-4 text-[#1A1A1A] leading-relaxed">
              {isNl ? (
                <>
                  <p>U hebt de volgende rechten met betrekking tot uw persoonlijke gegevens:</p>
                  <ul className="list-disc list-inside space-y-2 ml-2">
                    <li><strong>Recht op toegang:</strong> U kunt opvragen welke persoonsgegevens wij over u hebben.</li>
                    <li><strong>Recht op rectificatie:</strong> U kunt onnauwkeurige of onvolledige gegevens laten corrigeren.</li>
                    <li><strong>Recht op verwijdering:</strong> U kunt verzoeken uw gegevens te worden verwijderd (onder bepaalde voorwaarden).</li>
                    <li><strong>Recht op beperking:</strong> U kunt verzoeken de verwerking van uw gegevens te beperken.</li>
                    <li><strong>Recht op gegevensportabiliteit:</strong> U kunt uw gegevens ontvangen in een gestructureerd, veelgebruikt formaat.</li>
                  </ul>
                  <p className="mt-4">Neem contact op met <strong><EmailLink className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold" /></strong> om een van deze rechten uit te oefenen.</p>
                </>
              ) : (
                <>
                  <p>You have the following rights regarding your personal data:</p>
                  <ul className="list-disc list-inside space-y-2 ml-2">
                    <li><strong>Right of access:</strong> You can request what personal data we hold about you.</li>
                    <li><strong>Right of rectification:</strong> You can have inaccurate or incomplete data corrected.</li>
                    <li><strong>Right of erasure:</strong> You can request your data to be deleted (under certain conditions).</li>
                    <li><strong>Right to restrict processing:</strong> You can request processing of your data to be limited.</li>
                    <li><strong>Right to data portability:</strong> You can receive your data in a structured, commonly used format.</li>
                  </ul>
                  <p className="mt-4">Contact <strong><EmailLink className="text-white hover:text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] font-semibold" /></strong> to exercise any of these rights.</p>
                </>
              )}
            </div>
          </div>

          {/* SECTION 5: Data Security */}
          <div>
            <h2 className="font-vibes text-3xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-6">
              {isNl ? '5. Veiligheid van Uw Gegevens' : '5. Security of Your Data'}
            </h2>
            <div className="space-y-4 text-[#1A1A1A] leading-relaxed">
              {isNl ? (
                <p>Chopras neemt de veiligheid van uw persoonlijke gegevens ernstig. Wij gebruiken beveiligingsmaatregelen om uw gegevens te beschermen tegen ongeautoriseerde toegang, wijziging, openbaarmaking of vernietiging. Uw gegevens worden opgeslagen op beveiligde servers. Echter, geen enkele transmissiemethode via het internet is volledig veilig. Wij kunnen geen absolute garantie geven voor de veiligheid van uw gegevens.</p>
              ) : (
                <p>Chopras takes the security of your personal data seriously. We use security measures to protect your data from unauthorized access, alteration, disclosure, or destruction. Your data is stored on secure servers. However, no transmission method over the internet is completely secure. We cannot guarantee absolute security of your data.</p>
              )}
            </div>
          </div>

          {/* SECTION 6: Cookies */}
          <div>
            <h2 className="font-vibes text-3xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-6">
              {isNl ? '6. Cookies' : '6. Cookies'}
            </h2>
            <div className="space-y-4 text-[#1A1A1A] leading-relaxed">
              {isNl ? (
                <p>Onze website gebruikt alleen functionele cookies die nodig zijn voor het goed functioneren van de site. Wij plaatsen geen tracking cookies of analyse cookies zonder uw toestemming. U kunt cookies uitschakelen in uw browser instellingen, hoewel dit de functionaliteit van onze website kan beperken.</p>
              ) : (
                <p>Our website uses only functional cookies necessary for proper operation of the site. We do not place tracking or analytics cookies without your consent. You can disable cookies in your browser settings, though this may limit website functionality.</p>
              )}
            </div>
          </div>

          {/* SECTION 7: Third Parties */}
          <div>
            <h2 className="font-vibes text-3xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-6">
              {isNl ? '7. Derden' : '7. Third Parties'}
            </h2>
            <div className="space-y-4 text-[#1A1A1A] leading-relaxed">
              {isNl ? (
                <p>Wij geven uw persoonlijke gegevens niet aan derden door, behalve indien nodig voor het uitvoeren van de diensten die u hebt aangevraagd (bijvoorbeeld bezorgdiensten). Deze partners zijn gebonden aan strenge geheimhoudingsovereenkomsten en mogen uw gegevens alleen gebruiken zoals wij hebben gespecificeerd.</p>
              ) : (
                <p>We do not share your personal data with third parties, except where necessary to provide services you have requested (for example, delivery services). These partners are bound by strict confidentiality agreements and may only use your data as we have specified.</p>
              )}
            </div>
          </div>

          {/* SECTION 8: Changes to This Policy */}
          <div>
            <h2 className="font-vibes text-3xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-6">
              {isNl ? '8. Wijzigingen van Dit Beleid' : '8. Changes to This Policy'}
            </h2>
            <div className="space-y-4 text-[#1A1A1A] leading-relaxed">
              {isNl ? (
                <p>Chopras kan dit privacybeleid van tijd tot tijd wijzigen. Wijzigingen zullen op deze pagina worden gepubliceerd. Wij raden u aan regelmatig terug te keren naar deze pagina om op de hoogte te blijven van wijzigingen. Uw voortgezette gebruik van onze website na wijzigingen betekent dat u de gewijzigde voorwaarden accepteert.</p>
              ) : (
                <p>Chopras may modify this privacy policy from time to time. Changes will be published on this page. We encourage you to return to this page regularly to stay informed of any changes. Your continued use of our website after changes means you accept the modified terms.</p>
              )}
            </div>
          </div>

          {/* SECTION 9: Contact */}
          <div>
            <h2 className="font-vibes text-3xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] mb-6">
              {isNl ? '9. Contact' : '9. Contact'}
            </h2>
            <div className="space-y-4 text-[#1A1A1A] leading-relaxed">
              {isNl ? (
                <>
                  <p>Hebt u vragen over dit privacybeleid of over hoe Chopras uw persoonlijke gegevens verwerkt? Neem alstublieft contact met ons op:</p>
                  <div className="space-y-2 mt-4">
                    <p><strong>Chopras Indian Restaurant</strong></p>
                    <p>Leyweg 986<br />2545 GW Den Haag<br />Netherlands</p>
                    <p>E-mail: <EmailLink className="text-white hover:underline font-semibold" /></p>
                    <p>Telefoon: <Link href={`tel:${RESTAURANT.contact.phone}`} className="text-white hover:underline font-semibold">{RESTAURANT.contact.phoneDisplay}</Link></p>
                  </div>
                  <p className="mt-6">U kunt ook een klacht indienen bij de <Link href="https://autoriteitpersoonsgegevens.nl" target="_blank" rel="noopener noreferrer" className="text-white hover:underline font-semibold">Autoriteit Persoonsgegevens (AP)</Link>, de Nederlandse toezichthouder voor gegevensbescherming.</p>
                </>
              ) : (
                <>
                  <p>Do you have questions about this privacy policy or how Chopras processes your personal data? Please contact us:</p>
                  <div className="space-y-2 mt-4">
                    <p><strong>Chopras Indian Restaurant</strong></p>
                    <p>Leyweg 986<br />2545 GW Den Haag<br />Netherlands</p>
                    <p>Email: <EmailLink className="text-white hover:underline font-semibold" /></p>
                    <p>Phone: <Link href={`tel:${RESTAURANT.contact.phone}`} className="text-white hover:underline font-semibold">{RESTAURANT.contact.phoneDisplay}</Link></p>
                  </div>
                  <p className="mt-6">You can also file a complaint with the <Link href="https://autoriteitpersoonsgegevens.nl" target="_blank" rel="noopener noreferrer" className="text-white hover:underline font-semibold">Autoriteit Persoonsgegevens (AP)</Link>, the Dutch data protection authority.</p>
                </>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="bg-white py-16 px-6 md:px-16">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#1A1A1A] text-lg mb-6 leading-relaxed">
            {isNl
              ? 'Vragen over uw reservering of catering? Neem contact op.'
              : 'Questions about your reservation or catering? Get in touch.'}
          </p>
          <Link
            href={`${base}/contact`}
            className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white bg-[rgba(199,163,72,0.1)] px-6 py-3 text-white text-sm font-medium uppercase tracking-wide transition-all duration-200 ease-out hover:bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] hover:text-white active:scale-[0.98] min-h-[48px]"
          >
            {isNl ? 'Contact' : 'Contact'}
          </Link>
        </div>
      </section>
    </>
  )
}
