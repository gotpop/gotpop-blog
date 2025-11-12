/** Re-export path utilities from config folder */
export {
  getContentPath,
  getStoryPath,
  normalizeStoryblokPath,
} from "../config"

/** Determines the type of page based on the slug array */
export function determinePageType(
  slug?: string[]
): "home" | "posts-index" | "tag-page" | "individual-post" | "other" {
  if (!slug || slug.length === 0) {
    return "home"
  }

  if (slug.length === 1 && slug[0] === "posts") {
    return "posts-index"
  }

  if (slug.length === 2 && slug[0] === "posts") {
    // This could be either a tag page or individual post
    // We'll need to check if the second segment is a valid tag
    return "tag-page" // Will be validated later
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
