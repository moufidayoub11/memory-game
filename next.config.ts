import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // disable eslint
  eslint: {
    ignoreDuringBuilds: true,
  }
};

export default nextConfig;
