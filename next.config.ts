import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  output: 'standalone',
  poweredByHeader: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "d2lptvt2jijg6f.cloudfront.net",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i3.ytimg.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.youtube.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "d3vvmt2ub6odwk.cloudfront.net",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "d2lptvt2jijg6f.cloudfront.net",//foundation need to remove
        pathname: "/**",
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "img-src 'self' blob: data: https://d2lptvt2jijg6f.cloudfront.net https://picsum.photos https://i3.ytimg.com https://d3vvmt2ub6odwk.cloudfront.net https://www.googletagmanager.com",
              "font-src 'self' https://fonts.gstatic.com data:",
              "connect-src 'self' https://api.jindalsteelpower.com https://www.googletagmanager.com https://www.google-analytics.com",
              "frame-src 'self' https://www.youtube.com https://www.googletagmanager.com",
              "media-src 'self' blob: data: https://d2lptvt2jijg6f.cloudfront.net https://d3vvmt2ub6odwk.cloudfront.net",
              "frame-ancestors 'self'",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self' https://api.jindalsteelpower.com",
              "worker-src 'self' blob:",
              "upgrade-insecure-requests",
            ].join('; '),
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=()',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
