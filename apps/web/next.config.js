/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  
  // Bundle analyzer configuration
  ...(process.env.ANALYZE === 'true' && {
    webpack: (config, { isServer }) => {
      if (!isServer) {
        const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
        config.plugins.push(
          new BundleAnalyzerPlugin({
            analyzerMode: process.env.BUNDLE_ANALYZE === 'server' ? 'server' : 'static',
            openAnalyzer: true,
            reportFilename: `../.next/bundle-analyzer-${isServer ? 'server' : 'client'}.html`,
          })
        );
      }
      return config;
    },
  }),

  // Experimental features
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },

  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Headers for security
  async headers() {
    // Use the same logic as getApiUrl() to determine API URL
    const isProduction = process.env.NODE_ENV === 'production';
    
    // Priority order: explicit API URL > default API URL > fallback for production
    let apiUrl = process.env.NEXT_PUBLIC_API_URL 
      || process.env.NEXT_PUBLIC_DEFAULT_API_URL;
    
    // Smart fallback for production: use Railway backend URL if available
    // This ensures CSP includes the backend URL even if NEXT_PUBLIC_API_URL wasn't set at build time
    if (!apiUrl && isProduction) {
      apiUrl = 'https://modelebackend-production-0590.up.railway.app';
    }
    
    // Default to localhost for development if nothing is set
    if (!apiUrl) {
      apiUrl = 'http://localhost:8000';
    }
    
    apiUrl = apiUrl.trim();
    
    // If URL doesn't start with http:// or https://, add https://
    if (!apiUrl.startsWith('http://') && !apiUrl.startsWith('https://')) {
      apiUrl = `https://${apiUrl}`;
    }
    
    // Remove trailing slash
    apiUrl = apiUrl.replace(/\/$/, '');
    
    // Content Security Policy
    // ⚠️ SECURITY NOTE: CSP is relaxed in development (unsafe-inline/unsafe-eval)
    // This is acceptable for dev but should be tightened in production using nonces
    // See: https://nextjs.org/docs/advanced-features/security-headers
    // Include both localhost (for dev) and the configured API URL in connect-src
    // Also include production backend URL as fallback for CSP
    const productionBackendUrl = 'https://modelebackend-production-0590.up.railway.app';
    const connectSrcUrls = isProduction 
      ? [`'self'`, apiUrl, productionBackendUrl, 'https://*.sentry.io', 'wss://*.sentry.io']
      : [`'self'`, apiUrl, 'http://localhost:8000', productionBackendUrl, 'https://*.sentry.io', 'wss://*.sentry.io'];
    
    const cspDirectives = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-eval' 'unsafe-inline'", // Required for Next.js dev mode
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com", // Required for Tailwind CSS
      "font-src 'self' https://fonts.gstatic.com data:",
      "img-src 'self' data: https: blob:",
      "connect-src " + connectSrcUrls.join(' '),
      "frame-src 'none'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      ...(isProduction ? ["upgrade-insecure-requests"] : []),
    ].filter(Boolean).join('; ');

    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Content-Security-Policy',
            value: cspDirectives,
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'Strict-Transport-Security',
            value: isProduction ? 'max-age=31536000; includeSubDomains; preload' : '',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
