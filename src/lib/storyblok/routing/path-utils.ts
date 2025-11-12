type PageType =
  | "home"
  | "posts-index"
  | "tag-page"
  | "individual-post"
  | "other"

/** Determines the type of page based on the slug array */
export function determinePageType(slug?: string[]): PageType {
  if (!slug || slug.length === 0) {
    return "home"
  }

  if (slug.length === 1 && slug[0] === "posts") {
    return "posts-index"
  }

  if (slug.length === 2 && slug[0] === "posts") {
    return "tag-page"
  }

  return "other"
}

/** Extracts tag slug from URL segments */
export function extractTagSlug(slug?: string[]): string | null {
  if (!slug || slug.length !== 2 || slug[0] !== "posts") {
    return null
  }
  return slug[1]
}
