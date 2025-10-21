import { getPostsByTag } from "@/utils/tags"
import { StoryblokStory } from "@storyblok/react/rsc"
import { getInlineStyles } from "@/utils/inline-styles"
import type { FilterContentStoryblok } from "@/types/storyblok-components"

interface FilterContentProps {
  blok: FilterContentStoryblok
}

export default async function FilterContent({ blok }: FilterContentProps) {
  const styles = getInlineStyles("FilterContent.css")

  const posts = await getPostsByTag("tags")

  return (
    <div className="tag-page">
      {styles && <style>{styles}</style>}
      <div className="tag-header">
        <h1>{blok.heading}</h1>
        <p>{blok.subheading}</p>
      </div>

      <div className="posts-grid">
        {posts.map((post) => (
          <article key={post.uuid} className="post-preview">
            <StoryblokStory story={post} />
          </article>
        ))}
      </div>
    </div>
  )
}
