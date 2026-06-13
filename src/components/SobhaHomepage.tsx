"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useRef } from "react";

import { loadGsap } from "@/lib/load-gsap";
import type { HomepageMedia } from "@/sanity/lib/media";
import { SobhaHeader } from "./SobhaChrome";
import { AriaLuxFooter, ariaLuxBrand } from "./arialux-brand";
import type { AriaGalleryItem, AriaPlan } from "./arialux-data";
import { ARIA_HEADER_MENU } from "./arialux-data";
import { HeroBanner } from "./sobha-sections";
import type { HeroBannerSlide } from "./sobha-sections";
import {
  sobhaArtDetail,
  sobhaHeroSlides,
  sobhaPillars,
  sobhaPillarsHeading,
  sobhaPressHeading,
  sobhaPressReleases,
  sobhaProperties,
  sobhaPropertiesHeading,
  sobhaStickyWidgets,
} from "./sobha-homepage-data";
import {
  floorPlansToCarouselCards,
  galleryItemsToRecentBuildStories,
} from "./homepage-cms";

const PillarsSection = dynamic(() =>
  import("./sobha-sections/PillarsSection").then((module) => module.PillarsSection),
);

const CardCarousel = dynamic(() =>
  import("./sobha-sections/CardCarousel").then((module) => module.CardCarousel),
);

const StoryGrid = dynamic(() =>
  import("./sobha-sections/StoryGrid").then((module) => module.StoryGrid),
);

/**
 * SobhaIrisStage — pins the Hero for one viewport-height of scroll while a
 * white "Art of Detail" panel unfolds on top of it via a circular clip-path
 * (`circle(0% at 50% 100%)` → `circle(150% at 50% 100%)`).
 *
 * Layering:
 *   - Hero: position relative, z-index 0 (pinned by ScrollTrigger).
 *   - Art-of-Detail panel: position absolute, z-index 30 (over hero, under
 *     the fixed top navigation which sits at z-40).
 *
 * Scrubbing: clip-path is tied directly to scroll position (scrub: 1) so the
 * user has manual control over the iris opening. Internal content has a
 * subtle parallax (`y: 100 → 0`) timed against the same progress.
 */
function SobhaIrisStage({ heroSlides }: { heroSlides: HeroBannerSlide[] }) {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const heroPinRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stage = stageRef.current;
    const heroPin = heroPinRef.current;
    const panel = panelRef.current;
    const content = contentRef.current;
    if (!stage || !heroPin || !panel || !content) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // Skip the iris animation; render the panel fully open.
      panel.style.clipPath = "circle(150% at 50% 100%)";
      (panel.style as CSSStyleDeclaration & { webkitClipPath?: string }).webkitClipPath =
        "circle(150% at 50% 100%)";
      panel.classList.add("is-open");
      return;
    }

    let cleanup: (() => void) | undefined;
    let cancelled = false;

    void loadGsap().then(({ gsap, ScrollTrigger }) => {
      if (cancelled) return;

      const triggerId = `sobha-iris-${Math.random().toString(36).slice(2)}`;
      const reveals = content.querySelectorAll<HTMLElement>(".sobha-art-reveal");

      const tl = gsap.timeline({
        scrollTrigger: {
          id: triggerId,
          trigger: stage,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.65,
          pin: heroPin,
          pinSpacing: false,
          anticipatePin: 1,
          onUpdate: (self) => {
            // Mark the panel "open" once the iris is mostly expanded so its
            // children become interactive (CTA pill, etc).
            if (self.progress > 0.85) panel.classList.add("is-open");
            else panel.classList.remove("is-open");
          },
        },
      });

      tl.fromTo(
        panel,
        {
          clipPath: "circle(0% at 50% 100%)",
          webkitClipPath: "circle(0% at 50% 100%)",
        },
        {
          clipPath: "circle(150% at 50% 100%)",
          webkitClipPath: "circle(150% at 50% 100%)",
          ease: "none",
          duration: 1,
        },
        0,
      ).fromTo(
        reveals,
        { y: 100, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, ease: "none", duration: 1, stagger: 0.05 },
        0,
      );

      cleanup = () => {
        ScrollTrigger.getById(triggerId)?.kill();
        tl.kill();
      };
    });

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  return (
    <div ref={stageRef} className="sobha-iris-stage">
      <div ref={heroPinRef} className="sobha-iris-hero-pin">
        <HeroBanner slides={heroSlides} fullHeight autoplayDelayMs={4500} />

        <section
          ref={panelRef}
          className="sobha-iris-panel art-of-detail-sec"
          aria-label="The Art of Detail"
        >
          <div className="sobha-art-of-detail">
            <div className="relative mx-auto grid h-full lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.4fr)] lg:items-stretch">
              <div ref={contentRef} className="relative z-10 flex flex-col justify-center px-8 py-20 lg:px-16 lg:py-28">
                <div className="max-w-[30rem] space-y-8">
                  <span className="sobha-art-reveal block h-px w-14 bg-[#b58942]" aria-hidden="true" />
                  <h2 className="sobha-art-reveal sobha-art-title">
                    {sobhaArtDetail.titleLines.map((line, i) => (
                      <span key={line} className={i === 1 ? "sobha-art-title__alt" : undefined}>
                        {line}
                      </span>
                    ))}
                  </h2>
                  <p className="sobha-art-reveal max-w-[28rem] text-base font-light leading-7 text-[#15120f]/75 lg:text-[1.0625rem] lg:leading-[1.7]">
                    {sobhaArtDetail.copy}
                  </p>
                </div>
              </div>

              <div className="sobha-art-image-col relative overflow-hidden">
                <Image
                  src={sobhaArtDetail.figureImage}
                  alt="Luxury interior — marble kitchen island with gold chandelier"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="pointer-events-none absolute inset-y-0 -left-32 w-[36rem] bg-gradient-to-r from-white from-20% via-white/70 via-40% to-transparent" />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}


/**
 * StickyWidgets — bottom-right floating call/whatsapp/walkthrough column.
 */
function SobhaStickyWidgets() {
  const renderIcon = (id: string) => {
    if (id === "whatsapp") {
      return (
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-4 w-4 fill-current"
        >
          <path d="M12.04 3.5a8.42 8.42 0 0 0-7.3 12.63L3.75 20l3.96-1.04a8.42 8.42 0 1 0 4.33-15.46Zm0 1.55a6.87 6.87 0 0 1 5.83 10.52 6.87 6.87 0 0 1-9.53 1.98l-.28-.17-2.35.62.63-2.29-.18-.3a6.87 6.87 0 0 1 5.88-10.36Zm-2.8 3.73c-.15 0-.38.06-.58.28-.2.22-.76.74-.76 1.8s.78 2.1.89 2.24c.11.15 1.5 2.4 3.73 3.27 1.85.72 2.23.58 2.63.54.4-.04 1.3-.53 1.48-1.04.18-.51.18-.95.13-1.04-.06-.09-.2-.15-.42-.26-.22-.11-1.3-.64-1.5-.71-.2-.08-.35-.11-.5.11-.15.22-.57.71-.7.86-.13.15-.26.17-.48.06-.22-.11-.94-.35-1.79-1.1-.66-.59-1.1-1.32-1.23-1.54-.13-.22-.01-.34.1-.45.1-.1.22-.26.33-.39.11-.13.15-.22.22-.37.07-.15.04-.28-.02-.39-.06-.11-.49-1.2-.68-1.64-.18-.43-.36-.37-.5-.38h-.35Z" />
        </svg>
      );
    }

    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-4 w-4 fill-none stroke-current"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6.6 4.8 8.8 4c.47-.17.98.05 1.2.5l1.02 2.08c.2.4.1.9-.24 1.2l-1.1 1.02a9.7 9.7 0 0 0 4.52 4.52l1.02-1.1c.3-.34.8-.44 1.2-.24L18.5 13c.45.22.67.73.5 1.2l-.8 2.2c-.16.44-.58.72-1.04.7C11.52 16.85 7.15 12.48 6.9 6.84c-.02-.46.26-.88.7-1.04Z" />
      </svg>
    );
  };

  return (
    <div className="fixed bottom-6 right-4 z-30 flex flex-col items-end gap-3">
      {sobhaStickyWidgets.map((widget) => (
        <a
          key={widget.id}
          href={widget.href}
          className="flex items-center gap-2 rounded-full bg-black/85 px-4 py-2 text-[0.6rem] font-medium uppercase tracking-[0.24em] text-white shadow-lg transition hover:bg-black"
        >
          {renderIcon(widget.id)}
          <span>{widget.label}</span>
        </a>
      ))}
    </div>
  );
}



type SobhaHomepageProps = {
  floorPlans?: AriaPlan[] | null;
  homepageMedia?: HomepageMedia | null;
  recentBuildImages?: AriaGalleryItem[] | null;
};

export function SobhaHomepage({
  floorPlans,
  homepageMedia,
  recentBuildImages,
}: SobhaHomepageProps) {
  const heroSlides =
    homepageMedia?.heroSlides && homepageMedia.heroSlides.length > 0
      ? homepageMedia.heroSlides
      : sobhaHeroSlides;
  const pillars =
    homepageMedia?.pillars && homepageMedia.pillars.length > 0
      ? homepageMedia.pillars
      : sobhaPillars;
  const floorPlanCards =
    floorPlans && floorPlans.length > 0
      ? floorPlansToCarouselCards(floorPlans)
      : sobhaProperties;
  const recentBuildStories =
    recentBuildImages && recentBuildImages.length > 0
      ? galleryItemsToRecentBuildStories(recentBuildImages)
      : sobhaPressReleases;

  return (
    <main className="bg-[#f7f3ec] text-black">
      <SobhaHeader brand={ariaLuxBrand} menus={ARIA_HEADER_MENU} hideLanguageSwitcher />
      <SobhaIrisStage heroSlides={heroSlides} />
      <PillarsSection heading={sobhaPillarsHeading} pillars={pillars} />
      <CardCarousel
        heading={sobhaPropertiesHeading}
        cards={floorPlanCards}
        ctaLabel="Explore All"
        ctaHref="/all-floor-plans"
      />
      <StoryGrid
        heading={sobhaPressHeading}
        stories={recentBuildStories}
        ctaLabel="View all"
        ctaHref="/portfolio"
        dateLabel=""
      />
      <AriaLuxFooter />
      <SobhaStickyWidgets />
    </main>
  );
}
