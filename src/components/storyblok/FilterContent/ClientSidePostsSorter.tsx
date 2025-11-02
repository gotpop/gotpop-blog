"use client"

import { useId } from "react"

const SORT_OPTIONS = {
  published_desc: "Newest First",
  published_asc: "Oldest First",
  name_asc: "Title A-Z",
  name_desc: "Title Z-A",
} as const

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
    <div className="select-wrap">
      <label htmlFor={sortSelectId} className="select-label">
        Sort:
      </label>
      <select
        id={sortSelectId}
        value={currentSort}
        onChange={(e) => onSortChange(e.target.value)}
        className="select"
      >
        {Object.entries(SORT_OPTIONS).map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  )
}
