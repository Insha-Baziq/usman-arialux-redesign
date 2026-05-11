"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Swiper as SwiperInstance } from "swiper";
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

function HeroVideo({ poster, src }: { poster: string; src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.load();
    void video.play().catch(() => {
      // Muted autoplay can still be deferred by the browser until media is ready.
    });
  }, [src]);

  return (
    <video
      key={src}
      ref={videoRef}
      className={`impression-banner only-desk homepage-banner-desk absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
        isReady ? "opacity-100" : "opacity-0"
      }`}
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      poster={poster}
      aria-hidden="true"
      onCanPlay={() => {
        setIsReady(true);
        void videoRef.current?.play().catch(() => undefined);
      }}
      onPlaying={() => {
        setIsReady(true);
      }}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}

export function HeroBanner({ slides, fullHeight = true, autoplayDelayMs = 4500 }: HeroBannerProps) {
  const [activeIndex, setActiveIndex] = useState(0);

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
        onSlideChange={(swiper: SwiperInstance) => {
          setActiveIndex(swiper.realIndex);
        }}
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={slide.id}>
            <div className="relative h-full w-full overflow-hidden">
              <Image
                src={slide.desktopImage}
                alt={slide.imageAlt}
                fill
                priority={i === 0}
                sizes="100vw"
                className="impression-banner homepage-banner-desk object-cover"
              />
              {slide.videoSrc && i === activeIndex ? (
                <HeroVideo poster={slide.desktopImage} src={slide.videoSrc} />
              ) : null}
              <div className="explore-more-arrow absolute inset-0 sobha-hero-overlay" aria-hidden="true" />
              <div className="absolute inset-0 flex items-end justify-center pb-24 sm:pb-28">
                <div className="w-full max-w-4xl space-y-4 px-6 text-center sm:space-y-5">
                  <h2 className="homepage-hero-banner-heading flex min-h-[5.35rem] items-end justify-center font-heading text-[2rem] font-light leading-[1.12] tracking-[0.04em] text-white sm:min-h-[7.475rem] sm:text-[3.25rem] sm:tracking-[0.08em] lg:min-h-[8.625rem] lg:text-[3.75rem]">
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
