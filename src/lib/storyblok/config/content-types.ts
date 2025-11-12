import "server-only"

import type { ConfigStoryblok } from "@gotpop/system"

/** Get the content prefix from config */
function getPrefix(config: ConfigStoryblok): string {
  return config.root_name_space || "blog"
}

/** Content type paths configuration per tenant */
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

/** Get the path for a specific content type */
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

/** Get the full Storyblok path for a content type */
export function getContentTypeFullPath(
  contentType: string,
  config: ConfigStoryblok
): string {
  const prefix = getPrefix(config)
  const typePath = getContentTypePath(contentType, config)
  return `${prefix}/${typePath}/`
}

/** Check if a story belongs to a specific content type */
export function isContentType(
  fullSlug: string,
  contentType: string,
  config: ConfigStoryblok
): boolean {
  const expectedPath = getContentTypeFullPath(contentType, config)
  return fullSlug.startsWith(expectedPath)
}
