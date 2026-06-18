import { render, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import WhoWeArePage from "./page";

vi.mock("@/sanity/lib/content", () => ({
  getHeaderMenu: vi.fn(async () => []),
}));

vi.mock("@/sanity/lib/pages", () => ({
  getWhoWeArePageContent: vi.fn(async () => ({
    eyebrow: "AriaLux Homes",
    heading: "Our Mission",
    mission:
      "At AriaLux Homes, we are more than just a builder. We design and build custom homes with clarity, care, and lasting detail.",
    hero: "/images/who-we-are-hero-v1.webp",
    heroAlt: "AriaLux Homes",
    ctaEyebrow: "Ready to begin?",
    ctaHeadline: "Build with AriaLux",
    ctaSubline: "Schedule a free consultation.",
    ctaLabel: "Start the Conversation",
    ctaHref: "/contact",
    ctaBackgroundImage: "/images/who-we-are-hero-v1.webp",
  })),
}));

describe("WhoWeArePage", () => {
  it("renders the hero image and mission copy inside one responsive mission section", async () => {
    const { container } = render(await WhoWeArePage());

    const missionSection = container.querySelector("#mission");

    expect(missionSection).not.toBeNull();

    const mission = missionSection as HTMLElement;

    expect(within(mission).getByAltText("AriaLux Homes")).toBeInTheDocument();
    expect(within(mission).getByRole("heading", { name: "Our Mission" })).toBeInTheDocument();
    expect(
      within(mission).getByText(/At AriaLux Homes, we are more than just a builder/i),
    ).toBeInTheDocument();
    expect(mission.firstElementChild).toHaveClass("mx-auto", "grid", "lg:grid-cols-2");
  });

  it("uses a bounded rounded image panel and Framer Motion reveal hooks", async () => {
    const { container } = render(await WhoWeArePage());

    const missionSection = container.querySelector("#mission");
    expect(missionSection).not.toBeNull();

    const mission = missionSection as HTMLElement;
    const imagePanel = mission.querySelector(".who-we-are-image-panel");
    const textPanel = mission.querySelector(".who-we-are-motion-copy");
    const image = within(mission).getByAltText("AriaLux Homes");

    expect(imagePanel).toHaveClass("rounded-[1.35rem]", "bg-transparent", "lg:h-[28.5rem]");
    expect(image).toHaveClass("h-full", "object-contain");
    expect(textPanel).toBeInTheDocument();
    expect(mission.querySelectorAll(".overflow-hidden").length).toBeGreaterThanOrEqual(3);
  });
});
