import { describe, expect, it } from "vitest";

import type { AriaGalleryItem, AriaPlan } from "./arialux-data";
import {
  floorPlansToCarouselCards,
  galleryItemsToRecentBuildStories,
} from "./homepage-cms";

const basePlan: AriaPlan = {
  slug: "aria-heights",
  livePath: "/aria-heights",
  name: "Aria Heights",
  displayName: "Aria Heights",
  tagline: "Modern custom home",
  shortBlurb: "A modern home.",
  specs: {
    living: 2400,
    garage: 620,
    porch: 120,
    total: 3140,
    bedrooms: 4,
    bathrooms: 3.5,
  },
  hero: "/images/aria.jpg",
  gallery: ["/images/aria.jpg"],
  addressGroups: [],
  featuredOnHome: true,
  featuredOnListing: true,
};

describe("homepage CMS adapters", () => {
  it("uses Sanity floor plans marked for the homepage in the floor plan carousel", () => {
    const hiddenPlan: AriaPlan = {
      ...basePlan,
      slug: "hidden-plan",
      name: "Hidden Plan",
      displayName: "Hidden Plan",
      featuredOnHome: false,
    };

    expect(floorPlansToCarouselCards([basePlan, hiddenPlan])).toEqual([
      expect.objectContaining({
        title: "Aria Heights",
        href: "/floor-plans/aria-heights",
        imageUrl: "/images/aria.jpg",
        mobileImageUrl: "/images/aria.jpg",
        amenities: [
          { icon: "/images/icons/bed.svg", label: "4 Bedrooms" },
          { icon: "/images/icons/bath.svg", label: "3.5 Bathrooms" },
          { icon: "/images/icons/ruler.svg", label: "2,400 SQFT Living" },
          { icon: "/images/icons/car.svg", label: "620 SQFT Garage" },
        ],
      }),
    ]);
  });

  it("falls back to all Sanity floor plans when none are explicitly featured", () => {
    const plans = [
      { ...basePlan, featuredOnHome: false },
      {
        ...basePlan,
        slug: "villa-lana",
        name: "Villa Lana",
        displayName: "Villa Lana",
        featuredOnHome: false,
      },
    ];

    expect(floorPlansToCarouselCards(plans).map((card) => card.title)).toEqual([
      "Aria Heights",
      "Villa Lana",
    ]);
  });

  it("uses Sanity portfolio images as recent build stories", () => {
    const images: AriaGalleryItem[] = [
      {
        src: "/images/build-1.jpg",
        alt: "Custom stone exterior",
      },
    ];

    expect(galleryItemsToRecentBuildStories(images)).toEqual([
      {
        title: "Custom stone exterior",
        date: "Recent Build",
        href: "/portfolio",
        imageUrl: "/images/build-1.jpg",
      },
    ]);
  });

  it("uses featured portfolio images first for recent build stories", () => {
    const images: AriaGalleryItem[] = [
      {
        src: "/images/build-1.jpg",
        alt: "Portfolio image",
        featured: false,
      },
      {
        src: "/images/build-2.jpg",
        alt: "Featured recent build",
        featured: true,
      },
    ];

    expect(galleryItemsToRecentBuildStories(images)).toEqual([
      {
        title: "Featured recent build",
        date: "Recent Build",
        href: "/portfolio",
        imageUrl: "/images/build-2.jpg",
      },
    ]);
  });

  it("limits recent build fallback images when none are featured", () => {
    const images: AriaGalleryItem[] = Array.from({ length: 14 }, (_, index) => ({
      src: `/images/build-${index + 1}.jpg`,
      alt: `Build ${index + 1}`,
    }));

    expect(galleryItemsToRecentBuildStories(images)).toHaveLength(12);
  });

  it("limits recent build featured images", () => {
    const images: AriaGalleryItem[] = Array.from({ length: 14 }, (_, index) => ({
      src: `/images/featured-build-${index + 1}.jpg`,
      alt: `Featured Build ${index + 1}`,
      featured: true,
    }));

    expect(galleryItemsToRecentBuildStories(images)).toHaveLength(12);
  });
});
