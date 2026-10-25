import { describe, it, expect } from "vitest";
import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route, useLocation } from "react-router-dom";
import { render } from "@testing-library/react";
import Navbar from "./Navbar";
import DektopNavbar from "./DektopNavbar";
import GoBack from "./GoBack";
import ScrollToTop from "./ScrollToTop";
import ToTop from "./ToTop";
import Footer from "./Footer";

function LocationDisplay() {
  const location = useLocation();
  return <div data-testid="location">{location.pathname}</div>;
}

describe("DektopNavbar", () => {
  it("links every page to the right path", () => {
    render(
      <MemoryRouter>
        <DektopNavbar />
      </MemoryRouter>
    );

    const expected = {
      Home: "/",
      About: "/about",
      Works: "/works",
      Shop: "/shop",
      Services: "/services",
      Contact: "/contact",
    };
    for (const [name, path] of Object.entries(expected)) {
      expect(screen.getByRole("link", { name })).toHaveAttribute("href", path);
    }
  });

  it("links the logo back to the home page", () => {
    render(
      <MemoryRouter>
        <DektopNavbar />
      </MemoryRouter>
    );

    expect(screen.getByAltText("logo").closest("a")).toHaveAttribute("href", "/");
  });
});

describe("Navbar (mobile menu)", () => {
  function renderNavbar() {
    return render(
      <MemoryRouter initialEntries={["/"]}>
        <Navbar />
        <LocationDisplay />
      </MemoryRouter>
    );
  }

  it("opens the menu and locks page scrolling", async () => {
    renderNavbar();
    const mobileMenu = screen.getAllByRole("navigation")[1];
    expect(mobileMenu).toHaveClass("max-h-0");

    await userEvent.click(screen.getByAltText("menu"));

    expect(mobileMenu).toHaveClass("max-h-[500px]");
    expect(document.body.style.overflow).toBe("hidden");
  });

  it("navigates and closes the menu when a link is clicked", async () => {
    renderNavbar();
    const mobileMenu = screen.getAllByRole("navigation")[1];
    await userEvent.click(screen.getByAltText("menu"));

    await userEvent.click(within(mobileMenu).getByRole("link", { name: "Shop" }));

    expect(screen.getByTestId("location")).toHaveTextContent("/shop");
    expect(mobileMenu).toHaveClass("max-h-0");
    expect(document.body.style.overflow).toBe("auto");
  });
});

describe("GoBack", () => {
  it("returns to the previous page", async () => {
    render(
      <MemoryRouter initialEntries={["/works", "/shop"]} initialIndex={1}>
        <GoBack />
        <LocationDisplay />
      </MemoryRouter>
    );
    expect(screen.getByTestId("location")).toHaveTextContent("/shop");

    await userEvent.click(screen.getByRole("button", { name: /go back/i }));

    expect(screen.getByTestId("location")).toHaveTextContent("/works");
  });
});

describe("ScrollToTop", () => {
  it("scrolls to the top whenever the route changes", async () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<a href="/about">home</a>} />
        </Routes>
      </MemoryRouter>
    );

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  });
});

describe("ToTop", () => {
  it("smooth-scrolls to the top when clicked", async () => {
    render(<ToTop />);

    await userEvent.click(screen.getByRole("button", { name: /back to top/i }));

    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: "smooth" });
  });
});

describe("Footer", () => {
  it("links to the studio's social profiles", () => {
    render(<Footer />);

    expect(screen.getByAltText("instagram").closest("a")).toHaveAttribute(
      "href",
      "https://www.instagram.com/aliyanizarstudio_art"
    );
    expect(screen.getByAltText("linkedin").closest("a").getAttribute("href")).toContain(
      "linkedin.com/in/aliyanizar"
    );
    expect(screen.getByAltText("behance").closest("a")).toHaveAttribute(
      "href",
      "https://www.behance.net/AliyaNizar_Designs"
    );
  });

  it("shows the copyright notice", () => {
    render(<Footer />);

    expect(screen.getByText(/aliyanizarstudio\. All Rights Reserved/)).toBeInTheDocument();
  });
});
