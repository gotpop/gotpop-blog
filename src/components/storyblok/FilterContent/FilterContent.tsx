import { Suspense } from "react"
import "./FilterContent.css"
import { getAllPostsWithTags, getTagsFromDatasource } from "@/utils/tags"
import { FilterContentClient } from "./FilterContentClient"

export async function FilterContent() {
  const [posts, availableTags] = await Promise.all([
    getAllPostsWithTags(),
    getTagsFromDatasource(),
  ])

  return (
    <Suspense fallback={<div>Loading posts...</div>}>
      <FilterContentClient posts={posts} availableTags={availableTags} />
    </Suspense>
  )
}
