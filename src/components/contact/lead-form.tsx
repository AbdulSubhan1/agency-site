"use client";

import { startTransition, useActionState, useEffect, useRef, useState } from "react";
import { submitLead } from "@/app/contact/actions";
import {
  ASIA_CODES,
  asiaLeadSchema,
  BUDGET_BANDS,
  BUDGET_LABELS,
  type FieldErrors,
  fieldErrors,
  type FormState,
  TIMELINE_LABELS,
  TIMELINES,
  usLeadSchema,
} from "@/lib/lead-form";
import { ctaClass } from "@/components/site/cta-link";

type Option = { value: string; label: string };

type Props = {
  variant: "us" | "asia";
  services: Option[];
  initial: { service?: string; message?: string };
  /** Shown after a US enquiry is sent, to book the call straight away. */
  bookingUrl: string | null;
};

// Fields in the order they appear, so the first wrong one gets the focus
const ORDER = {
  us: ["service", "budgetBand", "timeline", "name", "email", "company", "phone", "message"],
  asia: ["phone", "name", "whatsappOptIn", "service", "timeline", "email", "message"],
} as const;
const US_STEP_ONE = new Set(["service", "budgetBand", "timeline"]);

const INITIAL: FormState = { status: "idle" };

/**
 * The enquiry form. US: two steps (what you need, then who you are). Asia: WhatsApp number first. Errors show under
 * each field and the first wrong field gets the focus; the server checks everything again before sending.
 */
export function LeadForm({ variant, services, initial, bookingUrl }: Props) {
  const [state, action, pending] = useActionState(submitLead, INITIAL);
  // Errors from the check in the browser; null after a send, so the server's answer shows instead
  const [clientErrors, setClientErrors] = useState<FieldErrors | null>(null);
  const errors = clientErrors ?? (state.status === "invalid" ? state.errors : {});
  const [step, setStep] = useState<1 | 2>(1);
  const formRef = useRef<HTMLFormElement>(null);
  const doneRef = useRef<HTMLHeadingElement>(null);

  /** Moves the focus to the first wrong field, first opening step 1 if that's where it is. */
  const focusFirst = (errs: FieldErrors) => {
    const first = ORDER[variant].find((k) => errs[k]);
    if (!first) return;
    requestAnimationFrame(() => {
      if (variant === "us" && US_STEP_ONE.has(first)) setStep(1);
      // Once React shows the step that holds the field
      requestAnimationFrame(() => document.getElementById(`f-${first}`)?.focus());
    });
  };

  // The page they came from and their time zone, for the advisor
  useEffect(() => {
    const form = formRef.current;
    if (!form) return;
    let from = "/contact";
    try {
      const ref = document.referrer ? new URL(document.referrer) : null;
      if (ref && ref.origin === location.origin) from = ref.pathname;
    } catch {}
    (form.elements.namedItem("sourcePage") as HTMLInputElement).value = from;
    (form.elements.namedItem("timeZone") as HTMLInputElement).value =
      Intl.DateTimeFormat().resolvedOptions().timeZone ?? "";
  }, []);

  // The server's answer: focus its first field to fix, or the thank-you
  useEffect(() => {
    if (state.status === "invalid") focusFirst(state.errors);
    if (state.status === "sent") doneRef.current?.focus();
    // focusFirst only reads the variant, which never changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  const check = (only?: Set<string>) => {
    const data = Object.fromEntries(new FormData(formRef.current!));
    const parsed = (variant === "us" ? usLeadSchema : asiaLeadSchema).safeParse(data);
    let errs = parsed.success ? {} : fieldErrors(parsed.error);
    if (only) errs = Object.fromEntries(Object.entries(errs).filter(([k]) => only.has(k)));
    setClientErrors(errs);
    focusFirst(errs);
    return Object.keys(errs).length === 0;
  };

  if (state.status === "sent") {
    return (
      <div role="status" className="rounded-3xl bg-white p-8 ring-1 ring-line md:p-10">
        <span className="grid size-14 place-items-center rounded-full bg-brand text-white">
          <svg viewBox="0 0 16 16" className="size-7" aria-hidden>
            <path
              d="M3 8.5l3 3 7-7"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <h2 ref={doneRef} tabIndex={-1} className="mt-6 font-display text-3xl font-bold text-ink outline-none">
          Thanks, {state.name.split(" ")[0]}. We have your message.
        </h2>
        <p className="mt-3 text-lg text-muted">
          {variant === "asia"
            ? "One of us will reply on WhatsApp within the working day."
            : "One of us will email you within one working day."}{" "}
          Your reference is <strong className="text-ink">{state.reference}</strong>.
        </p>
        {bookingUrl && variant === "us" && (
          <a
            href={bookingUrl}
            target="_blank"
            rel="noreferrer"
            data-pulse-event="booking_opened"
            className={`${ctaClass("solid")} mt-8`}
          >
            Pick a time for the call now
          </a>
        )}
      </div>
    );
  }

  const shown = (name: string) => errors[name];

  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={(e) => {
        // Sent by hand rather than through the form's action prop: React resets a form after its action, which would
        // wipe what the visitor typed whenever the server sends back a field to fix
        e.preventDefault();
        if (check()) {
          const data = new FormData(e.currentTarget);
          setClientErrors(null);
          startTransition(() => action(data));
        }
      }}
      className="rounded-3xl bg-white p-6 ring-1 ring-line md:p-10"
    >
      <input type="hidden" name="sourcePage" defaultValue="/contact" />
      <input type="hidden" name="timeZone" defaultValue="" />

      {state.status === "failed" && (
        <p role="alert" className="mb-6 rounded-2xl bg-[#fdecea] px-4 py-3 text-[#8a1c12]">
          {state.message}
        </p>
      )}

      {variant === "us" ? (
        <>
          <p className="text-sm font-medium text-muted" aria-live="polite">
            Step {step} of 2
          </p>
          <div hidden={step !== 1} className="mt-4 grid gap-7">
            <Choices
              name="service"
              legend="What should we look at first?"
              options={services}
              defaultValue={initial.service}
              error={shown("service")}
            />
            <Choices
              name="budgetBand"
              legend="Budget for the first project"
              options={BUDGET_BANDS.map((b) => ({ value: b, label: BUDGET_LABELS[b] }))}
              error={shown("budgetBand")}
            />
            <Choices
              name="timeline"
              legend="When would you like to start?"
              options={TIMELINES.map((t) => ({ value: t, label: TIMELINE_LABELS[t] }))}
              error={shown("timeline")}
            />
            <div>
              <button type="button" onClick={() => check(US_STEP_ONE) && setStep(2)} className={ctaClass("solid")}>
                Continue
              </button>
            </div>
          </div>
          <div hidden={step !== 2} className="mt-4 grid gap-5">
            <Text name="name" label="Your name" autoComplete="name" error={shown("name")} />
            <Text name="email" label="Work email" type="email" autoComplete="email" error={shown("email")} />
            <Text name="company" label="Company" optional autoComplete="organization" error={shown("company")} />
            <Text
              name="phone"
              label="Phone"
              optional
              type="tel"
              autoComplete="tel"
              hint="For a call instead of email"
              error={shown("phone")}
            />
            <Text
              name="message"
              label="Anything we should know?"
              optional
              multiline
              defaultValue={initial.message}
              error={shown("message")}
            />
            <div className="flex flex-wrap items-center gap-3">
              <button type="submit" disabled={pending} data-pulse-event="lead_submitted" className={ctaClass("solid")}>
                {pending ? "Sending…" : "Send"}
              </button>
              <button type="button" onClick={() => setStep(1)} className={ctaClass("outline")}>
                Back
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="grid gap-5">
          <div>
            <label htmlFor="f-phone" className="block font-semibold text-ink">
              Your WhatsApp number
            </label>
            <div className="mt-2 flex gap-2">
              <select
                name="callingCode"
                aria-label="Country code"
                className="min-h-12 rounded-xl border border-line bg-paper px-3 text-ink focus:border-brand focus:ring-4 focus:ring-brand/15 focus:outline-none"
              >
                {ASIA_CODES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.label}
                  </option>
                ))}
              </select>
              <input
                id="f-phone"
                name="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel-national"
                aria-invalid={!!shown("phone")}
                aria-describedby={shown("phone") ? "e-phone" : undefined}
                className={inputClass(!!shown("phone"))}
              />
            </div>
            <ErrorText name="phone" error={shown("phone")} />
          </div>
          <Text name="name" label="Your name" autoComplete="name" error={shown("name")} />
          <div>
            <label className="flex items-start gap-3 text-ink">
              <input
                id="f-whatsappOptIn"
                type="checkbox"
                name="whatsappOptIn"
                defaultChecked
                aria-invalid={!!shown("whatsappOptIn")}
                aria-describedby={shown("whatsappOptIn") ? "e-whatsappOptIn" : undefined}
                className="mt-1 size-5 shrink-0 accent-[var(--brand)]"
              />
              <span>Yes, you may contact me on WhatsApp about my enquiry.</span>
            </label>
            <ErrorText name="whatsappOptIn" error={shown("whatsappOptIn")} />
          </div>
          <Choices
            name="service"
            legend="What would you like help with?"
            options={services}
            defaultValue={initial.service}
            error={shown("service")}
          />
          <Choices
            name="timeline"
            legend="When would you like to start?"
            options={TIMELINES.map((t) => ({ value: t, label: TIMELINE_LABELS[t] }))}
            error={shown("timeline")}
          />
          <Text name="email" label="Email" optional type="email" autoComplete="email" error={shown("email")} />
          <Text
            name="message"
            label="Anything we should know?"
            optional
            multiline
            defaultValue={initial.message}
            error={shown("message")}
          />
          <div>
            <button type="submit" disabled={pending} data-pulse-event="lead_submitted" className={ctaClass("solid")}>
              {pending ? "Sending…" : "Send"}
            </button>
          </div>
        </div>
      )}
    </form>
  );
}

const inputClass = (bad: boolean) =>
  `min-h-12 w-full rounded-xl border bg-paper px-4 text-ink transition focus:ring-4 focus:outline-none ${
    bad ? "border-[#c0392b] focus:ring-[#c0392b]/15" : "border-line focus:border-brand focus:ring-brand/15"
  }`;

function ErrorText({ name, error }: { name: string; error?: string }) {
  return error ? (
    <p id={`e-${name}`} className="mt-2 text-sm font-medium text-[#b42318]">
      {error}
    </p>
  ) : null;
}

function Text({
  name,
  label,
  optional,
  multiline,
  hint,
  error,
  ...rest
}: {
  name: string;
  label: string;
  optional?: boolean;
  multiline?: boolean;
  hint?: string;
  error?: string;
  type?: string;
  autoComplete?: string;
  defaultValue?: string;
}) {
  const describedBy = [hint && `h-${name}`, error && `e-${name}`].filter(Boolean).join(" ") || undefined;
  const common = {
    id: `f-${name}`,
    name,
    "aria-invalid": !!error,
    "aria-describedby": describedBy,
    className: `${inputClass(!!error)} ${multiline ? "min-h-28 py-3" : ""}`,
    ...rest,
  };
  return (
    <div>
      <label htmlFor={`f-${name}`} className="block font-semibold text-ink">
        {label} {optional && <span className="font-normal text-muted">(optional)</span>}
      </label>
      {hint && (
        <p id={`h-${name}`} className="text-sm text-muted">
          {hint}
        </p>
      )}
      <div className="mt-2">{multiline ? <textarea rows={4} {...common} /> : <input {...common} />}</div>
      <ErrorText name={name} error={error} />
    </div>
  );
}

/** One-of choices as tappable chips; native radios underneath, so keyboard and screen readers work as usual. */
function Choices({
  name,
  legend,
  options,
  defaultValue,
  error,
}: {
  name: string;
  legend: string;
  options: Option[];
  defaultValue?: string;
  error?: string;
}) {
  return (
    <fieldset aria-describedby={error ? `e-${name}` : undefined}>
      <legend className="font-semibold text-ink">{legend}</legend>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((o, i) => (
          <label key={o.value} className="cursor-pointer">
            <input
              id={i === 0 ? `f-${name}` : undefined}
              type="radio"
              name={name}
              value={o.value}
              defaultChecked={o.value === defaultValue}
              className="peer sr-only"
            />
            <span
              className={`inline-flex min-h-11 items-center rounded-full border px-4 text-[15px] transition peer-checked:border-brand peer-checked:bg-brand peer-checked:text-white peer-focus-visible:ring-4 peer-focus-visible:ring-brand/25 hover:border-brand ${
                error ? "border-[#c0392b]" : "border-line"
              }`}
            >
              {o.label}
            </span>
          </label>
        ))}
      </div>
      <ErrorText name={name} error={error} />
    </fieldset>
  );
}
