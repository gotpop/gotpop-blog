import "server-only"

import type {
  CardsStoryblok,
  ConfigStoryblok,
  PostProps,
  TagDatasourceEntry,
} from "@gotpop/system"
import { Card } from "@gotpop/system"
import type { ReactNode } from "react"
import { getConfig, getStoryblokData } from "../data/get-storyblok-data"

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
  return async ({ blok }: { blok: CardsStoryblok }) => {
    const [postsResult, tagsResult, config] = await Promise.all([
      getStoryblokData("allPostsWithTags"),
      getStoryblokData("tagsFromDatasource"),
      getConfig(),
    ])

    const posts = postsResult.data as PostProps[]
    const availableTags = tagsResult.data as TagDatasourceEntry[]

    const blocks = posts.map((blok) => (
      <Card key={blok.uuid} blok={blok} config={config} />
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
