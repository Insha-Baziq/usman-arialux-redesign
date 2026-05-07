import { AriaLuxFooter, ariaLuxBrand } from "@/components/arialux-brand";
import { SobhaHeader } from "@/components/SobhaChrome";
import {
  ARIA_HEADER_MENU,
  ARIA_PLANS,
  ARIA_WHO_WE_ARE,
} from "@/components/arialux-data";
import { DarkCtaBand } from "@/components/sobha-sections";
import { WhoWeAreMissionReveal } from "./WhoWeAreMissionReveal";

/**
 * /who-we-are — responsive split mission layout.
 * Mobile stays stacked; larger screens place the image beside the mission copy.
 */
export default function WhoWeArePage() {
  return (
    <main className="bg-[#f7f3ec] text-black">
      <SobhaHeader
        brand={ariaLuxBrand}
        menus={ARIA_HEADER_MENU}
        hideLanguageSwitcher
      />

      <WhoWeAreMissionReveal
        eyebrow="AriaLux Homes"
        heading={ARIA_WHO_WE_ARE.heading}
        hero={ARIA_WHO_WE_ARE.hero}
        mission={ARIA_WHO_WE_ARE.mission}
      />

      <DarkCtaBand
        eyebrow="Ready to begin?"
        headline="Build with AriaLux"
        subline="Schedule a free consultation and let's start designing the home that will outlast trends, generations, and time itself."
        ctaLabel="Start the Conversation"
        ctaHref="/contact"
        backgroundImage={ARIA_PLANS[1]?.gallery[0]}
      />

      <AriaLuxFooter />
    </main>
  );
}
