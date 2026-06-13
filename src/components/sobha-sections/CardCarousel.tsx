"use client";

/* eslint-disable @next/next/no-img-element */

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useId, useRef } from "react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { loadGsap } from "@/lib/load-gsap";
import { SobhaPillLink } from "./SobhaPillLink";

export type CarouselAmenity = {
  icon: string;
  label: string;
};

export type CarouselCard = {
  title: string;
  href: string;
  /** Wide hero image for the card. */
  imageUrl: string;
  /** Mobile <source> override; falls back to imageUrl when omitted. */
  mobileImageUrl?: string;
  /** Brand logo / wordmark shown on the amenities row. */
  logoUrl?: string;
  amenities: CarouselAmenity[];
};

export type CardCarouselProps = {
  heading: string;
  cards: CarouselCard[];
  ctaLabel?: string;
  ctaHref?: string;
  /** Section background utility classes. Defaults to Sobha's `bg-[#efefef]`. */
  className?: string;
};

/**
 * Sobha "latest-launch-slider" carousel — full-bleed image card with a logo +
 * amenities row beneath. GSAP scrub-in entrance (`scale: 1` from rest).
 *
 * Pagination + nav buttons use a per-instance unique id so multiple instances
 * on the same page do not bind to the same controls.
 */
export function CardCarousel({
  heading,
  cards,
  ctaLabel,
  ctaHref,
  className,
}: CardCarouselProps) {
  const launchRef = useRef<HTMLDivElement | null>(null);
  const reactId = useId();
  const safeId = reactId.replace(/[^a-zA-Z0-9_-]/g, "");
  const prevClass = `sobha-luxury-prev-${safeId}`;
  const nextClass = `sobha-luxury-next-${safeId}`;
  const pagClass = `sobha-luxury-pagination-${safeId}`;

  useEffect(() => {
    if (typeof window === "undefined") return;
    const el = launchRef.current;
    if (!el) return;

    let cleanup: (() => void) | undefined;
    let cancelled = false;

    void loadGsap().then(({ gsap, ScrollTrigger }) => {
      if (cancelled) return;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(el, { clearProps: "all" });
        return;
      }

      const isMobile = window.matchMedia("(max-width: 767px)").matches;
      const triggerId = `sobha-launch-${Math.random().toString(36).slice(2)}`;
      gsap.set(el, {
        opacity: 0.35,
        y: isMobile ? 48 : 96,
        scale: isMobile ? 0.9 : 0.78,
        willChange: "transform,opacity",
      });

      const tween = gsap.to(el, {
        opacity: 1,
        y: 0,
        scale: 1,
        ease: "none",
        scrollTrigger: {
          id: triggerId,
          trigger: el,
          start: "top 96%",
          end: "top 34%",
          scrub: isMobile ? false : 0.9,
          toggleActions: "play none none none",
        },
      });

      cleanup = () => {
        ScrollTrigger.getById(triggerId)?.kill();
        tween.kill();
      };
    });

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  return (
    <section className={className ?? "bg-[#f7f3ec] px-0 pb-4 pt-20 text-black lg:pb-6 lg:pt-24"}>
      <div className="title-section mx-auto max-w-[81rem] px-6 lg:px-10">
        <h2 className="text-center font-sans text-[1.5rem] font-medium uppercase tracking-[0.18em] text-black sm:text-[1.75rem]">
          {heading}
        </h2>
        <div className="mx-auto mt-6 h-px w-full max-w-[70rem] bg-black/15" aria-hidden="true" />
      </div>

      <div ref={launchRef} className="latest-launch-slider sobha-launch-init mt-10 lg:mt-12">
        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          slidesPerView={1}
          spaceBetween={0}
          loop={cards.length > 1}
          speed={800}
          autoHeight
          autoplay={{ delay: 6000, disableOnInteraction: false }}
          navigation={{ prevEl: `.${prevClass}`, nextEl: `.${nextClass}` }}
          pagination={{ clickable: true, el: `.${pagClass}` }}
          className="sobha-luxury-swiper"
        >
          {cards.map((card, index) => (
            <SwiperSlide key={card.title} className="sobha-luxury-slide">
              <div className="latest-launch-slide-box">
                <div className="new-launch-banner">
                  <a href={card.href} aria-label={card.title} className="block">
                    <picture>
                      <source media="(max-width: 640px)" srcSet={card.mobileImageUrl ?? card.imageUrl} />
                      <img
                        src={card.imageUrl}
                        alt={card.title}
                        loading={index < 2 ? "eager" : "lazy"}
                        decoding="async"
                        fetchPriority={index === 0 ? "high" : "low"}
                        className="sobha-luxury-image block aspect-[16/9] w-full object-cover sm:aspect-[21/9] lg:aspect-[5/2]"
                      />
                    </picture>
                  </a>
                </div>

                <div className="launch-amenitites-container mx-auto w-full max-w-[1280px] px-6 py-8 lg:px-12">
                  <div className="launch-amenitites-row grid items-center gap-8 lg:grid-cols-12">
                    <div className="latest-launch-logo lg:col-span-3">
                      <a
                        href={card.href}
                        aria-label={card.title}
                        className="launch-logo-div block text-center lg:text-left"
                      >
                        {card.logoUrl ? (
                          <img
                            src={card.logoUrl}
                            alt={`${card.title} logo`}
                            width={278}
                            height={141}
                            className="h-auto w-full max-w-[18rem] object-contain"
                          />
                        ) : (
                          <span className="font-heading text-[1.75rem] font-light leading-none text-black lg:text-[2rem]">
                            {card.title}
                          </span>
                        )}
                      </a>
                    </div>
                    <ul className="latest-launch-amenitites grid grid-cols-2 gap-6 text-center lg:col-span-9 lg:grid-cols-4">
                      {card.amenities.map((amenity) => (
                        <li
                          key={amenity.label}
                          className="amenities-box flex flex-col items-center gap-3"
                        >
                          <span className="amenities-icon flex h-12 w-12 items-center justify-center">
                            <img
                              src={amenity.icon}
                              alt=""
                              aria-hidden="true"
                              className="h-full w-full object-contain"
                            />
                          </span>
                          <span className="amenities-label text-[0.78rem] font-light uppercase tracking-[0.16em] text-black/80">
                            {amenity.label}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="sobha-luxury-controls mt-4 flex flex-col items-center gap-4">
          <div className="flex items-center gap-6">
            <button
              type="button"
              aria-label="Previous"
              className={`${prevClass} sobha-arrow-btn`}
            >
              <ChevronLeft aria-hidden="true" strokeWidth={1.25} />
            </button>
            <div
              className={`${pagClass} sobha-luxury-pagination`}
              aria-hidden="true"
            />
            <button
              type="button"
              aria-label="Next"
              className={`${nextClass} sobha-arrow-btn`}
            >
              <ChevronRight aria-hidden="true" strokeWidth={1.25} />
            </button>
          </div>
        </div>

        {ctaLabel && ctaHref ? (
          <div className="mt-4 flex justify-center">
            <SobhaPillLink href={ctaHref} label={ctaLabel} />
          </div>
        ) : null}
      </div>
    </section>
  );
}
