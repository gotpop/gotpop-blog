"use client"

import { startTransition, ViewTransition } from "react"
import type { PostStory, TagDatasourceEntry } from "@/utils/tags"
import { ClientSidePostCard } from "../ClientSidePostCard/ClientSidePostCard"
import { ClientSidePostsFilter } from "../ClientSidePostsFilter/ClientSidePostsFilter"
import ClientSidePostsSorter from "../ClientSidePostsFilter/ClientSidePostsSorter"
import { usePostsFilter } from "./use-posts-filter"

interface FilterContentClientProps {
  posts: PostStory[]
  availableTags: TagDatasourceEntry[]
}

export function FilterContentClient({
  posts,
  availableTags,
}: FilterContentClientProps) {
  const {
    currentSort,
    currentTag,
    filteredAndSortedPosts,
    setCurrentSort,
    setCurrentTag,
  } = usePostsFilter(posts)

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
      <ClientSidePostCard key={post.uuid} post={post} />
    ))

  return (
    <div className="filters-with-output">
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
      <ViewTransition update="reorder-list">
        <output className="posts-grid" aria-live="polite">
          {output}
        </output>
      </ViewTransition>
    </div>
  )
}
