import { NextResponse } from 'next/server';
import { BASE_URL } from '@/config/sitemap';

export async function GET(request: Request) {
  const baseUrl = request?.url ? new URL(request.url).origin : BASE_URL;
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

