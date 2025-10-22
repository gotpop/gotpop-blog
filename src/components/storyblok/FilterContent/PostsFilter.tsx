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
  currentTag?: string
}

export default function PostsFilter({
  availableTags,
  currentTag: serverCurrentTag,
}: PostsFilterProps) {
  const tagSelectId = useId()
  const router = useRouter()
  const pathname = usePathname()

  // Use server-provided value during SSG, fall back to client-side hook for client-side navigation
  const currentTag = useMemo(() => {
    if (serverCurrentTag !== undefined) return serverCurrentTag
    if (pathname === "/posts") return "all"
    const match = pathname.match(/^\/posts\/(.+)$/)
    return match ? match[1] : "all"
  }, [pathname, serverCurrentTag])

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
