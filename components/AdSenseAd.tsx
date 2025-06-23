'use client';

import React, { useEffect, useRef } from 'react';

interface AdSenseAdProps {
  adSlot: string;
  adFormat?: 'auto' | 'rectangle' | 'horizontal' | 'vertical';
  adStyle?: React.CSSProperties;
  className?: string;
  fullWidthResponsive?: boolean;
}

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export default function AdSenseAd({
  adSlot,
  adFormat = 'auto',
  adStyle = { display: 'block' },
  className = '',
  fullWidthResponsive = true
}: AdSenseAdProps) {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if user has consented to ads
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (cookieConsent !== 'accepted') {
      return; // Don't load ads if user hasn't consented
    }

    try {
      if (typeof window !== 'undefined' && window.adsbygoogle) {
        // Push the ad configuration to AdSense
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (error) {
      console.error('AdSense error:', error);
    }
  }, []);

  // Don't render anything if user hasn't consented
  const cookieConsent = typeof window !== 'undefined' ? localStorage.getItem('cookieConsent') : null;
  if (cookieConsent !== 'accepted') {
    return (
      <div className={`bg-gray-800 border border-gray-700 rounded-lg p-4 text-center ${className}`}>
        <div className="text-gray-400 text-sm">
          <p className="mb-2">Advertisement Space</p>
          <p className="text-xs">
            Enable cookies to support our free service with privacy-friendly ads
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`ad-container ${className}`} ref={adRef}>
      <ins
        className="adsbygoogle"
        style={adStyle}
        data-ad-client="ca-pub-2775559257728508"
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidthResponsive.toString()}
      ></ins>
    </div>
  );
}
