#!/bin/bash

# VidLoad.cc Cloudflare Pages 部署脚本

set -e

echo "☁️  开始部署到 Cloudflare Pages..."

# 检查Wrangler CLI是否安装
if ! command -v wrangler &> /dev/null; then
    echo "❌ Wrangler CLI 未安装，正在安装..."
    npm install -g wrangler
fi

# 检查是否已登录Cloudflare
echo "🔐 检查Cloudflare登录状态..."
if ! wrangler whoami &> /dev/null; then
    echo "⚠️  请先登录Cloudflare:"
    wrangler login
fi

# 设置静态导出环境变量
export EXPORT_STATIC=true

# 构建项目（静态导出）
echo "🏗️  构建项目（静态导出）..."
npm ci
npm run lint
npm run build
npm run export

# 检查out目录是否存在
if [ ! -d "out" ]; then
    echo "❌ 构建输出目录 'out' 不存在"
    exit 1
fi

# 部署到Cloudflare Pages
echo "🚀 部署到Cloudflare Pages..."
if [ "$1" = "production" ]; then
    echo "📦 部署到生产环境..."
    wrangler pages deploy out --project-name=vidload --compatibility-date=2024-01-01
else
    echo "🧪 部署到预览环境..."
    wrangler pages deploy out --project-name=vidload --compatibility-date=2024-01-01
fi

echo "✅ 部署完成！"
echo "🎉 VidLoad.cc 已成功部署到 Cloudflare Pages！"
echo "🌐 访问地址: https://vidload.pages.dev"
