import "server-only"

import type {
  CardsStoryblok,
  PostProps,
  TagDatasourceEntry,
} from "@gotpop/system"
import { Card } from "@gotpop/system"
import type { ReactNode } from "react"
import type { ConfigStoryblok } from "@/types/storyblok-components"
import { CONTENT_PREFIX } from "../config"
import { getStoryblokData } from "../data/get-storyblok-data"

interface WithCardsDataProps {
  blok: CardsStoryblok
  blocks: ReactNode
  posts: PostProps[]
  availableTags: TagDatasourceEntry[]
  config: ConfigStoryblok | null
  contentPrefix: string
}

export function withCardsData(
  Component: React.ComponentType<WithCardsDataProps>
) {
  return async ({ blok }: { blok: CardsStoryblok }) => {
    const [postsResult, tagsResult] = await Promise.all([
      getStoryblokData("allPostsWithTags"),
      getStoryblokData("tagsFromDatasource"),
    ])

    const posts = postsResult.data as PostProps[]
    const availableTags = tagsResult.data as TagDatasourceEntry[]

    let config: ConfigStoryblok | null = null
    const configPath = `${CONTENT_PREFIX}/config`
    const { data: configStory } = await getStoryblokData("story", {
      fullPath: configPath,
    })

    config = (configStory as { content: ConfigStoryblok }).content

    const blocks = posts.map((blok) => (
      <Card
        key={blok.uuid}
        blok={blok}
        config={config}
        contentPrefix={CONTENT_PREFIX}
      />
    ))

    return (
      <Component
        blok={blok}
        blocks={blocks}
        posts={posts}
        availableTags={availableTags}
        config={config}
        contentPrefix={CONTENT_PREFIX}
      />
    )
  }
}
