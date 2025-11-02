import { StoryblokStory } from "@storyblok/react/rsc"
import PostsPage from "@/components/PostsPage"
import StoryNotFound from "@/components/utils/ClientLoader/StoryNotFound"
import { getStoryblokApi } from "@/lib/storyblok"
import { normalizeStoryblokPath } from "@/lib/storyblok-utils"
import {
  getAvailableStoriesForError,
  getErrorMessage,
} from "@/utils/error-handling"
import { handleStoryblokPathRedirect } from "@/utils/redirect-utils"
import { isPostsPage, isTagPage } from "@/utils/route-detection"
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
    if (isPostsPage(fullPath, slug)) {
      return <PostsPage />
    }

    const { isTagPage: isTag, tagSlug } = isTagPage(slug)

    if (isTag && tagSlug) {
      return <PostsPage currentTag={tagSlug} />
    }

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
