import "@testing-library/jest-dom/vitest";
import { afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";

// jsdom does not implement these browser APIs
window.scrollTo = vi.fn();
window.open = vi.fn();
// GSAP's ScrollTrigger calls matchMedia when it is registered
window.matchMedia ??= (query) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: () => {},
  removeListener: () => {},
  addEventListener: () => {},
  removeEventListener: () => {},
  dispatchEvent: () => false,
});
// Carousels (embla, keen-slider) and react-scroll-parallax observe layout
class NoopObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
}
window.IntersectionObserver ??= NoopObserver;
window.ResizeObserver ??= NoopObserver;

afterEach(() => {
  cleanup();
  localStorage.clear();
  vi.clearAllMocks();
});
