import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import sanitizeHtml from "sanitize-html";
import { cleanKeywords, getBlog, getLatestBlogs } from "@/lib/blogs";
import { ButtonLink } from "@/components/ui/ButtonLink";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const post = await getBlog(id);
  if (!post) return { title: "Article not found | Vipprow Academy" };
  // Prefer the SEO fields set in the CMS, fall back to the post itself.
  const title = post.seo?.metaTitle?.trim() || `${post.title} | Vipprow Academy`;
  const description =
    post.seo?.metaDescription?.trim() || post.short_description;
  const keywords = cleanKeywords(post.seo?.metaKeywords);
  return {
    title: { absolute: title },
    description,
    keywords: keywords.length ? keywords : undefined,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: post.createdAt,
      images: post.thumbnail ? [post.thumbnail] : undefined,
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

const cleanHtml = (html: string) =>
  sanitizeHtml(html, {
    allowedTags: [
      ...sanitizeHtml.defaults.allowedTags,
      "img",
      "h1",
      "h2",
      "figure",
      "figcaption",
    ],
    allowedAttributes: {
      a: ["href", "name", "target", "rel"],
      img: ["src", "alt", "width", "height"],
    },
    allowedSchemes: ["http", "https", "mailto", "tel"],
    transformTags: {
      a: sanitizeHtml.simpleTransform("a", {
        rel: "noopener noreferrer",
        target: "_blank",
      }),
      // The page already has an <h1>; demote any in the body.
      h1: "h2",
    },
  });

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

export default async function BlogPage({ params }: Props) {
  const { id } = await params;
  const [post, latest] = await Promise.all([getBlog(id), getLatestBlogs(4)]);
  if (!post) notFound();

  const more = latest.filter((b) => b._id !== post._id).slice(0, 3);

  return (
    <main>
      <section className="section-light relative w-full bg-white! pt-25">
        <div className="mx-auto max-w-3xl px-5 sm:px-6">
          <Link
            href="/#blogs"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            All articles
          </Link>

          <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            {post.category?.name && (
              <span className="rounded-full bg-muted px-3.5 py-1.5 font-medium text-foreground">
                {post.category.name}
              </span>
            )}
            <time dateTime={post.createdAt}>{formatDate(post.createdAt)}</time>
          </div>

          <h1 className="mt-6 font-heading text-[clamp(2rem,4.6vw,3.5rem)] leading-[1.05] font-semibold tracking-[-0.035em] text-balance">
            {post.title}
          </h1>
          {post.short_description && (
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              {post.short_description}
            </p>
          )}
        </div>
      </section>

      <article className="section-light relative w-full bg-white! pt-4 pb-16 md:pb-24">
        <div className="mx-auto max-w-3xl px-5 sm:px-6">
          {post.thumbnail && (
            <div className="relative aspect-video overflow-hidden rounded-3xl border border-border bg-muted">
              <Image
                src={post.thumbnail}
                alt=""
                fill
                priority
                unoptimized
                sizes="(min-width: 768px) 720px, 100vw"
                className="object-cover"
              />
            </div>
          )}

          {post.description && (
            <div
              className="blog-prose mt-12"
              dangerouslySetInnerHTML={{ __html: cleanHtml(post.description) }}
            />
          )}
        </div>
      </article>

      <section
        aria-labelledby="more-heading"
        className="section-light w-full bg-white! py-16 md:py-24"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          {more.length > 0 && (
            <>
              <h2
                id="more-heading"
                className="font-heading text-2xl font-semibold tracking-[-0.03em] sm:text-3xl"
              >
                Keep reading
              </h2>
              <ul className="mt-8 grid gap-4 sm:grid-cols-3">
                {more.map((b) => (
                  <li key={b._id}>
                    <Link
                      href={`/blogs/${b._id}`}
                      className="group block h-full rounded-2xl border border-border p-5 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-24px_rgba(6,0,46,0.3)]"
                    >
                      <span className="text-sm text-muted-foreground">
                        {b.category?.name ?? formatDate(b.createdAt)}
                      </span>
                      <span className="mt-2 line-clamp-3 block font-heading text-lg leading-snug font-semibold tracking-[-0.02em]">
                        {b.title}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}
          <div className="mt-12 flex flex-wrap items-center justify-between gap-4 rounded-3xl bg-navy p-8 text-white sm:p-10">
            <p className="max-w-md font-heading text-xl font-semibold tracking-[-0.02em] sm:text-2xl">
              Ready to turn insight into a career?
            </p>
            <ButtonLink href="/demo-class" size="lg" arrow>
              Book a Demo Class
            </ButtonLink>
          </div>
        </div>
      </section>
    </main>
  );
}
