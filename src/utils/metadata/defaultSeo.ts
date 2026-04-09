import type { Metadata } from "next";

import settings from "@/content/settings/config.json";
import { siteUrl } from "../env-url";

export const DEFAULT_SEO: Metadata = {
  ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
  title: {
    default: settings.title,
    template: "%s",
  },
  generator: "Next.js",
  applicationName: settings.applicationName,
  publisher: settings.publisher,
  description: settings.description,
  openGraph: {
    type: "website",
    locale: "en_AU",
    ...(siteUrl ? { url: siteUrl } : {}),
    title: settings.title,
    description: settings.description,
    siteName: settings.title,
    images: [
      {
        url: settings.defaultOGImage,
        width: 1200,
        height: 630,
        alt: "Hark & OACP Docs",
      },
    ],
  },
  twitter: {
    site: settings.social.twitter,
    card: "summary_large_image",
  },
  keywords: settings.keywords,
};
