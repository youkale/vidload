'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors mb-6"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            Back to VidLoad.cc
          </Link>

          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-gray-400 text-lg">
            Last updated: {new Date().toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </div>

        {/* Privacy Promise Banner */}
        <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-6 mb-8">
          <h2 className="text-blue-400 text-xl font-semibold mb-3">🔒 Our Privacy Promise</h2>
          <p className="text-blue-100 text-lg">
            <strong>VidLoad.cc minimizes data collection.</strong> All video processing happens locally in your browser.
            We only collect anonymous usage analytics to improve the service - no personal data or video content.
          </p>
        </div>

        <div className="prose prose-invert max-w-none">
          {/* Introduction */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-blue-400">1. Introduction</h2>
            <div className="space-y-4 text-gray-300">
              <p>
                VidLoad.cc ("we," "our," or "us") operates the VidLoad.cc website (the "Service").
                This Privacy Policy explains how we handle information when you use our Service.
              </p>
              <p>
                <strong>Key Point:</strong> Unlike most online services, VidLoad.cc is designed to operate
                without collecting any personal data. All video processing occurs locally in your browser
                using WebAssembly technology.
              </p>
            </div>
          </section>

          {/* Information We Collect */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-blue-400">2. Information We Collect</h2>
            <div className="space-y-4 text-gray-300">
              <p>VidLoad.cc is designed with privacy-by-design principles. We collect <strong>minimal anonymous data</strong>:</p>

              <h3 className="text-lg font-semibold text-white">What We Collect</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Anonymous Usage Analytics:</strong> Page visits, feature usage, and performance metrics (via Google Analytics)</li>
                <li><strong>Technical Data:</strong> Browser type, device type, and general location (country/region)</li>
                <li><strong>Error Reports:</strong> Anonymous crash reports and technical issues</li>
              </ul>

              <h3 className="text-lg font-semibold text-white mt-6">What We Don't Collect</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Personal Information:</strong> Names, email addresses, phone numbers, or postal addresses</li>
                <li><strong>Video Content:</strong> Your videos never leave your device or reach our servers</li>
                <li><strong>Identifiable Data:</strong> IP addresses are anonymized, no user IDs or persistent tracking</li>
                <li><strong>Advertising Data:</strong> No ad tracking or personalization data</li>
              </ul>
            </div>
          </section>

          {/* How Our Service Works */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-blue-400">3. How Our Service Works (Privacy-by-Design)</h2>
            <div className="space-y-4 text-gray-300">
              <h3 className="text-lg font-semibold text-white">Local Processing Only</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Video Analysis:</strong> Performed entirely in your browser using FFmpeg.wasm</li>
                <li><strong>File Storage:</strong> Videos remain on your device - never uploaded</li>
                <li><strong>Metadata Extraction:</strong> All processing happens client-side</li>
                <li><strong>History:</strong> Stored locally in your browser's localStorage</li>
              </ul>

              <h3 className="text-lg font-semibold text-white mt-6">Technical Implementation</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>WebAssembly:</strong> Video processing runs in your browser sandbox</li>
                <li><strong>No Server Communication:</strong> Video data never transmitted to external servers</li>
                <li><strong>Client-side Only:</strong> All features work offline after initial page load</li>
              </ul>
            </div>
          </section>

          {/* Limited Technical Data */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-blue-400">4. Limited Technical Data</h2>
            <div className="space-y-4 text-gray-300">
              <p>For basic website functionality, our web server may temporarily log:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>HTTP Requests:</strong> Standard web server logs (automatically deleted within 7 days)</li>
                <li><strong>Error Logs:</strong> Technical errors for debugging (no personal data, deleted within 7 days)</li>
                <li><strong>No Permanent Storage:</strong> These logs are not analyzed, shared, or permanently stored</li>
              </ul>
              <div className="bg-blue-900/20 border border-blue-700 rounded p-4 mt-4">
                <p className="text-blue-100">
                  <strong>Note:</strong> These are standard web server logs required for basic operation and security.
                  They contain no video content or personal information.
                </p>
              </div>
            </div>
          </section>

          {/* Cookies and Local Storage */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-blue-400">5. Cookies and Local Storage</h2>
            <div className="space-y-4 text-gray-300">
              <h3 className="text-lg font-semibold text-white">Essential Cookies Only</h3>
              <p>We use minimal essential cookies for:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Language Preference:</strong> Remember your selected language</li>
                <li><strong>Session State:</strong> Basic application functionality</li>
              </ul>

              <h3 className="text-lg font-semibold text-white mt-6">Local Storage</h3>
              <p>Your browser's local storage may contain:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Video History:</strong> List of previously analyzed videos (stored locally only)</li>
                <li><strong>User Preferences:</strong> Language settings, UI preferences</li>
                <li><strong>Cache Data:</strong> Video metadata to avoid re-processing</li>
              </ul>

              <div className="bg-green-900/20 border border-green-700 rounded p-4 mt-4">
                <p className="text-green-100">
                  <strong>Your Control:</strong> All local data can be cleared using your browser's settings or
                  our "Clear All Cache" button. This data never leaves your device.
                </p>
              </div>
            </div>
          </section>

          {/* Legal Compliance */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-blue-400">6. Legal Compliance</h2>

            <div className="space-y-6 text-gray-300">
              <div>
                <h3 className="text-lg font-semibold text-white">GDPR Compliance (EU Users)</h3>
                <p>Under the General Data Protection Regulation:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Lawful Basis:</strong> Not applicable - no personal data processed</li>
                  <li><strong>Data Subject Rights:</strong> Not applicable - no personal data stored</li>
                  <li><strong>Right to be Forgotten:</strong> Not applicable - no data to forget</li>
                  <li><strong>Data Protection Officer:</strong> Not required - no personal data processing</li>
                  <li><strong>Consent:</strong> Not required - no data collection</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white">CCPA Compliance (California Residents)</h3>
                <p>Under the California Consumer Privacy Act:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Personal Information Collected:</strong> None</li>
                  <li><strong>Sources of Information:</strong> Not applicable</li>
                  <li><strong>Business Purpose:</strong> Not applicable - no data collected</li>
                  <li><strong>Third-party Sharing:</strong> Not applicable - no data to share</li>
                  <li><strong>Your Rights:</strong> All rights preserved - no data exists to exercise rights upon</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Third-party Services */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-blue-400">7. Third-party Services</h2>
            <div className="space-y-4 text-gray-300">
              <h3 className="text-lg font-semibold text-white">Services We Use</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Google Analytics:</strong> Anonymous usage analytics with IP anonymization enabled</li>
                <li><strong>Cloudflare:</strong> Content delivery and security services</li>
              </ul>

              <h3 className="text-lg font-semibold text-white mt-6">We Do Not Use</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Social media tracking pixels</li>
                <li>Advertising networks or remarketing services</li>
                <li>Customer support chat services that track users</li>
                <li>Third-party data brokers or marketing services</li>
              </ul>

              <div className="bg-blue-900/20 border border-blue-700 rounded p-4 mt-4">
                <p className="text-blue-100">
                  <strong>Google Analytics Configuration:</strong> We have configured Google Analytics with enhanced privacy settings:
                  IP anonymization, no advertising features, and no cross-device tracking.
                </p>
              </div>

              <p className="mt-4">
                <strong>External Video URLs:</strong> When you provide a video URL, your browser directly
                accesses that URL. We do not proxy or track these requests.
              </p>
            </div>
          </section>

          {/* Data Security */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-blue-400">8. Data Security</h2>
            <div className="space-y-4 text-gray-300">
              <p>While we don't collect data, we maintain security best practices:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>HTTPS:</strong> All connections are encrypted</li>
                <li><strong>Content Security Policy:</strong> Prevents malicious code injection</li>
                <li><strong>No Data Breach Risk:</strong> Cannot lose data we don't collect</li>
                <li><strong>Open Source:</strong> Code is publicly auditable for security</li>
              </ul>
            </div>
          </section>

          {/* International Users */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-blue-400">9. International Users</h2>
            <div className="space-y-4 text-gray-300">
              <p>
                VidLoad.cc operates with a global privacy-first approach. Since no personal data
                is collected or processed, international data transfer regulations do not apply.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>No Cross-border Data Transfers:</strong> No data to transfer</li>
                <li><strong>Local Processing:</strong> All processing happens in your local browser</li>
                <li><strong>Jurisdiction:</strong> No personal data means minimal jurisdictional concerns</li>
              </ul>
            </div>
          </section>

          {/* Future Service Considerations */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-blue-400">10. Future Service Considerations</h2>
            <div className="space-y-4 text-gray-300">
              <p>
                We are committed to transparency about any potential future changes to our service that may affect privacy.
              </p>

              <h3 className="text-lg font-semibold text-white">Potential Future Features</h3>
              <div className="bg-yellow-900/20 border border-yellow-700 rounded p-6">
                <h4 className="font-semibold text-yellow-300 mb-3">📢 Advertising Consideration</h4>
                <p className="text-yellow-100 mb-3">
                  To support the free service, we may consider implementing privacy-friendly advertising in the future.
                  If implemented, this would include:
                </p>
                <ul className="text-yellow-100 text-sm space-y-1">
                  <li>• <strong>Contextual advertising only</strong> - based on page content, not user behavior</li>
                  <li>• <strong>No personal data collection</strong> for advertising purposes</li>
                  <li>• <strong>Clear user consent</strong> required before enabling any advertising features</li>
                  <li>• <strong>Easy opt-out mechanisms</strong> for users who prefer ad-free experience</li>
                  <li>• <strong>Continued video privacy</strong> - video content remains on your device</li>
                  <li>• <strong>Full transparency</strong> and advance notification before implementation</li>
                </ul>
              </div>

              <h3 className="text-lg font-semibold text-white mt-6">Unchanging Core Principles</h3>
              <div className="bg-green-900/20 border border-green-700 rounded p-6">
                <h4 className="font-semibold text-green-300 mb-3">🛡️ Privacy Guarantees</h4>
                <p className="text-green-100 mb-3">
                  Regardless of future features, we will always maintain these core principles:
                </p>
                <ul className="text-green-100 text-sm space-y-1">
                  <li>• <strong>Local video processing</strong> - videos never leave your device</li>
                  <li>• <strong>No personal data collection</strong> without explicit consent</li>
                  <li>• <strong>Full transparency</strong> about any data collection</li>
                  <li>• <strong>User control</strong> - easy opt-out for all non-essential features</li>
                  <li>• <strong>Privacy by design</strong> - privacy protection built into all features</li>
                  <li>• <strong>GDPR and CCPA compliance</strong> maintained at all times</li>
                </ul>
              </div>

              <div className="bg-blue-900/20 border border-blue-700 rounded p-4 mt-4">
                <p className="text-blue-100">
                  <strong>User Notification Promise:</strong> Any future changes that affect privacy will be clearly
                  communicated with prominent website notices and updated consent mechanisms. Users will always
                  have the choice to continue using the service with previous privacy settings.
                </p>
              </div>
            </div>
          </section>

          {/* Changes to Privacy Policy */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-blue-400">11. Changes to This Privacy Policy</h2>
            <div className="space-y-4 text-gray-300">
              <p>
                We may update this Privacy Policy from time to time. Any changes will be posted on this page
                with an updated "Last modified" date. For material changes affecting privacy, we will provide
                prominent notice on our website.
              </p>

              <h3 className="text-lg font-semibold text-white mt-4">Notification Methods</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Website Banner:</strong> Prominent notice on homepage for significant changes</li>
                <li><strong>Policy Updates:</strong> Updated "Last modified" date and change log</li>
                <li><strong>User Consent:</strong> New consent required for material privacy changes</li>
                <li><strong>Grace Period:</strong> Advance notice before implementing significant changes</li>
              </ul>

              <div className="bg-blue-900/20 border border-blue-700 rounded p-4 mt-4">
                <p className="text-blue-100">
                  <strong>Our Commitment:</strong> We will never compromise your core privacy protections
                  without explicit user consent and clear opt-out alternatives.
                </p>
              </div>
            </div>
          </section>

          {/* Contact */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-blue-400">12. Contact Information</h2>
            <div className="space-y-4 text-gray-300">
              <p>
                For questions about this Privacy Policy or our privacy practices:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Website:</strong> <a href="https://vidload.cc" className="text-blue-400 hover:text-blue-300">https://vidload.cc</a></li>
                <li><strong>GitHub Issues:</strong> Report privacy concerns via our GitHub repository</li>
                <li><strong>Open Source:</strong> Review our privacy implementation in our public code</li>
              </ul>

              <div className="bg-gray-800 border border-gray-700 rounded p-4 mt-6">
                <p className="text-gray-300">
                  <strong>Privacy by Design:</strong> This policy reflects our core design principle -
                  we cannot violate your privacy because we don't collect your data.
                </p>
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
              <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
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
    </div>
  );
}
