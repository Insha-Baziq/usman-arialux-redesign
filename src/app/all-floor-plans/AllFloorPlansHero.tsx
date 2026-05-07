/* eslint-disable @next/next/no-img-element */
"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type AllFloorPlansHeroProps = {
  heroImage: string;
  planCount: number;
  children?: ReactNode;
};

const ease = [0.16, 1, 0.3, 1] as const;

export function AllFloorPlansHero({
  heroImage,
  planCount,
  children,
}: AllFloorPlansHeroProps) {
  const skip = useReducedMotion();

  return (
    <section className="relative isolate overflow-hidden border-b border-[#d8d0c4] bg-[#f7f3ec] px-6 pb-10 pt-28 lg:px-10 lg:pb-12 lg:pt-32">
      <motion.div
        className="absolute inset-y-0 right-0 hidden w-[48%] lg:block"
        initial={skip ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6, ease }}
      >
        <img
          src={heroImage}
          alt="AriaLux custom home entry"
          className="h-full w-full object-cover opacity-35 grayscale-[25%]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#f7f3ec] via-[#f7f3ec]/72 to-[#f7f3ec]/18" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#f7f3ec] via-transparent to-[#f7f3ec]/30" />
      </motion.div>

      <div className="relative mx-auto grid max-w-[81rem] gap-10 lg:grid-cols-12 lg:items-center lg:gap-16">
        <div className="space-y-7 lg:col-span-7">
          <span className="block overflow-hidden">
            <motion.div
              className="flex items-center gap-3 text-[0.68rem] font-semibold uppercase tracking-[0.34em] text-[#b58942]"
              initial={skip ? false : { y: "110%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.2, ease }}
            >
              <span>The collection</span>
              <motion.span
                className="h-px w-10 bg-[#b58942]"
                aria-hidden="true"
                initial={skip ? false : { scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.7, delay: 0.6, ease }}
                style={{ transformOrigin: "left" }}
              />
            </motion.div>
          </span>

          <span className="block overflow-hidden pb-1">
            <motion.h1
              className="font-serif text-5xl font-normal leading-[0.92] tracking-[-0.055em] text-[#171410] sm:text-6xl lg:text-7xl"
              initial={skip ? false : { y: "110%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{ duration: 1, delay: 0.35, ease }}
            >
              Floor Plans
            </motion.h1>
          </span>

          <motion.p
            className="max-w-[35rem] text-base font-light leading-[1.75] text-[#5f574e] sm:text-lg"
            initial={skip ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.55, ease }}
          >
            Discover a curated collection of thoughtfully designed floor plans
            that balance timeless architecture with modern livability. Each plan
            is crafted to elevate your lifestyle.
          </motion.p>

          <motion.div
            className="h-px w-12 bg-[#b58942]"
            aria-hidden="true"
            initial={skip ? false : { scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.75, ease }}
            style={{ transformOrigin: "left" }}
          />
        </div>

        <motion.div
          className="space-y-5 lg:col-span-5 lg:max-w-[36rem] lg:justify-self-start"
          initial={skip ? false : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7, ease }}
        >
          <div className="grid overflow-hidden rounded-full border border-[#d9d0c4] bg-[#fbf8f2]/85 shadow-[0_18px_50px_-34px_rgba(23,20,16,0.45)] backdrop-blur-sm sm:grid-cols-3">
            <CollectionStat value={String(planCount)} label="Plans Available" />
            <CollectionStat value="1,120+" label="Min Sq Ft" />
            <CollectionStat value="4,070" label="Max Sq Ft" />
          </div>
          <a
            href="/contact"
            className="inline-flex items-center justify-center gap-3 rounded-[0.45rem] border border-[#171410] bg-[#171410] px-6 py-3 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-white shadow-[0_16px_30px_-22px_rgba(23,20,16,0.7)] transition hover:bg-[#3a3129] active:translate-y-px"
          >
            Request a Custom Floor Plan
            <span aria-hidden="true">&rarr;</span>
          </a>
          {children}
        </motion.div>
      </div>
    </section>
  );
}

function CollectionStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex items-center justify-center gap-3 border-[#d9d0c4] px-5 py-4 text-left first:border-b sm:border-b-0 sm:border-r sm:last:border-r-0">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-[#dccfbf] bg-[#f7f0e5] text-[#b58942]">
        <span className="size-2 rounded-full bg-[#b58942]" />
      </span>
      <div className="flex flex-col gap-0.5">
        <span className="font-serif text-2xl font-normal leading-none text-[#171410]">
          {value}
        </span>
        <span className="text-[0.57rem] font-semibold uppercase tracking-[0.22em] text-[#4d453d]">
          {label}
        </span>
      </div>
    </div>
  );
}
