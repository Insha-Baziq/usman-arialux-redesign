"use client";

 

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useId, useRef } from "react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { SobhaPillLink } from "./SobhaPillLink";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export type StoryItem = {
  title: string;
  date: string;
  href: string;
  imageUrl: string;
  mobileImageUrl?: string;
};

export type StoryGridProps = {
  heading: string;
  stories: StoryItem[];
  ctaLabel?: string;
  ctaHref?: string;
  /** Date label rendered before the date (e.g. "Published on"). Defaults to "Published on ". */
  dateLabel?: string;
  className?: string;
};

/**
 * Sobha "press releases" peek-slider — center-slide focus with adjacent slides
 * peeking on either side. GSAP fade-in on the heading and cards when the
 * heading enters the viewport.
 */
export function StoryGrid({
  heading,
  stories,
  ctaLabel,
  ctaHref,
  dateLabel = "Published on ",
  className,
}: StoryGridProps) {
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const reactId = useId();
  const safeId = reactId.replace(/[^a-zA-Z0-9_-]/g, "");
  const prevClass = `sobha-press-prev-${safeId}`;
  const nextClass = `sobha-press-next-${safeId}`;
  const pagClass = `sobha-press-pagination-${safeId}`;

  useEffect(() => {
    if (typeof window === "undefined") return;
    const headingEl = headingRef.current;
    const track = trackRef.current;
    if (!headingEl || !track) return;

    const cards = Array.from(track.querySelectorAll<HTMLElement>(".sobha-press-card"));

    if (window.matchMedia("(prefers-reduced-motion: reduce), (max-width: 767px)").matches) {
      gsap.set([headingEl, ...cards], { clearProps: "all" });
      return;
    }

    gsap.set(headingEl, { opacity: 0, y: 42, willChange: "transform,opacity" });
    if (cards.length) gsap.set(cards, { opacity: 0, y: 56, willChange: "transform,opacity" });

    const triggerId = `sobha-press-${Math.random().toString(36).slice(2)}`;
    const tl = gsap.timeline({
      scrollTrigger: {
        id: triggerId,
        trigger: headingEl,
        start: "top 84%",
        end: "top 62%",
        scrub: 0.25,
      },
    });
    tl.to(headingEl, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "none",
      clearProps: "willChange",
    });
    if (cards.length) {
      tl.to(
        cards,
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.07,
          ease: "none",
          clearProps: "opacity,transform,willChange",
        },
        0.16,
      );
    }

    return () => {
      ScrollTrigger.getById(triggerId)?.kill();
      tl.kill();
    };
  }, []);

  return (
    <section className={className ?? "sobha-stories-sec bg-[#f7f3ec] pb-12 pt-10 text-black lg:pb-16 lg:pt-12"}>
      <div className="mx-auto max-w-[81rem] px-6 lg:px-10">
        <h2
          ref={headingRef}
          className="text-center font-sans text-[0.8rem] uppercase tracking-[0.32em] text-black/75 sm:text-sm"
        >
          {heading}
        </h2>
      </div>
      <div ref={trackRef} className="relative mt-6 lg:mt-8">
        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          slidesPerView="auto"
          spaceBetween={40}
          centeredSlides
          slideToClickedSlide
          watchSlidesProgress
          loop={stories.length >= 7}
          speed={500}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          navigation={{ prevEl: `.${prevClass}`, nextEl: `.${nextClass}` }}
          pagination={{ clickable: true, el: `.${pagClass}` }}
          className="stories-slider sobha-press-coverflow"
        >
          {stories.map((story) => (
            <SwiperSlide key={story.title} className="sobha-press-slide">
              <a
                href={story.href}
                className="sobha-press-card s-stories-slide-box block overflow-hidden bg-[#fbf7ef] text-black"
              >
                <picture>
                  <source media="(max-width: 640px)" srcSet={story.mobileImageUrl ?? story.imageUrl} />
                  <img src={story.imageUrl} alt={story.title} className="block h-auto w-full" />
                </picture>
                <div className="s-stories-slide-content grid grid-cols-12 items-start gap-4 px-6 py-5 lg:px-8 lg:py-6">
                  <div className="story-title col-span-8">
                    <h4 className="font-heading text-[1.05rem] font-light leading-snug text-black lg:text-[1.15rem]">
                      {story.title}
                    </h4>
                  </div>
                  <div className="story-publish col-span-4 text-right">
                    <div className="date-place-main-sec text-[0.68rem] uppercase tracking-[0.18em] text-black/55">
                      <span className="published">{dateLabel}</span>
                      <span className="dated text-black/80">{story.date}</span>
                    </div>
                  </div>
                </div>
              </a>
            </SwiperSlide>
          ))}
        </Swiper>

        <button
          type="button"
          aria-label="Previous"
          className={`${prevClass} sobha-edge-arrow sobha-edge-arrow--left`}
        >
          <ChevronLeft aria-hidden="true" strokeWidth={1.25} />
        </button>
        <button
          type="button"
          aria-label="Next"
          className={`${nextClass} sobha-edge-arrow sobha-edge-arrow--right`}
        >
          <ChevronRight aria-hidden="true" strokeWidth={1.25} />
        </button>
      </div>

      <div
        className={`${pagClass} mt-6 flex items-center justify-center gap-2`}
        aria-hidden="true"
      />

      {ctaLabel && ctaHref ? (
        <div className="mt-6 text-center">
          <SobhaPillLink href={ctaHref} label={ctaLabel} />
        </div>
      ) : null}
    </section>
  );
}
