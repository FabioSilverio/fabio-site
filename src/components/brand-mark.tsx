import type { CSSProperties } from "react";

type BrandMarkProps = {
  className?: string;
  priority?: boolean;
  transitionName?: string;
};

export function BrandMark({
  className,
  priority = false,
  transitionName,
}: BrandMarkProps) {
  const style = transitionName
    ? ({ viewTransitionName: transitionName } as CSSProperties)
    : undefined;

  return (
    <svg
      aria-label="fabio"
      className={className}
      style={style}
      viewBox="0 0 760 180"
      role="img"
    >
      <text
        x="50%"
        y="58%"
        textAnchor="middle"
        dominantBaseline="middle"
        className="brand-text-svg"
        data-priority={priority || undefined}
      >
        FABIO
      </text>
    </svg>
  );
}
