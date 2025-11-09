import type { TagDatasourceEntry } from "@gotpop/system"

/**
 * Hardcoded tags that are not included in the API call but should be available for filtering
 */
const HARDCODED_TAGS: TagDatasourceEntry[] = [
  // Add hardcoded tags here as needed
  // {
  //   id: 999001,
  //   name: "example-tag",
  //   value: "example-tag",
  // },
]

/**
 * Get the list of hardcoded tags
 */
export function getHardcodedTags(): TagDatasourceEntry[] {
  return HARDCODED_TAGS
}

/**
 * Converts tag name to URL-safe slug
 * e.g., "JavaScript" -> "javascript", "CSS & HTML" -> "css-html"
 */
export function normalizeTagSlug(tagName: string): string {
  return tagName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}
