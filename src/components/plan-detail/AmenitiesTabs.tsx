"use client";

/* eslint-disable @next/next/no-img-element */
import { useState } from "react";

export type AmenityItem = {
  label: string;
  image: string;
};

export type AmenityCategory = {
  id: string;
  label: string;
  items: AmenityItem[];
};

type AmenitiesTabsProps = {
  categories: AmenityCategory[];
};

export function AmenitiesTabs({ categories }: AmenitiesTabsProps) {
  const [activeId, setActiveId] = useState<string>(categories[0]?.id ?? "");
  const active = categories.find((c) => c.id === activeId) ?? categories[0];
  if (!active) return null;

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-wrap items-center justify-center gap-3">
        {categories.map((cat) => {
          const isActive = cat.id === active.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveId(cat.id)}
              className={
                isActive
                  ? "rounded-full border border-black bg-black px-7 py-2.5 text-[0.72rem] font-medium uppercase tracking-[0.22em] text-white transition"
                  : "rounded-full border border-black/25 bg-transparent px-7 py-2.5 text-[0.72rem] font-medium uppercase tracking-[0.22em] text-black/65 transition hover:border-black hover:text-black"
              }
              aria-pressed={isActive}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      <ul className="flex gap-6 overflow-x-auto pb-4 [scrollbar-width:thin]">
        {active.items.map((item) => (
          <li
            key={`${active.id}-${item.label}`}
            className="flex w-[280px] shrink-0 flex-col gap-3 sm:w-[320px] lg:w-[360px]"
          >
            <div className="aspect-[4/5] w-full overflow-hidden rounded-xl bg-[#f5f3ef]">
              <img
                src={item.image}
                alt={item.label}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-[700ms] ease-out hover:scale-[1.04]"
              />
            </div>
            <span className="text-[0.78rem] font-medium uppercase tracking-[0.22em] text-black">
              {item.label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
