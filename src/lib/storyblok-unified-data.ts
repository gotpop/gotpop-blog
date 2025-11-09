import "server-only"
import type { PostProps, TagDatasourceEntry } from "@gotpop/system"
import { getStoryblokApi } from "@/lib/storyblok"
import { getStoryPath, shouldIncludeStory } from "@/lib/storyblok-utils"
import type { StoryblokStoryResponse } from "@/types/storyblok"

// Define all available data types
export type StoryblokDataType =
  | "story"
  | "stories"
  | "storyByUuid"
  | "storiesByUuids"
  | "datasourceEntries"
  | "tagsFromDatasource"
  | "tagsFromPosts"
  | "postsByTag"
  | "allPostsWithTags"
  | "allTagsFromPosts"
  | "availableStoriesForError"
  | "staticParams"

// Configuration interfaces for different data types
interface BaseConfig {
  version?: "draft" | "published"
}

interface StoryConfig extends BaseConfig {
  fullPath: string
}

interface StoriesConfig extends BaseConfig {
  starts_with?: string
  excluding_fields?: string
  filter_query?: {
    component?: {
      in: string
    }
  }
  by_uuids?: string
}

interface StoryByUuidConfig extends BaseConfig {
  uuid: string
}

interface StoriesByUuidsConfig extends BaseConfig {
  uuids: string[]
}

interface DatasourceEntriesConfig {
  datasource: string
}

interface PostsByTagConfig extends BaseConfig {
  tagName: string
  sortBy?: "date-desc" | "date-asc" | "title-asc" | "title-desc"
}

// Union type for all possible configurations
export type StoryblokDataConfig =
  | StoryConfig
  | StoriesConfig
  | StoryByUuidConfig
  | StoriesByUuidsConfig
  | DatasourceEntriesConfig
  | PostsByTagConfig
  | BaseConfig

// Hardcoded tags that are not included in the API call but should be available for filtering
const HARDCODED_TAGS: TagDatasourceEntry[] = []

/**
 * Converts tag name to URL-safe slug
 */
function normalizeTagSlug(tagName: string): string {
  return tagName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

/**
 * Removes duplicate tags based on value (case-insensitive)
 */
function deduplicateTags(tags: TagDatasourceEntry[]): TagDatasourceEntry[] {
  const seen = new Set<string>()
  return tags.filter((tag) => {
    const normalizedValue = tag.value.toLowerCase()
    if (seen.has(normalizedValue)) {
      return false
    }
    seen.add(normalizedValue)
    return true
  })
}

/**
 * Extracts error message from various error types
 */
function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message
  }
  if (typeof error === "object" && error !== null) {
    if ("message" in error && typeof error.message === "string") {
      return error.message
    }
    if ("status" in error && "statusText" in error) {
      return `${error.status}: ${error.statusText}`
    }
  }
  return "Unknown error"
}

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

// Convenience functions for common operations
export async function isValidTag(tagSlug: string): Promise<boolean> {
  const isHardcodedTag = HARDCODED_TAGS.some(
    (tag) => normalizeTagSlug(tag.value) === tagSlug
  )
  if (isHardcodedTag) {
    return true
  }

  const { data: tags } = await getStoryblokData("tagsFromDatasource")
  const tagsList = tags as TagDatasourceEntry[]
  return tagsList.some(
    (tag: TagDatasourceEntry) => normalizeTagSlug(tag.value) === tagSlug
  )
}

export async function getTagFromSlug(tagSlug: string): Promise<string | null> {
  const { data: tags } = await getStoryblokData("tagsFromDatasource")
  const tagsList = tags as TagDatasourceEntry[]
  const tag = tagsList.find(
    (tag: TagDatasourceEntry) => normalizeTagSlug(tag.value) === tagSlug
  )
  return tag ? tag.value : null
}
