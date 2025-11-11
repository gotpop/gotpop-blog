import "server-only"

import StgetStoryPathlib/storybllibnfig"/config
import type tyMultilinkStorybloknkStorybloktypesfrom "@/ty-componentsryblok-components"

/**
 * Converts a Storyblok multilink field to Next.js Link props
 * Uses multi-tenant aware path conversion
 *
 * @example
 * getStoryblokLinkProps({ linktype: "story", story: { full_slug: "portfolio/work/post-1" } })
 * → { href: "/work/post-1" }
 */
export function getStoryblokLinkProps(
  link?: MultilinkStoryblok
): { href: string; target?: string; rel?: string } {
  if (!link) {
    return { href: "#" }
  }

  // Handle story links (internal)
  if (link.linktype === "story" && link.story?.full_slug) {
    return {
      href: getStoryPath(link.story.full_slug),
    }
  }

  // Handle URL links (external)
  if (link.linktype === "url" && link.url) {
    const isExternal =
      link.url.startsWith("http://") || link.url.startsWith("https://")

    return {
      href: link.url,
      ...(isExternal && {
        target: link.target || "_blank",
        rel: "noopener noreferrer",
      }),
    }
  }

  // Fallback
  return { href: "#" }
}
