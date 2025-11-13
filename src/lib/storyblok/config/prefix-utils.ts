import "server-only"

import type { ConfigStoryblok } from "@gotpop/system"

/**
 * Get the content prefix from config
 * This is the single source of truth for extracting the prefix
 *
 * @param config - The Storyblok config object
 * @returns The content prefix (e.g., "blog" or "work")
 */
export function getPrefix(config: ConfigStoryblok): string {
  return config?.root_name_space || "blog"
}
