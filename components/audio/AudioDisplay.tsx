'use client';

import React, { useState, useEffect } from 'react';
import AudioPlayer from './AudioPlayer';
import AudioInfo from './AudioInfo';
import AudioConverter from './AudioConverter';
import { AudioMetadata } from '@/lib/audio/types';

interface AudioDisplayProps {
  audioUrl: string;
  metadata: AudioMetadata;
  audioFile?: File;
}

export default function AudioDisplay({ audioUrl, metadata, audioFile }: AudioDisplayProps) {
  const [activeTab, setActiveTab] = useState<'player' | 'info' | 'converter'>('player');
  const [convertedBlob, setConvertedBlob] = useState<Blob | null>(null);

  const handleConverted = (blob: Blob, format: string) => {
    setConvertedBlob(blob);
    console.log(`Audio converted to ${format}`);
  };

  const handleDownload = () => {
    if (!convertedBlob) return;
    
    const url = URL.createObjectURL(convertedBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `converted_audio.mp3`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full space-y-4">
      <div className="flex gap-2 border-b border-gray-700 pb-2">
        <button
          onClick={() => setActiveTab('player')}
          className={`px-4 py-2 rounded-t ${
            activeTab === 'player'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-800 text-gray-400 hover:text-white'
          }`}
        >
          Player
        </button>
        <button
          onClick={() => setActiveTab('info')}
          className={`px-4 py-2 rounded-t ${
            activeTab === 'info'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-800 text-gray-400 hover:text-white'
          }`}
        >
          Info
        </button>
        {audioFile && (
          <button
            onClick={() => setActiveTab('converter')}
            className={`px-4 py-2 rounded-t ${
              activeTab === 'converter'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-800 text-gray-400 hover:text-white'
            }`}
          >
            Converter
          </button>
        )}
      </div>

      <div className="mt-4">
        {activeTab === 'player' && (
          <AudioPlayer
            src={audioUrl}
            title={metadata.title}
            artist={metadata.artist}
            albumArt={metadata.albumArt}
          />
        )}

        {activeTab === 'info' && <AudioInfo metadata={metadata} />}

        {activeTab === 'converter' && audioFile && (
          <div className="space-y-4">
            <AudioConverter
              file={audioFile}
              onConverted={handleConverted}
            />
            {convertedBlob && (
              <button
                onClick={handleDownload}
                className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors"
              >
                Download Converted Audio
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
