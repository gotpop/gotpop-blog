import type { StoryblokStoryResponse } from "@/types/storyblok"
import type {
  StoryblokDataConfig,
  StoryblokDataType,
} from "../../types"

export async function handleAvailableStoriesForError(
  getStoryblokData: (
    dataType: StoryblokDataType,
    config?: StoryblokDataConfig
  ) => Promise<{ data: unknown; error?: string }>
): Promise<{ data: unknown; error?: string }> {
  const { data: stories } = (await getStoryblokData("stories", {
    version: "draft",
    starts_with: "blog/",
  })) as { data: StoryblokStoryResponse[] }

  return { data: stories.map((s: StoryblokStoryResponse) => s.full_slug) }
}
