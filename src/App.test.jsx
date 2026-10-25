import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { act, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import App from "./App";
import { makeStore } from "./test/utils";

// Replace pages with lightweight stubs: this file tests routing, not page content.
const { stubPage } = vi.hoisted(() => ({
  stubPage: (label) => ({ default: () => <h1>{label}</h1> }),
}));
vi.mock("./pages/Home", () => stubPage("Home page"));
vi.mock("./pages/About", () => stubPage("About page"));
vi.mock("./pages/Contact", () => stubPage("Contact page"));
vi.mock("./pages/Services", () => stubPage("Services page"));
vi.mock("./pages/Work", () => stubPage("Works page"));
vi.mock("./pages/Shop", () => stubPage("Shop page"));
vi.mock("./pages/ArtWorkDetails", () => stubPage("Artwork details page"));
vi.mock("./pages/DesignWork", () => stubPage("Design works page"));
vi.mock("./pages/DesignWorkDetails", () => stubPage("Design work details page"));
vi.mock("./pages/Interiors", () => stubPage("Interiors page"));
vi.mock("./pages/Murals", () => stubPage("Murals page"));
vi.mock("./pages/NotFound", () => stubPage("Not found page"));
vi.mock("./components/embla/ArtWorks", () => stubPage("Artworks gallery"));
vi.mock("./components/customCursor", () => ({ default: () => null }));
vi.mock("@vercel/analytics/react", () => ({ Analytics: () => null }));

function renderApp(route) {
  return render(
    <Provider store={makeStore()}>
      <MemoryRouter initialEntries={[route]}>
        <App />
      </MemoryRouter>
    </Provider>
  );
}

async function skipIntroLoader() {
  await act(async () => {
    vi.advanceTimersByTime(2500);
  });
  vi.useRealTimers();
}

describe("App", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("shows the intro loader for 2.5 seconds", async () => {
    renderApp("/");

    expect(screen.getByAltText("Aliya Nizar Studio Logo")).toBeInTheDocument();
    expect(screen.queryByText("Home page")).not.toBeInTheDocument();

    await skipIntroLoader();

    expect(await screen.findByText("Home page")).toBeInTheDocument();
    expect(screen.queryByAltText("Aliya Nizar Studio Logo")).not.toBeInTheDocument();
  });

  it.each([
    ["/", "Home page"],
    ["/about", "About page"],
    ["/contact", "Contact page"],
    ["/services", "Services page"],
    ["/works", "Works page"],
    ["/works/artWorks", "Artworks gallery"],
    ["/works/artWorks/orange-tree", "Artwork details page"],
    ["/works/designWorks", "Design works page"],
    ["/works/designWorks/interiors", "Interiors page"],
    ["/works/designWorks/interiors/kitchen", "Design work details page"],
    ["/shop", "Shop page"],
    ["/murals", "Murals page"],
    ["/this-page-does-not-exist", "Not found page"],
  ])("renders %s", async (route, expected) => {
    renderApp(route);
    await skipIntroLoader();

    expect(await screen.findByRole("heading", { name: expected })).toBeInTheDocument();
  });

  it("renders the navbar and footer around every page", async () => {
    renderApp("/shop");
    await skipIntroLoader();

    await screen.findByText("Shop page");
    expect(screen.getAllByRole("navigation").length).toBeGreaterThan(0);
    expect(screen.getByText(/All Rights Reserved/)).toBeInTheDocument();
  });
});
