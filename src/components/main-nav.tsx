"use client";

import { usePathname } from "next/navigation";
import { TransitionLink } from "@/components/transition-link";
import type { NavItem } from "@/lib/cms-shared";

type MainNavProps = {
  className?: string;
  items: NavItem[];
};

export function MainNav({ className, items }: MainNavProps) {
  const pathname = usePathname();

  return (
    <nav className={className} aria-label="primary">
      {items.map((item) => {
        const active = pathname === item.href;

        return (
          <TransitionLink
            className="nav-link"
            data-active={active || undefined}
            href={item.href}
            key={item.href}
          >
            {item.label}
          </TransitionLink>
        );
      })}
    </nav>
  );
}
