import "server-only"

import type { ConfigStoryblok } from "@gotpop/system"
import { getPrefix } from "./prefix-utils"

/** Get the path for a specific content type using runtime config when available */
export function getContentTypePath(
  contentType: string,
  config: ConfigStoryblok
): string {
  if (contentType === "posts") {
    const cfg = config
    return cfg.primary_content_name_space || ""
  }

  if (contentType === "home") {
    return "home"
  }

  return contentType
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
