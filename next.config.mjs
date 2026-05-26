/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 2592000,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 192, 256],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'chopras.nl',
      },
    ],
  },
  poweredByHeader: false,
  async redirects() {
    return [
      // Page consolidation — /en/ prefix kept here because middleware will then strip it
      { source: '/party-venue-den-haag', destination: '/feestzaal-den-haag', permanent: true },
      { source: '/en/party-venue-den-haag', destination: '/feestzaal-den-haag', permanent: true },
      { source: '/nl/party-venue-den-haag', destination: '/nl/feestzaal-den-haag', permanent: true },
      { source: '/about-us', destination: '/about', permanent: true },
      { source: '/about-us/', destination: '/about', permanent: true },
      { source: '/privacy', destination: '/privacy-policy', permanent: true },
      { source: '/privacy/', destination: '/privacy-policy', permanent: true },
      { source: '/nl/privacy', destination: '/nl/privacy-policy', permanent: true },
      { source: '/nl/privacy/', destination: '/nl/privacy-policy', permanent: true },
      { source: '/nl/en/:path*', destination: '/nl/:path*', permanent: true },

      // Legacy flat URLs — now served at root, these point to root paths
      { source: '/reservations', destination: '/contact', permanent: true },
      { source: '/reservations/', destination: '/contact', permanent: true },
      { source: '/event-space-den-haag', destination: '/catering', permanent: true },
      { source: '/event-space-den-haag/', destination: '/catering', permanent: true },

      // Dutch-only landing pages — avoid indexable/noindex English duplicates at root
      { source: '/beste-indiaas-restaurant-den-haag', destination: '/nl/beste-indiaas-restaurant-den-haag', permanent: true },
      { source: '/bruiloft-catering-den-haag', destination: '/nl/bruiloft-catering-den-haag', permanent: true },
      { source: '/zaal-huren-den-haag', destination: '/nl/zaal-huren-den-haag', permanent: true },
      { source: '/evenementenruimte-den-haag', destination: '/nl/evenementenruimte-den-haag', permanent: true },
    ]
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
      {
        source: '/images/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ]
  },
};

export default nextConfig;
