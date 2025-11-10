import type { StoryblokClient } from "@storyblok/react/rsc"
import type { StoryByUuidConfig, StoryblokDataResult } from "../../types"

export async function handleStoryByUuid(
  storyblokApi: StoryblokClient,
  config: StoryByUuidConfig
): Promise<StoryblokDataResult> {
  const { uuid, version = "draft" } = config
  if (!uuid) {
    return { data: null, error: "No UUID provided" }
  }

  const response = await storyblokApi.get(`cdn/stories`, {
    version,
    by_uuids: uuid,
  })

  const story = response.data?.stories?.[0]
  if (!story) {
    return { data: null, error: `No story found for UUID: ${uuid}` }
  }

  return { data: story }
}
