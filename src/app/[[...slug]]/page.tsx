import { StoryblokStory } from "@storyblok/react/rsc"
import { StoryNotFound } from "@/components/utils/StoryNotFound"
import {
  getAvailableStoriesForError,
  getErrorMessage,
} from "@/lib/storyblok/storyblok-error-handling"
import { generateAllStaticParams } from "@/lib/storyblok/storyblok-static-params"
import { getStoryblokData } from "@/lib/storyblok/storyblok-unified-data"
import { normalizeStoryblokPath } from "@/lib/storyblok/storyblok-utils"
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

  const { data: story, error } = await getStoryblokData("story", { fullPath })

  if (error) {
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

  return <StoryblokStory story={story} />
}
