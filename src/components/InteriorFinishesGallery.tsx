"use client";

/* eslint-disable @next/next/no-img-element */

import { useState } from "react";

import type { AriaGalleryItem } from "./arialux-data";
import { ScrollReveal } from "./ScrollReveal";
import { ShowMoreBar } from "./ShowMoreBar";

const INITIAL_COUNT = 12;
const PAGE_SIZE = 12;

type Props = {
  images: readonly AriaGalleryItem[];
};

export function InteriorFinishesGallery({ images }: Props) {
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const visibleImages = images.slice(0, visibleCount);
  const hasMore = visibleCount < images.length;

  return (
    <>
      <div className="columns-1 gap-4 sm:columns-2 md:columns-3 lg:columns-4 [&>*]:mb-4 [&>*]:break-inside-avoid">
        {visibleImages.map((item, idx) => (
          <ScrollReveal
            key={item.src}
            as="figure"
            variant="scaleUp"
            index={idx % PAGE_SIZE}
            stagger={0.06}
            duration={0.8}
            className="group relative overflow-hidden rounded-sm bg-black/5"
          >
            <img
              src={item.src}
              alt={item.alt}
              loading={idx < 8 ? "eager" : "lazy"}
              decoding="async"
              className="block h-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />
          </ScrollReveal>
        ))}
      </div>

      <ShowMoreBar
        hasMore={hasMore}
        onToggle={() =>
          setVisibleCount((c) =>
            hasMore ? Math.min(c + PAGE_SIZE, images.length) : INITIAL_COUNT,
          )
        }
      />
    </>
  );
}
