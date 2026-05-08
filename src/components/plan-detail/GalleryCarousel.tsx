"use client";

/* eslint-disable @next/next/no-img-element */
import { useId } from "react";
import { Autoplay, EffectCoverflow, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";

type GalleryCarouselProps = {
  images: string[];
  alt: string;
};

export function GalleryCarousel({ images, alt }: GalleryCarouselProps) {
  if (images.length === 0) return null;

  const reactId = useId();
  const safeId = reactId.replace(/[^a-zA-Z0-9_-]/g, "");
  const prevClass = `gallery-carousel-prev-${safeId}`;
  const nextClass = `gallery-carousel-next-${safeId}`;
  const pagClass = `gallery-carousel-pag-${safeId}`;

  return (
    <div className="plan-detail-gallery-swiper relative">
      <Swiper
        modules={[Autoplay, Navigation, Pagination, EffectCoverflow]}
        effect="coverflow"
        grabCursor
        centeredSlides
        loop={images.length > 2}
        slidesPerView={1.6}
        spaceBetween={-100}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 220,
          modifier: 1,
          slideShadows: false,
        }}
        autoplay={{ delay: 5500, disableOnInteraction: false }}
        navigation={{ prevEl: `.${prevClass}`, nextEl: `.${nextClass}` }}
        pagination={{ clickable: true, el: `.${pagClass}` }}
        breakpoints={{
          0: { slidesPerView: 1.05, spaceBetween: 0 },
          768: { slidesPerView: 1.4, spaceBetween: -80 },
          1280: { slidesPerView: 1.6, spaceBetween: -120 },
        }}
        className="!pb-12"
      >
        {images.map((src, i) => (
          <SwiperSlide key={`${src}-${i}`} className="!h-auto">
            <div className="aspect-[16/9] w-full overflow-hidden rounded-xl bg-black/5 ring-1 ring-black/5">
              <img
                src={src}
                alt={`${alt} — view ${i + 1}`}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className={`${prevClass} swiper-button-prev`} />
      <div className={`${nextClass} swiper-button-next`} />
      <div className={`${pagClass} swiper-pagination`} />
    </div>
  );
}
