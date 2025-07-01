import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import Breadcrumb from '@/components/Breadcrumb';

export const metadata: Metadata = {
  title: 'Video Formats Guide - MP4, WebM, AVI, MKV, HLS Explained | VidLoad.cc',
  description: 'Complete guide to video formats: MP4, WebM, AVI, MOV, MKV, HLS, DASH. Learn which format to use, compatibility, compression differences, and streaming protocols.',
  keywords: 'video formats guide, MP4 vs WebM, video file types, HLS streaming format, video compression formats, video codecs explained, streaming protocols, video container formats',
  openGraph: {
    title: 'Video Formats Guide - Complete Format Comparison',
    description: 'Complete guide to video formats and when to use each one.',
    url: 'https://vidload.cc/video-formats',
  },
  alternates: {
    canonical: 'https://vidload.cc/video-formats',
  },
};

export default function VideoFormatsPage() {
  return (
    <main className="min-h-screen p-8 bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto space-y-12">
        <Breadcrumb items={[{ label: 'Video Formats Guide' }]} />

        {/* Header */}
        <div className="text-center space-y-4">
          <Link href="/" className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors mb-4">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to VidLoad.cc
          </Link>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Video Formats & Technical Guide
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Comprehensive guide to video formats supported by VidLoad.cc and the technical relationships
            between resolution, bitrate, and frame rate.
          </p>
        </div>

        {/* Video Formats Section */}
        <section className="space-y-8">
          <h2 className="text-3xl font-bold text-center">Supported Video Formats</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* HLS Streams */}
            <div className="bg-gray-800 rounded-xl p-6 border border-purple-700">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-purple-300">HLS Streams (.m3u8)</h3>
                  <p className="text-sm text-gray-400">HTTP Live Streaming</p>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-white mb-2">Use Cases:</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Live streaming broadcasts</li>
                    <li>• Adaptive bitrate streaming</li>
                    <li>• OTT platform content</li>
                    <li>• CDN-delivered videos</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-white mb-2">Technical Features:</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Segmented delivery</li>
                    <li>• Multiple quality levels</li>
                    <li>• Real-time adaptation</li>
                    <li>• Cross-platform compatibility</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* MP4 Videos */}
            <div className="bg-gray-800 rounded-xl p-6 border border-blue-700">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-blue-300">MP4 Videos</h3>
                  <p className="text-sm text-gray-400">MPEG-4 Part 14</p>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-white mb-2">Use Cases:</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Social media content</li>
                    <li>• Video sharing platforms</li>
                    <li>• Mobile video playback</li>
                    <li>• Downloaded content</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-white mb-2">Technical Features:</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• H.264/H.265 codecs</li>
                    <li>• Progressive download</li>
                    <li>• Wide compatibility</li>
                    <li>• Efficient compression</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* WebM Videos */}
            <div className="bg-gray-800 rounded-xl p-6 border border-green-700">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m9 12 2 2 4-4" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-green-300">WebM Videos</h3>
                  <p className="text-sm text-gray-400">Web Media Format</p>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-white mb-2">Use Cases:</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Web-optimized content</li>
                    <li>• Open-source projects</li>
                    <li>• Real-time communication</li>
                    <li>• HTML5 video elements</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-white mb-2">Technical Features:</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• VP8/VP9/AV1 codecs</li>
                    <li>• Royalty-free</li>
                    <li>• High compression efficiency</li>
                    <li>• Native browser support</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* AVI Videos */}
            <div className="bg-gray-800 rounded-xl p-6 border border-orange-700">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-orange-300">AVI Videos</h3>
                  <p className="text-sm text-gray-400">Audio Video Interleave</p>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-white mb-2">Use Cases:</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Legacy video files</li>
                    <li>• Video editing projects</li>
                    <li>• Archive content</li>
                    <li>• Screen recordings</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-white mb-2">Technical Features:</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Multiple codec support</li>
                    <li>• Uncompressed options</li>
                    <li>• Windows native format</li>
                    <li>• High quality preservation</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* MOV Videos */}
            <div className="bg-gray-800 rounded-xl p-6 border border-red-700">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-red-300">MOV Videos</h3>
                  <p className="text-sm text-gray-400">QuickTime Format</p>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-white mb-2">Use Cases:</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Professional video editing</li>
                    <li>• Apple ecosystem content</li>
                    <li>• High-quality recordings</li>
                    <li>• Cinema production</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-white mb-2">Technical Features:</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• ProRes codec support</li>
                    <li>• Lossless compression</li>
                    <li>• Professional metadata</li>
                    <li>• Multi-track audio</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* MKV Videos */}
            <div className="bg-gray-800 rounded-xl p-6 border border-yellow-700">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-yellow-600 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2M7 4h10M7 4l-1 16h12l-1-16" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-yellow-300">MKV Videos</h3>
                  <p className="text-sm text-gray-400">Matroska Video</p>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-white mb-2">Use Cases:</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• High-definition content</li>
                    <li>• Multi-language videos</li>
                    <li>• Anime and foreign films</li>
                    <li>• Archival storage</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-white mb-2">Technical Features:</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Multiple subtitle tracks</li>
                    <li>• Chapter support</li>
                    <li>• Open-source container</li>
                    <li>• Advanced metadata</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Relationships Section */}
        <section className="space-y-8">
          <h2 className="text-3xl font-bold text-center">Video Quality Technical Relationships</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Resolution, Bitrate, Frame Rate Relationship */}
            <div className="bg-gray-800 rounded-xl p-8 border border-blue-700">
              <h3 className="text-2xl font-semibold text-blue-300 mb-6">Resolution × Bitrate × Frame Rate</h3>

              <div className="space-y-6">
                <div className="bg-gray-900 rounded-lg p-4">
                  <h4 className="font-semibold text-white mb-3">Quality Formula</h4>
                  <div className="text-sm text-gray-300 space-y-2">
                    <p><strong>Video Quality ∝ Resolution × Bitrate × Frame Rate</strong></p>
                    <p>Higher values in any parameter improve quality but increase file size.</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-white mb-2">Resolution Impact</h4>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• <strong>4K (3840×2160):</strong> 4× more pixels than 1080p</li>
                      <li>• <strong>1080p (1920×1080):</strong> Standard HD quality</li>
                      <li>• <strong>720p (1280×720):</strong> HD ready quality</li>
                      <li>• <strong>480p (854×480):</strong> SD quality</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-white mb-2">Bitrate Guidelines</h4>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• <strong>4K:</strong> 15-25 Mbps (streaming), 50-100 Mbps (production)</li>
                      <li>• <strong>1080p:</strong> 5-10 Mbps (streaming), 15-25 Mbps (production)</li>
                      <li>• <strong>720p:</strong> 2.5-5 Mbps (streaming), 8-12 Mbps (production)</li>
                      <li>• <strong>480p:</strong> 1-2.5 Mbps (streaming), 4-6 Mbps (production)</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-white mb-2">Frame Rate Effects</h4>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• <strong>60 fps:</strong> Smooth gaming, sports</li>
                      <li>• <strong>30 fps:</strong> Standard video content</li>
                      <li>• <strong>24 fps:</strong> Cinematic content</li>
                      <li>• <strong>Higher fps = 2× bitrate</strong> for same quality</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Video Compression Technologies */}
            <div className="bg-gray-800 rounded-xl p-8 border border-green-700">
              <h3 className="text-2xl font-semibold text-green-300 mb-6">Video Compression Technologies</h3>

              <div className="space-y-6">
                <div className="bg-gray-900 rounded-lg p-4">
                  <h4 className="font-semibold text-white mb-3">Compression Evolution</h4>
                  <div className="text-sm text-gray-300">
                    <p>Each generation offers 50% better compression than the previous:</p>
                    <p><strong>H.264 → H.265/HEVC → AV1 → VVC</strong></p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-white mb-2">H.264 (AVC)</h4>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• Most widely supported codec</li>
                      <li>• Good compression efficiency</li>
                      <li>• Universal compatibility</li>
                      <li>• Hardware acceleration available</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-white mb-2">H.265 (HEVC)</h4>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• 50% better compression than H.264</li>
                      <li>• Ideal for 4K content</li>
                      <li>• Growing device support</li>
                      <li>• Patent licensing required</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-white mb-2">AV1</h4>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• Royalty-free codec</li>
                      <li>• Superior compression efficiency</li>
                      <li>• Optimized for streaming</li>
                      <li>• Growing adoption</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-white mb-2">VP9</h4>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• Google's open-source codec</li>
                      <li>• YouTube's primary codec</li>
                      <li>• Good web browser support</li>
                      <li>• Efficient for web streaming</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-blue-900/30 border border-blue-700 rounded p-4">
                  <h4 className="font-semibold text-blue-300 mb-2">Compression Techniques</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• <strong>Intra-frame:</strong> Compress within single frames</li>
                    <li>• <strong>Inter-frame:</strong> Remove redundancy between frames</li>
                    <li>• <strong>Motion compensation:</strong> Track object movement</li>
                    <li>• <strong>Quantization:</strong> Reduce color/detail precision</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quality vs File Size Chart */}
        <section className="space-y-8">
          <h2 className="text-3xl font-bold text-center">Quality vs File Size Reference</h2>

          <div className="bg-gray-800 rounded-xl p-8 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left p-3 text-blue-300">Resolution</th>
                  <th className="text-left p-3 text-green-300">Frame Rate</th>
                  <th className="text-left p-3 text-purple-300">Bitrate (H.264)</th>
                  <th className="text-left p-3 text-orange-300">Bitrate (H.265)</th>
                  <th className="text-left p-3 text-yellow-300">File Size (1 hour)</th>
                  <th className="text-left p-3 text-red-300">Use Case</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                <tr className="border-b border-gray-700">
                  <td className="p-3">4K (3840×2160)</td>
                  <td className="p-3">60fps</td>
                  <td className="p-3">20-25 Mbps</td>
                  <td className="p-3">12-15 Mbps</td>
                  <td className="p-3">9-11 GB</td>
                  <td className="p-3">Gaming, Sports</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="p-3">4K (3840×2160)</td>
                  <td className="p-3">30fps</td>
                  <td className="p-3">15-20 Mbps</td>
                  <td className="p-3">8-12 Mbps</td>
                  <td className="p-3">6.8-9 GB</td>
                  <td className="p-3">Cinema, Streaming</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="p-3">1080p (1920×1080)</td>
                  <td className="p-3">60fps</td>
                  <td className="p-3">8-12 Mbps</td>
                  <td className="p-3">5-8 Mbps</td>
                  <td className="p-3">3.6-5.4 GB</td>
                  <td className="p-3">Gaming, Action</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="p-3">1080p (1920×1080)</td>
                  <td className="p-3">30fps</td>
                  <td className="p-3">5-8 Mbps</td>
                  <td className="p-3">3-5 Mbps</td>
                  <td className="p-3">2.3-3.6 GB</td>
                  <td className="p-3">Standard Video</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="p-3">720p (1280×720)</td>
                  <td className="p-3">30fps</td>
                  <td className="p-3">2.5-4 Mbps</td>
                  <td className="p-3">1.5-2.5 Mbps</td>
                  <td className="p-3">1.1-1.8 GB</td>
                  <td className="p-3">Web Streaming</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="p-3">480p (854×480)</td>
                  <td className="p-3">30fps</td>
                  <td className="p-3">1-2 Mbps</td>
                  <td className="p-3">0.5-1 Mbps</td>
                  <td className="p-3">450-900 MB</td>
                  <td className="p-3">Mobile, Low Bandwidth</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Back to Home */}
        <div className="text-center pt-8">
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Return to VidLoad.cc
          </Link>
        </div>
      </div>
    </main>
  );
}
