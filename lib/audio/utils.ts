export function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

export function formatFileSize(bytes: number): string {
  if (bytes >= 1024 * 1024 * 1024) {
    return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GiB`;
  } else if (bytes >= 1024 * 1024) {
    return `${(bytes / (1024 * 1024)).toFixed(2)} MiB`;
  } else if (bytes >= 1024) {
    return `${(bytes / 1024).toFixed(2)} KiB`;
  } else {
    return `${bytes} B`;
  }
}

export function formatBitrate(bits: number): string {
  if (bits >= 1000000) {
    return `${(bits / 1000000).toFixed(2)} Mbps`;
  } else if (bits >= 1000) {
    return `${(bits / 1000).toFixed(2)} Kbps`;
  } else {
    return `${bits} bps`;
  }
}

export function formatSampleRate(hz: number): string {
  if (hz >= 1000) {
    return `${(hz / 1000).toFixed(1)} kHz`;
  }
  return `${hz} Hz`;
}

export function getAudioFileExtension(filename: string): string {
  const parts = filename.toLowerCase().split('.');
  return parts.length > 1 ? parts[parts.length - 1] : '';
}

export function isAudioFile(filename: string): boolean {
  const audioExtensions = [
    'mp3', 'aac', 'wav', 'flac', 'ogg', 'm4a', 'wma', 
    'aiff', 'ape', 'opus', 'weba', 'm4b', 'm4p', 'm4r'
  ];
  const ext = getAudioFileExtension(filename);
  return audioExtensions.includes(ext);
}

export function getAudioMimeType(extension: string): string {
  const mimeTypes: Record<string, string> = {
    'mp3': 'audio/mpeg',
    'aac': 'audio/aac',
    'wav': 'audio/wav',
    'flac': 'audio/flac',
    'ogg': 'audio/ogg',
    'm4a': 'audio/mp4',
    'wma': 'audio/x-ms-wma',
    'aiff': 'audio/aiff',
    'ape': 'audio/x-ape',
    'opus': 'audio/opus',
    'weba': 'audio/webm',
    'm4b': 'audio/mp4',
    'm4p': 'audio/mp4',
    'm4r': 'audio/mp4'
  };
  
  return mimeTypes[extension.toLowerCase()] || 'audio/*';
}

export function parseAudioDuration(durationStr: string): number {
  if (!durationStr || durationStr === 'N/A') return 0;
  
  const parts = durationStr.split(':').map(p => parseFloat(p) || 0);
  
  if (parts.length === 3) {
    const [hours, minutes, seconds] = parts;
    return hours * 3600 + minutes * 60 + seconds;
  } else if (parts.length === 2) {
    const [minutes, seconds] = parts;
    return minutes * 60 + seconds;
  } else if (parts.length === 1) {
    return parts[0];
  }
  
  return 0;
}

export function calculateAudioFileSize(
  duration: number,
  bitrate: number,
  format: string
): number {
  const compressionRatios: Record<string, number> = {
    'mp3': 1,
    'aac': 0.9,
    'ogg': 0.95,
    'm4a': 0.9,
    'flac': 2.5,
    'wav': 10
  };
  
  const ratio = compressionRatios[format.toLowerCase()] || 1;
  const size = (duration * bitrate) / 8 * ratio;
  
  return Math.round(size);
}

export function getAudioQuality(bitrate: number): 'low' | 'medium' | 'high' | 'lossless' {
  if (bitrate >= 1000) {
    return 'lossless';
  } else if (bitrate >= 256) {
    return 'high';
  } else if (bitrate >= 128) {
    return 'medium';
  } else {
    return 'low';
  }
}

export function getAudioQualityLabel(quality: 'low' | 'medium' | 'high' | 'lossless'): string {
  const labels = {
    'low': 'Low Quality (≤128 Kbps)',
    'medium': 'Medium Quality (128-256 Kbps)',
    'high': 'High Quality (256-1000 Kbps)',
    'lossless': 'Lossless Quality (≥1000 Kbps)'
  };
  
  return labels[quality];
}

export function getAudioChannelsLabel(channels: string): string {
  if (!channels || channels === 'N/A') return 'Unknown';
  
  const channelMap: Record<string, string> = {
    '1': 'Mono',
    '2': 'Stereo',
    '6': '5.1 Surround',
    '8': '7.1 Surround',
    'mono': 'Mono',
    'stereo': 'Stereo'
  };
  
  return channelMap[channels.toLowerCase()] || channels;
}

export function getAudioCodecName(codec: string): string {
  const codecMap: Record<string, string> = {
    'mp3': 'MP3 (MPEG Audio Layer III)',
    'aac': 'AAC (Advanced Audio Coding)',
    'flac': 'FLAC (Free Lossless Audio Codec)',
    'vorbis': 'Vorbis',
    'opus': 'Opus',
    'wav': 'PCM (Pulse Code Modulation)',
    'alac': 'ALAC (Apple Lossless)',
    'wma': 'WMA (Windows Media Audio)',
    'ac3': 'AC-3 (Dolby Digital)',
    'eac3': 'E-AC-3 (Dolby Digital Plus)'
  };
  
  return codecMap[codec.toLowerCase()] || codec.toUpperCase();
}
