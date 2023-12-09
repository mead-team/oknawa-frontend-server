/** @type {import('next').NextConfig} */

const withPlugins = require('next-compose-plugins');
const withPWA = require('next-pwa');

const nextConfig = {
  compiler: {
    styledComponents: {
      ssr: true,
    },
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  rewrites: () => [
    {
      source: '/location/point',
      destination: `${process.env.NEXT_PUBLIC_API_URL}/location/point`,
    },
    {
      source: '/location/point/place/food',
      destination: `${process.env.NEXT_PUBLIC_API_URL}/location/point/place/food`,
    },
    {
      source: '/location/point/place/cafe',
      destination: `${process.env.NEXT_PUBLIC_API_URL}/location/point/place/cafe`,
    },
    {
      source: '/location/point/place/drink',
      destination: `${process.env.NEXT_PUBLIC_API_URL}/location/point/place/drink`,
    },
  ],
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
