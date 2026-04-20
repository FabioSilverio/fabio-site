import { BrandMark } from "@/components/brand-mark";
import { MainNav } from "@/components/main-nav";

export function HomeScene() {
  return (
    <div className="home-page">
      <header className="home-topbar" data-visible="true">
        <MainNav className="topbar-nav" />
        <div className="topbar-brand">
          <BrandMark className="brand-mark-small" />
        </div>
      </header>

      <section className="home-hero-shell">
        <div className="home-hero-stage">
          <div className="hero-brand-wrap">
            <BrandMark
              className="brand-mark-large"
              priority
              transitionName="brand-mark"
            />
          </div>
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
              The same wordmark is reused as a shared element so route changes
              feel continuous instead of abrupt.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
