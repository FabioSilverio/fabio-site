import { BrandMark } from "@/components/brand-mark";
import { MainNav } from "@/components/main-nav";
import { TransitionLink } from "@/components/transition-link";

export function InnerHeader() {
  return (
    <header className="inner-header">
      <MainNav className="topbar-nav" />
      <div className="topbar-brand">
        <TransitionLink href="/" aria-label="Voltar para a home">
          <BrandMark className="brand-mark-small" transitionName="brand-mark" />
        </TransitionLink>
      </div>
    </header>
  );
}
