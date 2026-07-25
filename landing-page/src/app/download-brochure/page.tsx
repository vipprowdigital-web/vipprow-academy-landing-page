import type { Metadata } from "next";
import { BrochureForm } from "@/components/sections/BrochureForm";
import AddressBanner from "@/components/sections/AddressBanner";
import { BookOpen, Award, TrendingUp, Users } from "lucide-react";

export const metadata: Metadata = {
    title: "Download Course Brochure | Vipprow Academy",
    description:
        "Download the official course brochure for Digital Marketing Mastery and Performance Marketing at Vipprow Academy. Get syllabus, fee breakdown, and placement stats sent to your email.",
};

function firstValue(value: string | string[] | undefined): string | undefined {
    return Array.isArray(value) ? value[0] : value;
}

export default async function DownloadBrochurePage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const params = await searchParams;
    const name = firstValue(params.name);
    const mobile = firstValue(params.mobile);

    return (
        <main className="section-light min-h-screen">
            {/* Header section */}
            <section className="pt-32 pb-8 md:pt-40 md:pb-10">
                <div className="max-w-7xl mx-auto px-3 sm:px-6 text-center">
                    <span className="inline-block text-xs uppercase tracking-[0.2em] text-primary font-heading font-semibold mb-4">
                        Course Information
                    </span>
                    <h1
                        className="font-heading font-bold tracking-tight leading-[1.05] mb-4"
                        style={{ fontSize: "clamp(2.2rem, 5vw, 3.2rem)" }}
                    >
                        Curriculum, Fees & Career Roadmap.
                        <br />
                        <span className="text-primary">Download Official Brochure.</span>
                    </h1>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
                        Get comprehensive insights into our Digital Marketing Mastery program, industry certifications, practical projects, and guaranteed placement support.
                    </p>

                    {/* Quick value badges */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-10">
                        <div className="p-4 rounded-2xl border border-border/60 bg-card/40 backdrop-blur-sm flex flex-col items-center text-center">
                            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-3">
                                <BookOpen size={20} />
                            </div>
                            <h3 className="text-sm font-semibold text-foreground">100% Practical</h3>
                            <p className="text-xs text-muted-foreground mt-1">Live agency projects & campaigns</p>
                        </div>

                        <div className="p-4 rounded-2xl border border-border/60 bg-card/40 backdrop-blur-sm flex flex-col items-center text-center">
                            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-3">
                                <TrendingUp size={20} />
                            </div>
                            <h3 className="text-sm font-semibold text-foreground">AI Marketing</h3>
                            <p className="text-xs text-muted-foreground mt-1">ChatGPT, Automation & Ads</p>
                        </div>

                        <div className="p-4 rounded-2xl border border-border/60 bg-card/40 backdrop-blur-sm flex flex-col items-center text-center">
                            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-3">
                                <Award size={20} />
                            </div>
                            <h3 className="text-sm font-semibold text-foreground">Certifications</h3>
                            <p className="text-xs text-muted-foreground mt-1">Google, Meta & Vipprow</p>
                        </div>

                        <div className="p-4 rounded-2xl border border-border/60 bg-card/40 backdrop-blur-sm flex flex-col items-center text-center">
                            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-3">
                                <Users size={20} />
                            </div>
                            <h3 className="text-sm font-semibold text-foreground">Placement Help</h3>
                            <p className="text-xs text-muted-foreground mt-1">Resume & Interview prep</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Brochure Visitor Form */}
            <BrochureForm urlName={name} urlMobile={mobile} />

            {/* Address & Contact Banner */}
            <AddressBanner
                addressLines={[
                    "Bethel House Near Naveen Vidhya Mandir School Napier Town Jabalpur, Madhya Pradesh",
                ]}
                phone="+91 96699 32121"
            />
        </main>
    );
}
