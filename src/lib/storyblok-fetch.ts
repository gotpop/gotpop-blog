import "server-only"
import { getStoryblokApi } from "@/lib/storyblok"

/**
 * Fetches a story by UUID from Storyblok
 * @param uuid - The UUID of the story to fetch
 * @param version - The version to fetch ("draft" or "published")
 * @returns The story data or null if not found
 */
export async function fetchStoryByUuid(
  uuid: string,
  version: "draft" | "published" = "draft"
) {
  if (!uuid) {
    console.log("fetchStoryByUuid: No UUID provided")
    return null
  }

  try {
    const storyblokApi = getStoryblokApi()
    const { data } = await storyblokApi.get(`cdn/stories`, {
      version,
      by_uuids: uuid,
    })

    const story = data?.stories?.[0]

    if (!story) {
      console.log("fetchStoryByUuid: No story found for UUID:", uuid)
      return null
    }

    return story
  } catch (error) {
    console.error("fetchStoryByUuid: Error fetching story:", error)
    return null
  }
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
) {
  if (!uuids || uuids.length === 0) {
    console.log("fetchStoriesByUuids: No UUIDs provided")
    return []
  }

  try {
    const storyblokApi = getStoryblokApi()
    const { data } = await storyblokApi.get(`cdn/stories`, {
      version,
      by_uuids: uuids.join(","),
    })

    return data?.stories || []
  } catch (error) {
    console.error("fetchStoriesByUuids: Error fetching stories:", error)
    return []
  }
}
