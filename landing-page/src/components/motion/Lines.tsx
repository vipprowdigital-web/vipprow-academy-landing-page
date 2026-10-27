import { cn } from "@/lib/cn";

/**
 * Headline split into masked lines for the scroll reveal in lib/reveal.ts.
 * Server-safe (no hooks). The text is fully visible without JavaScript.
 * `lines` entries may be strings or nodes (e.g. a coloured span).
 */
export function Lines({
  lines,
  as: Tag = "h2",
  className,
  lineClassName,
}: {
  lines: React.ReactNode[];
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  lineClassName?: string;
}) {
  return (
    <Tag data-lines className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.12em] -mb-[0.12em]">
          <span data-line className={cn("block will-change-transform", lineClassName)}>
            {line}
          </span>
        </span>
      ))}
    </Tag>
  );
}
