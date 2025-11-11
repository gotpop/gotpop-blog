/**
 * Multi-tenant Storyblok configuration
 * Centralizes all path, prefix, and filtering logic
 */

export { CONTENT_PREFIX, validateContentPrefix } from "./content-prefix"
export {
  getContentPath,
  getStoryPath,
  normalizeStoryblokPath,
} from "./path-utils"
export {
  getStartsWithPrefix,
  shouldIncludeStory,
} from "./static-generation"
