import { useId } from "react"
import Hero from "@/components/ui/Hero"
import RichText from "@/components/ui/RichText"
import type { HeroDefaultStoryblok } from "@/types/storyblok-components"
// import { getInlineStyles } from "@/utils/inline-styles"
import Typography from "../Typography"

interface HeroDefaultProps {
  blok: HeroDefaultStoryblok
}

export default function HeroDefault({ blok }: HeroDefaultProps) {
  // const styles = getInlineStyles("HeroDefault.css")
  const { heading, subheading } = blok
  const id = useId()

  return (
    <Hero id={id} variant="minimal">
      {heading && (
        <Typography
          className="hero-home-heading"
          id={id}
          shade="dark"
          tag="h1"
          variant="hero"
        >
          {heading}
        </Typography>
      )}
      {subheading && (
        <div className="hero-home-subheading">
          <RichText content={subheading} />
        </div>
      )}
    </Hero>
  )
}
