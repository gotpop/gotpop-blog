import Link from "next/link"
import { getStoryPath } from "@/lib/storyblok-utils"
import { formatDate } from "@/utils/date-formatter"
import type { PostStory } from "@/utils/tags"
import Typography from "../Typography"

interface PostCardProps {
  post: PostStory
}

export default function PostCard({ post }: PostCardProps) {
  const { full_slug, name, published_at, content } = post
  const { Heading, description, published_date, tags = [] } = content || {}

  const dateToUse = published_date || published_at
  const formattedDate = formatDate(dateToUse)
  const linkPath = getStoryPath(full_slug)
  const title = Heading || name || "Untitled"

  const tagList = tags.map((tag) => (
    <span key={tag} className="post-card-tag">
      {tag}
    </span>
  ))

  return (
    <article className="post-card">
      <div className="post-card-content">
        <div className="post-card-meta">
          <time dateTime={dateToUse} className="post-card-date">
            {formattedDate}
          </time>
          {post.content?.tags && (
            <div className="post-card-tags">{tagList}</div>
          )}
        </div>

        <Typography tag="h3" variant="lg" shade="dark">
          <Link href={linkPath} className="post-card-title-link">
            {title}
          </Link>
        </Typography>

        {description && <p className="post-card-description">{description}</p>}

        <Link href={linkPath} className="post-card-read-more">
          Read more
        </Link>
      </div>
    </article>
  )
}
