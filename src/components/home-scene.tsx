"use client";

import type { CSSProperties } from "react";
import { useEffect, useMemo, useState } from "react";
import { BrandMark } from "@/components/brand-mark";
import { MainNav } from "@/components/main-nav";
import { blogPosts } from "@/lib/content";

export function HomeScene() {
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
        transform: `translate(-50%, calc(-50% - ${progress * 41}vh)) scale(${
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
        <MainNav className="topbar-nav" />
      </header>

      <div className="home-traveling-brand" style={logoStyle}>
        <BrandMark
          className="brand-mark-large"
          priority
          transitionName="brand-mark"
        />
      </div>

      <section className="home-hero-shell">
        <div className="home-hero-stage">
          <MainNav className="hero-nav" />
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
          <h2 className="home-latest-title">Latest Posts</h2>
          <div className="home-latest-list">
            {blogPosts.slice(0, 6).map((post) => (
              <article className="section-row" key={`${post.date}-${post.title}`}>
                <div className="section-row-main">
                  <h2>{post.title}</h2>
                  <p>{post.summary}</p>
                </div>
                <div className="section-row-date">{post.date}</div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
