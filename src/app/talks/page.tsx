import type { Metadata } from "next";
import { SectionPage } from "@/components/section-page";
import { talks } from "@/lib/content";
import { getSiteConfig } from "@/lib/cms";

export const metadata: Metadata = {
  title: "talks",
};

export default async function TalksPage() {
  const siteConfig = await getSiteConfig();

  return (
    <SectionPage
      brandText={siteConfig.siteTitle}
      items={talks}
      navItems={siteConfig.navLinks}
      title="Recent Talks"
      type="posts"
    />
  );
}
