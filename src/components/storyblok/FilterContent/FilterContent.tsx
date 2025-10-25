import { Suspense } from "react"
import type { FilterContentStoryblok } from "@/types/storyblok-components"
import { getInlineStyles } from "@/utils/inline-styles"
import { getAllPostsWithTags, getTagsFromDatasource } from "@/utils/tags"
import ClientSidePostsApp from "./ClientSidePostsApp"

interface FilterContentProps {
  blok: FilterContentStoryblok
}

export default async function FilterContent({ blok }: FilterContentProps) {
  const styles = getInlineStyles("FilterContent.css")
  const stylesCard = getInlineStyles("FilterContent/ClientSidePostCard.css")

  const stylesFilter = getInlineStyles(
    "FilterContent/ClientSidePostsFilter.css"
  )

  const [posts, availableTags] = await Promise.all([
    getAllPostsWithTags(),
    getTagsFromDatasource(),
  ])

  return (
    <>
      {styles && <style>{styles}</style>}
      {stylesCard && <style>{stylesCard}</style>}
      {stylesFilter && <style>{stylesFilter}</style>}

      <Suspense fallback={<div>Loading posts...</div>}>
        <ClientSidePostsApp posts={posts} availableTags={availableTags} />
      </Suspense>
    </>
  )
}
