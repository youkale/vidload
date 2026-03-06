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

export interface ID3Tag {
  title?: string;
  artist?: string;
  album?: string;
  year?: string;
  genre?: string;
  trackNumber?: string;
  albumArt?: {
    data: string;
    format: string;
  };
}

export interface AudioConversionOptions {
  format: 'mp3' | 'aac' | 'wav' | 'flac' | 'ogg' | 'm4a';
  bitrate?: '128k' | '192k' | '256k' | '320k';
  sampleRate?: '44100' | '48000' | '96000';
  channels?: 1 | 2;
}

export interface AudioVisualizationConfig {
  type: 'waveform' | 'spectrum' | 'both';
  color: string;
  backgroundColor: string;
  lineWidth: number;
  smoothing: number;
}
