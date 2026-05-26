import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import { Cormorant_Garamond, DM_Sans, Great_Vibes } from 'next/font/google'
import '@/styles/globals.css'
import Header from '@/components/layout/Header'
import TopBar from '@/components/layout/TopBar'
import Footer from '@/components/layout/Footer'
import CartDrawer from '@/components/cart/CartDrawer'
import ScrollToTop from '@/components/ScrollToTop'
import DisableScrollRestoration from '@/components/DisableScrollRestoration'
import WhatsAppWidget from '@/components/WhatsAppWidget'
import ScrollToTopButton from '@/components/ScrollToTopButton'
import { type Locale } from '@/lib/useTranslations'
import { RESTAURANT, SITE_URL } from '@/lib/constants'
import { getWebSiteSchema } from '@/lib/schema'
import { getLocalizedUrl } from '@/lib/utils'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-dm-sans',
  display: 'swap',
})

const greatVibes = Great_Vibes({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-great-vibes',
  display: 'swap',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: 'Chopras Indian Restaurant Den Haag | Authentic Indian Food',
      template: '%s',
    },
    description:
      'Authentic Indian restaurant in Den Haag serving fresh curries, tandoori, chaat and biryani. Halal certified. Vegetarian and vegan options. Open Tuesday to Sunday.',
    authors: [{ name: RESTAURANT.name }],
    creator: RESTAURANT.name,
    robots: { index: true, follow: true },
    openGraph: {
      type: 'website',
      siteName: RESTAURANT.name,
      images: [{ url: '/og/home-og.jpg', width: 1200, height: 630, alt: 'Chopras Indian Restaurant Den Haag' }],
    },
    twitter: { card: 'summary_large_image' },
    icons: {
      icon: '/favicon.png',
      apple: '/favicon.png',
      shortcut: '/favicon.png',
    },
    alternates: {
      languages: {
        'en': getLocalizedUrl('en'),
        'nl': getLocalizedUrl('nl'),
        'x-default': getLocalizedUrl('en'),
      },
    },
  }
}

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'nl' }]
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { locale: Locale }
}) {
  const websiteSchema = getWebSiteSchema(params.locale)

  return (
    <html lang={params.locale} className={`${cormorant.variable} ${dmSans.variable} ${greatVibes.variable}`}>
      <head>
        <link rel="profile" href="https://chopras.nl/llms.txt" />
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-T4F28DPL');`,
          }}
        />
        <Script
          id="clarity-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","wg5a6xl2c0");`,
          }}
        />
      </head>
      <body className="bg-brand-bg text-brand-text font-body antialiased">
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-T4F28DPL"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <DisableScrollRestoration />
        <ScrollToTop />
        <TopBar />
        <Header locale={params.locale} />
        <CartDrawer locale={params.locale} />
        <main className="pt-[100px]">{children}</main>
        <Footer locale={params.locale} />
        <WhatsAppWidget />
        <ScrollToTopButton />
      </body>
    </html>
  )
}
