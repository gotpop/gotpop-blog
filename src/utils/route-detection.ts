export function isPostsPage(fullPath: string, slug?: string[]): boolean {
  return fullPath === "blog/posts" || slug?.join("/") === "posts"
}

export function isTagPage(slug?: string[]): {
  isTagPage: boolean
  tagSlug?: string
} {
  if (slug && slug.length === 2 && slug[0] === "posts") {
    return { isTagPage: true, tagSlug: slug[1] }
  }
  return { isTagPage: false }
}
