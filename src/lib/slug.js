// "Orange Tree" -> "orange-tree"
export function toSlug(name) {
  return (name || "").toLowerCase().trim().replace(/\s+/g, "-");
}

// "orange-tree" (or legacy "orange%20tree") -> "orange tree"
export function fromSlug(slug) {
  return decodeURIComponent(slug || "")
    .replace(/-/g, " ")
    .toLowerCase();
}
