# VidLoad - Privacy-First Universal Video Player & Analyzer

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)

> **🔒 Privacy-First** | **🌐 Browser-Based** | **⚡ Real-Time Analysis**

A privacy-focused video player and analyzer that processes everything locally in your browser using WebAssembly. No server uploads, no data collection.

**🚀 Live Demo: [https://vidload.xyz](https://vidload.xyz)**

## ✨ Features

### 🎥 Universal Video Support
- **Local Files**: MP4, WebM, AVI, MOV, MKV
- **Streaming**: HLS (M3U8), DASH, Progressive HTTP
- **Codecs**: H.264, H.265/HEVC, VP8, VP9, AV1

### 🎵 Audio Support
- **Formats**: MP3, AAC, WAV, FLAC, OGG, M4A, OPUS
- **Features**: ID3 tags, audio conversion, real-time visualization
- **Player**: Full-featured with waveform and spectrum display

### 🔍 Advanced Analysis
- Real-time metadata extraction using FFmpeg.wasm
- HLS stream analysis with manifest parsing
- Technical specs: codec, resolution, bitrate
- Performance monitoring with buffer health stats

### 🛡️ Privacy-by-Design
- 100% local processing - videos never leave your device
- No account required
- GDPR/CCPA compliant
- Minimal data collection

### 🌍 Multi-Language
- English, 中文, 日本語

## 🚀 Quick Start

### Use Online (Recommended)
Visit [https://vidload.xyz](https://vidload.xyz) - no installation required!

### Local Development

```bash
# Clone and install
git clone https://github.com/youkale/vidload.git
cd vidload
npm install

# Start dev server
npm run dev

# Open http://localhost:3000
```

### Deploy to Cloudflare Pages

```bash
# One-click deployment
./scripts/deploy-cloudflare.sh production
```

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 + React 18
- **Language**: TypeScript
- **Video Processing**: FFmpeg.wasm
- **Streaming**: HLS.js
- **Styling**: Tailwind CSS

## 📋 Requirements

- **Chrome** 90+ (Recommended)
- **Firefox** 88+
- **Safari** 14+
- **Edge** 90+
- WebAssembly support required

## 🎯 Use Cases

- **Content Creators**: Quality validation, format optimization
- **Developers**: HLS debugging, CDN analysis, format testing
- **Privacy-Sensitive**: Healthcare, legal, education, corporate
- **Enterprise**: Training videos, security footage, bandwidth testing

## 🔧 Development

```bash
npm run dev          # Development server
npm run build        # Production build
npm run build:static # Static export
npm run lint         # ESLint
npx tsc --noEmit     # Type check
```

## 📁 Project Structure

```
vidload/
├── app/              # Next.js app directory
│   ├── page.tsx     # Home page
│   ├── layout.tsx   # Root layout
│   └── [route]/     # Route pages
├── components/       # React components
│   └── VideoPlayer.tsx
├── lib/             # Utilities
│   ├── ffmpeg/      # FFmpeg integration
│   ├── hls/         # HLS parser
│   └── utils.ts     # Helpers
└── public/          # Static assets
```

## 🔒 Privacy & Security

- No server processing
- No data upload
- No user tracking
- Local storage only
- HTTPS required
- CSP headers enabled

## 🤝 Contributing

Contributions welcome! See [CONTRIBUTING.md](CONTRIBUTING.md)

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 🐛 Issues & Support

- **Bug Reports**: [GitHub Issues](https://github.com/youkale/vidload/issues)
- **Security**: security@vidload.xyz
- **Documentation**: [https://vidload.xyz/video-formats](https://vidload.xyz/video-formats)

## 📜 License

MIT License - see [LICENSE](LICENSE) file.

## 🙏 Acknowledgments

- FFmpeg Team for video processing
- Next.js Team for React framework
- HLS.js Contributors for streaming support
- WebAssembly Community for browser-based processing

## 📧 Contact

- **Website**: [https://vidload.xyz](https://vidload.xyz)
- **GitHub**: [https://github.com/youkale/vidload](https://github.com/youkale/vidload)
- **Email**: contact@vidload.xyz

---

<div align="center">

**🔒 Privacy-First | 🌐 Browser-Based | ⚡ Real-Time**

Made with ❤️ for the open-source community

</div>
