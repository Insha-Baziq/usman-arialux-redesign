import { readFileSync } from "node:fs";
import path from "node:path";

import { render, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ariaLuxBrand } from "./arialux-brand";
import { ARIA_HEADER_MENU } from "./arialux-data";
import { SobhaHeader } from "./SobhaChrome";

describe("SobhaHeader", () => {
  it("renders the AriaLux menu split around the centered logo", () => {
    render(
      <SobhaHeader
        brand={ariaLuxBrand}
        menus={ARIA_HEADER_MENU}
        hideLanguageSwitcher
      />,
    );

    const leftNav = document.querySelector(".sobha-nav-left");
    const rightNav = document.querySelector(".sobha-nav-right");

    expect(leftNav).toBeInTheDocument();
    expect(rightNav).toBeInTheDocument();

    for (const label of ["HOME", "INTERIOR FINISHES", "FLOOR PLANS", "CONTACT"]) {
      expect(within(leftNav as HTMLElement).getByRole("link", { name: label })).toBeInTheDocument();
    }

    for (const label of ["PORTFOLIO", "VIDEO", "ARCHITECTURAL SERVICES", "WHO WE ARE"]) {
      expect(within(rightNav as HTMLElement).getByRole("link", { name: label })).toBeInTheDocument();
    }
  });

  it("uses a desktop grid instead of fixed side padding that clips long labels", () => {
    const css = readFileSync(path.join(process.cwd(), "src/app/globals.css"), "utf8");

    expect(css).toContain(
      "grid-template-columns: minmax(0, 1fr) clamp(11.25rem, 12vw, 13.5rem) minmax(0, 1fr);",
    );
    expect(css).toContain(".sobha-nav-left {\n    grid-column: 1;\n    justify-content: flex-start !important;");
    expect(css).toContain(".sobha-nav-right {\n    grid-column: 3;\n    justify-content: flex-end !important;");
    expect(css).toContain("height: 84px;");
    expect(css).not.toContain("padding-right: 260px");
    expect(css).not.toContain("padding-left: 260px");
  });
});
