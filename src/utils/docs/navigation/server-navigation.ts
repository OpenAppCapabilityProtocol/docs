import fs from "node:fs/promises";
import path from "node:path";

type NavigationItem = {
  title?: string;
  slug?: string;
  items?: NavigationItem[];
  [key: string]: unknown;
};

type NavigationGroup = {
  title?: string;
  items?: NavigationItem[];
  [key: string]: unknown;
};

type NavigationBarConfig = {
  navigationBar: {
    tabs?: Array<{
      supermenuGroup?: NavigationGroup[];
      [key: string]: unknown;
    }>;
    [key: string]: unknown;
  };
};

const CONTENT_ROOT = path.join(process.cwd(), "content");

const getTitleFromFrontmatter = async (contentPath: string) => {
  try {
    const fileContents = await fs.readFile(contentPath, "utf8");
    const match = fileContents.match(
      /^---\s*\n[\s\S]*?\ntitle:\s*(.+?)\s*\n[\s\S]*?\n---/m
    );
    return match?.[1]?.trim().replace(/^['"]|['"]$/g, "") ?? "";
  } catch {
    return "";
  }
};

const enrichNavigationItems = async (items: NavigationItem[]) => {
  return Promise.all(
    items.map(async (item) => {
      const enrichedItem: NavigationItem = { ...item };

      if (!enrichedItem.title && typeof enrichedItem.slug === "string") {
        const contentPath = path.join(
          CONTENT_ROOT,
          enrichedItem.slug.replace(/^content\//, "")
        );
        enrichedItem.title = await getTitleFromFrontmatter(contentPath);
      }

      if (Array.isArray(enrichedItem.items) && enrichedItem.items.length > 0) {
        enrichedItem.items = await enrichNavigationItems(enrichedItem.items);
      }

      return enrichedItem;
    })
  );
};

export const enrichNavigationBar = async (
  navigationBar: NavigationBarConfig["navigationBar"]
) => {
  const tabs = await Promise.all(
    (navigationBar.tabs ?? []).map(async (tab) => ({
      ...tab,
      supermenuGroup: await Promise.all(
        (tab.supermenuGroup ?? []).map(async (group) => ({
          ...group,
          items: await enrichNavigationItems(group.items ?? []),
        }))
      ),
    }))
  );

  return {
    ...navigationBar,
    tabs,
  };
};
