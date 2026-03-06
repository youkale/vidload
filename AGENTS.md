# AGENTS.md - VidLoad.cc Development Guide

Essential information for AI coding agents working in this repository.

## Project Overview

VidLoad.cc is a privacy-first universal video player and analyzer built with Next.js 14, React 18, and TypeScript. Uses FFmpeg.wasm for client-side video processing and HLS.js for streaming. All processing happens in the browser - no server uploads.

## Build/Lint/Test Commands

```bash
npm run dev          # Start development server (http://localhost:3000)
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Run ESLint (uses eslint-config-next)
npx tsc --noEmit     # Type check without emitting files
```

**Note:** No test framework is currently configured. Tests should be added if implementing new features.

### Static Export
```bash
npm run build:static              # Build for static deployment
npm run deploy:cloudflare         # Deploy to Cloudflare Pages
npm run deploy:cloudflare:prod    # Deploy to production
```

## Code Style Guidelines

### TypeScript

- **Strict mode enabled** - All code must pass strict TypeScript checks
- **Use `import type`** for type-only imports:
  ```typescript
  import type { Metadata } from 'next';
  import { FC } from 'react';
  ```
- **Explicit return types** for exported functions
- **Interface over type** for object shapes
- **Avoid `any`** - use `unknown` or specific types
- **Nullish coalescing** (`??`) over logical OR (`||`) for fallbacks

### Imports Organization

Organize imports in this order:
1. React imports
2. Next.js imports
3. Third-party libraries
4. Local components (using `@/` alias)
5. Local utilities/libraries
6. Types (using `import type`)

Example:
```typescript
import { FC, useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Hls from 'hls.js';
import VideoPlayer from '@/components/VideoPlayer';
import { parseM3U8 } from '@/lib/hls/parser';
import type { HLSStreamInfo } from '@/lib/hls/parser';
```

### React Components

- **Functional components only** - No class components
- **Use `'use client'` directive** for client-side components
- **FC type annotation** for components:
  ```typescript
  interface ComponentProps {
    title: string;
    onClick?: () => void;
  }
  
  const Component: FC<ComponentProps> = ({ title, onClick }) => {
    // ...
  };
  ```
- **Default exports** for components
- **Named exports** for utilities and types
- **Use `memo`** for performance-critical components
- **Use `useCallback`** for functions passed as props

### Naming Conventions

- **PascalCase**: Components, types, interfaces, classes
- **camelCase**: Functions, variables, methods, props
- **SCREAMING_SNAKE_CASE**: Constants, environment variables
- **kebab-case**: File names for components (e.g., `video-player.tsx`)
- **Descriptive names**: Prefer clarity over brevity

Examples:
```typescript
// Components
const VideoPlayer: FC = () => {};
const CookieBanner: FC = () => {};

// Functions
const parseM3U8 = async (url: string): Promise<HLSStreamInfo> => {};
const formatRelativeTime = (timestamp: number): string => {};

// Constants
const CACHE_KEY = 'video-metadata-cache';
const CACHE_EXPIRY_DAYS = 7;
```

### Error Handling

- **Use try-catch** for async operations
- **Console.warn** for non-critical errors
- **Console.error** for critical errors
- **Graceful degradation** - don't crash the app
- **Null checks** with optional chaining (`?.`)
- **Type guards** for runtime validation

Example:
```typescript
try {
  const metadata = await getVideoMetadata(file);
  return metadata;
} catch (error) {
  console.error('Failed to get video metadata:', error);
  return null;
}

// Optional chaining
const duration = videoInfo?.duration;
```

### Formatting

- **2-space indentation**
- **Single quotes** for strings (double quotes for JSX attributes)
- **Semicolons** required
- **Trailing commas** in multi-line objects/arrays
- **Max line length**: ~100 characters
- **Blank line** before return statements

### Comments

- **JSDoc comments** for public functions and classes
- **Inline comments** for complex logic
- **TODO comments** for future work
- **Chinese comments are present** in the codebase - maintain consistency with existing files

### Tailwind CSS

- **Utility-first** approach
- **clsx** and **tailwind-merge** for conditional classes
- **Responsive prefixes**: `sm:`, `md:`, `lg:`, `xl:`

Example:
```typescript
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const className = twMerge(clsx(
  'base-class',
  isActive && 'active-class',
  size === 'large' && 'large-class'
));
```

## File Structure

```
vidload/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Home page
│   ├── layout.tsx         # Root layout
│   └── [route]/           # Route pages
├── components/            # Shared React components
│   ├── VideoPlayer.tsx    # Main video player
│   └── [Component].tsx    # Other components
├── lib/                   # Utility libraries
│   ├── ffmpeg/           # FFmpeg.wasm integration
│   ├── hls/              # HLS parsing logic
│   └── utils.ts          # Common utilities
└── public/               # Static assets
```

## Important Notes

1. **No test infrastructure** - Tests should be added if implementing new features
2. **Chinese comments** in codebase - maintain consistency
3. **Client-side only** - No server-side video processing
4. **Static export** supported for deployment
5. **Privacy-first** - Never add tracking or data collection features
6. **WebAssembly headers** - COOP/COEP headers required for FFmpeg
7. **Path alias** - Use `@/` for imports from project root

## Common Tasks

### Adding a New Component
1. Create file in `/components/` with PascalCase name
2. Use `'use client'` if client-side interactivity needed
3. Define Props interface
4. Use FC type annotation
5. Export as default
6. Import using `@/components/ComponentName`

### Adding a New Page
1. Create directory in `/app/` with route name
2. Add `page.tsx` file
3. Export default component
4. Add metadata export for SEO

### Adding a New Utility
1. Create file in `/lib/` directory
2. Export named functions
3. Add JSDoc comments
4. Include type definitions
5. Handle errors gracefully

## Key Dependencies

- **Next.js 14** - React framework with App Router
- **React 18** - UI library
- **TypeScript 5** - Type safety
- **Tailwind CSS 3** - Styling
- **FFmpeg.wasm** - Video processing
- **HLS.js** - HLS streaming
- **clsx** & **tailwind-merge** - Conditional classes
