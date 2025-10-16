import { storyblokEditable } from "@storyblok/react/rsc"
import Link from "next/link"
import { getStoryblokApi } from "@/lib/storyblok"
import { getStoryPath } from "@/lib/storyblok-utils"
import type { CardStoryblok } from "@/types/storyblok-components"
import Typography from "../Typography"

interface CardProps {
  blok: CardStoryblok
}

export default async function Card({ blok }: CardProps) {
  if (!blok.cards?.[0]) {
    console.log("Card: No UUID reference found in blok.cards")
    return null
  }

  const storyblokApi = getStoryblokApi()

  const { data } = await storyblokApi.get(`cdn/stories`, {
    version: "draft",
    by_uuids: blok.cards[0],
  })

  const story = data?.stories?.[0]

  if (!story) {
    console.log("Card: No story found for UUID:", blok.cards[0])
    return null
  }

  const linkPath = getStoryPath(story.full_slug)
  const title = story.content?.Heading || story.name
  const description = story.content?.description || ""

  return (
    <div className="card" {...storyblokEditable(blok)}>
      <div className="card-content">
        {title && (
          <Typography tag="h3" variant="lg" shade="dark">
            {title}
          </Typography>
        )}
        {description && (
          <Typography tag="p" variant="base" shade="dark">
            {description}
          </Typography>
        )}
        <Link href={linkPath} className="card-link">
          Read more
        </Link>
      </div>
    </div>
  )
}
