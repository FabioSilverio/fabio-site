"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  blogStorageKey,
  seedBlogPosts,
  slugifyTitle,
  sortPosts,
  type BlogPost,
} from "@/lib/blog";

type DraftInput = {
  content: string;
  date: string;
  slug?: string;
  summary: string;
  title: string;
};

type BlogStoreValue = {
  deletePost: (slug: string) => void;
  posts: BlogPost[];
  savePost: (input: DraftInput) => string;
};

const BlogStoreContext = createContext<BlogStoreValue | null>(null);

function parseStoredPosts(value: string | null) {
  if (!value) {
    return [];
  }

  try {
    const parsed = JSON.parse(value) as BlogPost[];

    return Array.isArray(parsed)
      ? parsed.filter(
          (post) =>
            typeof post.slug === "string" &&
            typeof post.title === "string" &&
            typeof post.date === "string" &&
            typeof post.summary === "string" &&
            Array.isArray(post.content),
        )
      : [];
  } catch {
    return [];
  }
}

export function BlogStoreProvider({ children }: { children: ReactNode }) {
  const [customPosts, setCustomPosts] = useState<BlogPost[]>(() =>
    typeof window === "undefined"
      ? []
      : parseStoredPosts(window.localStorage.getItem(blogStorageKey)),
  );

  useEffect(() => {
    window.localStorage.setItem(blogStorageKey, JSON.stringify(customPosts));
  }, [customPosts]);

  const posts = useMemo(
    () => sortPosts([...seedBlogPosts, ...customPosts]),
    [customPosts],
  );

  const value = useMemo<BlogStoreValue>(
    () => ({
      posts,
      savePost(input) {
        const slug = slugifyTitle(input.slug || input.title);
        const nextPost: BlogPost = {
          slug,
          title: input.title.toUpperCase(),
          date: input.date,
          summary: input.summary,
          content: input.content
            .split(/\n\s*\n/g)
            .map((paragraph) => paragraph.trim())
            .filter(Boolean),
        };

        setCustomPosts((current) => {
          const filtered = current.filter((post) => post.slug !== slug);

          return sortPosts([...filtered, nextPost]);
        });

        return slug;
      },
      deletePost(slug) {
        setCustomPosts((current) => current.filter((post) => post.slug !== slug));
      },
    }),
    [posts],
  );

  return (
    <BlogStoreContext.Provider value={value}>
      {children}
    </BlogStoreContext.Provider>
  );
}

export function useBlogStore() {
  const context = useContext(BlogStoreContext);

  if (!context) {
    throw new Error("useBlogStore must be used within BlogStoreProvider");
  }

  return context;
}
