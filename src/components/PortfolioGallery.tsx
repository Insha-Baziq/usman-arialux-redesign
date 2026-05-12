"use client";

/* eslint-disable @next/next/no-img-element */

import { ArrowLeft, ArrowRight, X } from "lucide-react";
import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type TouchEvent,
} from "react";

import type { AriaGalleryItem } from "./arialux-data";
import { ScrollReveal } from "./ScrollReveal";
import { ShowMoreBar } from "./ShowMoreBar";

type PortfolioGalleryProps = {
  images: readonly AriaGalleryItem[];
};

const INITIAL_COUNT = 12;
const PAGE_SIZE = 12;

function tileClass(index: number) {
  const pattern = index % 12;
  if (pattern === 0) return "md:col-span-2 md:row-span-2";
  if (pattern === 2 || pattern === 8) return "md:row-span-2";
  if (pattern === 5) return "md:col-span-2";
  if (pattern === 10) return "md:col-span-2 md:row-span-2";
  return "";
}

function imageAspectClass(index: number) {
  const pattern = index % 12;
  if (pattern === 0 || pattern === 10) return "aspect-[4/5] md:aspect-auto md:h-full";
  if (pattern === 2 || pattern === 8) return "aspect-[3/5] md:h-full";
  if (pattern === 5) return "aspect-[16/9]";
  return "aspect-[3/4]";
}

const captions = [
  "Modern facade",
  "Warm arrival",
  "Statement elevation",
  "Material detail",
  "Private residence",
  "Custom build",
  "Architectural line",
  "Refined volume",
  "Finished home",
  "Quiet proportion",
  "Exterior rhythm",
  "Built detail",
];

function captionFor(index: number) {
  return captions[index % captions.length];
}

export function PortfolioGallery({ images }: PortfolioGalleryProps) {
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const touchStartX = useRef<number | null>(null);
  const visibleImages = images.slice(0, visibleCount);
  const hasMore = visibleCount < images.length;
  const focusedImage =
    focusedIndex === null ? null : visibleImages[focusedIndex] ?? null;
  const showImageNavigation = visibleImages.length > 1;
  const canFocusPrevious = focusedIndex !== null && focusedIndex > 0;
  const canFocusNext =
    focusedIndex !== null && focusedIndex < visibleImages.length - 1;

  const focusPreviousImage = useCallback(() => {
    setFocusedIndex((index) => {
      if (index === null) return visibleImages.length > 0 ? 0 : null;
      return Math.max(index - 1, 0);
    });
  }, [visibleImages.length]);

  const focusNextImage = useCallback(() => {
    setFocusedIndex((index) => {
      if (index === null) return visibleImages.length > 0 ? 0 : null;
      return Math.min(index + 1, visibleImages.length - 1);
    });
  }, [visibleImages.length]);

  const handleFocusedTouchStart = useCallback((event: TouchEvent) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  }, []);

  const handleFocusedTouchEnd = useCallback(
    (event: TouchEvent) => {
      const startX = touchStartX.current;
      touchStartX.current = null;
      const endX = event.changedTouches[0]?.clientX;
      if (startX === null || endX === undefined || !showImageNavigation) return;

      const deltaX = endX - startX;
      if (Math.abs(deltaX) < 44) return;

      if (deltaX < 0) {
        focusNextImage();
      } else {
        focusPreviousImage();
      }
    },
    [focusNextImage, focusPreviousImage, showImageNavigation],
  );

  useEffect(() => {
    if (focusedIndex === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setFocusedIndex(null);
      }
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
  }, [focusNextImage, focusPreviousImage, focusedIndex]);

  return (
    <section className="relative overflow-hidden px-6 py-16 lg:px-10 lg:py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-24 h-[34rem] w-[18rem] rounded-r-full bg-[#c7a75a]/10 blur-3xl"
      />
      <div className="mx-auto max-w-[84rem]">
        <div className="mb-10 grid gap-6 border-b border-[#d8d0c4] pb-7 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div>
            <p className="mb-4 text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-[#b58942]">
              Gallery
            </p>
            <h2 className="max-w-[46rem] font-serif text-4xl font-normal leading-[0.98] tracking-[-0.045em] text-[#171410] sm:text-5xl">
              Built homes, composed like an editorial archive.
            </h2>
          </div>
          <div className="max-w-[25rem] lg:text-right">
            <p className="text-sm font-light leading-7 text-[#625950]">
              A curated look at AriaLux spaces, finished homes, and material
              moments from the live portfolio.
            </p>
            <p className="mt-4 text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-black/45">
              {images.length} images
            </p>
          </div>
        </div>

        <div className="grid auto-rows-auto grid-cols-1 gap-4 sm:grid-cols-2 md:auto-rows-[15rem] md:grid-cols-4 lg:auto-rows-[17.5rem] lg:gap-5">
          {visibleImages.map((item, index) => (
            <button
              type="button"
              key={`${item.src}-${index}`}
              onClick={() => setFocusedIndex(index)}
              className={`group relative overflow-hidden rounded-[0.35rem] border border-[#d6cbbc]/80 bg-[#e8dfd3] shadow-[0_18px_48px_-34px_rgba(23,20,16,0.48)] transition duration-500 hover:-translate-y-1 hover:border-[#b58942]/55 hover:shadow-[0_28px_68px_-38px_rgba(23,20,16,0.62)] ${tileClass(index)}`}
              aria-label={`Open ${item.alt}`}
            >
              <ScrollReveal
                variant="scaleUp"
                index={index % PAGE_SIZE}
                stagger={0.04}
                duration={0.75}
                className="h-full w-full"
              >
                <figure
                  className="relative h-full w-full"
                  style={
                    {
                      "--portfolio-reveal-index": index % PAGE_SIZE,
                    } as CSSProperties
                  }
                >
                  <div className={`portfolio-image-reveal relative h-full w-full ${imageAspectClass(index)}`}>
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      priority={index < 6}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition duration-[850ms] ease-out group-hover:scale-[1.04]"
                    />
                  </div>
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/52 via-black/0 to-transparent opacity-65 transition-opacity duration-500 group-hover:opacity-85"
                  />
                  <div
                    aria-hidden="true"
                    className="portfolio-gold-sweep pointer-events-none absolute inset-y-0 left-0 w-px bg-[#d5b86b]/85"
                  />
                  <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-5 p-5 text-white">
                    <span className="max-w-[13rem] font-serif text-2xl font-normal leading-none tracking-[-0.04em] opacity-0 translate-y-3 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                      {captionFor(index)}
                    </span>
                    <span className="text-[0.62rem] font-semibold uppercase tracking-[0.28em] text-white/72">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </figcaption>
                </figure>
              </ScrollReveal>
            </button>
          ))}
        </div>

        <ShowMoreBar
          hasMore={hasMore}
          onToggle={() =>
            setVisibleCount((current) =>
              hasMore ? Math.min(current + PAGE_SIZE, images.length) : INITIAL_COUNT,
            )
          }
        />
      </div>

      {focusedImage && focusedIndex !== null ? (
        <div
          className="fixed inset-0 z-[101] grid place-items-center bg-[#15120f]/88 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Focused portfolio image"
          onTouchStart={handleFocusedTouchStart}
          onTouchEnd={handleFocusedTouchEnd}
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
            className="absolute right-5 top-5 z-10 grid h-9 w-9 place-items-center rounded-full border border-white/18 bg-[#f5efdf]/12 text-white/82 shadow-[0_14px_34px_-22px_rgba(0,0,0,0.9)] backdrop-blur-md transition hover:border-[#b58942]/80 hover:bg-[#b58942]/18 hover:text-white sm:right-8 sm:top-8 sm:h-10 sm:w-10"
            aria-label="Close focused image"
          >
            <X className="h-4 w-4" strokeWidth={1.8} />
          </button>
          {showImageNavigation ? (
            <>
              <button
                type="button"
                onClick={focusPreviousImage}
                disabled={!canFocusPrevious}
                className="absolute left-5 top-1/2 z-10 hidden h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-white/18 bg-[#f5efdf]/12 text-white/82 shadow-[0_14px_34px_-22px_rgba(0,0,0,0.9)] backdrop-blur-md transition hover:border-[#b58942]/80 hover:bg-[#b58942]/18 hover:text-white disabled:pointer-events-none disabled:opacity-25 sm:left-8 sm:grid sm:h-10 sm:w-10"
                aria-label="Previous image"
              >
                <ArrowLeft className="h-4 w-4" strokeWidth={1.9} />
              </button>
              <button
                type="button"
                onClick={focusNextImage}
                disabled={!canFocusNext}
                className="absolute right-5 top-1/2 z-10 hidden h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-white/18 bg-[#f5efdf]/12 text-white/82 shadow-[0_14px_34px_-22px_rgba(0,0,0,0.9)] backdrop-blur-md transition hover:border-[#b58942]/80 hover:bg-[#b58942]/18 hover:text-white disabled:pointer-events-none disabled:opacity-25 sm:right-8 sm:grid sm:h-10 sm:w-10"
                aria-label="Next image"
              >
                <ArrowRight className="h-4 w-4" strokeWidth={1.9} />
              </button>
            </>
          ) : null}
          <figure className="relative z-[1] flex max-h-[90vh] max-w-[92vw] flex-col items-center gap-3">
            <img
              src={focusedImage.src}
              alt={focusedImage.alt}
              className="max-h-[84vh] max-w-[92vw] object-contain shadow-[0_26px_80px_-34px_rgba(0,0,0,0.9)]"
            />
            <figcaption className="rounded-full bg-[#1d1b18]/78 px-4 py-2 text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-white/72 backdrop-blur-md">
              {focusedIndex + 1} / {visibleImages.length}
            </figcaption>
            {showImageNavigation ? (
              <span className="text-[0.58rem] font-semibold uppercase tracking-[0.2em] text-white/42 sm:hidden">
                Swipe to view more
              </span>
            ) : null}
          </figure>
        </div>
      ) : null}
    </section>
  );
}
