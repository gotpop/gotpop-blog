import { Suspense } from "react"
import "./FilterContent.css"
import type { FilterContentStoryblok } from "@/types"
import { getAllPostsWithTags, getTagsFromDatasource } from "@/utils/tags"
import { ClientSidePostCard } from "../ClientSidePostCard"
import { FilterContentClient } from "./FilterContentClient"

interface FilterContentProps {
  blok: FilterContentStoryblok
}

export async function FilterContent({ blok }: FilterContentProps) {
  const { use_filters: useFilters } = blok

  const [posts, availableTags] = await Promise.all([
    getAllPostsWithTags(),
    getTagsFromDatasource(),
  ])

  return useFilters ? (
    <Suspense fallback={<div>Loading posts...</div>}>
      <FilterContentClient posts={posts} availableTags={availableTags} />
    </Suspense>
  ) : (
    <div className="posts-grid">
      {posts.map((post) => (
        <ClientSidePostCard key={post.uuid} post={post} />
      ))}
    </div>
  )
}
