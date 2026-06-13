"use client";

/* eslint-disable @next/next/no-img-element */

import { useEffect, useRef, useState } from "react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { loadGsap } from "@/lib/load-gsap";

export type PillarItem = {
  title: string;
  description: string;
  imageUrl: string;
  videoUrl?: string;
};

export type PillarsSectionProps = {
  heading: string;
  pillars: PillarItem[];
  /** Background utility classes. Defaults to Sobha's `bg-[#efefef]`. */
  className?: string;
};

function PillarMedia({ pillar }: { pillar: PillarItem }) {
  const mediaRef = useRef<HTMLDivElement | null>(null);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);

  useEffect(() => {
    if (!pillar.videoUrl || shouldLoadVideo) return;
    const media = mediaRef.current;
    if (!media) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setShouldLoadVideo(true);
        observer.disconnect();
      },
      { rootMargin: "360px 0px" },
    );

    observer.observe(media);

    return () => {
      observer.disconnect();
    };
  }, [pillar.videoUrl, shouldLoadVideo]);

  return (
    <div ref={mediaRef} className="relative h-[27rem] w-full">
      <img
        src={pillar.imageUrl}
        alt={pillar.title}
        decoding="async"
        fetchPriority="low"
        className="sobha-pillar-image h-full w-full object-cover"
      />
      {pillar.videoUrl && shouldLoadVideo ? (
        <video
          src={pillar.videoUrl}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={pillar.imageUrl}
          className="sobha-pillar-image absolute inset-0 h-full w-full object-cover opacity-0"
          aria-hidden="true"
          onLoadedData={(e) => {
            const video = e.target as HTMLVideoElement;
            video.style.transition = "opacity 500ms ease";
            video.style.opacity = "1";
          }}
        />
      ) : null}
    </div>
  );
}

/**
 * Sobha "Defining Our Pillars" section — three-up image+text card carousel
 * with a small uppercase header. GSAP scroll-trigger fades + lifts heading
 * and cards when the heading hits viewport center.
 *
 * Re-extracted from `SobhaNewLaunchSection` (pillars half) so AriaLux subpages
 * (Who We Are, Architectural Services, Interior Finishes) can re-use it with
 * AriaLux content.
 */
export function PillarsSection({ heading, pillars, className }: PillarsSectionProps) {
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const headingEl = headingRef.current;
    const track = trackRef.current;
    if (!headingEl || !track) return;

    const cards = Array.from(track.querySelectorAll<HTMLElement>(".sobha-pillar-card"));
    if (cards.length === 0) return;

    let cleanup: (() => void) | undefined;
    let cancelled = false;

    void loadGsap().then(({ gsap, ScrollTrigger }) => {
      if (cancelled) return;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set([headingEl, ...cards], { clearProps: "all" });
        return;
      }

      const isMobile = window.matchMedia("(max-width: 767px)").matches;
      gsap.set([headingEl, ...cards], {
        opacity: 0,
        y: 56,
        willChange: "transform,opacity",
      });

      const triggerId = `sobha-pillars-${Math.random().toString(36).slice(2)}`;
      const tl = gsap.timeline({
        scrollTrigger: {
          id: triggerId,
          trigger: headingEl,
          start: "top 86%",
          end: "top 46%",
          scrub: isMobile ? false : 0.7,
          toggleActions: "play none none none",
        },
      });
      tl.to(headingEl, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "none",
        clearProps: "willChange",
      }).to(
        cards,
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.12,
          ease: "none",
          clearProps: "willChange",
        },
        0.16,
      );

      cleanup = () => {
        ScrollTrigger.getById(triggerId)?.kill();
        tl.kill();
      };
    });

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  return (
    <section className={className ?? "bg-[#f7f3ec] px-0 py-20 text-black lg:py-24"}>
      <div className="title-section mx-auto w-[92vw] max-w-[92vw] px-6 lg:px-10">
        <h2
          ref={headingRef}
          className="text-center font-sans text-[0.78rem] uppercase tracking-[0.34em] text-black/80 sm:text-sm"
        >
          {heading}
        </h2>
      </div>

      <div
        ref={trackRef}
        className="home-slider mx-auto mt-10 w-[92vw] max-w-[92vw] px-6 lg:mt-14 lg:px-10"
      >
        <Swiper
          modules={[Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          loop={pillars.length >= 7}
          speed={300}
          autoplay={{ delay: 6000, disableOnInteraction: false }}
          breakpoints={{
            1024: { slidesPerView: 2, spaceBetween: 20 },
            1280: { slidesPerView: 3, spaceBetween: 20 },
          }}
          className="mySwiper"
        >
          {pillars.map((pillar) => (
            <SwiperSlide key={pillar.title}>
              <article className="sobha-pillar-card flex flex-col gap-6">
                <div className="sobha-pillar-image-wrap overflow-hidden rounded-[1.5rem]">
                  <PillarMedia pillar={pillar} />
                </div>
                <div className="space-y-4 px-2">
                  <h3 className="font-heading text-[2rem] font-light leading-tight text-black lg:text-[2.25rem]">
                    {pillar.title}
                  </h3>
                  <p className="text-[1.0625rem] font-light leading-[1.7] text-black/80">
                    {pillar.description}
                  </p>
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
