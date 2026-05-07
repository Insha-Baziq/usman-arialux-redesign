/* eslint-disable @next/next/no-img-element */

import { AriaLuxFooter, ariaLuxBrand } from "@/components/arialux-brand";
import { SobhaHeader } from "@/components/SobhaChrome";
import {
  ARIA_HEADER_MENU,
  ARIA_PORTFOLIO,
} from "@/components/arialux-data";
import {
  DarkCtaBand,
  HeroBanner,
  type HeroBannerSlide,
} from "@/components/sobha-sections";
import { cn } from "@/lib/utils";

export const metadata = {
  title: "Portfolio — AriaLux Homes",
  description: ARIA_PORTFOLIO.intro,
};

const FILTERS = ["All", "Exteriors", "Interiors", "Kitchens", "Baths"] as const;

/**
 * /portfolio — Sobha chrome with a 6-col bento grid of project photos.
 * Composition: <SobhaHeader> + <HeroBanner> + decorative filter strip +
 * 6-col bento grid (preserved) + <DarkCtaBand> + <SobhaFooter>.
 */
export default function PortfolioPage() {
  const images = ARIA_PORTFOLIO.images;
  const heroSlide: HeroBannerSlide = {
    id: "portfolio-hero",
    title: "Portfolio",
    subtitle: ARIA_PORTFOLIO.intro,
    ctaLabel: "Schedule a Free Consultation",
    ctaHref: "/contact",
    desktopImage: images[0]?.src ?? "",
    mobileImage: images[0]?.src ?? "",
    imageAlt: ARIA_PORTFOLIO.heading,
  };

  return (
    <main className="bg-white text-black">
      <SobhaHeader
        brand={ariaLuxBrand}
        menus={ARIA_HEADER_MENU}
        hideLanguageSwitcher
      />

      <HeroBanner slides={[heroSlide]} fullHeight={false} autoplayDelayMs={0} />

      <section className="border-b border-black/10 px-6 py-6 lg:px-10">
        <div className="mx-auto flex max-w-[81rem] flex-wrap items-center gap-3">
          {FILTERS.map((label, idx) => (
            <span
              key={label}
              className={cn(
                "rounded-full border px-5 py-2 text-[0.7rem] font-medium uppercase tracking-[0.22em]",
                idx === 0
                  ? "border-black bg-black text-white"
                  : "border-black/15 text-black/70",
              )}
            >
              {label}
            </span>
          ))}
          <span className="ml-auto text-[0.7rem] font-medium uppercase tracking-[0.28em] text-black/45">
            {images.length} projects
          </span>
        </div>
      </section>

      <section className="px-6 py-20 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-[81rem]">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
            {images.map((item, idx) => {
              const isHero = idx < 6;
              return (
                <figure
                  key={`${item.src}-${idx}`}
                  className={cn(
                    "group relative overflow-hidden rounded-sm bg-black/5 aspect-[4/3]",
                    isHero ? "lg:col-span-3" : "lg:col-span-2",
                  )}
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    loading={idx < 4 ? "eager" : "lazy"}
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  />
                </figure>
              );
            })}
          </div>
        </div>
      </section>

      <DarkCtaBand
        eyebrow="Your build, next"
        headline="Start the Conversation"
        subline="Book a free consultation and we'll walk through what your version of an AriaLux home looks like."
        ctaLabel="Book Your Consultation"
        ctaHref="/contact"
        backgroundImage={images[6]?.src ?? images[0]?.src}
      />

      <AriaLuxFooter />
    </main>
  );
}
