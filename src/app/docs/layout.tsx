import { TabsLayout } from "@/components/docs/layout/tab-layout";
import navigationBar from "@/content/navigation-bar/docs-navigation-bar.json";
import type React from "react";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TabsLayout props={{ children }} tinaProps={{ data: { navigationBar } }} />
  );
}
