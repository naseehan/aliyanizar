import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { toast } from "react-toastify";
import { fetchProducts } from "../lib/productsApi";
import ArtWorkDetails from "./ArtWorkDetails";
import { renderWithProviders, sampleProducts } from "../test/utils";

vi.mock("../lib/productsApi", async (importOriginal) => ({
  ...(await importOriginal()),
  fetchProducts: vi.fn(),
}));

vi.mock("react-toastify", () => ({ toast: { error: vi.fn() } }));

function renderDetails(slug, options) {
  return renderWithProviders(<ArtWorkDetails />, {
    route: `/works/artWorks/${slug}`,
    path: "/works/artWorks/:slug",
    ...options,
  });
}

describe("ArtWorkDetails page", () => {
  beforeEach(() => {
    fetchProducts.mockResolvedValue(sampleProducts);
  });

  it("shows the product that matches the slug", async () => {
    renderDetails("orange-tree");

    expect(screen.getByText("Loading product…")).toBeInTheDocument();
    expect(await screen.findByRole("heading", { level: 1, name: "orange tree" })).toBeInTheDocument();
    expect(screen.getByText("Mixed media on canvas, 90cmx60cm")).toBeInTheDocument();
    expect(screen.getByText("An orange tree growing out of a fountain.")).toBeInTheDocument();
    expect(screen.getByAltText("orange tree")).toHaveAttribute("src", "https://cdn.test/orange.webp");
  });

  it("still supports old URL-encoded links", async () => {
    renderDetails("orange%20tree");

    expect(await screen.findByRole("heading", { level: 1, name: "orange tree" })).toBeInTheDocument();
  });

  it("shows 'Product not found.' for an unknown slug", async () => {
    renderDetails("does-not-exist");

    expect(await screen.findByText("Product not found.")).toBeInTheDocument();
  });

  it("shows the API error when loading fails", async () => {
    fetchProducts.mockRejectedValue(new Error("Strapi is down"));
    renderDetails("orange-tree");

    expect(await screen.findByText("Strapi is down")).toBeInTheDocument();
  });

  it("adds to cart and updates the quantity counter", async () => {
    const user = userEvent.setup();
    const { store } = renderDetails("orange-tree");
    await screen.findByRole("heading", { level: 1, name: "orange tree" });

    await user.click(screen.getByRole("button", { name: "Add To Cart" }));
    await user.click(screen.getByRole("button", { name: "Add To Cart" }));

    expect(store.getState().cart.items).toEqual([
      expect.objectContaining({ id: 1, quantity: 2 }),
    ]);
    const counter = screen.getByRole("button", { name: "Add To Cart" }).previousElementSibling;
    expect(counter).toHaveTextContent("2");
  });

  it("warns when the 5-item limit is reached", async () => {
    const user = userEvent.setup();
    renderDetails("orange-tree", {
      preloadedState: {
        cart: { items: [{ ...sampleProducts[0], quantity: 5 }] },
        faves: { items: [] },
      },
    });

    await user.click(await screen.findByRole("button", { name: "Add To Cart" }));

    expect(toast.error).toHaveBeenCalledWith("You can only add up to 5 of this item.");
  });

  it("toggles the favourite heart", async () => {
    const user = userEvent.setup();
    const { store } = renderDetails("orange-tree");
    await screen.findByRole("heading", { level: 1, name: "orange tree" });
    const heart = screen.getByRole("button", { name: "Toggle favourite" });

    await user.click(heart);
    expect(store.getState().faves.items.map((f) => f.id)).toEqual([1]);
    expect(heart.querySelector("i")).toHaveClass("fa-solid");

    await user.click(heart);
    expect(store.getState().faves.items).toEqual([]);
    expect(heart.querySelector("i")).toHaveClass("fa-regular");
  });

  it("hides purchase controls for sold artworks", async () => {
    renderDetails("desert-rose");
    await screen.findByRole("heading", { level: 1, name: "desert rose" });

    expect(screen.queryByRole("button", { name: "Add To Cart" })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Toggle favourite" })).not.toBeInTheDocument();
  });

  it("shows the favourites count badge", async () => {
    renderDetails("orange-tree", {
      preloadedState: {
        cart: { items: [] },
        faves: { items: [sampleProducts[0], sampleProducts[2]] },
      },
    });
    // the product title also appears in the favourites sidebar, so wait on the dimensions
    await screen.findByText("Mixed media on canvas, 90cmx60cm");

    const favesButton = screen.getByRole("button", { name: "Open favourites" });
    expect(within(favesButton.parentElement).getByText("2")).toBeInTheDocument();
  });
});
