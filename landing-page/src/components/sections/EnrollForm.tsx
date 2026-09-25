"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { isValidGmail, isValidPhone } from "@/lib/validation";
import { usePublicCourses } from "@/hooks/usePublicCourses";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api/v1";

const QUALIFICATIONS = [
  { value: "high_school", label: "High School (10th / 12th)" },
  { value: "undergraduate", label: "Undergraduate (pursuing)" },
  { value: "graduate", label: "Graduate / Post-Graduate" },
  { value: "fresher", label: "Fresher" },
  { value: "working_professional", label: "Working Professional" },
];

const MAX_FILE_SIZE_MB = 5;
const ACCEPTED_FILE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/pdf",
];

type Field = {
  studentName: string;
  email: string;
  mobile: string;
  dateOfBirth: string;
  address: string;
  city: string;
  state: string;
  respondentType: string;
  courseName: string;
};

const INITIAL: Field = {
  studentName: "",
  email: "",
  mobile: "",
  dateOfBirth: "",
  address: "",
  city: "",
  state: "",
  respondentType: "",
  courseName: "",
};

type EnrollContext = {
  branchName: string;
  city: string | null;
  businessName: string | null;
  leadFound: boolean;
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

export function EnrollForm({
  branchId,
  leadId,
  urlName,
  urlMobile,
}: {
  branchId?: string;
  leadId?: string;
  urlName?: string;
  urlMobile?: string;
} = {}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fields, setFields] = useState<Field>(() => ({
    ...INITIAL,
    studentName: urlName ?? "",
    mobile: urlMobile ? urlMobile.replace(/\D/g, "") : "",
  }));
  const [documentFile, setDocumentFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<
    Partial<Record<keyof Field | "document", string>>
  >({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const [enrollContext, setEnrollContext] = useState<EnrollContext | null>(
    null,
  );
  const [contextLoading, setContextLoading] = useState(!!leadId);
  const [contextError, setContextError] = useState<string | null>(null);

  const {
    courses,
    loading: coursesLoading,
    fromApi: coursesFromApi,
  } = usePublicCourses(branchId);
  const [leadCourseName, setLeadCourseName] = useState("");

  // The user's pick wins; otherwise pre-select the course a known lead wanted
  const selectedCourse =
    fields.courseName ||
    (leadCourseName
      ? (courses.find(
          (c) => c.label.toLowerCase() === leadCourseName.toLowerCase(),
        )?.value ?? "")
      : "");

  useEffect(() => {
    if (!leadId) return;

    let cancelled = false;

    (async () => {
      try {
        const params = new URLSearchParams({ leadId });
        if (branchId) params.set("branchId", branchId);

        const res = await fetch(
          `${API_URL}/admissions/enroll/context?${params.toString()}`,
        );
        const json = await res.json();
        if (cancelled) return;

        if (!res.ok || !json?.success) {
          setContextError(
            json?.message ?? "We couldn't load your enrollment details.",
          );
          return;
        }

        const { data } = json;
        setEnrollContext({
          branchName: data.branchName,
          city: data.city ?? null,
          businessName: data.businessName ?? null,
          leadFound: !!data.lead,
        });

        if (data.lead) {
          setFields((prev) => ({
            ...prev,
            studentName: data.lead.name || prev.studentName,
            email: data.lead.email || prev.email,
            mobile: data.lead.mobile || prev.mobile,
          }));
          setLeadCourseName(String(data.lead.courseInterested ?? ""));
        }
      } catch {
        if (!cancelled) {
          setContextError("We couldn't load your enrollment details.");
        }
      } finally {
        if (!cancelled) setContextLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [leadId, branchId]);

  function set(key: keyof Field, value: string) {
    setFields((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: "" }));
    if (apiError) setApiError(null);
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    if (apiError) setApiError(null);

    if (!file) {
      setDocumentFile(null);
      return;
    }

    if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
      setErrors((prev) => ({
        ...prev,
        document: "Only JPG, PNG, or PDF files are allowed.",
      }));
      setDocumentFile(null);
      e.target.value = "";
      return;
    }

    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      setErrors((prev) => ({
        ...prev,
        document: `File must be under ${MAX_FILE_SIZE_MB}MB.`,
      }));
      setDocumentFile(null);
      e.target.value = "";
      return;
    }

    setErrors((prev) => ({ ...prev, document: "" }));
    setDocumentFile(file);
  }

  function removeDocument() {
    setDocumentFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function validate(): boolean {
    const next: Partial<Record<keyof Field | "document", string>> = {};
    if (!fields.studentName.trim()) next.studentName = "Full name is required.";
    if (!fields.email.trim()) {
      next.email = "Email address is required.";
    } else if (!isValidGmail(fields.email)) {
      next.email = "Must be a valid Gmail address (e.g. name@gmail.com).";
    }
    if (!fields.mobile.trim()) {
      next.mobile = "Phone number is required.";
    } else if (!isValidPhone(fields.mobile)) {
      next.mobile = "Phone number must be a valid 10-digit mobile number.";
    }
    if (!fields.dateOfBirth) next.dateOfBirth = "Date of birth is required.";
    if (!selectedCourse) next.courseName = "Please select a course.";
    if (!fields.respondentType)
      next.respondentType = "Please select your qualification.";
    if (!fields.city.trim()) next.city = "City is required.";
    if (!fields.state.trim()) next.state = "State is required.";
    if (!documentFile) next.document = "Please upload a valid ID document.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setApiError(null);

    try {
      const formData = new FormData();
      formData.append("name", fields.studentName.trim());
      formData.append("mobile", fields.mobile.trim());
      if (fields.email.trim()) formData.append("email", fields.email.trim());
      formData.append("dateOfBirth", fields.dateOfBirth);
      if (fields.address.trim())
        formData.append("address", fields.address.trim());
      formData.append("city", fields.city.trim());
      formData.append("state", fields.state.trim());
      formData.append("respondentType", fields.respondentType);
      if (coursesFromApi) {
        formData.append("courseId", selectedCourse);
      } else {
        formData.append(
          "courseName",
          courses.find((c) => c.value === selectedCourse)?.label ??
            selectedCourse,
        );
      }
      formData.append("source", "website");
      if (documentFile) formData.append("document", documentFile);
      if (branchId) formData.append("branchId", branchId);
      if (leadId) formData.append("leadId", leadId);

      const res = await fetch(`${API_URL}/admissions/enroll`, {
        method: "POST",
        body: formData,
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
              {fields.studentName.split(" ")[0]}
            </span>
            . Our admissions team will review your documents and reach out to
            you at <span className="text-primary">{fields.mobile}</span> soon.
          </p>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="pb-24 px-3 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className="max-w-2xl mx-auto bg-card border border-border rounded-2xl px-4 py-6 sm:p-8 md:p-12 shadow-sm"
      >
        {leadId && contextLoading && (
          <div className="mb-6 rounded-xl border border-border bg-muted/40 px-4 py-3 text-sm text-muted-foreground">
            Loading your enrollment details…
          </div>
        )}

        {contextError && (
          <div className="mb-6 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-700">
            {contextError}
          </div>
        )}

        {enrollContext && (
          <div className="mb-6 rounded-xl border border-primary/30 bg-primary/8 px-4 py-3 text-sm text-foreground">
            You&apos;re enrolling with{" "}
            <span className="font-medium">
              {enrollContext.businessName ?? enrollContext.branchName}
            </span>{" "}
            — {enrollContext.branchName}
            {enrollContext.city ? `, ${enrollContext.city}` : ""}.
            {enrollContext.leadFound && (
              <span> We&apos;ve pre-filled your details below.</span>
            )}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="space-y-6">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Full Name <span className="text-primary">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Arjun Sharma"
              value={fields.studentName}
              onChange={(e) => set("studentName", e.target.value)}
              className={inputClass(!!errors.studentName)}
            />
            {errors.studentName && (
              <p className="mt-1.5 text-xs text-red-500">
                {errors.studentName}
              </p>
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
                placeholder="you@gmail.com"
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
                value={fields.mobile}
                onChange={(e) =>
                  set("mobile", e.target.value.replace(/\D/g, ""))
                }
                className={inputClass(!!errors.mobile)}
              />
              {errors.mobile && (
                <p className="mt-1.5 text-xs text-red-500">{errors.mobile}</p>
              )}
            </div>
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Date of Birth <span className="text-primary">*</span>
            </label>
            <input
              type="date"
              value={fields.dateOfBirth}
              max={new Date().toISOString().split("T")[0]}
              onChange={(e) => set("dateOfBirth", e.target.value)}
              className={[
                inputClass(!!errors.dateOfBirth),
                "cursor-pointer",
              ].join(" ")}
            />
            {errors.dateOfBirth && (
              <p className="mt-1.5 text-xs text-red-500">
                {errors.dateOfBirth}
              </p>
            )}
          </div>

          {/* Course Interest */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Course Interest <span className="text-primary">*</span>
            </label>
            <div className="relative">
              <select
                value={selectedCourse}
                onChange={(e) => set("courseName", e.target.value)}
                disabled={coursesLoading}
                className={[
                  inputClass(!!errors.courseName),
                  "appearance-none cursor-pointer pr-10",
                ].join(" ")}
              >
                <option value="" disabled>
                  {coursesLoading ? "Loading courses…" : "Select a course"}
                </option>
                {courses.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.duration ? `${c.label} (${c.duration})` : c.label}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={16}
                aria-hidden="true"
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
            </div>
            {errors.courseName && (
              <p className="mt-1.5 text-xs text-red-500">{errors.courseName}</p>
            )}
          </div>

          {/* Qualification */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Current Qualification <span className="text-primary">*</span>
            </label>
            <div className="relative">
              <select
                value={fields.respondentType}
                onChange={(e) => set("respondentType", e.target.value)}
                className={[
                  inputClass(!!errors.respondentType),
                  "appearance-none cursor-pointer pr-10",
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
              <ChevronDown
                size={16}
                aria-hidden="true"
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
            </div>
            {errors.respondentType && (
              <p className="mt-1.5 text-xs text-red-500">
                {errors.respondentType}
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

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Address{" "}
              <span className="text-muted-foreground font-normal">
                (optional)
              </span>
            </label>
            <textarea
              rows={3}
              placeholder="House no., street, locality..."
              value={fields.address}
              onChange={(e) => set("address", e.target.value)}
              className={[inputClass(false), "resize-none"].join(" ")}
            />
          </div>

          {/* Document Upload */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              ID Document (Aadhar Card, etc.){" "}
              <span className="text-primary">*</span>
            </label>
            <input
              ref={fileInputRef}
              type="file"
              accept={ACCEPTED_FILE_TYPES.join(",")}
              onChange={handleFileChange}
              className="hidden"
              id="document-upload"
            />
            {documentFile ? (
              <div
                className={[
                  "flex items-center justify-between gap-3 rounded-xl border px-4 py-3",
                  errors.document ? "border-red-400" : "border-border",
                ].join(" ")}
              >
                <span className="text-sm text-foreground truncate">
                  {documentFile.name}
                </span>
                <button
                  type="button"
                  onClick={removeDocument}
                  className="text-xs font-medium text-red-500 hover:text-red-600 cursor-pointer shrink-0"
                >
                  Remove
                </button>
              </div>
            ) : (
              <label
                htmlFor="document-upload"
                className={[
                  "flex flex-col items-center justify-center gap-1.5 rounded-xl border border-dashed px-4 py-6 text-center cursor-pointer transition-all duration-200",
                  errors.document
                    ? "border-red-400"
                    : "border-border hover:border-primary/40",
                ].join(" ")}
              >
                <span className="text-sm text-foreground font-medium">
                  Click to upload your document
                </span>
                <span className="text-xs text-muted-foreground">
                  JPG, PNG, or PDF — up to {MAX_FILE_SIZE_MB}MB
                </span>
              </label>
            )}
            {errors.document && (
              <p className="mt-1.5 text-xs text-red-500">{errors.document}</p>
            )}
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
