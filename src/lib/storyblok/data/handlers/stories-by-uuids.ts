import "server-only"

import type { StoryblokClient } from "@storyblok/react/rsc"
import type {
  StoriesByUuidsConfig,
  StoryblokDataResult,
  StoryblokStoryResponse,
} from "../../types"

/** Fetches multiple stories by their UUIDs */
export async function handleStoriesByUuids(
  storyblokApi: StoryblokClient,
  config: StoriesByUuidsConfig
): Promise<StoryblokDataResult<StoryblokStoryResponse[]>> {
  const { uuids, version = "draft" } = config

  if (!uuids || uuids.length === 0) {
    return { data: [], error: "No UUIDs provided" }
  }

  const response = await storyblokApi.get(`cdn/stories`, {
    version,
    by_uuids: uuids.join(","),
  })

  return { data: response.data?.stories || [] }
}
