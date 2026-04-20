"use client";

import { BrandMark } from "@/components/brand-mark";
import { MainNav } from "@/components/main-nav";
import { TransitionLink } from "@/components/transition-link";
import type { NavItem } from "@/lib/cms-shared";

export function InnerHeader({
  brandText,
  navItems,
}: {
  brandText: string;
  navItems: NavItem[];
}) {
  return (
    <header className="inner-header">
      <MainNav className="topbar-nav" items={navItems} />
      <div className="topbar-brand">
        <TransitionLink href="/" aria-label="Voltar para a home">
          <BrandMark
            className="brand-mark-small"
            text={brandText}
            transitionName="brand-mark"
          />
        </TransitionLink>
      </div>
    </header>
  );
}
