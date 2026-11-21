import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | Vipprow Academy",
  description:
    "What personal data Vipprow Academy collects through its forms, why we collect it, and your rights under the Digital Personal Data Protection Act, 2023.",
  alternates: { canonical: "/privacy-policy" },
};

const EMAIL = "vipprowacademy@gmail.com";
const UPDATED = "21 November 2026";

type Form = {
  name: string;
  where: string;
  data: string[];
  why: string;
};

const FORMS: Form[] = [
  {
    name: "Demo class booking",
    where: "/demo-class",
    data: [
      "Full name, mobile number, email address",
      "City and state",
      "Whether you are a student, working professional, etc.",
      "Preferred demo date and time slot",
      "Course of interest",
      "Any message you choose to write",
    ],
    why: "To contact you, schedule your demo class, send the booking confirmation and reminders, and prepare the session for your background and goals.",
  },
  {
    name: "Admission (enrolment)",
    where: "/enroll",
    data: [
      "Student's full name, mobile number, email address",
      "Date of birth",
      "Address, city and state",
      "Whether you are a student, working professional, etc.",
      "Course you want to join",
      "A copy of an ID document (JPG, PNG or PDF)",
    ],
    why: "To process your admission, verify your identity and age, issue fee receipts and certificates, and contact you about your batch. Date of birth also tells us whether a parent or guardian must give consent (see “Children”).",
  },
  {
    name: "Brochure download",
    where: "/download-brochure",
    data: ["Name, email address, mobile number", "Course you asked about"],
    why: "To send you the brochure, and to follow up with course, fee and batch details you asked for.",
  },
  {
    name: "Seminar registration and payment",
    where: "/seminars",
    data: [
      "Name, email address, mobile number",
      "Payment reference and status (see “Payments”)",
    ],
    why: "To reserve your seat, take the seminar fee, send your confirmation and joining details, and keep a record of your payment.",
  },
];

const RIGHTS: [string, string][] = [
  [
    "Know",
    "Ask for a summary of the personal data we hold about you, what we do with it, and who we share it with.",
  ],
  [
    "Correct and update",
    "Ask us to fix inaccurate or incomplete data, or to complete it.",
  ],
  [
    "Erase",
    "Ask us to delete your data once it is no longer needed for the purpose you gave it, unless the law requires us to keep it.",
  ],
  [
    "Withdraw consent",
    "Withdraw the consent you gave at any time. It is as easy to withdraw as it was to give. Withdrawal does not affect what we did before, and we may not be able to continue a service that needs the data.",
  ],
  [
    "Grievance redressal",
    "Complain to us about how your data is handled and get a reply, before you approach the Data Protection Board.",
  ],
  [
    "Nominate",
    "Nominate another person to exercise these rights for you if you die or become unable to do so.",
  ],
];

const TOC: [string, string][] = [
  ["who", "Who we are"],
  ["collect", "What we collect and why"],
  ["consent", "Consent and lawful use"],
  ["payments", "Payments"],
  ["tracking", "Analytics and cookies"],
  ["sharing", "Who we share it with"],
  ["retention", "How long we keep it"],
  ["children", "Children"],
  ["security", "Security"],
  ["rights", "Your rights"],
  ["grievance", "Contact and grievances"],
  ["changes", "Changes to this policy"],
];

function H2({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2
      id={id}
      className="mt-14 scroll-mt-28 font-heading text-2xl font-semibold tracking-[-0.03em] sm:text-3xl"
    >
      {children}
    </h2>
  );
}

const P = "mt-4 leading-relaxed text-foreground/80";
const UL =
  "mt-4 list-disc space-y-2 pl-5 text-foreground/80 marker:text-primary";
const LINK = "text-primary underline underline-offset-4";

export default function PrivacyPolicyPage() {
  return (
    <main>
      <section className="section-light w-full bg-white! pt-28 pb-16 md:pt-36 md:pb-24">
        <div className="mx-auto max-w-3xl px-5 sm:px-6">
          <p className="font-heading text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Legal
          </p>
          <h1 className="mt-4 font-heading text-[clamp(2.2rem,5vw,3.5rem)] leading-[1.05] font-semibold tracking-[-0.035em] text-balance">
            Privacy Policy
          </h1>
          <p className="mt-4 text-sm text-muted-foreground">
            Last updated: <time dateTime="2026-11-21">{UPDATED}</time>
          </p>
          <p className={`${P} text-lg`}>
            This page explains what personal data Vipprow Academy collects
            through the forms on this website, why we collect it, and what
            control you have over it. It is written to follow the Digital
            Personal Data Protection Act, 2023 (the “DPDP Act”) and the rules
            made under it.
          </p>

          <nav
            aria-label="On this page"
            className="mt-8 rounded-2xl border border-border bg-muted/40 p-5"
          >
            <p className="text-sm font-semibold">On this page</p>
            <ol className="mt-3 grid gap-x-6 gap-y-1.5 text-sm text-muted-foreground sm:grid-cols-2">
              {TOC.map(([id, label]) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className="transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <H2 id="who">Who we are</H2>
          <p className={P}>
            Vipprow Academy, Bethel House, near Naveen Vidhya Mandir School,
            Napier Town, Jabalpur, Madhya Pradesh 482001, runs this website. For
            the purposes of the DPDP Act we are the “Data Fiduciary”: we decide
            why and how your personal data is processed. You are the “Data
            Principal”.
          </p>

          <H2 id="collect">What we collect and why</H2>
          <p className={P}>
            We collect only what each form needs. We do not ask for data we have
            no use for, and we do not buy personal data about you from anyone
            else.
          </p>
          <div className="mt-6 space-y-5">
            {FORMS.map((f) => (
              <article
                key={f.name}
                className="rounded-2xl border border-border p-6"
              >
                <h3 className="font-heading text-lg font-semibold tracking-[-0.02em]">
                  {f.name}{" "}
                  <Link
                    href={f.where}
                    className="text-sm font-normal text-primary underline-offset-4 hover:underline"
                  >
                    {f.where}
                  </Link>
                </h3>
                <p className="mt-4 text-sm font-semibold">What we collect</p>
                <ul className={UL}>
                  {f.data.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
                <p className="mt-4 text-sm font-semibold">Why</p>
                <p className="mt-1 leading-relaxed text-foreground/80">
                  {f.why}
                </p>
              </article>
            ))}
          </div>
          <p className={P}>
            Fields such as the free-text message are optional and entirely up to
            you. Please do not put sensitive details in them (for example health
            or financial information). We use your contact details only for the
            purpose you gave them and for closely related communication about
            the course or event you asked about.
          </p>

          <H2 id="consent">Consent and lawful use</H2>
          <p className={P}>
            We process your data on the basis of your consent, which you give by
            filling in and submitting a form. The purpose of each form is
            described above. We also process data where the DPDP Act allows it
            without consent, for example to comply with a legal obligation or to
            respond to a request you made yourself. We will ask for fresh
            consent before using your data for a new purpose.
          </p>

          <H2 id="payments">Payments</H2>
          <p className={P}>
            Seminar fees are paid through Razorpay. Your card, UPI or bank
            details are entered in Razorpay&apos;s payment window and are
            handled by Razorpay under its own privacy policy. We never see or
            store them. We receive only your payment ID and whether the payment
            succeeded, so we can confirm your seat.
          </p>

          <H2 id="tracking">Analytics and cookies</H2>
          <p className={P}>
            This website uses Google Tag Manager and Meta (Facebook) Pixel to
            understand how visitors use the site and to measure our advertising.
            These tools may set cookies or similar identifiers and receive
            information such as the pages you visit and your device and browser
            details. Meta Pixel loads only after you interact with the page. You
            can block or delete cookies in your browser settings, or use your
            browser&apos;s tracking protection, without affecting your ability
            to use the site.
          </p>

          <H2 id="sharing">Who we share it with</H2>
          <p className={P}>
            We do not sell your personal data. We share it only with:
          </p>
          <ul className={UL}>
            <li>
              Our staff and counsellors who need it to respond to you or run
              your course.
            </li>
            <li>
              Service providers acting on our instructions, such as hosting,
              email and messaging, our admissions software, document storage,
              analytics and Razorpay for payments. They may process data only to
              provide that service.
            </li>
            <li>
              Government or law-enforcement bodies, where the law requires us
              to.
            </li>
          </ul>
          <p className={P}>
            Some of these providers may store data on servers outside India. We
            rely on providers that apply appropriate safeguards.
          </p>

          <H2 id="retention">How long we keep it</H2>
          <p className={P}>
            We keep your data only as long as it is needed for the purpose you
            gave it, or as long as the law requires. Enquiry and demo-class data
            is deleted or anonymised when it is no longer needed to follow up
            with you. Admission and payment records are kept for as long as
            needed to run your course, issue certificates and meet accounting
            and legal duties. When the purpose ends, we delete the data or make
            it anonymous.
          </p>

          <H2 id="children">Children</H2>
          <p className={P}>
            Under the DPDP Act, anyone under 18 is a child. We will not process
            a child&apos;s personal data without the verifiable consent of a
            parent or lawful guardian, and we do not track or monitor the
            behaviour of children or target advertising at them. If you are
            under 18, please ask a parent or guardian to complete the form with
            you. If we find that we hold a child&apos;s data without that
            consent, we will delete it.
          </p>

          <H2 id="security">Security</H2>
          <p className={P}>
            We use reasonable security safeguards to protect your data,
            including encrypted connections (HTTPS), restricted access to our
            systems and reputable service providers. No system is perfectly
            secure. If a personal data breach affects you, we will tell you and
            the Data Protection Board of India as the law requires.
          </p>

          <H2 id="rights">Your rights</H2>
          <p className={P}>Under the DPDP Act you have the right to:</p>
          <dl className="mt-4 divide-y divide-border rounded-2xl border border-border">
            {RIGHTS.map(([term, text]) => (
              <div
                key={term}
                className="grid gap-1 p-4 sm:grid-cols-[11rem_1fr] sm:gap-4"
              >
                <dt className="font-semibold">{term}</dt>
                <dd className="text-foreground/80">{text}</dd>
              </div>
            ))}
          </dl>
          <p className={P}>
            To use any of these rights, email us at{" "}
            <a className={LINK} href={`mailto:${EMAIL}`}>
              {EMAIL}
            </a>{" "}
            from the email address or with the mobile number you gave us, so we
            can confirm it is you. We will reply within the period set by law.
          </p>

          <H2 id="grievance">Contact and grievances</H2>
          <p className={P}>
            For questions about this policy, to exercise your rights, or to
            raise a complaint, contact our Grievance Officer at{" "}
            <a className={LINK} href={`mailto:${EMAIL}`}>
              {EMAIL}
            </a>
            , or write to us at the address above.
            {/* If you are not satisfied with
            our response, you may complain to the Data Protection Board of
            India. */}
          </p>

          <H2 id="changes">Changes to this policy</H2>
          <p className={P}>
            If we change how we use your data, we will update this page and the
            date at the top. If a change affects the purpose for which you gave
            consent, we will ask you again.
          </p>
        </div>
      </section>
    </main>
  );
}
