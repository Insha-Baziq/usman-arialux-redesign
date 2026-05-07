"use client";

import { useMemo, useState } from "react";

import type { AriaPlan } from "./arialux-data";

type FloorPlansBrowserProps = {
  plans: AriaPlan[];
};

type SizeFilter = "all" | "compact" | "mid" | "estate";
type BedroomFilter = "all" | "small" | "large";

type SizeOption = {
  id: SizeFilter;
  label: string;
  hint: string;
  match: (sqft: number) => boolean;
};

type BedroomOption = {
  id: BedroomFilter;
  label: string;
  hint: string;
  match: (br: number) => boolean;
};

const SIZE_OPTIONS: SizeOption[] = [
  { id: "all", label: "All Sizes", hint: "", match: () => true },
  { id: "compact", label: "Compact", hint: "Under 2,500 SQFT", match: (sqft) => sqft < 2500 },
  { id: "mid", label: "Mid", hint: "2,500 \u2013 3,500 SQFT", match: (sqft) => sqft >= 2500 && sqft < 3500 },
  { id: "estate", label: "Estate", hint: "3,500+ SQFT", match: (sqft) => sqft >= 3500 },
];

const BEDROOM_OPTIONS: BedroomOption[] = [
  { id: "all", label: "All Bedrooms", hint: "", match: () => true },
  { id: "small", label: "3 \u2013 4 BR", hint: "", match: (br) => br >= 3 && br <= 4 },
  { id: "large", label: "5+ BR", hint: "", match: (br) => br >= 5 },
];

export function FloorPlansBrowser({ plans }: FloorPlansBrowserProps) {
  const [size, setSize] = useState<SizeFilter>("all");
  const [bedrooms, setBedrooms] = useState<BedroomFilter>("all");

  const sizeMatch = SIZE_OPTIONS.find((opt) => opt.id === size) ?? SIZE_OPTIONS[0];
  const bedroomMatch = BEDROOM_OPTIONS.find((opt) => opt.id === bedrooms) ?? BEDROOM_OPTIONS[0];

  const filtered = useMemo(
    () =>
      plans.filter(
        (plan) =>
          sizeMatch.match(plan.specs.living) && bedroomMatch.match(plan.specs.bedrooms),
      ),
    [plans, sizeMatch, bedroomMatch],
  );

  return (
    <section className="px-6 pb-24 lg:px-10 lg:pb-32">
      <div className="mx-auto w-full max-w-[81rem]">
        <div className="mb-10 flex flex-col gap-6 border-b border-black/10 pb-8 lg:mb-14 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <div className="space-y-3">
            <span className="text-[0.72rem] font-medium uppercase tracking-[0.3em] text-black/55">
              Refine
            </span>
            <h2 className="text-2xl font-light text-neutral-900 lg:text-3xl">
              {filtered.length} {filtered.length === 1 ? "plan" : "plans"} match your filters
            </h2>
          </div>

          <div className="flex flex-col gap-5 lg:flex-row lg:gap-8">
            <FilterGroup label="Size">
              {SIZE_OPTIONS.map((opt) => (
                <FilterChip
                  key={opt.id}
                  label={opt.label}
                  hint={opt.hint}
                  active={size === opt.id}
                  onClick={() => setSize(opt.id)}
                />
              ))}
            </FilterGroup>

            <FilterGroup label="Bedrooms">
              {BEDROOM_OPTIONS.map((opt) => (
                <FilterChip
                  key={opt.id}
                  label={opt.label}
                  hint={opt.hint}
                  active={bedrooms === opt.id}
                  onClick={() => setBedrooms(opt.id)}
                />
              ))}
            </FilterGroup>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-xl border border-dashed border-black/15 bg-neutral-50 p-12 text-center">
            <p className="text-sm font-light leading-relaxed text-black/65">
              No plans match the current filters. Try widening your selection {"\u2014"} or{" "}
              <a
                href="/contact"
                className="font-medium uppercase tracking-[0.18em] text-black underline-offset-4 hover:underline"
              >
                request a custom design
              </a>
              .
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((plan) => (
              <FloorPlanListingCard key={plan.slug} plan={plan} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

type FilterGroupProps = {
  label: string;
  children: React.ReactNode;
};

function FilterGroup({ label, children }: FilterGroupProps) {
  return (
    <div className="space-y-3">
      <p className="text-[0.68rem] font-medium uppercase tracking-[0.24em] text-black/45">
        {label}
      </p>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

type FilterChipProps = {
  label: string;
  hint: string;
  active: boolean;
  onClick: () => void;
};

function FilterChip({ label, hint, active, onClick }: FilterChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={
        active
          ? "inline-flex items-center gap-2 rounded-full border border-neutral-900 bg-neutral-900 px-4 py-2 text-[0.7rem] font-medium uppercase tracking-[0.2em] text-white transition"
          : "inline-flex items-center gap-2 rounded-full border border-black/15 bg-white px-4 py-2 text-[0.7rem] font-medium uppercase tracking-[0.2em] text-black/70 transition hover:border-black hover:text-black"
      }
    >
      <span>{label}</span>
      {hint ? (
        <span
          className={
            active ? "text-[0.62rem] font-light tracking-[0.16em] text-white/65" : "text-[0.62rem] font-light tracking-[0.16em] text-black/40"
          }
        >
          {hint}
        </span>
      ) : null}
    </button>
  );
}

type FloorPlanListingCardProps = {
  plan: AriaPlan;
};

function FloorPlanListingCard({ plan }: FloorPlanListingCardProps) {
  const sqftLabel = `${plan.specs.living.toLocaleString()} SQFT`;
  const brLabel = `${plan.specs.bedrooms} BR`;
  const baLabel = `${plan.specs.bathrooms} BA`;

  return (
    <a
      href={`/floor-plans/${plan.slug}`}
      className="group flex h-full flex-col"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={plan.hero}
          alt={plan.displayName}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-[700ms] ease-out group-hover:scale-[1.06]"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/65 via-black/25 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5 text-white">
          <div className="flex flex-wrap items-center gap-2 text-[0.62rem] font-medium uppercase tracking-[0.22em]">
            <StatPill>{sqftLabel}</StatPill>
            <StatPill>{brLabel}</StatPill>
            <StatPill>{baLabel}</StatPill>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 pt-5">
        <h3 className="text-base font-medium uppercase tracking-[0.2em] text-neutral-900">
          {plan.displayName}
        </h3>
        <p className="text-sm font-light leading-relaxed text-neutral-600">
          {plan.tagline}
        </p>
        <span className="mt-3 inline-flex items-center gap-2 text-[0.7rem] font-medium uppercase tracking-[0.24em] text-neutral-900">
          View Plan
          <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
            &rarr;
          </span>
        </span>
      </div>
    </a>
  );
}

type StatPillProps = {
  children: React.ReactNode;
};

function StatPill({ children }: StatPillProps) {
  return (
    <span className="rounded-full border border-white/35 bg-black/30 px-2.5 py-1 backdrop-blur-sm">
      {children}
    </span>
  );
}
