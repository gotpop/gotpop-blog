"use client"

import type { PostProps } from "@gotpop/system"
import { Card } from "@gotpop/system"
import { startTransition, ViewTransition } from "react"
import type { TagDatasourceEntry } from "@/utils/tags"
import { CardsControl } from "../CardsControl"
import { usePostsFilter } from "./use-posts-filter"

const SORT_OPTIONS = [
  { value: "published_desc", label: "Newest First" },
  { value: "published_asc", label: "Oldest First" },
  { value: "name_asc", label: "Title A-Z" },
  { value: "name_desc", label: "Title Z-A" },
]

interface FilterContentClientProps {
  posts: PostProps[]
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

  // Transform tags for CardsControl options format
  const tagOptions = [
    { value: "all", label: "All Posts" },
    ...availableTags.map((tag) => ({
      value: tag.value,
      label: tag.name,
    })),
  ]

  const output =
    filteredAndSortedPosts.length > 0 &&
    filteredAndSortedPosts.map((post) => <Card key={post.uuid} post={post} />)

  return (
    <div className="filters-with-output">
      <box-grid auto-columns>
        <CardsControl
          label="Filter"
          value={currentTag}
          onChange={handleTagChange}
          options={tagOptions}
        />
        <CardsControl
          label="Sort"
          value={currentSort}
          onChange={handleSortChange}
          options={SORT_OPTIONS}
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
