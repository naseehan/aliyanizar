import { render } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes, useLocation } from "react-router-dom";
import cartReducer from "../store/cartSlice";
import favesReducer from "../store/favesSlice";

// Rendered for any route other than `path`, so tests can assert navigation.
function CurrentPath() {
  return <div data-testid="location">{useLocation().pathname}</div>;
}

export function makeStore(preloadedState) {
  return configureStore({
    reducer: { cart: cartReducer, faves: favesReducer },
    preloadedState,
  });
}

// Render a component inside a fresh Redux store and an in-memory router.
// Pass `path` (e.g. "/works/artWorks/:slug") to get route params.
export function renderWithProviders(
  ui,
  { route = "/", path, preloadedState, store = makeStore(preloadedState) } = {}
) {
  const element = path ? (
    <Routes>
      <Route path={path} element={ui} />
      <Route path="*" element={<CurrentPath />} />
    </Routes>
  ) : (
    ui
  );

  return {
    store,
    ...render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[route]}>{element}</MemoryRouter>
      </Provider>
    ),
  };
}

export const sampleProducts = [
  {
    id: 1,
    name: "orange tree",
    img: "https://cdn.test/orange.webp",
    thumbnail: "https://cdn.test/orange-thumb.webp",
    categories: "Mixed Media",
    dimensions: "Mixed media on canvas, 90cmx60cm",
    desc: "An orange tree growing out of a fountain.",
    sold: false,
    forShow: true,
  },
  {
    id: 2,
    name: "desert rose",
    img: "https://cdn.test/rose.webp",
    thumbnail: "https://cdn.test/rose-thumb.webp",
    categories: "Paintings",
    dimensions: "Acrylic on canvas, 50cmx50cm",
    desc: "A rose in the desert.",
    sold: true,
    forShow: true,
  },
  {
    id: 3,
    name: "bismillah",
    img: "https://cdn.test/bismillah.webp",
    thumbnail: "https://cdn.test/bismillah-thumb.webp",
    categories: "Calligraphy",
    dimensions: "Ink on paper, 30cmx40cm",
    desc: "Arabic calligraphy.",
    sold: false,
    forShow: true,
  },
];
