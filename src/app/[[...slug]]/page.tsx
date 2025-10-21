import { StoryblokStory } from "@storyblok/react/rsc"

import StoryNotFound from "@/components/utils/ClientLoader/StoryNotFound"
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

    // If this is a page_filter story, we need to inject the posts data
    if (data.story.content.component === "page_filter") {
      const pageType = determinePageType(slug)
      let selectedTag = "all"

      // Extract tag from URL if it's a tag page
      if (pageType === "tag-page") {
        const tagSlug = extractTagSlug(slug)
        if (tagSlug && (await isValidTag(tagSlug))) {
          selectedTag = tagSlug
        }
      }

      // Get posts and tags data
      const { getAllPostsWithTags } = await import("@/utils/tags")
      const allPosts = await getAllPostsWithTags()
      const availableTags = await getTagsFromDatasource()

      // Find FilterContent component in the story body and inject props
      const storyWithInjectedProps = {
        ...data.story,
        content: {
          ...data.story.content,
          body: data.story.content.body?.map(
            (component: { component: string; [key: string]: unknown }) => {
              if (component.component === "filter_content") {
                return {
                  ...component,
                  initialPosts: allPosts,
                  availableTags: availableTags,
                  selectedTag: selectedTag,
                }
              }
              return component
            }
          ),
        },
      }

      return <StoryblokStory story={storyWithInjectedProps} />
    }

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
