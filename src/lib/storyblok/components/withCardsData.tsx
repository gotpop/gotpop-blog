import "server-only"

import type { CardsStoryblok } from "@gotpop/system"
import { Card } from "@gotpop/system"
import { Suspense, type ReactNode } from "react"
import { getCachedPostsWithTags as fetchPosts } from "@/utils/cached-data"

interface WithCardsDataProps {
  blok: CardsStoryblok
  cards: ReactNode
}

/**
 * HOC that fetches posts/tags and renders cards as React nodes
 *
 * Usage:
 * ```tsx
 * const CardsWithData = withCardsData(Cards)
 * ```
 */
export function withCardsData(
  Component: React.ComponentType<WithCardsDataProps>
) {
  return async ({ blok }: { blok: CardsStoryblok }) => {
    const posts = await fetchPosts()

    const cards = (
      <Suspense fallback={<div>Loading posts...</div>}>
        {posts.map((post) => (
          <Card key={post.uuid} post={post} />
        ))}
      </Suspense>
    )

    return <Component blok={blok} cards={cards} />
  }
}
