import "server-only"

import type { PostProps } from "@gotpop/system"
import { getContentTypeFullPath } from "../../config"
import { getConfig } from "../../config/runtime-config"
import type {
  PostsByTagConfig,
  StoryblokDataConfig,
  StoryblokDataResult,
  StoryblokDataType,
} from "../../types"

/** Fetches and sorts posts filtered by a specific tag */
export async function handlePostsByTag(
  getStoryblokData: (
    dataType: StoryblokDataType,
    config?: StoryblokDataConfig
  ) => Promise<StoryblokDataResult>,
  config: PostsByTagConfig
): Promise<StoryblokDataResult> {
  const { tagName, sortBy = "date-desc", version = "published" } = config

  const storyblokConfig = await getConfig()
  if (!storyblokConfig) {
    return { data: [], error: "Config not found" }
  }

  const { data: stories } = (await getStoryblokData("stories", {
    starts_with: getContentTypeFullPath("posts", storyblokConfig),
    version,
    excluding_fields: "body",
  })) as { data: PostProps[] }

  const filteredPosts = stories.filter((story: PostProps) => {
    const tags = story.content?.tags || []
    return tags.includes(tagName)
  })

  const sortedPosts = filteredPosts.sort((a: PostProps, b: PostProps) => {
    switch (sortBy) {
      case "date-desc": {
        const dateA = a.content?.published_date || a.published_at
        const dateB = b.content?.published_date || b.published_at
        return new Date(dateB).getTime() - new Date(dateA).getTime()
      }
      case "date-asc": {
        const dateA = a.content?.published_date || a.published_at
        const dateB = b.content?.published_date || b.published_at
        return new Date(dateA).getTime() - new Date(dateB).getTime()
      }
      case "title-asc": {
        const titleA = a.content?.Heading || a.name || ""
        const titleB = b.content?.Heading || b.name || ""
        return titleA.localeCompare(titleB)
      }
      case "title-desc": {
        const titleDescA = a.content?.Heading || a.name || ""
        const titleDescB = b.content?.Heading || b.name || ""
        return titleDescB.localeCompare(titleDescA)
      }
      default:
        return 0
    }
  })

  return { data: sortedPosts }
}
