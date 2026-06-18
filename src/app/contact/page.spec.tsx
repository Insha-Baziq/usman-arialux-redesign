import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import ContactPage from "./page";

vi.mock("@/sanity/lib/content", () => ({
  getHeaderMenu: vi.fn(async () => []),
}));

vi.mock("@/sanity/lib/pages", () => ({
  getContactPageContent: vi.fn(async () => ({
    eyebrow: "Let's Connect",
    heading: "Contact Us",
    formLead: "Tell us about your custom home plans.",
    notice: "This site is protected by reCAPTCHA.",
    image: "/images/who-we-are-hero-v1.webp",
    imageAlt: "AriaLux Homes - featured custom build",
    detailHeading: "Better yet, come see us in person to get a tour of our builds!",
    detailBody:
      "We love our customers, so feel free to reach out for a free consultation.",
  })),
}));

describe("ContactPage", () => {
  it("renders contact content inside the luxury reveal stage", async () => {
    const { container } = render(await ContactPage());

    const revealStage = container.querySelector(".contact-reveal-stage");
    const headingMask = container.querySelector(".contact-heading-mask");
    const bodyReveal = container.querySelector(".contact-body-reveal");
    const imageReveal = container.querySelector(".contact-image-reveal");

    expect(revealStage).toBeInTheDocument();
    expect(headingMask).toBeInTheDocument();
    expect(bodyReveal).toBeInTheDocument();
    expect(imageReveal).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Contact Us" })).toBeInTheDocument();
    expect(screen.getByAltText("AriaLux Homes - featured custom build")).toBeInTheDocument();
  });
});
