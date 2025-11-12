import { redirect } from "next/navigation"

/** Checks if the incoming URL contains raw Storyblok paths (starting with "blog/") and redirects to the clean URL */
export function handleStoryblokPathRedirect(slug?: string[]): void {
  if (slug && slug.length > 0 && slug[0] === "blog") {
    const cleanPath = slug.slice(1).join("/")
    const redirectPath = cleanPath ? `/${cleanPath}` : "/"

    redirect(redirectPath)
  }
}
