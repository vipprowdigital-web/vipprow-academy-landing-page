import type { Metadata } from "next";
import { EnrollForm } from "@/components/sections/EnrollForm";
import AddressBanner from "@/components/sections/AddressBanner";

export const metadata: Metadata = {
  title: "Enroll Now | Vipprow Academy",
  description:
    "Take the first step toward your future. Apply for Digital Marketing Mastery or Performance Marketing at Vipprow Academy.",
};

function firstValue(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export default async function EnrollPage({
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
              Admissions
            </span>
            <h1
              className="font-heading font-bold tracking-tight leading-[1.05] mb-4"
              style={{ fontSize: "clamp(2.2rem, 5vw, 3rem)" }}
            >
              Begin your journey.
              <br />
              <span className="text-primary">Enroll today.</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto leading-relaxed">
              Fill out the form below and our admissions team will get in touch soon.
            </p>
          </div>
        </section>
        <EnrollForm
          branchId={branchId}
          leadId={leadId}
          urlName={name}
          urlMobile={mobile}
        />
        <AddressBanner
          addressLines={["Bethel House Near Naveen Vidhya Mandir School Napier Town Jabalpur, Madhya Pradesh"]}
          phone="+91 96699 32121"
        // mapHref="https://maps.google.com/?q=<your academy on Google Maps>"
        // lat="<latitude>"
        // lng="<longitude>"
        />
      </main>
    </>
  );
}
