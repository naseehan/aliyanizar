import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { toast } from "react-toastify";
import { fetchProducts } from "../lib/productsApi";
import Shop from "./Shop";
import { renderWithProviders, sampleProducts } from "../test/utils";

vi.mock("../lib/productsApi", async (importOriginal) => ({
  ...(await importOriginal()),
  fetchProducts: vi.fn(),
}));

vi.mock("react-toastify", () => ({ toast: { error: vi.fn() } }));

function renderShop(options) {
  return renderWithProviders(<Shop />, { route: "/shop", path: "/shop", ...options });
}

const productNames = () =>
  screen.queryAllByRole("heading", { level: 3 }).map((h) => h.textContent);

describe("Shop page", () => {
  beforeEach(() => {
    fetchProducts.mockResolvedValue(sampleProducts);
  });

  it("shows a loading state, then the products", async () => {
    renderShop();

    expect(screen.getByText("Loading products…")).toBeInTheDocument();
    expect(await screen.findByRole("heading", { name: "orange tree" })).toBeInTheDocument();
    expect(productNames()).toEqual(["orange tree", "desert rose", "bismillah"]);
  });

  it("shows the error message when products fail to load", async () => {
    fetchProducts.mockRejectedValue(new Error("Unable to load products from Strapi (500)."));
    renderShop();

    expect(
      await screen.findByText("Unable to load products from Strapi (500).")
    ).toBeInTheDocument();
  });

  it("filters products by name as the user types", async () => {
    const user = userEvent.setup();
    renderShop();
    await screen.findByRole("heading", { name: "orange tree" });

    await user.type(screen.getByPlaceholderText("Search for Products..."), "ROSE");

    expect(productNames()).toEqual(["desert rose"]);
  });

  it("shows an empty state when nothing matches the search", async () => {
    const user = userEvent.setup();
    renderShop();
    await screen.findByRole("heading", { name: "orange tree" });

    await user.type(screen.getByPlaceholderText("Search for Products..."), "zzz");

    expect(screen.getByText("No products found.")).toBeInTheDocument();
  });

  it("filters by category and resets with 'All'", async () => {
    const user = userEvent.setup();
    renderShop();
    await screen.findByRole("heading", { name: "orange tree" });

    // the desktop filter list is the second copy of the category buttons
    await user.click(screen.getAllByRole("button", { name: "Calligraphy" })[1]);
    expect(productNames()).toEqual(["bismillah"]);

    await user.click(screen.getAllByRole("button", { name: "All" })[1]);
    expect(productNames()).toHaveLength(3);
  });

  it("does not offer 'Add To Cart' for sold artworks", async () => {
    renderShop();
    await screen.findByRole("heading", { name: "orange tree" });

    // two of the three sample products are for sale
    expect(screen.getAllByRole("button", { name: "Add To Cart" })).toHaveLength(2);
    expect(screen.getAllByAltText("sold")).toHaveLength(1);
  });

  it("adds a product to the cart and shows the cart count", async () => {
    const user = userEvent.setup();
    const { store } = renderShop();
    await screen.findByRole("heading", { name: "orange tree" });

    await user.click(screen.getAllByRole("button", { name: "Add To Cart" })[0]);

    expect(store.getState().cart.items).toEqual([
      expect.objectContaining({ id: 1, quantity: 1 }),
    ]);
    const cartButton = screen.getByRole("button", { name: "Open cart" });
    expect(within(cartButton.parentElement).getByText("1")).toBeInTheDocument();
  });

  it("warns the user when they try to add more than 5 of an item", async () => {
    const user = userEvent.setup();
    renderShop({
      preloadedState: {
        cart: { items: [{ ...sampleProducts[0], quantity: 5 }] },
        faves: { items: [] },
      },
    });
    await screen.findByRole("heading", { name: "orange tree" });

    await user.click(screen.getAllByRole("button", { name: "Add To Cart" })[0]);

    expect(toast.error).toHaveBeenCalledWith("You can only add up to 5 of this item.");
  });

  it("toggles a product in favourites", async () => {
    const user = userEvent.setup();
    const { store, container } = renderShop();
    await screen.findByRole("heading", { name: "orange tree" });

    const heartIcon = container.querySelector(".shop-page-products .fa-heart");
    await user.click(heartIcon.closest("button"));
    expect(store.getState().faves.items.map((f) => f.id)).toEqual([1]);
    expect(heartIcon).toHaveClass("fa-solid");

    await user.click(heartIcon.closest("button"));
    expect(store.getState().faves.items).toEqual([]);
  });

  it("opens the cart sidebar and removes an item from it", async () => {
    const user = userEvent.setup();
    const { store } = renderShop({
      preloadedState: {
        cart: { items: [{ ...sampleProducts[0], quantity: 2 }] },
        faves: { items: [] },
      },
    });
    await screen.findByRole("heading", { name: "orange tree" });

    await user.click(screen.getByRole("button", { name: "Open cart" }));
    expect(document.body.style.overflow).toBe("hidden");

    const cartHeading = screen.getByRole("heading", { level: 1, name: "orange tree" });
    await user.click(within(cartHeading.closest("div.relative")).getAllByRole("button")[0]);

    expect(store.getState().cart.items).toEqual([]);
  });

  it("navigates to the artwork details page with a hyphenated slug", async () => {
    const user = userEvent.setup();
    renderShop();
    await screen.findByRole("heading", { name: "orange tree" });

    await user.click(screen.getAllByRole("button", { name: "View Details" })[0]);

    expect(screen.getByTestId("location")).toHaveTextContent("/works/artWorks/orange-tree");
  });
});
