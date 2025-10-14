import { HeroDefaultStoryblok } from "@/types/storyblok-components"
import { getInlineStyles } from "@/utils/inline-styles"
import { storyblokEditable } from "@storyblok/react/rsc"

interface HeroDefaultProps {
  blok: HeroDefaultStoryblok
}

export default function HeroDefault({ blok }: HeroDefaultProps) {
  const styles = getInlineStyles("HeroDefault.css")
  return (
    <section {...storyblokEditable(blok)} className="hero">
      {styles && <style>{styles}</style>}
      <div className="hero-content">
        {blok.heading && <h1>{blok.heading}</h1>}
        {blok.subheading && (
          <div>
            {/* Rich text field - we'll render it simply for now */}
            {blok.subheading.content?.[0]?.content?.[0]?.text && (
              <p>{blok.subheading.content[0].content[0].text}</p>
            )}
          </div>
        )}
        {/* Fallback for subtitle field */}
        {blok.subtitle && <p>{blok.subtitle}</p>}
      </div>
    </section>
  )
}
