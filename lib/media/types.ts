export type MediaType = 'video' | 'audio' | 'unknown';

export interface MediaInfo {
  type: MediaType;
  extension: string;
  mimeType: string;
  isStreaming: boolean;
}

export interface VideoMetadata {
  bitrate: string;
  codec: string;
  frameRate: string;
  resolution: string;
  duration: string;
  size: string;
  format: string;
  audioCodec: string;
  audioChannels: string;
  audioSampleRate: string;
  colorSpace: string;
  pixelFormat: string;
  aspectRatio: string;
  level: string;
  profile: string;
  startTime: string;
  container: string;
  source: 'local' | 'url';
  url?: string;
}

export interface AudioMetadata {
  duration: string;
  bitrate: string;
  sampleRate: string;
  channels: string;
  codec: string;
  format: string;
  size: string;
  source: 'local' | 'url';
  url?: string;
  title?: string;
  artist?: string;
  album?: string;
  year?: string;
  genre?: string;
  trackNumber?: string;
  albumArt?: string;
  bitDepth?: string;
  compressionRatio?: string;
}

export type MediaMetadata = VideoMetadata | AudioMetadata;
