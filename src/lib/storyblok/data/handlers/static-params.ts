import type { TagDatasourceEntry } from "@gotpop/system"
import type { StoryblokStoryResponse } from "@/types/storyblok"
import type {
  StoryblokDataConfig,
  StoryblokDataType,
} from "../../storyblok-unified-data.types"
import { getStoryPath, shouldIncludeStory } from "../../storyblok-utils"

export async function handleStaticParams(
  getStoryblokData: (
    dataType: StoryblokDataType,
    config?: StoryblokDataConfig
  ) => Promise<{ data: unknown; error?: string }>
): Promise<{ data: unknown; error?: string }> {
  const { data: allStories } = (await getStoryblokData("stories", {
    version: "published",
    starts_with: "blog/",
  })) as { data: StoryblokStoryResponse[] }

  // Generate params for regular stories
  const storyParams = allStories
    .filter((story: StoryblokStoryResponse) =>
      shouldIncludeStory(story.full_slug)
    )
    .map((story: StoryblokStoryResponse) => {
      const path = getStoryPath(story.full_slug)
      const slug = path === "/" ? [] : path.slice(1).split("/")
      return { slug }
    })

  // Generate params for tag pages and all posts page
  const { data: tags } = (await getStoryblokData("tagsFromDatasource")) as {
    data: TagDatasourceEntry[]
  }
  const tagParams = tags.map((tag) => {
    const tagSlug = tag.value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
    return { slug: ["posts", tagSlug] }
  })

  // Add the "all posts" page
  const allPostsParam = { slug: ["posts"] }

  return { data: [...storyParams, ...tagParams, allPostsParam] }
}
