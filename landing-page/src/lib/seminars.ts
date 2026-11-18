const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api/v1";

/** One open seminar from GET /seminars/public. Edited in the software, never hard-coded here. */
export type Seminar = {
  id: string;
  title: string;
  description?: string | null;
  venue?: string | null;
  /** ISO timestamp (UTC). */
  startsAt: string;
  /** ISO timestamp: when attendees should report. Optional until every seminar sets it. */
  reportingAt?: string | null;
  /** ISO timestamp: when the seminar ends. */
  endsAt?: string | null;
  amountPaise: number;
  feeRupees: number;
  seatsLeft: number;
};

/** POST /seminars/:id/register. The backend decides the amount, never the site. */
export type SeminarOrder = {
  orderId: string;
  keyId: string;
  amountPaise: number;
  currency: string;
};

export type PaymentProof = {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
};

const TZ = "Asia/Kolkata";

/** "22 Nov 2026" */
export const formatSeminarDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: TZ,
  });

/** "3:00 PM" */
export const formatSeminarTime = (iso: string) =>
  new Date(iso)
    .toLocaleTimeString("en-IN", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZone: TZ,
    })
    .toUpperCase();

/** "3:00 PM – 4:00 PM", or just the start time when there is no end. */
export const formatSeminarTimeRange = (s: Pick<Seminar, "startsAt" | "endsAt">) =>
  s.endsAt
    ? `${formatSeminarTime(s.startsAt)} – ${formatSeminarTime(s.endsAt)}`
    : formatSeminarTime(s.startsAt);

/** Parts for the poster-style date block. */
export function seminarDateParts(iso: string) {
  const d = new Date(iso);
  const f = (o: Intl.DateTimeFormatOptions) =>
    d.toLocaleDateString("en-IN", { ...o, timeZone: TZ });
  return {
    day: f({ day: "numeric" }),
    month: f({ month: "short" }),
    year: f({ year: "numeric" }),
    weekday: f({ weekday: "long" }),
  };
}

// ── Server-side reads ────────────────────────────────────────────────

/** Open seminars. Short revalidate so seat counts stay roughly live. Returns [] on failure. */
export async function getSeminars(): Promise<Seminar[]> {
  try {
    const res = await fetch(`${API_URL}/seminars/public`, {
      next: { revalidate: 30 },
    });
    if (!res.ok) return [];
    const json = await res.json();
    return Array.isArray(json?.data) ? (json.data as Seminar[]) : [];
  } catch {
    return [];
  }
}

/** There is no single-seminar endpoint, so find it in the public list. */
export async function getSeminar(id: string): Promise<Seminar | null> {
  const all = await getSeminars();
  return all.find((s) => s.id === id) ?? null;
}

// ── Registration + payment (browser) ─────────────────────────────────

async function post<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const json = await res.json().catch(() => null);
  if (!res.ok || json?.success === false) {
    throw new Error(json?.message ?? "Something went wrong. Please try again.");
  }
  return (json?.data ?? json) as T;
}

/** Step 1: create the registration and Razorpay order. */
export const registerForSeminar = (
  seminarId: string,
  input: { name: string; mobile: string; email: string },
) =>
  post<SeminarOrder>(
    `/seminars/${encodeURIComponent(seminarId)}/register`,
    input,
  );

/** Step 2: backend verifies the Razorpay signature and confirms the seat. */
export const verifySeminarPayment = (proof: PaymentProof) =>
  post<unknown>("/seminars/verify", {
    orderId: proof.razorpay_order_id,
    paymentId: proof.razorpay_payment_id,
    signature: proof.razorpay_signature,
  });
