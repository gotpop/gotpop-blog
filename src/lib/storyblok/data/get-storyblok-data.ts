import "server-only"

import type { PostProps, TagDatasourceEntry } from "@gotpop/system"
import { getStoryblokApi } from "../storyblok"
import type {
  BaseConfig,
  DatasourceEntriesConfig,
  PostsByTagConfig,
  StoriesByUuidsConfig,
  StoriesConfig,
  StoryByUuidConfig,
  StoryblokDataConfig,
  StoryblokDataResult,
  StoryblokDataType,
  StoryblokStoryResponse,
  StoryConfig,
} from "../types"
import { getErrorMessage } from "../utils/error-handling"
import {
  handleAllPostsWithTags,
  handleAllTagsFromPosts,
  handleAvailableStoriesForError,
  handleDatasourceEntries,
  handlePostsByTag,
  handleStaticParams,
  handleStoriesByUuids,
  handleStoryByUuid,
  handleTagsFromDatasource,
  handleTagsFromPosts,
} from "./handlers"
import { handleStories } from "./handlers/get-stories"
import { handleStory } from "./handlers/get-story"

/** Function overloads for better type inference */
export async function getStoryblokData<T = unknown>(
  dataType: "storyByUuid",
  config: StoryByUuidConfig
): Promise<StoryblokDataResult<StoryblokStoryResponse<T>>>

export async function getStoryblokData(
  dataType: "story",
  config: StoryConfig
): Promise<StoryblokDataResult<StoryblokStoryResponse>>

export async function getStoryblokData(
  dataType: "stories",
  config: StoriesConfig
): Promise<StoryblokDataResult<StoryblokStoryResponse[]>>

export async function getStoryblokData(
  dataType: "storiesByUuids",
  config: StoriesByUuidsConfig
): Promise<StoryblokDataResult<StoryblokStoryResponse[]>>

export async function getStoryblokData(
  dataType: StoryblokDataType,
  config?: StoryblokDataConfig
): Promise<StoryblokDataResult>

/** Unified Storyblok data fetching function */
export async function getStoryblokData(
  dataType: StoryblokDataType,
  config: StoryblokDataConfig = {}
): Promise<StoryblokDataResult> {
  try {
    const storyblokApi = getStoryblokApi()

    switch (dataType) {
      case "story":
        return handleStory(storyblokApi, config as StoryConfig)

      case "stories":
        return handleStories(storyblokApi, config as StoriesConfig)

      case "storyByUuid":
        return handleStoryByUuid(storyblokApi, config as StoryByUuidConfig)

      case "storiesByUuids":
        return handleStoriesByUuids(
          storyblokApi,
          config as StoriesByUuidsConfig
        )

      case "datasourceEntries":
        return handleDatasourceEntries(
          storyblokApi,
          config as DatasourceEntriesConfig
        )

      case "tagsFromDatasource":
        return handleTagsFromDatasource(getStoryblokData, config)

      case "tagsFromPosts":
        return handleTagsFromPosts(getStoryblokData)

      case "postsByTag":
        return handlePostsByTag(getStoryblokData, config as PostsByTagConfig)

      case "allPostsWithTags":
        return handleAllPostsWithTags(getStoryblokData, config as BaseConfig)

      case "allTagsFromPosts":
        return handleAllTagsFromPosts(getStoryblokData, config as BaseConfig)

      case "availableStoriesForError":
        return handleAvailableStoriesForError(getStoryblokData)

      case "staticParams":
        return handleStaticParams(getStoryblokData)

      default:
        return { data: null, error: `Unknown data type: ${dataType}` }
    }
  } catch (error) {
    const errorMessage = getErrorMessage(error)

    /* For datasource errors, provide a more helpful message */
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

/** Gets all posts from the blog with their tags, only returns actual blog posts (page_post component) that have tags */
export async function getAllPostsWithTags(): Promise<PostProps[]> {
  const { data } = await getStoryblokData("allPostsWithTags")
  return data as PostProps[]
}

/** Fetches all tags from the Storyblok tags datasource, falls back to extracting tags from posts if datasource is not available */
export async function getTagsFromDatasource(): Promise<TagDatasourceEntry[]> {
  const { data } = await getStoryblokData("tagsFromDatasource")
  return data as TagDatasourceEntry[]
}
