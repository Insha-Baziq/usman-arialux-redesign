import type { HeroBannerSlide } from "@/components/sobha-sections";
import type { AriaVideoItem } from "@/components/arialux-data";
import type { SobhaPillar } from "@/components/sobha-homepage-data";

import { createDataAttribute } from "next-sanity";
import { cache } from "react";

import { sanityFetch } from "./fetch";

type SanityHeroSlide = Partial<HeroBannerSlide> & {
  _key?: string;
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
  pillars?: SanityPillar[];
};

const mediaSettingsQuery = `*[_type == "mediaSettings" && _id == "mediaSettings"][0]{
  "homepageHeroSlides": homepageHeroSlides[]{
    _key,
    "id": coalesce(id, _key),
    title,
    subtitle,
    ctaLabel,
    ctaHref,
    "desktopImage": desktopImage.image.asset->url,
    "mobileImage": coalesce(mobileImage.image.asset->url, desktopImage.image.asset->url),
    "imageAlt": coalesce(desktopImage.alt, mobileImage.alt, title),
    "videoSrc": coalesce(videoFile.asset->url, videoUrl)
  },
  "homepagePillars": homepagePillars[]|order(order asc){
    _key,
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

const architectureMediaQuery = `*[_type == "architectureMedia" && _id == "architectureMedia"][0]{
  "posterImage": posterImage.image.asset->url,
  "videoSrc": coalesce(videoFile.asset->url, videoUrl)
}`;

const homePageSectionsQuery = `*[_type == "page" && slug.current == "home"][0]{
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
  vimeoHash,
  "videoSrc": videoFile.asset->url,
  "poster": thumbnail.image.asset->url
}`;

const getMediaSettings = cache(async () => {
  return sanityFetch<MediaSettingsResult | null>(mediaSettingsQuery);
});

const getHomePageSections = cache(async () => {
  return sanityFetch<HomepagePageSectionResult | null>(homePageSectionsQuery);
});

function isHeroSlide(slide: SanityHeroSlide): slide is HeroBannerSlide {
  // A slide only needs a title and a background image to render. Subtitle and
  // the button (label + link) are optional — HeroBanner hides them when blank.
  return Boolean(
    slide.id && slide.title && slide.desktopImage && slide.mobileImage && slide.imageAlt,
  );
}

function isPillar(pillar: SanityPillar): pillar is SobhaPillar {
  return Boolean(pillar.title && pillar.description && pillar.imageUrl);
}

function createMediaSettingsDataAttribute(path: string) {
  return createDataAttribute({
    baseUrl: "/studio",
    id: "mediaSettings",
    path,
    type: "mediaSettings",
    workspace: "arialux-homes",
  }).toString();
}

function withHeroEditTargets(slides: SanityHeroSlide[]): SanityHeroSlide[] {
  return slides.map((slide) => ({
    ...slide,
    sanityEditTarget: slide._key
      ? createMediaSettingsDataAttribute(`homepageHeroSlides[_key=="${slide._key}"]`)
      : slide.sanityEditTarget,
  }));
}

export const getHomepageMedia = cache(async (): Promise<HomepageMedia | null> => {
  const [mediaSettings, homePageSections] = await Promise.all([
    getMediaSettings(),
    getHomePageSections(),
  ]);

  const fallbackHeroSlides = withHeroEditTargets(mediaSettings?.homepageHeroSlides ?? []).filter(
    isHeroSlide,
  );
  const fallbackPillars = (mediaSettings?.homepagePillars ?? []).filter(isPillar);

  const pagePillars = (homePageSections?.pillars ?? [])
    .map((pillar, index) => ({
      ...fallbackPillars[index],
      ...pillar,
      imageUrl: pillar.imageUrl ?? fallbackPillars[index]?.imageUrl,
      videoUrl: pillar.videoUrl ?? fallbackPillars[index]?.videoUrl,
    }))
    .filter(isPillar);

  // Hero slides come exclusively from Homepage media (single source of truth).
  const heroSlides = fallbackHeroSlides;
  const pillars = fallbackPillars.length > 0 ? fallbackPillars : pagePillars;

  if (heroSlides.length === 0 && pillars.length === 0) return null;

  return {
    heroSlides,
    pillars,
  };
});

export const getArchitectureMedia = cache(async (): Promise<ArchitectureMedia | null> => {
  // Primary source: the dedicated "Architectural services video" document.
  // Falls back to the legacy mediaSettings.architectureVideo so the live video
  // keeps working before/during migration.
  const [dedicated, mediaSettings] = await Promise.all([
    sanityFetch<ArchitectureMedia | null>(architectureMediaQuery),
    getMediaSettings(),
  ]);

  const posterImage = dedicated?.posterImage ?? mediaSettings?.architectureVideo?.posterImage;
  const videoSrc = dedicated?.videoSrc ?? mediaSettings?.architectureVideo?.videoSrc;
  if (!posterImage && !videoSrc) return null;

  return {
    posterImage,
    videoSrc,
  };
});

export const getVideoGallery = cache(async (): Promise<AriaVideoItem[] | null> => {
  const videos = await sanityFetch<Partial<AriaVideoItem>[]>(videosQuery);
  const validVideos = videos.filter(
    (video): video is AriaVideoItem => Boolean(video.title && (video.videoSrc || video.vimeoId)),
  );

  return validVideos.length > 0 ? validVideos : null;
});
