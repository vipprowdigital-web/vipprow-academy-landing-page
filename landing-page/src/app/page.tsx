import { AboutProgram } from "@/components/sections/AboutProgram";
import { Features } from "@/components/sections/Features";
import { Courses } from "@/components/sections/Courses";
import { Placement } from "@/components/sections/Placement";
import { StudentReviews } from "@/components/sections/StudentReviews";
import { Blogs } from "@/components/sections/Blogs";
import { FAQ } from "@/components/sections/FAQ";
import Hero from "@/components/hero/Hero";

export default function Home() {
  return (
    <main>
      <Hero />
      <AboutProgram />
      <Courses />
      <Features />
      <Placement />
      <StudentReviews />
      <Blogs />
      <FAQ />
    </main>
  );
}
