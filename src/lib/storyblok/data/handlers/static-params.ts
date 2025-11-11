import { getStartsWithPrefix } from "../../config"
import type {
  StoryblokDataConfig,
  StoryblokDataResult,
  StoryblokDataType,
  StoryblokStoryResponse,
} from "../../core/types"
import { getStoryPath, shouldIncludeStory } from "../../routing"

export async function handleStaticParams(
  getStoryblokData: (
    dataType: StoryblokDataType,
    config?: StoryblokDataConfig
  ) => Promise<StoryblokDataResult>
): Promise<StoryblokDataResult> {
  const { data: allStories } = (await getStoryblokData("stories", {
    version: "published",
    starts_with: getStartsWithPrefix(),
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
