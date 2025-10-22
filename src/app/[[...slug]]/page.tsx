import { StoryblokStory } from "@storyblok/react/rsc"
import PostsPage from "@/components/PostsPage"
import StoryNotFound from "@/components/utils/ClientLoader/StoryNotFound"
import { getStoryblokApi } from "@/lib/storyblok"
import {
  getStoryPath,
  normalizeStoryblokPath,
  shouldIncludeStory,
} from "@/lib/storyblok-utils"
import type { StoryblokStoryResponse } from "@/types/storyblok"
import { handleStoryblokPathRedirect } from "@/utils/redirect-utils"
import { getTagsFromDatasource } from "@/utils/tags"

export const dynamicParams = true

export async function generateStaticParams() {
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

interface PageParams {
  params: Promise<{
    slug?: string[]
  }>
}

export default async function Page({ params }: PageParams) {
  const { slug } = await params

  handleStoryblokPathRedirect(slug)

  const fullPath = normalizeStoryblokPath(slug)

  try {
    const storyblokApi = getStoryblokApi()

    const { data } = await storyblokApi.get(`cdn/stories/${fullPath}`, {
      version: "draft",
    })

    return <StoryblokStory story={data.story} />
  } catch (error: unknown) {
    // Check if this is a posts page that should show the filter
    if (fullPath === "blog/posts" || slug?.join("/") === "posts") {
      return <PostsPage />
    }

    // Check if this is a tag page (e.g., /posts/css)
    if (slug && slug.length === 2 && slug[0] === "posts") {
      const tagSlug = slug[1]
      return <PostsPage currentTag={tagSlug} />
    }

    let availableStories: string[] = []

    try {
      const storyblokApi = getStoryblokApi()

      const { data } = await storyblokApi.get("cdn/stories", {
        version: "draft",
        starts_with: "blog/",
      })

      availableStories = data.stories.map(
        (s: StoryblokStoryResponse) => s.full_slug
      )
    } catch {
      // Ignore if we can't fetch stories
    }

    const errorMessage =
      error instanceof Error ? error.message : "Unknown error"

    return (
      <StoryNotFound
        path={fullPath}
        errorMessage={errorMessage}
        availableStories={availableStories}
      />
    )
  }
}
