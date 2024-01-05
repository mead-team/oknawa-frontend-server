'use client';

import BaseLayout from '@/components/layout/BaseLayout';
import BaseHead from '@/app/head';

import { Providers } from './providers';

import StyledComponentsRegistry from '@/styles/registry';
import '@/styles/globals.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ok, Nawa!',
  description: '만나기 편한 중간 장소와 핫플레이스를 추천해드려요!',
  keywords:
    'oknawa, 오케이나와, 오키나와, 약속 장소 추천, 핫플레이스, 중간 장소 추천, ok nawa, oknawa.com',
  openGraph: {
    url: 'https://oknawa.com',
    title: 'Ok, Nawa!',
    description: '만나기 편한 중간 장소와 핫플레이스를 추천해드려요!',
    images: [
      {
        url: 'https://oknawa.com/icons/icon-192x192.png',
        width: 129,
        height: 129,
        alt: 'Ok, Nawa!',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <BaseHead />
      <body>
        <Providers>
          <StyledComponentsRegistry>
            <BaseLayout>{children}</BaseLayout>
          </StyledComponentsRegistry>
        </Providers>
      </body>
    </html>
  );
}
