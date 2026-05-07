"use client";

import { useMemo, useState } from "react";

import type { AriaPlan } from "./arialux-data";
import { ScrollReveal } from "./ScrollReveal";

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
  { id: "mid", label: "Mid", hint: "2,500 - 3,500 SQFT", match: (sqft) => sqft >= 2500 && sqft < 3500 },
  { id: "estate", label: "Estate", hint: "3,500+ SQFT", match: (sqft) => sqft >= 3500 },
];

const BEDROOM_OPTIONS: BedroomOption[] = [
  { id: "all", label: "All Beds", hint: "", match: () => true },
  { id: "small", label: "3 - 4 BR", hint: "", match: (br) => br >= 3 && br <= 4 },
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
    <section className="bg-[#f7f3ec] px-6 pb-16 lg:px-10 lg:pb-24">
      <div className="mx-auto w-full max-w-[81rem]">
        <div className="flex flex-wrap items-start gap-8 border-b border-[#d8d0c4] py-8 lg:flex-nowrap lg:gap-10">
          <div className="shrink-0 space-y-2">
            <p className="text-[0.64rem] font-semibold uppercase tracking-[0.32em] text-[#171410]">
              Filter Plans
            </p>
            <p className="font-serif text-base whitespace-nowrap text-[#4f473f]">
              {filtered.length} plans match
            </p>
          </div>

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

          <label className="shrink-0 space-y-3 lg:ml-auto">
            <span className="block text-[0.58rem] font-semibold uppercase tracking-[0.32em] text-[#171410]">
              Sort By
            </span>
            <div className="relative">
              <select
                aria-label="Sort floor plans"
                className="h-12 w-full min-w-[8rem] appearance-none rounded-full border border-[#d9d0c4] bg-[#fbf8f2] py-0 pr-10 pl-5 text-[0.68rem] font-semibold tracking-[0.08em] text-[#332c25] shadow-[0_10px_32px_-28px_rgba(23,20,16,0.45)] outline-none transition focus:border-[#b58942]"
                defaultValue="featured"
              >
                <option value="featured">Featured</option>
                <option value="largest">Largest</option>
                <option value="smallest">Smallest</option>
              </select>
              <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-[#6c6258]">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>
          </label>
        </div>

        {filtered.length === 0 ? (
          <div className="mt-12 rounded-[0.8rem] border border-dashed border-[#d8d0c4] bg-[#fbf8f2] p-12 text-center">
            <p className="text-sm font-light leading-relaxed text-[#5f574e]">
              No plans match the current filters. Try widening your selection or{" "}
              <a
                href="/contact"
                className="font-medium uppercase tracking-[0.18em] text-[#171410] underline-offset-4 hover:underline"
              >
                request a custom design
              </a>
              .
            </p>
          </div>
        ) : (
          <div
            data-testid="floor-plan-reference-grid"
            className="grid grid-cols-1 gap-5 py-8 md:grid-cols-2 xl:grid-cols-3 xl:py-10"
          >
            {filtered.map((plan, idx) => (
              <ScrollReveal
                key={plan.slug}
                variant="scaleUp"
                index={idx}
                stagger={0.06}
                duration={0.8}
              >
                <FloorPlanListingCard plan={plan} />
              </ScrollReveal>
            ))}
          </div>
        )}

        <CustomPlanPanel />
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
      <p className="text-[0.58rem] font-semibold uppercase tracking-[0.32em] text-[#171410]">
        {label}
      </p>
      <div className="flex flex-nowrap gap-2">{children}</div>
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
          ? "inline-flex min-h-12 items-center gap-2 rounded-full border border-[#b58942] bg-[#b58942] px-5 py-2 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-white shadow-[0_12px_30px_-24px_rgba(181,137,66,0.8)] transition"
          : "inline-flex min-h-12 items-center gap-2 rounded-full border border-[#d9d0c4] bg-[#fbf8f2] px-5 py-2 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-[#3f372f] transition hover:border-[#b58942] hover:text-[#171410]"
      }
    >
      <span>{label}</span>
      {hint ? (
        <span
          className={
            active
              ? "text-[0.56rem] font-light tracking-[0.12em] text-white/70"
              : "text-[0.56rem] font-light tracking-[0.12em] text-[#7a7066]"
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
  const sqftLabel = `${plan.specs.living.toLocaleString()} SQ FT`;
  const brLabel = `${plan.specs.bedrooms} Beds`;
  const baLabel = `${plan.specs.bathrooms} Baths`;

  return (
    <a
      href={`/floor-plans/${plan.slug}`}
      aria-label={`View ${plan.displayName} floor plan`}
      className="group block overflow-hidden rounded-[0.45rem] border border-[#d6cbbc] bg-[#fbf8f2] shadow-[0_20px_45px_-35px_rgba(23,20,16,0.55)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_28px_60px_-36px_rgba(23,20,16,0.6)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b58942]"
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-[#e8dfd3]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={plan.hero}
          alt={plan.displayName}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition duration-[700ms] ease-out group-hover:scale-[1.045]"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#171410]/78 via-[#171410]/22 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <div className="absolute inset-x-0 bottom-0 p-5 text-white opacity-0 transition-opacity duration-500 group-hover:opacity-100 sm:p-6">
          <h3 className="font-serif text-3xl font-normal tracking-[-0.055em] text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)] sm:text-4xl">
            {plan.displayName}
          </h3>
        </div>
      </div>
      <div className="grid grid-cols-[1fr_1fr_1fr_auto] items-center gap-2 border-t border-[#ded4c8] bg-[#fbf8f2] px-4 py-3 text-[#6c6258]">
        <CardSpec label={brLabel} />
        <CardSpec label={baLabel} />
        <CardSpec label={sqftLabel} />
        <span className="inline-flex items-center gap-2 pl-2 text-[0.58rem] font-semibold uppercase tracking-[0.22em] text-[#b58942]">
          View Plan
          <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
            &rarr;
          </span>
        </span>
      </div>
    </a>
  );
}

type CardSpecProps = {
  label: string;
};

function CardSpec({ label }: CardSpecProps) {
  return (
    <span className="flex items-center gap-1.5 text-[0.62rem] font-medium tracking-[0.04em]">
      <span className="size-3 rounded-[0.12rem] border border-[#c8a666]" aria-hidden="true" />
      {label}
    </span>
  );
}

function CustomPlanPanel() {
  return (
    <aside className="relative isolate mt-3 overflow-hidden rounded-[0.65rem] border border-[#d8d0c4] bg-[#fbf8f2] px-6 py-8 shadow-[0_18px_45px_-38px_rgba(23,20,16,0.55)] sm:px-8 lg:px-14">
      <div className="absolute inset-y-0 right-0 hidden w-1/3 bg-[radial-gradient(circle_at_center,#d9d0c4_0,transparent_58%)] opacity-45 lg:block" />
      <div className="relative grid gap-8 lg:grid-cols-[0.18fr_1fr_auto] lg:items-center">
        <div className="flex size-16 items-center justify-center border-r border-[#c8a666] text-[#b58942] lg:size-20">
          <span className="text-3xl font-light">□</span>
        </div>
        <div>
          <p className="mb-2 text-[0.6rem] font-semibold uppercase tracking-[0.34em] text-[#b58942]">
            Designed Around You
          </p>
          <h2 className="font-serif text-2xl font-normal tracking-[-0.035em] text-[#171410] sm:text-3xl">
            Let’s create a floor plan that&apos;s uniquely yours.
          </h2>
          <p className="mt-3 max-w-[38rem] text-sm font-light leading-7 text-[#6a6158]">
            Our team will collaborate with you to design a custom floor plan
            that reflects your vision, lifestyle, and the way you live.
          </p>
        </div>
        <a
          href="/contact"
          className="inline-flex items-center justify-center gap-3 rounded-[0.45rem] border border-[#171410] bg-[#171410] px-6 py-3 text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-white transition hover:bg-[#3a3129] active:translate-y-px"
        >
          Request a Custom Floor Plan
          <span aria-hidden="true">&rarr;</span>
        </a>
      </div>
    </aside>
  );
}
