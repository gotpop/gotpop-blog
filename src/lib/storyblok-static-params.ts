import "server-only"

import { getStoryblokApi } from "@/lib/storyblok"
import { getTagsFromDatasource } from "@/lib/storyblok-data"
import { getStoryPath, shouldIncludeStory } from "@/lib/storyblok-utils"
import type { StoryblokStoryResponse } from "@/types/storyblok"

export async function generateAllStaticParams() {
  const storyblokApi = getStoryblokApi()

  const { data } = await storyblokApi.get("cdn/stories", {
    version: "published",
    starts_with: "blog/",
  })

  // Generate params for regular stories
  const storyParams = data.stories
    .filter((story: StoryblokStoryResponse) =>
      shouldIncludeStory(story.full_slug)
    )
    .map((story: StoryblokStoryResponse) => {
      const path = getStoryPath(story.full_slug)
      const slug = path === "/" ? [] : path.slice(1).split("/")
      return { slug }
    })

  // Generate params for tag pages and all posts page
  const tags = await getTagsFromDatasource()
  const tagParams = tags.map((tag) => {
    const tagSlug = tag.value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
    return { slug: ["posts", tagSlug] }
  })

  // Add the "all posts" page
  const allPostsParam = { slug: ["posts"] }

  return [...storyParams, ...tagParams, allPostsParam]
}
