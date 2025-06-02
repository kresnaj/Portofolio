/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      // Add domains for external images here
      'your-domain.com',
      'example.com'
    ],
    formats: ['image/webp', 'image/avif'],
  },
  // Enable webpack 5 features
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };
    return config;
  },
  // Environment variables
  env: {
    CUSTOM_KEY: 'custom-value',
  },
  // Headers for security
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
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
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;