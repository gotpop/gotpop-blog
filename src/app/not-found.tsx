import {
  getAvailableStoriesForError,
  getConfig,
  getStoryblokData,
} from "@gotpop/storyblok"
import { NotFoundPage } from "@gotpop/system"
import { StoryblokStory } from "@storyblok/react/rsc"
import { ensureStoryblokInitialised } from "@/lib/storyblok-init"

export default async function NotFound() {
  ensureStoryblokInitialised()

  const availableStories = await getAvailableStoriesForError()
  const config = await getConfig()

  if (!config) {
    return <NotFoundPage availableStories={availableStories} />
  }

  const prefix = config.root_name_space || "blog"
  const notFoundPath = `${prefix}/not-found`

  const { data: story, error } = await getStoryblokData("story", {
    fullPath: notFoundPath,
  })

  // If the not-found story exists in Storyblok, render it
  if (story && !error) {
    return <StoryblokStory story={story} />
  }

  // Fallback to default NotFoundPage if story doesn't exist
  return <NotFoundPage availableStories={availableStories} />
}
