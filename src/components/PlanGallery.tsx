"use client";

import { useId } from "react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

type PlanGalleryProps = {
  images: string[];
  alt: string;
};

export function PlanGallery({ images, alt }: PlanGalleryProps) {
  if (images.length === 0) return null;

  const reactId = useId();
  const safeId = reactId.replace(/[^a-zA-Z0-9_-]/g, "");
  const prevClass = `plan-gallery-prev-${safeId}`;
  const nextClass = `plan-gallery-next-${safeId}`;
  const pagClass = `plan-gallery-pag-${safeId}`;

  return (
    <div className="relative">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        navigation={{ prevEl: `.${prevClass}`, nextEl: `.${nextClass}` }}
        pagination={{ clickable: true, el: `.${pagClass}` }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={images.length > 1}
        spaceBetween={16}
        slidesPerView={1}
        breakpoints={{
          768: { slidesPerView: 2 },
          1280: { slidesPerView: 3 },
        }}
        className="plan-gallery-swiper !pb-10"
      >
        {images.map((src, i) => (
          <SwiperSlide key={`${src}-${i}`}>
            <div className="aspect-[4/3] overflow-hidden rounded-lg bg-neutral-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={`${alt} — image ${i + 1}`}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-[700ms] ease-out hover:scale-[1.04]"
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
