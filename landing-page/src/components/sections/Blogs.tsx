import { getLatestBlogs } from "@/lib/blogs";
import { BlogsView } from "./BlogsView";

/** Server component: fetches posts at request/ISR time, hides itself if none. */
export async function Blogs() {
  const posts = await getLatestBlogs(9);
  if (!posts.length) return null;
  return <BlogsView posts={posts} />;
}
