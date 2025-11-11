import "server-only"

import { CONTENT_PREFIX } from "./content-prefix"

/**
 * Get the full Storyblok path with content prefix
 * Ensures proper path format for Storyblok API calls
 *
 * @example
 * getContentPath("post-title") → "blog/post-title"
 * getContentPath("") → "blog/"
 */
export function getContentPath(path: string): string {
  // Remove leading slash
  let cleanPath = path.startsWith("/") ? path.slice(1) : path

  // Remove content prefix if already present
  if (cleanPath.startsWith(`${CONTENT_PREFIX}/`)) {
    cleanPath = cleanPath.slice(CONTENT_PREFIX.length + 1)
  }

  // Handle home/root path
  if (!cleanPath || cleanPath === "home") {
    return `${CONTENT_PREFIX}/`
  }

  return `${CONTENT_PREFIX}/${cleanPath}`
}

/**
 * Convert Storyblok full_slug to clean URL path
 * Removes content prefix (blog/ or work/) from Storyblok paths
 *
 * @example
 * getStoryPath("blog/post-title") → "/post-title"
 * getStoryPath("blog/home") → "/"
 * getStoryPath("blog/") → "/"
 */
export function getStoryPath(fullSlug: string): string {
  if (!fullSlug) return "/"

  // Remove content prefix (e.g., "blog/" or "work/")
  let withoutPrefix = fullSlug
  if (fullSlug.startsWith(`${CONTENT_PREFIX}/`)) {
    withoutPrefix = fullSlug.slice(CONTENT_PREFIX.length + 1)
  }

  // Handle home page
  if (withoutPrefix === "home" || withoutPrefix === "") {
    return "/"
  }

  // Ensure leading slash
  return withoutPrefix.startsWith("/") ? withoutPrefix : `/${withoutPrefix}`
}

/**
 * Normalizes incoming slug array to Storyblok path
 * Converts Next.js route params to Storyblok API format
 *
 * @example
 * normalizeStoryblokPath([]) → "blog/"
 * normalizeStoryblokPath(["post-title"]) → "blog/post-title"
 * normalizeStoryblokPath(["category", "post"]) → "blog/category/post"
 */
export function normalizeStoryblokPath(slug?: string[]): string {
  if (!slug || slug.length === 0) {
    return `${CONTENT_PREFIX}/`
  }
  return `${CONTENT_PREFIX}/${slug.join("/")}`
}
