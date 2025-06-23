import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import CookieBanner from '../components/CookieBanner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://vidload.cc'),
  title: 'VidLoad.cc - Privacy-First Universal Video Player & Analyzer',
  description: 'VidLoad.cc is a cutting-edge, privacy-focused universal video player and analysis tool. Analyze video metadata, play HLS streams, and extract technical details - all locally in your browser with minimal data collection. GDPR compliant.',
  keywords: 'video player, video analyzer, HLS player, M3U8 player, video metadata, FFmpeg online, privacy-first video tool, local video processing, GDPR compliant, video format analyzer',
  authors: [{ name: 'VidLoad.cc Team' }],
  creator: 'VidLoad.cc',
  publisher: 'VidLoad.cc',
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
    title: 'VidLoad.cc - Privacy-First Universal Video Player & Analyzer',
    description: 'Analyze videos and play HLS streams locally in your browser. Minimal data collection, GDPR compliant, open source.',
    type: 'website',
    url: 'https://vidload.cc',
    siteName: 'VidLoad.cc',
    locale: 'en_US',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'VidLoad.cc - Privacy-First Video Analysis',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VidLoad.cc - Privacy-First Video Player & Analyzer',
    description: 'Universal video player and analyzer that respects your privacy. All processing happens locally in your browser.',
    creator: '@vidloadcc',
    images: ['/og-image.png'],
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
    canonical: 'https://vidload.cc',
  },
  category: 'technology',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-9JGWQHL4BJ"></script>

        {/* Google AdSense */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2775559257728508"
          crossOrigin="anonymous"
        ></script>

        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}

              // Configure consent mode before GA initialization
              gtag('consent', 'default', {
                analytics_storage: 'denied',
                ad_storage: 'denied',
                ad_user_data: 'denied',
                ad_personalization: 'denied',
                wait_for_update: 500
              });

              gtag('js', new Date());
              gtag('config', 'G-9JGWQHL4BJ', {
                page_title: document.title,
                page_location: window.location.href,
                anonymize_ip: true,
                allow_google_signals: false,
                allow_ad_personalization_signals: false,
                cookie_expires: 63072000, // 2 years
                cookie_update: false,
                cookie_flags: 'SameSite=None;Secure'
              });
            `,
          }}
        />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
