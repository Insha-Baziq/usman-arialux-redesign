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

const inputBase =
  "block h-14 w-full rounded-[5px] border border-black/25 bg-white/90 px-7 text-[0.92rem] font-light text-black shadow-[0_1px_0_rgba(0,0,0,0.02)] transition placeholder:text-black/42 focus:border-[#bfa15c] focus:outline-none focus:ring-2 focus:ring-[#bfa15c]/20";

const labelBase = "sr-only";

function UsFlag() {
  return (
    <span
      aria-hidden="true"
      className="relative h-3 w-5 overflow-hidden rounded-[1px] shadow-[0_0_0_1px_rgba(0,0,0,0.14)]"
    >
      {/* Red and white stripes */}
      {[0,1,2,3,4,5,6,7,8,9,10,11,12].map((i) => (
        <span
          key={i}
          className="absolute left-0 right-0"
          style={{
            top: `${(i / 13) * 100}%`,
            height: `${100 / 13}%`,
            background: i % 2 === 0 ? "#B22234" : "#fff",
          }}
        />
      ))}
      {/* Blue canton */}
      <span className="absolute left-0 top-0 h-[54%] w-[40%] bg-[#3C3B6E]" />
    </span>
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
    <form onSubmit={onSubmit} className="mt-8 space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
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

        <label className="block" htmlFor="arialux-phone">
          <span className={labelBase}>Phone Number</span>
          <span className="flex gap-3">
            <span className="inline-flex h-14 min-w-[5.5rem] items-center justify-center gap-2 rounded-[5px] border border-black/25 bg-white/90 text-[0.86rem] font-medium text-black/62 shadow-[0_1px_0_rgba(0,0,0,0.02)]">
              <UsFlag />
              <span>+1</span>
            </span>
            <input
              id="arialux-phone"
              type="tel"
              name="phone"
              aria-label="Phone Number"
              value={fields.phone}
              onChange={(e) => update("phone", e.target.value)}
              autoComplete="tel"
              placeholder="XXX XXX XXXX"
              className={inputBase}
            />
          </span>
        </label>
      </div>

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
