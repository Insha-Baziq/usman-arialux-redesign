import type { HeroBannerSlide } from "@/components/sobha-sections";
import type { AriaVideoItem } from "@/components/arialux-data";
import type { SobhaPillar } from "@/components/sobha-homepage-data";

import { sanityClient } from "./client";

type SanityHeroSlide = Partial<HeroBannerSlide> & {
  order?: number;
};

type SanityPillar = Partial<SobhaPillar> & {
  order?: number;
};

export type HomepageMedia = {
  heroSlides: HeroBannerSlide[];
  pillars: SobhaPillar[];
};

export type ArchitectureMedia = {
  posterImage?: string;
  videoSrc?: string;
};

type MediaSettingsResult = {
  homepageHeroSlides?: SanityHeroSlide[];
  homepagePillars?: SanityPillar[];
  architectureVideo?: ArchitectureMedia;
};

type HomepagePageSectionResult = {
  heroSlides?: SanityHeroSlide[];
  pillars?: SanityPillar[];
};

const mediaSettingsQuery = `*[_type == "mediaSettings" && _id == "mediaSettings"][0]{
  "homepageHeroSlides": homepageHeroSlides[]|order(order asc){
    id,
    title,
    subtitle,
    ctaLabel,
    ctaHref,
    "desktopImage": desktopImage.image.asset->url,
    "mobileImage": coalesce(mobileImage.image.asset->url, desktopImage.image.asset->url),
    "imageAlt": coalesce(desktopImage.alt, mobileImage.alt, title),
    "videoSrc": coalesce(videoFile.asset->url, videoUrl),
    order
  },
  "homepagePillars": homepagePillars[]|order(order asc){
    title,
    description,
    "imageUrl": image.image.asset->url,
    "videoUrl": coalesce(videoFile.asset->url, videoUrl),
    order
  },
  "architectureVideo": {
    "posterImage": architectureVideo.posterImage.image.asset->url,
    "videoSrc": coalesce(architectureVideo.videoFile.asset->url, architectureVideo.videoUrl)
  }
}`;

const homePageSectionsQuery = `*[_type == "page" && slug.current == "home"][0]{
  "heroSlides": sections[_type == "heroCarouselSection"][0].slides[]|order(order asc){
    "id": coalesce(id, _key),
    title,
    subtitle,
    "ctaLabel": coalesce(ctaLabel, cta.label, cta.link.label),
    "ctaHref": coalesce(ctaHref, cta.href, cta.link.path),
    "desktopImage": coalesce(desktopImage.image.asset->url, image.image.asset->url),
    "mobileImage": coalesce(mobileImage.image.asset->url, desktopImage.image.asset->url, image.image.asset->url),
    "imageAlt": coalesce(desktopImage.alt, mobileImage.alt, image.alt, title),
    "videoSrc": coalesce(videoFile.asset->url, video.file.asset->url, video.url, videoUrl),
    order
  },
  "pillars": sections[_type == "cardGridSection" && _key == "home-pillars"][0].cards[]{
    title,
    description,
    "imageUrl": image.image.asset->url,
    "videoUrl": coalesce(video.file.asset->url, video.url),
    order
  }
}`;

const videosQuery = `*[_type == "video"]|order(order asc, title asc){
  title,
  vimeoId,
  vimeoHash
}`;

async function getMediaSettings() {
  return sanityClient.fetch<MediaSettingsResult | null>(mediaSettingsQuery);
}

async function getHomePageSections() {
  return sanityClient.fetch<HomepagePageSectionResult | null>(homePageSectionsQuery);
}

function isHeroSlide(slide: SanityHeroSlide): slide is HeroBannerSlide {
  return Boolean(
    slide.id &&
      slide.title &&
      slide.subtitle &&
      slide.ctaLabel &&
      slide.ctaHref &&
      slide.desktopImage &&
      slide.mobileImage &&
      slide.imageAlt,
  );
}

function isPillar(pillar: SanityPillar): pillar is SobhaPillar {
  return Boolean(pillar.title && pillar.description && pillar.imageUrl);
}

export async function getHomepageMedia(): Promise<HomepageMedia | null> {
  const [mediaSettings, homePageSections] = await Promise.all([
    getMediaSettings(),
    getHomePageSections(),
  ]);

  const fallbackHeroSlides = (mediaSettings?.homepageHeroSlides ?? []).filter(isHeroSlide);
  const fallbackPillars = (mediaSettings?.homepagePillars ?? []).filter(isPillar);

  const pageHeroSlides = (homePageSections?.heroSlides ?? [])
    .map((slide, index) => ({
      ...fallbackHeroSlides[index],
      ...slide,
      desktopImage: slide.desktopImage ?? fallbackHeroSlides[index]?.desktopImage,
      mobileImage:
        slide.mobileImage ??
        slide.desktopImage ??
        fallbackHeroSlides[index]?.mobileImage ??
        fallbackHeroSlides[index]?.desktopImage,
      imageAlt: slide.imageAlt ?? fallbackHeroSlides[index]?.imageAlt,
      ctaLabel: slide.ctaLabel ?? fallbackHeroSlides[index]?.ctaLabel,
      ctaHref: slide.ctaHref ?? fallbackHeroSlides[index]?.ctaHref,
      videoSrc: slide.videoSrc ?? fallbackHeroSlides[index]?.videoSrc,
    }))
    .filter(isHeroSlide);

  const pagePillars = (homePageSections?.pillars ?? [])
    .map((pillar, index) => ({
      ...fallbackPillars[index],
      ...pillar,
      imageUrl: pillar.imageUrl ?? fallbackPillars[index]?.imageUrl,
      videoUrl: pillar.videoUrl ?? fallbackPillars[index]?.videoUrl,
    }))
    .filter(isPillar);

  const heroSlides = pageHeroSlides.length > 0 ? pageHeroSlides : fallbackHeroSlides;
  const pillars = pagePillars.length > 0 ? pagePillars : fallbackPillars;

  if (heroSlides.length === 0 && pillars.length === 0) return null;

  return {
    heroSlides,
    pillars,
  };
}

export async function getArchitectureMedia(): Promise<ArchitectureMedia | null> {
  const mediaSettings = await getMediaSettings();
  if (!mediaSettings?.architectureVideo) return null;

  const { posterImage, videoSrc } = mediaSettings.architectureVideo;
  if (!posterImage && !videoSrc) return null;

  return {
    posterImage,
    videoSrc,
  };
}

export async function getVideoGallery(): Promise<AriaVideoItem[] | null> {
  const videos = await sanityClient.fetch<Partial<AriaVideoItem>[]>(videosQuery);
  const validVideos = videos.filter(
    (video): video is AriaVideoItem => Boolean(video.title && video.vimeoId && video.vimeoHash),
  );

  return validVideos.length > 0 ? validVideos : null;
}
