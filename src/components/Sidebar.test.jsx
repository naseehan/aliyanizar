import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Sidebar from "./Sidebar";

const items = [
  { id: 1, name: "orange tree", thumbnail: "/orange.webp", quantity: 2 },
  { id: 2, name: "desert rose", thumbnail: "/rose.webp", quantity: 1 },
];

function renderSidebar(props = {}) {
  const deleteItem = vi.fn();
  render(
    <Sidebar
      toggle
      length={items.length}
      arrayOfItems={items}
      deleteItem={deleteItem}
      name="Cart"
      checkout
      {...props}
    />
  );
  return { deleteItem };
}

describe("Sidebar", () => {
  it("shows an empty message when there are no items", () => {
    renderSidebar({ length: 0, arrayOfItems: [], name: "Favourites" });

    expect(screen.getByText("No items in Favourites")).toBeInTheDocument();
  });

  it("lists each item with its quantity", () => {
    renderSidebar();

    expect(screen.getByRole("heading", { name: "orange tree" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "desert rose" })).toBeInTheDocument();
    expect(screen.getByText("2 ×")).toBeInTheDocument();
    expect(screen.getByAltText("orange tree")).toHaveAttribute("src", "/orange.webp");
  });

  it("calls deleteItem with the item id when the remove button is clicked", async () => {
    const { deleteItem } = renderSidebar();
    const removeButtons = screen
      .getAllByRole("button")
      .filter((b) => b.textContent === "");

    await userEvent.click(removeButtons[1]);

    expect(deleteItem).toHaveBeenCalledWith(2);
  });

  it("opens WhatsApp with the cart contents on checkout", async () => {
    renderSidebar();

    await userEvent.click(screen.getByRole("button", { name: "Checkout" }));

    expect(window.open).toHaveBeenCalledTimes(1);
    const [url, target] = window.open.mock.calls[0];
    expect(url).toMatch(/^https:\/\/wa\.me\/\+971562826331\?text=/);
    expect(url).toContain("Product: orange tree Count: 2");
    expect(url).toContain("Product: desert rose Count: 1");
    expect(target).toBe("_blank");
  });

  it("hides the checkout button for the favourites list", () => {
    renderSidebar({ checkout: false, name: "Favourites" });

    expect(screen.queryByRole("button", { name: "Checkout" })).not.toBeInTheDocument();
  });

  it("slides in when open and out when closed", () => {
    const { container, rerender } = render(
      <Sidebar toggle length={0} arrayOfItems={[]} deleteItem={() => {}} name="Cart" />
    );
    expect(container.firstChild).toHaveClass("right-0");

    rerender(
      <Sidebar toggle={false} length={0} arrayOfItems={[]} deleteItem={() => {}} name="Cart" />
    );
    expect(container.firstChild).toHaveClass("opacity-0");
  });
});
