import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    // Suppress hydration warnings for browser extension attributes
    suppressHydrationWarning: true,
  },
};

export default nextConfig;
