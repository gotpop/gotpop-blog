/**
 * Normalizes a slug path to work with Storyblok's blog folder structure
 * Handles cases from both direct navigation and Storyblok Visual Editor
 */
export function normalizeStoryblokPath(slug?: string[]): string {
  if (!slug || slug.length === 0) {
    return "blog/"
  }

  const joinedSlug = slug.join("/")

  if (joinedSlug === "blog") {
    return "blog/"
  } else if (joinedSlug.startsWith("blog/")) {
    return joinedSlug
  } else {
    return `blog/${joinedSlug}`
  }
}

/**
 * Checks if a story should be included in static generation
 */
export function shouldIncludeStory(fullSlug: string): boolean {
  return (
    !fullSlug.includes("/config") &&
    !fullSlug.includes("/global") &&
    fullSlug !== "blog/"
  )
}

/**
 * Converts a Storyblok full_slug to a clean URL path
 * Removes the 'blog/' prefix and ensures it starts with '/'
 */
export function getStoryPath(fullSlug: string): string {
  const path = fullSlug.startsWith("blog/")
    ? fullSlug.replace("blog/", "")
    : fullSlug

  return path === "" || path === "/" ? "/" : `/${path}`
}
