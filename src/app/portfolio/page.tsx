import { AriaLuxFooter, ariaLuxBrand } from "@/components/arialux-brand";
import { ARIA_PORTFOLIO } from "@/components/arialux-data";
import { PortfolioGallery } from "@/components/PortfolioGallery";
import { SobhaHeader } from "@/components/SobhaChrome";
import {
  DarkCtaBand,
  PageHero,
} from "@/components/sobha-sections";
import Image from "next/image";
import { getCmsGalleryItems, getCmsPortfolioImages, getHeaderMenu } from "@/sanity/lib/content";

export const metadata = {
  title: "Portfolio - AriaLux Homes",
  description: ARIA_PORTFOLIO.intro,
};

export const revalidate = 60;

export default async function PortfolioPage() {
  const images =
    (await getCmsPortfolioImages()) ??
    (await getCmsGalleryItems("portfolio")) ??
    ARIA_PORTFOLIO.images;

  return (
    <main className="bg-[#f7f3ec] text-black">
      <SobhaHeader
        brand={ariaLuxBrand}
        menus={await getHeaderMenu()}
        hideLanguageSwitcher
      />

      <PageHero
        eyebrow="Portfolio"
        heading={ARIA_PORTFOLIO.heading}
        description={ARIA_PORTFOLIO.intro}
        backgroundImage={images[0]?.src ?? ""}
        imageAlt={ARIA_PORTFOLIO.heading}
        ctaLabel="Schedule a Free Consultation"
      >
        <div className="portfolio-hero-stack" aria-hidden="true">
          {[images[3], images[11], images[18]].map((image, index) =>
            image ? (
              <div
                key={`${image.src}-hero-${index}`}
                className={`portfolio-hero-stack__image portfolio-hero-stack__image--${index + 1}`}
              >
                <Image src={image.src} alt="" fill className="object-cover opacity-[0.62] saturate-[0.8] contrast-[0.92]" sizes="25rem" />
              </div>
            ) : null,
          )}
        </div>
      </PageHero>

      <PortfolioGallery images={images} />

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
