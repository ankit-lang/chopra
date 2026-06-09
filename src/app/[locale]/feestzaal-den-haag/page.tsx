import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import JsonLd from '@/components/seo/JsonLd'
import { getLocalizedUrl } from '@/lib/utils'
import { getBreadcrumbSchema } from '@/lib/schema'
import { getTranslations, type Locale } from '@/lib/useTranslations'

type Props = { params: { locale: Locale } }

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'nl' }]
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params
  const titles = {
    en: 'Event Venue for Hire Den Haag | Chopras Indian Restaurant',
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

export default function LocaleFeestzaalPage({ params }: Props) {
  const { locale } = params
  const tr = getTranslations(locale)
  const isNl = locale === 'nl'

  // If you use these schemas, make sure to render their structural outputs using your <JsonLd /> component
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: tr.common.nav.home, item: getLocalizedUrl(locale) },
    { name: isNl ? 'Feestzaal' : 'Event Venue', item: getLocalizedUrl(locale, 'feestzaal-den-haag') },
  ])

  return (
    <>
      {/* Injecting external Google Fonts natively into the page head layer */}
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Jost:wght@300;400;500;600&display=swap"
        rel="stylesheet"
      />

      <style dangerouslySetInnerHTML={{
        __html: `
        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

        :root {
          --saffron:    #1A56DB;
          --saffron-lt: #3B82F6;
          --deep:       #050F1F;
          --ink:        #0A1929;
          --cream:      #F0F6FF;
          --parchment:  #E0ECFF;
          --gold:       #60A5FA;
          --gold-lt:    #93C5FD;
          --smoke:      #6B8BAD;
          --white:      #FFFFFF;
        }

        html { scroll-behavior: smooth; }

        body {
          font-family: 'Jost', sans-serif;
          background: var(--deep);
          color: var(--cream);
          overflow-x: hidden;
        }

        /* ─── TOPBAR ─── */
        .topbar {
          background: var(--saffron);
          text-align: center;
          padding: 8px 20px;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--deep);
        }

        /* ─── NAV ─── */
        nav {
          position: sticky; top: 0; z-index: 100;
          background: rgba(5,15,31,0.96);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(96,165,250,0.2);
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 48px;
          height: 70px;
        }
        .nav-logo {
          font-family: 'Cormorant Garamond', serif;
          font-size: 22px;
          font-weight: 600;
          color: var(--gold);
          letter-spacing: 0.05em;
          text-decoration: none;
          display: flex; align-items: center; gap: 10px;
        }
        .nav-logo span { color: var(--cream); }
        .nav-links { display: flex; gap: 32px; list-style: none; }
        .nav-links a {
          font-size: 13px; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase;
          color: rgba(250,246,239,0.7); text-decoration: none;
          transition: color 0.2s;
        }
        .nav-links a:hover, .nav-links a.active { color: var(--gold); }
        .nav-cta { display: flex; gap: 12px; }
        .btn {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 10px 24px; font-family: 'Jost', sans-serif;
          font-size: 13px; font-weight: 500; letter-spacing: 0.1em;
          text-transform: uppercase; text-decoration: none;
          cursor: pointer; border: none; transition: all 0.25s;
        }
        .btn-outline {
          background: transparent;
          border: 1px solid rgba(96,165,250,0.5);
          color: var(--gold);
        }
        .btn-outline:hover { border-color: var(--gold); background: rgba(96,165,250,0.08); }
        .btn-primary {
          background: var(--saffron);
          color: var(--white);
        }
        .btn-primary:hover { background: var(--saffron-lt); }

        /* ─── HERO ─── */
        .hero {
          position: relative; min-height: 92vh;
          display: flex; align-items: center; justify-content: center;
          overflow: hidden;
        }
        .hero-bg {
          position: absolute; inset: 0;
          background:
          radial-gradient(ellipse 80% 60% at 60% 40%, rgba(26,86,219,0.12) 0%, transparent 70%),
          radial-gradient(ellipse 50% 50% at 20% 80%, rgba(96,165,250,0.08) 0%, transparent 60%),
          linear-gradient(160deg, #020B18 0%, #050F1F 40%, #030A14 100%);
        }
        .hero-mandala {
          position: absolute; right: -80px; top: 50%; transform: translateY(-50%);
          width: 600px; height: 600px; opacity: 0.06;
          border-radius: 50%;
          border: 1px solid var(--gold);
          box-shadow:
          inset 0 0 0 40px transparent,
          0 0 0 20px rgba(96,165,250,0.03),
          0 0 0 80px rgba(96,165,250,0.02),
          0 0 0 160px rgba(96,165,250,0.01);
          animation: spin 40s linear infinite;
        }
        .hero-mandala::before, .hero-mandala::after {
          content: ''; position: absolute; inset: 30px;
          border-radius: 50%; border: 1px solid var(--gold-lt);
        }
        .hero-mandala::after { inset: 80px; }
        @keyframes spin { to { transform: translateY(-50%) rotate(360deg); } }

        .hero-content { position: relative; z-index: 2; max-width: 760px; padding: 60px 48px; text-align: center; }
        .hero-eyebrow {
          display: inline-flex; align-items: center; gap: 12px;
          font-size: 11px; font-weight: 500; letter-spacing: 0.25em;
          text-transform: uppercase; color: var(--saffron); margin-bottom: 24px;
        }
        .hero-eyebrow::before, .hero-eyebrow::after { content: ''; display: block; width: 32px; height: 1px; background: var(--saffron); }
        .hero-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(48px, 7vw, 86px); font-weight: 300; line-height: 1.05;
          color: var(--cream); margin-bottom: 8px;
        }
        .hero-title em { font-style: italic; color: var(--gold); display: block; }
        .hero-subtitle {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(18px, 2.5vw, 26px); font-weight: 300; font-style: italic;
          color: rgba(250,246,239,0.55); margin-bottom: 36px; letter-spacing: 0.02em;
        }
        .hero-stats {
          display: flex; justify-content: center; gap: 40px; margin-bottom: 44px;
          padding: 24px 40px; border: 1px solid rgba(96,165,250,0.15);
          background: rgba(96,165,250,0.04); backdrop-filter: blur(4px);
        }
        .hero-stat { text-align: center; }
        .hero-stat-val { font-family: 'Cormorant Garamond', serif; font-size: 38px; font-weight: 300; color: var(--gold); display: block; line-height: 1; }
        .hero-stat-label { font-size: 11px; font-weight: 500; letter-spacing: 0.15em; text-transform: uppercase; color: var(--smoke); margin-top: 6px; display: block; }
        .hero-stat-sep { width: 1px; background: rgba(96,165,250,0.2); align-self: stretch; }
        .hero-actions { display: flex; justify-content: center; gap: 16px; flex-wrap: wrap; }
        .btn-hero-primary { background: var(--saffron); color: #fff; padding: 16px 40px; font-size: 13px; box-shadow: 0 8px 32px rgba(26,86,219,0.35); }
        .btn-hero-primary:hover { background: var(--saffron-lt); transform: translateY(-2px); box-shadow: 0 12px 40px rgba(26,86,219,0.4); }
        .btn-hero-ghost { background: transparent; border: 1px solid rgba(96,165,250,0.4); color: var(--gold); padding: 16px 40px; font-size: 13px; }
        .btn-hero-ghost:hover { border-color: var(--gold); background: rgba(96,165,250,0.06); transform: translateY(-2px); }

        .scroll-hint {
          position: absolute; bottom: 32px; left: 50%; transform: translateX(-50%);
          display: flex; flex-direction: column; align-items: center; gap: 8px;
          font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--smoke);
          animation: bobble 2s ease-in-out infinite;
        }
        .scroll-hint::after { content: ''; display: block; width: 1px; height: 40px; background: linear-gradient(to bottom, var(--gold), transparent); }
        @keyframes bobble { 0%, 100% { transform: translateX(-50%) translateY(0) } 50% { transform: translateX(-50%) translateY(6px) } }

        /* ─── SECTION BASE ─── */
        section { padding: 100px 48px; }
        .section-inner { max-width: 1160px; margin: 0 auto; }
        .section-eyebrow { font-size: 11px; font-weight: 500; letter-spacing: 0.25em; text-transform: uppercase; color: var(--saffron); margin-bottom: 16px; display: flex; align-items: center; gap: 12px; }
        .section-eyebrow::before { content: ''; width: 24px; height: 1px; background: var(--saffron); }
        .section-title { font-family: 'Cormorant Garamond', serif; font-size: clamp(36px, 4vw, 58px); font-weight: 300; line-height: 1.1; color: var(--cream); margin-bottom: 24px; }
        .section-title em { font-style: italic; color: var(--gold); }
        .section-body { font-size: 16px; line-height: 1.8; color: rgba(250,246,239,0.65); max-width: 640px; }

        /* ─── VENUE INTRO ─── */
        .venue-intro { background: var(--ink); border-top: 1px solid rgba(96,165,250,0.1); border-bottom: 1px solid rgba(96,165,250,0.1); }
        .venue-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
        .venue-visual { position: relative; }
        .venue-img-wrap { position: relative; overflow: hidden; aspect-ratio: 4/5; background: linear-gradient(135deg, rgba(26,86,219,0.15), rgba(96,165,250,0.08)); border: 1px solid rgba(96,165,250,0.15); }
        .venue-img-wrap img { width: 100%; height: 100%; object-fit: cover; opacity: 0.9; transition: transform 0.6s ease; }
        .venue-img-wrap:hover img { transform: scale(1.04); }
        .venue-badge { position: absolute; bottom: -20px; right: -20px; width: 110px; height: 110px; border-radius: 50%; background: var(--saffron); display: flex; flex-direction: column; align-items: center; justify-content: center; box-shadow: 0 8px 32px rgba(26,86,219,0.4); z-index: 2; }
        .venue-badge-val { font-family: 'Cormorant Garamond', serif; font-size: 28px; font-weight: 600; color: #fff; line-height: 1; }
        .venue-badge-sub { font-size: 9px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(255,255,255,0.8); text-align: center; padding: 0 8px; margin-top: 2px; }
        .halal-tag { position: absolute; top: 20px; left: 20px; background: rgba(5,15,31,0.85); border: 1px solid var(--gold); padding: 6px 14px; font-size: 10px; font-weight: 600; letter-spacing: 0.15em; text-transform: uppercase; color: var(--gold); backdrop-filter: blur(4px); }

        /* ─── PHOTOS STRIP ─── */
        .photos-strip { padding: 0 0 100px; background: var(--ink); }
        .photos-grid { display: grid; grid-template-columns: 2fr 1fr 1fr; grid-template-rows: auto auto; gap: 3px; max-width: 100%; }
        .photo-cell { overflow: hidden; background: rgba(96,165,250,0.05); aspect-ratio: 4/3; position: relative; }
        .photo-cell:first-child { grid-row: span 2; aspect-ratio: unset; }
        .photo-cell img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease, opacity 0.3s; opacity: 0.85; }
        .photo-cell:hover img { transform: scale(1.05); opacity: 1; }
        .photo-label { position: absolute; bottom: 0; left: 0; right: 0; padding: 12px 16px; background: linear-gradient(to top, rgba(5,15,31,0.8), transparent); font-size: 11px; font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(250,246,239,0.8); opacity: 0; transition: opacity 0.3s; }
        .photo-cell:hover .photo-label { opacity: 1; }

        /* ─── FEATURES ─── */
        .features { background: var(--deep); }
        .features-header { text-align: center; margin-bottom: 64px; }
        .features-header .section-body { margin: 0 auto; }
        .features-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; border: 1px solid rgba(96,165,250,0.12); }
        .feature-card { padding: 44px 32px; background: rgba(96,165,250,0.02); border-right: 1px solid rgba(96,165,250,0.08); transition: background 0.3s; text-align: center; }
        .feature-card:last-child { border-right: none; }
        .feature-card:hover { background: rgba(96,165,250,0.06); }
        .feature-icon { width: 52px; height: 52px; margin: 0 auto 20px; border: 1px solid rgba(96,165,250,0.25); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 22px; color: var(--gold); }
        .feature-name { font-family: 'Cormorant Garamond', serif; font-size: 22px; font-weight: 400; color: var(--cream); margin-bottom: 12px; }
        .feature-desc { font-size: 14px; line-height: 1.7; color: var(--smoke); }

        /* ─── OCCASIONS ─── */
        .occasions { background: var(--ink); }
        .occasions-list { display: grid; grid-template-columns: 1fr 1fr; gap: 2px; margin-top: 56px; }
        .occasion-item { padding: 36px 40px; background: rgba(96,165,250,0.02); border: 1px solid rgba(96,165,250,0.08); display: flex; gap: 24px; align-items: flex-start; transition: border-color 0.3s, background 0.3s; }
        .occasion-item:hover { border-color: rgba(96,165,250,0.25); background: rgba(96,165,250,0.05); }
        .occasion-num { font-family: 'Cormorant Garamond', serif; font-size: 48px; font-weight: 300; color: rgba(96,165,250,0.2); line-height: 1; min-width: 48px; }
        .occasion-title { font-family: 'Cormorant Garamond', serif; font-size: 24px; font-weight: 400; color: var(--cream); margin-bottom: 8px; }
        .occasion-desc { font-size: 14px; line-height: 1.7; color: var(--smoke); }

        /* ─── PROCESS ─── */
        .process { background: var(--deep); }
        .process-steps { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0; margin-top: 56px; position: relative; }
        .process-steps::before { content: ''; position: absolute; top: 28px; left: 12.5%; right: 12.5%; height: 1px; background: linear-gradient(to right, transparent, var(--gold), transparent); }
        .process-step { text-align: center; padding: 0 20px; }
        .step-dot { width: 56px; height: 56px; border-radius: 50%; border: 1px solid var(--gold); background: var(--deep); display: flex; align-items: center; justify-content: center; margin: 0 auto 24px; font-family: 'Cormorant Garamond', serif; font-size: 22px; font-weight: 300; color: var(--gold); position: relative; z-index: 1; }
        .step-title { font-family: 'Cormorant Garamond', serif; font-size: 20px; font-weight: 400; color: var(--cream); margin-bottom: 10px; }
        .step-desc { font-size: 13px; line-height: 1.7; color: var(--smoke); }

        /* ─── FAQ ─── */
        .faq { background: var(--ink); }
        .faq-list { margin-top: 56px; max-width: 800px; }
        .faq-item { border-bottom: 1px solid rgba(96,165,250,0.12); overflow: hidden; }
        .faq-q { width: 100%; background: none; border: none; cursor: pointer; display: flex; justify-content: space-between; align-items: center; padding: 24px 0; text-align: left; font-family: 'Cormorant Garamond', serif; font-size: 20px; font-weight: 400; color: var(--cream); transition: color 0.2s; }
        .faq-q:hover { color: var(--gold); }
        .faq-q .faq-icon { width: 24px; height: 24px; flex-shrink: 0; border: 1px solid rgba(96,165,250,0.3); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 14px; color: var(--gold); transition: transform 0.3s, background 0.3s; }
        .faq-item.open .faq-icon { transform: rotate(45deg); background: var(--saffron); border-color: var(--saffron); color: #fff; }
        .faq-a { max-height: 0; overflow: hidden; transition: max-height 0.4s ease, padding 0.3s; font-size: 15px; line-height: 1.8; color: var(--smoke); }
        .faq-a.open { max-height: 300px; padding-bottom: 24px; }

        /* ─── CTA BANNER ─── */
        .cta-banner { position: relative; overflow: hidden; padding: 100px 48px; background: var(--deep); text-align: center; }
        .cta-banner-bg { position: absolute; inset: 0; background: radial-gradient(ellipse 60% 80% at 50% 50%, rgba(26,86,219,0.15), transparent 70%), linear-gradient(to bottom, var(--deep), var(--ink)); }
        .cta-banner-content { position: relative; z-index: 1; max-width: 600px; margin: 0 auto; }
        .cta-banner-title { font-family: 'Cormorant Garamond', serif; font-size: clamp(40px, 5vw, 64px); font-weight: 300; color: var(--cream); line-height: 1.1; margin-bottom: 16px; }
        .cta-banner-title em { font-style: italic; color: var(--gold); }
        .cta-banner-sub { font-size: 15px; color: var(--smoke); margin-bottom: 40px; line-height: 1.7; }
        .cta-banner-actions { display: flex; justify-content: center; gap: 16px; flex-wrap: wrap; }

        /* ─── FOOTER ─── */
        footer { background: #030D1A; border-top: 1px solid rgba(96,165,250,0.1); padding: 64px 48px 40px; }
        .footer-inner { max-width: 1160px; margin: 0 auto; }
        .footer-top { display: grid; grid-template-columns: 1.4fr 1fr 1fr 1fr; gap: 48px; margin-bottom: 48px; padding-bottom: 48px; border-bottom: 1px solid rgba(96,165,250,0.08); }
        .footer-brand-name { font-family: 'Cormorant Garamond', serif; font-size: 24px; font-weight: 400; color: var(--gold); margin-bottom: 8px; }
        .footer-brand-tagline { font-size: 12px; color: var(--smoke); margin-bottom: 20px; line-height: 1.6; }
        .footer-contact-row { display: flex; align-items: center; gap: 8px; font-size: 13px; color: rgba(250,246,239,0.6); margin-bottom: 8px; }
        .footer-col-title { font-size: 10px; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; color: var(--gold); margin-bottom: 16px; }
        .footer-links { list-style: none; }
        .footer-links li { margin-bottom: 10px; }
        .footer-links a { font-size: 13px; color: rgba(250,246,239,0.5); text-decoration: none; transition: color 0.2s; }
        .footer-links a:hover { color: var(--gold); }
        .footer-bottom { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; }
        .footer-bottom-text { font-size: 12px; color: rgba(250,246,239,0.3); }
        .footer-bottom-links { display: flex; gap: 20px; }
        .footer-bottom-links a { font-size: 12px; color: rgba(250,246,239,0.3); text-decoration: none; }
        .footer-bottom-links a:hover { color: var(--gold); }

        /* ─── FLOATING WA ─── */
        .wa-float { position: fixed; bottom: 32px; right: 32px; z-index: 200; width: 56px; height: 56px; border-radius: 50%; background: #25D366; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 20px rgba(37,211,102,0.4); text-decoration: none; font-size: 26px; transition: transform 0.2s, box-shadow 0.2s; }
        .wa-float:hover { transform: scale(1.1); box-shadow: 0 6px 28px rgba(37,211,102,0.6); }

        /* ─── REVIEW BADGE ─── */
        .review-strip { background: rgba(96,165,250,0.06); border-top: 1px solid rgba(96,165,250,0.12); border-bottom: 1px solid rgba(96,165,250,0.12); padding: 24px 48px; display: flex; justify-content: center; align-items: center; gap: 48px; flex-wrap: wrap; }
        .review-item { display: flex; align-items: center; gap: 12px; }
        .review-stars { color: var(--saffron); font-size: 16px; letter-spacing: 2px; }
        .review-txt { font-size: 13px; color: rgba(250,246,239,0.6); }
        .review-txt strong { color: var(--cream); }

        /* ─── ANIMATIONS ─── */
        @keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        .fade-up { opacity: 0; animation: fadeUp 0.7s ease forwards; }
        .d1 { animation-delay: 0.1s; }
        .d2 { animation-delay: 0.25s; }
        .d3 { animation-delay: 0.4s; }
        .d4 { animation-delay: 0.55s; }
        .d5 { animation-delay: 0.7s; }

        /* RESPONSIVE */
        @media (max-width: 900px) {
          nav { padding: 0 20px; }
          .nav-links, .nav-cta .btn-outline { display: none; }
          section { padding: 60px 24px; }
          .venue-grid { grid-template-columns: 1fr; gap: 40px; }
          .features-grid { grid-template-columns: 1fr 1fr; }
          .occasions-list { grid-template-columns: 1fr; }
          .process-steps { grid-template-columns: 1fr 1fr; gap: 40px; }
          .process-steps::before { display: none; }
          .footer-top { grid-template-columns: 1fr 1fr; gap: 32px; }
          .hero-stats { gap: 20px; padding: 20px; flex-wrap: wrap; }
          .photos-grid { grid-template-columns: 1fr 1fr; }
          .photo-cell:first-child { grid-row: span 1; }
        }
      `}} />

     

     

      {/* HERO */}
      <section className="hero">
        <div className="hero-bg"></div>
        <div className="hero-mandala"></div>
        <div className="hero-content">
          <div className="hero-eyebrow fade-up d1">Event Venue · Den Haag</div>
          <h1 className="hero-title fade-up d2">
            Your Occasion,<br />
            <em>Perfectly Arranged</em>
          </h1>
          <p className="hero-subtitle fade-up d3">Private event hall with authentic Indian catering under one roof</p>
          <div className="hero-stats fade-up d4">
            <div className="hero-stat">
              <span className="hero-stat-val">25–80</span>
              <span className="hero-stat-label">Guests</span>
            </div>
            <div className="hero-stat-sep"></div>
            <div className="hero-stat">
              <span className="hero-stat-val">4.9★</span>
              <span className="hero-stat-label">Google · 800+ Reviews</span>
            </div>
            <div className="hero-stat-sep"></div>
            <div className="hero-stat">
              <span className="hero-stat-val">100%</span>
              <span className="hero-stat-label">Halal Certified</span>
            </div>
          </div>
          <div className="hero-actions fade-up d5">
            <Link className="btn btn-hero-primary" href="/quote">Request a Free Quote</Link>
            <Link className="btn btn-hero-ghost" href="/menu">View the Menu</Link>
          </div>
        </div>
        <div className="scroll-hint">Scroll</div>
      </section>

      {/* REVIEW STRIP */}
      <div className="review-strip">
        <div className="review-item">
          <div className="review-stars">★★★★★</div>
          <div className="review-txt"><strong>4.9 / 5</strong> on Google &middot; 800+ reviews</div>
        </div>
        <div className="review-item">
          <div className="review-stars">★★★★★</div>
          <div className="review-txt">Reviewed on <strong>TripAdvisor</strong></div>
        </div>
        <div className="review-item">
          <div className="review-txt">📞 <strong>+31 6 30645930</strong> &mdash; WhatsApp available</div>
        </div>
      </div>

      {/* VENUE INTRO */}
      <section className="venue-intro">
        <div className="section-inner">
          <div className="venue-grid">
            <div className="venue-visual">
              <div className="venue-img-wrap">
                <Image src="https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=800&q=80" alt="Event venue interior with Indian decorations" width={800} height={1000} priority />
                <div className="halal-tag">100% Halal Certified</div>
              </div>
              <div className="venue-badge">
                <span className="venue-badge-val">4.9★</span>
                <span className="venue-badge-sub">Google Reviews</span>
              </div>
            </div>
            <div>
              <div className="section-eyebrow">The Venue</div>
              <h2 className="section-title">Hall &amp; Catering<br /><em>Under One Roof</em></h2>
              <p className="section-body">
                Most people planning a feestzaal in Den Haag face the same problem — find a room, then find a caterer, negotiate two contracts, manage two schedules. At Chopras Indian Restaurant, the event hall and the kitchen are a single operation. You make one call. Everything is handled.
              </p>
              <p className="section-body" style={{ marginTop: '16px' }}>
                The private hall seats 25 to 80 guests entirely privately. From an intimate nikah reception to a corporate dinner, that range covers everything. The food is prepared by the same chefs who earn 4.9 stars on Google from 800+ reviewers every week.
              </p>
              <div style={{ marginTop: '36px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <Link className="btn btn-primary" href="/quote">Request a Quote</Link>
                <Link className="btn btn-outline" href="/menu" style={{ color: 'var(--gold)' }}>See the Menu</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PHOTO STRIP */}
      <div className="photos-strip">
        <div className="photos-grid">
          <div className="photo-cell">
            <Image src="https://images.unsplash.com/photo-1561662992-9d3e6c1e2d6e?w=800&q=80" alt="Beautifully decorated Indian event hall" width={800} height={600} />
            <div className="photo-label">Event Hall · Full Setup</div>
          </div>
          <div className="photo-cell">
            <Image src="https://images.unsplash.com/photo-1505944270255-72b8c68c6a70?w=600&q=80" alt="Indian wedding reception" width={600} height={450} />
            <div className="photo-label">Wedding Reception</div>
          </div>
          <div className="photo-cell">
            <Image src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80" alt="Indian catering spread" width={600} height={450} />
            <div className="photo-label">Authentic Catering</div>
          </div>
          <div className="photo-cell">
            <Image src="https://images.unsplash.com/photo-1529543544282-ea669407fca3?w=600&q=80" alt="Birthday celebration" width={600} height={450} />
            <div className="photo-label">Birthday Party</div>
          </div>
          <div className="photo-cell">
            <Image src="https://images.unsplash.com/photo-1519985176271-adb1088fa94c?w=600&q=80" alt="Proposal dinner setup" width={600} height={450} />
            <div className="photo-label">Proposal Dinner</div>
          </div>
        </div>
      </div>

      {/* FEATURES */}
      <section className="features">
        <div className="section-inner">
          <div className="features-header">
            <div className="section-eyebrow" style={{ justifyContent: 'center' }}>Why Chopras</div>
            <h2 className="section-title" style={{ textAlign: 'center' }}>Everything Your<br /><em>Event Deserves</em></h2>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🍽</div>
              <div className="feature-name">Restaurant Quality</div>
              <p className="feature-desc">Freshly ground spices sourced direct from India. Same chefs, same recipes as the restaurant that earns 4.9 stars nightly.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🏛</div>
              <div className="feature-name">One Booking</div>
              <p className="feature-desc">Venue, catering, and service in a single contract. No separate caterer. No double logistics. One point of contact.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">☪️</div>
              <div className="feature-name">Fully Halal</div>
              <p className="feature-desc">Every dish, every supplier, every preparation is halal certified. No exceptions, no cross-contamination. Book with complete confidence.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">👥</div>
              <div className="feature-name">25–80 Guests</div>
              <p className="feature-desc">Intimate family dinner or large wedding reception. The private hall adapts to your group size with no fixed minimum packages.</p>
            </div>
          </div>
        </div>
      </section>

      {/* OCCASIONS */}
      <section className="occasions">
        <div className="section-inner">
          <div className="section-eyebrow">Occasions</div>
          <h2 className="section-title">Every Celebration<br /><em>Welcomed Here</em></h2>
          <div className="occasions-list">
            <div className="occasion-item">
              <div className="occasion-num">01</div>
              <div className="occasion-content">
                <div className="occasion-title">Weddings &amp; Nikah</div>
                <p className="occasion-desc">Buffet with multiple stations or formal plated service. Biryani in large karahi pots, tandoori platters, full vegetarian spread. The format matches the formality of your occasion.</p>
              </div>
            </div>
            <div className="occasion-item">
              <div className="occasion-num">02</div>
              <div className="occasion-content">
                <div className="occasion-title">Birthday Parties</div>
                <p className="occasion-desc">Arrive to a hall that's set, food that's ready. Your guests celebrate from the first moment without logistics getting in the way.</p>
              </div>
            </div>
            <div className="occasion-item">
              <div className="occasion-num">03</div>
              <div className="occasion-content">
                <div className="occasion-title">Corporate Events</div>
                <p className="occasion-desc">A team dinner at Chopras is more memorable than a standard catered meeting room. Your private hall lets the group relax away from a public dining room.</p>
              </div>
            </div>
            <div className="occasion-item">
              <div className="occasion-num">04</div>
              <div className="occasion-content">
                <div className="occasion-title">Diwali &amp; Eid Gatherings</div>
                <p className="occasion-desc">Traditional dishes take centre stage — dal makhani, paneer tikka, biryani. Every celebration deserves food prepared with the care the occasion calls for.</p>
              </div>
            </div>
            <div className="occasion-item">
              <div className="occasion-num">05</div>
              <div className="occasion-content">
                <div className="occasion-title">Baby Showers</div>
                <p className="occasion-desc">An intimate gathering for the family, styled and catered to the detail. We work with you on menu and layout for a fully personalised experience.</p>
              </div>
            </div>
            <div className="occasion-item">
              <div className="occasion-num">06</div>
              <div className="occasion-content">
                <div className="occasion-title">Proposal &amp; Private Dinners</div>
                <p className="occasion-desc">The most important evening deserves a setting that matches it. The private hall can be arranged for an intimate candlelit dinner for two.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BOOKING PROCESS */}
      <section className="process">
        <div className="section-inner">
          <div className="section-eyebrow">How to Book</div>
          <h2 className="section-title">Four Steps to<br /><em>Your Perfect Event</em></h2>
          <div className="process-steps">
            <div className="process-step">
              <div className="step-dot">1</div>
              <div className="step-title">Get in Touch</div>
              <p className="step-desc">Call +31 6 30645930 or use the contact page. Tell us your date, guest count, and occasion type.</p>
            </div>
            <div className="process-step">
              <div className="step-dot">2</div>
              <div className="step-title">Free Quote in 24h</div>
              <p className="step-desc">We check availability, discuss menu options, and send a no-obligation quote within 24 hours.</p>
            </div>
            <div className="process-step">
              <div className="step-dot">3</div>
              <div className="step-title">Build the Menu</div>
              <p className="step-desc">Choose from the full Chopras menu — buffet or plated. Every dietary need covered, 100% halal.</p>
            </div>
            <div className="process-step">
              <div className="step-dot">4</div>
              <div className="step-title">Enjoy Your Event</div>
              <p className="step-desc">Arrive, relax, celebrate. Our team handles setup, service, and every detail so you can be present.</p>
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: '60px' }}>
            <p style={{ fontSize: '13px', color: 'var(--smoke)', marginBottom: '24px' }}>For 25–40 guests: book 2–3 weeks ahead &nbsp;·&nbsp; For 50–80 guests: book 6–8 weeks ahead</p>
            <Link className="btn btn-primary" href="/quote" style={{ padding: '16px 48px', fontSize: '13px' }}>Request Your Free Quote</Link>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      {/* Note: You imported FaqAccordion and data frameworks at the top but wrote raw static HTML below.
        You can replace this static loop block directly with:
        <FaqAccordion faqs={isNl ? feestzaalFaqsNl : feestzaalFaqs} />
      */}
      <section className="faq">
        <div className="section-inner">
          <div className="section-eyebrow">FAQ</div>
          <h2 className="section-title">Frequently Asked<br /><em>Questions</em></h2>
          <div className="faq-list">
            <div className="faq-item">
              <div className="faq-q" style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                Can I hire the event hall at Chopras Indian Restaurant?
                <span className="faq-icon">✓</span>
              </div>
              <div className="faq-a open" style={{ maxHeight: 'none', paddingBottom: '24px' }}>
                Yes. Chopras Indian Restaurant at Leyweg 986, Den Haag operates a private event hall accommodating 25 to 80 guests. The hall is available for birthdays, weddings, nikah receptions, corporate events, Diwali dinners, and private parties. Full authentic Indian catering from the Chopras kitchen is included.
              </div>
            </div>
            <div className="faq-item">
              <div className="faq-q">
                Is catering included with the hall hire?
              </div>
              <div className="faq-a open" style={{ maxHeight: 'none', paddingBottom: '24px' }}>
                Yes. Full authentic Indian catering from the Chopras kitchen is included. The menu is customised to your occasion, with buffet or plated dinner service available. Everything is prepared fresh on the day by the same team that earns 4.9 stars on Google from 800+ reviews.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <div className="cta-banner">
        <div className="cta-banner-bg"></div>
        <div className="cta-banner-content">
          <div className="section-eyebrow" style={{ justifyContent: 'center', marginBottom: '20px' }}>Reserve Your Date</div>
          <h2 className="cta-banner-title">Ready to Book Your<br /><em>Event Hall in Den Haag?</em></h2>
          <p className="cta-banner-sub">Contact us today and receive a free quote within 24 hours. Open Tuesday to Sunday at Leyweg 986, Den Haag.</p>
          <div className="cta-banner-actions">
            <Link className="btn btn-hero-primary" href="/quote" style={{ padding: '16px 40px', fontSize: '13px', background: 'var(--saffron)', color: '#fff', boxShadow: '0 8px 32px rgba(26,86,219,0.3)' }}>Request a Quote</Link>
            <a className="btn btn-hero-ghost" href="tel:+31630645930" style={{ padding: '16px 40px', fontSize: '13px', border: '1px solid rgba(96,165,250,0.4)', color: 'var(--gold)' }}>Call +31 6 30645930</a>
          </div>
        </div>
      </div>

      {/* FOOTER */}
    

      {/* FLOATING WA */}
      <a className="wa-float" href="https://wa.me/31630645930" title="Chat on WhatsApp" target="_blank" rel="noopener noreferrer">💬</a>
    </>
  )
}