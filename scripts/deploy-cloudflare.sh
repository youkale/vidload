#!/bin/bash

# VidLoad.cc Cloudflare Pages Deployment Script

set -e

echo "☁️  Starting deployment to Cloudflare Pages..."

# Check if Wrangler CLI is installed
if ! command -v wrangler &> /dev/null; then
    echo "❌ Wrangler CLI not installed, installing..."
    npm install -g wrangler
fi

# Check if logged into Cloudflare
echo "🔐 Checking Cloudflare login status..."
if ! wrangler whoami &> /dev/null; then
    echo "⚠️  Please login to Cloudflare first:"
    wrangler login
fi

# Set static export environment variable
export EXPORT_STATIC=true

# Build project (static export)
echo "🏗️  Building project (static export)..."
npm ci
npm run lint

# Build application with static export mode
echo "📦 Building application (static export mode)..."
EXPORT_STATIC=true npm run build

# Check if out directory exists
if [ ! -d "out" ]; then
    echo "❌ Build output directory 'out' does not exist"
    exit 1
fi

# Deploy to Cloudflare Pages
echo "🚀 Deploying to Cloudflare Pages..."
if [ "$1" = "production" ]; then
    echo "📦 Deploying to production environment..."
    wrangler pages deploy out --project-name=vidload
else
    echo "🧪 Deploying to preview environment..."
    wrangler pages deploy out --project-name=vidload
fi

echo "✅ Deployment completed!"
echo "🎉 VidLoad.cc has been successfully deployed to Cloudflare Pages!"
echo "🌐 Access URL: https://vidload.pages.dev"
echo ""
echo "🔍 To test SharedArrayBuffer support:"
echo "   1. Visit: https://vidload.pages.dev/test-headers.html"
echo "   2. Check browser console for test results"
echo "   3. All three checks should show ✅ for multi-threading to work"
echo ""
echo "📋 If SharedArrayBuffer is not available:"
echo "   - Headers may take a few minutes to propagate"
echo "   - Clear browser cache and try again"
echo "   - Check domain settings in Cloudflare dashboard"
