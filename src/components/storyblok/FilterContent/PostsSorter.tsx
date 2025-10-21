"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useId, useMemo } from "react"

type SortOption = "date-desc" | "date-asc" | "title-asc" | "title-desc"

export default function PostsSorter() {
  const sortSelectId = useId()
  const router = useRouter()
  const searchParams = useSearchParams()

  // Get current sort from URL search params
  const sortBy = useMemo(() => {
    return (searchParams.get("sort") as SortOption) || "date-desc"
  }, [searchParams])

  const handleSortChange = (sort: SortOption) => {
    const params = new URLSearchParams(searchParams)

    if (sort === "date-desc") {
      params.delete("sort") // Remove default sort
    } else {
      params.set("sort", sort)
    }

    const queryString = params.toString()
    const currentPath = window.location.pathname
    router.push(`${currentPath}${queryString ? `?${queryString}` : ""}`)
  }

  return (
    <div className="filter-sort">
      <label htmlFor={sortSelectId} className="filter-label">
        Sort by:
      </label>
      <select
        id={sortSelectId}
        value={sortBy}
        onChange={(e) => handleSortChange(e.target.value as SortOption)}
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
