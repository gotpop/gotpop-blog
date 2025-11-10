import type { StoryblokClient } from "@storyblok/react/rsc"
import type { StoryblokDataResult, StoryConfig } from "@/lib/storyblok"

export async function handleStory(
  storyblokApi: StoryblokClient,
  config: StoryConfig
): Promise<StoryblokDataResult> {
  const { fullPath, version = "draft" } = config
  const response = await storyblokApi.get(`cdn/stories/${fullPath}`, {
    version,
  })
  return { data: response.data.story }
}
