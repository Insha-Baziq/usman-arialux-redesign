import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { SobhaHomepage } from "./SobhaHomepage";

describe("SobhaHomepage", () => {
  it("renders the Sobha rotating hero banner slides", () => {
    render(<SobhaHomepage />);

    expect(screen.getAllByRole("heading", { name: "Sobha Sanctuary" }).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByRole("heading", { name: "Sobha City" }).length).toBeGreaterThanOrEqual(1);
    expect(
      screen.getAllByRole("heading", { name: "Tranquil Beach Residences" }).length,
    ).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Spaces Where Life Unfolds").length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText("Where the Tide Sets the Tone")).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: "DISCOVER" }).length).toBeGreaterThanOrEqual(3);
  });

  it("renders the merged new-launch section (pillars + properties)", () => {
    render(<SobhaHomepage />);

    expect(
      screen.getByRole("heading", {
        name: "FROM CONCEPT TO COMPLETION: DEFINING OUR PILLARS",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "Explore our Luxury properties in the UAE",
      }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Explore All" })).toBeInTheDocument();
  });

  it("renders the Press Releases stories section", () => {
    render(<SobhaHomepage />);

    expect(
      screen.getByRole("heading", { name: "Press Releases" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "View all" })).toBeInTheDocument();
  });

  it("renders the Sobha footer navigation groups", () => {
    render(<SobhaHomepage />);

    const footer = screen.getByRole("contentinfo");

    expect(within(footer).getByText("APARTMENTS")).toBeInTheDocument();
    expect(within(footer).getByText("COMMUNITIES")).toBeInTheDocument();
    expect(within(footer).getByText("ABOUT US")).toBeInTheDocument();
    expect(within(footer).getByText("Privacy Policy")).toBeInTheDocument();
  });
});
