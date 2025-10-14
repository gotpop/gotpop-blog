import {
  normalizeStoryblokPath,
  shouldIncludeStory,
} from "@/lib/storyblok-utils"

import StoryNotFound from "@/components/ErrorPages/StoryNotFound"
import { StoryblokStory } from "@storyblok/react/rsc"
import { StoryblokStoryResponse } from "@/types/storyblok"
import { getStoryblokApi } from "@/lib/storyblok"

export const dynamicParams = true

export async function generateStaticParams() {
  const storyblokApi = getStoryblokApi()

  const { data } = await storyblokApi.get("cdn/stories", {
    version: "published",
    starts_with: "blog/",
  })

  return data.stories
    .filter((story: StoryblokStoryResponse) =>
      shouldIncludeStory(story.full_slug)
    )
    .map((story: StoryblokStoryResponse) => ({
      slug: story.full_slug.replace("blog/", "").split("/"),
    }))
}

interface PageParams {
  params: Promise<{
    slug?: string[]
  }>
}

export default async function Page({ params }: PageParams) {
  const { slug } = await params
  const fullPath = normalizeStoryblokPath(slug)

  try {
    const storyblokApi = getStoryblokApi()

    const { data } = await storyblokApi.get(`cdn/stories/${fullPath}`, {
      version: "draft",
    })

    return <StoryblokStory story={data.story} />
  } catch (error: unknown) {
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
