import { NextResponse } from 'next/server';
import { BASE_URL, CANONICAL_SITE_URL } from '@/config/sitemap';

const isLocalHost = (hostname: string) =>
  hostname === 'localhost' || hostname === '0.0.0.0' || hostname === '127.0.0.1';

export async function GET(request: Request) {
  let baseUrl = CANONICAL_SITE_URL;
  if (request?.url) {
    const url = new URL(request.url);
    if (isLocalHost(url.hostname)) baseUrl = BASE_URL.replace(/\/$/, '');
  }
  const robotsTxt = `User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /dashboard/
Disallow: /_next/
Disallow: /auth/

Sitemap: ${baseUrl}/sitemap.xml
`;

  return new NextResponse(robotsTxt, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}

