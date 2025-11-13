import "server-only"

import type {
  CardsStoryblok,
  ConfigStoryblok,
  PostProps,
  TagDatasourceEntry,
} from "@gotpop/system"
import type { SbBlokData } from "@storyblok/react/rsc"
import type { ReactNode } from "react"
import { getConfig } from "../config/runtime-config"
import { getStoryblokData } from "../data/get-storyblok-data"
import { StoryblokServerComponent } from "./StoryblokServerComponent"

interface WithCardsDataProps {
  blok: CardsStoryblok
  blocks: ReactNode
  posts: PostProps[]
  availableTags: TagDatasourceEntry[]
  config: ConfigStoryblok | null
}

/** Transforms PostProps data to SbBlokData format for StoryblokServerComponent */
function transformPostToBlok(post: PostProps): SbBlokData {
  return {
    ...post,
    component: "card",
    _uid: post.uuid,
  } as SbBlokData
}

/** Higher-Order Component that fetches posts and tags data for the Cards component */
export function withCardsData(
  ViewComponent: React.ComponentType<WithCardsDataProps>
) {
  return async ({
    blok,
    config: providedConfig,
  }: {
    blok: CardsStoryblok
    config?: ConfigStoryblok | null
  }) => {
    // Use provided config or fetch from cache
    const config = providedConfig ?? (await getConfig())

    const [postsResult, tagsResult] = await Promise.all([
      getStoryblokData("allPostsWithTags"),
      getStoryblokData("tagsFromDatasource"),
    ])

    if (postsResult.error || tagsResult.error) {
      console.error("[withCardsData] Error fetching data:", {
        postsError: postsResult.error,
        tagsError: tagsResult.error,
      })
    }

    const posts = (postsResult.data as PostProps[]) || []
    const availableTags = (tagsResult.data as TagDatasourceEntry[]) || []

    const blocks = posts.map((post) => (
      <StoryblokServerComponent
        key={post.uuid}
        blok={transformPostToBlok(post)}
        config={config}
      />
    ))

    return (
      <ViewComponent
        blok={blok}
        blocks={blocks}
        posts={posts}
        availableTags={availableTags}
        config={config}
      />
    )
  }
}
