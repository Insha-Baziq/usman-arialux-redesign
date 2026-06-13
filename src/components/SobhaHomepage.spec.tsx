import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { SobhaHomepage } from "./SobhaHomepage";

describe("SobhaHomepage", () => {
  it("renders the AriaLux rotating hero banner slides", () => {
    render(<SobhaHomepage />);

    expect(screen.getAllByRole("heading", { name: "CURATED FLOOR PLANS" }).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByRole("heading", { name: "BUILDING HOMES THAT ARE FOR NOW & EVER" }).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByRole("heading", { name: "ARIALUX HOMES" }).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Spaces Where Life Unfolds").length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText("Custom Builds. Quiet Confidence.")).toBeInTheDocument();
    expect(screen.getByText("Designed for the Way You Live")).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: "EXPLORE" }).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByRole("link", { name: "DISCOVER" })).toBeInTheDocument();
  });

  it("renders the merged new-launch section (pillars + properties)", () => {
    render(<SobhaHomepage />);

    expect(
      screen.getByRole("heading", {
        name: "FROM CONCEPT TO COMPLETION: HOW WE BUILD",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "Explore Our Custom Floor Plans",
      }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Explore All" })).toBeInTheDocument();
  });

  it("renders the recent builds stories section", () => {
    render(<SobhaHomepage />);

    expect(
      screen.getByRole("heading", { name: "Recent Builds" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "View all" })).toBeInTheDocument();
  });

  it("renders the AriaLux footer navigation groups", () => {
    render(<SobhaHomepage />);

    const footer = screen.getByRole("contentinfo");

    expect(within(footer).getByText("Visit Our Studio")).toBeInTheDocument();
    expect(within(footer).getByText("Company")).toBeInTheDocument();
    expect(within(footer).getByText("Explore")).toBeInTheDocument();
    expect(within(footer).getByText("Featured Plans")).toBeInTheDocument();
  });
});
