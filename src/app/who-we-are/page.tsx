import { AriaLuxFooter, ariaLuxBrand } from "@/components/arialux-brand";
import { SobhaHeader } from "@/components/SobhaChrome";
import {
  ARIA_HEADER_MENU,
  ARIA_PLANS,
  ARIA_WHO_WE_ARE,
} from "@/components/arialux-data";
import { DarkCtaBand } from "@/components/sobha-sections";

/**
 * /who-we-are — single hero image (no overlay copy) + mission paragraph.
 * Hero text was removed at user's request: image speaks for itself.
 */
export default function WhoWeArePage() {
  return (
    <main className="bg-white text-black">
      <SobhaHeader
        brand={ariaLuxBrand}
        menus={ARIA_HEADER_MENU}
        hideLanguageSwitcher
      />

      <section className="relative w-full overflow-hidden">
        <img
          src={ARIA_WHO_WE_ARE.hero}
          alt="AriaLux Homes"
          className="block h-auto w-full"
        />
      </section>

      <section id="mission" className="bg-white px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-[58rem] text-center">
          <span className="text-[0.72rem] uppercase tracking-[0.3em] text-black/55">
            AriaLux Homes
          </span>
          <h2 className="mt-4 font-heading text-[2rem] font-light leading-tight text-black sm:text-[2.5rem] lg:text-[3rem]">
            {ARIA_WHO_WE_ARE.heading}
          </h2>
          <p className="mx-auto mt-8 max-w-[52rem] text-left text-[1.05rem] font-light leading-8 text-black/75 sm:text-[1.1rem] sm:leading-[2.05rem]">
            {ARIA_WHO_WE_ARE.mission}
          </p>
        </div>
      </section>

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
