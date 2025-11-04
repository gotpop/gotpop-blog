import { Suspense } from "react"
import "./FilterContent.css"
import { getAllPostsWithTags, getTagsFromDatasource } from "@/utils/tags"
import ClientSidePostsApp from "./ClientSidePostsApp"

export async function FilterContent() {
  const [posts, availableTags] = await Promise.all([
    getAllPostsWithTags(),
    getTagsFromDatasource(),
  ])

  return (
    <Suspense fallback={<div>Loading posts...</div>}>
      <ClientSidePostsApp posts={posts} availableTags={availableTags} />
    </Suspense>
  )
}
