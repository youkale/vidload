# Audio Support - VidLoad.cc

## Overview

VidLoad.cc now supports comprehensive audio file analysis and playback, in addition to its existing video capabilities.

## New Features

### 1. Audio Metadata Extraction
- **Supported Formats**: MP3, AAC, WAV, FLAC, OGG, M4A, WMA, AIFF, APE, OPUS
- **Metadata Types**:
  - Basic info: Duration, bitrate, sample rate, channels, codec
  - ID3 tags: Title, artist, album, year, genre, track number
  - Album art extraction
  - Advanced info: Bit depth, compression ratio

### 2. Audio Player
- **Playback Controls**:
  - Play/Pause
  - Skip forward/backward (10 seconds)
  - Progress bar with seek functionality
  - Volume control with mute option
  - Playback speed adjustment (0.5x - 2x)
- **Visualization**:
  - Real-time waveform display
  - Frequency spectrum analyzer
  - Circular spectrum visualization
  - Multiple color themes

### 3. Audio Format Conversion
- **Output Formats**: MP3, AAC, WAV, FLAC, OGG, M4A
- **Conversion Options**:
  - Bitrate: 128k, 192k, 256k, 320k
  - Sample rate: 44.1kHz, 48kHz, 96kHz
  - Channels: Mono, Stereo
- **Features**:
  - Progress tracking
  - Download converted files
  - Batch conversion support (coming soon)

## Architecture

### New Directory Structure

```
lib/
├── audio/              # Audio processing modules
│   ├── metadata.ts     # Audio metadata extraction
│   ├── converter.ts    # Format conversion
│   ├── visualizer.ts   # Audio visualization
│   ├── id3.ts          # ID3 tag parsing
│   └── types.ts        # TypeScript types
├── video/              # Video processing (existing)
├── media/              # Shared media utilities
│   ├── detector.ts     # Media type detection
│   └── types.ts        # Shared types

components/
├── audio/              # Audio components
│   ├── AudioPlayer.tsx
│   ├── AudioControls.tsx
│   ├── AudioWaveform.tsx
│   ├── AudioSpectrum.tsx
│   ├── AudioConverter.tsx
│   ├── AudioInfo.tsx
│   └── AudioDisplay.tsx
├── video/              # Video components (existing)
└── media/              # Shared media components
    └── MediaInput.tsx
```

### Key Components

#### AudioPlayer
- Main audio playback component
- Integrates Web Audio API for visualization
- Supports album art display
- Responsive design

#### AudioInfo
- Displays audio metadata
- Shows ID3 tags and album art
- Formatted display of technical parameters

#### AudioConverter
- Format conversion interface
- Parameter configuration
- Progress tracking

#### AudioDisplay
- Tab-based interface
- Integrates player, info, and converter
- Conditional rendering based on file type

## Usage

### For Users

1. **Access Audio Analyzer**:
   - Click "Try Audio Analyzer →" link on homepage
   - Or navigate to `/audio` directly

2. **Upload Audio File**:
   - Click "Select Local File" button
   - Choose audio file (MP3, AAC, WAV, etc.)
   - View metadata and play audio

3. **Analyze Audio URL**:
   - Enter audio URL in input field
   - Click "Analyze" button
   - View results

4. **Convert Audio**:
   - Upload audio file
   - Switch to "Converter" tab
   - Select output format and parameters
   - Click "Convert"
   - Download converted file

### For Developers

#### Import Audio Components

```typescript
import { AudioPlayer, AudioInfo, AudioConverter } from '@/components/audio';
import { getAudioMetadata } from '@/lib/audio/metadata';
import { AudioVisualizer } from '@/lib/audio/visualizer';
```

#### Extract Audio Metadata

```typescript
import { getAudioMetadata } from '@/lib/audio/metadata';

// From file
const metadata = await getAudioMetadata(file);

// From URL
const metadata = await getAudioMetadata('https://example.com/audio.mp3');

console.log(metadata.title);
console.log(metadata.artist);
console.log(metadata.duration);
```

#### Use Audio Player

```typescript
import { AudioPlayer } from '@/components/audio';

<AudioPlayer
  src="audio.mp3"
  title="Song Title"
  artist="Artist Name"
  albumArt="data:image/jpeg;base64,..."
  onEnded={() => console.log('Audio ended')}
  onError={(error) => console.error(error)}
/>
```

#### Create Audio Visualizer

```typescript
import { AudioVisualizer } from '@/lib/audio/visualizer';

const visualizer = new AudioVisualizer(canvas);
await visualizer.init(audioElement);
visualizer.startVisualization('spectrum', '#3b82f6', '#1f2937');
```

#### Convert Audio Format

```typescript
import { convertAudio } from '@/lib/audio/metadata';

const outputData = await convertAudio(file, 'mp3', {
  bitrate: '192k',
  sampleRate: '44100',
  channels: 2
});
```

## Technical Details

### Audio Processing
- **FFmpeg.wasm**: Used for metadata extraction and format conversion
- **Web Audio API**: Real-time audio analysis and visualization
- **Canvas API**: Rendering visualizations

### ID3 Tag Parsing
- Supports ID3v2.2, ID3v2.3, and ID3v2.4
- Extracts text frames and album art
- Handles various text encodings

### Visualization Types
1. **Waveform**: Time-domain amplitude display
2. **Spectrum**: Frequency-domain analysis
3. **Circular**: Radial frequency visualization

### Performance Optimizations
- Lazy loading of FFmpeg.wasm
- Efficient canvas rendering with requestAnimationFrame
- Memory management for large files
- Caching of metadata

## Browser Compatibility

- Chrome 90+ (Recommended)
- Firefox 88+
- Safari 14+
- Edge 90+

**Requirements**:
- WebAssembly support
- Web Audio API support
- Canvas API support

## Privacy & Security

- **100% Client-Side Processing**: All audio analysis happens in your browser
- **No Data Upload**: Audio files never leave your device
- **No Tracking**: No analytics or user tracking
- **GDPR Compliant**: Perfect for sensitive audio content

## Future Enhancements

- [ ] Batch audio conversion
- [ ] Audio waveform editing
- [ ] Audio effects and filters
- [ ] Playlist support
- [ ] Audio comparison tools
- [ ] Export to various formats
- [ ] Audio transcription (using Web Speech API)

## Contributing

Contributions are welcome! Please see the main [CONTRIBUTING.md](../CONTRIBUTING.md) for guidelines.

## License

MIT License - See [LICENSE](../LICENSE) for details.
