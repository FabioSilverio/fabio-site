import type { Metadata } from "next";
import { SectionPage } from "@/components/section-page";
import { mediaItems } from "@/lib/content";
import { getSiteConfig } from "@/lib/cms";

export const metadata: Metadata = {
  title: "media",
};

export default async function MediaPage() {
  const siteConfig = await getSiteConfig();

  return (
    <SectionPage
      brandText={siteConfig.siteTitle}
      items={mediaItems}
      navItems={siteConfig.navLinks}
      title="Media"
      type="posts"
    />
  );
}
