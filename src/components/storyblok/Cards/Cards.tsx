import { StoryblokServerComponent } from "@/components/utils/ClientLoader/StoryblokServerComponent"
import type { CardsStoryblok } from "@/types/storyblok-components"
import { getInlineStyles } from "@/utils/inline-styles"

interface CardsProps {
  blok: CardsStoryblok
}

export default function Cards({ blok }: CardsProps) {
  const styles = getInlineStyles("Cards.css")

  return (
    <div className="cards-grid">
      {styles && <style>{styles}</style>}
      {blok.cards?.map((nestedBlok) => (
        <StoryblokServerComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </div>
  )
}
