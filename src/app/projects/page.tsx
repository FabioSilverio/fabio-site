import type { Metadata } from "next";
import { SectionPage } from "@/components/section-page";
import { projects } from "@/lib/content";

export const metadata: Metadata = {
  title: "projects",
};

export default function ProjectsPage() {
  return (
    <SectionPage
      title="Projects"
      type="posts"
      items={projects}
    />
  );
}
