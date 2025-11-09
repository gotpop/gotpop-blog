import "server-only"
import { getStoryblokData } from "@/lib/storyblok-unified-data"
import type { StoryblokStoryResponse } from "@/types/storyblok"

/**
 * Fetches a story by UUID from Storyblok
 * @param uuid - The UUID of the story to fetch
 * @param version - The version to fetch ("draft" or "published")
 * @returns The story data or null if not found
 */
export async function fetchStoryByUuid(
  uuid: string,
  version: "draft" | "published" = "draft"
): Promise<StoryblokStoryResponse | null> {
  if (!uuid) {
    console.log("fetchStoryByUuid: No UUID provided")
    return null
  }

  const { data, error } = await getStoryblokData("storyByUuid", {
    uuid,
    version,
  })

  if (error) {
    console.error("fetchStoryByUuid: Error fetching story:", error)
    return null
  }

  return data as StoryblokStoryResponse
}

/**
 * Fetches multiple stories by their UUIDs from Storyblok
 * @param uuids - Array of UUIDs to fetch
 * @param version - The version to fetch ("draft" or "published")
 * @returns Array of story data
 */
export async function fetchStoriesByUuids(
  uuids: string[],
  version: "draft" | "published" = "draft"
): Promise<StoryblokStoryResponse[]> {
  if (!uuids || uuids.length === 0) {
    console.log("fetchStoriesByUuids: No UUIDs provided")
    return []
  }

  const { data, error } = await getStoryblokData("storiesByUuids", {
    uuids,
    version,
  })

  if (error) {
    console.error("fetchStoriesByUuids: Error fetching stories:", error)
    return []
  }

  return (data || []) as StoryblokStoryResponse[]
}
