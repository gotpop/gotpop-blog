import "server-only"

import { getStoryblokApi } from "@/lib/storyblok"
import type { StoryblokStoryResponse } from "@/types/storyblok"

export async function getAvailableStoriesForError(): Promise<string[]> {
  try {
    const storyblokApi = getStoryblokApi()

    const { data } = await storyblokApi.get("cdn/stories", {
      version: "draft",
      starts_with: "blog/",
    })

    return data.stories.map((s: StoryblokStoryResponse) => s.full_slug)
  } catch {
    // Ignore if we can't fetch stories
    return []
  }
}

export function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : "Unknown error"
}
