import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/warehouse",
        destination: "/our-warehouse",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
