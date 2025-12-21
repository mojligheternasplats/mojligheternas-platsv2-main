import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        pathname: '/**',
      },
      
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
      // ⭐ Added: your API domain for images
      {
        protocol: 'https',
        hostname: 'api.mplats.se',
        pathname: '/**',
      },
      // Optional: local dev images
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8080', // backend dev port
        pathname: '/uploads/**',
      },
    ],
  },
};

export default nextConfig;
