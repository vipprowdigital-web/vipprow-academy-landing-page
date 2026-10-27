import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";

type Variant = "accent" | "outline" | "solid";

const VARIANTS: Record<Variant, string> = {
  // On dark navy fields
  accent: "bg-white text-[#06002e] hover:bg-white/85",
  outline: "border border-white/25 text-white hover:bg-white hover:text-[#06002e]",
  // On light fields
  solid: "bg-[#06002e] text-white hover:bg-[#1a1659]",
};

/**
 * A real <a> styled as a button (a <button> nested in a link is invalid and
 * hurts keyboard/screen-reader use). Pill shape, decided once for the site.
 */
export function ButtonLink({
  href,
  variant = "accent",
  size = "md",
  arrow = false,
  className,
  children,
  ...rest
}: {
  href: string;
  variant?: Variant;
  size?: "sm" | "md" | "lg";
  arrow?: boolean;
  className?: string;
  children: React.ReactNode;
} & Omit<React.ComponentProps<typeof Link>, "href" | "className">) {
  return (
    <Link
      href={href}
      className={cn(
        "group/btn inline-flex items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap select-none",
        "transition-[background-color,color,transform] duration-300 ease-out active:scale-[0.97]",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7a72c4]",
        size === "sm" && "h-9 px-4 text-[0.8125rem]",
        size === "md" && "h-12 px-7 text-[0.95rem]",
        size === "lg" && "h-14 px-9 text-base",
        VARIANTS[variant],
        className,
      )}
      {...rest}
    >
      {children}
      {arrow && (
        <ArrowUpRight
          size={16}
          aria-hidden="true"
          className="transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
        />
      )}
    </Link>
  );
}
