"use client"

import { useMemo, useState } from "react"
import type { PostStory, TagDatasourceEntry } from "@/utils/tags"
import ClientSidePostsFilter from "./ClientSidePostsFilter"
import ClientSidePostsSorter from "./ClientSidePostsSorter"
import PostCard from "./PostCard"

interface ClientSidePostsAppProps {
  posts: PostStory[]
  availableTags: TagDatasourceEntry[]
}

export default function ClientSidePostsApp({
  posts,
  availableTags,
}: ClientSidePostsAppProps) {
  const [currentTag, setCurrentTag] = useState("all")
  const [currentSort, setCurrentSort] = useState("published_desc")

  const filteredAndSortedPosts = useMemo(() => {
    // Filter posts by tag
    let filtered = posts
    if (currentTag !== "all") {
      filtered = posts.filter((post) =>
        post.content?.tags?.some(
          (tag: string) => tag.toLowerCase() === currentTag.toLowerCase()
        )
      )
    }

    // Sort posts
    const sorted = [...filtered].sort((a, b) => {
      switch (currentSort) {
        case "published_desc":
          return (
            new Date(b.published_at).getTime() -
            new Date(a.published_at).getTime()
          )
        case "published_asc":
          return (
            new Date(a.published_at).getTime() -
            new Date(b.published_at).getTime()
          )
        case "name_asc":
          return a.name.localeCompare(b.name)
        case "name_desc":
          return b.name.localeCompare(a.name)
        default:
          return 0
      }
    })

    return sorted
  }, [posts, currentTag, currentSort])

  return (
    <div className="posts-container">
      <style>{`
        .posts-container {
          width: 100%;
        }

        .posts-filters {
          display: flex;
          gap: 1rem;
          align-items: center;
          flex-wrap: wrap;
          margin-bottom: 2rem;
          padding: 1.5rem;
          background: var(--color-background-secondary, #f8fafc);
          border-radius: 8px;
          border: 1px solid var(--color-border, #e2e8f0);
        }

        .filter-tags,
        .sort-posts {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .filter-label,
        .sort-label {
          font-weight: 500;
          color: var(--color-text-primary, #334155);
          white-space: nowrap;
        }

        .filter-select,
        .sort-select {
          padding: 0.5rem 0.75rem;
          border: 1px solid var(--color-border, #d1d5db);
          border-radius: 6px;
          background: white;
          font-size: 0.875rem;
          color: var(--color-text-primary, #334155);
          min-width: 140px;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }

        .filter-select:focus,
        .sort-select:focus {
          outline: none;
          border-color: var(--color-primary, #3b82f6);
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .posts-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 2rem;
          margin-top: 2rem;
        }

        .no-posts {
          grid-column: 1 / -1;
          text-align: center;
          padding: 3rem 2rem;
          color: var(--color-text-secondary, #64748b);
          font-size: 1.125rem;
          background: var(--color-background-secondary, #f8fafc);
          border-radius: 8px;
          border: 1px dashed var(--color-border, #d1d5db);
        }

        @media (max-width: 768px) {
          .posts-filters {
            flex-direction: column;
            align-items: stretch;
            gap: 1rem;
          }

          .filter-tags,
          .sort-posts {
            flex-direction: column;
            align-items: stretch;
            gap: 0.5rem;
          }

          .filter-select,
          .sort-select {
            min-width: auto;
            width: 100%;
          }

          .posts-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
        }
      `}</style>
      <div className="posts-filters">
        <ClientSidePostsFilter
          availableTags={availableTags}
          onTagChange={setCurrentTag}
          currentTag={currentTag}
        />
        <ClientSidePostsSorter
          onSortChange={setCurrentSort}
          currentSort={currentSort}
        />
      </div>

      <div className="posts-grid">
        {filteredAndSortedPosts.length > 0 ? (
          filteredAndSortedPosts.map((post) => (
            <PostCard key={post.uuid} post={post} />
          ))
        ) : (
          <p className="no-posts">No posts found for the selected tag.</p>
        )}
      </div>
    </div>
  )
}
