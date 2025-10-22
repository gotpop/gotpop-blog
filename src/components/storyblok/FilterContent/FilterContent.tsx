import { storyblokEditable } from "@storyblok/react/rsc"
import { Suspense } from "react"
import type { FilterContentStoryblok } from "@/types/storyblok-components"
import { getInlineStyles } from "@/utils/inline-styles"
import { getAllPostsWithTags, getTagsFromDatasource } from "@/utils/tags"
import ClientSidePostsApp from "./ClientSidePostsApp"

interface FilterContentProps {
  blok: FilterContentStoryblok
}

export default async function FilterContent({ blok }: FilterContentProps) {
  const styles = getInlineStyles("FilterContent")

  // Fetch data server-side
  const [posts, availableTags] = await Promise.all([
    getAllPostsWithTags(),
    getTagsFromDatasource(),
  ])

  return (
    <>
      {styles && <style>{styles}</style>}
      <div {...storyblokEditable(blok)} className="filter-content">
        <div className="filter-header">
          <h1>{blok.Heading || "Posts"}</h1>
          <p>{blok.description || `Browse our ${posts.length} posts`}</p>
        </div>

        <Suspense fallback={<div>Loading posts...</div>}>
          <ClientSidePostsApp posts={posts} availableTags={availableTags} />
        </Suspense>
      </div>
    </>
  )
}
