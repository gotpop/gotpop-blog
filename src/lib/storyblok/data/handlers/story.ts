import type { StoryblokClient } from "@storyblok/react/rsc"
import type { StoryConfig } from "../../types"

export async function handleStory(
  storyblokApi: StoryblokClient,
  config: StoryConfig
): Promise<{ data: unknown; error?: string }> {
  const { fullPath, version = "draft" } = config
  const response = await storyblokApi.get(`cdn/stories/${fullPath}`, {
    version,
  })
  return { data: response.data.story }
}
