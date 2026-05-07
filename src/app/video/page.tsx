import { AriaLuxFooter, ariaLuxBrand } from "@/components/arialux-brand";
import { SobhaHeader } from "@/components/SobhaChrome";
import {
  ARIA_HEADER_MENU,
  ARIA_PORTFOLIO,
  ARIA_VIDEOS,
  ARIA_VIDEOS_PAGE,
} from "@/components/arialux-data";
import { ScrollReveal } from "@/components/ScrollReveal";
import {
  DarkCtaBand,
  PageHero,
} from "@/components/sobha-sections";

export const metadata = {
  title: "Video — AriaLux Homes",
  description: ARIA_VIDEOS_PAGE.intro,
};

export default function VideoPage() {
  return (
    <main className="bg-[#f7f3ec] text-black">
      <SobhaHeader
        brand={ariaLuxBrand}
        menus={ARIA_HEADER_MENU}
        hideLanguageSwitcher
      />

      <PageHero
        eyebrow="Behind the build"
        heading={ARIA_VIDEOS_PAGE.heading}
        description={ARIA_VIDEOS_PAGE.intro}
        backgroundImage={ARIA_PORTFOLIO.images[0]?.src ?? ""}
        imageAlt={ARIA_VIDEOS_PAGE.heading}
        ctaLabel="Schedule a Free Consultation"
      />

      {/* Video grid — staggered slide-up */}
      <section className="px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-[81rem]">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-12">
            {ARIA_VIDEOS.map((video, idx) => (
              <ScrollReveal
                key={video.vimeoId}
                as="figure"
                variant="fadeUp"
                index={idx}
                stagger={0.12}
                duration={0.9}
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
              </ScrollReveal>
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
