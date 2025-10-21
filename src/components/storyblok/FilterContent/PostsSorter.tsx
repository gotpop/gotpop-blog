"use client"

import { useId } from "react"

type SortOption = "date-desc" | "date-asc" | "title-asc" | "title-desc"

interface PostsSorterProps {
  sortBy: SortOption
  onSortChange: (sort: SortOption) => void
}

export default function PostsSorter({
  sortBy,
  onSortChange,
}: PostsSorterProps) {
  const sortSelectId = useId()

  return (
    <div className="filter-sort">
      <label htmlFor={sortSelectId} className="filter-label">
        Sort by:
      </label>
      <select
        id={sortSelectId}
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value as SortOption)}
        className="filter-select"
      >
        <option value="date-desc">Newest First</option>
        <option value="date-asc">Oldest First</option>
        <option value="title-asc">Title A-Z</option>
        <option value="title-desc">Title Z-A</option>
      </select>
    </div>
  )
}
