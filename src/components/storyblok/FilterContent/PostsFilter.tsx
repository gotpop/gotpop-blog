"use client"

import { usePathname, useRouter } from "next/navigation"
import { useId, useMemo } from "react"

interface TagEntry {
  name: string
  value: string
  id: number
}

interface PostsFilterProps {
  availableTags: TagEntry[]
}

export default function PostsFilter({ availableTags }: PostsFilterProps) {
  const tagSelectId = useId()
  const router = useRouter()
  const pathname = usePathname()

  // Get current tag from URL path
  const currentTag = useMemo(() => {
    if (pathname === "/posts") return "all"
    const match = pathname.match(/^\/posts\/(.+)$/)
    return match ? match[1] : "all"
  }, [pathname])

  const handleTagChange = (tag: string) => {
    if (tag === "all") {
      router.push("/posts")
    } else {
      router.push(`/posts/${tag}`)
    }
  }

  return (
    <div className="filter-tags">
      <label htmlFor={tagSelectId} className="filter-label">
        Filter by tag:
      </label>
      <select
        id={tagSelectId}
        value={currentTag}
        onChange={(e) => handleTagChange(e.target.value)}
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
