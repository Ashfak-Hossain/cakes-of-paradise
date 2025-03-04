import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    // nodeMiddleware: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.AWS_CLOUDFRONT_DISTRIBUTION_DOMAIN,
      },
    ],
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

export default nextConfig;
