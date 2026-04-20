import { TransitionLink } from "@/components/transition-link";
import type { BlogPost } from "@/lib/cms-shared";

type BlogListProps = {
  emptyMessage?: string;
  limit?: number;
  posts: BlogPost[];
  title?: string;
};

export function BlogList({ emptyMessage, limit, posts, title }: BlogListProps) {
  const visiblePosts = typeof limit === "number" ? posts.slice(0, limit) : posts;

  if (!visiblePosts.length) {
    return <p className="section-empty">{emptyMessage ?? "No posts yet."}</p>;
  }

  return (
    <>
      {title ? <h2 className="home-latest-title">{title}</h2> : null}
      <div className="home-latest-list section-list">
        {visiblePosts.map((post) => (
          <BlogListItem key={post.slug} post={post} />
        ))}
      </div>
    </>
  );
}

function BlogListItem({ post }: { post: BlogPost }) {
  return (
    <article className="section-row">
      <div className="section-row-main">
        <TransitionLink className="post-link" href={`/blog/${post.slug}`}>
          <h2>{post.title}</h2>
        </TransitionLink>
        <p>{post.summary}</p>
      </div>
      <div className="section-row-date">{post.date}</div>
    </article>
  );
}
