import { NextRequest, NextResponse } from 'next/server'

export const locales = ['en', 'nl'] as const
export type Locale = typeof locales[number]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip middleware for static files and API routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/images') ||
    pathname.startsWith('/og') ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  // If path starts with /nl/ or is exactly /nl — serve Dutch, no redirect
  if (pathname.startsWith('/nl/') || pathname === '/nl') {
    return NextResponse.next()
  }

  // If path starts with /en/ — 301 redirect to strip the /en prefix
  if (pathname.startsWith('/en/')) {
    const newPath = pathname.replace('/en', '')
    return NextResponse.redirect(
      new URL(newPath || '/', request.url),
      { status: 301 }
    )
  }

  // If path is exactly /en — 301 redirect to root
  if (pathname === '/en') {
    return NextResponse.redirect(new URL('/', request.url), { status: 301 })
  }

  // Everything else — rewrite internally to /en prefix so Next.js routes to [locale] pages
  // The browser URL stays unchanged (e.g. /menu stays /menu, not /en/menu)
  const rewrittenPath = pathname === '/' ? '/en' : `/en${pathname}`
  return NextResponse.rewrite(new URL(rewrittenPath, request.url))
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)'],
}
