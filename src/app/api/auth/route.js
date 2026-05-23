import { NextResponse } from 'next/server'

export async function GET(request) {
  const clientId = process.env.GITHUB_CLIENT_ID
  if (!clientId) {
    return new NextResponse('GITHUB_CLIENT_ID non configuré', { status: 500 })
  }

  const callbackUrl = `${request.nextUrl.origin}/api/auth/callback`
  const authUrl = new URL('https://github.com/login/oauth/authorize')
  authUrl.searchParams.set('client_id', clientId)
  authUrl.searchParams.set('scope', 'repo')
  authUrl.searchParams.set('redirect_uri', callbackUrl)

  return NextResponse.redirect(authUrl.toString())
}
