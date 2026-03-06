/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compress: true,

  // 静态导出配置
  output: process.env.EXPORT_STATIC === 'true' ? 'export' : undefined,
  trailingSlash: true,
  images: {
    unoptimized: process.env.EXPORT_STATIC === 'true',
    formats: ['image/avif', 'image/webp'],
  },

  // 实验性功能
  experimental: {
    // 优化包导入
    optimizePackageImports: ['@heroicons/react', 'hls.js'],
  },

  // 配置跨域资源
  async headers() {
    return [
      {
        // 所有静态资源都需要CORP头部
        source: '/(.*)\\.(js|wasm|css|png|jpg|jpeg|gif|ico|svg)',
        headers: [
          {
            key: 'Cross-Origin-Resource-Policy',
            value: 'same-origin'
          }
        ]
      },


      {
        // API路由 - 需要支持外部资源访问
        source: '/api/:path*',
        headers: [
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin'
          },
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'credentialless'
          },
          {
            key: 'Access-Control-Allow-Origin',
            value: '*'
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS'
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization, Range'
          }
        ]
      },
      {
        // 所有HTML页面的安全头部 - 支持SharedArrayBuffer但允许外部资源
        source: '/:path*',
        headers: [
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin'
          },
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'credentialless'
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' blob: https://cdn.jsdelivr.net https://www.googletagmanager.com https://pagead2.googlesyndication.com https://www.clarity.ms; worker-src 'self' blob: https://cdn.jsdelivr.net; media-src 'self' blob: https: http:; connect-src 'self' https: http: blob: https://cdn.jsdelivr.net https://www.google-analytics.com; img-src 'self' blob: data: https: http:; object-src 'none';"
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          }
        ]
      }
    ];
  },

  // 合并的 webpack 配置
  webpack: (config, { isServer }) => {
    // HLS.js 和其他客户端特定配置
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        net: false,
        tls: false,
        crypto: false,
        path: false,
      };
      
      // 优化代码分割
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          default: false,
          vendors: false,
          // 将 React 相关库打包在一起
          react: {
            name: 'react',
            chunks: 'all',
            test: /[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/,
            priority: 20,
          },
          // 将 FFmpeg 单独打包
          ffmpeg: {
            name: 'ffmpeg',
            chunks: 'all',
            test: /[\\/]node_modules[\\/]@ffmpeg[\\/]/,
            priority: 20,
          },
          // 将 HLS.js 单独打包
          hls: {
            name: 'hls',
            chunks: 'all',
            test: /[\\/]node_modules[\\/]hls\.js[\\/]/,
            priority: 20,
          },
          // 其他第三方库
          vendor: {
            name: 'vendor',
            chunks: 'all',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
          },
        },
      };
    }

    // 支持 WebAssembly
    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true,
    };

    // 配置 WASM 文件加载
    config.module.rules.push({
      test: /\.wasm$/,
      type: 'javascript/auto',
      loader: 'file-loader',
      options: {
        name: 'static/wasm/[name].[hash].[ext]',
        publicPath: '/_next/',
      },
    });

    return config;
  },
};

module.exports = nextConfig;
