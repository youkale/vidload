import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import CookieBanner from '../components/CookieBanner';

// 优化字体加载：使用 display: 'swap' 避免阻塞渲染
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://vidload.xyz'),
  title: 'VidLoad - Privacy-First Universal Video Player & Analyzer',
  description: 'Privacy-focused video player and analyzer. Analyze video metadata, play HLS streams locally in your browser. GDPR compliant, no data upload required.',
  keywords: 'video player, video analyzer, HLS player, M3U8 player, video metadata, FFmpeg online, privacy-first video tool, local video processing, GDPR compliant, video format analyzer',
  authors: [{ name: 'VidLoad Team' }],
  creator: 'VidLoad',
  publisher: 'VidLoad',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#3b82f6' },
    ],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    title: 'VidLoad - Privacy-First Universal Video Player & Analyzer',
    description: 'Analyze videos and play HLS streams locally in your browser. Minimal data collection, GDPR compliant, open source.',
    type: 'website',
    url: 'https://vidload.xyz',
    siteName: 'VidLoad',
    locale: 'en_US',
    images: [
      {
        url: '/logo.svg',
        width: 1200,
        height: 630,
        alt: 'VidLoad - Privacy-First Video Analysis',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VidLoad - Privacy-First Video Player & Analyzer',
    description: 'Universal video player and analyzer that respects your privacy. All processing happens locally in your browser.',
    creator: '@vidloadcc',
    images: ['/logo.svg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://vidload.xyz',
    languages: {
      'en': 'https://vidload.xyz',
      'zh': 'https://vidload.xyz?lang=zh',
      'ja': 'https://vidload.xyz?lang=ja',
    },
  },
  category: 'technology',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        {/* DNS 预解析 */}
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link rel="dns-prefetch" href="https://cdn.jsdelivr.net" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        
        {/* Multilingual support */}
        <link rel="alternate" hrefLang="en" href="https://vidload.xyz" />
        <link rel="alternate" hrefLang="zh" href="https://vidload.xyz?lang=zh" />
        <link rel="alternate" hrefLang="ja" href="https://vidload.xyz?lang=ja" />
        <link rel="alternate" hrefLang="x-default" href="https://vidload.xyz" />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        {children}
        <CookieBanner />

        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-9JGWQHL4BJ"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-9JGWQHL4BJ');
          `}
        </Script>

        {/* Google AdSense */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2775559257728508"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />

        {/* Microsoft Clarity */}
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "t8njom49n3");
          `}
        </Script>
      </body>
    </html>
  );
}
