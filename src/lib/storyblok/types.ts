export type StoryblokDataResult<T = unknown> = {
  data: T
  error?: string
}

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

export interface BaseConfig {
  version?: "draft" | "published"
}

export interface StoryConfig extends BaseConfig {
  fullPath: string
}

export interface StoriesConfig extends BaseConfig {
  starts_with?: string
  excluding_fields?: string
  filter_query?: {
    component?: {
      in: string
    }
  }
  by_uuids?: string
}

export interface StoryByUuidConfig extends BaseConfig {
  uuid: string
}

export interface StoriesByUuidsConfig extends BaseConfig {
  uuids: string[]
}

export interface DatasourceEntriesConfig {
  datasource: string
}

export interface PostsByTagConfig extends BaseConfig {
  tagName: string
  sortBy?: "date-desc" | "date-asc" | "title-asc" | "title-desc"
}

/** Union type for all possible configurations */
export type StoryblokDataConfig =
  | StoryConfig
  | StoriesConfig
  | StoryByUuidConfig
  | StoriesByUuidsConfig
  | DatasourceEntriesConfig
  | PostsByTagConfig
  | BaseConfig

export interface StoryblokStoryResponse<T = unknown> {
  full_slug: string
  slug: string
  content: T
}

export interface StoryblokStoriesResponse {
  stories: StoryblokStoryResponse[]
}
