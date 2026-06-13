import { describe, expect, it } from "vitest";

import type { AriaPlan } from "../arialux-data";
import { getSanityGalleryGroup } from "./galleryGroups";

const plan: AriaPlan = {
  slug: "lunara-heights",
  livePath: "/lunara-heights",
  name: "Lunara Heights",
  displayName: "Lunara Heights",
  tagline: "Modern custom home",
  shortBlurb: "A modern home.",
  specs: {
    living: 2600,
    garage: 700,
    porch: 180,
    total: 3480,
    bedrooms: 4,
    bathrooms: 3,
  },
  hero: "/images/fallback-hero.jpg",
  gallery: ["/images/sanity-1.jpg", "/images/sanity-2.jpg"],
  addressGroups: [],
  featuredOnHome: true,
  featuredOnListing: true,
};

describe("floor plan gallery groups", () => {
  it("creates a gallery group from Sanity images when they exist", () => {
    expect(getSanityGalleryGroup(plan)).toEqual({
      address: "Gallery",
      images: [
        { src: "/images/sanity-1.jpg", category: "gallery" },
        { src: "/images/sanity-2.jpg", category: "gallery" },
      ],
    });
  });

  it("does not treat the hero fallback as a Sanity gallery", () => {
    expect(getSanityGalleryGroup({ ...plan, gallery: [] })).toBeNull();
  });
});
