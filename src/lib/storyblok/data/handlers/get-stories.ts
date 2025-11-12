import "server-only"

import type { StoryblokClient } from "@storyblok/react/rsc"
import type {
  StoriesConfig,
  StoryblokDataResult,
  StoryblokStoryResponse,
} from "../../types"

/** Fetches multiple stories with optional filtering */
export async function handleStories(
  storyblokApi: StoryblokClient,
  config: StoriesConfig
): Promise<StoryblokDataResult<StoryblokStoryResponse[]>> {
  const {
    version = "draft",
    starts_with,
    excluding_fields,
    filter_query,
    by_uuids,
  } = config

  const params: Record<string, string | object> = { version }

  if (starts_with) params.starts_with = starts_with
  if (excluding_fields) params.excluding_fields = excluding_fields
  if (filter_query) params.filter_query = filter_query
  if (by_uuids) params.by_uuids = by_uuids

  const response = await storyblokApi.get("cdn/stories", params)

  return { data: response.data.stories }
}
