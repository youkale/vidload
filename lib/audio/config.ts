import { AudioConversionOptions, AudioVisualizationConfig } from '@/lib/audio/types';

export const DEFAULT_CONVERSION_OPTIONS: AudioConversionOptions = {
  format: 'mp3',
  bitrate: '192k',
  sampleRate: '44100',
  channels: 2
};

export const CONVERSION_PRESETS = {
  'mp3-standard': {
    format: 'mp3' as const,
    bitrate: '192k' as const,
    sampleRate: '44100' as const,
    channels: 2 as const
  },
  'mp3-high': {
    format: 'mp3' as const,
    bitrate: '320k' as const,
    sampleRate: '44100' as const,
    channels: 2 as const
  },
  'aac-standard': {
    format: 'aac' as const,
    bitrate: '192k' as const,
    sampleRate: '44100' as const,
    channels: 2 as const
  },
  'flac-lossless': {
    format: 'flac' as const,
    sampleRate: '48000' as const,
    channels: 2 as const
  },
  'wav-lossless': {
    format: 'wav' as const,
    sampleRate: '48000' as const,
    channels: 2 as const
  }
};

export const DEFAULT_VISUALIZATION_CONFIG: AudioVisualizationConfig = {
  type: 'spectrum',
  color: '#3b82f6',
  backgroundColor: '#1f2937',
  lineWidth: 2,
  smoothing: 0.8
};

export const VISUALIZATION_PRESETS = {
  'spectrum-blue': {
    type: 'spectrum' as const,
    color: '#3b82f6',
    backgroundColor: '#1f2937',
    lineWidth: 2,
    smoothing: 0.8
  },
  'waveform-green': {
    type: 'waveform' as const,
    color: '#10b981',
    backgroundColor: '#1f2937',
    lineWidth: 2,
    smoothing: 0.8
  },
  'circular-purple': {
    type: 'circular' as const,
    color: '#8b5cf6',
    backgroundColor: '#1f2937',
    lineWidth: 2,
    smoothing: 0.8
  }
};

export const SUPPORTED_AUDIO_FORMATS = [
  { extension: 'mp3', name: 'MP3', mimeType: 'audio/mpeg', lossy: true },
  { extension: 'aac', name: 'AAC', mimeType: 'audio/aac', lossy: true },
  { extension: 'wav', name: 'WAV', mimeType: 'audio/wav', lossy: false },
  { extension: 'flac', name: 'FLAC', mimeType: 'audio/flac', lossy: false },
  { extension: 'ogg', name: 'OGG', mimeType: 'audio/ogg', lossy: true },
  { extension: 'm4a', name: 'M4A', mimeType: 'audio/mp4', lossy: true },
  { extension: 'wma', name: 'WMA', mimeType: 'audio/x-ms-wma', lossy: true },
  { extension: 'aiff', name: 'AIFF', mimeType: 'audio/aiff', lossy: false },
  { extension: 'ape', name: 'APE', mimeType: 'audio/x-ape', lossy: false },
  { extension: 'opus', name: 'OPUS', mimeType: 'audio/opus', lossy: true }
];

export const AUDIO_QUALITY_LEVELS = {
  low: { minBitrate: 0, maxBitrate: 128, label: 'Low Quality' },
  medium: { minBitrate: 128, maxBitrate: 256, label: 'Medium Quality' },
  high: { minBitrate: 256, maxBitrate: 1000, label: 'High Quality' },
  lossless: { minBitrate: 1000, maxBitrate: Infinity, label: 'Lossless Quality' }
};

export const SAMPLE_RATES = [
  { value: '44100', label: '44.1 kHz (CD Quality)' },
  { value: '48000', label: '48 kHz (Professional)' },
  { value: '96000', label: '96 kHz (High Resolution)' }
];

export const BITRATES = [
  { value: '128k', label: '128 Kbps' },
  { value: '192k', label: '192 Kbps' },
  { value: '256k', label: '256 Kbps' },
  { value: '320k', label: '320 Kbps' }
];
