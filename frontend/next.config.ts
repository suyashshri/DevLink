import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true, // Only needed if you disable Image Optimization
  },
  // No other configurations by default
};

export default nextConfig;
