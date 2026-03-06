import {
  getAudioMetadata,
  convertAudio,
  AudioVisualizer,
  parseID3Tag,
  extractAlbumArt
} from '@/lib/audio';

import {
  detectMediaType,
  isAudio,
  isVideo
} from '@/lib/media';

import {
  AudioPlayer,
  AudioInfo,
  AudioConverter,
  AudioDisplay,
  AudioWaveform,
  AudioSpectrum
} from '@/components/audio';

import { MediaInput } from '@/components/media';

console.log('All imports successful!');

export {
  getAudioMetadata,
  convertAudio,
  AudioVisualizer,
  parseID3Tag,
  extractAlbumArt,
  detectMediaType,
  isAudio,
  isVideo,
  AudioPlayer,
  AudioInfo,
  AudioConverter,
  AudioDisplay,
  AudioWaveform,
  AudioSpectrum,
  MediaInput
};
