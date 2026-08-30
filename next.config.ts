import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/dashboard/onboarding',
        destination: '/dashboard',
        permanent: true,
      },
      {
        source: '/dashboard/scope',
        destination: '/dashboard/projects',
        permanent: true,
      },
      {
        source: '/dashboard/support',
        destination: '/dashboard/settings',
        permanent: true,
      },
    ];
  },
  productionBrowserSourceMaps: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
