import "server-only"

import type { TagDatasourceEntry } from "@gotpop/system"
import { getStoryblokData } from "../data/get-storyblok-data"

/** Hardcoded tags that are not included in the API call but should be available for filtering */
export const HARDCODED_TAGS: TagDatasourceEntry[] = []

/** Converts tag name to URL-safe slug */
function normalizeTagSlug(tagName: string): string {
  return tagName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

/** Removes duplicate tags based on value (case-insensitive) */
export function deduplicateTags(
  tags: TagDatasourceEntry[]
): TagDatasourceEntry[] {
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

/** Checks if a tag slug is valid by comparing against hardcoded tags and datasource */
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

/** Retrieves the original tag value from a URL slug */
export async function getTagFromSlug(tagSlug: string): Promise<string | null> {
  const { data: tags } = await getStoryblokData("tagsFromDatasource")
  const tagsList = tags as TagDatasourceEntry[]
  const tag = tagsList.find(
    (tag: TagDatasourceEntry) => normalizeTagSlug(tag.value) === tagSlug
  )

  return tag ? tag.value : null
}
