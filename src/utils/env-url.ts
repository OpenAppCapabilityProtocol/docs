import settings from "@/content/settings/config.json";
const isDev = process.env.NODE_ENV === "development";
const localSiteUrl = "http://localhost:3000";
const rawConfiguredSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || settings.siteUrl || "";

export const siteUrl = rawConfiguredSiteUrl.includes(
  "github.com/OpenAppCapabilityProtocol"
)
  ? ""
  : rawConfiguredSiteUrl;

export const envUrl = (url: string | URL | null | undefined) => {
  if (!url) return "";

  const value = url.toString();

  if (isDev) {
    if (value.startsWith("http")) {
      return siteUrl ? value.replace(siteUrl, localSiteUrl) : value;
    }
    return `${localSiteUrl}${value}`;
  }

  if (value.startsWith("http")) {
    return value;
  }

  return siteUrl ? `${siteUrl}${value}` : "";
};
