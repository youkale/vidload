'use client';

import React from 'react';
import { AudioMetadata } from '@/lib/audio/types';

interface AudioInfoProps {
  metadata: AudioMetadata;
}

export default function AudioInfo({ metadata }: AudioInfoProps) {
  const formatValue = (value: string | undefined, label: string) => {
    if (!value || value === 'N/A') return null;
    return (
      <div className="flex justify-between py-2 border-b border-gray-700">
        <span className="text-gray-400">{label}</span>
        <span className="text-white font-medium">{value}</span>
      </div>
    );
  };

  return (
    <div className="w-full bg-gray-900 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Audio Information</h3>
      
      {metadata.albumArt && (
        <div className="mb-6">
          <img
            src={metadata.albumArt}
            alt="Album Art"
            className="w-48 h-48 object-cover rounded-lg shadow-lg mx-auto"
          />
        </div>
      )}

      <div className="space-y-1">
        {formatValue(metadata.title, 'Title')}
        {formatValue(metadata.artist, 'Artist')}
        {formatValue(metadata.album, 'Album')}
        {formatValue(metadata.year, 'Year')}
        {formatValue(metadata.genre, 'Genre')}
        {formatValue(metadata.trackNumber, 'Track Number')}
        
        <div className="border-t border-gray-700 my-4" />
        
        {formatValue(metadata.duration, 'Duration')}
        {formatValue(metadata.bitrate, 'Bitrate')}
        {formatValue(metadata.sampleRate, 'Sample Rate')}
        {formatValue(metadata.channels, 'Channels')}
        {formatValue(metadata.codec, 'Codec')}
        {formatValue(metadata.format, 'Format')}
        {formatValue(metadata.size, 'Size')}
        {formatValue(metadata.bitDepth, 'Bit Depth')}
        {formatValue(metadata.compressionRatio, 'Compression Ratio')}
      </div>
    </div>
  );
}
