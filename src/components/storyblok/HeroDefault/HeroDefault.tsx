import { useId } from "react"
import RichText from "@/components/ui/RichText"
import type { HeroDefaultStoryblok } from "@/types/storyblok-components"
import { getInlineStyles } from "@/utils/inline-styles"

import Typography from "../Typography"

interface HeroDefaultProps {
  blok: HeroDefaultStoryblok
}

export default function HeroDefault({ blok }: HeroDefaultProps) {
  const styles = getInlineStyles("HeroDefault.css")
  const { heading, subheading } = blok
  const id = useId()

  return (
    <section className="hero" aria-labelledby={id}>
      {styles && <style>{styles}</style>}
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
    </section>
  )
}
