import "@/styles/global.css";
import AdminLink from "@/components/ui/admin-link";
import { TailwindIndicator } from "@/components/ui/tailwind-indicator";
import { ThemeSelector } from "@/components/ui/theme-selector";
import settings from "@/content/settings/config.json";
import { GoogleTagManager } from "@next/third-parties/google";
import { ThemeProvider } from "next-themes";
import { Inter, Roboto_Flex } from "next/font/google";

import type React from "react";

const isDev = process.env.NODE_ENV === "development";

const body = Inter({ subsets: ["latin"], variable: "--body-font" });
const heading = Roboto_Flex({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal"],
  variable: "--heading-font",
});

const isThemeSelectorEnabled =
  isDev || process.env.NEXT_PUBLIC_ENABLE_THEME_SELECTION === "true";

const theme = settings.selectedTheme || "pine";
const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

export default function RootLayout({
  children = null,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`theme-${theme}`} suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#30a46c" />
        <link rel="alternate" type="application/rss+xml" href="/rss.xml" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </head>
      <body className={`${body.variable} ${heading.variable}`}>
        {!isDev && gtmId && (
          <GoogleTagManager
            gtmId={gtmId}
            gtmScriptUrl="https://www.googletagmanager.com/gtm.js"
          />
        )}
        <ThemeProvider
          attribute="class"
          defaultTheme={theme}
          enableSystem={true}
          disableTransitionOnChange={false}
        >
          {isThemeSelectorEnabled && <ThemeSelector />}
          <AdminLink />
          <TailwindIndicator />
          <div className="font-sans flex min-h-screen flex-col bg-background-color">
            <div className="flex flex-1 flex-col items-center w-full">
              {children}
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
