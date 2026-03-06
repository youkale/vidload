'use client';

import React, { useState, useCallback } from 'react';
import { convertAudio } from '@/lib/audio/metadata';
import { AudioConversionOptions } from '@/lib/audio/types';

interface AudioConverterProps {
  file: File;
  onConverted?: (blob: Blob, format: string) => void;
  onError?: (error: string) => void;
}

export default function AudioConverter({ file, onConverted, onError }: AudioConverterProps) {
  const [isConverting, setIsConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [options, setOptions] = useState<AudioConversionOptions>({
    format: 'mp3',
    bitrate: '192k',
    sampleRate: '44100',
    channels: 2
  });

  const handleConvert = useCallback(async () => {
    setIsConverting(true);
    setProgress(0);

    try {
      setProgress(20);
      
      const outputData = await convertAudio(file, options.format, {
        bitrate: options.bitrate,
        sampleRate: options.sampleRate,
        channels: options.channels
      });

      setProgress(80);

      const blob = new Blob([new Uint8Array(outputData)], { type: `audio/${options.format}` });
      
      setProgress(100);
      
      onConverted?.(blob, options.format);
    } catch (error) {
      console.error('Conversion error:', error);
      onError?.(error instanceof Error ? error.message : 'Conversion failed');
    } finally {
      setIsConverting(false);
      setProgress(0);
    }
  }, [file, options, onConverted, onError]);

  const handleDownload = useCallback((blob: Blob, format: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `converted_audio.${format}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, []);

  return (
    <div className="w-full max-w-md mx-auto bg-gray-900 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Audio Converter</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Output Format
          </label>
          <select
            value={options.format}
            onChange={(e) => setOptions({ ...options, format: e.target.value as AudioConversionOptions['format'] })}
            className="w-full bg-gray-800 text-white rounded px-3 py-2 border border-gray-700 focus:outline-none focus:border-blue-500"
          >
            <option value="mp3">MP3</option>
            <option value="aac">AAC</option>
            <option value="wav">WAV</option>
            <option value="flac">FLAC</option>
            <option value="ogg">OGG</option>
            <option value="m4a">M4A</option>
          </select>
        </div>

        {options.format !== 'wav' && options.format !== 'flac' && (
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Bitrate
            </label>
            <select
              value={options.bitrate}
              onChange={(e) => setOptions({ ...options, bitrate: e.target.value as AudioConversionOptions['bitrate'] })}
              className="w-full bg-gray-800 text-white rounded px-3 py-2 border border-gray-700 focus:outline-none focus:border-blue-500"
            >
              <option value="128k">128 kbps</option>
              <option value="192k">192 kbps</option>
              <option value="256k">256 kbps</option>
              <option value="320k">320 kbps</option>
            </select>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Sample Rate
          </label>
          <select
            value={options.sampleRate}
            onChange={(e) => setOptions({ ...options, sampleRate: e.target.value as AudioConversionOptions['sampleRate'] })}
            className="w-full bg-gray-800 text-white rounded px-3 py-2 border border-gray-700 focus:outline-none focus:border-blue-500"
          >
            <option value="44100">44.1 kHz</option>
            <option value="48000">48 kHz</option>
            <option value="96000">96 kHz</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Channels
          </label>
          <select
            value={options.channels}
            onChange={(e) => setOptions({ ...options, channels: parseInt(e.target.value) as 1 | 2 })}
            className="w-full bg-gray-800 text-white rounded px-3 py-2 border border-gray-700 focus:outline-none focus:border-blue-500"
          >
            <option value="1">Mono</option>
            <option value="2">Stereo</option>
          </select>
        </div>

        {isConverting && (
          <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
            <div
              className="h-full bg-blue-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}

        <button
          onClick={handleConvert}
          disabled={isConverting}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isConverting ? `Converting... ${progress}%` : 'Convert'}
        </button>
      </div>
    </div>
  );
}
