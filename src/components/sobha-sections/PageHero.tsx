"use client";
import Image from "next/image";

import { motion, useReducedMotion } from "framer-motion";

type PageHeroProps = {
  eyebrow: string;
  heading: string;
  description: string;
  backgroundImage: string;
  imageAlt: string;
  ctaLabel?: string;
  ctaHref?: string;
  children?: React.ReactNode;
};

const ease = [0.16, 1, 0.3, 1] as const;

export function PageHero({
  eyebrow,
  heading,
  description,
  backgroundImage,
  imageAlt,
  ctaLabel,
  ctaHref = "/contact",
  children,
}: PageHeroProps) {
  const skip = useReducedMotion();

  return (
    <section className="relative isolate overflow-hidden border-b border-[#d8d0c4] bg-[#f7f3ec] px-6 pb-10 pt-24 sm:pt-28 lg:px-10 lg:pb-12 lg:pt-32">
      {/* Faded background image with reveal */}
      <motion.div
        className="absolute inset-y-0 right-0 hidden w-[48%] lg:block"
        initial={skip ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2.2, ease }}
      >
        <Image
          src={backgroundImage}
          alt={imageAlt}
          fill
          priority
          sizes="48vw"
          className="object-cover opacity-55 grayscale-[15%]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#f7f3ec] via-[#f7f3ec]/62 to-[#f7f3ec]/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#f7f3ec] via-transparent to-[#f7f3ec]/22" />
      </motion.div>

      <div className="relative mx-auto grid max-w-[81rem] gap-10 lg:grid-cols-12 lg:items-center lg:gap-16">
        <div className="space-y-7 lg:col-span-7">
          {/* Eyebrow — mask reveal */}
          <span className="block overflow-hidden">
            <motion.div
              className="flex items-center gap-3 text-[0.68rem] font-semibold uppercase tracking-[0.34em] text-[#b58942]"
              initial={skip ? false : { y: "110%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{ duration: 1.25, delay: 0.25, ease }}
            >
              <span>{eyebrow}</span>
              <motion.span
                className="h-px w-10 bg-[#b58942]"
                aria-hidden="true"
                initial={skip ? false : { scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.75, ease }}
                style={{ transformOrigin: "left" }}
              />
            </motion.div>
          </span>

          {/* Heading — mask reveal */}
          <span className="block overflow-hidden pb-1">
            <motion.h1
              className="font-serif text-[clamp(3rem,14vw,4.35rem)] font-normal leading-[0.92] tracking-[-0.055em] text-[#171410] sm:text-6xl lg:text-7xl"
              initial={skip ? false : { y: "110%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{ duration: 1.4, delay: 0.45, ease }}
            >
              {heading}
            </motion.h1>
          </span>

          {/* Description — fade up */}
          <motion.p
            className="max-w-[35rem] text-[0.96rem] font-light leading-[1.75] text-[#5f574e] sm:text-lg"
            initial={skip ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.25, delay: 0.75, ease }}
          >
            {description}
          </motion.p>

          {/* Gold divider — draw in */}
          <motion.div
            className="h-px w-12 bg-[#b58942]"
            aria-hidden="true"
            initial={skip ? false : { scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 1, ease }}
            style={{ transformOrigin: "left" }}
          />
        </div>

        {/* Right column — fade up */}
        <motion.div
          className="space-y-5 lg:col-span-5 lg:max-w-[36rem] lg:justify-self-start"
          initial={skip ? false : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.35, delay: 1, ease }}
        >
          {children}
          {ctaLabel ? (
            <a
              href={ctaHref}
              className="inline-flex w-full items-center justify-center gap-3 rounded-[0.45rem] border border-[#171410] bg-[#171410] px-5 py-3 text-center text-[0.64rem] font-semibold uppercase tracking-[0.18em] text-white shadow-[0_16px_30px_-22px_rgba(23,20,16,0.7)] transition hover:bg-[#3a3129] active:translate-y-px sm:w-auto sm:px-6 sm:text-[0.68rem] sm:tracking-[0.22em]"
            >
              {ctaLabel}
              <span aria-hidden="true">&rarr;</span>
            </a>
          ) : null}
        </motion.div>
      </div>
    </section>
  );
}

export type { PageHeroProps };
