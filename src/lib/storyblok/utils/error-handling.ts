import "server-only"

import { getStoryblokData } from "@/lib/storyblok/data"

/** Fetches list of available story slugs for error page display */
export async function getAvailableStoriesForError(): Promise<string[]> {
  const { data } = await getStoryblokData("availableStoriesForError")

  return data as string[]
}

/** Extracts error message from various error types */
export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message
  }

  if (typeof error === "object" && error !== null) {
    if ("message" in error && typeof error.message === "string") {
      return error.message
    }

    if ("status" in error && "statusText" in error) {
      return `${error.status}: ${error.statusText}`
    }
  }
  return "Unknown error"
}
