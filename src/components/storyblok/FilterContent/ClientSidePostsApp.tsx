"use client"

import type { PostStory, TagDatasourceEntry } from "@/utils/tags"
import PostCard from "./ClientSidePostCard"
import ClientSidePostsFilter from "./ClientSidePostsFilter"
import ClientSidePostsSorter from "./ClientSidePostsSorter"
import { usePostsFilter } from "./use-posts-filter"

interface ClientSidePostsAppProps {
  posts: PostStory[]
  availableTags: TagDatasourceEntry[]
}

export default function ClientSidePostsApp({
  posts,
  availableTags,
}: ClientSidePostsAppProps) {
  const {
    currentTag,
    setCurrentTag,
    currentSort,
    setCurrentSort,
    filteredAndSortedPosts,
  } = usePostsFilter(posts)

  const output =
    filteredAndSortedPosts.length > 0 &&
    filteredAndSortedPosts.map((post) => (
      <PostCard key={post.uuid} post={post} />
    ))

  return (
    <div className="filters-with-output">
      <div className="posts-filters">
        <div className="hero-content">
          <ClientSidePostsFilter
            availableTags={availableTags}
            onTagChange={setCurrentTag}
            currentTag={currentTag}
          />
          <ClientSidePostsSorter
            onSortChange={setCurrentSort}
            currentSort={currentSort}
          />
        </div>
      </div>
      <output className="posts-grid" aria-live="polite">
        {output}
      </output>
    </div>
  )
}
