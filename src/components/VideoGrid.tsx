"use client";

import { useState } from "react";

import type { AriaVideoItem } from "./arialux-data";
import { ScrollReveal } from "./ScrollReveal";
import { ShowMoreBar } from "./ShowMoreBar";

const INITIAL_COUNT = 4;
const PAGE_SIZE = 4;

type Props = {
  videos: readonly AriaVideoItem[];
};

export function VideoGrid({ videos }: Props) {
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const visibleVideos = videos.slice(0, visibleCount);
  const hasMore = visibleCount < videos.length;

  return (
    <>
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-12">
        {visibleVideos.map((video, idx) => (
          <ScrollReveal
            key={video.vimeoId}
            as="figure"
            variant="fadeUp"
            index={idx % PAGE_SIZE}
            stagger={0.12}
            duration={0.9}
            className="group flex flex-col gap-4"
          >
            <div className="relative aspect-video w-full overflow-hidden rounded-sm bg-black">
              <iframe
                src={`https://player.vimeo.com/video/${video.vimeoId}?h=${video.vimeoHash}&title=0&byline=0&portrait=0`}
                title={video.title}
                loading="lazy"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 h-full w-full border-0"
              />
            </div>
            <figcaption className="flex items-baseline justify-between gap-4">
              <h2 className="font-heading text-lg font-light leading-snug text-black sm:text-xl">
                {video.title}
              </h2>
              <span className="shrink-0 text-[0.65rem] font-medium uppercase tracking-[0.28em] text-black/45">
                {String(idx + 1).padStart(2, "0")} /{" "}
                {String(videos.length).padStart(2, "0")}
              </span>
            </figcaption>
          </ScrollReveal>
        ))}
      </div>

      {videos.length > INITIAL_COUNT && (
        <ShowMoreBar
          hasMore={hasMore}
          onToggle={() =>
            setVisibleCount((c) =>
              hasMore ? Math.min(c + PAGE_SIZE, videos.length) : INITIAL_COUNT,
            )
          }
        />
      )}
    </>
  );
}
