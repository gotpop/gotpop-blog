import { useMemo, useState } from "react"
import type { PostStory } from "@/utils/tags"

export function usePostsFilter(posts: PostStory[]) {
  const [currentTag, setCurrentTag] = useState("all")
  const [currentSort, setCurrentSort] = useState("published_desc")

  const filteredAndSortedPosts = useMemo(() => {
    let filtered = posts

    if (currentTag !== "all") {
      filtered = posts.filter((post) =>
        post.content?.tags?.some(
          (tag: string) => tag.toLowerCase() === currentTag.toLowerCase()
        )
      )
    }

    const sorted = [...filtered].sort((a, b) => {
      switch (currentSort) {
        case "published_desc": {
          const dateA = a.content?.published_date || a.published_at
          const dateB = b.content?.published_date || b.published_at
          return new Date(dateB).getTime() - new Date(dateA).getTime()
        }
        case "published_asc": {
          const dateA = a.content?.published_date || a.published_at
          const dateB = b.content?.published_date || b.published_at
          return new Date(dateA).getTime() - new Date(dateB).getTime()
        }
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

  return {
    currentTag,
    setCurrentTag,
    currentSort,
    setCurrentSort,
    filteredAndSortedPosts,
  }
}
