/** @type {import('next').NextConfig} */

const withPlugins = require('next-compose-plugins');
const withPWA = require('next-pwa');

const nextConfig = {
  compiler: {
    styledComponents: {
      ssr: true,
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 't1.kakaocdn.net',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 't1.daumcdn.net',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'postfiles.pstatic.net',
        pathname: '/**',
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = withPlugins(
  [
    [
      withPWA,
      {
        pwa: {
          dest: 'public',
        },
      },
    ],
    // 추가 플러그인 작성
  ],
  nextConfig,
);
