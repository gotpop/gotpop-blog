import "server-only"

import type { StoryblokClient } from "@storyblok/react/rsc"
import type {
  StoryblokDataResult,
  StoryblokStoryResponse,
  StoryConfig,
} from "../../types"

/** Fetches a single story by its full path */
export async function handleStory(
  storyblokApi: StoryblokClient,
  config: StoryConfig
): Promise<StoryblokDataResult<StoryblokStoryResponse>> {
  const { fullPath, version = "published" } = config

  try {
    const response = await storyblokApi.get(`cdn/stories/${fullPath}`, {
      version,
    })

    return { data: response.data.story }
  } catch (error: unknown) {
    const errorMessage =
      error && typeof error === "object" && "status" in error
        ? `Story not found (${error.status})`
        : "Failed to fetch story"

    return {
      data: null as unknown as StoryblokStoryResponse,
      error: errorMessage,
    }
  }
}
