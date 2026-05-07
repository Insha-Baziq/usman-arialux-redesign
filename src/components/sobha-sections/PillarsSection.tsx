"use client";

/* eslint-disable @next/next/no-img-element */

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export type PillarItem = {
  title: string;
  description: string;
  imageUrl: string;
};

export type PillarsSectionProps = {
  heading: string;
  pillars: PillarItem[];
  /** Background utility classes. Defaults to Sobha's `bg-[#efefef]`. */
  className?: string;
};

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

    gsap.set([headingEl, ...cards], { opacity: 0, y: 100 });

    const triggerId = `sobha-pillars-${Math.random().toString(36).slice(2)}`;
    const tl = gsap.timeline({
      scrollTrigger: {
        id: triggerId,
        trigger: headingEl,
        start: "top center",
        toggleActions: "play none none reverse",
      },
    });
    tl.to(headingEl, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: "cubic-bezier(0.25, 0.1, 0.25, 1)",
    }).to(
      cards,
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "cubic-bezier(0.25, 0.1, 0.25, 1)",
      },
      "-=0.8",
    );

    return () => {
      ScrollTrigger.getById(triggerId)?.kill();
      tl.kill();
    };
  }, []);

  return (
    <section className={className ?? "bg-[#efefef] px-0 py-20 text-black lg:py-24"}>
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
          loop={pillars.length > 2}
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
                <div className="sobha-pillar-image-wrap rounded-[1.5rem]">
                  <img
                    src={pillar.imageUrl}
                    alt={pillar.title}
                    className="sobha-pillar-image h-[27rem] w-full object-cover"
                  />
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
