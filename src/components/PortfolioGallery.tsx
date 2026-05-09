"use client";

import Image from "next/image";
import { useState, type CSSProperties } from "react";

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
  const visibleImages = images.slice(0, visibleCount);
  const hasMore = visibleCount < images.length;

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
            <div
              key={`${item.src}-${index}`}
              className={`group relative overflow-hidden rounded-[0.35rem] border border-[#d6cbbc]/80 bg-[#e8dfd3] shadow-[0_18px_48px_-34px_rgba(23,20,16,0.48)] transition duration-500 hover:-translate-y-1 hover:border-[#b58942]/55 hover:shadow-[0_28px_68px_-38px_rgba(23,20,16,0.62)] ${tileClass(index)}`}
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
            </div>
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
    </section>
  );
}