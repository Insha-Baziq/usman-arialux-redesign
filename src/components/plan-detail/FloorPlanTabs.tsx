"use client";

/* eslint-disable @next/next/no-img-element */
import { useState } from "react";

export type FloorPlanTab = {
  id: string;
  label: string;
  bedroomLabel: string;
  bathroomLabel: string;
  livingLabel: string;
  totalLabel: string;
  image: string;
};

type FloorPlanTabsProps = {
  tabs: FloorPlanTab[];
};

export function FloorPlanTabs({ tabs }: FloorPlanTabsProps) {
  const [activeId, setActiveId] = useState<string>(tabs[0]?.id ?? "");
  const active = tabs.find((t) => t.id === activeId) ?? tabs[0];
  if (!active) return null;

  return (
    <div className="grid gap-12 lg:grid-cols-[minmax(0,0.45fr)_minmax(0,1fr)]">
      <div className="flex flex-col gap-8">
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => {
            const isActive = tab.id === active.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveId(tab.id)}
                className={
                  isActive
                    ? "rounded-full border border-black bg-black px-6 py-2 text-[0.72rem] font-medium uppercase tracking-[0.22em] text-white transition"
                    : "rounded-full border border-black/30 bg-transparent px-6 py-2 text-[0.72rem] font-medium uppercase tracking-[0.22em] text-black/70 transition hover:border-black hover:text-black"
                }
                aria-pressed={isActive}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <dl className="grid grid-cols-2 gap-x-8 gap-y-6 border-t border-black/10 pt-8">
          <div className="flex flex-col gap-2">
            <dt className="text-[0.62rem] font-medium uppercase tracking-[0.28em] text-black/55">
              Bedrooms
            </dt>
            <dd className="text-2xl font-light tracking-wide text-black">
              {active.bedroomLabel}
            </dd>
          </div>
          <div className="flex flex-col gap-2">
            <dt className="text-[0.62rem] font-medium uppercase tracking-[0.28em] text-black/55">
              Bathrooms
            </dt>
            <dd className="text-2xl font-light tracking-wide text-black">
              {active.bathroomLabel}
            </dd>
          </div>
          <div className="flex flex-col gap-2">
            <dt className="text-[0.62rem] font-medium uppercase tracking-[0.28em] text-black/55">
              Living Area
            </dt>
            <dd className="text-2xl font-light tracking-wide text-black">
              {active.livingLabel}
            </dd>
          </div>
          <div className="flex flex-col gap-2">
            <dt className="text-[0.62rem] font-medium uppercase tracking-[0.28em] text-black/55">
              Total Area
            </dt>
            <dd className="text-2xl font-light tracking-wide text-black">
              {active.totalLabel}
            </dd>
          </div>
        </dl>
      </div>

      <div className="overflow-hidden rounded-2xl bg-[#f5f3ef] ring-1 ring-black/10">
        <img
          src={active.image}
          alt={`${active.label} layout`}
          className="block aspect-[4/3] w-full object-cover"
          loading="lazy"
          decoding="async"
        />
      </div>
    </div>
  );
}
