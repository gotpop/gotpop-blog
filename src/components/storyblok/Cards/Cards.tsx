import { CardsStoryblok } from "@/types/storyblok-components"
import { StoryblokServerComponent } from "@/components/StoryblokServerComponent"
import { getInlineStyles } from "@/utils/inline-styles"
import { storyblokEditable } from "@storyblok/react/rsc"

interface CardsProps {
  blok: CardsStoryblok
}

export default function Cards({ blok }: CardsProps) {
  const styles = getInlineStyles("Cards.css")

  return (
    <div {...storyblokEditable(blok)} className="cards-grid">
      {styles && <style>{styles}</style>}
      {blok.cards?.map((nestedBlok) => (
        <StoryblokServerComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </div>
  )
}
