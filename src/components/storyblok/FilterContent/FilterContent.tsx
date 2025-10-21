import type { FilterContentStoryblok } from "@/types/storyblok-components"
import { getInlineStyles } from "@/utils/inline-styles"
import { getAllPostsWithTags, getTagsFromDatasource } from "@/utils/tags"
import PostsGrid from "./PostsGrid"
import PostsFilter from "./PostsFilter"
import PostsSorter from "./PostsSorter"

interface FilterContentProps {
  blok: FilterContentStoryblok
}

export default async function FilterContent({ blok }: FilterContentProps) {
  const styles = getInlineStyles("FilterContent.css")

  const [posts, availableTags] = await Promise.all([
    getAllPostsWithTags(),
    getTagsFromDatasource(),
  ])

  return (
    <>
      {styles && <style>{styles}</style>}
      <div className="filter-header">
        <h1>{blok.Heading || "Posts"}</h1>
        <p>{blok.description || `Browse our ${posts.length} posts`}</p>
      </div>

      <div className="filter-controls">
        <PostsFilter availableTags={availableTags} />
        <PostsSorter />
      </div>

      <PostsGrid initialPosts={posts} availableTags={availableTags} />
    </>
  )
}
