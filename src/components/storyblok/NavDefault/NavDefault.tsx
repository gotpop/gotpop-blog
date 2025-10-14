import { NavDefaultStoryblok } from "@/types/storyblok-components"
import { StoryblokServerComponent } from "@/components/StoryblokServerComponent"
import { getInlineStyles } from "@/utils/inline-styles"
import { storyblokEditable } from "@storyblok/react/rsc"

interface NavDefaultProps {
  blok: NavDefaultStoryblok
}

export default function NavDefault({ blok }: NavDefaultProps) {
  const styles = getInlineStyles("NavDefault.css")

  return (
    <nav className="nav" {...storyblokEditable(blok)}>
      {styles && <style>{styles}</style>}
      {blok.nav_items?.map((nestedBlok) => (
        <StoryblokServerComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </nav>
  )
}
