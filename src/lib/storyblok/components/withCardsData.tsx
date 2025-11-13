import "server-only"

import type {
  CardsStoryblok,
  ConfigStoryblok,
  PostProps,
  TagDatasourceEntry,
} from "@gotpop/system"
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

    const posts = postsResult.data as PostProps[]
    const availableTags = tagsResult.data as TagDatasourceEntry[]

    const blocks = posts.map((postBlok) => {
      const transformedBlok = {
        ...postBlok,
        component: "card",
        _uid: postBlok.uuid,
      }

      return (
        <StoryblokServerComponent
          key={postBlok.uuid}
          blok={transformedBlok as never}
          config={config}
        />
      )
    })

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
