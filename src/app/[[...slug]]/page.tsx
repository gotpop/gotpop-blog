import { StoryblokStory } from "@storyblok/react/rsc"
import { StoryNotFound } from "@/components/utils/StoryNotFound"
import { getStoryblokApi } from "@/lib/storyblok"
import {
  getAvailableStoriesForError,
  getErrorMessage,
} from "@/lib/storyblok-error-handling"
import { generateAllStaticParams } from "@/lib/storyblok-static-params"
import { normalizeStoryblokPath } from "@/lib/storyblok-utils"
import { handleStoryblokPathRedirect } from "@/utils/redirect-utils"

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
    const availableStories = await getAvailableStoriesForError()
    const errorMessage = getErrorMessage(error)

    return (
      <StoryNotFound
        path={fullPath}
        errorMessage={errorMessage}
        availableStories={availableStories}
      />
    )
  }
}
