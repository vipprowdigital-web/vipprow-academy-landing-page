import { cn } from "@/lib/cn";
import { Marquee } from "../magicui/marquee";

const reviews = [
  {
    name: "Priya S.",
    username: "@priya_s",
    body: "The Digital Marketing course completely changed how I approach growth. Got my first client before graduation.",
    img: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=60",
  },
  {
    name: "Arjun M.",
    username: "@arjun_m",
    body: "Performance Marketing was entirely hands-on. Had a job offer before the course even ended.",
    img: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=60",
  },
  {
    name: "Rohan K.",
    username: "@rohan_k",
    body: "Went from zero to running ₹2L/month ad campaigns in 10 weeks. Worth every rupee.",
    img: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=60",
  },
  {
    name: "Meera T.",
    username: "@meera_t",
    body: "SEO and content strategy finally clicked. My blog now gets 10x the organic traffic it did before.",
    img: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=60",
  },
  {
    name: "Dev P.",
    username: "@dev_p",
    body: "Vipprow Academy is the real deal. Practical, structured, and the community is genuinely gold.",
    img: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=60",
  },
  {
    name: "Ananya R.",
    username: "@ananya_r",
    body: "The instructors actually work in the field. Not your typical online course — this is live learning.",
    img: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=60",
  },
  {
    name: "Karan L.",
    username: "@karan_l",
    body: "Meta Ads section alone paid for the entire course fee within a month of applying the skills.",
    img: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=60",
  },
  {
    name: "Shruti B.",
    username: "@shruti_b",
    body: "Incredibly well structured. Weekly projects kept me accountable and results were immediate.",
    img: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=60",
  },
];

const firstRow = reviews.slice(0, 4);
const secondRow = reviews.slice(4);

const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
}) => {
  return (
    <figure
      className={cn(
        "w-50 cursor-pointer rounded-xl border p-4",
        "border-gray-950/10 bg-primary/10 hover:bg-secondary-foreground transition-colors duration-200",
      )}
    >
      <div className="flex flex-row items-center gap-2 mb-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="rounded-full"
          width="32"
          height="32"
          alt={name}
          src={img}
        />
        <div className="flex flex-col">
          <figcaption className="text-sm font-semibold text-foreground leading-tight">
            {name}
          </figcaption>
          <p className="text-xs text-muted-foreground">{username}</p>
        </div>
      </div>
      <blockquote className="text-xs text-muted-foreground leading-relaxed">
        {body}
      </blockquote>
    </figure>
  );
};

export function Marquee3D() {
  return (
    <div className="relative flex h-80 w-full flex-row items-center justify-center gap-4 overflow-hidden perspective-near">
      <div
        className="flex flex-row items-center gap-4"
        style={{
          transform:
            "translateX(-100px) translateY(0px) translateZ(-100px) rotateX(20deg) rotateY(-10deg) rotateZ(20deg)",
        }}
      >
        <Marquee pauseOnHover vertical className="h-130 [--duration:25s]">
          {firstRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>
        <Marquee
          reverse
          pauseOnHover
          vertical
          className="h-130 [--duration:22s]"
        >
          {secondRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>
        <Marquee pauseOnHover vertical className="h-130 [--duration:28s]">
          {firstRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>
        {/* <Marquee
          reverse
          pauseOnHover
          vertical
          className="h-80 [--duration:24s]"
        >
          {secondRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee> */}
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-linear-to-b from-background to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-linear-to-t from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-linear-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-linear-to-l from-background to-transparent" />
    </div>
  );
}
