import { describe, it, expect, vi, afterEach } from "vitest";
import { normalizeProduct, fetchProducts, shopCategories } from "./productsApi";

const STRAPI = "https://aliya-cms.onrender.com";

describe("normalizeProduct", () => {
  it("flattens a Strapi v4 entry ({ id, attributes })", () => {
    const entry = {
      id: 7,
      attributes: {
        name: "Orange Tree",
        categories: "Mixed Media",
        sold: true,
        forShow: false,
        img: { data: { attributes: { url: "/uploads/orange.webp" } } },
        thumbnail: { data: { attributes: { url: "/uploads/orange-thumb.webp" } } },
        desc: "Plain text description",
      },
    };

    const product = normalizeProduct(entry);

    expect(product).toMatchObject({
      id: 7,
      name: "Orange Tree",
      categories: "Mixed Media",
      img: `${STRAPI}/uploads/orange.webp`,
      thumbnail: `${STRAPI}/uploads/orange-thumb.webp`,
      desc: "Plain text description",
      sold: true,
      forShow: false,
    });
  });

  it("handles a flat Strapi v5 entry", () => {
    const product = normalizeProduct({
      id: 3,
      name: "Bismillah",
      img: { url: "/uploads/b.webp" },
    });

    expect(product.id).toBe(3);
    expect(product.img).toBe(`${STRAPI}/uploads/b.webp`);
  });

  it("keeps absolute media URLs (e.g. Cloudinary) untouched", () => {
    const product = normalizeProduct({
      id: 1,
      name: "x",
      img: { url: "https://res.cloudinary.com/demo/image.webp" },
    });

    expect(product.img).toBe("https://res.cloudinary.com/demo/image.webp");
  });

  it("falls back to the main image when there is no thumbnail", () => {
    const product = normalizeProduct({
      id: 1,
      name: "x",
      img: { url: "/uploads/main.webp" },
    });

    expect(product.thumbnail).toBe(`${STRAPI}/uploads/main.webp`);
  });

  it("converts rich-text blocks into paragraphs separated by blank lines", () => {
    const product = normalizeProduct({
      id: 1,
      name: "x",
      desc: [
        { type: "paragraph", children: [{ text: "First " }, { text: "line." }] },
        { type: "paragraph", children: [{ text: "" }] },
        { type: "paragraph", children: [{ text: "Second line." }] },
      ],
    });

    expect(product.desc).toBe("First line.\n\nSecond line.");
  });

  it("fills safe defaults for missing fields", () => {
    const product = normalizeProduct({ id: 9 });

    expect(product).toMatchObject({
      id: 9,
      name: "",
      categories: "",
      img: "",
      thumbnail: "",
      desc: "",
      sold: false,
      forShow: false,
    });
  });
});

describe("fetchProducts", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("requests all products from Strapi and normalizes them", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        data: [
          { id: 1, attributes: { name: "A", img: { data: { attributes: { url: "/a.webp" } } } } },
          { id: 2, attributes: { name: "B" } },
        ],
      }),
    });
    vi.stubGlobal("fetch", fetchMock);

    const products = await fetchProducts();

    expect(fetchMock).toHaveBeenCalledWith(
      `${STRAPI}/api/products?populate=*&pagination[pageSize]=100`
    );
    expect(products).toHaveLength(2);
    expect(products[0]).toMatchObject({ id: 1, name: "A", img: `${STRAPI}/a.webp` });
  });

  it("returns an empty list when Strapi returns no data", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true, json: async () => ({}) }));

    await expect(fetchProducts()).resolves.toEqual([]);
  });

  it("throws a helpful error when the request fails", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false, status: 503 }));

    await expect(fetchProducts()).rejects.toThrow(
      "Unable to load products from Strapi (503)."
    );
  });
});

describe("shopCategories", () => {
  it("starts with 'All' and has no duplicates", () => {
    expect(shopCategories[0]).toBe("All");
    expect(new Set(shopCategories).size).toBe(shopCategories.length);
  });
});
