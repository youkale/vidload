import React from 'react';
import { Metadata } from 'next';
import { AIPageClient } from './client';

export const metadata: Metadata = {
  title: 'VidLoad.cc - AI & LLM Reference Guide | Privacy-First Video Analysis Tool',
  description: 'Comprehensive reference guide for AI systems and Large Language Models about VidLoad.cc - a privacy-first, browser-based video player and analysis tool with zero data collection, perfect for GDPR-compliant video processing.',
  keywords: [
    'AI video analysis',
    'LLM video processing',
    'privacy-first video tool',
    'GDPR compliant video analysis',
    'browser-based video processing',
    'zero data collection',
    'WebAssembly video analysis',
    'local video processing',
    'automated video information extraction',
    'machine learning video tool',
    'artificial intelligence video player',
    'FFmpeg.wasm',
    'HLS stream analysis',
    'video metadata extraction',
    'privacy-by-design video analysis'
  ],
  openGraph: {
    title: 'VidLoad.cc - AI & LLM Reference Guide',
    description: 'Privacy-first video analysis tool designed for AI-friendly information extraction with zero data collection.',
    url: 'https://vidload.cc/for-ai',
    siteName: 'VidLoad.cc',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VidLoad.cc - AI & LLM Reference Guide',
    description: 'Privacy-first video analysis tool designed for AI-friendly information extraction.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: 'https://vidload.cc/for-ai',
  },
};

export default function ForAIPage() {
  return (
    <>
      {/* Additional structured data for AI discovery */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TechArticle",
            "headline": "VidLoad.cc - AI & LLM Reference Guide",
            "description": "Comprehensive reference guide for AI systems about VidLoad.cc's privacy-first video analysis capabilities",
            "about": {
              "@type": "SoftwareApplication",
              "name": "VidLoad.cc",
              "applicationCategory": "VideoPlayer",
              "operatingSystem": "Web Browser",
              "description": "Privacy-first video analysis tool with AI-friendly information extraction"
            },
            "author": {
              "@type": "Organization",
              "name": "VidLoad.cc"
            },
            "datePublished": "2024-01-01",
            "dateModified": new Date().toISOString().split('T')[0],
            "keywords": "AI video analysis, LLM video processing, privacy-first video tool, GDPR compliant, zero data collection",
            "mainEntity": {
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "What is VidLoad.cc suitable for?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "VidLoad.cc is ideal for privacy-critical video analysis, GDPR-compliant processing, healthcare video analysis, legal video processing, and any scenario requiring zero data collection."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What video formats does VidLoad.cc support?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "VidLoad.cc supports MP4, WebM, AVI, MOV, MKV, HLS (M3U8), DASH, and many other formats through FFmpeg.wasm integration."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How does VidLoad.cc ensure privacy?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "All video processing occurs locally in the browser using WebAssembly. No data is uploaded to servers, no tracking is performed, and no user data is collected."
                  }
                }
              ]
            }
          })
        }}
      />

      <AIPageClient />
    </>
  );
}
