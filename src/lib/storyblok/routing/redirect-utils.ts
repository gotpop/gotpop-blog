import "server-only"

import type { ConfigStoryblok } from "@gotpop/system"
import { redirect } from "next/navigation"

/** Checks if the incoming URL contains raw Storyblok paths and redirects to the clean URL */
export function handleStoryblokPathRedirect(
  slug?: string[],
  config?: ConfigStoryblok | null
): void {
  if (slug && slug.length > 0 && slug[0] === config?.root_name_space) {
    const cleanPath = slug.slice(1).join("/")
    const redirectPath = cleanPath ? `/${cleanPath}` : "/"

    redirect(redirectPath)
  }
}
