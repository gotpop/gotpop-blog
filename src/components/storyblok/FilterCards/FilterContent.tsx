import { Suspense } from "react"
import "./FilterContent.css"
import { Card } from "@gotpop/system"
import type { CardsStoryblok } from "@/types"
import { getAllPostsWithTags, getTagsFromDatasource } from "@/utils/tags"
import { CardsFilterClient } from "../CardsFilter"

interface FilterContentProps {
  blok: CardsStoryblok
}

export async function FilterContent({ blok }: FilterContentProps) {
  const { use_filters: useFilters } = blok

  const [posts, availableTags] = await Promise.all([
    getAllPostsWithTags(),
    getTagsFromDatasource(),
  ])

  return useFilters ? (
    <Suspense fallback={<div>Loading posts...</div>}>
      <CardsFilterClient posts={posts} availableTags={availableTags} />
    </Suspense>
  ) : (
    <div className="posts-grid">
      {posts.map((post) => (
        <Card key={post.uuid} post={post} />
      ))}
    </div>
  )
}
