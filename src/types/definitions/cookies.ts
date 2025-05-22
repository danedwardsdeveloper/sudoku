import type { cookieDurations, cookieNames } from '@/library/constants/definitions/cookies'

export type CookieNames = (typeof cookieNames)[keyof typeof cookieNames]

export type CookieDurations = (typeof cookieDurations)[keyof typeof cookieDurations]

export type BaseCookieOptions = {
	name: CookieNames
	httpOnly: true
	secure: boolean
	sameSite: 'strict'
	path: string
}

export type CookieOptions = BaseCookieOptions & {
	value: string
	maxAge?: CookieDurations
}

export interface TokenPayload {
	sub: number
	exp: number
}
