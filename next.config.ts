import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      }
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  api: {
    bodyParser: false,
    responseLimit: '10mb',
  }
};

export default nextConfig;
