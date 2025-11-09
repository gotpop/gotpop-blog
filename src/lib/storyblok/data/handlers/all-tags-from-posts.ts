import type { PostProps } from "@gotpop/system"
import type {
  BaseConfig,
  StoryblokDataConfig,
  StoryblokDataType,
} from "../../storyblok-unified-data.types"

export async function handleAllTagsFromPosts(
  getStoryblokData: (
    dataType: StoryblokDataType,
    config?: StoryblokDataConfig
  ) => Promise<{ data: unknown; error?: string }>,
  config: BaseConfig
): Promise<{ data: unknown; error?: string }> {
  const { version = "published" } = config

  const { data: stories } = (await getStoryblokData("stories", {
    starts_with: "blog/posts/",
    version,
    excluding_fields: "body",
  })) as { data: PostProps[] }

  const allTags = new Set<string>()

  stories.forEach((story: PostProps) => {
    const tags = story.content?.tags || []
    for (const tag of tags) {
      allTags.add(tag)
    }
  })

  return { data: Array.from(allTags).sort() }
}
