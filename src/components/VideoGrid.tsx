"use client";

import { Play } from "lucide-react";
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
  const baseSrc = `https://player.vimeo.com/video/${video.vimeoId}?h=${video.vimeoHash}&title=0&byline=0&portrait=0`;
  const previewSrc = `${baseSrc}&background=1&autoplay=1&muted=1&loop=1&controls=0&autopause=0`;
  const playerSrc = `${baseSrc}&autoplay=1&muted=0`;

  return (
    <div
      className="relative aspect-video w-full cursor-pointer overflow-hidden rounded-sm bg-black"
      onClick={() => setActive(true)}
    >
      {active ? (
        <iframe
          src={playerSrc}
          title={video.title}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      ) : (
        <>
          <iframe
            src={previewSrc}
            title={`${video.title} preview`}
            aria-hidden="true"
            tabIndex={-1}
            allow="autoplay; fullscreen; picture-in-picture"
            className="pointer-events-none absolute inset-0 h-full w-full scale-[1.02] border-0"
          />
          <div className="absolute inset-0 bg-black/8 transition duration-300 group-hover:bg-black/20" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="grid size-11 place-items-center rounded-full border border-white/75 bg-[#171410] text-white opacity-0 shadow-[0_16px_38px_-20px_rgba(0,0,0,0.9)] ring-3 ring-white/18 transition duration-300 group-hover:scale-105 group-hover:opacity-100">
              <Play aria-hidden="true" className="ml-0.5 size-4 fill-current stroke-current stroke-[1.8]" />
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
      <div className="mx-auto grid max-w-[70rem] grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">
        {visibleVideos.map((video, idx) => (
          <ScrollReveal
            key={video.vimeoId}
            as="figure"
            variant="fadeUp"
            index={idx % PAGE_SIZE}
            stagger={0.12}
            duration={0.9}
            className="group flex flex-col gap-3"
          >
            <VimeoFacade video={video} />
            <figcaption className="flex items-baseline justify-between gap-4">
              <h2 className="font-heading text-base font-light leading-snug text-black sm:text-lg">
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
