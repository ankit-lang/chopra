import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/constants'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  verification: {
    google: 'wlKf4_QucGxe_8EzgzvDW-5o4TVD1vcuhPaBtHSZkz8',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children
}
