import "server-only"

import { getConfig } from "../../config/runtime-config"
import type {
  StoryblokDataConfig,
  StoryblokDataResult,
  StoryblokDataType,
  StoryblokStoryResponse,
} from "../../types"

/** Generates static params for pre-rendering pages */
export async function handleStaticParams(
  getStoryblokData: (
    dataType: StoryblokDataType,
    config?: StoryblokDataConfig
  ) => Promise<StoryblokDataResult>
): Promise<StoryblokDataResult> {
  const config = await getConfig()

  if (!config) {
    throw new Error("Config is required for static params generation")
  }

  const prefix = config.root_name_space || "blog"

  const { data: allStories } = (await getStoryblokData("stories", {
    version: "published",
    starts_with: `${prefix}/`,
  })) as { data: StoryblokStoryResponse[] }

  const excluded = ["header", "footer", "site-config", "config", "global"]

  const storyParams = allStories
    .filter((story: StoryblokStoryResponse) => {
      if (excluded.includes(story.full_slug)) return false
      for (const ex of excluded) {
        if (story.full_slug.includes(`/${ex}`)) return false
      }
      return story.full_slug.startsWith(`${prefix}/`)
    })
    .map((story: StoryblokStoryResponse) => {
      let path = story.full_slug

      if (path.startsWith(`${prefix}/`)) {
        path = path.slice(prefix.length + 1)
      }

      if (path === "home" || path === "") {
        path = "/"
      } else {
        path = path.startsWith("/") ? path : `/${path}`
      }

      const slug = path === "/" ? [] : path.slice(1).split("/")

      return { slug }
    })

  return { data: storyParams }
}
