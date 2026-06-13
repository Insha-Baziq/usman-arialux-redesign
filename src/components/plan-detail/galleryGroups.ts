import type { AriaPlan } from "../arialux-data";
import type { PlanGalleryGroup } from "./PlanGalleryDialog";

export function getSanityGalleryGroup(
  plan: Pick<AriaPlan, "gallery">,
): PlanGalleryGroup | null {
  const images = Array.from(new Set(plan.gallery.filter(Boolean))).map((src) => ({
    src,
    category: "gallery" as const,
  }));

  if (images.length === 0) return null;

  return {
    address: "Gallery",
    images,
  };
}
