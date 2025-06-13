'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function CookiesPage() {
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

          <h1 className="text-4xl font-bold mb-4">Cookie Policy</h1>
          <p className="text-gray-400 text-lg">
            Last updated: {new Date().toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </div>

        {/* Cookie Promise Banner */}
        <div className="bg-green-900/20 border border-green-700 rounded-lg p-6 mb-8">
          <h2 className="text-green-400 text-xl font-semibold mb-3">🍪 Our Cookie Promise</h2>
          <p className="text-green-100 text-lg">
            VidLoad.cc uses <strong>minimal essential cookies only</strong>. No tracking, no advertising,
            no third-party cookies - just basic functionality cookies.
          </p>
        </div>

        <div className="prose prose-invert max-w-none">
          {/* What Are Cookies */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-blue-400">1. What Are Cookies?</h2>
            <div className="space-y-4 text-gray-300">
              <p>
                Cookies are small text files stored by your web browser when you visit a website.
                They help websites remember information about your visit and preferences.
              </p>
              <p>
                <strong>VidLoad.cc Philosophy:</strong> We believe in minimal cookie usage. Unlike most
                websites, we don't use cookies for tracking, advertising, or analytics.
              </p>
            </div>
          </section>

          {/* Cookies We Use */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-blue-400">2. Cookies We Use</h2>

            <div className="space-y-6 text-gray-300">
              <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Essential Functional Cookies</h3>

                <div className="space-y-4">
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-semibold text-blue-300">Language Preference</h4>
                    <div className="text-sm space-y-1">
                      <p><strong>Purpose:</strong> Remember your selected language (English, Chinese, Japanese)</p>
                      <p><strong>Duration:</strong> Persistent (until you clear cookies)</p>
                      <p><strong>Data Stored:</strong> Language code only (e.g., "en", "zh", "ja")</p>
                      <p><strong>Required:</strong> Optional - defaults to browser language</p>
                    </div>
                  </div>

                  <div className="border-l-4 border-green-500 pl-4">
                    <h4 className="font-semibold text-green-300">Application State</h4>
                    <div className="text-sm space-y-1">
                      <p><strong>Purpose:</strong> Basic application functionality and user interface state</p>
                      <p><strong>Duration:</strong> Session only (deleted when browser closes)</p>
                      <p><strong>Data Stored:</strong> UI preferences, temporary state information</p>
                      <p><strong>Required:</strong> Essential for proper application function</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Cookies We Don't Use */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-blue-400">3. Cookies We DON'T Use</h2>
            <div className="space-y-4 text-gray-300">
              <p>VidLoad.cc explicitly <strong>does not use</strong> the following types of cookies:</p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-red-900/20 border border-red-700 rounded-lg p-4">
                  <h3 className="text-red-400 font-semibold mb-2">❌ Tracking Cookies</h3>
                  <ul className="text-sm space-y-1">
                    <li>• No Google Analytics cookies</li>
                    <li>• No user behavior tracking</li>
                    <li>• No cross-site tracking</li>
                    <li>• No fingerprinting cookies</li>
                  </ul>
                </div>

                <div className="bg-red-900/20 border border-red-700 rounded-lg p-4">
                  <h3 className="text-red-400 font-semibold mb-2">❌ Advertising Cookies</h3>
                  <ul className="text-sm space-y-1">
                    <li>• No ad targeting cookies</li>
                    <li>• No marketing cookies</li>
                    <li>• No retargeting pixels</li>
                    <li>• No social media cookies</li>
                  </ul>
                </div>

                <div className="bg-red-900/20 border border-red-700 rounded-lg p-4">
                  <h3 className="text-red-400 font-semibold mb-2">❌ Third-party Cookies</h3>
                  <ul className="text-sm space-y-1">
                    <li>• No external service cookies</li>
                    <li>• No CDN tracking cookies</li>
                    <li>• No analytics service cookies</li>
                    <li>• No embedded content cookies</li>
                  </ul>
                </div>

                <div className="bg-red-900/20 border border-red-700 rounded-lg p-4">
                  <h3 className="text-red-400 font-semibold mb-2">❌ Performance Cookies</h3>
                  <ul className="text-sm space-y-1">
                    <li>• No usage analytics cookies</li>
                    <li>• No performance monitoring</li>
                    <li>• No error tracking cookies</li>
                    <li>• No A/B testing cookies</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Local Storage */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-blue-400">4. Local Storage (Not Cookies)</h2>
            <div className="space-y-4 text-gray-300">
              <p>
                In addition to minimal cookies, VidLoad.cc uses browser Local Storage for enhanced functionality.
                <strong>This data never leaves your device.</strong>
              </p>

              <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-6">
                <h3 className="text-blue-300 font-semibold mb-4">Local Storage Contents</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold">Video History</h4>
                      <p className="text-sm text-gray-400">List of previously analyzed videos and their metadata</p>
                    </div>
                    <span className="text-green-400 text-sm">Local Only</span>
                  </div>

                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold">Analysis Cache</h4>
                      <p className="text-sm text-gray-400">Cached video metadata to avoid re-processing</p>
                    </div>
                    <span className="text-green-400 text-sm">Local Only</span>
                  </div>

                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold">User Preferences</h4>
                      <p className="text-sm text-gray-400">UI settings, language choice, display preferences</p>
                    </div>
                    <span className="text-green-400 text-sm">Local Only</span>
                  </div>
                </div>
              </div>

              <div className="bg-green-900/20 border border-green-700 rounded p-4">
                <p className="text-green-100">
                  <strong>Your Control:</strong> You can clear all local storage data using our
                  "Clear All Cache" button or your browser's developer tools.
                </p>
              </div>
            </div>
          </section>

          {/* Legal Compliance */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-blue-400">5. Legal Compliance</h2>

            <div className="space-y-6 text-gray-300">
              <div>
                <h3 className="text-lg font-semibold text-white">EU Cookie Law (ePrivacy Directive)</h3>
                <p>Under EU regulations:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Essential Cookies Only:</strong> We only use technically necessary cookies</li>
                  <li><strong>No Consent Required:</strong> Essential cookies don't require explicit consent</li>
                  <li><strong>Transparent Usage:</strong> This policy clearly explains our cookie usage</li>
                  <li><strong>User Control:</strong> You can disable cookies in your browser if desired</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white">GDPR Cookie Compliance</h3>
                <p>Our cookie practices align with GDPR:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>No Personal Data:</strong> Cookies contain no personally identifiable information</li>
                  <li><strong>Minimal Processing:</strong> Only essential functional data processing</li>
                  <li><strong>No Profiling:</strong> Cookies are not used for user profiling or tracking</li>
                  <li><strong>Data Subject Rights:</strong> Easy to clear/control via browser settings</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Managing Cookies */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-blue-400">6. Managing Your Cookies</h2>
            <div className="space-y-4 text-gray-300">
              <h3 className="text-lg font-semibold text-white">Browser Cookie Controls</h3>
              <p>You can control cookies through your browser settings:</p>

              <div className="grid md:grid-cols-2 gap-6 mt-4">
                <div className="bg-gray-800 border border-gray-700 rounded p-4">
                  <h4 className="font-semibold text-blue-300 mb-2">Chrome</h4>
                  <p className="text-sm">Settings → Privacy and Security → Cookies and other site data</p>
                </div>

                <div className="bg-gray-800 border border-gray-700 rounded p-4">
                  <h4 className="font-semibold text-blue-300 mb-2">Firefox</h4>
                  <p className="text-sm">Options → Privacy & Security → Cookies and Site Data</p>
                </div>

                <div className="bg-gray-800 border border-gray-700 rounded p-4">
                  <h4 className="font-semibold text-blue-300 mb-2">Safari</h4>
                  <p className="text-sm">Preferences → Privacy → Manage Website Data</p>
                </div>

                <div className="bg-gray-800 border border-gray-700 rounded p-4">
                  <h4 className="font-semibold text-blue-300 mb-2">Edge</h4>
                  <p className="text-sm">Settings → Cookies and site permissions → Cookies and site data</p>
                </div>
              </div>

              <div className="bg-yellow-900/20 border border-yellow-700 rounded p-4 mt-6">
                <h4 className="font-semibold text-yellow-300 mb-2">Impact of Disabling Cookies</h4>
                <p className="text-yellow-100 text-sm">
                  If you disable all cookies, VidLoad.cc will still work, but you may lose:
                </p>
                <ul className="text-yellow-100 text-sm mt-2 space-y-1">
                  <li>• Language preference (will default to browser language)</li>
                  <li>• UI state between sessions</li>
                  <li>• Some convenience features</li>
                </ul>
                <p className="text-yellow-100 text-sm mt-2">
                  <strong>Video analysis will continue to work normally</strong> as it uses local processing, not cookies.
                </p>
              </div>
            </div>
          </section>

          {/* Third-party Services */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-blue-400">7. Third-party Services</h2>
            <div className="space-y-4 text-gray-300">
              <p>VidLoad.cc has a strict no third-party policy:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>No External Analytics:</strong> No Google Analytics, Mixpanel, or similar services</li>
                <li><strong>No Social Media Integration:</strong> No Facebook, Twitter, or social tracking</li>
                <li><strong>No Advertising Networks:</strong> No ad serving or targeting cookies</li>
                <li><strong>No CDN Tracking:</strong> Static assets served without tracking</li>
                <li><strong>No Chat Services:</strong> No third-party chat or support widgets</li>
              </ul>

              <div className="bg-green-900/20 border border-green-700 rounded p-4 mt-4">
                <p className="text-green-100">
                  <strong>Guarantee:</strong> When you use VidLoad.cc, you're only interacting with our service.
                  No third-party cookies or tracking scripts are loaded.
                </p>
              </div>
            </div>
          </section>

          {/* Cookie Security */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-blue-400">8. Cookie Security</h2>
            <div className="space-y-4 text-gray-300">
              <p>Our cookies follow security best practices:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Secure Transmission:</strong> All cookies sent over HTTPS only</li>
                <li><strong>HttpOnly Flags:</strong> Server-side cookies protected from JavaScript access</li>
                <li><strong>SameSite Policy:</strong> Cookies restricted to same-site requests</li>
                <li><strong>Minimal Data:</strong> Cookies contain only necessary functional data</li>
                <li><strong>No Sensitive Information:</strong> No personal or sensitive data in cookies</li>
              </ul>
            </div>
          </section>

          {/* Updates to Cookie Policy */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-blue-400">9. Updates to This Policy</h2>
            <div className="space-y-4 text-gray-300">
              <p>
                We may update this Cookie Policy to reflect changes in our practices or legal requirements.
                Any updates will be posted on this page with a revised date.
              </p>
              <p>
                <strong>Our Commitment:</strong> Any future changes will maintain our minimal-cookie,
                privacy-first approach.
              </p>
            </div>
          </section>

          {/* Contact */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-blue-400">10. Questions About Cookies</h2>
            <div className="space-y-4 text-gray-300">
              <p>If you have questions about our cookie usage:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Review Our Code:</strong> All cookie usage is visible in our open-source code</li>
                <li><strong>Browser Developer Tools:</strong> Inspect cookies directly in your browser</li>
                <li><strong>GitHub Issues:</strong> Ask questions via our GitHub repository</li>
                <li><strong>Privacy Policy:</strong> Review our comprehensive <Link href="/privacy" className="text-blue-400 hover:text-blue-300">Privacy Policy</Link></li>
              </ul>

              <div className="bg-blue-900/20 border border-blue-700 rounded p-4 mt-4">
                <p className="text-blue-100">
                  <strong>Transparency:</strong> You can verify our cookie practices by inspecting the
                  source code or using browser developer tools to see exactly what cookies are set.
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
    </div>
  );
}
