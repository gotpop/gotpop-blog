import type { PostProps, TagDatasourceEntry } from "@gotpop/system"
import { getStoryblokApi } from "@/lib/storyblok"
import { getStoryPath, shouldIncludeStory } from "@/lib/storyblok-utils"
import type { StoryblokStoryResponse } from "@/types/storyblok"
import {
  deduplicateTags,
  getErrorMessage,
  HARDCODED_TAGS,
} from "./storyblok-unified-data"
import type {
  BaseConfig,
  DatasourceEntriesConfig,
  PostsByTagConfig,
  StoriesByUuidsConfig,
  StoriesConfig,
  StoryByUuidConfig,
  StoryblokDataConfig,
  StoryblokDataType,
  StoryConfig,
} from "./storyblok-unified-data.types"

/**
 * Unified Storyblok data fetching function
 * @param dataType - The type of data to fetch
 * @param config - Configuration object specific to the data type
 * @returns Promise with the fetched data and optional error
 */
export async function getStoryblokData(
  dataType: StoryblokDataType,
  config: StoryblokDataConfig = {}
): Promise<{ data: unknown; error?: string }> {
  try {
    const storyblokApi = getStoryblokApi()

    switch (dataType) {
      case "story": {
        const { fullPath, version = "draft" } = config as StoryConfig
        const response = await storyblokApi.get(`cdn/stories/${fullPath}`, {
          version,
        })
        return { data: response.data.story }
      }

      case "stories": {
        const {
          version = "draft",
          starts_with,
          excluding_fields,
          filter_query,
          by_uuids,
        } = config as StoriesConfig

        const params: Record<string, string | object> = { version }
        if (starts_with) params.starts_with = starts_with
        if (excluding_fields) params.excluding_fields = excluding_fields
        if (filter_query) params.filter_query = filter_query
        if (by_uuids) params.by_uuids = by_uuids

        const response = await storyblokApi.get("cdn/stories", params)
        return { data: response.data.stories }
      }

      case "storyByUuid": {
        const { uuid, version = "draft" } = config as StoryByUuidConfig
        if (!uuid) {
          return { data: null, error: "No UUID provided" }
        }

        const response = await storyblokApi.get(`cdn/stories`, {
          version,
          by_uuids: uuid,
        })

        const story = response.data?.stories?.[0]
        if (!story) {
          return { data: null, error: `No story found for UUID: ${uuid}` }
        }

        return { data: story }
      }

      case "storiesByUuids": {
        const { uuids, version = "draft" } = config as StoriesByUuidsConfig
        if (!uuids || uuids.length === 0) {
          return { data: [], error: "No UUIDs provided" }
        }

        const response = await storyblokApi.get(`cdn/stories`, {
          version,
          by_uuids: uuids.join(","),
        })

        return { data: response.data?.stories || [] }
      }

      case "datasourceEntries": {
        const { datasource } = config as DatasourceEntriesConfig
        const response = await storyblokApi.get("cdn/datasource_entries", {
          datasource,
        })
        return { data: response.data.datasource_entries || [] }
      }

      case "tagsFromDatasource": {
        try {
          const TAGS_DATASOURCE_ID = process.env.STORYBLOK_TAGS_DATASOURCE_ID

          if (!TAGS_DATASOURCE_ID) {
            throw new Error("No datasource ID configured")
          }

          const result = await getStoryblokData("datasourceEntries", {
            datasource: TAGS_DATASOURCE_ID,
          })

          // If there's an error or empty data, fall back to posts
          if (result.error || !result.data) {
            throw new Error(
              result.error || "Datasource empty, falling back to posts"
            )
          }

          const datasourceTags = result.data as TagDatasourceEntry[]

          if (datasourceTags.length > 0) {
            return {
              data: deduplicateTags([...HARDCODED_TAGS, ...datasourceTags]),
            }
          }

          throw new Error("Datasource empty, falling back to posts")
        } catch {
          // Datasource not available, fall back to extracting tags from posts
          const { data: postsTagsStory } = (await getStoryblokData(
            "tagsFromPosts",
            config
          )) as { data: TagDatasourceEntry[] }
          return { data: [...HARDCODED_TAGS, ...postsTagsStory] }
        }
      }

      case "tagsFromPosts": {
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

      case "postsByTag": {
        const {
          tagName,
          sortBy = "date-desc",
          version = "published",
        } = config as PostsByTagConfig

        const { data: stories } = (await getStoryblokData("stories", {
          starts_with: "blog/posts/",
          version,
          excluding_fields: "body",
        })) as { data: PostProps[] }

        const filteredPosts = stories.filter((story: PostProps) => {
          const tags = story.content?.tags || []
          return tags.includes(tagName)
        })

        const sortedPosts = filteredPosts.sort((a: PostProps, b: PostProps) => {
          switch (sortBy) {
            case "date-desc": {
              const dateA = a.content?.published_date || a.published_at
              const dateB = b.content?.published_date || b.published_at
              return new Date(dateB).getTime() - new Date(dateA).getTime()
            }
            case "date-asc": {
              const dateA = a.content?.published_date || a.published_at
              const dateB = b.content?.published_date || b.published_at
              return new Date(dateA).getTime() - new Date(dateB).getTime()
            }
            case "title-asc": {
              const titleA = a.content?.Heading || a.name || ""
              const titleB = b.content?.Heading || b.name || ""
              return titleA.localeCompare(titleB)
            }
            case "title-desc": {
              const titleDescA = a.content?.Heading || a.name || ""
              const titleDescB = b.content?.Heading || b.name || ""
              return titleDescB.localeCompare(titleDescA)
            }
            default:
              return 0
          }
        })

        return { data: sortedPosts }
      }

      case "allPostsWithTags": {
        const { version = "published" } = config as BaseConfig

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

      case "allTagsFromPosts": {
        const { version = "published" } = config as BaseConfig

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

      case "availableStoriesForError": {
        const { data: stories } = (await getStoryblokData("stories", {
          version: "draft",
          starts_with: "blog/",
        })) as { data: StoryblokStoryResponse[] }

        return { data: stories.map((s: StoryblokStoryResponse) => s.full_slug) }
      }

      case "staticParams": {
        const { data: allStories } = (await getStoryblokData("stories", {
          version: "published",
          starts_with: "blog/",
        })) as { data: StoryblokStoryResponse[] }

        // Generate params for regular stories
        const storyParams = allStories
          .filter((story: StoryblokStoryResponse) =>
            shouldIncludeStory(story.full_slug)
          )
          .map((story: StoryblokStoryResponse) => {
            const path = getStoryPath(story.full_slug)
            const slug = path === "/" ? [] : path.slice(1).split("/")
            return { slug }
          })

        // Generate params for tag pages and all posts page
        const { data: tags } = (await getStoryblokData(
          "tagsFromDatasource"
        )) as { data: TagDatasourceEntry[] }
        const tagParams = tags.map((tag) => {
          const tagSlug = tag.value
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "")
          return { slug: ["posts", tagSlug] }
        })

        // Add the "all posts" page
        const allPostsParam = { slug: ["posts"] }

        return { data: [...storyParams, ...tagParams, allPostsParam] }
      }

      default:
        return { data: null, error: `Unknown data type: ${dataType}` }
    }
  } catch (error) {
    const errorMessage = getErrorMessage(error)

    // For datasource errors, provide a more helpful message
    if (
      dataType === "datasourceEntries" &&
      errorMessage.includes("could not be found")
    ) {
      return {
        data: null,
        error: `Datasource not found`,
      }
    }

    return {
      data: null,
      error: errorMessage,
    }
  }
}

/**
 * Fetches all tags from the Storyblok tags datasource
 * Falls back to extracting tags from posts if datasource is not available
 */
export async function getTagsFromDatasource(): Promise<TagDatasourceEntry[]> {
  const { data } = await getStoryblokData("tagsFromDatasource")
  return data as TagDatasourceEntry[]
}

/**
 * Gets all posts from the blog with their tags
 * Only returns actual blog posts (page_post component) that have tags
 */
export async function getAllPostsWithTags(): Promise<PostProps[]> {
  const { data } = await getStoryblokData("allPostsWithTags")
  return data as PostProps[]
}
