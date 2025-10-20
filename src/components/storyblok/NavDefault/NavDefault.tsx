import { StoryblokServerComponent } from "@/components/utils/ClientLoader/StoryblokServerComponent"
import type { NavDefaultStoryblok } from "@/types/storyblok-components"
import { getInlineStyles } from "@/utils/inline-styles"

interface NavDefaultProps {
  blok: NavDefaultStoryblok
}

export default function NavDefault({ blok }: NavDefaultProps) {
  const styles = getInlineStyles("NavDefault.css")

  return (
    <nav className="nav">
      {styles && <style>{styles}</style>}
      {blok.nav_items?.map((nestedBlok) => (
        <StoryblokServerComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </nav>
  )
}
