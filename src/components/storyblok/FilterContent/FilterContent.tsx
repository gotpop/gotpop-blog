"use client"

import { storyblokEditable } from "@storyblok/react/rsc"
import { usePathname, useRouter } from "next/navigation"
import { useCallback, useEffect, useId, useMemo, useState } from "react"
import type { FilterContentStoryblok } from "@/types/storyblok-components"
import PostCard from "../PostCard"

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

interface FilterContentProps {
  blok: FilterContentStoryblok
}

export default function FilterContent({ blok }: FilterContentProps) {
  const router = useRouter()
  const pathname = usePathname()
  const tagSelectId = useId()
  const sortSelectId = useId()

  const [posts, setPosts] = useState<PostStory[]>([])
  const [availableTags, setAvailableTags] = useState<TagEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [sortBy, setSortBy] = useState<SortOption>("date-desc")

  // Determine current tag from URL
  const currentTag = useMemo(() => {
    if (pathname === "/posts") return "all"
    const match = pathname.match(/^\/posts\/(.+)$/)
    return match ? match[1] : "all"
  }, [pathname])

  // Fetch posts and tags data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const [postsResponse, tagsResponse] = await Promise.all([
          fetch("/api/posts"),
          fetch("/api/tags"),
        ])

        if (postsResponse.ok && tagsResponse.ok) {
          const postsData = await postsResponse.json()
          const tagsData = await tagsResponse.json()
          setPosts(postsData)
          setAvailableTags(tagsData)
        }
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Filter and sort posts
  const filteredAndSortedPosts = useMemo(() => {
    let filteredPosts = posts

    // Filter by tag
    if (currentTag !== "all") {
      filteredPosts = posts.filter((post) => {
        const tags = post.content?.tags || []
        return tags.includes(currentTag)
      })
    }

    // Sort posts
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
  }, [posts, currentTag, sortBy])

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

  if (loading) {
    return (
      <div {...storyblokEditable(blok)} className="filter-content">
        <style>{`
          .filter-content {
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem;
            text-align: center;
          }
        `}</style>
        <div>Loading posts...</div>
      </div>
    )
  }

  return (
    <div {...storyblokEditable(blok)} className="filter-content">
      <style>{`
        .filter-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
        }

        .filter-header {
          margin-bottom: 2rem;
          text-align: center;
        }

        .filter-header h1 {
          font-size: 2.5rem;
          margin-bottom: 0.5rem;
          color: var(--color-text-primary, #1e293b);
        }

        .filter-header p {
          font-size: 1.1rem;
          color: var(--color-text-secondary, #64748b);
        }

        .filter-controls {
          display: flex;
          gap: 2rem;
          margin-bottom: 2rem;
          padding: 1.5rem;
          background: var(--color-background-secondary, #f8fafc);
          border-radius: 8px;
          border: 1px solid var(--color-border, #e2e8f0);
        }

        .filter-tags,
        .filter-sort {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .filter-label {
          font-weight: 600;
          color: var(--color-text-primary, #1e293b);
          font-size: 0.875rem;
        }

        .filter-select {
          padding: 0.75rem 1rem;
          border: 1px solid var(--color-border, #e2e8f0);
          border-radius: 6px;
          background: white;
          font-size: 0.875rem;
          color: var(--color-text-primary, #1e293b);
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }

        .filter-select:focus {
          outline: none;
          border-color: var(--color-primary, #3b82f6);
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .filter-empty {
          text-align: center;
          padding: 3rem;
          color: var(--color-text-secondary, #64748b);
          background: var(--color-background-secondary, #f8fafc);
          border-radius: 8px;
          border: 1px solid var(--color-border, #e2e8f0);
        }

        .posts-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 2rem;
        }

        @media (max-width: 768px) {
          .filter-content {
            padding: 1rem;
          }
          
          .filter-header h1 {
            font-size: 2rem;
          }
          
          .filter-controls {
            flex-direction: column;
            gap: 1rem;
          }
          
          .posts-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
        }

        @media (max-width: 480px) {
          .posts-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

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
    </div>
  )
}
