import type { AriaPlan } from "./arialux-data";
import Image from "next/image";

type PlanCardProps = {
  plan: AriaPlan;
};

export function PlanCard({ plan }: PlanCardProps) {
  const specsLine = `${plan.specs.living.toLocaleString()} SQFT \u2022 ${plan.specs.bedrooms} BR \u2022 ${plan.specs.bathrooms} BA`;

  return (
    <a
      href={`/floor-plans/${plan.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-[0_10px_30px_-18px_rgba(0,0,0,0.35)] ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_-24px_rgba(0,0,0,0.45)]"
      data-aos="fade-up"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100">
        <Image
          src={plan.hero}
          alt={plan.displayName}
          fill
          className="object-cover transition-transform duration-[700ms] ease-out group-hover:scale-[1.06]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <h3 className="text-lg font-medium uppercase tracking-[0.18em] text-neutral-900">
          {plan.displayName}
        </h3>
        <p className="text-[0.7rem] font-medium uppercase tracking-[0.22em] text-neutral-500">
          {specsLine}
        </p>
        <p className="text-sm font-light leading-relaxed text-neutral-600">
          {plan.tagline}
        </p>
        <span className="mt-auto inline-flex items-center gap-2 pt-4 text-[0.72rem] font-medium uppercase tracking-[0.24em] text-neutral-900">
          View Plan
          <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
            &rarr;
          </span>
        </span>
      </div>
    </a>
  );
}
