import "server-only"

import type {
  CardsStoryblok,
  PostProps,
  TagDatasourceEntry,
} from "@gotpop/system"
import { Card } from "@gotpop/system"
import type { ReactNode } from "react"
import type { ConfigStoryblok } from "@/types/storyblok-components"
import { getStoryblokData } from "../data/get-storyblok-data"

interface WithCardsDataProps {
  blok: CardsStoryblok
  blocks: ReactNode
  posts: PostProps[]
  availableTags: TagDatasourceEntry[]
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
    const configPath = `blog/config`
    const { data: configStory } = await getStoryblokData("story", {
      fullPath: configPath,
    })

    config = (configStory as { content: ConfigStoryblok }).content

    // Render Card components directly (Card is not a Storyblok component)
    const blocks = posts.map((post) => (
      <Card key={post.uuid} post={post} config={config} />
    ))

    return (
      <Component
        blok={blok}
        blocks={blocks}
        posts={posts}
        availableTags={availableTags}
      />
    )
  }
}
