import type { StoryblokStoryResponse } from "@/types/storyblok"
import type {
  StoryblokDataConfig,
  StoryblokDataType,
} from "../../types"
import { getStoryPath, shouldIncludeStory } from "../../storyblok-utils"

export async function handleStaticParams(
  getStoryblokData: (
    dataType: StoryblokDataType,
    config?: StoryblokDataConfig
  ) => Promise<{ data: unknown; error?: string }>
): Promise<{ data: unknown; error?: string }> {
  const { data: allStories } = (await getStoryblokData("stories", {
    version: "published",
    starts_with: "blog/",
  })) as { data: StoryblokStoryResponse[] }

  // Generate params for regular stories only
  // Tag pages are rendered dynamically on-demand (dynamicParams = true)
  const storyParams = allStories
    .filter((story: StoryblokStoryResponse) =>
      shouldIncludeStory(story.full_slug)
    )
    .map((story: StoryblokStoryResponse) => {
      const path = getStoryPath(story.full_slug)
      const slug = path === "/" ? [] : path.slice(1).split("/")
      return { slug }
    })

  return { data: storyParams }
}
