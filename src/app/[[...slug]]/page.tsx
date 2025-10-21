import { StoryblokStory } from "@storyblok/react/rsc"

import StoryNotFound from "@/components/utils/ClientLoader/StoryNotFound"
import FilterContent from "@/components/storyblok/FilterContent/FilterContent"
import { getStoryblokApi } from "@/lib/storyblok"
import {
  determinePageType,
  extractTagSlug,
  getStoryPath,
  normalizeStoryblokPath,
  shouldIncludeStory,
} from "@/lib/storyblok-utils"
import type { StoryblokStoryResponse } from "@/types/storyblok"
import { handleStoryblokPathRedirect } from "@/utils/redirect-utils"
import { getTagsFromDatasource, isValidTag } from "@/utils/tags"

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

  // Generate params for tag pages
  const tags = await getTagsFromDatasource()
  const tagParams = tags.map((tag) => {
    const tagSlug = tag.value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
    return { slug: ["posts", tagSlug] }
  })

  return [...storyParams, ...tagParams]
}

interface PageParams {
  params: Promise<{
    slug?: string[]
  }>
}

export default async function Page({ params }: PageParams) {
  const { slug } = await params

  handleStoryblokPathRedirect(slug)

  const pageType = determinePageType(slug)

  // Handle tag pages
  if (pageType === "tag-page") {
    const tagSlug = extractTagSlug(slug)

    if (tagSlug && (await isValidTag(tagSlug))) {
      // This is a valid tag page - render tag-specific content
      return <FilterContent tagSlug={tagSlug} />
    }
    // If not a valid tag, fall through to try as regular post
  }

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
