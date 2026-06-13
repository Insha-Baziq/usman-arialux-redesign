import type { AriaGalleryItem, AriaPlan } from "./arialux-data";
import type { CarouselCard } from "./sobha-sections/CardCarousel";
import type { StoryItem } from "./sobha-sections/StoryGrid";

const icon = (name: string) => `/images/icons/${name}.svg`;

function bathroomLabel(value: number): string {
  return `${value} Bathroom${value === 1 ? "" : "s"}`;
}

function planToCarouselCard(plan: AriaPlan): CarouselCard {
  return {
    title: plan.displayName,
    href: `/floor-plans/${plan.slug}`,
    imageUrl: plan.hero,
    mobileImageUrl: plan.hero,
    amenities: [
      { icon: icon("bed"), label: `${plan.specs.bedrooms} Bedrooms` },
      { icon: icon("bath"), label: bathroomLabel(plan.specs.bathrooms) },
      {
        icon: icon("ruler"),
        label: `${plan.specs.living.toLocaleString()} SQFT Living`,
      },
      {
        icon: icon("car"),
        label: `${plan.specs.garage.toLocaleString()} SQFT Garage`,
      },
    ],
  };
}

export function floorPlansToCarouselCards(plans: AriaPlan[]): CarouselCard[] {
  const featuredPlans = plans.filter((plan) => plan.featuredOnHome);
  const visiblePlans = featuredPlans.length > 0 ? featuredPlans : plans;

  return visiblePlans.map(planToCarouselCard);
}

export function galleryItemsToRecentBuildStories(
  images: AriaGalleryItem[],
): StoryItem[] {
  const featuredImages = images.filter((image) => image.featured);
  const sourceImages = featuredImages.length > 0 ? featuredImages : images;
  const visibleImages = sourceImages.slice(0, 12);

  return visibleImages.map((image) => ({
    title: image.alt || "Recent Build",
    date: "Recent Build",
    href: "/portfolio",
    imageUrl: image.src,
  }));
}
