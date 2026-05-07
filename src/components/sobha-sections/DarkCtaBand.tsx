/* eslint-disable @next/next/no-img-element */

import { cn } from "@/lib/utils";

import { SobhaPillLink } from "./SobhaPillLink";

export type DarkCtaBandProps = {
  /** Small uppercase label rendered above the headline. Optional. */
  eyebrow?: string;
  headline: string;
  subline?: string;
  ctaLabel: string;
  ctaHref: string;
  /** Background image URL. Renders behind a dark overlay for legibility. */
  backgroundImage?: string;
  /** Override section padding / extra utility classes. */
  className?: string;
};

/**
 * Sobha "dark CTA band" — wide letterboxed band with optional background image,
 * dark overlay, eyebrow + serif headline + subline + pill CTA. Pattern used on
 * Sobha subpages (Communities, About, Properties detail pages) to drive the
 * primary on-page conversion.
 */
export function DarkCtaBand({
  eyebrow,
  headline,
  subline,
  ctaLabel,
  ctaHref,
  backgroundImage,
  className,
}: DarkCtaBandProps) {
  return (
    <section
      className={cn(
        "sobha-dark-cta relative overflow-hidden bg-black text-white",
        "py-20 lg:py-28",
        className,
      )}
    >
      {backgroundImage ? (
        <>
          <img
            src={backgroundImage}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover opacity-50"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/55 to-black/75"
          />
        </>
      ) : null}

      <div className="relative mx-auto flex max-w-[64rem] flex-col items-center gap-7 px-6 text-center lg:px-10">
        {eyebrow ? (
          <p className="font-sans text-[0.78rem] uppercase tracking-[0.34em] text-white/70 sm:text-sm">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="font-heading text-[2.25rem] font-light leading-[1.15] tracking-[0.04em] text-white sm:text-[2.75rem] lg:text-[3.25rem]">
          {headline}
        </h2>
        {subline ? (
          <p className="max-w-[44rem] text-base font-light leading-[1.7] text-white/80 lg:text-[1.0625rem]">
            {subline}
          </p>
        ) : null}
        <div className="pt-2">
          <SobhaPillLink href={ctaHref} label={ctaLabel} dark />
        </div>
      </div>
    </section>
  );
}
