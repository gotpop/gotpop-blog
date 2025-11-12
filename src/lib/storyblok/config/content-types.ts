import "server-only"

import type { ConfigStoryblok } from "@/types/storyblok-components"

/**
 * Get the content prefix from config
 */
function getPrefix(config: ConfigStoryblok): string {
  return config.root_name_space || "blog"
}

/**
 * Content type paths configuration per tenant
 * Maps logical content types to their actual paths in Storyblok
 *
 * @example
 * blog → posts directory
 * portfolio → work directory
 */
const CONTENT_TYPE_PATHS: Record<string, Record<string, string>> = {
  blog: {
    posts: "posts",
    home: "home",
  },
  portfolio: {
    posts: "work", // Portfolio uses "work" instead of "posts"
    home: "home",
  },
}

/**
 * Get the path for a specific content type
 *
 * @param contentType - The type of content (e.g., "posts", "home")
 * @param config - Config with root_name_space
 * @example
 * getContentTypePath("posts", config) → "posts" (when root_name_space=blog)
 * getContentTypePath("posts", config) → "work" (when root_name_space=portfolio)
 */
export function getContentTypePath(
  contentType: string,
  config: ConfigStoryblok
): string {
  const prefix = getPrefix(config)
  const typeConfig = CONTENT_TYPE_PATHS[prefix]

  if (!typeConfig) {
    console.warn(
      `No content type config found for prefix: ${prefix}, falling back to: ${contentType}`
    )
    return contentType
  }

  return typeConfig[contentType] || contentType
}

/**
 * Get the full Storyblok path for a content type
 *
 * @param contentType - The type of content (e.g., "posts", "home")
 * @param config - Config with root_name_space
 * @example
 * getContentTypeFullPath("posts", config) → "blog/posts/" (when root_name_space=blog)
 * getContentTypeFullPath("posts", config) → "portfolio/work/" (when root_name_space=portfolio)
 */
export function getContentTypeFullPath(
  contentType: string,
  config: ConfigStoryblok
): string {
  const prefix = getPrefix(config)
  const typePath = getContentTypePath(contentType, config)
  return `${prefix}/${typePath}/`
}

/**
 * Check if a story belongs to a specific content type
 *
 * @param fullSlug - Full Storyblok slug (e.g., "blog/posts/post-1")
 * @param contentType - The type of content (e.g., "posts")
 * @param config - Config with root_name_space
 * @example
 * isContentType("blog/posts/post-1", "posts", config) → true
 * isContentType("portfolio/work/post-1", "posts", config) → true
 * isContentType("portfolio/home", "posts", config) → false
 */
export function isContentType(
  fullSlug: string,
  contentType: string,
  config: ConfigStoryblok
): boolean {
  const expectedPath = getContentTypeFullPath(contentType, config)
  return fullSlug.startsWith(expectedPath)
}
