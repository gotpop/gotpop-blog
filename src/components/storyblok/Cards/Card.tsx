// import Link from "next/link"
import { getStoryPath } from "@/lib/storyblok-utils"
import Typography from "@/storyblok/Typography"
import type { CardStoryblok } from "@/types/storyblok-components"
import { fetchStoryByUuid } from "@/utils/storyblok-fetch"

interface CardProps {
  blok: CardStoryblok
}

export async function Card({ blok }: CardProps) {
  const { cards } = blok

  if (!cards?.[0]) {
    return null
  }

  const story = await fetchStoryByUuid(cards[0])

  if (!story) {
    return null
  }

  const { full_slug, content, name } = story
  const linkPath = getStoryPath(full_slug)
  const title = content?.Heading || name
  const description = content?.description || ""

  return (
    <box-grid>
      <Typography tag="h3" variant="lg" shade="dark">
        {title}
      </Typography>
      <Typography tag="p" variant="base" shade="dark">
        {description}
      </Typography>
      <a href={linkPath} className="link-simple">
        Read more
      </a>
    </box-grid>
  )
}
