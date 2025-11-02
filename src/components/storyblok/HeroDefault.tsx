import { useId } from "react"
import { RichText } from "@/components/ui/RichText"
import type { HeroDefaultStoryblok } from "@/types/storyblok-components"
import { Typography } from "./Typography"

interface HeroDefaultProps {
  blok: HeroDefaultStoryblok
}

export function HeroDefault({ blok }: HeroDefaultProps) {
  const { heading, subheading } = blok
  const id = useId()

  return (
    <box-grid aria-labelledby={id}>
      <Typography
        className="hero-home-heading"
        id={id}
        shade="dark"
        tag="h1"
        variant="hero"
      >
        {heading}
      </Typography>
      {subheading && <RichText content={subheading} />}
    </box-grid>
  )
}
