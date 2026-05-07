/* eslint-disable @next/next/no-img-element */

import { AriaLuxFooter, ariaLuxBrand } from "@/components/arialux-brand";
import { SobhaHeader } from "@/components/SobhaChrome";
import {
  ARIA_HEADER_MENU,
  ARIA_PORTFOLIO,
} from "@/components/arialux-data";
import { ScrollReveal } from "@/components/ScrollReveal";
import {
  DarkCtaBand,
  PageHero,
} from "@/components/sobha-sections";
import { cn } from "@/lib/utils";

export const metadata = {
  title: "Portfolio — AriaLux Homes",
  description: ARIA_PORTFOLIO.intro,
};

const FILTERS = ["All", "Exteriors", "Interiors", "Kitchens", "Baths"] as const;

export default function PortfolioPage() {
  const images = ARIA_PORTFOLIO.images;

  return (
    <main className="bg-[#f7f3ec] text-black">
      <SobhaHeader
        brand={ariaLuxBrand}
        menus={ARIA_HEADER_MENU}
        hideLanguageSwitcher
      />

      <PageHero
        eyebrow="Our work"
        heading="Portfolio"
        description={ARIA_PORTFOLIO.intro}
        backgroundImage={images[0]?.src ?? ""}
        imageAlt={ARIA_PORTFOLIO.heading}
        ctaLabel="Schedule a Free Consultation"
      />

      {/* Filter strip */}
      <ScrollReveal variant="fadeUp" delay={0.1} duration={0.7}>
        <section className="border-b border-[#d8d0c4] px-6 py-6 lg:px-10">
          <div className="mx-auto flex max-w-[81rem] flex-wrap items-center gap-3">
            {FILTERS.map((label, idx) => (
              <span
                key={label}
                className={cn(
                  "rounded-full border px-5 py-2 text-[0.62rem] font-semibold uppercase tracking-[0.16em] transition",
                  idx === 0
                    ? "border-[#b58942] bg-[#b58942] text-white shadow-[0_12px_30px_-24px_rgba(181,137,66,0.8)]"
                    : "border-[#d9d0c4] bg-[#fbf8f2] text-[#3f372f] hover:border-[#b58942] hover:text-[#171410]",
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
      </ScrollReveal>

      {/* Photo grid — staggered reveals */}
      <section className="px-6 py-20 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-[81rem]">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-6">
            {images.map((item, idx) => {
              const isHero = idx < 6;
              const num = String(idx + 1).padStart(2, "0");
              const total = String(images.length).padStart(2, "0");
              return (
                <ScrollReveal
                  key={`${item.src}-${idx}`}
                  as="figure"
                  variant="scaleUp"
                  index={idx}
                  stagger={0.06}
                  duration={0.8}
                  className={cn(
                    "group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-[0.45rem] border border-[#d6cbbc]/60 bg-[#e8dfd3] shadow-[0_16px_40px_-30px_rgba(23,20,16,0.35)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_55px_-30px_rgba(23,20,16,0.5)]",
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
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  />
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <span className="text-[0.6rem] font-medium uppercase tracking-[0.28em] text-white/80">
                      {num} / {total}
                    </span>
                    <span className="flex size-9 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-sm">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                        <path d="M6 2H3a1 1 0 00-1 1v3M10 2h3a1 1 0 011 1v3M10 14h3a1 1 0 001-1v-3M6 14H3a1 1 0 01-1-1v-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </div>
                </ScrollReveal>
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
