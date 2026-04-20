import { notFound } from "next/navigation";
import { InnerHeader } from "@/components/inner-header";
import { TransitionLink } from "@/components/transition-link";
import { getPostBySlug, getSiteConfig } from "@/lib/cms";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [post, siteConfig] = await Promise.all([
    getPostBySlug(slug),
    getSiteConfig(),
  ]);

  if (!post) {
    notFound();
  }

  return (
    <div className="section-page">
      <InnerHeader brandText={siteConfig.siteTitle} navItems={siteConfig.navLinks} />

      <div className="post-page-inner">
        <TransitionLink className="back-link" href="/blog">
          {"< ALL POSTS"}
        </TransitionLink>

        <header className="post-header">
          <h1 className="post-title">{post.title}</h1>
          <div className="post-date">{post.date}</div>
          <p className="post-summary">{post.summary}</p>
        </header>

        <article className="post-body">
          {post.content.map((paragraph) => (
            <p key={paragraph.slice(0, 32)}>{paragraph}</p>
          ))}
        </article>
      </div>
    </div>
  );
}
