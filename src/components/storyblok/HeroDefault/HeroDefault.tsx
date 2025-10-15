import { HeroDefaultStoryblok } from "@/types/storyblok-components"
import RichText from "@/components/RichText"
import { getInlineStyles } from "@/utils/inline-styles"
import { storyblokEditable } from "@storyblok/react/rsc"

interface HeroDefaultProps {
  blok: HeroDefaultStoryblok
}

export default function HeroDefault({ blok }: HeroDefaultProps) {
  const styles = getInlineStyles("HeroDefault.css")

  return (
    <hero-home {...storyblokEditable(blok)} className="hero">
      {styles && <style>{styles}</style>}
      <div className="hero-content">
        {blok.heading && <h1>{blok.heading}</h1>}
        {blok.subheading && <RichText content={blok.subheading} />}
      </div>
    </hero-home>
  )
}
