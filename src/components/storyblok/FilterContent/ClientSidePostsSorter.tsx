"use client"

import { useId } from "react"

interface ClientSidePostsSorterProps {
  onSortChange: (sortBy: string) => void
  currentSort: string
}

export default function ClientSidePostsSorter({
  onSortChange,
  currentSort,
}: ClientSidePostsSorterProps) {
  const sortSelectId = useId()

  return (
    <div className="sort-posts">
      <label htmlFor={sortSelectId} className="sort-label">
        Sort by:
      </label>
      <select
        id={sortSelectId}
        value={currentSort}
        onChange={(e) => onSortChange(e.target.value)}
        className="sort-select"
      >
        <option value="published_desc">Newest First</option>
        <option value="published_asc">Oldest First</option>
        <option value="name_asc">Title A-Z</option>
        <option value="name_desc">Title Z-A</option>
      </select>
    </div>
  )
}
