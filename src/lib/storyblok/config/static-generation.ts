import "server-only"

import type { ConfigStoryblok } from "@gotpop/system"

/** Get the content prefix from config */
function getPrefix(config: ConfigStoryblok): string {
  return config?.root_name_space || "blog"
}

/** Global stories that should be excluded from static generation */
const EXCLUDED_STORIES = new Set([
  "header",
  "footer",
  "site-config",
  "config",
  "global",
])

/** Determines if a story should be included in static generation */
export function shouldIncludeStory(
  fullSlug: string,
  config: ConfigStoryblok
): boolean {
  /** Exclude exact matches of global stories */
  if (EXCLUDED_STORIES.has(fullSlug)) {
    return false
  }

  /** Exclude paths containing global story names (e.g., "blog/config/something") */
  for (const excluded of EXCLUDED_STORIES) {
    if (fullSlug.includes(`/${excluded}`)) {
      return false
    }
  }

  const prefix = getPrefix(config)
  /** Only include stories under current content prefix */
  return fullSlug.startsWith(`${prefix}/`)
}

/** Gets the starts_with parameter for Storyblok API calls */
export function getStartsWithPrefix(config: ConfigStoryblok): string {
  const prefix = getPrefix(config)
  return `${prefix}/`
}
