"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:7000";

const COURSES = [
  { value: "digital-marketing", label: "Digital Marketing" },
  { value: "performance-marketing", label: "Performance Marketing" },
];

const QUALIFICATIONS = [
  { value: "high-school", label: "High School (10th / 12th)" },
  { value: "undergraduate", label: "Undergraduate (pursuing)" },
  { value: "graduate", label: "Graduate / Post-Graduate" },
  { value: "working", label: "Working Professional" },
  { value: "other", label: "Other" },
];

type Field = {
  name: string;
  email: string;
  phone: string;
  course: string;
  qualification: string;
  city: string;
  state: string;
  message: string;
};

const INITIAL: Field = {
  name: "",
  email: "",
  phone: "",
  course: "",
  qualification: "",
  city: "",
  state: "",
  message: "",
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

export function EnrollForm() {
  const [fields, setFields] = useState<Field>(INITIAL);
  const [errors, setErrors] = useState<Partial<Field>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  function set(key: keyof Field, value: string) {
    setFields((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: "" }));
    if (apiError) setApiError(null);
  }

  function validate(): boolean {
    const next: Partial<Field> = {};
    if (!fields.name.trim()) next.name = "Full name is required.";
    if (!fields.email.trim()) {
      next.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
      next.email = "Enter a valid email address.";
    }
    if (!fields.phone.trim()) {
      next.phone = "Phone number is required.";
    } else if (!/^[6-9]\d{9}$/.test(fields.phone.replace(/\s+/g, ""))) {
      next.phone = "Enter a valid 10-digit Indian mobile number.";
    }
    if (!fields.course) next.course = "Please select a course.";
    if (!fields.qualification)
      next.qualification = "Please select your qualification.";
    if (!fields.city.trim()) next.city = "City is required.";
    if (!fields.state.trim()) next.state = "State is required.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setApiError(null);

    try {
      const res = await fetch(`${API_URL}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "Enrollment",
          name: fields.name.trim(),
          email: fields.email.trim(),
          phone: fields.phone.trim(),
          course: fields.course,
          qualification: fields.qualification,
          city: fields.city.trim(),
          state: fields.state.trim() || undefined,
          message: fields.message.trim() || undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setApiError(data?.message ?? "Something went wrong. Please try again.");
        return;
      }

      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setApiError(
        "Unable to reach the server. Please check your connection and try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <section className="pb-24 px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-xl mx-auto text-center bg-card border border-border rounded-2xl p-12 shadow-sm"
        >
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-8 h-8 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-3">
            Application Received!
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Thank you,{" "}
            <span className="text-foreground font-medium">
              {fields.name.split(" ")[0]}
            </span>
            . Our admissions team will reach out to you at{" "}
            <span className="text-primary">{fields.email}</span> soon.
          </p>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="pb-24 px-6">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className="max-w-2xl mx-auto bg-card border border-border rounded-2xl p-8 md:p-12 shadow-sm"
      >
        <form onSubmit={handleSubmit} noValidate className="space-y-6">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Full Name <span className="text-primary">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Arjun Sharma"
              value={fields.name}
              onChange={(e) => set("name", e.target.value)}
              className={inputClass(!!errors.name)}
            />
            {errors.name && (
              <p className="mt-1.5 text-xs text-red-500">{errors.name}</p>
            )}
          </div>

          {/* Email + Phone row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Email Address <span className="text-primary">*</span>
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                value={fields.email}
                onChange={(e) => set("email", e.target.value)}
                className={inputClass(!!errors.email)}
              />
              {errors.email && (
                <p className="mt-1.5 text-xs text-red-500">{errors.email}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Phone Number <span className="text-primary">*</span>
              </label>
              <input
                type="tel"
                placeholder="10-digit mobile number"
                maxLength={10}
                value={fields.phone}
                onChange={(e) =>
                  set("phone", e.target.value.replace(/\D/g, ""))
                }
                className={inputClass(!!errors.phone)}
              />
              {errors.phone && (
                <p className="mt-1.5 text-xs text-red-500">{errors.phone}</p>
              )}
            </div>
          </div>

          {/* Course Interest */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Course Interest <span className="text-primary">*</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {COURSES.map((c) => (
                <button
                  key={c.value}
                  type="button"
                  onClick={() => set("course", c.value)}
                  className={[
                    "rounded-xl border px-4 py-3.5 text-sm text-left transition-all duration-200 cursor-pointer",
                    fields.course === c.value
                      ? "border-primary bg-primary/8 text-foreground font-medium"
                      : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground",
                    errors.course && fields.course !== c.value
                      ? "border-red-400"
                      : "",
                  ].join(" ")}
                >
                  <span className="block font-medium text-[13px]">
                    {c.label}
                  </span>
                </button>
              ))}
            </div>
            {errors.course && (
              <p className="mt-1.5 text-xs text-red-500">{errors.course}</p>
            )}
          </div>

          {/* Qualification */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Current Qualification <span className="text-primary">*</span>
            </label>
            <select
              value={fields.qualification}
              onChange={(e) => set("qualification", e.target.value)}
              className={[
                inputClass(!!errors.qualification),
                "appearance-none cursor-pointer",
              ].join(" ")}
            >
              <option value="" disabled>
                Select your qualification
              </option>
              {QUALIFICATIONS.map((q) => (
                <option key={q.value} value={q.value}>
                  {q.label}
                </option>
              ))}
            </select>
            {errors.qualification && (
              <p className="mt-1.5 text-xs text-red-500">
                {errors.qualification}
              </p>
            )}
          </div>

          {/* City + State row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                City <span className="text-primary">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Jabalpur"
                value={fields.city}
                onChange={(e) => set("city", e.target.value)}
                className={inputClass(!!errors.city)}
              />
              {errors.city && (
                <p className="mt-1.5 text-xs text-red-500">{errors.city}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                State <span className="text-primary">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Madhya Pradesh"
                value={fields.state}
                onChange={(e) => set("state", e.target.value)}
                className={inputClass(!!errors.state)}
              />
              {errors.state && (
                <p className="mt-1.5 text-xs text-red-500">{errors.state}</p>
              )}
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Tell us about yourself{" "}
              <span className="text-muted-foreground font-normal">
                (optional)
              </span>
            </label>
            <textarea
              rows={4}
              placeholder="Your goals, background, or anything you'd like us to know..."
              value={fields.message}
              onChange={(e) => set("message", e.target.value)}
              className={[inputClass(false), "resize-none"].join(" ")}
            />
          </div>

          {/* API-level error */}
          {apiError && (
            <div className="rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-600">
              {apiError}
            </div>
          )}

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full"
            disabled={submitting}
          >
            {submitting ? (
              <span className="flex items-center gap-2">
                <svg
                  className="animate-spin w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  />
                </svg>
                Submitting…
              </span>
            ) : (
              "Submit Application →"
            )}
          </Button>

          <p className="text-center text-xs text-muted-foreground">
            By submitting, you agree to be contacted by the Vipprow Academy
            admissions team.
          </p>
        </form>
      </motion.div>
    </section>
  );
}
