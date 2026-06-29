import { Navbar } from '@/components/navbar/Navbar';
import { Hero } from '@/components/hero/Hero';
import { TrustedBy } from '@/components/sections/TrustedBy';
import { AboutProgram } from '@/components/sections/AboutProgram';
import { Features } from '@/components/sections/Features';
import { Courses } from '@/components/sections/Courses';
import { Roadmap } from '@/components/sections/Roadmap';
import { Placement } from '@/components/sections/Placement';
import { Instructor } from '@/components/sections/Instructor';
import { Testimonials } from '@/components/sections/Testimonials';
import { FAQ } from '@/components/sections/FAQ';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { Footer } from '@/components/footer/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TrustedBy />
        <AboutProgram />
        <Features />
        <Courses />
        {/* <Roadmap /> */}
        <Placement />
        <Instructor />
        <Testimonials />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
