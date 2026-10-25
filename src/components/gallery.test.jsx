import { describe, it, expect } from "vitest";
import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ArtWorks from "./embla/ArtWorks";
import Slider from "./Slider";
import { products } from "../pages/shopItems";
import { renderWithProviders } from "../test/utils";

// The paginated grid below the carousel shows each artwork's name as an <h1>.
const gridTitles = () =>
  screen
    .getAllByRole("heading", { level: 1 })
    .map((h) => h.textContent)
    .filter((t) => t !== "artworks");

describe("ArtWorks gallery", () => {
  function renderGallery() {
    return renderWithProviders(<ArtWorks />, {
      route: "/works/artWorks",
      path: "/works/artWorks",
    });
  }

  it("shows the first 9 artworks on page 1", () => {
    renderGallery();

    expect(gridTitles()).toEqual(products.slice(0, 9).map((p) => p.name));
  });

  it("renders one page number per 9 artworks", () => {
    renderGallery();
    const totalPages = Math.ceil(products.length / 9);

    for (let page = 1; page <= totalPages; page++) {
      expect(screen.getByText(String(page), { selector: "span" })).toBeInTheDocument();
    }
  });

  it("moves between pages with the arrows", async () => {
    const user = userEvent.setup();
    renderGallery();
    const prev = screen.getByRole("button", { name: "←" });
    const next = screen.getByRole("button", { name: "→" });
    expect(prev).toBeDisabled();

    await user.click(next);
    expect(gridTitles()).toEqual(products.slice(9, 18).map((p) => p.name));
    expect(prev).toBeEnabled();

    await user.click(prev);
    expect(gridTitles()).toEqual(products.slice(0, 9).map((p) => p.name));
  });

  it("jumps straight to the last page and disables 'next'", async () => {
    const user = userEvent.setup();
    renderGallery();
    const lastPage = Math.ceil(products.length / 9);

    await user.click(screen.getByText(String(lastPage), { selector: "span" }));

    expect(gridTitles()).toEqual(products.slice((lastPage - 1) * 9).map((p) => p.name));
    expect(screen.getByRole("button", { name: "→" })).toBeDisabled();
  });

  it("opens an artwork's details page with a hyphenated slug", async () => {
    const user = userEvent.setup();
    renderGallery();
    const title = screen.getByRole("heading", { level: 1, name: "water lilly pond" });
    const card = title.closest("div.grid");

    await user.click(within(card).getByRole("button"));

    expect(screen.getByTestId("location")).toHaveTextContent(
      "/works/artWorks/water-lilly-pond"
    );
  });
});

describe("home page Slider", () => {
  it("shows every artwork and a link to all works", () => {
    renderWithProviders(<Slider />);

    expect(screen.getAllByRole("heading", { level: 3 })).toHaveLength(products.length);
    expect(screen.getByRole("link", { name: "MORE WORKS" })).toHaveAttribute("href", "/works");
  });

  it("opens the clicked artwork's details page", async () => {
    const user = userEvent.setup();
    renderWithProviders(<Slider />, { path: "/" });

    await user.click(screen.getByRole("heading", { level: 3, name: "cat eyes" }));

    expect(screen.getByTestId("location")).toHaveTextContent("/works/artWorks/cat-eyes");
  });
});
