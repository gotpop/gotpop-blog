import type { PostProps } from "@gotpop/system"
import { deduplicateTags, HARDCODED_TAGS } from "../../storyblok-tags"
import type { StoryblokDataConfig, StoryblokDataType } from "../../types"

export async function handleTagsFromPosts(
  getStoryblokData: (
    dataType: StoryblokDataType,
    config?: StoryblokDataConfig
  ) => Promise<{ data: unknown; error?: string }>
): Promise<{ data: unknown; error?: string }> {
  const { data: stories } = (await getStoryblokData("stories", {
    version: "draft",
    starts_with: "blog/",
    filter_query: {
      component: {
        in: "page_post",
      },
    },
  })) as { data: PostProps[] }

  const allTags = new Set<string>()

  stories.forEach((story: PostProps) => {
    if (story.content?.tags && Array.isArray(story.content.tags)) {
      story.content.tags.forEach((tag: string) => {
        if (typeof tag === "string" && tag.trim()) {
          allTags.add(tag.trim())
        }
      })
    }
  })

  // Convert to TagDatasourceEntry format
  const postsOnlyTags = Array.from(allTags).map((tag, index) => ({
    id: index + 1000,
    name: tag,
    value: tag,
  }))

  const allTagsArray = [...HARDCODED_TAGS, ...postsOnlyTags]
  return { data: deduplicateTags(allTagsArray) }
}
