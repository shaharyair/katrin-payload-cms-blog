import type { Metadata } from "next";

import React from "react";

import { AdminBar } from "@/components/AdminBar";
import { Footer } from "@/Footer/Component";
import { Header } from "@/Header/Component";
import { Providers } from "@/providers";
import { InitTheme } from "@/providers/Theme/InitTheme";
import { getServerSideURL } from "@/utilities/getURL";
import { mergeOpenGraph } from "@/utilities/mergeOpenGraph";
import { GoogleAnalytics } from "@next/third-parties/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Open_Sans } from "next/font/google";
import { Userway } from "../../components/common/userway";
import "./globals.css";

const openSans = Open_Sans({ subsets: ["hebrew"], display: "swap" });

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const { isEnabled } = await draftMode();

  return (
    <html
      className={openSans.className}
      lang="he"
      dir="rtl"
      suppressHydrationWarning
    >
      <head>
        <InitTheme />
        {/* <link href="/favicon.ico" rel="icon" sizes="32x32" /> */}
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body>
        <Providers>
          <SpeedInsights />
          <AdminBar
            adminBarProps={
              {
                // preview: isEnabled,
              }
            }
          />

          <Header />
          {children}
          <Footer />
        </Providers>
        <Userway />
        <GoogleAnalytics gaId="G-YRP46P1X8Q" />
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
};
