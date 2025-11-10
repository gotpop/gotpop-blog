import type {
  StoryblokDataConfig,
  StoryblokDataResult,
  StoryblokDataType,
  StoryblokStoryResponse,
} from "../../types"

export async function handleAvailableStoriesForError(
  getStoryblokData: (
    dataType: StoryblokDataType,
    config?: StoryblokDataConfig
  ) => Promise<StoryblokDataResult>
): Promise<StoryblokDataResult> {
  const { data: stories } = (await getStoryblokData("stories", {
    version: "draft",
    starts_with: "blog/",
  })) as { data: StoryblokStoryResponse[] }

  return { data: stories.map((s: StoryblokStoryResponse) => s.full_slug) }
}
