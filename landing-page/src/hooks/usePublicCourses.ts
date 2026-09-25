"use client";
import { useEffect, useState } from "react";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api/v1";

export type Course = {
  value: string; // course id from the API, or a slug for the fallback list
  label: string;
  duration?: string | null;
};

// Used only when /courses/public can't be reached
const FALLBACK_COURSES: Course[] = [
  { value: "digital-marketing", label: "Digital Marketing" },
  { value: "performance-marketing", label: "Performance Marketing" },
];

/**
 * Loads all active courses from GET /courses/public.
 * branchId is only sent when one is specified; otherwise every course is returned.
 * `fromApi` is true when the values are real course ids (submit as courseId).
 */
export function usePublicCourses(branchId?: string) {
  const [state, setState] = useState<{
    courses: Course[];
    loading: boolean;
    fromApi: boolean;
  }>({ courses: [], loading: true, fromApi: false });

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const qs = branchId
          ? `?${new URLSearchParams({ branchId }).toString()}`
          : "";
        const res = await fetch(`${API_URL}/courses/public${qs}`);
        const json = await res.json();
        if (cancelled) return;

        if (!res.ok || !json?.success || !Array.isArray(json.data)) {
          throw new Error("bad response");
        }

        setState({
          courses: json.data.map(
            (c: { id: string; name: string; duration?: string | null }) => ({
              value: c.id,
              label: c.name,
              duration: c.duration ?? null,
            }),
          ),
          loading: false,
          fromApi: true,
        });
      } catch {
        if (!cancelled) {
          setState({ courses: FALLBACK_COURSES, loading: false, fromApi: false });
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [branchId]);

  return state;
}
