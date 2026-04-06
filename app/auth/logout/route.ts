import { NextRequest, NextResponse } from 'next/server'

const COOKIE_NAME = 'ax-token'

export async function GET(request: NextRequest) {
  const response = NextResponse.redirect(new URL('/login', request.url))
  response.cookies.delete(COOKIE_NAME)
  return response
}
