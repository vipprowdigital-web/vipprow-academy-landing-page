import type { Metadata } from "next";
import { LeadForm } from "@/components/sections/LeadForm";

export const metadata: Metadata = {
  title: "Book a Demo Class | Vipprow Academy",
  description:
    "Experience Vipprow Academy firsthand. Book a free, no-obligation demo class for Digital Marketing Mastery or Performance Marketing.",
};

function firstValue(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export default async function DemoClassPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const branchId = firstValue(params.branchId);
  const leadId = firstValue(params.leadId);
  const name = firstValue(params.name);
  const mobile = firstValue(params.mobile);

  return (
    <>
      <main className="section-light min-h-screen">
        <section className="pt-32 pb-8 md:pt-40 md:pb-12">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <span className="inline-block text-xs uppercase tracking-[0.2em] text-primary font-heading font-semibold mb-4">
              Free Demo Class
            </span>
            <h1
              className="font-heading font-bold tracking-tight leading-[1.05] mb-4"
              style={{ fontSize: "clamp(2.2rem, 5vw, 3rem)" }}
            >
              Try before you commit.
              <br />
              <span className="text-primary">Book a free demo class.</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto leading-relaxed">
              Fill out the form below and our team will reach out within 24
              hours to schedule your free, no-obligation demo class.
            </p>
          </div>
        </section>
        <LeadForm
          branchId={branchId}
          leadId={leadId}
          urlName={name}
          urlMobile={mobile}
        />
      </main>
    </>
  );
}
