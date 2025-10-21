import { getStoryblokApi } from "@/lib/storyblok"

export interface TagDatasourceEntry {
  name: string
  value: string
  id: number
}

export interface PostStory {
  uuid: string
  name: string
  full_slug: string
  published_at: string
  content: {
    tags?: string[]
    component: string
    Heading?: string
    description?: string
    [key: string]: unknown
  }
}

/**
 * Fetches all tags from the Storyblok tags datasource
 * Falls back to extracting tags from posts if datasource is not available
 */
export async function getTagsFromDatasource(): Promise<TagDatasourceEntry[]> {
  try {
    const TAGS_DATASOURCE_ID = process.env.STORYBLOK_TAGS_DATASOURCE_ID
    const PUBLIC_TOKEN = process.env.STORYBLOK_ACCESS_TOKEN

    if (!PUBLIC_TOKEN) {
      return await getTagsFromPosts()
    }

    if (!TAGS_DATASOURCE_ID) {
      return await getTagsFromPosts()
    }

    const response = await fetch(
      `https://api.storyblok.com/v2/cdn/datasource_entries?datasource=${TAGS_DATASOURCE_ID}&token=${PUBLIC_TOKEN}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )

    if (!response.ok) {
      return await getTagsFromPosts()
    }

    const data = await response.json()
    const datasourceTags = data.datasource_entries || []

    // If datasource is empty, fall back to posts
    if (datasourceTags.length === 0) {
      return await getTagsFromPosts()
    }

    return datasourceTags
  } catch {
    return await getTagsFromPosts()
  }
}

/**
 * Get all unique tags from published posts
 * This is a fallback method when datasource is not available
 */
async function getTagsFromPosts(): Promise<TagDatasourceEntry[]> {
  try {
    const storyblokApi = getStoryblokApi()

    const { data } = await storyblokApi.get("cdn/stories", {
      version: "draft",
      starts_with: "blog/",
      filter_query: {
        component: {
          in: "page_post",
        },
      },
    })

    const allTags = new Set<string>()

    data.stories.forEach((story: PostStory) => {
      if (story.content?.tags && Array.isArray(story.content.tags)) {
        story.content.tags.forEach((tag: string) => {
          if (typeof tag === "string" && tag.trim()) {
            allTags.add(tag.trim())
          }
        })
      }
    })

    // Convert to TagDatasourceEntry format
    return Array.from(allTags).map((tag, index) => ({
      id: index + 1,
      name: tag,
      value: tag,
    }))
  } catch {
    return []
  }
}

/**
 * Checks if a tag slug is valid (exists in the datasource)
 */
export async function isValidTag(tagSlug: string): Promise<boolean> {
  const tags = await getTagsFromDatasource()
  return tags.some((tag) => normalizeTagSlug(tag.value) === tagSlug)
}

/**
 * Converts tag name to URL-safe slug
 * e.g., "JavaScript" -> "javascript", "CSS & HTML" -> "css-html"
 */
export function normalizeTagSlug(tagName: string): string {
  return tagName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

/**
 * Converts URL slug back to tag name by finding exact match in datasource
 */
export async function getTagFromSlug(tagSlug: string): Promise<string | null> {
  const tags = await getTagsFromDatasource()
  const tag = tags.find((tag) => normalizeTagSlug(tag.value) === tagSlug)
  return tag ? tag.value : null
}

/**
 * Fetches all posts that contain a specific tag with sorting options
 */
export async function getPostsByTag(
  tagName: string,
  sortBy: "date-desc" | "date-asc" | "title-asc" | "title-desc" = "date-desc"
): Promise<PostStory[]> {
  try {
    const storyblokApi = getStoryblokApi()

    const { data } = await storyblokApi.get("cdn/stories", {
      starts_with: "blog/posts/",
      version: "published",
      excluding_fields: "body", // Don't need full content for listing
    })

    // Filter posts that have the specified tag
    const filteredPosts = data.stories.filter((story: PostStory) => {
      const tags = story.content?.tags || []
      return tags.includes(tagName)
    })

    // Sort the posts based on the sortBy parameter
    const sortedPosts = filteredPosts.sort((a: PostStory, b: PostStory) => {
      switch (sortBy) {
        case "date-desc":
          return (
            new Date(b.published_at).getTime() -
            new Date(a.published_at).getTime()
          )
        case "date-asc":
          return (
            new Date(a.published_at).getTime() -
            new Date(b.published_at).getTime()
          )
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

    return sortedPosts
  } catch {
    return []
  }
}

/**
 * Gets all posts from the blog with their tags
 * Only returns actual blog posts (page_post component) that have tags
 */
export async function getAllPostsWithTags(): Promise<PostStory[]> {
  try {
    const storyblokApi = getStoryblokApi()

    const { data } = await storyblokApi.get("cdn/stories", {
      starts_with: "blog/",
      version: "published",
      excluding_fields: "body", // Don't need full content for listing
      filter_query: {
        component: {
          in: "page_post",
        },
      },
    })

    // Further filter to only include posts that have tags
    const postsWithTags = (data.stories || []).filter((story: PostStory) => {
      const tags = story.content?.tags || []
      return (
        Array.isArray(tags) &&
        tags.length > 0 &&
        tags.some((tag) => typeof tag === "string" && tag.trim().length > 0)
      )
    })

    return postsWithTags
  } catch {
    return []
  }
}

/**
 * Gets all unique tags used across all posts
 */
export async function getAllTagsFromPosts(): Promise<string[]> {
  try {
    const storyblokApi = getStoryblokApi()

    const { data } = await storyblokApi.get("cdn/stories", {
      starts_with: "blog/posts/",
      version: "published",
      excluding_fields: "body",
    })

    const allTags = new Set<string>()

    data.stories.forEach((story: PostStory) => {
      const tags = story.content?.tags || []
      for (const tag of tags) {
        allTags.add(tag)
      }
    })

    return Array.from(allTags).sort()
  } catch {
    return []
  }
}
