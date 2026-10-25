const STRAPI_URL = (import.meta.env.VITE_STRAPI_URL || "https://aliya-cms.onrender.com").replace(/\/$/, "");

function getMediaUrl(media) {
  const item = media?.data ?? media;
  const attributes = item?.attributes ?? item;
  const url = attributes?.url;
  if (!url) return "";
  return url.startsWith("http") ? url : `${STRAPI_URL}${url}`;
}

function blocksToText(blocks) {
  if (typeof blocks === "string") return blocks;
  if (!Array.isArray(blocks)) return "";
  return blocks.map((block) => (block.children || []).map((child) => child.text || "").join("")).filter(Boolean).join("\n\n");
}

export function normalizeProduct(entry) {
  const item = entry?.attributes ? { id: entry.id, ...entry.attributes } : entry;
  const image = getMediaUrl(item.img);
  return {
    ...item,
    id: item.id,
    img: image,
    thumbnail: getMediaUrl(item.thumbnail) || image,
    desc: blocksToText(item.desc),
    name: item.name || "",
    categories: item.categories || "",
    sold: Boolean(item.sold),
    forShow: Boolean(item.forShow),
  };
}

export async function fetchProducts() {
  const response = await fetch(`${STRAPI_URL}/api/products?populate=*&pagination[pageSize]=100`);
  if (!response.ok) throw new Error(`Unable to load products from Strapi (${response.status}).`);
  const payload = await response.json();
  return (payload.data || []).map(normalizeProduct);
}

export const shopCategories = ["All", "Calligraphy", "Wooden Panels", "Digital Art", "Paintings", "Mixed Media", "Acrylics", "Illustration"];
