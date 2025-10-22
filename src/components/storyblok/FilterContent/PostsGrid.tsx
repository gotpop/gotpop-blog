"use client"

import { usePathname, useSearchParams } from "next/navigation"
import { useMemo } from "react"
import PostCard from "./PostCard"

type SortOption = "date-desc" | "date-asc" | "title-asc" | "title-desc"

interface PostStory {
  uuid: string
  name: string
  full_slug: string
  published_at: string
  content: {
    tags?: string[]
    component: string
    Heading?: string
    description?: string
    [key: string]: unknown
  }
}

interface TagEntry {
  name: string
  value: string
  id: number
}

interface PostsGridProps {
  initialPosts: PostStory[]
  availableTags: TagEntry[]
  currentTag?: string
  sortBy?: SortOption
}

export default function PostsGrid({
  initialPosts,
  availableTags,
  currentTag: serverCurrentTag,
  sortBy: serverSortBy,
}: PostsGridProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Use server-provided values during SSG, fall back to client-side hooks for client-side navigation
  const currentTag = useMemo(() => {
    if (serverCurrentTag !== undefined) return serverCurrentTag
    if (pathname === "/posts") return "all"
    const match = pathname.match(/^\/posts\/(.+)$/)
    return match ? match[1] : "all"
  }, [pathname, serverCurrentTag])

  // Get current sort from URL search params or server
  const sortBy = useMemo(() => {
    if (serverSortBy) return serverSortBy
    return (searchParams.get("sort") as SortOption) || "date-desc"
  }, [searchParams, serverSortBy])

  // Filter and sort posts based on URL state
  const filteredAndSortedPosts = useMemo(() => {
    let filteredPosts = initialPosts

    // Filter by tag from URL path
    if (currentTag !== "all") {
      filteredPosts = initialPosts.filter((post) => {
        const tags = post.content?.tags || []
        return tags.includes(currentTag)
      })
    }

    // Sort posts based on URL search param
    const sortedPosts = [...filteredPosts].sort((a, b) => {
      switch (sortBy) {
        case "date-desc":
          return (
            new Date(b.published_at).getTime() -
            new Date(a.published_at).getTime()
          )
        case "date-asc":
          return (
            new Date(a.published_at).getTime() -
            new Date(b.published_at).getTime()
          )
        case "title-asc": {
          const titleA = a.content?.Heading || a.name || ""
          const titleB = b.content?.Heading || b.name || ""
          return titleA.localeCompare(titleB)
        }
        case "title-desc": {
          const titleA = a.content?.Heading || a.name || ""
          const titleB = b.content?.Heading || b.name || ""
          return titleB.localeCompare(titleA)
        }
        default:
          return 0
      }
    })

    return sortedPosts
  }, [initialPosts, currentTag, sortBy])

  const selectedTagName =
    currentTag === "all"
      ? "All Posts"
      : availableTags.find((t) => t.value === currentTag)?.name || currentTag

  return (
    <>
      <div className="posts-grid">
        {filteredAndSortedPosts.map((post) => (
          <PostCard key={post.uuid} post={post} />
        ))}
      </div>

      {filteredAndSortedPosts.length === 0 && (
        <div className="filter-empty">
          <p>
            No posts found
            {currentTag !== "all" && ` with the tag "${selectedTagName}"`}.
          </p>
        </div>
      )}
    </>
  )
}
