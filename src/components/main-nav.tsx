"use client";

import { usePathname } from "next/navigation";
import { TransitionLink } from "@/components/transition-link";

const items = [
  { href: "/blog", label: "BLOG" },
  { href: "/talks", label: "TALKS" },
  { href: "/media", label: "MEDIA" },
  { href: "/projects", label: "PROJECTS" },
];

type MainNavProps = {
  className?: string;
};

export function MainNav({ className }: MainNavProps) {
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
