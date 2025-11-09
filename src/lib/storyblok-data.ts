import type { PostProps, TagDatasourceEntry } from "@gotpop/system"
import { getStoryblokApi } from "@/lib/storyblok"

/**
 * Converts tag name to URL-safe slug
 * e.g., "JavaScript" -> "javascript", "CSS & HTML" -> "css-html"
 */
function normalizeTagSlug(tagName: string): string {
  return tagName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

/**
 * Removes duplicate tags based on value (case-insensitive) and keeps the first occurrence
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
 * Hardcoded tags that are not included in the API call but should be available for filtering
 */
const HARDCODED_TAGS: TagDatasourceEntry[] = [
  // Add hardcoded tags here as needed
  // {
  //   id: 999001,
  //   name: "example-tag",
  //   value: "example-tag",
  // },
]

/**
 * Get all unique tags from published posts
 * This is a fallback method when datasource is not available
 * Also includes hardcoded tags
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

    data.stories.forEach((story: PostProps) => {
      if (story.content?.tags && Array.isArray(story.content.tags)) {
        story.content.tags.forEach((tag: string) => {
          if (typeof tag === "string" && tag.trim()) {
            allTags.add(tag.trim())
          }
        })
      }
    })

    // Convert to TagDatasourceEntry format, starting with higher IDs to avoid conflicts
    const postsOnlyTags = Array.from(allTags).map((tag, index) => ({
      id: index + 1000, // Start with higher IDs to avoid conflicts with hardcoded tags
      name: tag,
      value: tag,
    }))

    // Merge hardcoded tags with posts tags, avoiding duplicates
    const allTagsArray = [...HARDCODED_TAGS, ...postsOnlyTags]

    return deduplicateTags(allTagsArray)
  } catch {
    return deduplicateTags(HARDCODED_TAGS) // Return at least the hardcoded tags if everything fails
  }
}

/**
 * Fetches all tags from the Storyblok tags datasource
 * Falls back to extracting tags from posts if datasource is not available
 * Includes hardcoded tags that are not in the API
 */
export async function getTagsFromDatasource(): Promise<TagDatasourceEntry[]> {
  try {
    const TAGS_DATASOURCE_ID = process.env.STORYBLOK_TAGS_DATASOURCE_ID
    const PUBLIC_TOKEN = process.env.STORYBLOK_ACCESS_TOKEN

    if (!PUBLIC_TOKEN) {
      const postsTagsStory = await getTagsFromPosts()
      return [...HARDCODED_TAGS, ...postsTagsStory]
    }

    if (!TAGS_DATASOURCE_ID) {
      const postsTagsStory = await getTagsFromPosts()
      return [...HARDCODED_TAGS, ...postsTagsStory]
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
      const postsTagsStory = await getTagsFromPosts()
      return [...HARDCODED_TAGS, ...postsTagsStory]
    }

    const data = await response.json()
    const datasourceTags = data.datasource_entries || []

    // If datasource is empty, fall back to posts
    if (datasourceTags.length === 0) {
      const postsTagsStory = await getTagsFromPosts()
      return [...HARDCODED_TAGS, ...postsTagsStory]
    }

    // Merge hardcoded tags with datasource tags, avoiding duplicates
    const allTags = [...HARDCODED_TAGS, ...datasourceTags]

    return deduplicateTags(allTags)
  } catch {
    const postsTagsStory = await getTagsFromPosts()
    return [...HARDCODED_TAGS, ...postsTagsStory]
  }
}

/**
 * Checks if a tag slug is valid (exists in the datasource or is a hardcoded tag)
 */
export async function isValidTag(tagSlug: string): Promise<boolean> {
  // First check hardcoded tags
  const isHardcodedTag = HARDCODED_TAGS.some(
    (tag) => normalizeTagSlug(tag.value) === tagSlug
  )
  if (isHardcodedTag) {
    return true
  }

  // Then check datasource
  const tags = await getTagsFromDatasource()
  return tags.some((tag) => normalizeTagSlug(tag.value) === tagSlug)
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
): Promise<PostProps[]> {
  try {
    const storyblokApi = getStoryblokApi()

    const { data } = await storyblokApi.get("cdn/stories", {
      starts_with: "blog/posts/",
      version: "published",
      excluding_fields: "body", // Don't need full content for listing
    })

    // Filter posts that have the specified tag
    const filteredPosts = data.stories.filter((story: PostProps) => {
      const tags = story.content?.tags || []
      return tags.includes(tagName)
    })

    // Sort the posts based on the sortBy parameter
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

    return sortedPosts
  } catch {
    return []
  }
}

/**
 * Gets all posts from the blog with their tags
 * Only returns actual blog posts (page_post component) that have tags
 */
export async function getAllPostsWithTags(): Promise<PostProps[]> {
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
    const postsWithTags = (data.stories || []).filter((story: PostProps) => {
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

    data.stories.forEach((story: PostProps) => {
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