import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { HeroBanner, type HeroBannerSlide } from "./HeroBanner";

const slides: HeroBannerSlide[] = [
  {
    id: "video-slide",
    title: "Video Slide",
    subtitle: "Watch it finish",
    ctaLabel: "EXPLORE",
    ctaHref: "/video",
    desktopImage: "/images/video-poster.jpg",
    mobileImage: "/images/video-poster.jpg",
    imageAlt: "Video poster",
    videoSrc: "/videos/hero.mp4",
  },
  {
    id: "image-slide",
    title: "Image Slide",
    subtitle: "Timed fallback",
    ctaLabel: "DISCOVER",
    ctaHref: "/image",
    desktopImage: "/images/image-slide.jpg",
    mobileImage: "/images/image-slide.jpg",
    imageAlt: "Image slide",
  },
];

function sectionForHeading(name: string): HTMLElement {
  const section = screen.getByRole("heading", { name }).closest("section");

  if (!section) {
    throw new Error(`Missing section for ${name}`);
  }

  return section;
}

describe("HeroBanner", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("keeps a video slide active until the video finishes", () => {
    vi.useFakeTimers();

    render(<HeroBanner slides={slides} autoplayDelayMs={4500} />);

    expect(sectionForHeading("Video Slide")).toHaveClass("opacity-100");

    act(() => {
      vi.advanceTimersByTime(9000);
    });

    expect(sectionForHeading("Video Slide")).toHaveClass("opacity-100");

    fireEvent.ended(document.querySelector("video") as HTMLVideoElement);

    expect(sectionForHeading("Image Slide")).toHaveClass("opacity-100");
  });
});
