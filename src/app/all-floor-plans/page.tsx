import type { Metadata } from "next";

import { AriaLuxFooter, ariaLuxBrand } from "@/components/arialux-brand";
import { SobhaHeader } from "@/components/SobhaChrome";
import { ARIA_HEADER_MENU, ARIA_LISTING, ARIA_PLANS } from "@/components/arialux-data";
import { FloorPlansBrowser } from "@/components/FloorPlansBrowser";
import { DarkCtaBand } from "@/components/sobha-sections";

export const metadata: Metadata = {
  title:
    "Floor Plans | AriaLux Homes \u2014 Custom Builds in Fort Wayne, IN",
  description:
    "Explore the full AriaLux Homes floor plan collection \u2014 16 custom designs ranging from compact single-story villas to multi-generational estates, all built in Fort Wayne, Indiana.",
};

const HERO_IMAGE =
  "https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/phonto-d836382.jpeg/:/rs=w:1920,h:1080,m";

/**
 * /all-floor-plans
 *
 * Sobha-style filterable listing. Composition:
 *   <SobhaHeader> + tight intro band + <FloorPlansBrowser> (filter chips +
 *   stat-overlay grid showing all 16 plans with no Show More) +
 *   <DarkCtaBand> + <AriaLuxFooter>.
 */
export default function AllFloorPlansPage() {
  return (
    <main className="bg-white text-black">
      <SobhaHeader
        brand={ariaLuxBrand}
        menus={ARIA_HEADER_MENU}
        hideLanguageSwitcher
      />

      <section className="border-b border-black/10 bg-white px-6 pb-12 pt-32 lg:px-10 lg:pb-16 lg:pt-36">
        <div className="mx-auto grid max-w-[81rem] gap-10 lg:grid-cols-12 lg:items-end lg:gap-16">
          <div className="space-y-6 lg:col-span-7">
            <span className="text-[0.72rem] font-medium uppercase tracking-[0.3em] text-black/55">
              The collection
            </span>
            <h1 className="text-4xl font-light leading-[1.05] tracking-tight text-neutral-900 sm:text-5xl lg:text-6xl">
              Floor Plans
            </h1>
            <p className="max-w-[32rem] text-base font-light leading-[1.85] text-black/70 sm:text-lg">
              {ARIA_LISTING.heading}
            </p>
          </div>

          <div className="space-y-5 lg:col-span-5">
            <div className="grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-black/10 bg-black/10 text-center">
              <CollectionStat value={String(ARIA_PLANS.length)} label="Plans" />
              <CollectionStat value="1,120+" label="Min SQFT" />
              <CollectionStat value="4,070" label="Max SQFT" />
            </div>
            <a
              href={ARIA_LISTING.ctaHref}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-neutral-900 bg-neutral-900 px-6 py-3 text-[0.72rem] font-medium uppercase tracking-[0.24em] text-white transition hover:bg-neutral-700"
            >
              {ARIA_LISTING.ctaLabel}
            </a>
          </div>
        </div>
      </section>

      <FloorPlansBrowser plans={ARIA_PLANS} />

      <DarkCtaBand
        eyebrow="Find your plan"
        headline="Not Sure Which Plan Fits?"
        subline="Tell us about your lot, your family, and your budget. We'll point you to the three plans worth pricing out."
        ctaLabel="Schedule a Free Consultation"
        ctaHref="/contact"
        backgroundImage={HERO_IMAGE}
      />

      <AriaLuxFooter />
    </main>
  );
}

type CollectionStatProps = {
  value: string;
  label: string;
};

function CollectionStat({ value, label }: CollectionStatProps) {
  return (
    <div className="flex flex-col items-center gap-1 bg-white px-3 py-5">
      <span className="text-2xl font-light text-neutral-900 sm:text-3xl">{value}</span>
      <span className="text-[0.62rem] font-medium uppercase tracking-[0.22em] text-black/55">
        {label}
      </span>
    </div>
  );
}
