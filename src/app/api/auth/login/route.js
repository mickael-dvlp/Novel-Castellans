import { NextResponse } from 'next/server'

export async function POST(request) {
  const { password } = await request.json()

  if (!password || password !== process.env.SITE_PASSWORD) {
    return NextResponse.json({ error: 'Mot de passe incorrect' }, { status: 401 })
  }

  const response = NextResponse.json({ ok: true })
  response.cookies.set('site-auth', process.env.SITE_PASSWORD, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 30,
    path: '/',
  })
  return response
}
