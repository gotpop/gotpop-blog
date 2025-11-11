import "server-only"

import { getStoryPath } from "@/lib/storyblok/config"

/**
 * Converts a Storyblok full_slug to a clean URL path
 * Re-exports the multi-tenant aware utility from config
 * This overrides the @gotpop/system version for this project
 */
export { getStoryPath }
