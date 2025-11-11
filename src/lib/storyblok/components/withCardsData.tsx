import "server-only"

import type { CardsStoryblok } from "@gotpop/system"
import {
  getCachedPostsWithTags as fetchPosts,
  getCachedTags as fetchTags,
} from "@/utils/cached-data"

interface WithCardsDataProps {
  blok: CardsStoryblok
  fetchPosts: typeof fetchPosts
  fetchTags: typeof fetchTags
}

/**
 * HOC that adds data fetching functions to Cards component
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
    return (
      <Component blok={blok} fetchPosts={fetchPosts} fetchTags={fetchTags} />
    )
  }
}
