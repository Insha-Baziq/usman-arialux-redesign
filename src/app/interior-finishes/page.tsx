/* eslint-disable @next/next/no-img-element */

import { AriaLuxFooter, ariaLuxBrand } from "@/components/arialux-brand";
import { SobhaHeader } from "@/components/SobhaChrome";
import {
  ARIA_HEADER_MENU,
  ARIA_INTERIOR_FINISHES,
} from "@/components/arialux-data";
import {
  DarkCtaBand,
  HeroBanner,
  type HeroBannerSlide,
} from "@/components/sobha-sections";

export const metadata = {
  title: "Interior Finishes — AriaLux Homes",
  description: ARIA_INTERIOR_FINISHES.intro,
};

/**
 * /interior-finishes — Sobha chrome wrapping a CSS-columns masonry of finish photos.
 * Composition: <SobhaHeader> + <HeroBanner> + masonry section (preserved) +
 * <DarkCtaBand> + <SobhaFooter>.
 */
export default function InteriorFinishesPage() {
  const heroSlide: HeroBannerSlide = {
    id: "interior-finishes-hero",
    title: ARIA_INTERIOR_FINISHES.heading,
    subtitle: ARIA_INTERIOR_FINISHES.intro,
    ctaLabel: "Schedule a Free Consultation",
    ctaHref: "/contact",
    desktopImage: ARIA_INTERIOR_FINISHES.images[0]?.src ?? "",
    mobileImage: ARIA_INTERIOR_FINISHES.images[0]?.src ?? "",
    imageAlt: "AriaLux interior finishes",
  };

  return (
    <main className="bg-white text-black">
      <SobhaHeader
        brand={ariaLuxBrand}
        menus={ARIA_HEADER_MENU}
        hideLanguageSwitcher
      />

      <HeroBanner slides={[heroSlide]} fullHeight={false} autoplayDelayMs={0} />

      <section className="px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-[81rem]">
          <div className="mb-12 flex items-end justify-between gap-6">
            <h2 className="max-w-2xl font-heading text-[2rem] font-light leading-tight text-black sm:text-[2.5rem]">
              {ARIA_INTERIOR_FINISHES.heading}
            </h2>
            <span className="hidden text-[0.7rem] font-medium uppercase tracking-[0.28em] text-black/45 sm:inline">
              {ARIA_INTERIOR_FINISHES.images.length} details
            </span>
          </div>

          <div className="columns-1 gap-4 sm:columns-2 md:columns-3 lg:columns-4 [&>*]:mb-4 [&>*]:break-inside-avoid">
            {ARIA_INTERIOR_FINISHES.images.map((item) => (
              <figure
                key={item.src}
                className="group relative overflow-hidden rounded-sm bg-black/5"
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  decoding="async"
                  className="block h-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />
              </figure>
            ))}
          </div>
        </div>
      </section>

      <DarkCtaBand
        eyebrow="Make it yours"
        headline="Specify Every Surface"
        subline="Walk our finish library with our designers and sign off on every stone, tile, and fixture before construction begins."
        ctaLabel="Book Your Consultation"
        ctaHref="/contact"
        backgroundImage={ARIA_INTERIOR_FINISHES.images[3]?.src}
      />

      <AriaLuxFooter />
    </main>
  );
}
