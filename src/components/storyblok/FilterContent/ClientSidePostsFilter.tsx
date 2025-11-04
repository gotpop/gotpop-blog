"use client"

import { useId } from "react"
import "./ClientSidePostsFilter.css"

interface TagEntry {
  name: string
  value: string
  id: number
}

interface ClientSidePostsFilterProps {
  availableTags: TagEntry[]
  onTagChange: (tag: string) => void
  currentTag: string
}

export default function ClientSidePostsFilter({
  availableTags,
  onTagChange,
  currentTag,
}: ClientSidePostsFilterProps) {
  const tagSelectId = useId()

  return (
    <div className="select-wrap">
      <label htmlFor={tagSelectId} className="select-label">
        Filter:
      </label>
      <select
        id={tagSelectId}
        value={currentTag}
        onChange={(e) => onTagChange(e.target.value)}
        className="select"
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
