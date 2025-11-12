import "server-only"

import type {
  StoryblokDataConfig,
  StoryblokDataResult,
  StoryblokDataType,
  StoryblokStoryResponse,
} from "../../types"
import { getConfig } from "../get-storyblok-data"

/** Returns available story slugs for error page */
export async function handleAvailableStoriesForError(
  getStoryblokData: (
    dataType: StoryblokDataType,
    config?: StoryblokDataConfig
  ) => Promise<StoryblokDataResult>
): Promise<StoryblokDataResult> {
  /** Fetch Storyblok config to get root_name_space */
  const storyblokConfig = await getConfig()
  const prefix = storyblokConfig?.root_name_space || "blog"

  const { data: stories } = (await getStoryblokData("stories", {
    version: "draft",
    starts_with: `${prefix}/`,
  })) as { data: StoryblokStoryResponse[] }

  return { data: stories.map((s: StoryblokStoryResponse) => s.full_slug) }
}
