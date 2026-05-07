"use client";

/* eslint-disable @next/next/no-img-element */
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

  return (
    <div className="plan-detail-gallery-swiper">
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
        navigation
        pagination={{ clickable: true }}
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
                alt={`${alt} \u2014 view ${i + 1}`}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
