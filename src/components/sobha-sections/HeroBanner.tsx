"use client";

 

import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { SobhaPillLink } from "./SobhaPillLink";

export type HeroBannerSlide = {
  id: string;
  title: string;
  subtitle: string;
  ctaLabel: string;
  ctaHref: string;
  desktopImage: string;
  mobileImage: string;
  imageAlt: string;
};

export type HeroBannerProps = {
  slides: HeroBannerSlide[];
  /** Sets fixed viewport height. Defaults to true (homepage hero behavior). */
  fullHeight?: boolean;
  /** Autoplay delay in ms. Defaults to 4500. Set to 0 to disable autoplay. */
  autoplayDelayMs?: number;
};

/**
 * Full-bleed Sobha hero banner — fading Swiper carousel with bottom-centered
 * title / subtitle / pill CTA over a dark gradient overlay.
 *
 * Visual parity with `SobhaHero` from the homepage. Subpages can pass a single
 * slide for a static hero or many slides for the rotating homepage behavior.
 */
export function HeroBanner({ slides, fullHeight = true, autoplayDelayMs = 4500 }: HeroBannerProps) {
  return (
    <div
      className={
        fullHeight
          ? "home-banner video-img-div relative h-full w-full overflow-hidden bg-black text-white"
          : "home-banner video-img-div relative h-[80vh] w-full overflow-hidden bg-black text-white"
      }
    >
      <Swiper
        modules={[Autoplay]}
        slidesPerView={1}
        loop={slides.length > 1}
        speed={900}
        autoplay={
          autoplayDelayMs > 0 && slides.length > 1
            ? { delay: autoplayDelayMs, disableOnInteraction: false }
            : false
        }
        className="sobha-hero-swiper h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative h-full w-full overflow-hidden">
              <picture>
                <source media="(max-width: 640px)" srcSet={slide.mobileImage} />
                <img
                  src={slide.desktopImage}
                  alt={slide.imageAlt}
                  className="impression-banner only-desk homepage-banner-desk h-full w-full object-cover"
                  loading="eager"
                  fetchPriority="high"
                />
              </picture>
              <div className="explore-more-arrow absolute inset-0 sobha-hero-overlay" aria-hidden="true" />
              <div className="absolute inset-0 flex items-end justify-center pb-24 sm:pb-28">
                <div className="max-w-4xl space-y-4 px-6 text-center sm:space-y-5">
                  <h2 className="homepage-hero-banner-heading font-heading text-[2.75rem] font-light leading-[1.15] tracking-[0.08em] text-white sm:text-[3.25rem] lg:text-[3.75rem]">
                    {slide.title}
                  </h2>
                  <p className="homepage-hero-banner-subheading font-sans text-sm font-normal tracking-[0.22em] text-white/85 sm:text-base">
                    {slide.subtitle}
                  </p>
                  <div className="pt-4">
                    <SobhaPillLink href={slide.ctaHref} label={slide.ctaLabel} dark />
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
