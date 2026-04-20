import type { Metadata } from "next";
import { SectionPage } from "@/components/section-page";
import { projects } from "@/lib/content";
import { getSiteConfig } from "@/lib/cms";

export const metadata: Metadata = {
  title: "projects",
};

export default async function ProjectsPage() {
  const siteConfig = await getSiteConfig();

  return (
    <SectionPage
      brandText={siteConfig.siteTitle}
      items={projects}
      navItems={siteConfig.navLinks}
      title="Projects"
      type="posts"
    />
  );
}
