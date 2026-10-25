import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Work from "./Work";
import DesignWork from "./DesignWork";
import Interiors from "./Interiors";
import NotFound from "./NotFound";
import { murals } from "./muralsDetails";
import { products } from "./shopItems";

const inRouter = (ui, route = "/") =>
  render(<MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>);

describe("Work page", () => {
  it("links to artworks and design projects", () => {
    inRouter(
      <Routes>
        <Route path="/works" element={<Work />} />
      </Routes>,
      "/works"
    );

    expect(screen.getByRole("link", { name: "Artworks" })).toHaveAttribute(
      "href",
      "/works/artWorks"
    );
    expect(screen.getByRole("link", { name: /design\s*projects/i })).toHaveAttribute(
      "href",
      "/works/designWorks"
    );
  });
});

describe("DesignWork page", () => {
  it("lists the design categories and links to murals", () => {
    inRouter(<DesignWork />);

    expect(screen.getByRole("heading", { name: "design projects" })).toBeInTheDocument();
    for (const name of ["Interiors", "Wall Murals", "Crafts"]) {
      expect(screen.getByRole("heading", { name })).toBeInTheDocument();
    }
    expect(
      screen.getByRole("link", { name: "Learn more about Wall Murals" })
    ).toHaveAttribute("href", "/murals");
  });
});

describe("Interiors page", () => {
  it("uses the route title as the page heading", () => {
    inRouter(
      <Routes>
        <Route path="/works/designWorks/:title" element={<Interiors />} />
      </Routes>,
      "/works/designWorks/kitchens"
    );

    expect(screen.getByRole("heading", { level: 1, name: "kitchens" })).toBeInTheDocument();
  });
});

describe("NotFound page", () => {
  it("shows a 404 message with a link home", () => {
    render(<NotFound />);

    expect(screen.getByRole("heading", { name: /404 not found/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Home Page" })).toHaveAttribute(
      "href",
      "https://www.aliyanizarstudio.com"
    );
  });
});

describe("static content data", () => {
  it("every mural has a unique id and the fields the page renders", () => {
    expect(new Set(murals.map((m) => m.id)).size).toBe(murals.length);
    for (const mural of murals) {
      expect(mural).toEqual(
        expect.objectContaining({
          name: expect.any(String),
          categories: expect.any(String),
          size: expect.any(String),
          img: expect.stringMatching(/^\/murals\//),
          hoverImg: expect.stringMatching(/^\/murals\//),
        })
      );
    }
  });

  it("every local shop item has a unique id and name", () => {
    expect(new Set(products.map((p) => p.id)).size).toBe(products.length);
    expect(new Set(products.map((p) => p.name.toLowerCase())).size).toBe(products.length);
  });
});
