import { Suspense, useId } from "react"
import type { FilterContentStoryblok } from "@/types/storyblok-components"
import { getInlineStyles } from "@/utils/inline-styles"
import { getAllPostsWithTags, getTagsFromDatasource } from "@/utils/tags"
import Typography from "../Typography"
import ClientSidePostsApp from "./ClientSidePostsApp"

interface FilterContentProps {
  blok: FilterContentStoryblok
}

export default async function FilterContent({ blok }: FilterContentProps) {
  const { heading, subheading } = blok
  const id = useId()

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

      <section className="filter-header" aria-labelledby={id}>
        <Typography tag="h1" variant="lg" shade="dark" id={id}>
          {heading}
        </Typography>
        <Typography tag="p" variant="base" shade="dark">
          {subheading}
        </Typography>
      </section>

      <Suspense fallback={<div>Loading posts...</div>}>
        <ClientSidePostsApp posts={posts} availableTags={availableTags} />
      </Suspense>
    </>
  )
}
