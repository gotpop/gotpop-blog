import "server-only"

import { getStoryblokData } from "@/lib/storyblok/storyblok-unified-data"

export async function getAvailableStoriesForError(): Promise<string[]> {
  const { data } = await getStoryblokData("availableStoriesForError")

  return data as string[]
}

export function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : "Unknown error"
}
