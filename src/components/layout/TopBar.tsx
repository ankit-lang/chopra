import { Phone, Mail } from 'lucide-react'
import EmailLink from '@/components/ui/EmailLink'

export default function TopBar() {
  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 h-9 bg-white border-b border-gray-200"
    >
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">

        {/* LEFT - Phone and Email */}
        <div className="flex items-center gap-6">
          <a
            href="tel:+31630645930"
            className="flex items-center gap-2 text-[#1B2B5E] hover:text-[#0000C9] transition-colors text-xs"
          >
            <Phone className="w-3 h-3  text-[#1B2B5E]" />
            <span>+31 6 30645930</span>
          </a>

          <div className="w-px h-3 bg-[#1B2B5E]/20" />

          <div className="flex  text-[#1B2B5E] items-center gap-2 text-xs">
            <Mail className="w-3 h-3 text-[#1B2B5E]" />
            <EmailLink className="text-[#1B2B5E] hover:text-[#0000C9] transition-colors" />
          </div>
        </div>

        {/* CENTER - Announcement (hidden on mobile) */}
        <p className="hidden md:block text-[#1B2B5E]/60 text-xs text-center">
          <span className="text-white">&#9733;</span>
          {' '}Open Tuesday to Sunday &middot; 16:30 to 22:30 &middot; Leyweg 986, Den Haag{' '}
          <span className="text-white">&#9733;</span>
        </p>

        {/* RIGHT - Info pills (hidden on mobile) */}
        <div className="hidden md:flex items-center gap-4">
          <p className="text-[#1B2B5E]/60 text-xs">100% Halal Certified</p>
        </div>

      </div>
    </div>
  )
}
