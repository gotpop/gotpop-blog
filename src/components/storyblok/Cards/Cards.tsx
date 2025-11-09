import { Suspense } from "react"
import "./Cards.css"
import { Card, CardsFilterClient } from "@gotpop/system"
import type { CardsStoryblok } from "@/types"
import { getAllPostsWithTags, getTagsFromDatasource } from "@/utils/tags"

interface CardsProps {
  blok: CardsStoryblok
}

export async function Cards({ blok }: CardsProps) {
  const { use_filters: useClientSideFilters } = blok

  const [posts, availableTags] = await Promise.all([
    getAllPostsWithTags(),
    getTagsFromDatasource(),
  ])

  return useClientSideFilters ? (
    <Suspense fallback={<div>Loading posts...</div>}>
      <CardsFilterClient posts={posts} availableTags={availableTags} />
    </Suspense>
  ) : (
    <div className="grid-cards">
      {posts.map((post) => (
        <Card key={post.uuid} post={post} />
      ))}
    </div>
  )
}
