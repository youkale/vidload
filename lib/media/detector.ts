import { MediaType, MediaInfo } from './types';

const AUDIO_EXTENSIONS = ['.mp3', '.aac', '.wav', '.flac', '.ogg', '.m4a', '.wma', '.aiff', '.ape', '.opus'];
const VIDEO_EXTENSIONS = ['.mp4', '.webm', '.avi', '.mov', '.mkv', '.m4v', '.wmv', '.flv', '.m3u8', '.mpd'];
const STREAMING_EXTENSIONS = ['.m3u8', '.mpd'];

const AUDIO_MIME_TYPES = [
  'audio/mpeg', 'audio/mp3', 'audio/aac', 'audio/wav', 'audio/x-wav',
  'audio/flac', 'audio/ogg', 'audio/x-m4a', 'audio/mp4', 'audio/wma',
  'audio/aiff', 'audio/x-aiff', 'audio/ape', 'audio/opus'
];

const VIDEO_MIME_TYPES = [
  'video/mp4', 'video/webm', 'video/x-msvideo', 'video/quicktime',
  'video/x-matroska', 'video/x-ms-wmv', 'video/x-flv',
  'application/vnd.apple.mpegurl', 'application/x-mpegURL',
  'application/dash+xml'
];

export function detectMediaType(input: File | string): MediaInfo {
  if (typeof input === 'string') {
    return detectFromUrl(input);
  } else {
    return detectFromFile(input);
  }
}

function detectFromFile(file: File): MediaInfo {
  const fileName = file.name.toLowerCase();
  const mimeType = file.type.toLowerCase();
  
  const extension = extractExtension(fileName);
  const isStreaming = STREAMING_EXTENSIONS.some(ext => fileName.endsWith(ext));
  
  if (isAudioFile(fileName, mimeType)) {
    return {
      type: 'audio',
      extension,
      mimeType: mimeType || getMimeType(extension, 'audio'),
      isStreaming
    };
  }
  
  if (isVideoFile(fileName, mimeType)) {
    return {
      type: 'video',
      extension,
      mimeType: mimeType || getMimeType(extension, 'video'),
      isStreaming
    };
  }
  
  return {
    type: 'unknown',
    extension,
    mimeType: mimeType || 'application/octet-stream',
    isStreaming
  };
}

function detectFromUrl(url: string): MediaInfo {
  const urlLower = url.toLowerCase();
  const extension = extractExtension(urlLower);
  const isStreaming = STREAMING_EXTENSIONS.some(ext => urlLower.includes(ext));
  
  if (isAudioUrl(urlLower)) {
    return {
      type: 'audio',
      extension,
      mimeType: getMimeType(extension, 'audio'),
      isStreaming
    };
  }
  
  if (isVideoUrl(urlLower)) {
    return {
      type: 'video',
      extension,
      mimeType: getMimeType(extension, 'video'),
      isStreaming
    };
  }
  
  return {
    type: 'unknown',
    extension,
    mimeType: getMimeType(extension, 'video'),
    isStreaming
  };
}

function extractExtension(filename: string): string {
  const parts = filename.split('.');
  return parts.length > 1 ? `.${parts[parts.length - 1]}` : '';
}

function isAudioFile(filename: string, mimeType: string): boolean {
  return AUDIO_EXTENSIONS.some(ext => filename.endsWith(ext)) ||
         AUDIO_MIME_TYPES.some(type => mimeType.includes(type));
}

function isVideoFile(filename: string, mimeType: string): boolean {
  return VIDEO_EXTENSIONS.some(ext => filename.endsWith(ext)) ||
         VIDEO_MIME_TYPES.some(type => mimeType.includes(type));
}

function isAudioUrl(url: string): boolean {
  return AUDIO_EXTENSIONS.some(ext => url.includes(ext)) ||
         url.includes('audio');
}

function isVideoUrl(url: string): boolean {
  return VIDEO_EXTENSIONS.some(ext => url.includes(ext)) ||
         url.includes('video') ||
         url.includes('.m3u8') ||
         url.includes('.mpd');
}

function getMimeType(extension: string, type: 'audio' | 'video'): string {
  const mimeMap: Record<string, string> = {
    '.mp3': 'audio/mpeg',
    '.aac': 'audio/aac',
    '.wav': 'audio/wav',
    '.flac': 'audio/flac',
    '.ogg': 'audio/ogg',
    '.m4a': 'audio/mp4',
    '.wma': 'audio/x-ms-wma',
    '.aiff': 'audio/aiff',
    '.ape': 'audio/x-ape',
    '.opus': 'audio/opus',
    '.mp4': 'video/mp4',
    '.webm': 'video/webm',
    '.avi': 'video/x-msvideo',
    '.mov': 'video/quicktime',
    '.mkv': 'video/x-matroska',
    '.m4v': 'video/mp4',
    '.wmv': 'video/x-ms-wmv',
    '.flv': 'video/x-flv',
    '.m3u8': 'application/vnd.apple.mpegurl',
    '.mpd': 'application/dash+xml'
  };
  
  return mimeMap[extension] || (type === 'audio' ? 'audio/*' : 'video/*');
}

export function isAudio(input: File | string): boolean {
  return detectMediaType(input).type === 'audio';
}

export function isVideo(input: File | string): boolean {
  return detectMediaType(input).type === 'video';
}

export function isStreamingMedia(input: File | string): boolean {
  return detectMediaType(input).isStreaming;
}
