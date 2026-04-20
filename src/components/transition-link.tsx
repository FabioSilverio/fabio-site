"use client";

import {
  Link as ViewTransitionLink,
} from "next-view-transitions";
import type { ComponentProps, ReactNode } from "react";

type TransitionLinkProps = ComponentProps<typeof ViewTransitionLink> & {
  children: ReactNode;
};

export function TransitionLink({ children, ...props }: TransitionLinkProps) {
  return <ViewTransitionLink {...props}>{children}</ViewTransitionLink>;
}
