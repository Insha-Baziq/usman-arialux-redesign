import type { Metadata } from "next";

import { AriaLuxFooter, ariaLuxBrand } from "@/components/arialux-brand";
import { SobhaHeader } from "@/components/SobhaChrome";
import { ARIA_PLANS } from "@/components/arialux-data";
import { FloorPlansBrowser } from "@/components/FloorPlansBrowser";
import { ScrollReveal } from "@/components/ScrollReveal";
import { DarkCtaBand } from "@/components/sobha-sections";
import { getCmsFloorPlans, getHeaderMenu } from "@/sanity/lib/content";
import { AllFloorPlansHero } from "./AllFloorPlansHero";

export const metadata: Metadata = {
  title:
    "Floor Plans | AriaLux Homes — Custom Builds in Fort Wayne, IN",
  description:
    "Explore the full AriaLux Homes floor plan collection — 23 custom designs ranging from compact single-story villas to multi-generational estates, all built in Fort Wayne, Indiana.",
};

const HERO_IMAGE =
  "/images/arialux-gallery/phonto-d836382.jpeg";

const HERO_DOOR_IMAGE =
  "/images/floor-plans/aria-heights/phonto-2026e06.jpeg";

export const revalidate = 60;

export default async function AllFloorPlansPage() {
  const plans = (await getCmsFloorPlans()) ?? ARIA_PLANS;

  return (
    <main className="bg-[#f7f3ec] text-[#171410]">
      <SobhaHeader
        brand={ariaLuxBrand}
        menus={await getHeaderMenu()}
        hideLanguageSwitcher
      />

      <AllFloorPlansHero
        heroImage={HERO_DOOR_IMAGE}
        planCount={plans.length}
      />

      <ScrollReveal variant="fadeUp" delay={0.1}>
        <FloorPlansBrowser plans={plans} />
      </ScrollReveal>

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
