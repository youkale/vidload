# Favicon Generation Guide

This document explains how to generate the various favicon formats from the base SVG icon.

## Base Files Created
- `icon.svg` - Base SVG icon (32x32)
- `logo.svg` - Full logo with text (120x40)
- `safari-pinned-tab.svg` - Safari pinned tab icon
- `site.webmanifest` - PWA manifest file

## Required Favicon Files (to be generated)

### PNG Icons
To generate PNG favicons from the SVG, you can use online tools or ImageMagick:

```bash
# Using ImageMagick (if installed)
convert icon.svg -resize 16x16 favicon-16x16.png
convert icon.svg -resize 32x32 favicon-32x32.png
convert icon.svg -resize 180x180 apple-touch-icon.png
convert icon.svg -resize 192x192 android-chrome-192x192.png
convert icon.svg -resize 512x512 android-chrome-512x512.png
```

### Online Tools
You can also use online favicon generators:
1. [RealFaviconGenerator](https://realfavicongenerator.net/)
2. [Favicon.io](https://favicon.io/)
3. [Favicon Generator](https://www.favicon-generator.org/)

### Required Files List
- `favicon-16x16.png` (16x16)
- `favicon-32x32.png` (32x32)
- `apple-touch-icon.png` (180x180)
- `android-chrome-192x192.png` (192x192)
- `android-chrome-512x512.png` (512x512)
- `favicon.ico` (multi-size ICO file)

### Social Media Images
For better social media sharing:
- `og-image.png` (1200x630) - Open Graph image
- `screenshot-desktop.png` (1280x720) - Desktop screenshot
- `screenshot-mobile.png` (390x844) - Mobile screenshot

## Design Elements

### Logo Design
- **Colors**: Blue to purple gradient (#3B82F6 → #8B5CF6 → #EC4899)
- **Elements**:
  - Simple play triangle (video player symbol)
  - Glassmorphism inner container (semi-transparent white overlay)
  - Clean, minimalist design
  - Rounded corners for modern appearance
- **Typography**: Inter font family
- **Style**: Modern, clean, professional with glassmorphism effects

### Brand Identity
- **Primary Color**: Blue (#3B82F6)
- **Secondary Color**: Purple (#8B5CF6)
- **Accent Color**: Pink (#EC4899)
- **Background**: Dark theme (#111827)
- **Text**: High contrast white/gray

## Usage in Code

The favicon configuration is set in `app/layout.tsx`:

```typescript
icons: {
  icon: [
    { url: '/icon.svg', type: 'image/svg+xml' },
    { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
  ],
  apple: [
    { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
  ],
  other: [
    { rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#3b82f6' },
  ],
},
```

## Testing

Test the favicon implementation:
1. Check browser tab icon
2. Test bookmark icon
3. Verify PWA install icon
4. Check social media sharing images
5. Test on different devices and browsers
