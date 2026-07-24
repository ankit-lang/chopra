'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useInView } from '@/hooks/useInView'
import { getTranslations, type Locale } from '@/lib/useTranslations'

export default function CateringBanner({ locale = 'en' }: { locale?: Locale }) {
  const tr = getTranslations(locale)
  const base = locale === 'nl' ? '/nl' : ''
  const { ref, inView } = useInView()

  return (
    <section className="relative py-12 md:py-12 px-5 md:px-12 overflow-hidden">
      <Image
        src="/images/catering/wedding-celebrations---2.png"
        alt="Indian event catering and private hall at Chopras Den Haag"
        fill
        className="object-cover object-center brightness-110"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-[#1B2B5E]/60 via-[#1B2B5E]/50 to-[#0F1040]/55" />

      {/* Double-bezel content containerr */}
      <div
        ref={ref}
        className={`relative z-10 max-w-2xl mx-auto transition-all duration-[1100ms] ease-[cubic-bezier(0.32,0.72,0,1)] ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
      >
        <div className="rounded-[2rem] bg-white/[0.04] p-2 ring-1 ring-white/10">
          <div className="rounded-[calc(2rem-0.5rem)] bg-white/[0.04] px-10 py-12 md:px-14 md:py-14 text-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]">

            <span className="inline-flex items-center justify-center gap-1.5 rounded-full bg-white/95 px-6 py-2 text-lg md:text-xl font-heading text-[#1B2B5E] shadow-lg mb-7">
              {locale === 'nl' ? <>Evenementen <span className="italic font-normal">&amp; Catering</span></> : <>Event <span className="italic font-normal">&amp; Catering</span></>}
            </span>

            <h2 className="font-semibold text-white italic text-3xl md:text-4xl lg:text-5xl leading-[1.3] [letter-spacing:0.02em] mt-2 mb-6">
              {locale === 'nl' ? (
                <>
                  Vier Elke Gelegenheid met
                  <br />
                  <span className="text-white/90">Authentieke Indiase Gastvrijheid</span>
                </>
              ) : (
                <>
                  Celebrate Every Occasion with
                  <br />
                  <span className="text-white/90">Authentic Indian Hospitality</span>
                </>
              )}
            </h2>

            <div className="font-body text-white/90 [&_p]:text-white/90 text-sm md:text-base mt-7 leading-relaxed max-w-xl mx-auto space-y-4">
              {locale === 'nl' ? (
                <>
                  <p>
                    Plant u een verjaardag, jubileum, baby shower, familie-bijeenkomst, bedrijfsevenement of speciale viering in Den Haag? Chopras Indian Restaurant biedt een gastvrije privéfeestzaal waar u onvergetelijke evenementen kunt organiseren met authentieke Indiase gerechten en warme gastvrijheid.
                  </p>
                  <p>
                    Onze privéfeestzaal is beschikbaar zonder aparte zaalhuur wanneer u uw evenement boekt met onze arrangementen. Of u nu een intiem familiediner of een grotere bijeenkomst organiseert, ons team helpt u bij het creëren van een ontspannen en op maat gemaakte ervaring.
                  </p>
                  <p>
                    Voor evenementen op uw eigen locatie verzorgen wij ook professionele Indiase catering in Den Haag, Delft, Rijswijk, Voorburg, Leidschendam en omgeving. Elk menu wordt vers bereid met hoogwaardige ingrediënten, traditionele recepten en authentieke Indiase specerijen.
                  </p>
                  <p>
                    Van privéfeesten en bruiloften tot zakelijke lunches en feestelijke vieringen: Chopras Indian Restaurant levert uitzonderlijk eten, aandachtige service en echte Indiase gastvrijheid — waar u ook kiest om te vieren.
                  </p>
                  <p>Wij verwelkomen u graag in onze feestzaal aan de Leyweg 986 in Den Haag voor al uw bruiloftscatering, verjaardagen, bedrijfsevenementen en privéfeesten.</p>
                </>
              ) : (
                <>
                  <p>
                    Planning a birthday, anniversary, baby shower, family gathering, corporate event or special celebration in Den Haag? Chopras Indian Restaurant offers a welcoming private party hall where you can host memorable events with authentic Indian cuisine and warm hospitality.
                  </p>
                  <p>
                    Our private event space is available without a separate hall rental fee when you book your event with our food packages, making it an ideal venue for celebrations of all sizes. Whether you are hosting an intimate family dinner or a larger gathering, our team will help create an experience that is relaxed, enjoyable and tailored to your occasion.
                  </p>
                  <p>
                    For events at your own venue, we also provide professional outside Indian catering across Den Haag, Delft, Rijswijk, Voorburg, Leidschendam and surrounding areas. Every menu is freshly prepared using premium ingredients, traditional recipes and authentic Indian spices, ensuring your guests enjoy the same quality and flavour that we proudly serve in our restaurant.
                  </p>
                  <p>
                    From private parties and weddings to corporate lunches and festive celebrations, Chopras Indian Restaurant delivers exceptional food, attentive service and genuine Indian hospitality—wherever you choose to celebrate.
                  </p>
                  <p>We proudly host celebrations in our event hall at Leyweg 986, making Chopras one of the
                    preferred venues for Indian wedding catering Den Haag, birthday catering, corporate events,
                    Diwali dinners and private celebrations.</p>
                </>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-10">
              <Link
                href={`${base}/feestzaal-den-haag`}
                className="group inline-flex items-center justify-center gap-3 rounded-full btn-gradient pl-7 pr-2 py-2 text-white text-sm font-semibold uppercase tracking-widest transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:btn-gradient active:scale-[0.98]"
              >
                {locale === 'nl' ? 'Feestzaal Aanvraag' : 'Party Hall Enquiry'}
                <span className="inline-flex w-9 h-9 items-center justify-center rounded-full bg-black/10 transition-all duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:scale-105">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" strokeWidth="1.5" stroke="currentColor">
                    <path d="M2.5 11.5L11.5 2.5M11.5 2.5H5M11.5 2.5V9" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </Link>
              <Link
                href={`${base}/catering`}
                className="group inline-flex items-center justify-center gap-3 rounded-full border border-white/20 bg-white/5 pl-7 pr-2 py-2 text-white text-sm uppercase tracking-widest transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-white/40 hover:bg-white/10 active:scale-[0.98]"
              >
                {locale === 'nl' ? 'Catering Offerte' : 'Catering Quote'}
                <span className="inline-flex w-9 h-9 items-center justify-center rounded-full bg-white/10 transition-all duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:scale-105">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" strokeWidth="1.5" stroke="currentColor">
                    <path d="M2.5 11.5L11.5 2.5M11.5 2.5H5M11.5 2.5V9" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </Link>
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center mt-9">
              {['Indian Buffet Den Haag', 'Party Venue Den Haag', 'Halal Certified', '25–80 Guests'].map((fact) => (
                <span key={fact} className="font-body text-white/40 text-xs uppercase tracking-wider">{fact}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
