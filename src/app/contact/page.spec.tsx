import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import ContactPage from "./page";

describe("ContactPage", () => {
  it("renders contact content inside the luxury reveal stage", () => {
    const { container } = render(<ContactPage />);

    const revealStage = container.querySelector(".contact-reveal-stage");
    const headingMask = container.querySelector(".contact-heading-mask");
    const bodyReveal = container.querySelector(".contact-body-reveal");
    const imageReveal = container.querySelector(".contact-image-reveal");

    expect(revealStage).toBeInTheDocument();
    expect(headingMask).toBeInTheDocument();
    expect(bodyReveal).toBeInTheDocument();
    expect(imageReveal).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Contact Us" })).toBeInTheDocument();
    expect(screen.getByAltText("AriaLux Homes — featured custom build")).toBeInTheDocument();
  });
});
