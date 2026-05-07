"use client";

/* eslint-disable @next/next/no-img-element */

import AOS from "aos";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

import { SobhaHeader } from "./SobhaChrome";
import { AriaLuxFooter, ariaLuxBrand } from "./arialux-brand";
import {
  ARIA_HEADER_MENU,
} from "./arialux-data";
import {
  CardCarousel,
  HeroBanner,
  PillarsSection,
  SobhaPillLink,
  StoryGrid,
} from "./sobha-sections";
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

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function SobhaLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 126 46"
      aria-hidden="true"
      className={cn("h-11 w-[7.875rem]", className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M62.325 12.473C64.47 11.688 65.95 10.173 65.95 7.76C65.95 4.037 62.55 2.437 58.225 2.437H53.306V25.629H59.738C64.605 25.629 68.825 23.66 68.825 19.185C68.825 15.65 66.188 13.224 62.325 12.473ZM59.432 24.332H56.71V3.735H58.497C61.697 3.735 62.768 5.289 62.768 7.629C62.768 8.019 63.028 11.844 59.883 12.54C61.1776 12.8522 62.378 13.4713 63.383 14.345C64.0074 14.9095 64.4975 15.6067 64.8173 16.3854C65.1371 17.1641 65.2785 18.0045 65.231 18.845C65.231 22.09 63.445 24.327 59.431 24.327M2.872 21.994C4.79733 23.6971 7.26047 24.6684 9.83 24.738C12.953 24.738 14.892 23.194 14.892 20.71C14.892 18.062 11.886 15.91 9.973 14.547C5.855 11.592 3.372 9.809 3.372 6.652C3.372 2.661 7.282 1.244 10.633 1.244C11.8978 1.20844 13.1572 1.42287 14.339 1.875L15.591 4.054C14.0998 3.09348 12.3705 2.56748 10.597 2.535C8.072 2.535 6.248 3.716 6.248 5.689C6.248 8.062 9.013 9.519 11.043 10.961C15.43 13.935 18.093 16.007 18.093 19.693C18.093 24.953 12.81 26.03 9.813 26.03C7.97146 26.0469 6.1502 25.6448 4.487 24.854L2.872 21.994ZM115.558 18.822H106.606L103.815 25.63H102.488L112.205 1.922L121.924 25.63H118.35L115.558 18.822ZM107.134 17.529H115.034L111.085 7.879L107.134 17.529ZM95.942 2.444V25.63H92.542V13.262H80.099V25.63H76.699V2.444H80.099V11.97H92.539V2.444H95.942Z"
        fill="white"
      />
      <path
        d="M34.8232 2.12793C37.1727 2.12798 39.4693 2.82468 41.4229 4.12988C43.3765 5.43523 44.8996 7.29119 45.7988 9.46191C45.8659 9.62394 45.9276 9.78782 45.9873 9.95215H32.3828V2.38281C33.1794 2.21558 33.9969 2.12793 34.8232 2.12793Z"
        fill="#038443"
      />
      <path d="M45.998 9.9834C46.7286 12.0118 46.8965 14.2038 46.4746 16.3252C46.3601 16.9007 46.204 17.4647 46.0078 18.0127H32.4131V9.9834H45.998Z" fill="white" />
      <path
        d="M45.9941 18.0479C45.4039 19.68 44.4611 21.1706 43.2236 22.4082C41.5624 24.0695 39.4458 25.2006 37.1416 25.6592C35.5626 25.9734 33.9437 25.9624 32.3828 25.6348V18.0479H45.9941Z"
        fill="black"
      />
      <path
        d="M32.5684 25.6699C31.7875 25.519 31.0194 25.2917 30.2773 24.9844C28.1066 24.0854 26.2508 22.5628 24.9453 20.6094C23.7215 18.778 23.0327 16.6446 22.9512 14.4492L22.9434 14.0078C22.9434 10.8571 24.195 7.83531 26.4229 5.60742C28.117 3.91341 30.2701 2.78485 32.5898 2.34082L32.5684 25.6699Z"
        fill="#C72127"
      />
    </svg>
  );
}


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
function SobhaIrisStage() {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const heroPinRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const emblemRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stage = stageRef.current;
    const heroPin = heroPinRef.current;
    const panel = panelRef.current;
    const content = contentRef.current;
    const emblem = emblemRef.current;
    if (!stage || !heroPin || !panel || !content) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // Skip the iris animation; render the panel fully open.
      panel.style.clipPath = "circle(150% at 50% 100%)";
      (panel.style as CSSStyleDeclaration & { webkitClipPath?: string }).webkitClipPath =
        "circle(150% at 50% 100%)";
      panel.classList.add("is-open");
      return;
    }

    const triggerId = `sobha-iris-${Math.random().toString(36).slice(2)}`;
    const reveals = content.querySelectorAll<HTMLElement>(".sobha-art-reveal");

    const tl = gsap.timeline({
      scrollTrigger: {
        id: triggerId,
        trigger: stage,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
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
      { clipPath: "circle(0% at 50% 100%)", webkitClipPath: "circle(0% at 50% 100%)" },
      {
        clipPath: "circle(150% at 50% 100%)",
        webkitClipPath: "circle(150% at 50% 100%)",
        ease: "none",
        duration: 1,
      },
      0,
    )
      .fromTo(
        reveals,
        { y: 100, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, ease: "none", duration: 1, stagger: 0.05 },
        0,
      );

    if (emblem) {
      tl.fromTo(
        emblem,
        { y: 60, scale: 1.15, autoAlpha: 0 },
        { y: 0, scale: 1, autoAlpha: 1, ease: "none", duration: 1 },
        0,
      );
    }

    return () => {
      ScrollTrigger.getById(triggerId)?.kill();
      tl.kill();
    };
  }, []);

  return (
    <div ref={stageRef} className="sobha-iris-stage">
      <div ref={heroPinRef} className="sobha-iris-hero-pin">
        <HeroBanner slides={sobhaHeroSlides} fullHeight autoplayDelayMs={4500} />

        <section
          ref={panelRef}
          className="sobha-iris-panel art-of-detail-sec"
          aria-label="The Art of Detail"
        >
          <div className="sobha-art-of-detail sobha-art-of-detail-bg">
            <div className="relative mx-auto grid h-full max-w-[81rem] gap-10 px-6 py-20 lg:grid-cols-[minmax(0,30rem)_minmax(0,1fr)] lg:items-center lg:gap-16 lg:px-10">
              <div ref={contentRef} className="relative z-10 max-w-[34rem] space-y-8">
                <div className="space-y-6">
                  <h2 className="sobha-art-reveal sobha-art-title">
                    {sobhaArtDetail.titleLines.map((line, i) => (
                      <span key={line} className={i === 1 ? "sobha-art-title__alt" : undefined}>
                        {line}
                      </span>
                    ))}
                  </h2>
                  <p className="sobha-art-reveal max-w-[31rem] text-base font-light leading-7 text-black/80 lg:text-[1.0625rem] lg:leading-[1.7]">
                    {sobhaArtDetail.copy}
                  </p>
                </div>

                <div className="sobha-art-reveal">
                  <SobhaPillLink href={sobhaArtDetail.ctaHref} label={sobhaArtDetail.ctaLabel} />
                </div>
              </div>

              <div ref={emblemRef} aria-hidden="true" className="sobha-iris-emblem hidden lg:flex">
                <SobhaLogo className="h-24 w-auto opacity-30" />
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
  return (
    <div className="fixed bottom-6 right-4 z-30 flex flex-col items-end gap-3">
      {sobhaStickyWidgets.map((widget) => (
        <a
          key={widget.id}
          href={widget.href}
          className="flex items-center gap-2 rounded-full bg-black/85 px-4 py-2 text-[0.6rem] font-medium uppercase tracking-[0.24em] text-white shadow-lg transition hover:bg-black"
        >
          <img src={widget.iconUrl} alt="" aria-hidden="true" className="h-4 w-4" />
          <span>{widget.label}</span>
        </a>
      ))}
    </div>
  );
}



export function SobhaHomepage() {
  // Initialize AOS once on the client.
  useEffect(() => {
    if (typeof window === "undefined") return;
    AOS.init({
      duration: 800,
      easing: "ease-out-cubic",
      once: true,
      offset: 80,
    });
  }, []);

  return (
    <main className="bg-[#f7f3ec] text-black">
      <SobhaHeader brand={ariaLuxBrand} menus={ARIA_HEADER_MENU} hideLanguageSwitcher />
      <SobhaIrisStage />
      <PillarsSection heading={sobhaPillarsHeading} pillars={sobhaPillars} />
      <CardCarousel
        heading={sobhaPropertiesHeading}
        cards={sobhaProperties}
        ctaLabel="Explore All"
        ctaHref="https://sobharealty.com/properties-in-dubai"
      />
      <StoryGrid
        heading={sobhaPressHeading}
        stories={sobhaPressReleases}
        ctaLabel="View all"
        ctaHref="https://sobharealty.com/media-center/press-releases"
      />
      <AriaLuxFooter />
      <SobhaStickyWidgets />
    </main>
  );
}
