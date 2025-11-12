import "server-only"

import type { ConfigStoryblok } from "@/types/storyblok-components"

/**
 * Get the content prefix from config
 */
function getPrefix(config: ConfigStoryblok): string {
  return config?.root_name_space || "blog"
}

/**
 * Get the full Storyblok path with content prefix
 * Ensures proper path format for Storyblok API calls
 *
 * @param path - The path to convert
 * @param config - Config with root_name_space
 * @example
 * getContentPath("post-title", config) → "blog/post-title"
 * getContentPath("", config) → "blog/"
 */
export function getContentPath(path: string, config: ConfigStoryblok): string {
  const prefix = getPrefix(config)
  // Remove leading slash
  let cleanPath = path.startsWith("/") ? path.slice(1) : path

  // Remove content prefix if already present
  if (cleanPath.startsWith(`${prefix}/`)) {
    cleanPath = cleanPath.slice(prefix.length + 1)
  }

  // Handle home/root path
  if (!cleanPath || cleanPath === "home") {
    return `${prefix}/`
  }

  return `${prefix}/${cleanPath}`
}

/**
 * Convert Storyblok full_slug to clean URL path
 * Removes content prefix (blog/ or work/) from Storyblok paths
 *
 * @param fullSlug - The full_slug from Storyblok
 * @param config - Config with root_name_space
 * @example
 * getStoryPath("blog/post-title", config) → "/post-title"
 * getStoryPath("blog/home", config) → "/"
 * getStoryPath("blog/", config) → "/"
 */
export function getStoryPath(
  fullSlug: string,
  config: ConfigStoryblok
): string {
  if (!fullSlug) return "/"

  const prefix = getPrefix(config)
  // Remove content prefix (e.g., "blog/" or "work/")
  let withoutPrefix = fullSlug
  if (fullSlug.startsWith(`${prefix}/`)) {
    withoutPrefix = fullSlug.slice(prefix.length + 1)
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
 * @param slug - The slug array from Next.js params
 * @param config - Config with root_name_space
 * @example
 * normalizeStoryblokPath([], config) → "blog/"
 * normalizeStoryblokPath(["post-title"], config) → "blog/post-title"
 * normalizeStoryblokPath(["category", "post"], config) → "blog/category/post"
 */
export function normalizeStoryblokPath(
  slug: string[] | undefined,
  config: ConfigStoryblok
): string {
  const prefix = getPrefix(config)
  if (!slug || slug.length === 0) {
    return `${prefix}/`
  }
  return `${prefix}/${slug.join("/")}`
}
