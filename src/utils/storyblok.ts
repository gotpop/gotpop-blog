import { getStoryPath } from "@/lib/storyblok-utils"
import type { MultilinkStoryblok } from "@/types/storyblok-components"

export interface StoryblokLinkProps {
  href: string
  target: string
  rel?: string
}

/**
 * Process a Storyblok multilink and return props for Next.js Link component
 */
export function getStoryblokLinkProps(
  link: MultilinkStoryblok | undefined | null
): StoryblokLinkProps {
  // Handle null/undefined link
  if (!link) {
    return {
      href: "#",
      target: "_self",
    }
  }

  // Get the URL from either url or cached_url (for story links)
  let href = link.url || link.cached_url || "#"

  // For internal story links, clean up the path by removing blog/ prefix
  if (link.linktype === "story" && href && href !== "#") {
    href = getStoryPath(href)
  } else {
    // Convert "home" to "/" for root page
    if (href === "home") {
      href = "/"
    }

    // Ensure internal links start with /
    if (href && !href.startsWith("/") && !href.startsWith("http")) {
      href = `/${href}`
    }
  }

  // Determine if it's an external link
  const isExternal = link.linktype === "url" || href.startsWith("http")

  // Set target based on link type or explicit target
  const target = link.target || (isExternal ? "_blank" : "_self")

  // Add security attributes for external links
  const rel = isExternal ? "noopener noreferrer" : undefined

  return {
    href,
    target,
    rel,
  }
}
