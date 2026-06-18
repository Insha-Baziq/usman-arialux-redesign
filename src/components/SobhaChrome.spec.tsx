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

    for (const label of ["INTERIOR FINISHES", "FLOOR PLANS", "CONTACT", "ARTICLES"]) {
      expect(within(leftNav as HTMLElement).getByRole("link", { name: label })).toBeInTheDocument();
    }

    for (const label of ["PORTFOLIO", "VIDEO", "ARCHITECTURAL SERVICES", "WHO WE ARE"]) {
      expect(within(rightNav as HTMLElement).getByRole("link", { name: label })).toBeInTheDocument();
    }
  });

  it("uses a desktop grid instead of fixed side padding that clips long labels", () => {
    const css = readFileSync(path.join(process.cwd(), "src/app/globals.css"), "utf8");

    expect(css).toMatch(
      /grid-template-columns:\s*minmax\(0,\s*1fr\)\s*clamp\(8rem,\s*12vw,\s*15rem\)\s*minmax\(\s*0,\s*1fr\s*\);/,
    );
    expect(css).toMatch(/\.sobha-nav-left\s*{\s*grid-column:\s*1;\s*justify-content:\s*flex-end\s*!important;/);
    expect(css).toMatch(/\.sobha-nav-right\s*{\s*grid-column:\s*3;\s*justify-content:\s*flex-start\s*!important;/);
    expect(css).toContain("height: 84px;");
    expect(css).not.toContain("padding-right: 260px");
    expect(css).not.toContain("padding-left: 260px");
  });
});
