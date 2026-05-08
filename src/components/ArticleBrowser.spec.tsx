import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ARIA_ARTICLES } from "./arialux-data";
import { ArticleBrowser } from "./ArticleBrowser";

describe("ArticleBrowser", () => {
  it("renders the article listing and opens articles in the reveal reader", async () => {
    render(<ArticleBrowser articles={ARIA_ARTICLES} />);

    expect(screen.getByText("Sort By")).toBeInTheDocument();
    expect(screen.queryByText("1 articles match")).not.toBeInTheDocument();
    expect(screen.queryByText("Topic")).not.toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: /open buy new construction now article/i,
      }),
    ).toBeInTheDocument();

    fireEvent.click(
      screen.getByRole("button", {
        name: /open buy new construction now article/i,
      }),
    );

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(
      within(screen.getByRole("dialog")).getByRole("heading", {
        name: "Buy New Construction Now",
      }),
    ).toBeInTheDocument();
    expect(
      within(screen.getByRole("dialog")).getByRole("heading", {
        name: "Article images",
      }),
    ).toBeInTheDocument();
    expect(
      within(screen.getByRole("dialog")).getByText("Publisher"),
    ).toBeInTheDocument();
    expect(
      within(screen.getByRole("dialog")).queryByText(/facebook/i),
    ).not.toBeInTheDocument();

    const firstImage = within(screen.getByRole("dialog")).getByRole("button", {
      name: "Expand article image 1",
    });
    expect(firstImage).toHaveAttribute("aria-pressed", "false");
    fireEvent.click(firstImage);
    expect(
      within(screen.getByRole("dialog")).getByRole("button", {
        name: "Collapse article image 1",
      }),
    ).toHaveAttribute("aria-pressed", "true");
  });
});
