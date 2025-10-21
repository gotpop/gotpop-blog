import PostsFilter from "../PostsFilter"
import type { PostStory, TagDatasourceEntry } from "@/utils/tags"

interface FilterContentProps {
  tagSlug?: string
  initialPosts?: PostStory[]
  availableTags?: TagDatasourceEntry[]
}

export default function FilterContent({
  tagSlug = "all",
  initialPosts = [],
  availableTags = [],
}: FilterContentProps) {
  return (
    <PostsFilter
      initialPosts={initialPosts}
      availableTags={availableTags}
      selectedTag={tagSlug}
    />
  )
}
