"use client"

import { startTransition, ViewTransition } from "react"
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

  // Wrap filter/sort changes in startTransition for ViewTransition
  const handleTagChange = (tag: string) => {
    startTransition(() => {
      setCurrentTag(tag)
    })
  }

  const handleSortChange = (sort: string) => {
    startTransition(() => {
      setCurrentSort(sort)
    })
  }

  const output =
    filteredAndSortedPosts.length > 0 &&
    filteredAndSortedPosts.map((post) => (
      <PostCard key={post.uuid} post={post} />
    ))

  return (
    <div className="filters-with-output">
      <box-hero>
        <box-grid auto-columns>
          <ClientSidePostsFilter
            availableTags={availableTags}
            onTagChange={handleTagChange}
            currentTag={currentTag}
          />
          <ClientSidePostsSorter
            onSortChange={handleSortChange}
            currentSort={currentSort}
          />
        </box-grid>
      </box-hero>
      <ViewTransition update="reorder-list">
        <output className="posts-grid" aria-live="polite">
          {output}
        </output>
      </ViewTransition>
    </div>
  )
}
