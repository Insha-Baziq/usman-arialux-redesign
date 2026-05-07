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

const inputClass =
  "mt-2 block w-full rounded-lg border border-black/15 bg-white px-4 py-3 text-[0.95rem] font-light text-black placeholder:text-black/35 transition focus:border-black focus:outline-none focus:ring-2 focus:ring-black/10";

const labelClass =
  "text-[0.7rem] font-medium uppercase tracking-[0.24em] text-black/65";

export function ContactForm() {
  const [fields, setFields] = useState<FormFields>(initialState);
  const [submitted, setSubmitted] = useState(false);

  const update = <K extends keyof FormFields>(key: K, value: FormFields[K]) => {
    setFields((prev) => ({ ...prev, [key]: value }));
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Form is non-functional per spec — show a thank-you state.
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="mt-8 rounded-xl border border-black/10 bg-[#f5f3ef] p-6 text-center">
        <p className="font-heading text-[1.25rem] font-light text-black">
          Thank you, {fields.name || "friend"}.
        </p>
        <p className="mt-2 text-[0.92rem] font-light leading-7 text-black/65">
          We&apos;ll be in touch within one business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mt-8 space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className={labelClass}>Name</span>
          <input
            type="text"
            name="name"
            value={fields.name}
            onChange={(e) => update("name", e.target.value)}
            required
            autoComplete="name"
            placeholder="Your name"
            className={inputClass}
          />
        </label>
        <label className="block">
          <span className={labelClass}>Phone</span>
          <input
            type="tel"
            name="phone"
            value={fields.phone}
            onChange={(e) => update("phone", e.target.value)}
            autoComplete="tel"
            placeholder="(260) 000-0000"
            className={inputClass}
          />
        </label>
      </div>

      <label className="block">
        <span className={labelClass}>Email</span>
        <input
          type="email"
          name="email"
          value={fields.email}
          onChange={(e) => update("email", e.target.value)}
          required
          autoComplete="email"
          placeholder="you@example.com"
          className={inputClass}
        />
      </label>

      <label className="block">
        <span className={labelClass}>Message</span>
        <textarea
          name="message"
          value={fields.message}
          onChange={(e) => update("message", e.target.value)}
          required
          rows={6}
          placeholder="Tell us about the home you want to build."
          className={`${inputClass} resize-none`}
        />
      </label>

      <button
        type="submit"
        className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-black px-8 py-4 text-[0.74rem] font-medium uppercase tracking-[0.3em] text-white transition hover:bg-black/85 sm:w-auto"
      >
        <span>Send Message</span>
        <span aria-hidden="true">↗</span>
      </button>
    </form>
  );
}
