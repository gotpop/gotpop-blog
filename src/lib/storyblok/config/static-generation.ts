import "server-only"

import type { ConfigStoryblok } from "@gotpop/system"
import { getPrefix } from "./prefix-utils"

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
  if (EXCLUDED_STORIES.has(fullSlug)) {
    return false
  }

  for (const excluded of EXCLUDED_STORIES) {
    if (fullSlug.includes(`/${excluded}`)) {
      return false
    }
  }

  const prefix = getPrefix(config)

  return fullSlug.startsWith(`${prefix}/`)
}

/** Gets the starts_with parameter for Storyblok API calls */
export function getStartsWithPrefix(config: ConfigStoryblok): string {
  const prefix = getPrefix(config)
  return `${prefix}/`
}
