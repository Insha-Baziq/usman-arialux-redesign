import { AriaLuxFooter, ariaLuxBrand } from "@/components/arialux-brand";
import { SobhaHeader } from "@/components/SobhaChrome";
import {
  ARIA_PLANS,
  ARIA_WHO_WE_ARE,
} from "@/components/arialux-data";
import { DarkCtaBand } from "@/components/sobha-sections";
import { getHeaderMenu } from "@/sanity/lib/content";
import { getWhoWeArePageContent } from "@/sanity/lib/pages";
import { WhoWeAreMissionReveal } from "./WhoWeAreMissionReveal";

export const revalidate = 60;

/**
 * /who-we-are — responsive split mission layout.
 * Mobile stays stacked; larger screens place the image beside the mission copy.
 */
export default async function WhoWeArePage() {
  const content = await getWhoWeArePageContent(
    ARIA_WHO_WE_ARE,
    ARIA_PLANS[1]?.gallery[0],
  );

  return (
    <main className="bg-[#f7f3ec] text-black">
      <SobhaHeader
        brand={ariaLuxBrand}
        menus={await getHeaderMenu()}
        hideLanguageSwitcher
      />

      <WhoWeAreMissionReveal
        eyebrow={content.eyebrow}
        heading={content.heading}
        hero={content.hero}
        mission={content.mission}
      />

      <DarkCtaBand
        eyebrow={content.ctaEyebrow}
        headline={content.ctaHeadline}
        subline={content.ctaSubline}
        ctaLabel={content.ctaLabel}
        ctaHref={content.ctaHref}
        backgroundImage={content.ctaBackgroundImage}
      />

      <AriaLuxFooter />
    </main>
  );
}
