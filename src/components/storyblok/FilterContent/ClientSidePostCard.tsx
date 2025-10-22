import Link from "next/link"
import { getStoryPath } from "@/lib/storyblok-utils"
import type { PostStory } from "@/utils/tags"
import Typography from "../Typography"
import { formatDate } from "@/utils/date-formatter"

interface PostCardProps {
  post: PostStory
}

export default function PostCard({ post }: PostCardProps) {
  const linkPath = getStoryPath(post.full_slug)
  const title = post.content?.Heading || post.name || "Untitled"
  const description = post.content?.description || ""
  const dateToUse = post.content?.published_date || post.published_at
  const formattedDate = formatDate(dateToUse)

  return (
    <article className="post-card">
      <div className="post-card-content">
        <div className="post-card-meta">
          <time dateTime={dateToUse} className="post-card-date">
            {formattedDate}
          </time>
          {post.content?.tags && (
            <div className="post-card-tags">
              {post.content.tags.map((tag) => (
                <span key={tag} className="post-card-tag">
                  {tag}
                </span>
              ))}
            </div>
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
