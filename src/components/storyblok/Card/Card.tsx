import { CustomElement, Typography } from "@gotpop/system"
import { getStoryPath } from "@/lib/storyblok-utils"
import { formatDate } from "@/utils/date-formatter"
import type { PostStory } from "@/utils/tags"
import "./Card.css"

interface CardProps {
  post: PostStory
}

export function Card({ post }: CardProps) {
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
    <CustomElement
      tag="box-grid"
      style={{
        viewTransitionName: `post-${post.uuid}`,
      }}
    >
      <div className="meta">
        <Typography
          tag="time"
          variant="text-sm"
          shade="charcoal"
          dateTime={formattedDate}
          className="margin-none"
        >
          {formattedDate}
        </Typography>
        <div className="tags">{tagList}</div>
      </div>
      <Typography tag="h3" variant="text-xl" shade="dark">
        <a href={linkPath} className="title-link">
          {title}
        </a>
      </Typography>
      <Typography tag="p" variant="text-base" shade="charcoal">
        {description}
      </Typography>
      <a href={linkPath} className="link-simple">
        Read more
      </a>
    </CustomElement>
  )
}
