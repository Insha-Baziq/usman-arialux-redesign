import type { Metadata } from "next";

import { AriaLuxFooter, ariaLuxBrand } from "@/components/arialux-brand";
import { SobhaHeader } from "@/components/SobhaChrome";
import { ARIA_HEADER_MENU, ARIA_PLANS } from "@/components/arialux-data";
import { FloorPlansBrowser } from "@/components/FloorPlansBrowser";
import { ScrollReveal } from "@/components/ScrollReveal";
import { DarkCtaBand } from "@/components/sobha-sections";
import { AllFloorPlansHero } from "./AllFloorPlansHero";

export const metadata: Metadata = {
  title:
    "Floor Plans | AriaLux Homes — Custom Builds in Fort Wayne, IN",
  description:
    "Explore the full AriaLux Homes floor plan collection — 16 custom designs ranging from compact single-story villas to multi-generational estates, all built in Fort Wayne, Indiana.",
};

const HERO_IMAGE =
  "https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/phonto-d836382.jpeg/:/rs=w:1920,h:1080,m";

const HERO_DOOR_IMAGE =
  "https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec/phonto-2026e06.jpeg/:/rs=w:1920,h:1080,m";

export default function AllFloorPlansPage() {
  return (
    <main className="bg-[#f7f3ec] text-[#171410]">
      <SobhaHeader
        brand={ariaLuxBrand}
        menus={ARIA_HEADER_MENU}
        hideLanguageSwitcher
      />

      <AllFloorPlansHero
        heroImage={HERO_DOOR_IMAGE}
        planCount={ARIA_PLANS.length}
      />

      <ScrollReveal variant="fadeUp" delay={0.1}>
        <FloorPlansBrowser plans={ARIA_PLANS} />
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
