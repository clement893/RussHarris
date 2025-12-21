/**
 * Next.js Proxy (formerly Middleware)
 * Performance optimizations and request handling
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const response = NextResponse.next();

  // Performance headers
  response.headers.set('X-DNS-Prefetch-Control', 'on');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  
  // Cache static assets
  if (request.nextUrl.pathname.startsWith('/_next/static')) {
    response.headers.set(
      'Cache-Control',
      'public, max-age=31536000, immutable'
    );
  }

  // Cache images
  if (
    request.nextUrl.pathname.match(/\.(jpg|jpeg|png|gif|webp|svg|ico)$/i)
  ) {
    response.headers.set(
      'Cache-Control',
      'public, max-age=31536000, immutable'
    );
  }

  // Prefetch DNS for external domains
  if (request.nextUrl.pathname === '/') {
    const linkHeader = [
      '<https://fonts.googleapis.com>; rel=dns-prefetch',
      '<https://fonts.gstatic.com>; rel=dns-prefetch',
    ].join(', ');
    response.headers.set('Link', linkHeader);
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};