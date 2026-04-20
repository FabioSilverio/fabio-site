import { BlogPostClient } from "@/components/blog-post-client";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return <BlogPostClient slug={slug} />;
}
