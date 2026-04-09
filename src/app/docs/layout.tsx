import { TabsLayout } from "@/components/docs/layout/tab-layout";
import navigationBar from "@/content/navigation-bar/docs-navigation-bar.json";
import { enrichNavigationBar } from "@/utils/docs/navigation/server-navigation";
import type React from "react";

export default async function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const enrichedNavigationBar = await enrichNavigationBar(navigationBar);

  return (
    <TabsLayout
      props={{ children }}
      tinaProps={{ data: { navigationBar: enrichedNavigationBar } }}
    />
  );
}
