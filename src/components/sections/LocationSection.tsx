'use client'

import { RESTAURANT } from '@/lib/constants'
import { useInView } from '@/hooks/useInView'
import { getTranslations, type Locale } from '@/lib/useTranslations'

export default function LocationSection({ locale = 'en' }: { locale?: Locale }) {
  const tr = getTranslations(locale)
  const { ref, inView } = useInView()

  return (
    <section
      className="pt-10 pb-10 md:pt-5 md:pb-5 relative overflow-hidden bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] "
    // style={{ background: 'linear-gradient(135deg, #000066 0%, #0000B3 100%)' }}
    >
      {/* Background Ambience */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-white/5 blur-[120px] pointer-events-none" />

      <div className="max-w-[90rem] mx-auto px-5 md:px-12 relative z-10" ref={ref}>

        {/* Header */}
        <div
          className={`text-center mb-10 transition-all duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[10px] uppercase tracking-[0.22em] text-white font-medium mb-4 backdrop-blur-md">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_10px_white]" />
            Find Us
          </span>
          <h2 className="font-heading font-medium italic text-3xl md:text-4xl lg:text-5xl tracking-tight text-white max-w-4xl mx-auto leading-tight">
            Leyweg, Den Haag
          </h2>
        </div>

        {/* Map - Wide Horizontal Layout */}
        <div
          className={`relative rounded-[2.5rem] overflow-hidden border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.3)] w-[70vw] m-auto h-[200px] md:h-[200px] lg:h-[250px] group transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${inView ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-16 scale-[0.98]'}`}
          style={{ transitionDelay: '100ms' }}
        >
          {/* Overlay to make it blend with theme */}
          <div className="absolute inset-0 bg-[#0000B3]/10 mix-blend-overlay group-hover:bg-transparent transition-colors duration-700 pointer-events-none z-10" />

          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2456.2!2d4.2765!3d52.0583!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47890e3caeb27bfd%3A0x8c0b2b2a5c3e4f9a!2sLeyweg%20986%2C%202545%20GW%20Den%20Haag!5e0!3m2!1sen!2snl!4v1680000000000!5m2!1sen!2snl"
            width="100%"
            height="100%"
            className="w-full h-full border-0 filter grayscale-[10%] contrast-110 opacity-90 group-hover:opacity-100 transition-opacity duration-700"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Chopras Indian Restaurant locatie in Den Haag"
          />

          {/* Floating Action Button on Map */}
          <div className="absolute bottom-6 right-6 z-20">
            <a
              href="https://maps.google.com/?q=Leyweg+986+Den+Haag"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 rounded-full bg-white px-6 py-3 text-transparent bg-clip-text bg-gradient-to-b from-[#000066] via-[#0000B3] to-[#0000FF] text-sm font-bold uppercase tracking-widest shadow-[0_8px_30px_rgba(0,0,0,0.3)] transition-all duration-300 hover:scale-105 hover:shadow-[0_8px_40px_rgba(255,255,255,0.2)]"
            >
              {tr.common.getDirections}
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>

      </div>
    </section>
  )
}
