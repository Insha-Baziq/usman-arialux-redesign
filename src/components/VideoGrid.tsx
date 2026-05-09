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

function VimeoFacade({ video }: { video: AriaVideoItem }) {
  const [active, setActive] = useState(false);
  const thumb = `https://vumbnail.com/${video.vimeoId}.jpg`;

  return (
    <div
      className="relative aspect-video w-full cursor-pointer overflow-hidden rounded-sm bg-black"
      onClick={() => setActive(true)}
    >
      {active ? (
        <iframe
          src={`https://player.vimeo.com/video/${video.vimeoId}?h=${video.vimeoHash}&autoplay=1&title=0&byline=0&portrait=0`}
          title={video.title}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      ) : (
        <>
          <img
            src={thumb}
            alt={video.title}
            loading="lazy"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="grid size-14 place-items-center rounded-full bg-white/90 shadow-lg transition hover:scale-105">
              <svg viewBox="0 0 24 24" className="size-6 translate-x-0.5 fill-black">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

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
            <VimeoFacade video={video} />
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