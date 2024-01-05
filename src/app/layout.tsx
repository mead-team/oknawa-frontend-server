'use client';

import BaseLayout from '@/components/layout/BaseLayout';
import BaseHead from '@/app/head';

import { Providers } from './providers';

import StyledComponentsRegistry from '@/styles/registry';
import '@/styles/globals.css';

import { pretendardFont } from '@/assets/fonts/pretendard/pretendard';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={pretendardFont.className}>
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
