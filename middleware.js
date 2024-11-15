import { createI18nMiddleware } from 'next-international/middleware';
import { NextResponse } from 'next/server'
import { Buffer } from 'buffer';

let development = process.env.ENVIRONMENT === 'development'
// console.log("Is Development Mode:", development);

const I18nMiddleware = createI18nMiddleware({
    locales: ['en', 'es', 'il'],
    defaultLocale: 'en',
  });

export function middleware(request) {
    const { pathname } = request.nextUrl;

    // Ignore static files
    if (pathname.startsWith('/images') || pathname.startsWith('/uploads') || pathname.startsWith('/_next')) {
        return NextResponse.next();
    }

    const response = I18nMiddleware(request);
    const nonce = Buffer.from(crypto.randomUUID()).toString('base64')
    const cspHeader = `
    default-src 'self';
    script-src 'self' ${development ? "'unsafe-eval' 'unsafe-inline'" : `'nonce-${nonce}'`};
    style-src 'self' ${development ? "'unsafe-inline'" : `'nonce-${nonce}'`};
    img-src 'self' blob: data: https://*.basemaps.cartocdn.com;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
`
    // const requestHeaders = new Headers(request.headers)
    const requestHeaders = new Headers(response ? response.headers : request.headers);

    requestHeaders.set('x-nonce', nonce)
    requestHeaders.set('Content-Security-Policy', cspHeader.replace(/\s{2,}/g, ' ').trim())
    requestHeaders.set('Referrer-Policy', 'strict-origin')
    requestHeaders.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains')
    requestHeaders.set('X-Frame-Options', 'DENY')
    requestHeaders.set('X-Content-Type-Options', 'nosniff')
    requestHeaders.set('X-XSS-Protection', '1; mode=block')
    requestHeaders.set('Permissions-Policy', 'geolocation=(self), microphone=()')
    requestHeaders.set('Referrer-Policy', 'strict-origin')

    return response || NextResponse.next({
        headers: requestHeaders,
        request: {
            headers: requestHeaders,
        }
    })
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        // '/((?!api|static|.*\\..*|_next|favicon.ico|robots.txt).*)',
        {
            source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
            missing: [
                { type: 'header', key: 'next-router-prefetch' },
                { type: 'header', key: 'purpose', value: 'prefetch' },
            ],
        },
    ],
}
