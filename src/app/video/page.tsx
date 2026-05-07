import { AriaLuxFooter, ariaLuxBrand } from "@/components/arialux-brand";
import { SobhaHeader } from "@/components/SobhaChrome";
import {
  ARIA_HEADER_MENU,
  ARIA_PORTFOLIO,
  ARIA_VIDEOS,
  ARIA_VIDEOS_PAGE,
} from "@/components/arialux-data";
import {
  DarkCtaBand,
  HeroBanner,
  type HeroBannerSlide,
} from "@/components/sobha-sections";

export const metadata = {
  title: "Video — AriaLux Homes",
  description: ARIA_VIDEOS_PAGE.intro,
};

/**
 * /video — Sobha chrome with a 2-col Vimeo grid.
 * Composition: <SobhaHeader> + <HeroBanner> + 2-col video grid (preserved) +
 * <DarkCtaBand> + <SobhaFooter>.
 */
export default function VideoPage() {
  const heroSlide: HeroBannerSlide = {
    id: "video-hero",
    title: ARIA_VIDEOS_PAGE.heading,
    subtitle: ARIA_VIDEOS_PAGE.intro,
    ctaLabel: "Schedule a Free Consultation",
    ctaHref: "/contact",
    desktopImage: ARIA_PORTFOLIO.images[0]?.src ?? "",
    mobileImage: ARIA_PORTFOLIO.images[0]?.src ?? "",
    imageAlt: ARIA_VIDEOS_PAGE.heading,
  };

  return (
    <main className="bg-white text-black">
      <SobhaHeader
        brand={ariaLuxBrand}
        menus={ARIA_HEADER_MENU}
        hideLanguageSwitcher
      />

      <HeroBanner slides={[heroSlide]} fullHeight={false} autoplayDelayMs={0} />

      <section className="px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-[81rem]">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-12">
            {ARIA_VIDEOS.map((video, idx) => (
              <figure
                key={video.vimeoId}
                className="group flex flex-col gap-4"
              >
                <div className="relative aspect-video w-full overflow-hidden rounded-sm bg-black">
                  <iframe
                    src={`https://player.vimeo.com/video/${video.vimeoId}?h=${video.vimeoHash}&title=0&byline=0&portrait=0`}
                    title={video.title}
                    loading="lazy"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 h-full w-full border-0"
                  />
                </div>
                <figcaption className="flex items-baseline justify-between gap-4">
                  <h2 className="font-heading text-lg font-light leading-snug text-black sm:text-xl">
                    {video.title}
                  </h2>
                  <span className="shrink-0 text-[0.65rem] font-medium uppercase tracking-[0.28em] text-black/45">
                    {String(idx + 1).padStart(2, "0")} /{" "}
                    {String(ARIA_VIDEOS.length).padStart(2, "0")}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <DarkCtaBand
        eyebrow="See more"
        headline="Step Inside an AriaLux Home"
        subline="Book a free consultation and tour a finished build in person."
        ctaLabel="Book Your Consultation"
        ctaHref="/contact"
        backgroundImage={ARIA_PORTFOLIO.images[2]?.src}
      />

      <AriaLuxFooter />
    </main>
  );
}
