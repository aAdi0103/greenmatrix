import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Demo assets pulled from the existing WordPress site until real assets arrive.
    remotePatterns: [{ protocol: "https", hostname: "greenmatrix.co.in" }],
  },
};

export default nextConfig;
