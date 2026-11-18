const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api/v1";
const WEBSITE_BACKEND_URL =
  process.env.NEXT_PUBLIC_WEBSITE_BACKEND_URL ?? "http://localhost:7000/api/v1";

export type Blog = {
  _id: string;
  title: string;
  short_description?: string;
  thumbnail?: string;
  category?: { _id?: string; name: string } | null;
  createdAt: string;
  /** Full article body (HTML). Only present on the detail endpoint. */
  description?: string;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    metaKeywords?: string[];
  } | null;
};

/**
 * The backend sometimes stores keywords JSON-stringified several times
 * (e.g. '["[\\"[]\\"]"]'). Unwrap that and keep only real words.
 */
export function cleanKeywords(raw: unknown): string[] {
  const out: string[] = [];
  const walk = (v: unknown, depth = 0) => {
    if (depth > 6) return;
    if (Array.isArray(v)) return v.forEach((x) => walk(x, depth + 1));
    if (typeof v !== "string") return;
    const t = v.trim();
    if (t.startsWith("[") || t.startsWith('"')) {
      try {
        return walk(JSON.parse(t), depth + 1);
      } catch {
        /* not JSON, fall through */
      }
    }
    if (t) out.push(t);
  };
  walk(raw);
  return out;
}

/** One post by id, or null if missing / unreachable. */
export async function getBlog(id: string): Promise<Blog | null> {
  try {
    const res = await fetch(
      `${WEBSITE_BACKEND_URL}/blog/${encodeURIComponent(id)}`,
      // Always fresh: editors expect edits to show up immediately.
      { cache: "no-store" },
    );
    if (!res.ok) return null;
    const json = await res.json();
    return (json?.data as Blog) ?? null;
  } catch {
    return null;
  }
}

/** Latest academy blog posts. Returns [] on any failure so the section can hide itself. */
export async function getLatestBlogs(limit = 3): Promise<Blog[]> {
  try {
    const qs = new URLSearchParams({
      displayOn: "academy",
      limit: String(limit),
      sortBy: "createdAt",
      sortOrder: "desc",
    });
    const res = await fetch(`${WEBSITE_BACKEND_URL}/blog?${qs}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    const json = await res.json();
    return Array.isArray(json?.data) ? (json.data as Blog[]) : [];
  } catch {
    return [];
  }
}
