import { storyblokEditable } from "@storyblok/react/rsc"
import RichText from "@/components/ui/RichText"
import type { HeroDefaultStoryblok } from "@/types/storyblok-components"
import { getInlineStyles } from "@/utils/inline-styles"
import { useId } from "react"

interface HeroDefaultProps {
  blok: HeroDefaultStoryblok
}

export default function HeroDefault({ blok }: HeroDefaultProps) {
  const styles = getInlineStyles("HeroDefault.css")
  const id = useId()

  return (
    <section {...storyblokEditable(blok)} className="hero" aria-labelledby={id}>
      {styles && <style>{styles}</style>}
      {blok.heading && (
        <h1 id={id} className="hero-home-title">
          {blok.heading}
        </h1>
      )}
      {blok.subheading && (
        <RichText className="hero-home-subtitle" content={blok.subheading} />
      )}
    </section>
  )
}
