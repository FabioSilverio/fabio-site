import type { Metadata } from "next";
import { SectionPage } from "@/components/section-page";
import { mediaItems } from "@/lib/content";

export const metadata: Metadata = {
  title: "media",
};

export default function MediaPage() {
  return (
    <SectionPage
      title="Media"
      type="posts"
      items={mediaItems}
    />
  );
}
