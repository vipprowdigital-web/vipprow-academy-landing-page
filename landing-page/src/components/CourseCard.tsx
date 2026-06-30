"use client";

type CourseCardProps = {
  index: string;
  title: string;
  description: string;
};

export default function CourseCard({
  index,
  title,
  description,
}: CourseCardProps) {
  return (
    <div
      data-reveal
      tabIndex={0}
      className="group relative rounded-2xl border border-white/10 bg-white/3 p-6 backdrop-blur-sm transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-[#FF6B4A]/40 hover:bg-white/5 hover:shadow-[0_20px_40px_-15px_rgba(255,107,74,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B4A]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0E14]"
    >
      <span className="text-xs tracking-[0.2em] text-[#FF6B4A]/80">
        {index}
      </span>
      <h3 className="mt-3 text-xl font-medium text-[#F5F7FA]">{title}</h3>
      <p className="mt-2 text-sm text-[#8893A7] leading-relaxed">
        {description}
      </p>
      <div
        className="mt-5 h-px w-full bg-linear-to-r from-white/10 via-white/10 to-transparent transition-all duration-300 group-hover:from-[#FF6B4A]/50 group-hover:via-[#FF6B4A]/10"
      />
    </div>
  );
}
