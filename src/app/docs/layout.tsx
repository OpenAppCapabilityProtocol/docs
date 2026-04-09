import { TinaClient } from "@/app/tina-client";
import { TabsLayout } from "@/components/docs/layout/tab-layout";
import client from "@/tina/__generated__/client";
import type React from "react";

export default async function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navigationData = await client.queries.minimisedNavigationBarFetch({
    relativePath: "docs-navigation-bar.json",
  });

  return (
    <div className="relative flex flex-col w-full pb-2">
      <TinaClient
        props={{
          children,
          query: navigationData.query,
          variables: navigationData.variables,
          data: navigationData.data,
        }}
        Component={TabsLayout}
      />
    </div>
  );
}
