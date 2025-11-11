import "server-only"

import { CONTENT_PREFIX } from "./content-prefix"

/**
 * Global stories that should be excluded from static generation
 * These are shared across all tenants (not blog/ or work/ specific)
 */
const EXCLUDED_STORIES = new Set([
  "header",
  "footer",
  "site-config",
  "config",
  "global",
])

/**
 * Determines if a story should be included in static generation
 * Excludes global content and only includes stories under current content prefix
 *
 * @param fullSlug - Full Storyblok slug (e.g., "blog/post-title" or "work/project")
 * @returns true if story should be statically generated
 */
export function shouldIncludeStory(fullSlug: string): boolean {
  // Exclude exact matches of global stories
  if (EXCLUDED_STORIES.has(fullSlug)) {
    return false
  }

  // Exclude paths containing global story names (e.g., "blog/config/something")
  for (const excluded of EXCLUDED_STORIES) {
    if (fullSlug.includes(`/${excluded}`)) {
      return false
    }
  }

  // Only include stories under current content prefix
  return fullSlug.startsWith(`${CONTENT_PREFIX}/`)
}

/**
 * Gets the starts_with parameter for Storyblok API calls
 * Used to filter stories by content prefix
 *
 * @returns Storyblok API filter string (e.g., "blog/" or "work/")
 */
export function getStartsWithPrefix(): string {
  return `${CONTENT_PREFIX}/`
}
