import type { TagDatasourceEntry } from "@gotpop/system"
import type {
  StoryblokDataConfig,
  StoryblokDataResult,
  StoryblokDataType,
} from "../../core/types"
import { deduplicateTags, HARDCODED_TAGS } from "../../tags"

/** Fetches tags from Storyblok datasource with fallback to posts */
export async function handleTagsFromDatasource(
  getStoryblokData: (
    dataType: StoryblokDataType,
    config?: StoryblokDataConfig
  ) => Promise<StoryblokDataResult>,
  config: StoryblokDataConfig
): Promise<StoryblokDataResult> {
  try {
    const TAGS_DATASOURCE_ID = process.env.STORYBLOK_TAGS_DATASOURCE_ID

    if (!TAGS_DATASOURCE_ID) {
      throw new Error("No datasource ID configured")
    }

    const result = await getStoryblokData("datasourceEntries", {
      datasource: TAGS_DATASOURCE_ID,
    })

    /** If there's an error or empty data, fall back to posts */
    if (result.error || !result.data) {
      throw new Error(result.error || "Datasource empty, falling back to posts")
    }

    const datasourceTags = result.data as TagDatasourceEntry[]

    if (datasourceTags.length > 0) {
      return {
        data: deduplicateTags([...HARDCODED_TAGS, ...datasourceTags]),
      }
    }

    throw new Error("Datasource empty, falling back to posts")
  } catch {
    /** Datasource not available, fall back to extracting tags from posts */
    const { data: postsTagsStory } = (await getStoryblokData(
      "tagsFromPosts",
      config
    )) as { data: TagDatasourceEntry[] }
    return { data: [...HARDCODED_TAGS, ...postsTagsStory] }
  }
}
