import type { PostProps, TagDatasourceEntry } from "@gotpop/system"
import {
  getStoryblokData,
  getTagFromSlug as getTagFromSlugFromUnified,
  isValidTag as isValidTagFromUnified,
} from "@/lib/storyblok-unified-data"

/**
 * Fetches all tags from the Storyblok tags datasource
 * Falls back to extracting tags from posts if datasource is not available
 */
export async function getTagsFromDatasource(): Promise<TagDatasourceEntry[]> {
  const { data } = await getStoryblokData("tagsFromDatasource")
  return data as TagDatasourceEntry[]
}

/**
 * Checks if a tag slug is valid (exists in the datasource or is a hardcoded tag)
 */
export async function isValidTag(tagSlug: string): Promise<boolean> {
  return await isValidTagFromUnified(tagSlug)
}

/**
 * Converts URL slug back to tag name by finding exact match in datasource
 */
export async function getTagFromSlug(tagSlug: string): Promise<string | null> {
  return await getTagFromSlugFromUnified(tagSlug)
}

/**
 * Fetches all posts that contain a specific tag with sorting options
 */
export async function getPostsByTag(
  tagName: string,
  sortBy: "date-desc" | "date-asc" | "title-asc" | "title-desc" = "date-desc"
): Promise<PostProps[]> {
  const { data } = await getStoryblokData("postsByTag", { tagName, sortBy })
  return data as PostProps[]
}

/**
 * Gets all posts from the blog with their tags
 * Only returns actual blog posts (page_post component) that have tags
 */
export async function getAllPostsWithTags(): Promise<PostProps[]> {
  const { data } = await getStoryblokData("allPostsWithTags")
  return data as PostProps[]
}

/**
 * Gets all unique tags used across all posts
 */
export async function getAllTagsFromPosts(): Promise<string[]> {
  const { data } = await getStoryblokData("allTagsFromPosts")
  return data as string[]
}
