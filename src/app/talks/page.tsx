import type { Metadata } from "next";
import { SectionPage } from "@/components/section-page";
import { talks } from "@/lib/content";

export const metadata: Metadata = {
  title: "talks",
};

export default function TalksPage() {
  return (
    <SectionPage
      title="Recent Talks"
      type="posts"
      items={talks}
    />
  );
}
