import { CardStoryblok } from "@/types/storyblok-components"
import Link from "next/link"
import { getStoryblokApi } from "@/lib/storyblok"
import { storyblokEditable } from "@storyblok/react/rsc"

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

  // console.log("Card story data:", JSON.stringify(story, null, 2))

  const linkPath = story.full_slug.startsWith("blog/")
    ? `/${story.full_slug.replace("blog/", "")}`
    : `/${story.full_slug}`

  const title = story.content?.Heading || story.name
  const description = story.content?.description || ""

  return (
    <div className="card" {...storyblokEditable(blok)}>
      <div className="card-content">
        {title && <h3>{title}</h3>}
        {description && <p>{description}</p>}
        <Link href={linkPath} className="card-link">
          Read more
        </Link>
      </div>
    </div>
  )
}
