"use client"

import { usePathname, useRouter } from "next/navigation"
import { useCallback, useMemo, useState } from "react"
import type { FilterContentStoryblok } from "@/types/storyblok-components"
import PostCard from "./PostCard"
import PostsFilter from "./PostsFilter"
import PostsSorter from "./PostsSorter"

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
  blok: FilterContentStoryblok
  initialPosts: PostStory[]
  availableTags: TagEntry[]
}

export default function PostsGrid({
  blok,
  initialPosts,
  availableTags,
}: PostsGridProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [sortBy, setSortBy] = useState<SortOption>("date-desc")

  // Determine current tag from URL
  const currentTag = useMemo(() => {
    if (pathname === "/posts") return "all"
    const match = pathname.match(/^\/posts\/(.+)$/)
    return match ? match[1] : "all"
  }, [pathname])

  const filteredAndSortedPosts = useMemo(() => {
    let filteredPosts = initialPosts

    if (currentTag !== "all") {
      filteredPosts = initialPosts.filter((post) => {
        const tags = post.content?.tags || []

        return tags.includes(currentTag)
      })
    }

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

  const handleTagChange = useCallback(
    (tag: string) => {
      if (tag === "all") {
        router.push("/posts")
      } else {
        router.push(`/posts/${tag}`)
      }
    },
    [router]
  )

  const handleSortChange = useCallback((sort: SortOption) => {
    setSortBy(sort)
  }, [])

  const selectedTagName =
    currentTag === "all"
      ? "All Posts"
      : availableTags.find((t) => t.value === currentTag)?.name || currentTag

  return (
    <>
      <div className="filter-header">
        <h1>
          {blok.Heading ||
            `Posts${currentTag !== "all" ? ` tagged with "${selectedTagName}"` : ""}`}
        </h1>
        <p>
          {blok.description ||
            `${filteredAndSortedPosts.length} post${filteredAndSortedPosts.length !== 1 ? "s" : ""} found`}
        </p>
      </div>

      <div className="filter-controls">
        <PostsFilter
          currentTag={currentTag}
          availableTags={availableTags}
          onTagChange={handleTagChange}
        />
        <PostsSorter sortBy={sortBy} onSortChange={handleSortChange} />
      </div>

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
