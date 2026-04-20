import type { Metadata } from "next";
import { SectionPage } from "@/components/section-page";
import { blogPosts } from "@/lib/content";

export const metadata: Metadata = {
  title: "blog",
};

export default function BlogPage() {
  return (
    <SectionPage
      title="Latest Posts"
      type="posts"
      items={blogPosts}
    />
  );
}
