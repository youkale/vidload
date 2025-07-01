import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import Breadcrumb from '@/components/Breadcrumb';

export const metadata: Metadata = {
  title: 'Video Basics Guide - Resolution, Bitrate, Frame Rate Explained | VidLoad.cc',
  description: 'Learn video fundamentals: resolution, bitrate, frame rate, and codecs explained in simple terms. Master video technology concepts with practical examples and interactive guides.',
  keywords: 'video resolution guide, video bitrate explained, frame rate tutorial, video codecs, video compression, video quality optimization, video basics, video technology guide',
  openGraph: {
    title: 'Video Basics Guide - Master Video Technology Fundamentals',
    description: 'Learn video resolution, bitrate, frame rate and other key concepts in simple terms.',
    url: 'https://vidload.cc/video-basics',
  },
  alternates: {
    canonical: 'https://vidload.cc/video-basics',
  },
};

export default function VideoBasicsPage() {
  return (
    <main className="min-h-screen p-8 bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto space-y-12">
        <Breadcrumb items={[{ label: 'Video Basics Guide' }]} />

        {/* Header */}
        <div className="text-center space-y-4">
          <Link href="/" className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors mb-4">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to VidLoad.cc
          </Link>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Video Basics Guide
          </h1>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto">
            Learn video resolution, bitrate, frame rate and other key concepts in simple terms. Master the fundamentals of video technology!
          </p>
        </div>

        {/* Core Concepts Overview */}
        <section className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-700 rounded-xl p-6">
          <h2 className="text-2xl font-bold text-center mb-6 text-blue-400">🎯 Core Concepts Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-blue-800/30 rounded-lg">
              <div className="text-3xl mb-2">📺</div>
              <h3 className="font-semibold text-blue-300 mb-2">Resolution</h3>
              <p className="text-sm text-gray-300">Picture quality and clarity</p>
            </div>
            <div className="text-center p-4 bg-purple-800/30 rounded-lg">
              <div className="text-3xl mb-2">🚀</div>
              <h3 className="font-semibold text-purple-300 mb-2">Bitrate</h3>
              <p className="text-sm text-gray-300">Data speed and file size</p>
            </div>
            <div className="text-center p-4 bg-green-800/30 rounded-lg">
              <div className="text-3xl mb-2">🎬</div>
              <h3 className="font-semibold text-green-300 mb-2">Frame Rate</h3>
              <p className="text-sm text-gray-300">Motion smoothness</p>
            </div>
          </div>
        </section>

        {/* Video Resolution Section */}
        <section className="space-y-8">
          <h2 className="text-3xl font-bold text-center text-blue-400">
            📺 Video Resolution - Picture Quality
          </h2>

          {/* What is Resolution */}
          <div className="bg-gray-800 rounded-xl p-6">
            <h3 className="text-2xl font-semibold mb-4 text-blue-300">🤔 What is Resolution?</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-gray-300 mb-4">
                  <strong>Simple explanation:</strong> Resolution is how many tiny squares (pixels) make up your screen. More squares = clearer picture!
                </p>
                <p className="text-gray-300 mb-4">
                  Think of it like a digital mosaic - the more pieces you have, the more detailed the final image becomes.
                </p>
                <div className="bg-blue-900/20 border border-blue-700 rounded p-4">
                  <p className="text-blue-200 text-sm">
                    📖 <strong>Example:</strong> 1920×1080 means 1920 pixels wide by 1080 pixels tall = about 2 million pixels total creating your video image.
                  </p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="bg-gray-700 rounded p-3">
                  <h4 className="font-semibold text-white mb-2">📏 Common Resolution Comparison</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-300">480p (Standard Definition)</span>
                      <span className="text-red-400">854×480</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">720p (HD)</span>
                      <span className="text-orange-400">1280×720</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">1080p (Full HD)</span>
                      <span className="text-green-400">1920×1080</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">4K (Ultra HD)</span>
                      <span className="text-blue-400">3840×2160</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Resolution Selection Guide */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-red-900/20 border border-red-700 rounded-xl p-6">
              <div className="text-center mb-4">
                <div className="text-3xl mb-2">📱</div>
                <h3 className="text-xl font-semibold text-red-300">480p Standard</h3>
                <p className="text-sm text-gray-400">854×480 pixels</p>
              </div>
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-white mb-2">💡 Best for:</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Older mobile devices</li>
                    <li>• Poor network conditions</li>
                    <li>• Data conservation</li>
                    <li>• Small screen viewing</li>
                  </ul>
                </div>
                <div className="bg-red-800/30 rounded p-3">
                  <p className="text-red-200 text-xs">
                    <strong>Trade-off:</strong> Small file size but noticeably blurry on larger screens
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-orange-900/20 border border-orange-700 rounded-xl p-6">
              <div className="text-center mb-4">
                <div className="text-3xl mb-2">💻</div>
                <h3 className="text-xl font-semibold text-orange-300">720p HD</h3>
                <p className="text-sm text-gray-400">1280×720 pixels</p>
              </div>
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-white mb-2">💡 Best for:</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Standard network viewing</li>
                    <li>• Tablets and laptops</li>
                    <li>• Casual streaming</li>
                    <li>• Social media content</li>
                  </ul>
                </div>
                <div className="bg-orange-800/30 rounded p-3">
                  <p className="text-orange-200 text-xs">
                    <strong>Sweet spot:</strong> Good clarity with reasonable file sizes
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-green-900/20 border border-green-700 rounded-xl p-6">
              <div className="text-center mb-4">
                <div className="text-3xl mb-2">🖥️</div>
                <h3 className="text-xl font-semibold text-green-300">1080p Full HD</h3>
                <p className="text-sm text-gray-400">1920×1080 pixels</p>
              </div>
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-white mb-2">💡 Best for:</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Desktop computers</li>
                    <li>• YouTube standard</li>
                    <li>• Professional content</li>
                    <li>• Large screen devices</li>
                  </ul>
                </div>
                <div className="bg-green-800/30 rounded p-3">
                  <p className="text-green-200 text-xs">
                    <strong>Current standard:</strong> High clarity, widely supported
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-blue-900/20 border border-blue-700 rounded-xl p-6">
              <div className="text-center mb-4">
                <div className="text-3xl mb-2">📺</div>
                <h3 className="text-xl font-semibold text-blue-300">4K Ultra HD</h3>
                <p className="text-sm text-gray-400">3840×2160 pixels</p>
              </div>
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-white mb-2">💡 Best for:</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• 4K TVs and monitors</li>
                    <li>• Professional production</li>
                    <li>• High-end devices</li>
                    <li>• Future-proofing</li>
                  </ul>
                </div>
                <div className="bg-blue-800/30 rounded p-3">
                  <p className="text-blue-200 text-xs">
                    <strong>Premium quality:</strong> Ultimate clarity but massive file sizes
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bitrate Section */}
        <section className="space-y-8">
          <h2 className="text-3xl font-bold text-center text-purple-400">
            🚀 Video Bitrate - File Size & Quality
          </h2>

          <div className="bg-gray-800 rounded-xl p-6">
            <h3 className="text-2xl font-semibold mb-4 text-purple-300">🤔 What is Bitrate?</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-gray-300 mb-4">
                  <strong>Simple explanation:</strong> Bitrate is like the width of a pipe. Wider pipe = more water (data) per second = better video quality, but needs faster internet.
                </p>
                <p className="text-gray-300 mb-4">
                  Think of it as the "data flow rate" - higher bitrate means more information is transmitted each second, resulting in better quality but larger files.
                </p>
                <div className="bg-purple-900/20 border border-purple-700 rounded p-4">
                  <p className="text-purple-200 text-sm">
                    📖 <strong>Unit explanation:</strong> Mbps = Megabits per second
                    <br />
                    • 1 Mbps = 1 megabit per second
                    <br />
                    • 8 Mbps = 8 megabits per second (HD video standard)
                  </p>
                </div>
              </div>
              <div>
                <div className="bg-gray-700 rounded p-4">
                  <h4 className="font-semibold text-white mb-3">🔍 Bitrate Comparison Examples</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Music Audio</span>
                      <span className="text-green-400">128 Kbps</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Voice Call</span>
                      <span className="text-blue-400">64 Kbps</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">SD Video</span>
                      <span className="text-orange-400">1-3 Mbps</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">HD Video</span>
                      <span className="text-purple-400">5-8 Mbps</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">4K Video</span>
                      <span className="text-red-400">25+ Mbps</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bitrate Selection Guide */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-green-900/20 border border-green-700 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-green-300 mb-4">🟢 Low Bitrate (1-3 Mbps)</h3>
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-white mb-2">✅ Advantages:</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Small file sizes</li>
                    <li>• Low network requirements</li>
                    <li>• Fast loading speeds</li>
                    <li>• Data-friendly</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-white mb-2">❌ Disadvantages:</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Average picture quality</li>
                    <li>• Loss of detail</li>
                    <li>• Blurry fast motion</li>
                  </ul>
                </div>
                <div className="bg-green-800/30 rounded p-3">
                  <p className="text-green-200 text-xs">
                    <strong>Best for:</strong> Slow networks, mobile viewing, data conservation
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-purple-900/20 border border-purple-700 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-purple-300 mb-4">🟣 Medium Bitrate (5-10 Mbps)</h3>
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-white mb-2">✅ Advantages:</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Quality-size balance</li>
                    <li>• Most networks compatible</li>
                    <li>• Good picture quality</li>
                    <li>• Industry standard</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-white mb-2">❌ Disadvantages:</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Larger file sizes</li>
                    <li>• Requires stable network</li>
                  </ul>
                </div>
                <div className="bg-purple-800/30 rounded p-3">
                  <p className="text-purple-200 text-xs">
                    <strong>Best for:</strong> Desktop viewing, standard networks, balanced needs
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-red-900/20 border border-red-700 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-red-300 mb-4">🔴 High Bitrate (15+ Mbps)</h3>
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-white mb-2">✅ Advantages:</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Excellent picture quality</li>
                    <li>• Rich detail preservation</li>
                    <li>• Professional standard</li>
                    <li>• Future-compatible</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-white mb-2">❌ Disadvantages:</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Very large files</li>
                    <li>• Requires high-speed internet</li>
                    <li>• Slow loading</li>
                    <li>• High data consumption</li>
                  </ul>
                </div>
                <div className="bg-red-800/30 rounded p-3">
                  <p className="text-red-200 text-xs">
                    <strong>Best for:</strong> Professional production, high-end devices, fiber networks
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Frame Rate Section */}
        <section className="space-y-8">
          <h2 className="text-3xl font-bold text-center text-green-400">
            🎬 Video Frame Rate - Motion Smoothness
          </h2>

          <div className="bg-gray-800 rounded-xl p-6">
            <h3 className="text-2xl font-semibold mb-4 text-green-300">🤔 What is Frame Rate?</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-gray-300 mb-4">
                  <strong>Simple explanation:</strong> Frame rate is like flipping pages in a book. The faster you flip (more frames per second), the smoother the motion looks!
                </p>
                <p className="text-gray-300 mb-4">
                  Think of it as creating the illusion of motion - just like traditional animation, but with digital frames instead of hand-drawn pictures.
                </p>
                <div className="bg-green-900/20 border border-green-700 rounded p-4">
                  <p className="text-green-200 text-sm">
                    📖 <strong>Unit explanation:</strong> FPS = Frames Per Second
                    <br />
                    • 24 FPS = 24 images displayed per second
                    <br />
                    • 60 FPS = 60 images displayed per second (super smooth!)
                  </p>
                </div>
              </div>
              <div>
                <div className="bg-gray-700 rounded p-4">
                  <h4 className="font-semibold text-white mb-3">📊 Common Frame Rate Comparison</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Cinema Standard</span>
                      <span className="text-yellow-400">24 FPS</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">TV Standard</span>
                      <span className="text-blue-400">30 FPS</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Web Video</span>
                      <span className="text-green-400">30 FPS</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Gaming/Sports</span>
                      <span className="text-purple-400">60 FPS</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Slow Motion</span>
                      <span className="text-red-400">120+ FPS</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Frame Rate Selection Guide */}
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-yellow-900/20 border border-yellow-700 rounded-xl p-6">
              <div className="text-center mb-4">
                <div className="text-3xl mb-2">🎭</div>
                <h3 className="text-xl font-semibold text-yellow-300">24 FPS</h3>
                <p className="text-sm text-gray-400">Cinematic</p>
              </div>
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-white mb-2">💡 Characteristics:</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Cinema standard</li>
                    <li>• "Film look" feel</li>
                    <li>• Smaller file sizes</li>
                    <li>• Artistic effect</li>
                  </ul>
                </div>
                <div className="bg-yellow-800/30 rounded p-3">
                  <p className="text-yellow-200 text-xs">
                    <strong>Good for:</strong> Movies, documentaries, artistic videos
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-blue-900/20 border border-blue-700 rounded-xl p-6">
              <div className="text-center mb-4">
                <div className="text-3xl mb-2">📺</div>
                <h3 className="text-xl font-semibold text-blue-300">30 FPS</h3>
                <p className="text-sm text-gray-400">Standard Smooth</p>
              </div>
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-white mb-2">💡 Characteristics:</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• TV standard</li>
                    <li>• Naturally smooth</li>
                    <li>• Widely compatible</li>
                    <li>• Mainstream choice</li>
                  </ul>
                </div>
                <div className="bg-blue-800/30 rounded p-3">
                  <p className="text-blue-200 text-xs">
                    <strong>Good for:</strong> Daily videos, tutorials, live streams
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-purple-900/20 border border-purple-700 rounded-xl p-6">
              <div className="text-center mb-4">
                <div className="text-3xl mb-2">🎮</div>
                <h3 className="text-xl font-semibold text-purple-300">60 FPS</h3>
                <p className="text-sm text-gray-400">Ultra Smooth</p>
              </div>
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-white mb-2">💡 Characteristics:</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Extremely smooth</li>
                    <li>• Gaming standard</li>
                    <li>• Clear motion</li>
                    <li>• Modern feel</li>
                  </ul>
                </div>
                <div className="bg-purple-800/30 rounded p-3">
                  <p className="text-purple-200 text-xs">
                    <strong>Good for:</strong> Gaming, sports, tech demos
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-red-900/20 border border-red-700 rounded-xl p-6">
              <div className="text-center mb-4">
                <div className="text-3xl mb-2">🏃‍♂️</div>
                <h3 className="text-xl font-semibold text-red-300">120+ FPS</h3>
                <p className="text-sm text-gray-400">Slow Motion</p>
              </div>
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-white mb-2">💡 Characteristics:</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Slow motion creation</li>
                    <li>• Professional use</li>
                    <li>• Huge file sizes</li>
                    <li>• Special effects</li>
                  </ul>
                </div>
                <div className="bg-red-800/30 rounded p-3">
                  <p className="text-red-200 text-xs">
                    <strong>Good for:</strong> Slow motion, professional production, scientific analysis
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How They Work Together */}
        <section className="space-y-8">
          <h2 className="text-3xl font-bold text-center text-orange-400">
            🔗 How They Work Together - Perfect Combinations
          </h2>

          <div className="bg-gradient-to-r from-orange-900/20 to-red-900/20 border border-orange-700 rounded-xl p-6">
            <h3 className="text-2xl font-semibold mb-6 text-orange-300 text-center">🎯 Golden Combination Formula</h3>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-green-800/30 rounded-lg p-4 text-center">
                <div className="text-2xl mb-2">📱</div>
                <h4 className="font-semibold text-green-300 mb-2">Mobile Viewing</h4>
                <div className="space-y-1 text-sm text-gray-300">
                  <div>720p</div>
                  <div>2-4 Mbps</div>
                  <div>30 FPS</div>
                </div>
                <p className="text-xs text-green-200 mt-2">Data-friendly, clear enough</p>
              </div>

              <div className="bg-blue-800/30 rounded-lg p-4 text-center">
                <div className="text-2xl mb-2">💻</div>
                <h4 className="font-semibold text-blue-300 mb-2">Desktop Viewing</h4>
                <div className="space-y-1 text-sm text-gray-300">
                  <div>1080p</div>
                  <div>5-8 Mbps</div>
                  <div>30 FPS</div>
                </div>
                <p className="text-xs text-blue-200 mt-2">Clear and smooth, mainstream setup</p>
              </div>

              <div className="bg-purple-800/30 rounded-lg p-4 text-center">
                <div className="text-2xl mb-2">🎮</div>
                <h4 className="font-semibold text-purple-300 mb-2">Gaming Content</h4>
                <div className="space-y-1 text-sm text-gray-300">
                  <div>1080p</div>
                  <div>8-15 Mbps</div>
                  <div>60 FPS</div>
                </div>
                <p className="text-xs text-purple-200 mt-2">Ultra smooth, clear action</p>
              </div>

              <div className="bg-red-800/30 rounded-lg p-4 text-center">
                <div className="text-2xl mb-2">🎬</div>
                <h4 className="font-semibold text-red-300 mb-2">Professional Production</h4>
                <div className="space-y-1 text-sm text-gray-300">
                  <div>4K</div>
                  <div>25+ Mbps</div>
                  <div>24/60 FPS</div>
                </div>
                <p className="text-xs text-red-200 mt-2">Top quality, professional standard</p>
              </div>
            </div>
          </div>

          {/* Trade-off Guidelines */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4 text-orange-300">⚖️ How to Make Trade-offs?</h3>
              <div className="space-y-4">
                <div className="bg-gray-700 rounded p-4">
                  <h4 className="font-medium text-white mb-2">💾 File Size Priority</h4>
                  <p className="text-sm text-gray-300">Choose lower resolution and bitrate, keep 30 FPS. Good for limited storage or slow networks.</p>
                </div>

                <div className="bg-gray-700 rounded p-4">
                  <h4 className="font-medium text-white mb-2">🎯 Quality Priority</h4>
                  <p className="text-sm text-gray-300">Choose 1080p or 4K resolution, increase bitrate, adjust frame rate by content (24fps for films, 30-60fps for others).</p>
                </div>

                <div className="bg-gray-700 rounded p-4">
                  <h4 className="font-medium text-white mb-2">🌊 Smoothness Priority</h4>
                  <p className="text-sm text-gray-300">Keep 60 FPS, resolution can be lowered to 720p or 1080p, adjust bitrate accordingly.</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4 text-orange-300">🎯 Practical Recommendations</h3>
              <div className="space-y-4">
                <div className="bg-yellow-900/20 border border-yellow-700 rounded p-4">
                  <h4 className="font-medium text-yellow-300 mb-2">📋 Beginner Recommendation</h4>
                  <p className="text-sm text-gray-300">
                    <strong>1080p + 8 Mbps + 30 FPS</strong>
                    <br />The safest choice, suitable for 99% of use cases.
                  </p>
                </div>

                <div className="bg-green-900/20 border border-green-700 rounded p-4">
                  <h4 className="font-medium text-green-300 mb-2">📱 Mobile First</h4>
                  <p className="text-sm text-gray-300">
                    <strong>720p + 4 Mbps + 30 FPS</strong>
                    <br />Data-friendly, perfectly fine for mobile viewing.
                  </p>
                </div>

                <div className="bg-blue-900/20 border border-blue-700 rounded p-4">
                  <h4 className="font-medium text-blue-300 mb-2">🎮 Game Streaming</h4>
                  <p className="text-sm text-gray-300">
                    <strong>1080p + 12 Mbps + 60 FPS</strong>
                    <br />Perfectly captures every detail of gameplay.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* VidLoad.cc Integration */}
        <section className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-xl p-6">
          <h2 className="text-2xl font-bold text-center mb-6 text-cyan-400">🛠️ Analyze Your Videos with VidLoad.cc</h2>
          <div className="text-center space-y-4">
            <p className="text-gray-300 max-w-3xl mx-auto">
              Want to know the exact resolution, bitrate, and frame rate of your videos? Use VidLoad.cc to instantly analyze
              the detailed parameters of any video file, helping you understand video quality and make better settings choices!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="inline-flex items-center justify-center px-6 py-3 bg-cyan-600 hover:bg-cyan-700 rounded-lg font-medium transition-colors"
              >
                🎯 Analyze Videos Now
              </Link>
              <Link
                href="/use-cases"
                className="inline-flex items-center justify-center px-6 py-3 bg-gray-600 hover:bg-gray-500 rounded-lg font-medium transition-colors"
              >
                📖 View Use Cases
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-center text-yellow-400">❓ Frequently Asked Questions</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-3 text-yellow-300">🤔 Why are my video files so large?</h3>
              <p className="text-gray-300 text-sm mb-3">
                Video file size is mainly determined by three factors: higher resolution, higher bitrate, and longer duration all result in larger files.
                If files are too large, try reducing resolution or bitrate.
              </p>
              <div className="bg-yellow-900/20 border border-yellow-700 rounded p-3">
                <p className="text-yellow-200 text-xs">
                  💡 <strong>Pro tip:</strong> The same 4K video with different bitrates can vary in file size by 10x!
                </p>
              </div>
            </div>

            <div className="bg-gray-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-3 text-yellow-300">🌐 How fast should my internet be for HD video?</h3>
              <p className="text-gray-300 text-sm mb-3">
                Generally: 720p needs 5+ Mbps, 1080p needs 10+ Mbps, 4K needs 25+ Mbps.
                If your network isn't fast enough, videos will buffer frequently.
              </p>
              <div className="bg-yellow-900/20 border border-yellow-700 rounded p-3">
                <p className="text-yellow-200 text-xs">
                  💡 <strong>Pro tip:</strong> Adaptive bitrate streaming automatically adjusts quality based on your network!
                </p>
              </div>
            </div>

            <div className="bg-gray-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-3 text-yellow-300">🎮 Why use 60 FPS for gaming recordings?</h3>
              <p className="text-gray-300 text-sm mb-3">
                Gaming involves rapid scene changes. 30 FPS might make fast movements appear choppy or have motion blur.
                60 FPS better captures every action detail.
              </p>
              <div className="bg-yellow-900/20 border border-yellow-700 rounded p-3">
                <p className="text-yellow-200 text-xs">
                  💡 <strong>Pro tip:</strong> If your computer can't handle it, use 1080p 60fps instead of 4K 30fps!
                </p>
              </div>
            </div>

            <div className="bg-gray-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-3 text-yellow-300">📱 What are typical mobile video settings?</h3>
              <p className="text-gray-300 text-sm mb-3">
                Modern phones typically default to 1080p 30fps. High-end phones support 4K 60fps.
                You can adjust these in camera settings, but higher settings consume storage quickly.
              </p>
              <div className="bg-yellow-900/20 border border-yellow-700 rounded p-3">
                <p className="text-yellow-200 text-xs">
                  💡 <strong>Pro tip:</strong> For daily phone recording, 1080p 30fps is perfect - clear and space-efficient!
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
