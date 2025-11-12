import type { StoryblokClient } from "@storyblok/react/rsc"
import type {
  StoryblokDataResult,
  StoryblokStoryResponse,
  StoryConfig,
} from "../../core/types"

export async function handleStory(
  storyblokApi: StoryblokClient,
  config: StoryConfig
): Promise<StoryblokDataResult<StoryblokStoryResponse>> {
  const { fullPath, version = "published" } = config

  const response = await storyblokApi.get(`cdn/stories/${fullPath}`, {
    version,
  })

  return { data: response.data.story }
}
