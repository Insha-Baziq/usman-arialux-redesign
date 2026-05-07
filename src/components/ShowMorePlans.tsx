"use client";

import { useState } from "react";
import type { AriaPlan } from "./arialux-data";
import { PlanCard } from "./PlanCard";

type ShowMorePlansProps = {
  plans: AriaPlan[];
};

export function ShowMorePlans({ plans }: ShowMorePlansProps) {
  const [open, setOpen] = useState(false);

  if (plans.length === 0) return null;

  return (
    <div className="mt-16">
      {open ? (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan) => (
            <PlanCard key={plan.slug} plan={plan} />
          ))}
        </div>
      ) : null}

      <div className="mt-12 flex justify-center">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex items-center gap-3 rounded-full border border-neutral-900 bg-neutral-900 px-8 py-3 text-[0.72rem] font-medium uppercase tracking-[0.24em] text-white transition hover:bg-white hover:text-neutral-900"
          aria-expanded={open}
        >
          {open ? "Show Less" : "Show More Plans"}
          <span aria-hidden="true">{open ? "\u2191" : "\u2193"}</span>
        </button>
      </div>
    </div>
  );
}
