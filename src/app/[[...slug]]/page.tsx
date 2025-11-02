import { StoryblokStory } from "@storyblok/react/rsc"
import PostsPage from "@/components/PostsPage"
import StoryNotFound from "@/components/utils/ClientLoader/StoryNotFound"
import { getStoryblokApi } from "@/lib/storyblok"
import { normalizeStoryblokPath } from "@/lib/storyblok-utils"
import type { StoryblokStoryResponse } from "@/types/storyblok"
import { handleStoryblokPathRedirect } from "@/utils/redirect-utils"
import { generateAllStaticParams } from "@/utils/static-params"

export const dynamicParams = true

export async function generateStaticParams() {
  return await generateAllStaticParams()
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
