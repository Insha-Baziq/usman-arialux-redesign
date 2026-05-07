/* eslint-disable @next/next/no-img-element */

import { AriaLuxFooter, ariaLuxBrand } from "@/components/arialux-brand";
import { SobhaHeader } from "@/components/SobhaChrome";
import {
  ARIA_HEADER_MENU,
  ARIA_INTERIOR_FINISHES,
} from "@/components/arialux-data";
import { MaskReveal, ScrollReveal } from "@/components/ScrollReveal";
import {
  DarkCtaBand,
  PageHero,
} from "@/components/sobha-sections";

export const metadata = {
  title: "Interior Finishes — AriaLux Homes",
  description: ARIA_INTERIOR_FINISHES.intro,
};

export default function InteriorFinishesPage() {
  return (
    <main className="bg-[#f7f3ec] text-black">
      <SobhaHeader
        brand={ariaLuxBrand}
        menus={ARIA_HEADER_MENU}
        hideLanguageSwitcher
      />

      <PageHero
        eyebrow="Crafted details"
        heading={ARIA_INTERIOR_FINISHES.heading}
        description={ARIA_INTERIOR_FINISHES.intro}
        backgroundImage={ARIA_INTERIOR_FINISHES.images[0]?.src ?? ""}
        imageAlt="AriaLux interior finishes"
        ctaLabel="Schedule a Free Consultation"
      />

      {/* Masonry section */}
      <section className="px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-[81rem]">
          <div className="mb-12 flex items-end justify-between gap-6">
            <MaskReveal delay={0.1}>
              <h2 className="max-w-2xl font-heading text-[2rem] font-light leading-tight text-black sm:text-[2.5rem]">
                {ARIA_INTERIOR_FINISHES.heading}
              </h2>
            </MaskReveal>
            <ScrollReveal variant="fadeIn" delay={0.3} duration={0.6}>
              <span className="hidden text-[0.7rem] font-medium uppercase tracking-[0.28em] text-black/45 sm:inline">
                {ARIA_INTERIOR_FINISHES.images.length} details
              </span>
            </ScrollReveal>
          </div>

          <div className="columns-1 gap-4 sm:columns-2 md:columns-3 lg:columns-4 [&>*]:mb-4 [&>*]:break-inside-avoid">
            {ARIA_INTERIOR_FINISHES.images.map((item, idx) => (
              <ScrollReveal
                key={item.src}
                as="figure"
                variant="scaleUp"
                index={idx}
                stagger={0.06}
                duration={0.8}
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
              </ScrollReveal>
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
