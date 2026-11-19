import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/projects/vehicle-detection",
        destination: "/projects/cartally",
        permanent: true,
      },
      {
        source: "/image/vehicle-detection/:file",
        destination: "/image/cartally/:file",
        permanent: true,
      },
    ];
  },
  images: {
    qualities: [75, 90, 100],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
      },
    ],
  },
};

export default nextConfig;
