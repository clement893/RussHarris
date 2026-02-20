import { NextResponse } from 'next/server';
import { BASE_URL, getPublicSitemapUrls } from '@/config/sitemap';

const isLocalHost = (hostname: string) =>
  hostname === 'localhost' || hostname === '0.0.0.0' || hostname === '127.0.0.1';

export async function GET(request: Request) {
  // Use request origin in production; in local/dev use NEXT_PUBLIC_APP_URL so URLs are canonical
  let baseUrl = BASE_URL;
  if (request?.url) {
    const origin = new URL(request.url).origin;
    const hostname = new URL(request.url).hostname;
    if (!isLocalHost(hostname)) baseUrl = origin;
  }
  // Pages du site Russ Harris uniquement (accueil + Programme, Villes & dates, etc.) en FR et EN
  const pages = getPublicSitemapUrls();

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${pages
  .map(
    (page) => `  <url>
    <loc>${baseUrl}${page.path}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new NextResponse(sitemap, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}

