'use client';

import React from 'react';
import Link from 'next/link';

export default function TermsPage() {
  return (
    <main className="min-h-screen p-8 bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <Link href="/" className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors mb-4">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to VidLoad.cc
          </Link>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Terms of Service
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Last updated: {new Date().toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </div>

        {/* Terms Summary Banner */}
        <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-6 mb-8">
          <h2 className="text-blue-400 text-xl font-semibold mb-3">📋 Terms Summary</h2>
          <p className="text-blue-100 text-lg">
            VidLoad.cc is a <strong>free, open-source service</strong> provided "as-is."
            Use it responsibly and respect copyright laws.
          </p>
        </div>

        <div className="prose prose-invert max-w-none">
          {/* Acceptance */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-blue-400">1. Acceptance of Terms</h2>
            <div className="space-y-4 text-gray-300">
              <p>
                By accessing and using VidLoad.cc (the "Service"), you accept and agree to be bound by
                the terms and provision of this agreement.
              </p>
              <p>
                <strong>Key Principle:</strong> VidLoad.cc is designed as a privacy-first, client-side
                video analysis tool. All processing occurs locally in your browser.
              </p>
            </div>
          </section>

          {/* Service Description */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-blue-400">2. Service Description</h2>
            <div className="space-y-4 text-gray-300">
              <p>VidLoad.cc provides:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Video Player:</strong> Browser-based video playback for various formats</li>
                <li><strong>Video Analysis:</strong> Client-side metadata extraction using FFmpeg.wasm</li>
                <li><strong>HLS Stream Analysis:</strong> Technical analysis of HLS streams and manifests</li>
                <li><strong>Privacy-First Processing:</strong> All operations occur locally in your browser</li>
              </ul>

              <div className="bg-green-900/20 border border-green-700 rounded p-4 mt-4">
                <p className="text-green-100">
                  <strong>No Account Required:</strong> VidLoad.cc operates without user registration,
                  data collection, or server-side processing of your content.
                </p>
              </div>
            </div>
          </section>

          {/* User Responsibilities */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-blue-400">3. User Responsibilities</h2>
            <div className="space-y-4 text-gray-300">
              <h3 className="text-lg font-semibold text-white">Content Responsibility</h3>
              <p>You are solely responsible for:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Legal Use:</strong> Ensuring you have rights to analyze the videos you process</li>
                <li><strong>Copyright Compliance:</strong> Respecting intellectual property rights</li>
                <li><strong>Content Appropriateness:</strong> Not using the service for illegal content</li>
                <li><strong>Privacy of Others:</strong> Respecting privacy when processing shared content</li>
              </ul>

              <h3 className="text-lg font-semibold text-white mt-6">Prohibited Uses</h3>
              <p>You agree not to use VidLoad.cc for:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Processing copyrighted content without permission</li>
                <li>Analyzing content that violates applicable laws</li>
                <li>Attempting to reverse engineer the service</li>
                <li>Malicious activities or security testing without permission</li>
                <li>Automated scraping or bulk processing that impacts service performance</li>
              </ul>
            </div>
          </section>

          {/* Free Service */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-blue-400">4. Free Service Provision</h2>
            <div className="space-y-4 text-gray-300">
              <p>VidLoad.cc is provided as a free service:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>No Fees:</strong> No subscription, usage, or hidden fees</li>
                <li><strong>No Advertising:</strong> No ads or sponsored content</li>
                <li><strong>Open Source:</strong> Source code available under MIT License</li>
                <li><strong>Best Effort:</strong> Service provided on "best effort" basis</li>
              </ul>

              <div className="bg-yellow-900/20 border border-yellow-700 rounded p-4 mt-4">
                <p className="text-yellow-100">
                  <strong>Service Availability:</strong> As a free service, we cannot guarantee
                  100% uptime or performance. Service may be temporarily unavailable for maintenance.
                </p>
              </div>
            </div>
          </section>

          {/* Privacy and Data */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-blue-400">5. Privacy and Data Handling</h2>
            <div className="space-y-4 text-gray-300">
              <p>VidLoad.cc operates with privacy-by-design principles:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>No Data Collection:</strong> We do not collect, store, or process personal data</li>
                <li><strong>Local Processing:</strong> All video analysis occurs in your browser</li>
                <li><strong>No Upload:</strong> Video files never leave your device</li>
                <li><strong>No Tracking:</strong> No analytics, cookies, or user tracking</li>
              </ul>

              <p>
                For complete details, please review our <Link href="/privacy" className="text-blue-400 hover:text-blue-300">Privacy Policy</Link>.
              </p>
            </div>
          </section>

          {/* Intellectual Property */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-blue-400">6. Intellectual Property</h2>
            <div className="space-y-4 text-gray-300">
              <h3 className="text-lg font-semibold text-white">VidLoad.cc Service</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Open Source:</strong> VidLoad.cc source code is available under MIT License</li>
                <li><strong>Third-party Libraries:</strong> We use open-source libraries (FFmpeg.wasm, HLS.js, etc.)</li>
                <li><strong>Brand Name:</strong> "VidLoad.cc" name and branding remain our property</li>
              </ul>

              <h3 className="text-lg font-semibold text-white mt-6">User Content</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>You Retain Rights:</strong> You retain all rights to content you analyze</li>
                <li><strong>No Claims:</strong> We make no claims to your content or analysis results</li>
                <li><strong>Local Storage:</strong> Analysis results stored locally remain yours</li>
              </ul>
            </div>
          </section>

          {/* Disclaimers */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-blue-400">7. Disclaimers and Limitations</h2>
            <div className="space-y-4 text-gray-300">
              <h3 className="text-lg font-semibold text-white">Service "As-Is"</h3>
              <p>VidLoad.cc is provided "AS-IS" without warranties of any kind:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>No Accuracy Guarantee:</strong> Video analysis results may not be 100% accurate</li>
                <li><strong>No Compatibility Guarantee:</strong> May not work with all video formats or browsers</li>
                <li><strong>No Availability Guarantee:</strong> Service may be temporarily unavailable</li>
                <li><strong>No Support Guarantee:</strong> Free service with community-based support</li>
              </ul>

              <h3 className="text-lg font-semibold text-white mt-6">Limitation of Liability</h3>
              <div className="bg-red-900/20 border border-red-700 rounded p-4">
                <p className="text-red-100">
                  <strong>Important:</strong> VidLoad.cc and its creators are not liable for any damages,
                  data loss, or issues arising from use of this free service. Use at your own risk.
                </p>
              </div>
            </div>
          </section>

          {/* Browser Requirements */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-blue-400">8. Technical Requirements</h2>
            <div className="space-y-4 text-gray-300">
              <p>VidLoad.cc requires:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Modern Browser:</strong> Chrome 90+, Firefox 88+, Safari 14+, or Edge 90+</li>
                <li><strong>JavaScript Enabled:</strong> Required for all functionality</li>
                <li><strong>WebAssembly Support:</strong> For FFmpeg.wasm video processing</li>
                <li><strong>Local Storage:</strong> For history and preferences (optional)</li>
              </ul>

              <p className="mt-4">
                <strong>Performance Note:</strong> Video analysis performance depends on your device's
                processing power and available memory.
              </p>
            </div>
          </section>

          {/* Third-party Content */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-blue-400">9. Third-party Content and Links</h2>
            <div className="space-y-4 text-gray-300">
              <p>
                VidLoad.cc may process videos from external URLs provided by users:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Direct Access:</strong> Your browser directly accesses external URLs</li>
                <li><strong>No Endorsement:</strong> We do not endorse or control external content</li>
                <li><strong>User Responsibility:</strong> You are responsible for ensuring legal access</li>
                <li><strong>No Liability:</strong> We are not liable for external content or services</li>
              </ul>
            </div>
          </section>

          {/* Open Source */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-blue-400">10. Open Source and Community</h2>
            <div className="space-y-4 text-gray-300">
              <p>VidLoad.cc embraces open source principles:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>MIT License:</strong> Source code available under permissive open source license</li>
                <li><strong>Community Contributions:</strong> We welcome bug reports and improvements</li>
                <li><strong>Transparency:</strong> All functionality is auditable through public code</li>
                <li><strong>Educational Use:</strong> Code may be used for learning and educational purposes</li>
              </ul>

              <div className="bg-gray-800 border border-gray-700 rounded p-4 mt-4">
                <p className="text-gray-300">
                  <strong>Contribute:</strong> Report issues, suggest features, or contribute code
                  via our GitHub repository.
                </p>
              </div>
            </div>
          </section>

          {/* Termination */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-blue-400">11. Service Termination</h2>
            <div className="space-y-4 text-gray-300">
              <p>Regarding service availability:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Your Access:</strong> You may stop using the service at any time</li>
                <li><strong>No Data Loss:</strong> Since data is stored locally, you retain everything</li>
                <li><strong>Service Continuation:</strong> We aim to maintain the service long-term</li>
                <li><strong>Open Source Backup:</strong> Even if the service ends, code remains available</li>
              </ul>
            </div>
          </section>

          {/* Changes to Terms */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-blue-400">12. Changes to Terms</h2>
            <div className="space-y-4 text-gray-300">
              <p>
                We may update these terms periodically. Changes will be posted on this page with
                an updated date. Continued use constitutes acceptance of new terms.
              </p>
              <p>
                <strong>Our Commitment:</strong> Any changes will maintain our privacy-first,
                open-source principles.
              </p>
            </div>
          </section>

          {/* Contact */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-blue-400">13. Contact and Support</h2>
            <div className="space-y-4 text-gray-300">
              <p>For questions, issues, or feedback:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>GitHub Issues:</strong> Primary support channel for bug reports and features</li>
                <li><strong>Community Support:</strong> User community assistance via discussions</li>
                <li><strong>Documentation:</strong> Check README and code comments for technical details</li>
              </ul>

              <div className="bg-blue-900/20 border border-blue-700 rounded p-4 mt-4">
                <p className="text-blue-100">
                  <strong>Best Effort Support:</strong> As a free, open-source project, support is
                  provided on a best-effort basis by volunteers.
                </p>
              </div>
            </div>
          </section>

          {/* Governing Law */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-blue-400">14. Governing Law</h2>
            <div className="space-y-4 text-gray-300">
              <p>
                These terms are governed by applicable laws. Since VidLoad.cc processes no personal
                data and operates client-side, jurisdictional issues are minimal.
              </p>
              <p>
                Disputes should be resolved amicably through our open-source community channels.
              </p>
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
              <Link href="/cookies" className="text-gray-400 hover:text-white transition-colors">
                Cookie Policy
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
