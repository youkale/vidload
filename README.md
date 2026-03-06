# VidLoad.cc - Privacy-First Universal Video Player & Analyzer

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![WebAssembly](https://img.shields.io/badge/WebAssembly-FFmpeg-red)](https://ffmpegwasm.netlify.app/)
[![GDPR Compliant](https://img.shields.io/badge/GDPR-Compliant-green)](https://gdpr.eu/)

> **🔒 Privacy-First** | **🌐 Browser-Based** | **⚡ Real-Time Analysis** | **🛡️ Minimal Data Collection**

A powerful, privacy-first video player and analysis tool that processes everything locally in your browser using WebAssembly technology. Perfect for analyzing video metadata, debugging HLS streams, and extracting technical details without compromising your privacy.

## 🌐 Live Demo

**🚀 Try it now: [https://vidload.cc](https://vidload.cc)**

## ✨ Key Features

### 🎥 **Universal Video Support**
- **Local Files**: MP4, WebM, AVI, MOV, MKV, and more
- **Streaming**: HLS (M3U8), DASH, Progressive HTTP
- **Codecs**: H.264, H.265/HEVC, VP8, VP9, AV1, and more

### 🎵 **NEW: Audio Support**
- **Audio Formats**: MP3, AAC, WAV, FLAC, OGG, M4A, WMA, AIFF, APE, OPUS
- **Audio Player**: Full-featured player with visualization
- **ID3 Tags**: Extract metadata (title, artist, album, etc.)
- **Audio Conversion**: Convert between formats with custom parameters
- **Real-time Visualization**: Waveform, spectrum, and circular displays
- **Album Art**: Display embedded album artwork

### 🔍 **Advanced Analysis**
- **Real-time Metadata Extraction** using FFmpeg.wasm
- **HLS Stream Analysis** with manifest parsing
- **Technical Specifications** including codec, resolution, bitrate
- **Performance Monitoring** with buffer health and network stats

### 🛡️ **Privacy-by-Design**
- **100% Local Processing** - Videos never leave your device
- **Minimal Data Collection** - Basic analytics for improvement, no personal data
- **GDPR/CCPA Compliant** - Perfect for sensitive content
- **No Account Required** - Full functionality without registration

### 🌍 **Multi-Language Support**
- English
- 中文 (Chinese)
- 日本語 (Japanese)

## 🚀 Quick Start

### Option 1: Use Online (Recommended)
Simply visit [https://vidload.cc](https://vidload.cc) - no installation required!

### Option 2: Local Development

```bash
# Clone the repository
git clone https://github.com/youkale/vidload.git
cd vidload

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000
```

### Option 3: Deploy to Cloudflare Pages

```bash
# One-click deployment
./scripts/deploy-cloudflare.sh production

# Or manual deployment
npm run build:static
wrangler pages deploy out --project-name=vidload
```

For detailed deployment instructions, see [Cloudflare Deployment Guide](CLOUDFLARE_DEPLOYMENT_EN.md)

## 🛠️ Tech Stack

- **Frontend**: [Next.js 14](https://nextjs.org/) + [React 18](https://reactjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Video Processing**: [FFmpeg.wasm](https://ffmpegwasm.netlify.app/)
- **Streaming**: [HLS.js](https://github.com/video-dev/hls.js/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Deployment**: Static Site (Vercel, Netlify, etc.)

## 📋 System Requirements

### Browser Support
- **Chrome** 90+ (Recommended)
- **Firefox** 88+
- **Safari** 14+
- **Edge** 90+ (Chromium-based)

### System Requirements
- **WebAssembly Support** (Essential)
- **Minimum 1GB RAM** for video processing
- **Modern JavaScript** (ES2020+)

## 🎯 Use Cases

### 🎬 **Content Creators & Producers**
- Pre-upload quality validation
- Multi-platform format optimization
- Technical specification verification
- Archive quality assessment

### 👨‍💻 **Developers & Engineers**
- Video player integration testing
- CDN performance analysis
- HLS stream debugging
- Format compatibility validation

### 🏥 **Privacy-Sensitive Industries**
- **Healthcare**: Medical video analysis (HIPAA compatible)
- **Legal**: Evidence video examination
- **Education**: Student content review (FERPA safe)
- **Corporate**: Internal video processing

### 🏢 **Enterprise Applications**
- Employee training video validation
- Security footage analysis
- Conference recording review
- Bandwidth optimization testing

## 🔧 Development

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation
```bash
# Install dependencies
npm install

# Development server
npm run dev

# Production build
npm run build

# Static export for deployment
npm run build:static

# Type checking
npm run type-check

# Linting
npm run lint
```

### Deployment
```bash
# Deploy to Cloudflare Pages
npm run deploy:cloudflare

# Deploy to production
npm run deploy:cloudflare:prod
```

## 🗺️ Application Routes

VidLoad.cc provides a comprehensive set of pages to serve different user needs:

### Core Pages
- **[`/`](/)** - Main video player and analysis interface
  - Upload local video files or analyze HLS streams
  - Real-time video metadata extraction and display
  - Interactive video player with advanced controls

### Information Pages
- **[`/about`](/about)** - Detailed information about VidLoad.cc
  - Platform mission and key features
  - Technology stack overview
  - Why choose VidLoad.cc for video analysis

- **[`/use-cases`](/use-cases)** - Real-world application examples
  - Content creators and video producers workflows
  - Developer and technical team scenarios
  - Privacy-sensitive industry applications
  - Enterprise and educational use cases

- **[`/video-formats`](/video-formats)** - Comprehensive video format guide
  - Supported formats (HLS, MP4, WebM, AVI, MOV, MKV)
  - Technical specifications and use cases
  - Resolution, bitrate, and frame rate relationships
  - Codec compatibility information

### AI & Development
- **[`/for-ai`](/for-ai)** - AI and LLM reference guide
  - Structured data for AI system integration
  - API reference and technical specifications
  - Privacy-first AI development guidelines
  - Automated video analysis workflows

### Legal & Compliance
- **[`/privacy`](/privacy)** - Privacy policy and data protection
  - Minimal data collection with full transparency
  - GDPR and CCPA compliance details
  - Privacy-by-design architecture explanation

- **[`/terms`](/terms)** - Terms of service
  - Usage guidelines and limitations
  - Liability and warranty information
  - Acceptable use policies

- **[`/cookies`](/cookies)** - Cookie policy
  - Essential cookies only approach
  - Local storage usage explanation
  - User control and data clearing options

### Technical Routes
- **[`/sitemap.xml`](/sitemap.xml)** - XML sitemap for search engines
- **[`/robots.txt`](/robots.txt)** - Search engine crawler instructions

### Project Structure
```
vidload/
├── app/                    # Next.js app directory
│   ├── about/             # About page
│   ├── cookies/           # Cookie policy
│   ├── for-ai/            # AI/LLM reference page
│   ├── privacy/           # Privacy policy
│   ├── terms/             # Terms of service
│   ├── use-cases/         # Use cases and examples
│   ├── video-formats/     # Video formats guide
│   ├── layout.tsx         # Root layout component
│   ├── page.tsx           # Home page
│   ├── globals.css        # Global styles
│   ├── robots.ts          # Robots.txt generator
│   └── sitemap.ts         # Sitemap generator
├── components/            # Shared React components
│   ├── FeatureGrid.tsx    # Homepage feature grid
│   ├── TabSelector.tsx    # Tab navigation component
│   └── VideoPlayer.tsx    # Main video player component
├── lib/                   # Utility libraries
│   ├── ffmpeg/           # FFmpeg.wasm integration
│   │   ├── index.ts      # Main FFmpeg functions
│   │   └── performance.ts # Performance optimizations
│   ├── hls/              # HLS parsing logic
│   │   └── parser.ts     # HLS manifest parser
│   └── utils.ts          # Common utilities
├── public/               # Static assets
│   ├── _headers          # Cloudflare headers config
│   ├── _redirects        # Cloudflare redirects config
│   └── favicon.ico       # Site favicon
└── next.config.js        # Next.js configuration
```

## 🌐 API Reference

### Core Functions

```typescript
// Video metadata extraction
const metadata = await extractVideoMetadata(file);

// HLS stream analysis
const hlsInfo = await parseHLSStream(url);

// Local file processing
const videoUrl = URL.createObjectURL(file);
```

### Configuration

```javascript
// next.config.js
module.exports = {
  webpack: (config) => {
    config.resolve.fallback = {
      fs: false,
      path: false,
    };
    return config;
  },
};
```

## 🔒 Privacy & Security

### Data Protection
- **No Server Processing**: All analysis occurs in browser
- **No Data Upload**: Files never leave your device
- **No User Tracking**: Zero analytics or behavioral monitoring
- **Local Storage Only**: Preferences stored locally

### Compliance
- **GDPR Compliant**: No personal data collection
- **CCPA Compliant**: California privacy law adherence
- **HIPAA Compatible**: Suitable for healthcare videos
- **FERPA Safe**: Educational content without data exposure

### Security Features
- **Client-Side Only**: Eliminates server-side vulnerabilities
- **No External Requests**: Video data processing is isolated
- **HTTPS Only**: Secure connection required
- **CSP Headers**: Content Security Policy protection

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Workflow
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style
- Use TypeScript for type safety
- Follow ESLint configuration
- Use Prettier for code formatting
- Write meaningful commit messages

## 🐛 Issues & Support

### Reporting Issues
- **Bug Reports**: Use our [issue template](.github/ISSUE_TEMPLATE/bug_report.md)
- **Feature Requests**: Use our [feature template](.github/ISSUE_TEMPLATE/feature_request.md)
- **Security Issues**: Email security@vidload.cc

### Getting Help
- **Documentation**: [https://vidload.cc/video-formats](https://vidload.cc/video-formats)
- **Use Cases**: [https://vidload.cc/use-cases](https://vidload.cc/use-cases)
- **FAQ**: [https://vidload.cc/for-ai](https://vidload.cc/for-ai)

## 📊 Browser Compatibility

| Browser | Version | Status | Notes |
|---------|---------|--------|-------|
| Chrome | 90+ | ✅ Full Support | Recommended |
| Firefox | 88+ | ✅ Full Support | WebAssembly optimized |
| Safari | 14+ | ✅ Full Support | HLS native support |
| Edge | 90+ | ✅ Full Support | Chromium-based |
| Opera | 76+ | ⚠️ Partial | Limited testing |
| Mobile Safari | 14+ | ✅ Full Support | iOS support |
| Chrome Mobile | 90+ | ✅ Full Support | Android support |

## 🚀 Performance

### Benchmarks
- **Metadata Extraction**: <2 seconds for most files
- **HLS Analysis**: <1 second for manifest parsing
- **Memory Usage**: 100-500MB depending on file size
- **CPU Usage**: 10-30% during analysis

### Optimization Tips
- Use Chrome for best performance
- Ensure sufficient RAM (1GB+ recommended)
- Close unnecessary browser tabs during processing
- Use local files for better performance than streaming

## 🔗 Related Projects

- **FFmpeg.wasm**: [https://github.com/ffmpegwasm/ffmpeg.wasm](https://github.com/ffmpegwasm/ffmpeg.wasm)
- **HLS.js**: [https://github.com/video-dev/hls.js](https://github.com/video-dev/hls.js)
- **Next.js**: [https://github.com/vercel/next.js](https://github.com/vercel/next.js)

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### MIT License Summary
- ✅ Commercial use
- ✅ Modification
- ✅ Distribution
- ✅ Private use
- ❌ Liability
- ❌ Warranty

## 🙏 Acknowledgments

- **FFmpeg Team** for the incredible video processing capabilities
- **Next.js Team** for the amazing React framework
- **HLS.js Contributors** for the streaming protocol support
- **WebAssembly Community** for making browser-based video processing possible

## 📈 Roadmap

### Version 2.0 (Coming Soon)
- [ ] Audio-only file support
- [ ] Batch processing capabilities
- [ ] Export functionality (JSON/CSV)
- [ ] Advanced HLS debugging tools
- [ ] Performance profiling dashboard

### Version 2.1
- [ ] Video comparison tools
- [ ] Quality assessment metrics
- [ ] Custom analysis profiles
- [ ] API for developers

### Future Plans
- [ ] Mobile app versions
- [ ] Desktop application
- [ ] Plugin architecture
- [ ] Cloud deployment guides

## ⭐ Star History

[![Star History Chart](https://api.star-history.com/svg?repos=youkale/vidload&type=Date)](https://star-history.com/#youkale/vidload&Date)

## 📚 Documentation

- **[Cloudflare Deployment Guide](CLOUDFLARE_DEPLOYMENT_EN.md)** - Complete deployment instructions
- **[Cloudflare Issue Fixes](CLOUDFLARE_FIX_EN.md)** - Troubleshooting and fixes
- **[Contributing Guidelines](CONTRIBUTING.md)** - How to contribute to the project

## 📧 Contact

- **Website**: [https://vidload.cc](https://vidload.cc)
- **GitHub**: [https://github.com/youkale/vidload](https://github.com/youkale/vidload)
- **Issues**: [GitHub Issues](https://github.com/youkale/vidload/issues)
- **Email**: contact@vidload.cc

---

<div align="center">

**🔒 Privacy-First Video Analysis | 🌐 Browser-Based | ⚡ Real-Time Processing**

Made with ❤️ for the open-source community

[Website](https://vidload.cc) • [Documentation](https://vidload.cc/video-formats) • [Use Cases](https://vidload.cc/use-cases) • [AI Reference](https://vidload.cc/for-ai)

</div>
