import "server-only"

import type { ConfigStoryblok } from "@gotpop/system"
import { getPrefix } from "./prefix-utils"

/** Get the full Storyblok path with content prefix */
export function getContentPath(path: string, config: ConfigStoryblok): string {
  const prefix = getPrefix(config)
  /** Remove leading slash */
  let cleanPath = path.startsWith("/") ? path.slice(1) : path

  /** Remove content prefix if already present */
  if (cleanPath.startsWith(`${prefix}/`)) {
    cleanPath = cleanPath.slice(prefix.length + 1)
  }

  /** Handle home/root path */
  if (!cleanPath || cleanPath === "home") {
    return `${prefix}/`
  }

  return `${prefix}/${cleanPath}`
}

/** Convert Storyblok full_slug to clean URL path */
export function getStoryPath(
  fullSlug: string,
  config: ConfigStoryblok
): string {
  if (!fullSlug) return "/"

  const prefix = getPrefix(config)
  /** Remove content prefix (e.g., "blog/" or "work/") */
  let withoutPrefix = fullSlug
  if (fullSlug.startsWith(`${prefix}/`)) {
    withoutPrefix = fullSlug.slice(prefix.length + 1)
  }

  /** Handle home page */
  if (withoutPrefix === "home" || withoutPrefix === "") {
    return "/"
  }

  /** Ensure leading slash */
  return withoutPrefix.startsWith("/") ? withoutPrefix : `/${withoutPrefix}`
}

/** Normalizes incoming slug array to Storyblok path */
export function normalizeStoryblokPath(
  slug: string[] | undefined,
  config: ConfigStoryblok
): string {
  const prefix = getPrefix(config)
  if (!slug || slug.length === 0) {
    return `${prefix}/`
  }
  return `${prefix}/${slug.join("/")}`
}
