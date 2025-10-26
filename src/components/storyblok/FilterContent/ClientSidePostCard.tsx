import Link from "next/link"
import { getStoryPath } from "@/lib/storyblok-utils"
import Typography from "@/storyblok/Typography"
import { formatDate } from "@/utils/date-formatter"
import type { PostStory } from "@/utils/tags"

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
    <span key={tag} className="tag">
      {tag}
    </span>
  ))

  return (
    <box-grid>
      <div className="meta">
        <Typography
          tag="time"
          variant="base"
          shade="dark"
          dateTime={formattedDate}
          className="margin-none"
        >
          {formattedDate}
        </Typography>
        <div className="tags">{tagList}</div>
      </div>
      <Typography tag="h3" variant="lg" shade="dark">
        <Link href={linkPath} className="title-link">
          {title}
        </Link>
      </Typography>
      <Typography tag="p" variant="base" shade="dark">
        {description}
      </Typography>
      <Link href={linkPath} className="link-simple">
        Read more
      </Link>
    </box-grid>
  )
}
