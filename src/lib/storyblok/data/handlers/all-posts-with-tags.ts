import "server-only"

import type { PostProps } from "@gotpop/system"
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

/** Fetches all posts that have tags */
export async function handleAllPostsWithTags(
  getStoryblokData: GetStoryblokDataFn,
  config: BaseConfig
): Promise<StoryblokDataResult> {
  const { version = "published" } = config
  const storyblokConfig = await getConfig()
  const prefix = storyblokConfig?.root_name_space || "blog"

  const { data: stories } = (await getStoryblokData("stories", {
    starts_with: `${prefix}/`,
    version,
    excluding_fields: "body",
    filter_query: {
      component: {
        in: "page_post",
      },
    },
  })) as { data: PostProps[] }

  const postsWithTags = stories.filter((story: PostProps) => {
    const tags = story.content?.tags || []
    return (
      Array.isArray(tags) &&
      tags.length > 0 &&
      tags.some((tag) => typeof tag === "string" && tag.trim().length > 0)
    )
  })

  return { data: postsWithTags }
}
