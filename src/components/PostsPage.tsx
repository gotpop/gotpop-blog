import { getInlineStyles } from "@/utils/inline-styles"
import { getAllPostsWithTags } from "@/utils/tags"
import PostCard from "./storyblok/FilterContent/ClientSidePostCard"

interface PostsPageProps {
  currentTag?: string
}

export default async function PostsPage({
  currentTag = "all",
}: PostsPageProps) {
  const styles = getInlineStyles("FilterContent.css")
  const posts = await getAllPostsWithTags()

  const filteredPosts =
    currentTag === "all"
      ? posts
      : posts.filter((post) => {
          const tags = post.content?.tags || []
          return tags.includes(currentTag)
        })

  const title =
    currentTag === "all" ? "All Posts" : `Posts tagged with "${currentTag}"`
  const description =
    currentTag === "all"
      ? `Browse our ${posts.length} posts`
      : `Browse all posts tagged with "${currentTag}"`

  return (
    <>
      {styles && <style>{styles}</style>}
      <div className="filter-header">
        <h1>{title}</h1>
        <p>{description}</p>
      </div>

      <div className="filter-controls">
        <div className="filter-tags">
          <span className="filter-label">
            {currentTag === "all" ? "All Posts" : `Filtered by: ${currentTag}`}
          </span>
        </div>
      </div>

      <div className="posts-grid">
        {filteredPosts.map((post) => (
          <PostCard key={post.uuid} post={post} />
        ))}
        {filteredPosts.length === 0 && (
          <div className="filter-empty">
            <p>
              No posts found
              {currentTag !== "all" && ` with the tag "${currentTag}"`}.
            </p>
          </div>
        )}
      </div>
    </>
  )
}
