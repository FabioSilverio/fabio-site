import type { CSSProperties } from "react";

type BrandMarkProps = {
  className?: string;
  priority?: boolean;
  text?: string;
  transitionName?: string;
};

export function BrandMark({
  className,
  priority = false,
  text = "FABIO",
  transitionName,
}: BrandMarkProps) {
  const style = transitionName
    ? ({ viewTransitionName: transitionName } as CSSProperties)
    : undefined;

  return (
    <svg
      aria-label={text.toLowerCase()}
      className={className}
      style={style}
      viewBox="0 0 760 180"
      role="img"
    >
      <text
        x="50%"
        y="54%"
        textAnchor="middle"
        dominantBaseline="middle"
        className="brand-text-svg"
        data-priority={priority || undefined}
      >
        {text.toUpperCase()}
      </text>
    </svg>
  );
}
