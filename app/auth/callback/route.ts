import { NextRequest, NextResponse } from 'next/server'

const AUTH_URL = process.env.AUTH_URL ?? 'https://core.prod.ax.krafton.com'
const COOKIE_NAME = 'ax-token'
const IS_PROD = process.env.NODE_ENV === 'production'

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get('code')
  if (!code) {
    return NextResponse.redirect(new URL('/login?error=no_code', request.url))
  }

  try {
    const res = await fetch(`${AUTH_URL}/api/v1/auth/sso/azure-ax-sso-app/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ grant_type: 'exchange_code', code }),
    })

    if (!res.ok) {
      const errBody = await res.text()
      return NextResponse.redirect(
        new URL(
          `/login?error=token_exchange_failed&status=${res.status}&detail=${encodeURIComponent(errBody.substring(0, 200))}`,
          request.url
        )
      )
    }

    const data = (await res.json()) as { access_token: string }
    if (!data.access_token) {
      return NextResponse.redirect(
        new URL(
          `/login?error=no_access_token&keys=${encodeURIComponent(Object.keys(data).join(','))}`,
          request.url
        )
      )
    }

    const response = NextResponse.redirect(new URL('/', request.url))
    response.cookies.set(COOKIE_NAME, data.access_token, {
      httpOnly: true,
      secure: IS_PROD,
      sameSite: 'lax',
      maxAge: 900,
      path: '/',
    })
    return response
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'unknown'
    return NextResponse.redirect(
      new URL(`/login?error=auth_failed&msg=${encodeURIComponent(msg.substring(0, 200))}`, request.url)
    )
  }
}
