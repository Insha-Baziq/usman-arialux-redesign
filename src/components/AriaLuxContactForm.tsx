"use client";

import { useState, type FormEvent } from "react";

type FormFields = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

const initialState: FormFields = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

const GOLD = "text-[#bfa15c]";

const inputBase =
  "mt-1.5 block w-full rounded-md border border-black/15 bg-white px-3.5 py-2.5 text-[0.9rem] font-light text-black placeholder:text-black/35 transition focus:border-[#bfa15c] focus:outline-none focus:ring-2 focus:ring-[#bfa15c]/20";

const labelBase =
  "text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-black/85";

function CalendarGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <rect x="3.5" y="5" width="17" height="15" rx="2" />
      <path d="M3.5 9.5h17" />
      <path d="M8 3v4M16 3v4" />
    </svg>
  );
}

export function AriaLuxContactForm() {
  const [fields, setFields] = useState<FormFields>(initialState);
  const [submitted, setSubmitted] = useState(false);

  const update = <K extends keyof FormFields>(key: K, value: FormFields[K]) => {
    setFields((prev) => ({ ...prev, [key]: value }));
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="mt-10 rounded-xl border border-[#bfa15c]/30 bg-[#f7f2e6] p-8 text-center">
        <p className="font-heading text-[1.5rem] font-light text-black">
          Thank you, {fields.name || "friend"}.
        </p>
        <p className="mt-2 text-[0.95rem] font-light leading-7 text-black/65">
          We&apos;ll be in touch within one business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mt-7 space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className={labelBase}>Full Name</span>
          <input
            type="text"
            name="name"
            value={fields.name}
            onChange={(e) => update("name", e.target.value)}
            required
            autoComplete="name"
            placeholder="Your name"
            className={inputBase}
          />
        </label>
        <label className="block">
          <span className={labelBase}>Phone Number</span>
          <input
            type="tel"
            name="phone"
            value={fields.phone}
            onChange={(e) => update("phone", e.target.value)}
            autoComplete="tel"
            placeholder="(260) 000-0000"
            className={inputBase}
          />
        </label>
      </div>

      <label className="block">
        <span className={labelBase}>Email Address</span>
        <input
          type="email"
          name="email"
          value={fields.email}
          onChange={(e) => update("email", e.target.value)}
          required
          autoComplete="email"
          placeholder="you@exemple.com"
          className={inputBase}
        />
      </label>

      <label className="block">
        <span className={labelBase}>Your Message</span>
        <textarea
          name="message"
          value={fields.message}
          onChange={(e) => update("message", e.target.value)}
          required
          rows={4}
          placeholder="Tell us about the home you want to build."
          className={`${inputBase} resize-none`}
        />
      </label>

      <div className="flex flex-col items-start gap-4 rounded-lg bg-[#f4efe5] p-4 sm:flex-row sm:items-center sm:justify-between sm:gap-5">
        <div className="flex items-center gap-3.5">
          <span
            className={`inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#bfa15c]/40 bg-white ${GOLD}`}
            aria-hidden="true"
          >
            <CalendarGlyph />
          </span>
          <div>
            <p className="font-heading text-[0.95rem] font-light text-black">
              Prefer to talk in person?
            </p>
            <p className="text-[0.8rem] font-light leading-5 text-black/60">
              Schedule a private consultation at our studio.
            </p>
          </div>
        </div>
        <a
          href="/contact"
          className="inline-flex items-center gap-2 rounded-md bg-black px-4 py-2.5 text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-white transition hover:bg-black/85"
        >
          <span>Book a Consultation</span>
          <span aria-hidden="true">↗</span>
        </a>
      </div>

      <button
        type="submit"
        className="inline-flex w-full items-center justify-center gap-3 rounded-md bg-[#bfa15c] px-7 py-3.5 text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-white transition hover:bg-[#a88a47] sm:w-auto sm:min-w-[16rem]"
      >
        <span>Send Message</span>
        <span aria-hidden="true">↗</span>
      </button>
    </form>
  );
}
