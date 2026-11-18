"use client";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Play, X } from "lucide-react";
import { Lines } from "@/components/motion/Lines";
import { useGsapScope } from "@/hooks/useGsapScope";
import { revealBatch, revealLines } from "@/lib/reveal";
import {
  STUDENT_REVIEWS,
  cloudinaryPoster,
  youTubeId,
  type StudentReview,
} from "@/lib/studentReviews";

/** Cover for a card: given poster, YouTube thumbnail, or the video's own first frame. */
function Cover({ review }: { review: StudentReview }) {
  const yt = youTubeId(review.videoUrl);
  const img =
    review.poster ??
    (yt ? `https://i.ytimg.com/vi/${yt}/hqdefault.jpg` : cloudinaryPoster(review.videoUrl));

  if (img) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={img} alt="" loading="lazy" decoding="async" className="absolute inset-0 size-full object-cover" />;
  }
  return (
    <video
      src={`${review.videoUrl}#t=0.1`}
      preload="metadata"
      muted
      playsInline
      aria-hidden="true"
      tabIndex={-1}
      className="absolute inset-0 size-full object-cover"
    />
  );
}

function ReviewCard({
  review,
  onOpen,
}: {
  review: StudentReview;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`Play video review from ${review.name}`}
      className="group relative aspect-9/16 w-[68vw] max-w-72 shrink-0 snap-start overflow-hidden rounded-3xl bg-navy text-left text-white shadow-[0_20px_40px_-24px_rgba(6,0,46,0.5)] transition-transform duration-500 ease-out hover:-translate-y-1.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary sm:w-64"
    >
      <Cover review={review} />
      <div className="absolute inset-0 bg-linear-to-t from-navy/90 via-navy/10 to-transparent" />
      <span className="absolute left-1/2 top-1/2 flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-navy shadow-lg transition-transform duration-300 group-hover:scale-110">
        <Play size={22} className="ml-0.5 fill-current" aria-hidden="true" />
      </span>
      <span className="absolute inset-x-0 bottom-0 p-5">
        <span className="block font-heading text-lg leading-tight font-semibold tracking-[-0.02em]">
          {review.name}
        </span>
        {review.role && (
          <span className="mt-1 block text-sm text-white/75">{review.role}</span>
        )}
      </span>
    </button>
  );
}

function VideoDialog({
  review,
  onClose,
}: {
  review: StudentReview | null;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  // Keep the last review while the dialog closes so it never flashes empty.
  const [shown, setShown] = useState<StudentReview | null>(review);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (review) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShown(review);
      if (!d.open) d.showModal();
    } else if (d.open) {
      d.close();
    }
  }, [review]);

  const yt = shown ? youTubeId(shown.videoUrl) : null;

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
      aria-label={shown ? `Video review from ${shown.name}` : "Video review"}
      className="m-auto max-h-[92svh] w-[min(92vw,26rem)] overflow-visible bg-transparent p-0 backdrop:bg-black/80 backdrop:backdrop-blur-sm"
    >
      {review && shown && (
        <div className="relative">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close video"
            className="absolute -top-12 right-0 flex size-10 items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <X size={20} aria-hidden="true" />
          </button>
          <div className="aspect-9/16 max-h-[82svh] w-full overflow-hidden rounded-3xl bg-black">
            {yt ? (
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${yt}?autoplay=1&rel=0&playsinline=1`}
                title={`Video review from ${shown.name}`}
                allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                allowFullScreen
                className="size-full"
              />
            ) : (
              <video
                src={shown.videoUrl}
                poster={shown.poster ?? cloudinaryPoster(shown.videoUrl) ?? undefined}
                controls
                autoPlay
                playsInline
                className="size-full object-contain"
              />
            )}
          </div>
          <p className="mt-4 text-center text-sm text-white/85">
            <span className="font-semibold">{shown.name}</span>
            {shown.role && <span className="text-white/65"> · {shown.role}</span>}
          </p>
        </div>
      )}
    </dialog>
  );
}

export function StudentReviews() {
  const [active, setActive] = useState<StudentReview | null>(null);
  const track = useRef<HTMLDivElement>(null);

  const ref = useGsapScope<HTMLElement>(({ mm, root }) => {
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      revealLines(root);
      revealBatch(root);
    });
  });

  if (STUDENT_REVIEWS.length === 0) return null;

  const scrollBy = (dir: 1 | -1) =>
    track.current?.scrollBy({
      left: dir * Math.max(280, track.current.clientWidth * 0.8),
      behavior: "smooth",
    });

  return (
    <section
      id="student-reviews"
      ref={ref}
      aria-labelledby="reviews-heading"
      className="section-light relative w-full overflow-hidden bg-white! py-16 sm:py-24 md:py-36"
    >
      <div className="mx-auto max-w-7xl px-3 sm:px-6">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6 sm:mb-14">
          <div>
            <h2 id="reviews-heading" className="sr-only">
              Student video reviews
            </h2>
            <Lines
              lines={[
                "Hear it from the",
                <span key="b" className="text-primary">
                  students who made the leap.
                </span>,
              ]}
              className="font-heading text-[clamp(1.9rem,3.8vw,3.25rem)] leading-[1.03] font-semibold tracking-[-0.035em]"
            />
            <p
              data-reveal
              className="mt-3 max-w-xl text-lg leading-relaxed text-muted-foreground sm:mt-7"
            >
              Real students, in their own words.
            </p>
          </div>
          {STUDENT_REVIEWS.length > 2 && (
            <div className="hidden gap-2 md:flex">
              {([-1, 1] as const).map((dir) => (
                <button
                  key={dir}
                  type="button"
                  onClick={() => scrollBy(dir)}
                  aria-label={dir === -1 ? "Previous videos" : "Next videos"}
                  className="flex size-11 items-center justify-center rounded-full border border-border transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  {dir === -1 ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
                </button>
              ))}
            </div>
          )}
        </div>

        <div
          ref={track}
          data-reveal
          className="-mx-3 flex snap-x snap-mandatory scroll-px-3 gap-4 overflow-x-auto px-3 pb-4 sm:-mx-6 sm:scroll-px-6 sm:px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {STUDENT_REVIEWS.map((r) => (
            <ReviewCard key={r.videoUrl} review={r} onOpen={() => setActive(r)} />
          ))}
        </div>
      </div>

      <VideoDialog review={active} onClose={() => setActive(null)} />
    </section>
  );
}
