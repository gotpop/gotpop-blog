/**
 * Normalizes a slug path to work with Storyblok's blog folder structure
 * Handles cases from both direct navigation and Storyblok Visual Editor
 */
export function normalizeStoryblokPath(slug?: string[]): string {
  if (!slug || slug.length === 0) {
    return "blog/" // Match your actual home story path
  }

  const joinedSlug = slug.join("/")

  // Handle special cases
  if (joinedSlug === "blog") {
    return "blog/" // Match your actual home story path
  }

  // If it already starts with blog/, use as-is
  if (joinedSlug.startsWith("blog/")) {
    return joinedSlug
  }

  // For all other paths, prepend blog/
  return `blog/${joinedSlug}`
}

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

/**
 * Converts a Storyblok full_slug to a clean URL path
 * Removes the 'blog/' prefix and ensures it starts with '/'
 */
export function getStoryPath(fullSlug: string): string {
  if (!fullSlug) return "/"

  // Remove 'blog/' prefix
  const path = fullSlug.replace(/^blog\//, "")

  // Handle special cases
  if (path === "home" || path === "" || path === "/") {
    return "/"
  }

  // Handle index pages (ending with /) - remove trailing slash
  if (path.endsWith("/") && path !== "/") {
    const cleanPath = path.slice(0, -1) // Remove trailing slash
    return `/${cleanPath}`
  }

  // Ensure leading slash for all other paths
  return path.startsWith("/") ? path : `/${path}`
}
