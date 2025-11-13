import { getAvailableStoriesForError } from "@gotpop/storyblok"
import { NotFoundPage } from "@gotpop/system"

export default async function NotFound() {
  const availableStories = await getAvailableStoriesForError()

  return <NotFoundPage availableStories={availableStories} />
}
