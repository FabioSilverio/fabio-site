"use client";

import type { CSSProperties } from "react";
import { useEffect, useMemo, useState } from "react";
import { BlogList } from "@/components/blog-list";
import { BrandMark } from "@/components/brand-mark";
import { MainNav } from "@/components/main-nav";
import type { BlogPost, NavItem } from "@/lib/cms-shared";

type HomeSceneProps = {
  brandText: string;
  latestPosts: BlogPost[];
  navItems: NavItem[];
};

export function HomeScene({
  brandText,
  latestPosts,
  navItems,
}: HomeSceneProps) {
  const [progress, setProgress] = useState(0);

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
    () =>
      ({
        transform: `translate(-50%, calc(-50% - ${progress * 49}vh)) scale(${
          1 - progress * 0.82
        })`,
        opacity: 1 - progress * 0.04,
      }) as CSSProperties,
    [progress],
  );

  return (
    <div className="home-page" style={style}>
      <header
        className="home-topbar"
        data-visible={progress > 0.12 ? "true" : undefined}
      >
        <MainNav className="topbar-nav" items={navItems} />
      </header>

      <div className="home-traveling-brand" style={logoStyle}>
        <BrandMark
          className="brand-mark-large"
          priority
          text={brandText}
          transitionName="brand-mark"
        />
      </div>

      <section className="home-hero-shell">
        <div className="home-hero-stage">
          <MainNav className="hero-nav" items={navItems} />
        </div>
      </section>

      <section className="home-preview">
        <div className="home-preview-inner">
          <div className="preview-column">
            <h2>Minimal home, sharp internals.</h2>
            <p>
              A home clean enough to feel deliberate, with the logo centered and
              motion reserved for the moments that matter.
            </p>
          </div>
          <div className="preview-column">
            <h2>Shared transition into the top bar.</h2>
            <p>
              The home keeps a single logo instance and docks it into the top
              area as you scroll instead of rendering two competing marks.
            </p>
          </div>
        </div>

        <div className="home-latest">
          <BlogList limit={10} posts={latestPosts} title="Latest Posts" />
        </div>
      </section>
    </div>
  );
}
