import "server-only"

import { CONTENT_PREFIX } from "./content-prefix"

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
 * @example
 * getContentTypePath("posts") → "posts" (when CONTENT_PREFIX=blog)
 * getContentTypePath("posts") → "work" (when CONTENT_PREFIX=portfolio)
 */
export function getContentTypePath(contentType: string): string {
  const config = CONTENT_TYPE_PATHS[CONTENT_PREFIX]

  if (!config) {
    console.warn(
      `No content type config found for prefix: ${CONTENT_PREFIX}, falling back to: ${contentType}`
    )
    return contentType
  }

  return config[contentType] || contentType
}

/**
 * Get the full Storyblok path for a content type
 *
 * @example
 * getContentTypeFullPath("posts") → "blog/posts/" (when CONTENT_PREFIX=blog)
 * getContentTypeFullPath("posts") → "portfolio/work/" (when CONTENT_PREFIX=portfolio)
 */
export function getContentTypeFullPath(contentType: string): string {
  const typePath = getContentTypePath(contentType)
  return `${CONTENT_PREFIX}/${typePath}/`
}

/**
 * Check if a story belongs to a specific content type
 *
 * @example
 * isContentType("blog/posts/post-1", "posts") → true
 * isContentType("portfolio/work/post-1", "posts") → true
 * isContentType("portfolio/home", "posts") → false
 */
export function isContentType(fullSlug: string, contentType: string): boolean {
  const expectedPath = getContentTypeFullPath(contentType)
  return fullSlug.startsWith(expectedPath)
}
