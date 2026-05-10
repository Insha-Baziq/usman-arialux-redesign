import { AriaLuxFooter, ariaLuxBrand } from "@/components/arialux-brand";
import { SobhaHeader } from "@/components/SobhaChrome";
import {
  ARIA_HEADER_MENU,
  ARIA_PORTFOLIO,
  ARIA_VIDEOS,
  ARIA_VIDEOS_PAGE,
} from "@/components/arialux-data";
import { VideoGrid } from "@/components/VideoGrid";
import {
  DarkCtaBand,
  PageHero,
} from "@/components/sobha-sections";
import { getVideoGallery } from "@/sanity/lib/media";

export const metadata = {
  title: "Video — AriaLux Homes",
  description: ARIA_VIDEOS_PAGE.intro,
};

export default async function VideoPage() {
  const sanityVideos = await getVideoGallery();
  const videos = sanityVideos ?? ARIA_VIDEOS;

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
          <VideoGrid videos={videos} />
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
