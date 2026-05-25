import { NextResponse } from 'next/server'

export function middleware(request) {
  const { pathname } = request.nextUrl

  if (pathname === '/login' || pathname.startsWith('/api/auth/login')) {
    return NextResponse.next()
  }

  const sitePassword = process.env.SITE_PASSWORD
  if (!sitePassword) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  const cookie = request.cookies.get('site-auth')
  if (cookie?.value === sitePassword) {
    return NextResponse.next()
  }

  return NextResponse.redirect(new URL('/login', request.url))
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|image/).*)'],
}
