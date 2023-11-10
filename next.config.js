/** @type {import('next').NextConfig} */

const nextConfig = {
  compiler: {
    styledComponents: {
      ssr: true,
    },
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
