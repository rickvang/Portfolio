import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/notes/taskosaur-workspace-and-docs",
        destination: "/notes/workspace-and-docs",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
