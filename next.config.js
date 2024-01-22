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
    domains: ['t1.kakaocdn.net', 't1.daumcdn.net', 'postfiles.pstatic.net'],
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
