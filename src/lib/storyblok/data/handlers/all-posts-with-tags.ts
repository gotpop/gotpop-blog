import type { PostProps } from "@gotpop/system"
import type {
  BaseConfig,
  StoryblokDataConfig,
  StoryblokDataType,
} from "../../storyblok-unified-data.types"

export async function handleAllPostsWithTags(
  getStoryblokData: (
    dataType: StoryblokDataType,
    config?: StoryblokDataConfig
  ) => Promise<{ data: unknown; error?: string }>,
  config: BaseConfig
): Promise<{ data: unknown; error?: string }> {
  const { version = "published" } = config

  const { data: stories } = (await getStoryblokData("stories", {
    starts_with: "blog/",
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
