import type { CSSProperties, ElementType, ReactNode } from "react";

type SplitTextProps = {
  accentIndexes?: number[];
  as?: ElementType;
  className?: string;
  text: string;
  transitionName?: string;
};

type CSSVariables = CSSProperties & {
  "--char-index"?: number;
};

export function SplitText({
  accentIndexes = [],
  as: Tag = "div",
  className,
  text,
  transitionName,
}: SplitTextProps) {
  const style = transitionName
    ? ({ viewTransitionName: transitionName } as CSSProperties)
    : undefined;

  return (
    <Tag className={["split-text", className].filter(Boolean).join(" ")} style={style}>
      {text.split("").map((char, index) => {
        const charStyle = { "--char-index": index } as CSSVariables;
        const content: ReactNode = char === " " ? "\u00A0" : char;

        return (
          <span className="split-text-slot" key={`${char}-${index}`} style={charStyle}>
            <span
              className="split-text-char"
              data-accent={accentIndexes.includes(index) || undefined}
            >
              {content}
            </span>
          </span>
        );
      })}
    </Tag>
  );
}
