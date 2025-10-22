import type { FilterContentStoryblok } from "@/types/storyblok-components"
import { getInlineStyles } from "@/utils/inline-styles"
import { getAllPostsWithTags } from "@/utils/tags"
import PostCard from "./PostCard"

interface FilterContentProps {
  blok: FilterContentStoryblok
}

export default async function FilterContent({ blok }: FilterContentProps) {
  const styles = getInlineStyles("FilterContent.css")
  const posts = await getAllPostsWithTags()

  return (
    <>
      {styles && <style>{styles}</style>}
      <div className="filter-header">
        <h1>{blok.Heading || "Posts"}</h1>
        <p>{blok.description || `Browse our ${posts.length} posts`}</p>
      </div>

      <div className="filter-controls">
        <div className="filter-tags">
          <span className="filter-label">All Posts</span>
        </div>
      </div>

      <div className="posts-grid">
        {posts.map((post) => (
          <PostCard key={post.uuid} post={post} />
        ))}
        {posts.length === 0 && (
          <div className="filter-empty">
            <p>No posts found.</p>
          </div>
        )}
      </div>
    </>
  )
}
