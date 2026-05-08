"use client";

import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";

import { ARIA_PLANS } from "./arialux-data";

type FormFields = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  floorPlan: string;
  message: string;
  consent: boolean;
  updates: boolean;
};

const initialState: FormFields = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  floorPlan: "",
  message: "",
  consent: false,
  updates: false,
};

const inputBase =
  "block h-14 w-full rounded-[7px] border border-black/35 bg-transparent px-7 font-sans text-[0.92rem] font-medium text-black shadow-none transition placeholder:text-black/42 focus:border-[#bfa15c] focus:outline-none focus:ring-2 focus:ring-[#bfa15c]/20";

const labelBase = "sr-only";

export function AriaLuxContactForm() {
  const [fields, setFields] = useState<FormFields>(initialState);
  const [submitted, setSubmitted] = useState(false);
  const [floorPlanOpen, setFloorPlanOpen] = useState(false);
  const [floorPlanQuery, setFloorPlanQuery] = useState("");
  const floorPlanRef = useRef<HTMLDivElement>(null);
  const floorPlanSearchRef = useRef<HTMLInputElement>(null);

  const filteredPlans = useMemo(() => {
    const query = floorPlanQuery.trim().toLowerCase();
    if (!query) return ARIA_PLANS;
    return ARIA_PLANS.filter((plan) =>
      plan.displayName.toLowerCase().includes(query),
    );
  }, [floorPlanQuery]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!floorPlanRef.current?.contains(e.target as Node)) {
        setFloorPlanOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    if (floorPlanOpen) {
      floorPlanSearchRef.current?.focus();
    }
  }, [floorPlanOpen]);

  const update = <K extends keyof FormFields>(key: K, value: FormFields[K]) => {
    setFields((prev) => ({ ...prev, [key]: value }));
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="mt-10 rounded-[7px] border border-[#bfa15c]/35 bg-[#f4efe5] p-8 text-center">
        <p className="font-heading text-[1.5rem] font-light text-black">
          Thank you, {fields.firstName || "friend"}.
        </p>
        <p className="mt-2 text-[0.95rem] font-light leading-7 text-black/65">
          We&apos;ll be in touch within one business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mt-8">
      <div className="space-y-6">
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block" htmlFor="arialux-first-name">
            <span className={labelBase}>First Name</span>
            <input
              id="arialux-first-name"
              type="text"
              name="firstName"
              value={fields.firstName}
              onChange={(e) => update("firstName", e.target.value)}
              required
              autoComplete="given-name"
              placeholder="First name *"
              className={inputBase}
            />
          </label>

          <label className="block" htmlFor="arialux-last-name">
            <span className={labelBase}>Last Name</span>
            <input
              id="arialux-last-name"
              type="text"
              name="lastName"
              value={fields.lastName}
              onChange={(e) => update("lastName", e.target.value)}
              required
              autoComplete="family-name"
              placeholder="Last name *"
              className={inputBase}
            />
          </label>
        </div>

        <label className="block" htmlFor="arialux-phone">
          <span className={labelBase}>Phone Number</span>
          <input
            id="arialux-phone"
            type="tel"
            name="phone"
            value={fields.phone}
            onChange={(e) => update("phone", e.target.value)}
            required
            autoComplete="tel"
            placeholder="Phone number *"
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
            placeholder="Email *"
            className={`${inputBase} normal-case`}
          />
        </label>

        <div className="relative" ref={floorPlanRef}>
          <label className={labelBase} htmlFor="arialux-floor-plan-search">
            Floor Plan
          </label>
          <input type="hidden" name="floorPlan" value={fields.floorPlan} />
          <div className="flex h-14 w-full items-center overflow-hidden rounded-[0.7rem] border border-[#cfc3b5] bg-[#fbf8f2] shadow-[0_18px_44px_-34px_rgba(23,20,16,0.5)] transition hover:border-[#b58942] focus-within:border-[#b58942]">
            {floorPlanOpen ? (
              <input
                ref={floorPlanSearchRef}
                id="arialux-floor-plan-search"
                type="search"
                value={floorPlanQuery}
                onChange={(e) => setFloorPlanQuery(e.target.value)}
                placeholder="Search floor plans"
                className="h-full min-w-0 flex-1 bg-transparent px-7 font-sans text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-[#332c25] placeholder:text-[#6a6158]/55 focus:outline-none"
                autoComplete="off"
              />
            ) : (
              <button
                type="button"
                aria-haspopup="listbox"
                aria-expanded={floorPlanOpen}
                onClick={() => setFloorPlanOpen(true)}
                className="flex h-full min-w-0 flex-1 items-center px-7 font-sans text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-[#332c25] focus:outline-none"
              >
                <span className="truncate text-left">
                  {fields.floorPlan || "Select floor plan (optional)"}
                </span>
              </button>
            )}
            <span className="h-6 w-px bg-[#d8c9b8]" aria-hidden="true" />
            <button
              type="button"
              aria-label={
                floorPlanOpen ? "Close floor plan menu" : "Open floor plan menu"
              }
              aria-expanded={floorPlanOpen}
              onClick={() => setFloorPlanOpen((open) => !open)}
              className="flex h-full w-14 shrink-0 items-center justify-center text-[#b58942] focus:outline-none"
            >
              <svg
                width="13"
                height="13"
                viewBox="0 0 13 13"
                fill="none"
                aria-hidden="true"
                className={`transition-transform duration-200 ${
                  floorPlanOpen ? "rotate-180" : ""
                }`}
              >
                <path
                  d="M3.25 5 6.5 8.25 9.75 5"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.35"
                />
              </svg>
            </button>
          </div>

          {floorPlanOpen ? (
            <div className="absolute left-0 right-0 top-[calc(100%+7px)] z-30 overflow-hidden rounded-[0.7rem] border border-[#d6cbbc] bg-[#fbf8f2] shadow-[0_16px_40px_-20px_rgba(23,20,16,0.35)]">
              <ul
                role="listbox"
                aria-label="Floor plans"
                className="max-h-60 overflow-y-auto py-1"
              >
                <li
                  role="option"
                  aria-selected={fields.floorPlan === ""}
                  onClick={() => {
                    update("floorPlan", "");
                    setFloorPlanQuery("");
                    setFloorPlanOpen(false);
                  }}
                  className={`cursor-pointer px-4 py-2.5 font-sans text-[0.68rem] font-semibold uppercase tracking-[0.14em] transition ${
                    fields.floorPlan === ""
                      ? "bg-[#b58942] text-white"
                      : "text-[#332c25] hover:bg-[#f0e8d8] hover:text-[#171410]"
                  }`}
                >
                  Not decided yet
                </li>
                {filteredPlans.map((plan) => (
                  <li
                    key={plan.slug}
                    role="option"
                    aria-selected={fields.floorPlan === plan.displayName}
                    onClick={() => {
                      update("floorPlan", plan.displayName);
                      setFloorPlanQuery("");
                      setFloorPlanOpen(false);
                    }}
                    className={`cursor-pointer px-4 py-2.5 font-sans text-[0.68rem] font-semibold uppercase tracking-[0.14em] transition ${
                      fields.floorPlan === plan.displayName
                        ? "bg-[#b58942] text-white"
                        : "text-[#332c25] hover:bg-[#f0e8d8] hover:text-[#171410]"
                    }`}
                  >
                    {plan.displayName}
                  </li>
                ))}
                {filteredPlans.length === 0 ? (
                  <li className="px-4 py-3 font-sans text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[#6a6158]">
                    No plans found
                  </li>
                ) : null}
              </ul>
            </div>
          ) : null}
        </div>

        <label className="block" htmlFor="arialux-message">
          <span className={labelBase}>Your Message</span>
          <textarea
            id="arialux-message"
            name="message"
            value={fields.message}
            onChange={(e) => update("message", e.target.value)}
            rows={4}
            placeholder="Tell us about your lot, timeline, or custom plan goals"
            className={`${inputBase} h-auto resize-none py-5 leading-7`}
          />
        </label>

        <div className="space-y-4 pt-1">
          <label className="flex items-start gap-3 font-sans text-[0.72rem] font-light leading-5 text-black/58">
            <input
              type="checkbox"
              checked={fields.consent}
              onChange={(e) => update("consent", e.target.checked)}
              required
              className="mt-0.5 h-4 w-4 shrink-0 accent-[#bfa15c]"
            />
            I agree to be contacted by AriaLux Homes about my inquiry.
          </label>
          <label className="flex items-start gap-3 font-sans text-[0.72rem] font-light leading-5 text-black/58">
            <input
              type="checkbox"
              checked={fields.updates}
              onChange={(e) => update("updates", e.target.checked)}
              className="mt-0.5 h-4 w-4 shrink-0 accent-[#bfa15c]"
            />
            Send me occasional updates about new floor plans and available builds.
          </label>
        </div>
      </div>

      <button
        type="submit"
        className="mt-7 inline-flex h-[3.05rem] w-full min-w-[10rem] items-center justify-center rounded-full border border-black bg-transparent px-9 font-sans text-[0.74rem] font-semibold uppercase tracking-[0.25em] text-black transition hover:border-[#bfa15c] hover:bg-[#bfa15c] hover:text-white sm:w-auto"
      >
        <span>Submit</span>
      </button>
    </form>
  );
}
