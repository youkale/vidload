'use client';

import React, { useRef } from 'react';
import { detectMediaType, isAudio, isVideo } from '@/lib/media/detector';

interface MediaInputProps {
  onFileSelect: (file: File, mediaType: 'audio' | 'video') => void;
  onUrlSubmit: (url: string, mediaType: 'audio' | 'video') => void;
  isLoading: boolean;
  placeholder?: string;
}

export default function MediaInput({
  onFileSelect,
  onUrlSubmit,
  isLoading,
  placeholder = 'Enter video or audio URL (MP4, M3U8, MP3, AAC, etc.)'
}: MediaInputProps) {
  const [inputUrl, setInputUrl] = React.useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const mediaInfo = detectMediaType(file);
    const mediaType = mediaInfo.type === 'audio' ? 'audio' : 'video';
    
    onFileSelect(file, mediaType);
    
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputUrl.trim()) return;

    const mediaInfo = detectMediaType(inputUrl);
    const mediaType = mediaInfo.type === 'audio' ? 'audio' : 'video';
    
    onUrlSubmit(inputUrl.trim(), mediaType);
  };

  const handleFileButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <form onSubmit={handleUrlSubmit} className="space-y-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            placeholder={placeholder}
            disabled={isLoading}
            className="flex-1 px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:border-blue-500 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={isLoading || !inputUrl.trim()}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Loading...' : 'Analyze'}
          </button>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-gray-700" />
          <span className="text-gray-400 text-sm">or</span>
          <div className="flex-1 h-px bg-gray-700" />
        </div>

        <div className="flex gap-2">
          <input
            ref={fileInputRef}
            type="file"
            accept="video/*,audio/*,.mp4,.webm,.avi,.mov,.mkv,.m3u8,.mpd,.mp3,.aac,.wav,.flac,.ogg,.m4a"
            onChange={handleFileUpload}
            className="hidden"
          />
          <button
            type="button"
            onClick={handleFileButtonClick}
            disabled={isLoading}
            className="flex-1 px-6 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Select Local File (Video or Audio)
          </button>
        </div>
      </form>
    </div>
  );
}
