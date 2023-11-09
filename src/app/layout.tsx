"use client";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { ThemeProvider } from "styled-components";

import { Providers } from "./providers";
import "./globals.css";
import Header from "./Header";
import BaseLayout from "./BaseLayout";
import StyledComponentsRegistry from "./registry";

const BaseTheme = {
  // ... 테마 정의
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <html lang="en">
      <Header />
      <body>
        <StyledComponentsRegistry>
          <ThemeProvider theme={BaseTheme}>
            <QueryClientProvider client={queryClient}>
              <Providers>
                <BaseLayout>{children}</BaseLayout>
              </Providers>
            </QueryClientProvider>
          </ThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
