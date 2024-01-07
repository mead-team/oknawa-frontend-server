'use client';

import BaseLayout from '@/components/layout/BaseLayout';
import BaseHead from '@/app/head';

import { Providers } from './providers';

import StyledComponentsRegistry from '@/styles/registry';
import '@/styles/globals.css';
import PWAIntallGuidance from '@/components/PWAInstallGuidance/PWAIntallGuidance';

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
            <PWAIntallGuidance />
          </StyledComponentsRegistry>
        </Providers>
      </body>
    </html>
  );
}
