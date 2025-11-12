import { redirect } from "next/navigation"

/** Checks if the incoming URL contains raw Storyblok paths (starting with "blog/") and redirects to the clean URL */
export function handleStoryblokPathRedirect(slug?: string[]): void {
  /** Check if user is trying to access raw Storyblok paths with "blog/" prefix */
  if (slug && slug.length > 0 && slug[0] === "blog") {
    /** Redirect to clean URL without "blog/" prefix */
    const cleanPath = slug.slice(1).join("/")
    const redirectPath = cleanPath ? `/${cleanPath}` : "/"
    redirect(redirectPath)
  }
}
