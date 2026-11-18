import type { ComponentType, CSSProperties } from "react";
import Image from "next/image";
import { BsOpenai } from "react-icons/bs";
import { SiClaude, SiPerplexity } from "react-icons/si";

type IconProps = { className?: string; style?: CSSProperties };

/** Official Figma mark (five shapes, original colours). */
function FigmaMark({ className }: IconProps) {
  return (
    <svg viewBox="0 0 38 57" className={className} aria-hidden="true">
      <path d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0Z" fill="#1ABCFE" />
      <path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0Z" fill="#0ACF83" />
      <path d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19Z" fill="#FF7262" />
      <path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5Z" fill="#F24E1E" />
      <path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5Z" fill="#A259FF" />
    </svg>
  );
}

function CanvaMark({ className }: IconProps) {
  return (
    <Image
      src="/seminar/tools/canva.png"
      alt=""
      width={256}
      height={256}
      className={className}
    />
  );
}

function ManusMark({ className }: IconProps) {
  return (
    <Image
      src="/seminar/tools/manus.png"
      alt=""
      width={256}
      height={256}
      className={className}
    />
  );
}

export type Tool = {
  name: string;
  Icon: ComponentType<IconProps>;
  /** Brand colour for single-colour glyphs. Multi-colour marks and images use "inherit". */
  color: string;
  job: string;
  line: string;
};

export const TOOLS: Tool[] = [
  {
    name: "ChatGPT",
    Icon: BsOpenai,
    color: "#10a37f",
    job: "Ad copy, ideas, scripts and captions in one minute.",
    line: "You do the thinking. ChatGPT does the writing.",
  },
  {
    name: "Claude",
    Icon: SiClaude,
    color: "#d97757",
    job: "Long-form planning, content, strategy and presentations.",
    line: "Big jobs, handled calmly.",
  },
  {
    name: "Manus AI",
    Icon: ManusMark,
    color: "inherit",
    job: "Research, reports and automation, the whole job in one go.",
    line: "One prompt. The whole job, done.",
  },
  {
    name: "Perplexity",
    Icon: SiPerplexity,
    color: "#20b8cd",
    job: "Latest trends, competitor checks and research with sources.",
    line: "Faster than Google, with sources you can trust.",
  },
  {
    name: "Canva AI",
    Icon: CanvaMark,
    color: "inherit",
    job: "Posters, creatives and reels designed without a designer.",
    line: "No designer? Canva AI has you covered.",
  },
  {
    name: "Figma AI",
    Icon: FigmaMark,
    color: "inherit",
    job: "Landing pages, UI, design and the look of a website.",
    line: "Pages good enough to stop the scroll.",
  },
];

/** Small white logo chip, used in the hero and on the toolkit cards. */
export function ToolLogo({
  tool,
  size = "md",
}: {
  tool: Tool;
  size?: "sm" | "md" | "lg";
}) {
  const box = { sm: "size-8", md: "size-10", lg: "size-14" }[size];
  // Canva is already a circle, so it fills the chip; the rest sit inside it.
  const full = tool.name === "Canva AI";
  const glyph = full
    ? "size-full"
    : { sm: "size-4", md: "size-5", lg: "size-7" }[size];
  return (
    <span
      className={`inline-flex ${box} shrink-0 items-center justify-center overflow-hidden rounded-full bg-white`}
      title={tool.name}
    >
      <tool.Icon
        className={glyph}
        {...(tool.color !== "inherit" ? { style: { color: tool.color } } : {})}
      />
    </span>
  );
}
