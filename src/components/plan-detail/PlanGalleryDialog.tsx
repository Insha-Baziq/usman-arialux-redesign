"use client";

/* eslint-disable @next/next/no-img-element */

import { ArrowLeft, ArrowRight, ImageIcon, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";

export type PlanGalleryImage = {
  src: string;
  category: "gallery" | "floor-plans" | "3d-renders";
};

export type PlanGalleryGroup = {
  address: string;
  images: PlanGalleryImage[];
};

type PlanGalleryDialogProps = {
  planName: string;
  groups: PlanGalleryGroup[];
  triggerClassName: string;
};

const CATEGORY_LABELS: Record<PlanGalleryImage["category"] | "all", string> = {
  all: "All",
  gallery: "Gallery",
  "floor-plans": "Floor Plans",
  "3d-renders": "3D Renders",
};

const CATEGORY_ORDER: Array<PlanGalleryImage["category"] | "all"> = [
  "all",
  "gallery",
  "floor-plans",
  "3d-renders",
];

const ALL_ADDRESSES = "__all__";

function uniqueImages(images: PlanGalleryImage[]): PlanGalleryImage[] {
  const seen = new Set<string>();
  return images.filter((image) => {
    if (seen.has(image.src)) return false;
    seen.add(image.src);
    return true;
  });
}

export function PlanGalleryDialog({
  planName,
  groups,
  triggerClassName,
}: PlanGalleryDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const hasAddressTabs = groups.some((group) => group.address !== "Gallery");
  const [activeAddress, setActiveAddress] = useState(
    hasAddressTabs ? ALL_ADDRESSES : groups[0]?.address ?? "",
  );
  const [activeCategory, setActiveCategory] =
    useState<PlanGalleryImage["category"] | "all">("all");
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  const activeGroup =
    groups.find((group) => group.address === activeAddress) ?? groups[0];
  const allImages = useMemo(
    () => uniqueImages(groups.flatMap((group) => group.images)),
    [groups],
  );
  const activeImages = useMemo(
    () =>
      hasAddressTabs && activeAddress === ALL_ADDRESSES
        ? allImages
        : activeGroup?.images ?? [],
    [activeAddress, activeGroup?.images, allImages, hasAddressTabs],
  );
  const availableCategories = useMemo(() => {
    const categories = new Set(activeImages.map((image) => image.category));
    return CATEGORY_ORDER.filter(
      (category) => category === "all" || categories.has(category),
    );
  }, [activeImages]);
  const filteredImages = uniqueImages(
    activeImages.filter(
      (image) => activeCategory === "all" || image.category === activeCategory,
    ),
  );
  const focusedImage =
    focusedIndex === null ? null : filteredImages[focusedIndex] ?? null;
  const canFocusPrevious = focusedIndex !== null && focusedIndex > 0;
  const canFocusNext =
    focusedIndex !== null && focusedIndex < filteredImages.length - 1;
  const showImageNavigation = filteredImages.length > 1;
  const showFooterNavigation = focusedIndex !== null && showImageNavigation;

  const focusPreviousImage = useCallback(() => {
    setFocusedIndex((index) => {
      if (index === null) return filteredImages.length > 0 ? 0 : null;
      return Math.max(index - 1, 0);
    });
  }, [filteredImages.length]);

  const focusNextImage = useCallback(() => {
    setFocusedIndex((index) => {
      if (index === null) return filteredImages.length > 0 ? 0 : null;
      return Math.min(index + 1, filteredImages.length - 1);
    });
  }, [filteredImages.length]);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        setFocusedIndex(null);
      }
      if (focusedIndex === null) return;
      if (event.key === "ArrowRight") {
        focusNextImage();
      }
      if (event.key === "ArrowLeft") {
        focusPreviousImage();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [focusNextImage, focusPreviousImage, focusedIndex, isOpen]);

  if (groups.length === 0) return null;

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={triggerClassName}
      >
        View Gallery
        <span aria-hidden="true">&rsaquo;</span>
      </button>

      {isOpen ? (
        <div
          className="fixed inset-0 z-[100] bg-[#15120f]/62 px-3 py-4 backdrop-blur-[2px] sm:px-6 lg:px-10"
          role="dialog"
          aria-modal="true"
          aria-label={`${planName} gallery`}
        >
          <div className="mx-auto flex h-full max-w-[84rem] flex-col overflow-hidden rounded-[0.28rem] border border-[#d9c5a5]/45 bg-[#1d1b18] text-[#f8f4ec] shadow-[0_28px_90px_-30px_rgba(0,0,0,0.9)]">
            <header className="flex shrink-0 items-start justify-between gap-4 border-b border-white/10 px-5 py-5 sm:px-8">
              <div className="min-w-0">
                <div className="flex flex-wrap items-end gap-3">
                  <h2 className="font-heading text-3xl font-normal leading-none text-[#f8f4ec] sm:text-4xl">
                    {planName} Gallery
                  </h2>
                  <span className="pb-1 text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-[#d1b27a]">
                    {filteredImages.length} Images
                  </span>
                </div>
                {hasAddressTabs ? (
                  <div className="mt-5 flex gap-2 overflow-x-auto [scrollbar-color:#b58942_#2b2722] [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#b58942] [&::-webkit-scrollbar-track]:bg-[#2b2722]">
                    <button
                      type="button"
                      onClick={() => {
                        setActiveAddress(ALL_ADDRESSES);
                        setActiveCategory("all");
                        setFocusedIndex(null);
                      }}
                      className={`shrink-0 rounded-[0.16rem] border px-4 py-2 text-[0.62rem] font-semibold uppercase tracking-[0.18em] transition ${
                        activeAddress === ALL_ADDRESSES
                          ? "border-[#b58942] bg-[#b58942] text-white"
                          : "border-white/14 bg-white/[0.03] text-white/72 hover:border-[#b58942]/70 hover:text-white"
                      }`}
                    >
                      All
                    </button>
                    {groups.map((group) => {
                      const isActive = group.address === activeAddress;
                      return (
                        <button
                          key={group.address}
                          type="button"
                          onClick={() => {
                            setActiveAddress(group.address);
                            setActiveCategory("all");
                            setFocusedIndex(null);
                          }}
                          className={`shrink-0 rounded-[0.16rem] border px-4 py-2 text-[0.62rem] font-semibold uppercase tracking-[0.18em] transition ${
                            isActive
                              ? "border-[#b58942] bg-[#b58942] text-white"
                              : "border-white/14 bg-white/[0.03] text-white/72 hover:border-[#b58942]/70 hover:text-white"
                          }`}
                        >
                          {group.address}
                        </button>
                      );
                    })}
                  </div>
                ) : null}
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  setFocusedIndex(null);
                }}
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/12 text-white/75 transition hover:border-[#b58942] hover:text-white"
                aria-label="Close gallery"
              >
                <X className="h-5 w-5" strokeWidth={1.5} />
              </button>
            </header>

            <div className="flex shrink-0 flex-wrap items-center gap-3 border-b border-white/10 px-5 py-3 sm:px-8">
              <div className="flex flex-wrap gap-2">
                {availableCategories.map((category) => {
                  const isActive = category === activeCategory;
                  return (
                    <button
                      key={category}
                      type="button"
                      onClick={() => {
                        setActiveCategory(category);
                        setFocusedIndex(null);
                      }}
                      className={`min-h-8 rounded-[0.15rem] border px-4 text-[0.6rem] font-semibold uppercase tracking-[0.18em] transition ${
                        isActive
                          ? "border-[#b58942] bg-[#b58942] text-white"
                          : "border-white/14 bg-transparent text-white/68 hover:border-[#b58942]/70 hover:text-white"
                      }`}
                    >
                      {CATEGORY_LABELS[category]}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5 [scrollbar-color:#b58942_#2b2722] sm:px-8 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#b58942] [&::-webkit-scrollbar-track]:bg-[#2b2722]">
              {filteredImages.length > 0 ? (
                <div className="columns-1 gap-3 sm:columns-2 lg:columns-3 xl:columns-4">
                  {filteredImages.map((image, index) => (
                    <button
                      key={image.src}
                      type="button"
                      onClick={() => setFocusedIndex(index)}
                      className="mb-3 block w-full overflow-hidden rounded-[0.16rem] bg-[#2b2722] text-left transition duration-300 hover:brightness-110"
                    >
                      <img
                        src={image.src}
                        alt={`${planName} gallery image ${index + 1}`}
                        className="w-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                    </button>
                  ))}
                </div>
              ) : (
                <div className="grid min-h-[18rem] place-items-center border border-dashed border-white/14 text-center">
                  <p className="max-w-sm text-sm text-white/58">
                    No images have been added for this gallery tab yet.
                  </p>
                </div>
              )}
            </div>

            <footer className="flex shrink-0 items-center justify-between border-t border-white/10 px-5 py-4 text-[0.64rem] font-semibold uppercase tracking-[0.22em] text-white/70 sm:px-8">
              <span className="inline-flex items-center gap-3">
                <ImageIcon className="h-4 w-4 text-[#d1b27a]" strokeWidth={1.6} />
                {focusedIndex === null || filteredImages.length === 0
                  ? `${filteredImages.length} Images`
                  : `${focusedIndex + 1} / ${filteredImages.length}`}
              </span>
              {showFooterNavigation ? (
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={focusPreviousImage}
                    disabled={focusedIndex === 0}
                    className="grid h-10 w-10 place-items-center rounded-full border border-white/16 text-white transition hover:border-[#b58942] disabled:pointer-events-none disabled:opacity-35"
                    aria-label="Previous image"
                  >
                    <ArrowLeft className="h-4 w-4" strokeWidth={1.7} />
                  </button>
                  <button
                    type="button"
                    onClick={focusNextImage}
                    disabled={focusedIndex === filteredImages.length - 1}
                    className="grid h-10 w-10 place-items-center rounded-full border border-white/16 text-white transition hover:border-[#b58942] disabled:pointer-events-none disabled:opacity-35"
                    aria-label="Next image"
                  >
                    <ArrowRight className="h-4 w-4" strokeWidth={1.7} />
                  </button>
                </div>
              ) : null}
              <span aria-hidden="true" className="hidden w-[5.8rem] sm:block" />
            </footer>
          </div>

          {focusedImage && focusedIndex !== null ? (
            <div
              className="absolute inset-0 z-[101] grid place-items-center bg-[#15120f]/88 p-4"
              role="dialog"
              aria-modal="true"
              aria-label={`${planName} focused gallery image`}
            >
              <button
                type="button"
                className="absolute inset-0 cursor-zoom-out"
                onClick={() => setFocusedIndex(null)}
                aria-label="Close focused image"
              />
              <button
                type="button"
                onClick={() => setFocusedIndex(null)}
                className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full border border-white/18 bg-[#1d1b18]/78 text-white/78 backdrop-blur-md transition hover:border-[#b58942] hover:text-white"
                aria-label="Close focused image"
              >
                <X className="h-5 w-5" strokeWidth={1.5} />
              </button>
              {showImageNavigation ? (
                <>
                  <button
                    type="button"
                    onClick={focusPreviousImage}
                    disabled={!canFocusPrevious}
                    className="absolute left-4 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/18 bg-[#1d1b18]/78 text-white backdrop-blur-md transition hover:border-[#b58942] disabled:pointer-events-none disabled:opacity-25 sm:left-8 sm:h-12 sm:w-12"
                    aria-label="Previous image"
                  >
                    <ArrowLeft className="h-5 w-5" strokeWidth={1.7} />
                  </button>
                  <button
                    type="button"
                    onClick={focusNextImage}
                    disabled={!canFocusNext}
                    className="absolute right-4 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/18 bg-[#1d1b18]/78 text-white backdrop-blur-md transition hover:border-[#b58942] disabled:pointer-events-none disabled:opacity-25 sm:right-8 sm:h-12 sm:w-12"
                    aria-label="Next image"
                  >
                    <ArrowRight className="h-5 w-5" strokeWidth={1.7} />
                  </button>
                </>
              ) : null}
              <figure className="relative z-[1] flex max-h-[90vh] max-w-[92vw] flex-col items-center gap-3">
                <img
                  src={focusedImage.src}
                  alt={`${planName} focused gallery image ${focusedIndex + 1}`}
                  className="max-h-[84vh] max-w-[92vw] object-contain shadow-[0_26px_80px_-34px_rgba(0,0,0,0.9)]"
                />
                <figcaption className="rounded-full bg-[#1d1b18]/78 px-4 py-2 text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-white/72 backdrop-blur-md">
                  {focusedIndex + 1} / {filteredImages.length}
                </figcaption>
              </figure>
            </div>
          ) : null}
        </div>
      ) : null}
    </>
  );
}
