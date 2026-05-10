"use client";

import Image from "next/image";
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
  videoSrc?: string;
};

export type HeroBannerProps = {
  slides: HeroBannerSlide[];
  fullHeight?: boolean;
  autoplayDelayMs?: number;
};

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
        {slides.map((slide, i) => (
          <SwiperSlide key={slide.id}>
            <div className="relative h-full w-full overflow-hidden">
              {slide.videoSrc ? (
                <>
                  <Image
                    src={slide.desktopImage}
                    alt={slide.imageAlt}
                    fill
                    priority={i === 0}
                    sizes="100vw"
                    className="object-cover"
                  />
                  <video
                    className="impression-banner only-desk homepage-banner-desk absolute inset-0 h-full w-full object-cover opacity-0"
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    aria-hidden="true"
                    onCanPlay={(e) => {
                      const video = e.target as HTMLVideoElement;
                      video.style.transition = "opacity 500ms ease";
                      video.style.opacity = "1";
                    }}
                  >
                    <source src={slide.videoSrc} type="video/mp4" />
                  </video>
                </>
              ) : (
                <Image
                  src={slide.desktopImage}
                  alt={slide.imageAlt}
                  fill
                  priority={i === 0}
                  sizes="100vw"
                  className="impression-banner homepage-banner-desk object-cover"
                />
              )}
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