import {
  getAvailableStoriesForError,
  getConfig,
  getStoryblokData,
  withNotFoundPageData,
} from "@gotpop/storyblok"
import type { NotFoundStoryblok } from "@gotpop/system"
import { PageNotFound } from "@gotpop/system"
import { ensureStoryblokInitialised } from "@/lib/storyblok-init"

/**  Wrap with the HOC outside of the component registration */
const PageNotFoundWithData = withNotFoundPageData(PageNotFound)

export default async function NotFound() {
  ensureStoryblokInitialised()

  const availableStories = await getAvailableStoriesForError()
  const config = await getConfig()

  const prefix = config?.root_name_space || "blog"
  const notFoundPath = `${prefix}/not-found`

  const { data: story, error } = await getStoryblokData("story", {
    fullPath: notFoundPath,
  })

  if (story && !error && story.content) {
    return (
      <PageNotFoundWithData
        blok={story.content as NotFoundStoryblok}
        config={config}
        availableStories={availableStories}
      />
    )
  }

  return null
}
