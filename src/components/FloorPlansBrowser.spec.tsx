import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ARIA_PLANS } from "./arialux-data";
import { FloorPlansBrowser } from "./FloorPlansBrowser";

describe("FloorPlansBrowser", () => {
  it("renders the all floor plans listing like the approved reference grid", () => {
    render(<FloorPlansBrowser plans={ARIA_PLANS} />);

    const gallery = screen.getByTestId("floor-plan-reference-grid");

    expect(gallery).toHaveClass("grid");
    expect(gallery).toHaveClass("grid-cols-1");
    expect(gallery).toHaveClass("md:grid-cols-2");
    expect(gallery).toHaveClass("xl:grid-cols-3");
    expect(screen.getByRole("link", { name: /view aria heights floor plan/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Aria Heights" })).toBeInTheDocument();
    expect(screen.getAllByText("View Plan").length).toBeGreaterThan(1);
    expect(screen.getByLabelText("Sort floor plans")).toBeInTheDocument();
    expect(screen.getByText("Filter Plans")).toBeInTheDocument();
    expect(screen.getByText("Let’s create a floor plan that's uniquely yours.")).toBeInTheDocument();
  });
});
