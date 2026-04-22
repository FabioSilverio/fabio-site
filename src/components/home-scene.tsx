"use client";

import type { CSSProperties } from "react";
import { useEffect, useMemo, useState } from "react";
import { BlogList } from "@/components/blog-list";
import { BrandMark } from "@/components/brand-mark";
import { MainNav } from "@/components/main-nav";
import type {
  BlogPost,
  HomePreviewSection,
  NavItem,
} from "@/lib/cms-shared";

type HomeSceneProps = {
  brandText: string;
  homePreviewSections: HomePreviewSection[];
  latestPosts: BlogPost[];
  navItems: NavItem[];
};

export function HomeScene({
  brandText,
  homePreviewSections,
  latestPosts,
  navItems,
}: HomeSceneProps) {
  const [progress, setProgress] = useState(0);
  const docked = progress > 0.56;

  useEffect(() => {
    const onScroll = () => {
      const limit = window.innerHeight * 0.72;
      const next = Math.max(0, Math.min(window.scrollY / limit, 1));
      setProgress(next);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const style = useMemo(
    () =>
      ({
        "--hero-progress": progress,
      }) as CSSProperties,
    [progress],
  );

  const logoStyle = useMemo(
    () => {
      const dockProgress = Math.min(progress / 0.56, 1);

      return {
        transform: `translate(-50%, calc(-50% - ${dockProgress * 46.5}vh)) scale(${
          1 - dockProgress * 0.82
        })`,
      } as CSSProperties;
    },
    [progress],
  );

  return (
    <div className="home-page" style={style}>
      <header
        className="home-topbar"
        data-visible={docked ? "true" : undefined}
      >
        {docked ? (
          <>
            <MainNav className="topbar-nav" items={navItems} />
            <div aria-hidden="true" className="topbar-brand">
              <BrandMark className="brand-mark-small" text={brandText} />
            </div>
          </>
        ) : null}
      </header>

      {!docked ? (
        <div className="home-traveling-brand" style={logoStyle}>
          <BrandMark
            className="brand-mark-large"
            priority
            text={brandText}
            transitionName="brand-mark"
          />
        </div>
      ) : null}

      <section className="home-hero-shell">
        <div className="home-hero-stage">
          {!docked ? <MainNav className="hero-nav" items={navItems} /> : null}
        </div>
      </section>

      <section className="home-preview">
        <div className="home-preview-inner">
          {homePreviewSections.map((section) => (
            <div className="preview-column" key={section.id}>
              <h2>{section.title}</h2>
              <p>{section.body}</p>
            </div>
          ))}
        </div>

        <div className="home-latest">
          <BlogList limit={10} posts={latestPosts} title="Latest Posts" />
        </div>
      </section>
    </div>
  );
}
