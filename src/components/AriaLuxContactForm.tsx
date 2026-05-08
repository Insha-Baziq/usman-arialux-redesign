"use client";

import { useState, type FormEvent } from "react";

type FormFields = {
  name: string;
  email: string;
  message: string;
};

const initialState: FormFields = {
  name: "",
  email: "",
  message: "",
};

const inputBase =
  "block h-14 w-full rounded-[5px] border border-black/25 bg-white/90 px-7 text-[0.92rem] font-light text-black shadow-[0_1px_0_rgba(0,0,0,0.02)] transition placeholder:text-black/42 focus:border-[#bfa15c] focus:outline-none focus:ring-2 focus:ring-[#bfa15c]/20";

const labelBase = "sr-only";


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
    <form onSubmit={onSubmit} className="mt-8 space-y-6">
      <label className="block" htmlFor="arialux-name">
        <span className={labelBase}>Full Name</span>
        <input
          id="arialux-name"
          type="text"
          name="name"
          value={fields.name}
          onChange={(e) => update("name", e.target.value)}
          required
          autoComplete="name"
          placeholder="Full Name *"
          className={inputBase}
        />
      </label>

      <label className="block" htmlFor="arialux-email">
        <span className={labelBase}>Email Address</span>
        <input
          id="arialux-email"
          type="email"
          name="email"
          value={fields.email}
          onChange={(e) => update("email", e.target.value)}
          required
          autoComplete="email"
          placeholder="Email Address *"
          className={inputBase}
        />
      </label>

      <label className="block" htmlFor="arialux-message">
        <span className={labelBase}>Your Message</span>
        <textarea
          id="arialux-message"
          name="message"
          value={fields.message}
          onChange={(e) => update("message", e.target.value)}
          required
          rows={5}
          placeholder="Your Message *"
          className={`${inputBase} h-auto resize-none py-5 leading-7`}
        />
      </label>

      <button
        type="submit"
        className="inline-flex h-[3.25rem] w-full min-w-[10rem] items-center justify-center rounded-full border border-black bg-transparent px-9 text-[0.72rem] font-semibold uppercase tracking-[0.34em] text-black transition hover:border-[#bfa15c] hover:bg-[#bfa15c] hover:text-white sm:w-auto"
      >
        <span>Send Message</span>
      </button>
    </form>
  );
}
