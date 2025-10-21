"use client"

import { useId } from "react"

interface TagEntry {
  name: string
  value: string
  id: number
}

interface PostsFilterProps {
  currentTag: string
  availableTags: TagEntry[]
  onTagChange: (tag: string) => void
}

export default function PostsFilter({
  currentTag,
  availableTags,
  onTagChange,
}: PostsFilterProps) {
  const tagSelectId = useId()

  return (
    <div className="filter-tags">
      <label htmlFor={tagSelectId} className="filter-label">
        Filter by tag:
      </label>
      <select
        id={tagSelectId}
        value={currentTag}
        onChange={(e) => onTagChange(e.target.value)}
        className="filter-select"
      >
        <option value="all">All Posts</option>
        {availableTags.map((tag) => (
          <option key={tag.value} value={tag.value}>
            {tag.name}
          </option>
        ))}
      </select>
    </div>
  )
}
