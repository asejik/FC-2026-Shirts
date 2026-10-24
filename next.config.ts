import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/ogbomosho',
        destination: 'https://fc-ogbomosho.vercel.app/',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
