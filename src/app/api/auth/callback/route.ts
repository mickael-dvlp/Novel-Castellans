import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get('code')

  if (!code) {
    return buildPage('error', { message: 'Code OAuth manquant' })
  }

  try {
    const res = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      }),
    })

    const data = (await res.json()) as {
      access_token?: string
      error?: string
      error_description?: string
    }

    if (!data.access_token) {
      return buildPage('error', {
        message: data.error_description ?? data.error ?? 'Token manquant',
      })
    }

    return buildPage('success', { token: data.access_token, provider: 'github' })
  } catch {
    return buildPage('error', { message: 'Erreur serveur' })
  }
}

function buildPage(status: 'success' | 'error', data: object) {
  const safeData = JSON.stringify(data).replace(/</g, '\\u003c')
  const html = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /><title>Authentification GitHub</title></head>
<body>
<script>
(function () {
  var payload = ${safeData};
  function onMessage(e) {
    window.opener.postMessage(
      'authorization:github:${status}:' + JSON.stringify(payload),
      e.origin
    );
  }
  window.addEventListener('message', onMessage, false);
  window.opener.postMessage('authorizing:github', '*');
})();
</script>
<p style="font-family:sans-serif;text-align:center;margin-top:2rem;color:#666">
  ${status === 'success' ? 'Connexion réussie, fermeture…' : 'Erreur d\'authentification.'}
</p>
</body>
</html>`

  return new NextResponse(html, {
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  })
}
