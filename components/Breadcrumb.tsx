import React from 'react';
import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center space-x-2 text-sm text-gray-400">
        <li>
          <Link href="/" className="hover:text-blue-400 transition-colors">
            <svg className="w-4 h-4 inline mr-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
            </svg>
            Home
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            <svg className="w-4 h-4 mx-2 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 5l7 7-7 7" />
            </svg>
            {item.href && index < items.length - 1 ? (
              <Link href={item.href} className="hover:text-blue-400 transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="text-white font-medium">{item.label}</span>
            )}
          </li>
        ))}
      </ol>

      {/* Structured data for breadcrumbs */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://vidload.cc"
              },
              ...items.map((item, index) => ({
                "@type": "ListItem",
                "position": index + 2,
                "name": item.label,
                "item": item.href ? `https://vidload.cc${item.href}` : undefined
              }))
            ]
          })
        }}
      />
    </nav>
  );
}
