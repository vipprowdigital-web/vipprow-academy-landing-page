export type StudentReview = {
  /** Student's name. */
  name: string;
  /** e.g. "Digital Marketing, now at Acme". Optional. */
  role?: string;
  /**
   * Public video URL. Either a direct file (.mp4 / .webm / .mov, e.g. from
   * Cloudinary or S3) or a YouTube link (watch, youtu.be, shorts).
   */
  videoUrl: string;
  /** Optional cover image. Without it: YouTube thumbnail, or the video's first frame. */
  poster?: string;
};

/**
 * Add student review videos here. The section on the home page appears
 * automatically once this list has at least one entry.
 *
 * Example:
 *   { name: "Priya Sharma", role: "Digital Marketing, placed at XYZ",
 *     videoUrl: "https://res.cloudinary.com/.../priya.mp4" },
 */
export const STUDENT_REVIEWS: StudentReview[] = [
  {
    name: "Reshu Soni",
    role: "Vipprow Academy",
    videoUrl:
      "https://res.cloudinary.com/dl6fjer3y/video/upload/v1794987895/vipprow-academy-review_klipbr.mp4",
  },
  {
    name: "Ankita Chandwani",
    role: "Vipprow Academy",
    videoUrl:
      "https://res.cloudinary.com/dl6fjer3y/video/upload/v1794987900/vipprow-academy-review-2_hzr1gk.mp4",
  },
  {
    name: "Sheikh Toufeeque Mansoori",
    role: "Vipprow Academy",
    videoUrl:
      "https://res.cloudinary.com/dl6fjer3y/video/upload/v1794987889/vipprow-academy-review-3_sz2a6q.mp4",
  },
];

/**
 * Cloudinary can render any video frame as a small JPG, so cards can show a
 * real cover without downloading the video. Returns null for other hosts.
 */
export function cloudinaryPoster(url: string): string | null {
  const m = url.match(
    /^(https:\/\/res\.cloudinary\.com\/[^/]+\/video\/upload\/)(.+)\.\w+$/,
  );
  return m ? `${m[1]}so_1,w_540,c_limit,q_auto,f_jpg/${m[2]}.jpg` : null;
}

/** Returns the YouTube video id for watch / youtu.be / shorts / embed links, else null. */
export function youTubeId(url: string): string | null {
  try {
    const u = new URL(url);
    const host = u.hostname.replace(/^www\./, "");
    if (host === "youtu.be") return u.pathname.slice(1) || null;
    if (host.endsWith("youtube.com") || host.endsWith("youtube-nocookie.com")) {
      if (u.searchParams.get("v")) return u.searchParams.get("v");
      const m = u.pathname.match(/^\/(?:shorts|embed|live)\/([\w-]{6,})/);
      return m ? m[1] : null;
    }
  } catch {
    /* not a URL */
  }
  return null;
}
