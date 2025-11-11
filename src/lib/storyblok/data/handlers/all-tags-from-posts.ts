import type { PostProps } from "@gotpop/system"
import { CONTENT_PREFIX } from "../../config"
import type {
  BaseConfig,
  StoryblokDataConfig,
  StoryblokDataResult,
  StoryblokDataType,
} from "../../core/types"

export async function handleAllTagsFromPosts(
  getStoryblokData: (
    dataType: StoryblokDataType,
    config?: StoryblokDataConfig
  ) => Promise<StoryblokDataResult>,
  config: BaseConfig
): Promise<StoryblokDataResult> {
  const { version = "published" } = config

  const { data: stories } = (await getStoryblokData("stories", {
    starts_with: `${CONTENT_PREFIX}/posts/`,
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
