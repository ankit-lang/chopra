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
    en: 'Terms of Service | Chopras Indian Restaurant Den Haag',
    nl: 'Algemene Voorwaarden | Chopras Indian Restaurant Den Haag',
  }
  const descriptions = {
    en: 'Terms of service for reservations, catering enquiries, online orders, and website use at Chopras Indian Restaurant Den Haag.',
    nl: 'Algemene voorwaarden voor reserveringen, cateringaanvragen, online bestellingen en websitegebruik bij Chopras Indian Restaurant Den Haag.',
  }

  return {
    title: titles[locale],
    description: descriptions[locale],
    robots: {
      index: false,
      follow: true,
    },
    alternates: {
      canonical: getLocalizedUrl(locale, 'terms'),
      languages: {
        en: getLocalizedUrl('en', 'terms'),
        nl: getLocalizedUrl('nl', 'terms'),
        'x-default': getLocalizedUrl('en', 'terms'),
      },
    },
    openGraph: {
      title: titles[locale],
      description: descriptions[locale],
      url: getLocalizedUrl(locale, 'terms'),
      type: 'website',
    },
  }
}

export default function TermsPage({ params }: Props) {
  const { locale } = params
  const tr = getTranslations(locale)
  const isNl = locale === 'nl'
  const base = isNl ? '/nl' : ''

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: tr.common.nav.home, item: getLocalizedUrl(locale) },
    { name: isNl ? 'Algemene Voorwaarden' : 'Terms of Service', item: getLocalizedUrl(locale, 'terms') },
  ])

  return (
    <>
      <JsonLd data={breadcrumbSchema} />

      <section className="bg-white py-16 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-vibes text-4xl md:text-5xl text-[#C7A348] mb-6 leading-[1.3]">
            {isNl ? 'Algemene Voorwaarden' : 'Terms of Service'}
          </h1>
          <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
            {isNl
              ? 'Deze voorwaarden leggen uit hoe reserveringen, cateringaanvragen, online bestellingen en websitegebruik bij Chopras Indian Restaurant worden behandeld.'
              : 'These terms explain how reservations, catering enquiries, online orders, and website use are handled by Chopras Indian Restaurant.'}
          </p>
          <p className="font-body text-[#1A1A1A]/70 text-base mt-4">
            {isNl ? 'Laatst bijgewerkt: April 2026' : 'Last updated: April 2026'}
          </p>
        </div>
      </section>

      <section className="bg-[#F7F8FC] py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto space-y-12 text-[#1A1A1A] leading-relaxed">
          <div>
            <h2 className="font-vibes text-3xl md:text-4xl text-[#C7A348] mb-6">
              {isNl ? '1. Reserveringen' : '1. Reservations'}
            </h2>
            <p>
              {isNl
                ? 'Tafelreserveringen worden bevestigd op basis van beschikbaarheid. Voor grotere groepen kan Chopras Indian Restaurant telefonisch contact opnemen om de groepsgrootte, tijd en tafelopstelling te bevestigen.'
                : 'Table reservations are confirmed subject to availability. For larger groups, Chopras Indian Restaurant may contact you by phone to confirm the group size, time, and table setup.'}
            </p>
          </div>

          <div>
            <h2 className="font-vibes text-3xl md:text-4xl text-[#C7A348] mb-6">
              {isNl ? '2. Catering en Evenementen' : '2. Catering and Events'}
            </h2>
            <p>
              {isNl
                ? 'Catering- en evenementaanvragen zijn pas definitief nadat datum, gastenaantal, menu, locatie en eventuele betaling schriftelijk zijn bevestigd. Offertes zijn gebaseerd op de informatie die u bij de aanvraag verstrekt.'
                : 'Catering and event enquiries are final only after the date, guest count, menu, location, and any required payment are confirmed in writing. Quotes are based on the information you provide when making the enquiry.'}
            </p>
          </div>

          <div>
            <h2 className="font-vibes text-3xl md:text-4xl text-[#C7A348] mb-6">
              {isNl ? '3. Online Bestellingen' : '3. Online Orders'}
            </h2>
            <p>
              {isNl
                ? 'Online bestellingen zijn afhankelijk van keukenbeschikbaarheid en openingstijden. Prijzen, menu-items en beschikbaarheid kunnen wijzigen. Controleer uw bestelling zorgvuldig voordat u deze indient.'
                : 'Online orders depend on kitchen availability and opening hours. Prices, menu items, and availability may change. Please check your order carefully before submitting it.'}
            </p>
          </div>

          <div>
            <h2 className="font-vibes text-3xl md:text-4xl text-[#C7A348] mb-6">
              {isNl ? '4. Websitegebruik' : '4. Website Use'}
            </h2>
            <p>
              {isNl
                ? 'De informatie op deze website wordt zo nauwkeurig mogelijk bijgehouden, maar kan typfouten of verouderde informatie bevatten. Neem direct contact op met het restaurant voor actuele openingstijden, prijzen en beschikbaarheid.'
                : 'The information on this website is kept as accurate as possible, but may contain typographical errors or outdated information. Contact the restaurant directly for current opening hours, prices, and availability.'}
            </p>
          </div>

          <div>
            <h2 className="font-vibes text-3xl md:text-4xl text-[#C7A348] mb-6">
              {isNl ? '5. Contact' : '5. Contact'}
            </h2>
            <p>
              {isNl ? 'Voor vragen over deze voorwaarden kunt u contact opnemen via ' : 'For questions about these terms, contact us at '}
              <EmailLink className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold" />
              {isNl ? ' of bel ' : ' or call '}
              <a href={`tel:${RESTAURANT.contact.phone}`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                {RESTAURANT.contact.phoneDisplay}
              </a>
              .
            </p>
            <p className="mt-4">
              <Link href={`${base}/privacy-policy`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                {isNl ? 'Bekijk ook ons privacybeleid.' : 'View our privacy policy as well.'}
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
