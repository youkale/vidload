'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { AudioDisplay } from '@/components/audio';
import { MediaInput } from '@/components/media';
import { getAudioMetadata } from '@/lib/audio/metadata';
import { AudioMetadata } from '@/lib/audio/types';
import { detectMediaType } from '@/lib/media/detector';

interface AudioHistoryItem {
  id: string;
  url: string;
  isLocal: boolean;
  timestamp: number;
  metadata?: AudioMetadata;
  fileName?: string;
  fileSize?: number;
  file?: File;
}

export default function AudioPage() {
  const [currentAudio, setCurrentAudio] = useState<{
    url: string;
    metadata: AudioMetadata;
    file?: File;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [audioHistory, setAudioHistory] = useState<AudioHistoryItem[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const stored = localStorage.getItem('audio-history');
    if (stored) {
      try {
        setAudioHistory(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to load audio history:', e);
      }
    }
  }, []);

  useEffect(() => {
    if (isMounted && audioHistory.length > 0) {
      localStorage.setItem('audio-history', JSON.stringify(audioHistory));
    }
  }, [audioHistory, isMounted]);

  const handleFileSelect = async (file: File, mediaType: 'audio' | 'video') => {
    if (mediaType !== 'audio') {
      setError('This page only supports audio files. Please use the video page for video files.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const url = URL.createObjectURL(file);
      const metadata = await getAudioMetadata(file);

      setCurrentAudio({ url, metadata, file });

      const historyItem: AudioHistoryItem = {
        id: Math.random().toString(36).substr(2, 9),
        url,
        isLocal: true,
        timestamp: Date.now(),
        metadata,
        fileName: file.name,
        fileSize: file.size,
        file
      };

      setAudioHistory(prev => [historyItem, ...prev].slice(0, 20));
    } catch (err) {
      console.error('Error processing audio file:', err);
      setError(err instanceof Error ? err.message : 'Failed to process audio file');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUrlSubmit = async (url: string, mediaType: 'audio' | 'video') => {
    if (mediaType !== 'audio') {
      setError('This page only supports audio URLs. Please use the video page for video URLs.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const metadata = await getAudioMetadata(url);

      setCurrentAudio({ url, metadata });

      const historyItem: AudioHistoryItem = {
        id: Math.random().toString(36).substr(2, 9),
        url,
        isLocal: false,
        timestamp: Date.now(),
        metadata
      };

      setAudioHistory(prev => [historyItem, ...prev].slice(0, 20));
    } catch (err) {
      console.error('Error processing audio URL:', err);
      setError(err instanceof Error ? err.message : 'Failed to process audio URL');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReplayHistory = (item: AudioHistoryItem) => {
    if (item.isLocal && item.file) {
      const url = URL.createObjectURL(item.file);
      setCurrentAudio({
        url,
        metadata: item.metadata!,
        file: item.file
      });
    } else {
      setCurrentAudio({
        url: item.url,
        metadata: item.metadata!
      });
    }
  };

  const handleClearHistory = () => {
    setAudioHistory([]);
    localStorage.removeItem('audio-history');
  };

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Audio Analyzer - VidLoad</title>
        <meta name="description" content="Analyze and play audio files with advanced visualization and conversion features" />
      </Head>

      <div className="min-h-screen bg-gray-950 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <Link href="/" className="text-blue-400 hover:text-blue-300 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Video Player
            </Link>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Audio Analyzer
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Analyze audio files with advanced metadata extraction, real-time visualization, and format conversion.
              Supports MP3, AAC, WAV, FLAC, OGG, and more.
            </p>
          </div>

          <div className="mb-8">
            <MediaInput
              onFileSelect={handleFileSelect}
              onUrlSubmit={handleUrlSubmit}
              isLoading={isLoading}
              placeholder="Enter audio URL (MP3, AAC, WAV, FLAC, OGG, etc.)"
            />
          </div>

          {error && (
            <div className="max-w-4xl mx-auto mb-6">
              <div className="bg-red-900/50 border border-red-700 rounded-lg p-4">
                <p className="text-red-300">{error}</p>
              </div>
            </div>
          )}

          {isLoading && (
            <div className="max-w-4xl mx-auto mb-6">
              <div className="bg-blue-900/50 border border-blue-700 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-400"></div>
                  <p className="text-blue-300">Processing audio file...</p>
                </div>
              </div>
            </div>
          )}

          {currentAudio && (
            <div className="max-w-4xl mx-auto mb-8">
              <AudioDisplay
                audioUrl={currentAudio.url}
                metadata={currentAudio.metadata}
                audioFile={currentAudio.file}
              />
            </div>
          )}

          {audioHistory.length > 0 && (
            <div className="max-w-4xl mx-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Audio History</h2>
                <button
                  onClick={handleClearHistory}
                  className="text-sm text-gray-400 hover:text-red-400 transition-colors"
                >
                  Clear History
                </button>
              </div>

              <div className="grid gap-4">
                {audioHistory.map((item) => (
                  <div
                    key={item.id}
                    className="bg-gray-900 rounded-lg p-4 hover:bg-gray-800 transition-colors cursor-pointer"
                    onClick={() => handleReplayHistory(item)}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-sm text-gray-400">
                            {item.isLocal ? '📁' : '🌐'}
                          </span>
                          <span className="font-medium">
                            {item.fileName || item.url}
                          </span>
                        </div>
                        {item.metadata && (
                          <div className="text-sm text-gray-400 space-y-1">
                            <div className="flex gap-4">
                              <span>Duration: {item.metadata.duration}</span>
                              <span>Bitrate: {item.metadata.bitrate}</span>
                              <span>Codec: {item.metadata.codec}</span>
                            </div>
                            {item.metadata.title && (
                              <div className="text-blue-400">
                                {item.metadata.title}
                                {item.metadata.artist && ` - ${item.metadata.artist}`}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                      <div className="text-xs text-gray-500">
                        {new Date(item.timestamp).toLocaleString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="max-w-4xl mx-auto mt-12">
            <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-purple-700 rounded-xl p-6">
              <h3 className="text-xl font-bold text-purple-400 mb-4">Supported Audio Formats</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-purple-800/30 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-300 mb-2">Lossy Formats</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• MP3 (MPEG Audio Layer III)</li>
                    <li>• AAC (Advanced Audio Coding)</li>
                    <li>• OGG (Ogg Vorbis)</li>
                    <li>• M4A (MPEG-4 Audio)</li>
                  </ul>
                </div>
                <div className="bg-blue-800/30 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-300 mb-2">Lossless Formats</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• FLAC (Free Lossless Audio)</li>
                    <li>• WAV (Waveform Audio)</li>
                    <li>• AIFF (Audio Interchange)</li>
                    <li>• ALAC (Apple Lossless)</li>
                  </ul>
                </div>
                <div className="bg-green-800/30 rounded-lg p-4">
                  <h4 className="font-semibold text-green-300 mb-2">Features</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Real-time visualization</li>
                    <li>• ID3 tag extraction</li>
                    <li>• Format conversion</li>
                    <li>• Album art display</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
