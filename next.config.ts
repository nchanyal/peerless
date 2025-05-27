import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/dashboard/available",
        permanent: false,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "281jyfszrx.ufs.sh",
        pathname: "/f/*",
      },
    ],
  },
};

export default nextConfig;
