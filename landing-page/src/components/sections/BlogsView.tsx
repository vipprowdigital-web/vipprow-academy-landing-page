"use client";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Lines } from "@/components/motion/Lines";
import { useGsapScope } from "@/hooks/useGsapScope";
import { revealBatch, revealLines } from "@/lib/reveal";
import type { Blog } from "@/lib/blogs";

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

function BlogCard({ post }: { post: Blog }) {
  return (
    <article
      data-reveal
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-[0_1px_2px_rgba(6,0,46,0.04)] transition-[transform,box-shadow] duration-500 ease-out hover:-translate-y-1.5 hover:shadow-[0_24px_48px_-20px_rgba(6,0,46,0.28)]"
    >
      <div
        className="relative aspect-16/10 overflow-hidden"
        style={{ background: "var(--gradient-scene)" }}
      >
        {post.thumbnail && (
          <Image
            src={post.thumbnail}
            alt=""
            fill
            unoptimized
            sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        )}
        {post.category?.name && (
          <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-navy backdrop-blur">
            {post.category.name}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <time
          dateTime={post.createdAt}
          className="text-sm text-muted-foreground"
        >
          {formatDate(post.createdAt)}
        </time>
        <h3 className="mt-3 line-clamp-2 font-heading text-xl leading-snug font-semibold tracking-[-0.02em]">
          <Link
            href={`/blogs/${post._id}`}
            className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none focus-visible:after:rounded-3xl focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-primary"
          >
            {post.title}
          </Link>
        </h3>
        {post.short_description && (
          <p className="mt-3 line-clamp-3 text-[0.95rem] leading-relaxed text-muted-foreground">
            {post.short_description}
          </p>
        )}
        <span
          aria-hidden="true"
          className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-medium text-primary"
        >
          Read article
          <ArrowUpRight
            size={16}
            className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </span>
      </div>
    </article>
  );
}

export function BlogsView({ posts }: { posts: Blog[] }) {
  const track = useRef<HTMLDivElement>(null);
  const scrollBy = (dir: 1 | -1) =>
    track.current?.scrollBy({
      left: dir * Math.max(280, track.current.clientWidth * 0.8),
      behavior: "smooth",
    });
  const ref = useGsapScope<HTMLElement>(({ mm, root }) => {
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      revealLines(root);
      revealBatch(root);
    });
  });

  return (
    <section
      id="blogs"
      ref={ref}
      aria-labelledby="blogs-heading"
      className="section-light-alt relative w-full overflow-hidden py-16 sm:py-24 md:py-36"
    >
      <div className="mx-auto max-w-7xl px-3 sm:px-6">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6 sm:mb-14 md:mb-20">
          <div>
            <h2 id="blogs-heading" className="sr-only">
              Latest from our blog
            </h2>
            <Lines
              lines={[
                "Insights from the",
                <span key="b" className="text-primary">
                  marketing frontline.
                </span>,
              ]}
              className="font-heading text-[clamp(1.9rem,3.8vw,3.25rem)] leading-[1.03] font-semibold tracking-[-0.035em]"
            />
            <p
              data-reveal
              className="mt-3 sm:mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground"
            >
              Playbooks, trends and career advice from the people who run
              campaigns every day.
            </p>
          </div>
          {/* Arrows: 2 cards show at tablet widths, 3 on desktop, so they
              appear whenever there is something off-screen. */}
          {posts.length > 2 && (
            <div
              className={
                "hidden gap-2 md:flex " + (posts.length <= 3 ? "lg:hidden" : "")
              }
            >
              {([-1, 1] as const).map((dir) => (
                <button
                  key={dir}
                  type="button"
                  onClick={() => scrollBy(dir)}
                  aria-label={
                    dir === -1 ? "Previous articles" : "Next articles"
                  }
                  className="flex size-11 items-center justify-center rounded-full border border-border bg-background transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  {dir === -1 ? (
                    <ChevronLeft size={20} />
                  ) : (
                    <ChevronRight size={20} />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Swipeable on mobile; on desktop, 3 cards fill the row and more
            scroll sideways. */}
        <div
          ref={track}
          className="-mx-3 flex snap-x snap-mandatory scroll-px-3 gap-4 overflow-x-auto px-3 pt-2 pb-8 sm:-mx-6 sm:scroll-px-6 sm:gap-6 sm:px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {posts.map((post) => (
            <div
              key={post._id}
              className="w-[82vw] max-w-sm shrink-0 snap-start sm:w-[calc(50%-12px)] sm:max-w-none lg:w-[calc(33.333%-16px)]"
            >
              <BlogCard post={post} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
