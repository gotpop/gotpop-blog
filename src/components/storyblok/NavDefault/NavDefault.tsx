import { useId } from "react"
import { ButtonToggleMenu } from "@/components"
import { StoryblokServerComponent } from "@/components/utils/StoryblokServerComponent"
import type { NavDefaultStoryblok } from "@/types/storyblok-components"
import { getInlineStyles } from "@/utils/inline-styles"

interface NavDefaultProps {
  blok: NavDefaultStoryblok
}

export function NavDefault({ blok }: NavDefaultProps) {
  const styles = getInlineStyles("NavDefault.css")
  const navId = useId()

  return (
    <>
      <ButtonToggleMenu navId={navId} />
      <nav className="nav" id={navId} aria-hidden="true" hidden>
        {styles && <style>{styles}</style>}
        {blok.nav_items?.map((nestedBlok) => (
          <StoryblokServerComponent blok={nestedBlok} key={nestedBlok._uid} />
        ))}
      </nav>
    </>
  )
}
