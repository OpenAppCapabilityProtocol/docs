import type { Metadata } from "next";
import { formatExcerpt } from "../docs";
import { envUrl } from "../env-url";
import { DEFAULT_SEO } from "./defaultSeo";

interface DefaultProps {
  pageTitle: string;
  body: any;
}

export const getSeo = (seo: any, data?: DefaultProps): Metadata => {
  const excerpt = data ? formatExcerpt(data.body, 140) : "";
  const canonical = envUrl(seo?.canonicalUrl);
  const description = seo?.description || excerpt || DEFAULT_SEO.description;

  const SEO = {
    title: seo?.title || `${data?.pageTitle} | Hark & OACP`,
    description,
    ...(canonical ? { alternates: { canonical } } : {}),
    openGraph: {
      title: seo?.title || `${data?.pageTitle} | Hark & OACP`,
      ...(canonical ? { url: canonical } : {}),
      description,
      images: [
        {
          ...DEFAULT_SEO.openGraph?.images?.[0],
          url: seo?.ogImage || envUrl(DEFAULT_SEO.openGraph?.images?.[0]?.url),
        },
      ],
    },
  };

  return {
    ...DEFAULT_SEO,
    ...SEO,
  };
};
