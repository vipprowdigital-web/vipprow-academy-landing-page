"use client";
import { useState } from "react";
import Script from "next/script";
import { CheckCircle2, Loader2, Lock } from "lucide-react";
import { isValidPhone } from "@/lib/validation";
import {
  formatSeminarDate,
  formatSeminarTime,
  registerForSeminar,
  verifySeminarPayment,
  type PaymentProof,
  type Seminar,
} from "@/lib/seminars";

// No `amount`/`currency` here on purpose: the order already carries the
// backend-set amount, and the site must never send one.
type RazorpayOptions = {
  key: string;
  order_id: string;
  name: string;
  description: string;
  prefill: { name: string; email: string; contact: string };
  theme: { color: string };
  handler: (proof: PaymentProof) => void;
  modal: { ondismiss: () => void };
};
declare global {
  interface Window {
    Razorpay?: new (o: RazorpayOptions) => { open: () => void };
  }
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const inputCls = (err?: string) =>
  [
    "w-full rounded-xl border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-all duration-200",
    "focus:ring-2 focus:ring-primary/40 focus:border-primary",
    err ? "border-red-400" : "border-border hover:border-primary/30",
  ].join(" ");

type Fields = { name: string; email: string; mobile: string };

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-err`} className="mt-1 text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}

export function SeminarRegister({ seminar }: { seminar: Seminar }) {
  const [f, setF] = useState<Fields>({ name: "", email: "", mobile: "" });
  const [errors, setErrors] = useState<Partial<Fields>>({});
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paymentId, setPaymentId] = useState<string | null>(null);

  const soldOut = seminar.seatsLeft <= 0;

  const set = (k: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setF((p) => ({ ...p, [k]: e.target.value }));
    setErrors((p) => ({ ...p, [k]: undefined }));
    setError(null);
  };

  const validate = () => {
    const e: Partial<Fields> = {};
    if (f.name.trim().length < 2) e.name = "Please enter your full name";
    if (!EMAIL_RE.test(f.email.trim())) e.email = "Enter a valid email address";
    if (!isValidPhone(f.mobile)) e.mobile = "Enter a valid 10-digit mobile number";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  async function onSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    if (busy || soldOut || !validate()) return;
    if (!window.Razorpay) {
      setError("Payment is still loading. Please try again in a moment.");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const order = await registerForSeminar(seminar.id, {
        name: f.name.trim(),
        mobile: f.mobile.replace(/\D/g, ""),
        email: f.email.trim(),
      });

      new window.Razorpay({
        key: order.keyId,
        order_id: order.orderId,
        name: "Vipprow Academy",
        description: seminar.title,
        prefill: { name: f.name, email: f.email, contact: f.mobile },
        theme: { color: "#06002e" },
        modal: { ondismiss: () => setBusy(false) },
        handler: async (proof) => {
          try {
            await verifySeminarPayment(proof);
            setPaymentId(proof.razorpay_payment_id);
          } catch (err) {
            setError(
              (err instanceof Error ? err.message : "Verification failed.") +
                ` Your payment ID is ${proof.razorpay_payment_id}. Please contact us and we will confirm your seat.`,
            );
          } finally {
            setBusy(false);
          }
        },
      }).open();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setBusy(false);
    }
  }

  if (paymentId) {
    return (
      <div
        role="status"
        className="rounded-3xl border border-border bg-card p-8 text-center sm:p-12"
      >
        <CheckCircle2 className="mx-auto text-emerald-500" size={48} aria-hidden="true" />
        <h3 className="mt-5 font-heading text-2xl font-semibold tracking-tight">
          Thank you, your seat is confirmed
        </h3>
        <p className="mx-auto mt-3 max-w-md text-muted-foreground">
          See you on {formatSeminarDate(seminar.startsAt)}
          {seminar.reportingAt
            ? `. Please report by ${formatSeminarTime(seminar.reportingAt)}`
            : ""}
          . A confirmation will be sent to {f.email}.
        </p>
        <p className="mt-4 text-xs text-muted-foreground">
          Payment ID: {paymentId}
        </p>
      </div>
    );
  }

  if (soldOut) {
    return (
      <div className="rounded-3xl border border-border bg-card p-8 text-center sm:p-12">
        <h3 className="font-heading text-2xl font-semibold tracking-tight">
          This seminar is full
        </h3>
        <p className="mx-auto mt-3 max-w-md text-muted-foreground">
          All seats are taken. Check the other seminars for upcoming sessions.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="rounded-3xl border border-border bg-card p-6 shadow-[0_30px_60px_-40px_rgba(6,0,46,0.35)] sm:p-10"
    >
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />

      <div className="grid gap-5">
        <Field id="sem-name" label="Full name" error={errors.name}>
          <input
            id="sem-name"
            autoComplete="name"
            value={f.name}
            onChange={set("name")}
            className={inputCls(errors.name)}
            placeholder="Your name"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "sem-name-err" : undefined}
          />
        </Field>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field id="sem-email" label="Email" error={errors.email}>
            <input
              id="sem-email"
              type="email"
              autoComplete="email"
              value={f.email}
              onChange={set("email")}
              className={inputCls(errors.email)}
              placeholder="you@example.com"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "sem-email-err" : undefined}
            />
          </Field>
          <Field id="sem-mobile" label="Mobile number" error={errors.mobile}>
            <input
              id="sem-mobile"
              type="tel"
              inputMode="numeric"
              autoComplete="tel-national"
              maxLength={10}
              value={f.mobile}
              onChange={set("mobile")}
              className={inputCls(errors.mobile)}
              placeholder="10-digit number"
              aria-invalid={!!errors.mobile}
              aria-describedby={errors.mobile ? "sem-mobile-err" : undefined}
            />
          </Field>
        </div>
      </div>

      {error && (
        <p
          role="alert"
          className="mt-5 rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={busy}
        className="mt-7 inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-[#06002e] px-8 text-base font-medium text-white transition-[background-color,transform] duration-300 hover:bg-[#1a1659] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#06002e]"
      >
        {busy ? (
          <>
            <Loader2 size={18} className="animate-spin" aria-hidden="true" />
            Processing…
          </>
        ) : (
          <>Pay ₹{seminar.feeRupees} &amp; reserve my seat</>
        )}
      </button>
      <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
        <Lock size={12} aria-hidden="true" /> Secure payment via Razorpay ·{" "}
        {seminar.seatsLeft} {seminar.seatsLeft === 1 ? "seat" : "seats"} left
      </p>
    </form>
  );
}
