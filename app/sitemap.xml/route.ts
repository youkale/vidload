import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const baseUrl = 'https://vidload.xyz'
  const currentDate = new Date().toISOString()

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
    <mobile:mobile/>
    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}"/>
    <xhtml:link rel="alternate" hreflang="zh" href="${baseUrl}?lang=zh"/>
    <xhtml:link rel="alternate" hreflang="ja" href="${baseUrl}?lang=ja"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}"/>
  </url>
  <url>
    <loc>${baseUrl}/privacy</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
    <mobile:mobile/>
    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/privacy"/>
    <xhtml:link rel="alternate" hreflang="zh" href="${baseUrl}/privacy?lang=zh"/>
    <xhtml:link rel="alternate" hreflang="ja" href="${baseUrl}/privacy?lang=ja"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}/privacy"/>
  </url>
  <url>
    <loc>${baseUrl}/terms</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
    <mobile:mobile/>
    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/terms"/>
    <xhtml:link rel="alternate" hreflang="zh" href="${baseUrl}/terms?lang=zh"/>
    <xhtml:link rel="alternate" hreflang="ja" href="${baseUrl}/terms?lang=ja"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}/terms"/>
  </url>
  <url>
    <loc>${baseUrl}/cookies</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
    <mobile:mobile/>
    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/cookies"/>
    <xhtml:link rel="alternate" hreflang="zh" href="${baseUrl}/cookies?lang=zh"/>
    <xhtml:link rel="alternate" hreflang="ja" href="${baseUrl}/cookies?lang=ja"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}/cookies"/>
  </url>
  <url>
    <loc>${baseUrl}/video-formats</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
    <mobile:mobile/>
    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/video-formats"/>
    <xhtml:link rel="alternate" hreflang="zh" href="${baseUrl}/video-formats?lang=zh"/>
    <xhtml:link rel="alternate" hreflang="ja" href="${baseUrl}/video-formats?lang=ja"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}/video-formats"/>
  </url>
  <url>
    <loc>${baseUrl}/use-cases</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
    <mobile:mobile/>
    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/use-cases"/>
    <xhtml:link rel="alternate" hreflang="zh" href="${baseUrl}/use-cases?lang=zh"/>
    <xhtml:link rel="alternate" hreflang="ja" href="${baseUrl}/use-cases?lang=ja"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}/use-cases"/>
  </url>
  <url>
    <loc>${baseUrl}/for-ai</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    <mobile:mobile/>
    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/for-ai"/>
    <xhtml:link rel="alternate" hreflang="zh" href="${baseUrl}/for-ai?lang=zh"/>
    <xhtml:link rel="alternate" hreflang="ja" href="${baseUrl}/for-ai?lang=ja"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}/for-ai"/>
  </url>
  <url>
    <loc>${baseUrl}/about</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
    <mobile:mobile/>
    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/about"/>
    <xhtml:link rel="alternate" hreflang="zh" href="${baseUrl}/about?lang=zh"/>
    <xhtml:link rel="alternate" hreflang="ja" href="${baseUrl}/about?lang=ja"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}/about"/>
  </url>
  <url>
    <loc>${baseUrl}/video-basics</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    <mobile:mobile/>
    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/video-basics"/>
    <xhtml:link rel="alternate" hreflang="zh" href="${baseUrl}/video-basics?lang=zh"/>
    <xhtml:link rel="alternate" hreflang="ja" href="${baseUrl}/video-basics?lang=ja"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}/video-basics"/>
  </url>
</urlset>`

  return new NextResponse(sitemap, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
      'X-Robots-Tag': 'noarchive',
      // 移除可能干扰爬虫的headers
      'Cross-Origin-Embedder-Policy': 'unsafe-none',
      'Cross-Origin-Opener-Policy': 'unsafe-none',
    },
  })
}
