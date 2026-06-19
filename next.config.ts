import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },

  devIndicators: false,
  images: {
    remotePatterns: [
      {
        hostname: 'files.edgestore.dev',
      }
    ]
  }

};

export default nextConfig;
