"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { isValidGmail, isValidPhone } from "@/lib/validation";
import { Download, CheckCircle2, Mail, Phone, User, ArrowRight, RefreshCw, FileText } from "lucide-react";
import Link from "next/link";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api/v1";

type Field = {
  name: string;
  email: string;
  phone: string;
};

const INITIAL: Field = {
  name: "",
  email: "",
  phone: "",
};

function inputClass(hasError: boolean) {
  return [
    "w-full rounded-xl border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground",
    "outline-none transition-all duration-200",
    "focus:ring-2 focus:ring-primary/40 focus:border-primary",
    hasError
      ? "border-red-400 focus:ring-red-300/40 focus:border-red-400"
      : "border-border hover:border-primary/30",
  ].join(" ");
}

async function downloadBrochureFile(
  url: string,
  fileName = "Vipprow-Digital-Marketing-Brochure.pdf",
) {
  try {
    const res = await fetch(url);
    const blob = await res.blob();
    const blobUrl = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = blobUrl;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(blobUrl);
    document.body.removeChild(a);
  } catch {
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
}

export function BrochureForm({
  urlName = "",
  urlMobile = "",
}: {
  urlName?: string;
  urlMobile?: string;
} = {}) {
  const [fields, setFields] = useState<Field>(() => ({
    ...INITIAL,
    name: urlName,
    phone: urlMobile ? urlMobile.replace(/\D/g, "").slice(0, 10) : "",
  }));
  const [errors, setErrors] = useState<Partial<Field>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string>(
    "https://res.cloudinary.com/vipprow/raw/upload/v1/brochures/digital-marketing-brochure.pdf",
  );

  function set(key: keyof Field, value: string) {
    setFields((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: "" }));
    if (apiError) setApiError(null);
  }

  function validate(): boolean {
    const next: Partial<Field> = {};

    // 1. Name validation
    if (!fields.name.trim()) {
      next.name = "Full name is required.";
    }

    // 2. Email validation (Gmail required)
    if (!fields.email.trim()) {
      next.email = "Email address is required.";
    } else if (!isValidGmail(fields.email)) {
      next.email = "Please enter a valid Gmail address (e.g. name@gmail.com).";
    }

    // 3. Phone validation (max 10 digits required)
    if (!fields.phone.trim()) {
      next.phone = "Phone number is required.";
    } else if (!isValidPhone(fields.phone)) {
      next.phone = "Phone number must be a valid 10-digit mobile number.";
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setApiError(null);

    try {
      // Backend API submission for Digital Marketing Brochure
      const res = await fetch(`${API_URL}/leads/download-brochure`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fields.name.trim(),
          mobile: fields.phone.trim(),
          email: fields.email.trim(),
          courseInterested: "Digital Marketing",
          source: "brochure_download",
          remarks:
            "Requested Digital Marketing course brochure via download page.",
        }),
      });



      const body = await res.json().catch(() => null);

      if (!res.ok || !body?.success) {
        setApiError(
          body?.message || "Failed to submit request. Please try again.",
        );
        return;
      }

      let finalUrl = downloadUrl;
      if (body?.brochureUrl) {
        finalUrl = body.brochureUrl;
        setDownloadUrl(body.brochureUrl);
      }

      setSubmitted(true);
      // Automatically trigger direct PDF file download
      downloadBrochureFile(finalUrl);
    } catch {
      setApiError("Unable to connect to the server. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="py-12 md:py-20 relative">
      <div className="max-w-4xl mx-auto px-3 sm:px-6">
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div
              key="brochure-form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="rounded-3xl border border-border/80 bg-card/60 backdrop-blur-xl p-6 sm:p-10 shadow-2xl relative overflow-hidden"
            >
              {/* Subtle top glow line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/20 via-primary to-primary/20" />

              <div className="mb-8 text-center sm:text-left">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 mb-3">
                  <Download size={14} /> Official Digital Marketing Brochure
                </span>
                <h2 className="text-2xl sm:text-3xl font-heading font-bold text-foreground tracking-tight">
                  Download Digital Marketing Course Brochure
                </h2>
                <p className="text-muted-foreground text-sm sm:text-base mt-2">
                  Fill out your details below to get instant access to our comprehensive Digital Marketing Mastery brochure with full module breakdown, fee structure, and career roadmap.
                </p>
              </div>

              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                {/* Name field */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5 flex items-center gap-1.5">
                    <User size={15} className="text-primary" />
                    Full Name <span className="text-primary">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Rahul Verma"
                    value={fields.name}
                    onChange={(e) => set("name", e.target.value)}
                    className={inputClass(!!errors.name)}
                  />
                  {errors.name && (
                    <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.name}</p>
                  )}
                </div>

                {/* Email & Phone grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Gmail field */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5 flex items-center gap-1.5">
                      <Mail size={15} className="text-primary" />
                      Gmail Address <span className="text-primary">*</span>
                    </label>
                    <input
                      type="email"
                      placeholder="yourname@gmail.com"
                      value={fields.email}
                      onChange={(e) => set("email", e.target.value)}
                      className={inputClass(!!errors.email)}
                    />
                    {errors.email && (
                      <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.email}</p>
                    )}
                    <span className="text-[11px] text-muted-foreground mt-1 block">
                      Must be a valid Gmail account (@gmail.com)
                    </span>
                  </div>

                  {/* Phone field */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5 flex items-center gap-1.5">
                      <Phone size={15} className="text-primary" />
                      Phone Number <span className="text-primary">*</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="10-digit mobile number"
                      maxLength={10}
                      value={fields.phone}
                      onChange={(e) => set("phone", e.target.value.replace(/\D/g, "").slice(0, 10))}
                      className={inputClass(!!errors.phone)}
                    />
                    {errors.phone && (
                      <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.phone}</p>
                    )}
                    <span className="text-[11px] text-muted-foreground mt-1 block">
                      Maximum 10 digits
                    </span>
                  </div>
                </div>

                {apiError && (
                  <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium">
                    {apiError}
                  </div>
                )}

                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    disabled={submitting}
                    className="w-full justify-center text-base font-semibold py-4"
                  >
                    {submitting ? (
                      <span className="flex items-center gap-2">
                        <RefreshCw className="animate-spin" size={18} /> Processing...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Download size={18} /> Access Now
                      </span>
                    )}
                  </Button>
                </div>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="brochure-success"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="rounded-3xl border border-primary/30 bg-card/80 backdrop-blur-xl p-5 sm:p-10 text-center shadow-2xl relative overflow-hidden"
            >
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 flex items-center justify-center mx-auto mb-6 shadow-inner">
                <CheckCircle2 size={36} />
              </div>

              {/* <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-500/10 mb-2">
                Brochure Ready
              </span> */}

              <h2 className="text-2xl sm:text-4xl font-heading font-bold text-foreground tracking-tight mb-3">
                Your Brochure is Ready!
              </h2>

              <p className="text-muted-foreground text-base max-w-lg mx-auto leading-relaxed mb-6">
                Thank you <strong className="text-foreground">{fields.name}</strong>! You can download or view the <strong className="text-foreground">Digital Marketing Mastery</strong> course brochure directly using the button below:
              </p>

              <div className="flex flex-col items-center justify-center bg-card border border-border/80 rounded-2xl p-4 sm:p-6 mb-8 text-left max-w-xl mx-auto space-y-4 shadow-sm overflow-hidden">
                <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <FileText size={16} className="text-primary shrink-0" />
                  Instant Brochure Download
                </h3>
                <p className="text-xs text-muted-foreground text-center">
                  Click below to open and download the official PDF brochure:
                </p>

                <div className="pt-1">
                  <button
                    type="button"
                    onClick={() => downloadBrochureFile(downloadUrl)}
                  // className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3.5 sm:p-4 rounded-xl border border-primary/40 bg-primary/10 hover:bg-primary/20 transition-all text-sm font-semibold text-primary group shadow-sm overflow-hidden text-left cursor-pointer"
                  >
                    {/* <div className="flex items-center gap-2.5 min-w-0 w-full sm:w-auto">
                      <FileText size={18} className="shrink-0 text-primary" />
                      <span className="truncate min-w-0 text-foreground font-semibold text-xs sm:text-sm">
                        Digital Marketing Brochure (PDF)
                      </span>
                    </div> */}
                    <span className="inline-flex items-center justify-center gap-1.5 bg-primary text-white px-3.5 py-2.5 rounded-lg text-xs font-bold group-hover:scale-[1.02] transition-transform shrink-0 w-full sm:w-auto">
                      <Download size={14} className="shrink-0" /> Download PDF
                    </span>
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/demo-class">
                  <Button variant="primary" size="md" className="w-full sm:w-auto">
                    Book Free Demo Class <ArrowRight size={16} className="ml-1" />
                  </Button>
                </Link>
                {/* <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFields(INITIAL);
                  }}
                  className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-4 transition-colors"
                >
                  Submit another request
                </button> */}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
