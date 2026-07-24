'use client'

import { type Locale } from '@/lib/useTranslations'
import { useInView } from '@/hooks/useInView'
import {
  MapPin,
  Gift,
  ChefHat,
  Leaf,
  Cake,
  Briefcase,
  Heart,
  Truck,
  Scroll,
  Handshake,
  Utensils,
  Users,
} from 'lucide-react'

const featuresEn = [
  { text: 'Private Party Hall in Den Haag', Icon: MapPin },
  { text: 'No Separate Hall Rental with Food Booking', Icon: Gift },
  { text: 'Authentic Indian Catering', Icon: ChefHat },
  { text: 'Vegetarian, Vegan & Halal Menu Options', Icon: Leaf },
  { text: 'Birthday, Anniversary & Baby Shower Celebrations', Icon: Cake },
  { text: 'Corporate Events & Business Gatherings', Icon: Briefcase },
  { text: 'Wedding & Pre-Wedding Functions', Icon: Heart },
  { text: 'Outside Catering Across Den Haag & Nearby Cities', Icon: Truck },
  { text: 'Custom Menus for Every Occasion', Icon: Scroll },
  { text: 'Friendly Team & Professional Service', Icon: Handshake },
  { text: 'Freshly Prepared Food with Premium Indian Spices', Icon: Utensils },
  { text: 'Trusted by Families & Corporate Clients', Icon: Users },
]

const featuresNl = [
  { text: 'Privé Feestzaal in Den Haag', Icon: MapPin },
  { text: 'Geen Aparte Zaalhuur bij Boeking van Arrangementen', Icon: Gift },
  { text: 'Authentieke Indiase Catering', Icon: ChefHat },
  { text: 'Vegetarische, Veganistische & Halal Opties', Icon: Leaf },
  { text: 'Verjaardagen, Jubilea & Baby Showers', Icon: Cake },
  { text: 'Bedrijfsevenementen & Zakelijke Bijeenkomsten', Icon: Briefcase },
  { text: 'Bruiloften & Feesten', Icon: Heart },
  { text: 'Catering op Locatie in Den Haag & Omgeving', Icon: Truck },
  { text: 'Aangepaste Menu\'s voor Elke Gelegenheid', Icon: Scroll },
  { text: 'Vriendelijk Team & Professionele Service', Icon: Handshake },
  { text: 'Vers Bereid Eten met Indiase Specerijen', Icon: Utensils },
  { text: 'Vertrouwd door Families & Zakelijke Klanten', Icon: Users },
]

export default function EventWhyChoose({ locale = 'en' }: { locale?: Locale }) {
  const { ref: headerRef, inView: headerInView } = useInView(0.1)
  const isNl = locale === 'nl'
  const featuresList = isNl ? featuresNl : featuresEn

  return (
    <section className="bg-[#FAFAFA] py-20 md:py-28 px-5 md:px-12 overflow-hidden border-t border-black/5">
      <div className="max-w-6xl mx-auto">
        <div
          ref={headerRef}
          className={`text-center mb-16 transition-all duration-[1100ms] ease-[cubic-bezier(0.32,0.72,0,1)] ${headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
        >
          <span className="inline-flex items-center justify-center gap-1.5 rounded-full bg-[#0000B3]/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#0000B3] mb-4">
            {isNl ? 'Waarom Ons Kiezen' : 'Why Choose Us'}
          </span>
          <h2 className="font-heading font-semibold text-3xl md:text-4xl lg:text-[2.5rem] text-[#06068a] leading-tight">
            {isNl ? 'Waarom Kiezen voor Chopras voor Uw Volgende Evenement?' : 'Why Choose Chopras for Your Next Event?'}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 justify-center">
          {featuresList.map((feature, i) => {
            return <FeatureCard key={i} feature={feature} index={i} />
          })}
        </div>

        <div className="mt-12 text-center text-sm md:text-base text-gray-500 max-w-3xl mx-auto italic font-body bg-white rounded-xl p-4 md:p-6 border border-gray-100 shadow-sm">
          {isNl
            ? 'Onze privéfeestzaal is beschikbaar bij het boeken van een van onze maaltijdarrangementen. Neem contact op met ons team voor pakketdetails en beschikbaarheid.'
            : 'Private party hall is available with qualifying food bookings. Please contact our team for package details and availability.'}
        </div>
      </div>
    </section>
  )
}

function FeatureCard({ feature, index }: { feature: { text: string; Icon: any }; index: number }) {
  const { ref, inView } = useInView(0.1)
  const delay = Math.min(index * 100, 1100) // Stagger effect

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${inView ? delay : 0}ms` }}
      className={`group relative flex items-center gap-4 rounded-2xl bg-white p-5 border border-black/5 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all duration-[600ms] ease-out hover:-translate-y-1 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
    >
      <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-[#06068a]/5 to-[#0000FF]/5 text-[#0000B3] group-hover:scale-110 group-hover:bg-gradient-to-b group-hover:from-[#06068a] group-hover:to-[#0000FF] group-hover:text-white transition-all duration-300">
        <feature.Icon strokeWidth={1.5} className="w-6 h-6" />
      </div>
      <p className="font-body text-[#1A1A1A]/80 text-[15px] font-medium leading-snug">
        {feature.text}
      </p>
    </div>
  )
}
