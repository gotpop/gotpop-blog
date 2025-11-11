import type { PostProps } from "@gotpop/system"
import { getStartsWithPrefix } from "../../config"
import type {
  BaseConfig,
  StoryblokDataConfig,
  StoryblokDataResult,
  StoryblokDataType,
} from "../../core/types"

export async function handleAllPostsWithTags(
  getStoryblokData: (
    dataType: StoryblokDataType,
    config?: StoryblokDataConfig
  ) => Promise<StoryblokDataResult>,
  config: BaseConfig
): Promise<StoryblokDataResult> {
  const { version = "published" } = config

  const { data: stories } = (await getStoryblokData("stories", {
    starts_with: getStartsWithPrefix(),
    version,
    excluding_fields: "body",
    filter_query: {
      component: {
        in: "page_post",
      },
    },
  })) as { data: PostProps[] }

  const postsWithTags = stories.filter((story: PostProps) => {
    const tags = story.content?.tags || []
    return (
      Array.isArray(tags) &&
      tags.length > 0 &&
      tags.some((tag) => typeof tag === "string" && tag.trim().length > 0)
    )
  })

  return { data: postsWithTags }
}
