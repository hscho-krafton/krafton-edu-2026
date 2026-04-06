import { cookies } from 'next/headers'

export const AUTH_URL = process.env.AUTH_URL ?? 'https://core.prod.ax.krafton.com'
export const APP_URL = process.env.APP_URL ?? 'http://localhost:3000'
const COOKIE_NAME = 'ax-token'

export interface AuthUser {
  sub: string
  email: string
  name?: string
  role?: string
}

export async function verifyToken(token: string): Promise<AuthUser | null> {
  try {
    const payloadB64 = token.split('.')[1]
    const payload = JSON.parse(Buffer.from(payloadB64, 'base64url').toString())
    return {
      sub: payload.sub ?? '',
      email: payload.email ?? '',
      name: payload.name,
      role: payload.role,
    }
  } catch {
    return null
  }
}

export async function getSession(): Promise<AuthUser | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get(COOKIE_NAME)?.value
  if (!token) return null
  return verifyToken(token)
}
