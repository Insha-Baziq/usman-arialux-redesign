import { AriaLuxFooter, ariaLuxBrand } from "@/components/arialux-brand";
import { SobhaHeader } from "@/components/SobhaChrome";
import {
  ARIA_HEADER_MENU,
  ARIA_INTERIOR_FINISHES,
} from "@/components/arialux-data";
import { InteriorFinishesGallery } from "@/components/InteriorFinishesGallery";
import { MaskReveal, ScrollReveal } from "@/components/ScrollReveal";
import {
  DarkCtaBand,
  PageHero,
} from "@/components/sobha-sections";
import { getCmsGalleryItems } from "@/sanity/lib/content";

export const metadata = {
  title: "Interior Finishes — AriaLux Homes",
  description: ARIA_INTERIOR_FINISHES.intro,
};

export const revalidate = 60;

export default async function InteriorFinishesPage() {
  const images =
    (await getCmsGalleryItems("interior-finishes")) ??
    ARIA_INTERIOR_FINISHES.images;

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
                {images.length} details
              </span>
            </ScrollReveal>
          </div>

          <InteriorFinishesGallery images={images} />
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
