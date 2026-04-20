import type { Metadata } from "next";
import { BlogList } from "@/components/blog-list";
import { InnerHeader } from "@/components/inner-header";

export const metadata: Metadata = {
  title: "blog",
};

export default function BlogPage() {
  return (
    <div className="section-page">
      <InnerHeader />

      <div className="section-page-inner">
        <h1 className="section-title">Latest Posts</h1>
        <BlogList />
      </div>
    </div>
  );
}
