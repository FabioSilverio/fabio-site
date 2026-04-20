"use client";

import { useMemo } from "react";
import { InnerHeader } from "@/components/inner-header";
import { TransitionLink } from "@/components/transition-link";
import { useBlogStore } from "@/components/blog-store-provider";

export function BlogPostClient({ slug }: { slug: string }) {
  const { posts } = useBlogStore();

  const post = useMemo(
    () => posts.find((entry) => entry.slug === slug),
    [posts, slug],
  );

  return (
    <div className="section-page">
      <InnerHeader />

      <div className="post-page-inner">
        {post ? (
          <>
            <TransitionLink className="back-link" href="/blog">
              ← ALL POSTS
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
          </>
        ) : (
          <div className="post-missing">
            <h1 className="post-title">POST NOT FOUND</h1>
            <p className="post-summary">
              This slug does not exist in the seeded posts or your local admin
              store.
            </p>
            <TransitionLink className="back-link" href="/blog">
              ← back to blog
            </TransitionLink>
          </div>
        )}
      </div>
    </div>
  );
}
