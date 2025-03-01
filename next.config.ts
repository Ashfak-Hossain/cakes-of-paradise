import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    // nodeMiddleware: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's3-inventorymanagement.s3.us-east-2.amazonaws.com',
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
