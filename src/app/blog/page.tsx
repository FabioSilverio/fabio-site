import type { Metadata } from "next";
import { BlogList } from "@/components/blog-list";
import { InnerHeader } from "@/components/inner-header";
import { getPosts, getSiteConfig } from "@/lib/cms";

export const metadata: Metadata = {
  title: "blog",
};

export default async function BlogPage() {
  const [posts, siteConfig] = await Promise.all([getPosts(), getSiteConfig()]);

  return (
    <div className="section-page">
      <InnerHeader brandText={siteConfig.siteTitle} navItems={siteConfig.navLinks} />

      <div className="section-page-inner">
        <h1 className="section-title">Latest Posts</h1>
        <BlogList posts={posts} />
      </div>
    </div>
  );
}
