import "server-only"

import type { PostProps } from "@gotpop/system"
import { getContentTypeFullPath } from "../../config"
import { getConfig } from "../../config/runtime-config"
import type {
  BaseConfig,
  StoryblokDataConfig,
  StoryblokDataResult,
  StoryblokDataType,
} from "../../types"

type GetStoryblokDataFn = (
  dataType: StoryblokDataType,
  config?: StoryblokDataConfig
) => Promise<StoryblokDataResult>

/** Extracts all tags used in posts */
export async function handleAllTagsFromPosts(
  getStoryblokData: GetStoryblokDataFn,
  config: BaseConfig
): Promise<StoryblokDataResult> {
  const { version = "published" } = config

  /** Fetch Storyblok config to get root_name_space */
  const storyblokConfig = await getConfig()
  if (!storyblokConfig) {
    return { data: [], error: "Config not found" }
  }

  const { data: stories } = (await getStoryblokData("stories", {
    starts_with: getContentTypeFullPath("posts", storyblokConfig),
    version,
    excluding_fields: "body",
  })) as { data: PostProps[] }

  const allTags = new Set<string>()

  stories.forEach((story: PostProps) => {
    const tags = story.content?.tags || []
    for (const tag of tags) {
      allTags.add(tag)
    }
  })

  return { data: Array.from(allTags).sort() }
}
