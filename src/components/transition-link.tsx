"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from "react";
import { startTransition } from "react";

type TransitionLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  href: string;
  replace?: boolean;
  scroll?: boolean;
};

type ViewTransitionDocument = Document & {
  startViewTransition?: (callback: () => void) => void;
};

export function TransitionLink({
  children,
  href,
  onClick,
  replace,
  scroll,
  target,
  ...props
}: TransitionLinkProps) {
  const router = useRouter();

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event);

    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      target === "_blank" ||
      href.startsWith("http") ||
      href.startsWith("mailto:")
    ) {
      return;
    }

    event.preventDefault();

    const navigate = () => {
      startTransition(() => {
        if (replace) {
          router.replace(href, { scroll });
          return;
        }

        router.push(href, { scroll });
      });
    };

    const transitionDocument = document as ViewTransitionDocument;

    if (transitionDocument.startViewTransition) {
      transitionDocument.startViewTransition(navigate);
      return;
    }

    navigate();
  }

  return (
    <Link
      href={href}
      onClick={handleClick}
      replace={replace}
      scroll={scroll}
      target={target}
      {...props}
    >
      {children}
    </Link>
  );
}
