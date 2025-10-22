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

  return (
    <>
      <div className="posts-filters">
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
      <div className="posts-grid">
        {filteredAndSortedPosts.length > 0 ? (
          filteredAndSortedPosts.map((post) => (
            <PostCard key={post.uuid} post={post} />
          ))
        ) : (
          <p className="no-posts">No posts found for the selected tag.</p>
        )}
      </div>
    </>
  )
}
