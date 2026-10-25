import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { HeadProvider } from "react-head";
import { ParallaxProvider } from "react-scroll-parallax";
import Home from "./Home";
import About from "./About";
import Services from "./Services";
import Murals from "./Murals";
import DesignWorkDetails from "./DesignWorkDetails";
import { murals } from "./muralsDetails";

// CircleType measures rendered text, which jsdom cannot do
vi.mock("circletype", () => ({
  default: class {
    radius() {
      return this;
    }
  },
}));

// Smoke tests: these pages are mostly animated content, so we check that they
// render without crashing and show their key content.
function renderPage(ui, { route = "/", path = "/" } = {}) {
  return render(
    <HeadProvider>
      <ParallaxProvider>
        <MemoryRouter initialEntries={[route]}>
          <Routes>
            <Route path={path} element={ui} />
          </Routes>
        </MemoryRouter>
      </ParallaxProvider>
    </HeadProvider>
  );
}

describe("Home page", () => {
  it("renders the hero and lazy-loads every section", async () => {
    renderPage(<Home />);

    expect(screen.getAllByAltText("spinning circle")).toHaveLength(2);
    expect(await screen.findByRole("heading", { name: "ARTWORKS" })).toBeInTheDocument();
    expect(await screen.findByRole("heading", { name: "PAINTINGS" })).toBeInTheDocument();
    expect(await screen.findByRole("heading", { name: /Let’s Collaborate/ })).toBeInTheDocument();
  });

  it("preloads hero images and removes the preload tags on unmount", () => {
    const { unmount } = renderPage(<Home />);

    expect(document.head.querySelector('link[rel="preload"][href="/bgwork.webp"]')).not.toBeNull();

    unmount();

    expect(document.head.querySelector('link[rel="preload"][href="/bgwork.webp"]')).toBeNull();
  });
});

describe("About page", () => {
  it("renders the author section", () => {
    renderPage(<About />);

    expect(screen.getByAltText("author")).toBeInTheDocument();
  });
});

describe("Services page", () => {
  it("lists every service", () => {
    renderPage(<Services />);

    for (const service of [
      "PAINTINGS",
      "ILLUSTRATIONS",
      "CALLIGRAPHY",
      "3D VISUALIZATION",
      "Interior Design Consultation",
    ]) {
      expect(screen.getByRole("heading", { name: service })).toBeInTheDocument();
    }
  });
});

describe("Murals page", () => {
  it("shows every mural with its size", () => {
    renderPage(<Murals />);

    for (const mural of murals) {
      expect(screen.getByRole("heading", { name: mural.name })).toBeInTheDocument();
    }
    expect(screen.getByText("Diameter 180cm")).toBeInTheDocument();
  });
});

describe("DesignWorkDetails page", () => {
  it("uses the project title from the URL", () => {
    renderPage(<DesignWorkDetails />, {
      route: "/works/designWorks/interiors/kitchen",
      path: "/works/designWorks/:title/:slug",
    });

    expect(screen.getByRole("heading", { name: "interiors" })).toBeInTheDocument();
  });
});
