/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

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
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' blob: https://cdn.jsdelivr.net; worker-src 'self' blob: https://cdn.jsdelivr.net; media-src 'self' blob: https: http:; connect-src 'self' https: http: blob: https://cdn.jsdelivr.net; img-src 'self' blob: data: https: http:; object-src 'none';"
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
