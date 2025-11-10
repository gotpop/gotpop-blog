/**
 * Checks if a story should be included in static generation
 */
export function shouldIncludeStory(fullSlug: string): boolean {
  // Exclude config/global stories
  if (
    fullSlug.includes("/config") ||
    fullSlug.includes("/global") ||
    fullSlug.includes("/header") ||
    fullSlug.includes("/footer")
  ) {
    return false
  }

  // Include the home page (blog/)
  if (fullSlug === "blog/") {
    return true
  }

  // Include content index pages (like blog/posts/)
  if (fullSlug.endsWith("/") && fullSlug !== "blog/") {
    return true
  }

  // Include all other content stories
  return true
}
