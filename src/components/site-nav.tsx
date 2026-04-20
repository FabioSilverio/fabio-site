"use client";

import { usePathname } from "next/navigation";
import { TransitionLink } from "@/components/transition-link";

const navItems = [
  { href: "/", label: "início" },
  { href: "/sobre", label: "sobre" },
  { href: "/projetos", label: "projetos" },
  { href: "/contato", label: "contato" },
];

export function SiteNav() {
  const pathname = usePathname();

  return (
    <header className="site-header">
      <TransitionLink href="/" className="brand-link">
        <span
          className="brand-mark"
          style={{ viewTransitionName: "site-mark" }}
        >
          fabio
        </span>
        <span className="brand-note">presença digital autoral</span>
      </TransitionLink>

      <nav className="site-nav" aria-label="Navegação principal">
        {navItems.map((item) => {
          const active = pathname === item.href;

          return (
            <TransitionLink
              href={item.href}
              className="nav-link"
              data-active={active || undefined}
              key={item.href}
            >
              {item.label}
            </TransitionLink>
          );
        })}
      </nav>
    </header>
  );
}
