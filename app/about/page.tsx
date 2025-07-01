import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import Breadcrumb from '@/components/Breadcrumb';

export const metadata: Metadata = {
  title: 'About VidLoad.cc - Privacy-First Video Analysis Platform',
  description: 'Learn about VidLoad.cc, a cutting-edge privacy-first video analysis platform. Process videos locally in your browser with WebAssembly technology. GDPR compliant, no data upload required.',
  keywords: 'about VidLoad.cc, privacy-first video platform, local video processing, WebAssembly video analysis, GDPR compliant video tool, browser-based video analysis',
  openGraph: {
    title: 'About VidLoad.cc - Privacy-First Video Analysis Platform',
    description: 'Learn about our privacy-first approach to video analysis with local browser processing.',
    url: 'https://vidload.cc/about',
  },
  alternates: {
    canonical: 'https://vidload.cc/about',
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen p-8 bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto space-y-12">
        <Breadcrumb items={[{ label: 'About' }]} />

        {/* Header */}
        <div className="text-center space-y-4">
          <Link href="/" className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors mb-4">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to VidLoad.cc
          </Link>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            About VidLoad.cc
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Privacy-First Video Analysis Platform
          </p>
        </div>

        {/* Mission Statement */}
        <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-6 mb-8">
          <h2 className="text-blue-400 text-xl font-semibold mb-3">🎯 Our Mission</h2>
          <p className="text-blue-100 text-lg">
            To provide a powerful, privacy-first video analysis tool that empowers users to understand their media
            without compromising their privacy or data security.
          </p>
        </div>

        <div className="prose prose-invert max-w-none">
          {/* What is VidLoad.cc */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-blue-400">What is VidLoad.cc?</h2>
            <div className="space-y-4 text-gray-300">
              <p>
                VidLoad.cc is a cutting-edge, browser-based video player and analysis platform that revolutionizes
                how users interact with video content. Built with privacy-by-design principles, our platform processes
                all video data locally in your browser using advanced WebAssembly technology.
              </p>
              <p>
                Unlike traditional video analysis tools that require uploading your content to remote servers,
                VidLoad.cc ensures that your videos never leave your device. This approach provides unparalleled
                privacy protection while delivering professional-grade video analysis capabilities.
              </p>
            </div>
          </section>

          {/* Key Features */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-blue-400">Key Features</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-3">🎥 Universal Video Support</h3>
                <ul className="text-gray-300 space-y-2">
                  <li>• Support for 50+ video formats (MP4, WebM, AVI, MOV, MKV)</li>
                  <li>• Advanced HLS (M3U8) stream analysis</li>
                  <li>• DASH manifest parsing</li>
                  <li>• Real-time playback statistics</li>
                </ul>
              </div>

              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-3">🔍 Deep Technical Analysis</h3>
                <ul className="text-gray-300 space-y-2">
                  <li>• Comprehensive metadata extraction</li>
                  <li>• Codec and encoding parameter analysis</li>
                  <li>• Quality level detection for streaming</li>
                  <li>• Performance metrics and diagnostics</li>
                </ul>
              </div>

              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-3">🔒 Privacy-First Design</h3>
                <ul className="text-gray-300 space-y-2">
                  <li>• Minimal data collection with full transparency</li>
                  <li>• All processing happens locally</li>
                  <li>• GDPR and CCPA compliant by design</li>
                  <li>• No account registration required</li>
                </ul>
              </div>

              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-3">⚡ Advanced Technology</h3>
                <ul className="text-gray-300 space-y-2">
                  <li>• WebAssembly-powered FFmpeg integration</li>
                  <li>• Multi-threaded processing support</li>
                  <li>• Progressive Web App capabilities</li>
                  <li>• Cross-platform compatibility</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Why Choose VidLoad.cc */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-blue-400">Why Choose VidLoad.cc?</h2>
            <div className="space-y-6 text-gray-300">
              <div>
                <h3 className="text-lg font-semibold text-white">🛡️ Uncompromising Privacy</h3>
                <p>
                  In an era where data privacy is paramount, VidLoad.cc stands apart by processing all video content
                  locally in your browser. Your videos never touch our servers, ensuring complete privacy and
                  compliance with international data protection regulations.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white">🚀 Professional-Grade Performance</h3>
                <p>
                  Powered by FFmpeg.wasm and optimized WebAssembly modules, VidLoad.cc delivers desktop-class
                  performance directly in your browser. Multi-threaded processing ensures fast analysis even
                  for large video files.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white">🌐 Universal Accessibility</h3>
                <p>
                  No software installation required. VidLoad.cc works on any modern device with a web browser,
                  making professional video analysis accessible to everyone, everywhere.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white">📚 AI-Friendly Documentation</h3>
                <p>
                  Our comprehensive documentation and structured data make VidLoad.cc perfect for integration
                  with AI systems, LLMs, and automated workflows.
                </p>
              </div>
            </div>
          </section>

          {/* Use Cases */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-blue-400">Who Uses VidLoad.cc?</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-purple-900/20 border border-purple-700 rounded-lg p-4">
                <h3 className="font-semibold text-purple-300 mb-2">Content Creators</h3>
                <p className="text-sm text-gray-300">
                  Analyze video quality, optimize encoding settings, and debug streaming issues.
                </p>
              </div>

              <div className="bg-green-900/20 border border-green-700 rounded-lg p-4">
                <h3 className="font-semibold text-green-300 mb-2">Developers</h3>
                <p className="text-sm text-gray-300">
                  Debug video applications, analyze HLS streams, and integrate video analysis into workflows.
                </p>
              </div>

              <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-4">
                <h3 className="font-semibold text-blue-300 mb-2">Researchers</h3>
                <p className="text-sm text-gray-300">
                  Conduct privacy-compliant video analysis for academic and commercial research projects.
                </p>
              </div>

              <div className="bg-orange-900/20 border border-orange-700 rounded-lg p-4">
                <h3 className="font-semibold text-orange-300 mb-2">Enterprises</h3>
                <p className="text-sm text-gray-300">
                  Analyze internal video content without security concerns or data compliance issues.
                </p>
              </div>

              <div className="bg-red-900/20 border border-red-700 rounded-lg p-4">
                <h3 className="font-semibold text-red-300 mb-2">Educators</h3>
                <p className="text-sm text-gray-300">
                  Teach video technology concepts with hands-on analysis tools and real-time feedback.
                </p>
              </div>

              <div className="bg-cyan-900/20 border border-cyan-700 rounded-lg p-4">
                <h3 className="font-semibold text-cyan-300 mb-2">Media Professionals</h3>
                <p className="text-sm text-gray-300">
                  Quality control, format validation, and technical specification verification.
                </p>
              </div>
            </div>
          </section>

          {/* Technology Stack */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-blue-400">Technology Stack</h2>
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-white mb-3">Frontend Technologies</h3>
                  <ul className="text-gray-300 space-y-1">
                    <li>• Next.js 14 with App Router</li>
                    <li>• React 18 with TypeScript</li>
                    <li>• Tailwind CSS for styling</li>
                    <li>• Progressive Web App features</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-white mb-3">Video Processing</h3>
                  <ul className="text-gray-300 space-y-1">
                    <li>• FFmpeg.wasm for video analysis</li>
                    <li>• HLS.js for stream playback</li>
                    <li>• WebAssembly for performance</li>
                    <li>• Multi-threaded processing</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Open Source */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-blue-400">Open Source Commitment</h2>
            <div className="space-y-4 text-gray-300">
              <p>
                VidLoad.cc is proudly open source under the MIT License. Our commitment to transparency
                extends beyond privacy policies to making our entire codebase available for public
                inspection and contribution.
              </p>
              <div className="bg-green-900/20 border border-green-700 rounded p-4">
                <p className="text-green-100">
                  <strong>GitHub Repository:</strong> Our source code is available on GitHub, allowing
                  developers to contribute, report issues, and verify our privacy claims through code inspection.
                </p>
              </div>
            </div>
          </section>

          {/* Future Roadmap */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-blue-400">Future Roadmap</h2>
            <div className="space-y-4 text-gray-300">
              <p>We're continuously improving VidLoad.cc with new features and capabilities:</p>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-white mb-2">Upcoming Features</h3>
                  <ul className="space-y-1">
                    <li>• Advanced video editing capabilities</li>
                    <li>• Batch processing support</li>
                    <li>• Enhanced mobile experience</li>
                    <li>• Additional format support</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-2">Technical Improvements</h3>
                  <ul className="space-y-1">
                    <li>• Performance optimizations</li>
                    <li>• Enhanced accessibility features</li>
                    <li>• Improved error handling</li>
                    <li>• Extended API capabilities</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Contact */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-blue-400">Get in Touch</h2>
            <div className="bg-gray-800 rounded-lg p-6">
              <p className="text-gray-300 mb-4">
                We value feedback from our community and are always looking to improve VidLoad.cc.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-white mb-2">Community Support</h3>
                  <ul className="text-gray-300 space-y-1">
                    <li>• GitHub Issues for bug reports</li>
                    <li>• GitHub Discussions for feature requests</li>
                    <li>• Community-driven documentation</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-2">Follow Us</h3>
                  <ul className="text-gray-300 space-y-1">
                    <li>• GitHub: @youkale/vidload</li>
                    <li>• Website: vidload.cc</li>
                    <li>• Updates via our changelog</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-400">
              © 2024 VidLoad.cc - Privacy-First Video Analysis
            </div>
            <div className="flex gap-6">
              <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/" className="text-blue-400 hover:text-blue-300 transition-colors">
                Back to App
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
